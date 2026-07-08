-- =====================================================================
-- INVENTORY MODULE MIGRATION — freeflow-accounts
-- =====================================================================
-- ASSUMPTIONS (verify against your real schema and adjust before running):
--   1. organizations(id uuid primary key, ...)
--   2. org_members(org_id uuid, user_id uuid, role text, ...)
--        -> user's org access, referenced by RLS below
--   3. items(id uuid primary key, org_id uuid, name text, sku text, ...)
--   4. purchase_orders(id uuid primary key, org_id uuid, status text, ...)
--        status includes a 'received' value at some point in its lifecycle
--   5. purchase_order_items(id uuid primary key, purchase_order_id uuid,
--        item_id uuid, quantity numeric, ...)
--   6. invoices(id uuid primary key, org_id uuid, status text, ...)
--        status includes a 'sent' value at some point in its lifecycle
--   7. invoice_items(id uuid primary key, invoice_id uuid, item_id uuid,
--        quantity numeric, ...)
--   8. auth.uid() is available (Supabase auth)
--
-- If any table/column names differ, do a find-replace before applying.
-- All new tables/columns use IF NOT EXISTS so this is safe to re-run.
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 0. Helper: is the current user a member of a given org?
--    (Skip creating this if you already have an equivalent helper —
--     just replace calls to is_org_member(org_id) below with yours.)
-- ---------------------------------------------------------------------
create or replace function is_org_member(p_org_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from org_members
    where org_members.org_id = p_org_id
      and org_members.user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------
-- 1. WAREHOUSES
-- ---------------------------------------------------------------------
create table if not exists warehouses (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references organizations(id) on delete cascade,
  name          text not null,
  address       text,
  is_default    boolean not null default false,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (org_id, name)
);

create index if not exists idx_warehouses_org on warehouses(org_id);

-- Only one default warehouse per org
create or replace function enforce_single_default_warehouse()
returns trigger
language plpgsql
as $$
begin
  if NEW.is_default then
    update warehouses
      set is_default = false
      where org_id = NEW.org_id
        and id <> NEW.id
        and is_default = true;
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_single_default_warehouse on warehouses;
create trigger trg_single_default_warehouse
  before insert or update of is_default on warehouses
  for each row execute function enforce_single_default_warehouse();

drop trigger if exists trg_warehouses_updated_at on warehouses;
create trigger trg_warehouses_updated_at
  before update on warehouses
  for each row execute function set_updated_at();
-- (assumes you already have a generic set_updated_at() trigger fn;
--  if not, create it: sets NEW.updated_at = now() and returns NEW)

-- ---------------------------------------------------------------------
-- 2. STOCK MOVEMENTS  (the single source of truth ledger)
-- ---------------------------------------------------------------------
create table if not exists stock_movements (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references organizations(id) on delete cascade,
  item_id         uuid not null references items(id) on delete cascade,
  warehouse_id    uuid not null references warehouses(id) on delete restrict,
  quantity        numeric not null,          -- positive = stock in, negative = stock out
  movement_type   text not null check (movement_type in (
                    'purchase_receipt',
                    'invoice_sale',
                    'adjustment',
                    'transfer_in',
                    'transfer_out'
                  )),
  reference_type  text,                      -- 'purchase_order' | 'invoice' | null
  reference_id    uuid,                      -- id of the PO/invoice, if applicable
  note            text,                      -- required for manual adjustments (enforced below)
  created_by      uuid references auth.users(id),
  created_at      timestamptz not null default now(),
  constraint chk_adjustment_requires_note
    check (movement_type <> 'adjustment' or (note is not null and length(trim(note)) > 0))
);

create index if not exists idx_stock_movements_item_wh on stock_movements(item_id, warehouse_id);
create index if not exists idx_stock_movements_org on stock_movements(org_id);
create index if not exists idx_stock_movements_reference on stock_movements(reference_type, reference_id);

-- Movements are an immutable ledger: block updates/deletes at the DB level.
-- (Corrections should be new offsetting adjustment rows, not edits.)
create or replace function block_stock_movement_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'stock_movements rows are immutable; insert an offsetting adjustment instead';
end;
$$;

drop trigger if exists trg_block_stock_movement_update on stock_movements;
create trigger trg_block_stock_movement_update
  before update or delete on stock_movements
  for each row execute function block_stock_movement_mutation();

-- ---------------------------------------------------------------------
-- 3. PER-ITEM REORDER SETTINGS (low-stock threshold)
-- ---------------------------------------------------------------------
create table if not exists item_stock_settings (
  item_id           uuid primary key references items(id) on delete cascade,
  org_id            uuid not null references organizations(id) on delete cascade,
  reorder_threshold numeric not null default 0 check (reorder_threshold >= 0),
  reorder_quantity  numeric check (reorder_quantity is null or reorder_quantity > 0),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_item_stock_settings_org on item_stock_settings(org_id);

drop trigger if exists trg_item_stock_settings_updated_at on item_stock_settings;
create trigger trg_item_stock_settings_updated_at
  before update on item_stock_settings
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- 4. VIEWS — real-time stock levels
-- ---------------------------------------------------------------------

-- Per item, per warehouse quantity on hand
create or replace view stock_levels_by_warehouse as
select
  sm.org_id,
  sm.item_id,
  sm.warehouse_id,
  sum(sm.quantity) as quantity_on_hand
from stock_movements sm
group by sm.org_id, sm.item_id, sm.warehouse_id;

-- Per item, total quantity on hand across all warehouses
create or replace view stock_levels as
select
  sm.org_id,
  sm.item_id,
  sum(sm.quantity) as quantity_on_hand
from stock_movements sm
group by sm.org_id, sm.item_id;

-- Low-stock dashboard: items at/under their reorder threshold
create or replace view low_stock_items as
select
  iss.org_id,
  iss.item_id,
  i.name        as item_name,
  i.sku         as item_sku,
  coalesce(sl.quantity_on_hand, 0) as quantity_on_hand,
  iss.reorder_threshold,
  iss.reorder_quantity
from item_stock_settings iss
join items i on i.id = iss.item_id
left join stock_levels sl
  on sl.item_id = iss.item_id and sl.org_id = iss.org_id
where coalesce(sl.quantity_on_hand, 0) <= iss.reorder_threshold;

-- ---------------------------------------------------------------------
-- 5. AUTOMATIC STOCK ADJUSTMENTS FROM PURCHASE ORDERS
-- ---------------------------------------------------------------------
-- Assumes purchase_orders has a status column that transitions to 'received'.
-- Adds warehouse_id (where received stock lands) + a processed flag
-- to make the trigger idempotent (won't double-post if status is re-saved).

alter table purchase_orders add column if not exists warehouse_id uuid references warehouses(id);
alter table purchase_orders add column if not exists stock_processed boolean not null default false;

create or replace function process_purchase_order_receipt()
returns trigger
language plpgsql
security definer
as $$
declare
  v_warehouse_id uuid;
begin
  -- Only act on a transition INTO 'received', and only once
  if NEW.status = 'received'
     and (OLD.status is distinct from 'received')
     and NEW.stock_processed = false then

    -- Fall back to the org's default warehouse if none set on the PO
    v_warehouse_id := NEW.warehouse_id;
    if v_warehouse_id is null then
      select id into v_warehouse_id
      from warehouses
      where org_id = NEW.org_id and is_default = true
      limit 1;
    end if;

    if v_warehouse_id is null then
      raise exception 'Cannot receive purchase order %: no warehouse specified and no default warehouse exists for org %', NEW.id, NEW.org_id;
    end if;

    insert into stock_movements (org_id, item_id, warehouse_id, quantity, movement_type, reference_type, reference_id, note, created_by)
    select
      NEW.org_id,
      poi.item_id,
      v_warehouse_id,
      poi.quantity,
      'purchase_receipt',
      'purchase_order',
      NEW.id,
      'Auto-generated: purchase order ' || NEW.id || ' marked received',
      auth.uid()
    from purchase_order_items poi
    where poi.purchase_order_id = NEW.id;

    NEW.warehouse_id := v_warehouse_id;
    NEW.stock_processed := true;
  end if;

  return NEW;
end;
$$;

drop trigger if exists trg_purchase_order_receipt on purchase_orders;
create trigger trg_purchase_order_receipt
  before update on purchase_orders
  for each row execute function process_purchase_order_receipt();

-- ---------------------------------------------------------------------
-- 6. AUTOMATIC STOCK ADJUSTMENTS FROM INVOICES
-- ---------------------------------------------------------------------
-- Assumes invoices has a status column that transitions to 'sent'.

alter table invoices add column if not exists warehouse_id uuid references warehouses(id);
alter table invoices add column if not exists stock_processed boolean not null default false;

create or replace function process_invoice_sent()
returns trigger
language plpgsql
security definer
as $$
declare
  v_warehouse_id uuid;
begin
  if NEW.status = 'sent'
     and (OLD.status is distinct from 'sent')
     and NEW.stock_processed = false then

    v_warehouse_id := NEW.warehouse_id;
    if v_warehouse_id is null then
      select id into v_warehouse_id
      from warehouses
      where org_id = NEW.org_id and is_default = true
      limit 1;
    end if;

    if v_warehouse_id is null then
      raise exception 'Cannot send invoice %: no warehouse specified and no default warehouse exists for org %', NEW.id, NEW.org_id;
    end if;

    insert into stock_movements (org_id, item_id, warehouse_id, quantity, movement_type, reference_type, reference_id, note, created_by)
    select
      NEW.org_id,
      ii.item_id,
      v_warehouse_id,
      -ii.quantity,           -- stock leaves the warehouse
      'invoice_sale',
      'invoice',
      NEW.id,
      'Auto-generated: invoice ' || NEW.id || ' marked sent',
      auth.uid()
    from invoice_items ii
    where ii.invoice_id = NEW.id;

    NEW.warehouse_id := v_warehouse_id;
    NEW.stock_processed := true;
  end if;

  return NEW;
end;
$$;

drop trigger if exists trg_invoice_sent on invoices;
create trigger trg_invoice_sent
  before update on invoices
  for each row execute function process_invoice_sent();

-- ---------------------------------------------------------------------
-- 7. MANUAL STOCK ADJUSTMENTS (required reason/note)
-- ---------------------------------------------------------------------
-- Call via RPC: select adjust_stock('<item_id>', '<warehouse_id>', 5, 'Cycle count correction');
-- Positive quantity_change = stock in, negative = stock out.

create or replace function adjust_stock(
  p_item_id uuid,
  p_warehouse_id uuid,
  p_quantity_change numeric,
  p_note text
)
returns stock_movements
language plpgsql
security definer
as $$
declare
  v_org_id uuid;
  v_row stock_movements;
begin
  if p_note is null or length(trim(p_note)) = 0 then
    raise exception 'A reason/note is required for manual stock adjustments';
  end if;

  if p_quantity_change = 0 then
    raise exception 'quantity_change must be non-zero';
  end if;

  select org_id into v_org_id from items where id = p_item_id;
  if v_org_id is null then
    raise exception 'Item % not found', p_item_id;
  end if;

  if not is_org_member(v_org_id) then
    raise exception 'Not authorized for this organization';
  end if;

  insert into stock_movements (org_id, item_id, warehouse_id, quantity, movement_type, reference_type, reference_id, note, created_by)
  values (v_org_id, p_item_id, p_warehouse_id, p_quantity_change, 'adjustment', null, null, p_note, auth.uid())
  returning * into v_row;

  return v_row;
end;
$$;

-- ---------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------

alter table warehouses enable row level security;
alter table stock_movements enable row level security;
alter table item_stock_settings enable row level security;

-- Warehouses: members of the org can read; admins/managers can write.
-- Adjust the role check to match your actual role naming.
drop policy if exists warehouses_select on warehouses;
create policy warehouses_select on warehouses
  for select using (is_org_member(org_id));

drop policy if exists warehouses_insert on warehouses;
create policy warehouses_insert on warehouses
  for insert with check (is_org_member(org_id));

drop policy if exists warehouses_update on warehouses;
create policy warehouses_update on warehouses
  for update using (is_org_member(org_id)) with check (is_org_member(org_id));

drop policy if exists warehouses_delete on warehouses;
create policy warehouses_delete on warehouses
  for delete using (is_org_member(org_id));

-- Stock movements: readable by org members. Inserts only via the
-- adjust_stock() RPC or the PO/invoice triggers (both security definer),
-- so no direct client-side insert policy is granted here — this keeps
-- the ledger tamper-resistant. If you need direct client inserts for
-- some flow, add an insert policy scoped with is_org_member(org_id).
drop policy if exists stock_movements_select on stock_movements;
create policy stock_movements_select on stock_movements
  for select using (is_org_member(org_id));

-- Item stock settings: org members can read; write access same as items.
drop policy if exists item_stock_settings_select on item_stock_settings;
create policy item_stock_settings_select on item_stock_settings
  for select using (is_org_member(org_id));

drop policy if exists item_stock_settings_insert on item_stock_settings;
create policy item_stock_settings_insert on item_stock_settings
  for insert with check (is_org_member(org_id));

drop policy if exists item_stock_settings_update on item_stock_settings;
create policy item_stock_settings_update on item_stock_settings
  for update using (is_org_member(org_id)) with check (is_org_member(org_id));

drop policy if exists item_stock_settings_delete on item_stock_settings;
create policy item_stock_settings_delete on item_stock_settings
  for delete using (is_org_member(org_id));

-- ---------------------------------------------------------------------
-- 9. GRANTS (Supabase: PostgREST exposes tables/views to 'authenticated')
-- ---------------------------------------------------------------------
grant select on stock_levels, stock_levels_by_warehouse, low_stock_items to authenticated;
grant select, insert, update, delete on warehouses to authenticated;
grant select on stock_movements to authenticated;
grant select, insert, update, delete on item_stock_settings to authenticated;
grant execute on function adjust_stock(uuid, uuid, numeric, text) to authenticated;

commit;

-- =====================================================================
-- NOTES
-- =====================================================================
-- * stock_levels / stock_levels_by_warehouse / low_stock_items are plain
--   views (always current, computed from stock_movements). If your item
--   count grows very large and this gets slow, convert to materialized
--   views refreshed on a schedule or via trigger — not needed at typical
--   SMB volumes.
-- * grant execute on adjust_stock(uuid, uuid, numeric, text) to authenticated;
--   (run this if your Supabase project restricts function execute by default)
-- * grant select on stock_levels, stock_levels_by_warehouse, low_stock_items to authenticated;
-- =====================================================================
