export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          code: string;
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
          is_system: boolean;
          name: string;
          parent_id: string | null;
          type: Database["public"]["Enums"]["account_type"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          is_system?: boolean;
          name: string;
          parent_id?: string | null;
          type: Database["public"]["Enums"]["account_type"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          is_system?: boolean;
          name?: string;
          parent_id?: string | null;
          type?: Database["public"]["Enums"]["account_type"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "accounts_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      bill_items: {
        Row: {
          account_id: string | null;
          amount: number;
          bill_id: string;
          created_at: string;
          description: string;
          id: string;
          item_id: string | null;
          quantity: number;
          tax_rate: number;
          unit_price: number;
          user_id: string;
        };
        Insert: {
          account_id?: string | null;
          amount?: number;
          bill_id: string;
          created_at?: string;
          description: string;
          id?: string;
          item_id?: string | null;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id: string;
        };
        Update: {
          account_id?: string | null;
          amount?: number;
          bill_id?: string;
          created_at?: string;
          description?: string;
          id?: string;
          item_id?: string | null;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bill_items_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bill_items_bill_id_fkey";
            columns: ["bill_id"];
            isOneToOne: false;
            referencedRelation: "bills";
            referencedColumns: ["id"];
          },
        ];
      };
      bill_payments: {
        Row: {
          amount: number;
          bill_id: string;
          created_at: string;
          currency: string;
          id: string;
          method: string;
          notes: string | null;
          payment_date: string;
          reference: string | null;
          source_account_id: string | null;
          updated_at: string;
          user_id: string;
          vendor_id: string | null;
        };
        Insert: {
          amount: number;
          bill_id: string;
          created_at?: string;
          currency?: string;
          id?: string;
          method?: string;
          notes?: string | null;
          payment_date?: string;
          reference?: string | null;
          source_account_id?: string | null;
          updated_at?: string;
          user_id: string;
          vendor_id?: string | null;
        };
        Update: {
          amount?: number;
          bill_id?: string;
          created_at?: string;
          currency?: string;
          id?: string;
          method?: string;
          notes?: string | null;
          payment_date?: string;
          reference?: string | null;
          source_account_id?: string | null;
          updated_at?: string;
          user_id?: string;
          vendor_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bill_payments_bill_id_fkey";
            columns: ["bill_id"];
            isOneToOne: false;
            referencedRelation: "bills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bill_payments_source_account_id_fkey";
            columns: ["source_account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bill_payments_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          },
        ];
      };
      bills: {
        Row: {
          bill_number: string;
          created_at: string;
          currency: string;
          due_date: string | null;
          id: string;
          issue_date: string;
          notes: string | null;
          reference: string | null;
          status: string;
          subtotal: number;
          tax: number;
          total: number;
          updated_at: string;
          user_id: string;
          vendor_id: string | null;
        };
        Insert: {
          bill_number: string;
          created_at?: string;
          currency?: string;
          due_date?: string | null;
          id?: string;
          issue_date?: string;
          notes?: string | null;
          reference?: string | null;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id: string;
          vendor_id?: string | null;
        };
        Update: {
          bill_number?: string;
          created_at?: string;
          currency?: string;
          due_date?: string | null;
          id?: string;
          issue_date?: string;
          notes?: string | null;
          reference?: string | null;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id?: string;
          vendor_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bills_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          },
        ];
      };
      companies: {
        Row: {
          address: string | null;
          city: string | null;
          country: string | null;
          created_at: string;
          currency: string;
          email: string | null;
          id: string;
          is_default: boolean;
          logo_url: string | null;
          name: string;
          phone: string | null;
          postal_code: string | null;
          state: string | null;
          tax_number: string | null;
          updated_at: string;
          user_id: string;
          website: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          currency?: string;
          email?: string | null;
          id?: string;
          is_default?: boolean;
          logo_url?: string | null;
          name: string;
          phone?: string | null;
          postal_code?: string | null;
          state?: string | null;
          tax_number?: string | null;
          updated_at?: string;
          user_id: string;
          website?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          currency?: string;
          email?: string | null;
          id?: string;
          is_default?: boolean;
          logo_url?: string | null;
          name?: string;
          phone?: string | null;
          postal_code?: string | null;
          state?: string | null;
          tax_number?: string | null;
          updated_at?: string;
          user_id?: string;
          website?: string | null;
        };
        Relationships: [];
      };
      credit_notes: {
        Row: {
          amount: number;
          created_at: string;
          credit_note_number: string;
          currency: string;
          customer_id: string | null;
          id: string;
          invoice_id: string;
          issue_date: string;
          reason: string | null;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          credit_note_number: string;
          currency?: string;
          customer_id?: string | null;
          id?: string;
          invoice_id: string;
          issue_date?: string;
          reason?: string | null;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          credit_note_number?: string;
          currency?: string;
          customer_id?: string | null;
          id?: string;
          invoice_id?: string;
          issue_date?: string;
          reason?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "credit_notes_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "credit_notes_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          address: string | null;
          created_at: string;
          email: string | null;
          id: string;
          name: string;
          notes: string | null;
          phone: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name: string;
          notes?: string | null;
          phone?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string;
          notes?: string | null;
          phone?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      estimate_items: {
        Row: {
          amount: number;
          created_at: string;
          description: string;
          estimate_id: string;
          id: string;
          item_id: string | null;
          quantity: number;
          tax_rate: number;
          unit_price: number;
          user_id: string;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          description: string;
          estimate_id: string;
          id?: string;
          item_id?: string | null;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          description?: string;
          estimate_id?: string;
          id?: string;
          item_id?: string | null;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "estimate_items_estimate_id_fkey";
            columns: ["estimate_id"];
            isOneToOne: false;
            referencedRelation: "estimates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "estimate_items_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
      estimates: {
        Row: {
          converted_invoice_id: string | null;
          created_at: string;
          currency: string;
          customer_id: string | null;
          estimate_number: string;
          expiry_date: string | null;
          id: string;
          issue_date: string;
          notes: string | null;
          status: string;
          subtotal: number;
          tax: number;
          total: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          converted_invoice_id?: string | null;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          estimate_number: string;
          expiry_date?: string | null;
          id?: string;
          issue_date?: string;
          notes?: string | null;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          converted_invoice_id?: string | null;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          estimate_number?: string;
          expiry_date?: string | null;
          id?: string;
          issue_date?: string;
          notes?: string | null;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "estimates_converted_invoice_id_fkey";
            columns: ["converted_invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "estimates_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
        ];
      };
      expenses: {
        Row: {
          amount: number;
          category: string | null;
          created_at: string;
          currency: string;
          description: string | null;
          expense_date: string;
          id: string;
          updated_at: string;
          user_id: string;
          vendor: string | null;
        };
        Insert: {
          amount?: number;
          category?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          expense_date?: string;
          id?: string;
          updated_at?: string;
          user_id: string;
          vendor?: string | null;
        };
        Update: {
          amount?: number;
          category?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          expense_date?: string;
          id?: string;
          updated_at?: string;
          user_id?: string;
          vendor?: string | null;
        };
        Relationships: [];
      };
      invoice_items: {
        Row: {
          amount: number;
          created_at: string;
          description: string;
          id: string;
          invoice_id: string;
          item_id: string | null;
          quantity: number;
          tax_rate: number;
          unit_price: number;
          user_id: string;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          description: string;
          id?: string;
          invoice_id: string;
          item_id?: string | null;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          description?: string;
          id?: string;
          invoice_id?: string;
          item_id?: string | null;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_items_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
      invoices: {
        Row: {
          created_at: string;
          currency: string;
          customer_id: string | null;
          due_date: string | null;
          id: string;
          invoice_number: string;
          issue_date: string;
          notes: string | null;
          status: string;
          subtotal: number;
          tax: number;
          total: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          due_date?: string | null;
          id?: string;
          invoice_number: string;
          issue_date?: string;
          notes?: string | null;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          due_date?: string | null;
          id?: string;
          invoice_number?: string;
          issue_date?: string;
          notes?: string | null;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
        ];
      };
      item_categories: {
        Row: {
          color: string | null;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      items: {
        Row: {
          category_id: string | null;
          cost: number;
          created_at: string;
          currency: string;
          description: string | null;
          id: string;
          is_active: boolean;
          name: string;
          price: number;
          sku: string | null;
          stock_quantity: number;
          tax_rate: number;
          track_inventory: boolean;
          type: string;
          unit: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category_id?: string | null;
          cost?: number;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          price?: number;
          sku?: string | null;
          stock_quantity?: number;
          tax_rate?: number;
          track_inventory?: boolean;
          type?: string;
          unit?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category_id?: string | null;
          cost?: number;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          price?: number;
          sku?: string | null;
          stock_quantity?: number;
          tax_rate?: number;
          track_inventory?: boolean;
          type?: string;
          unit?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "item_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      journal_entries: {
        Row: {
          created_at: string;
          entry_date: string;
          id: string;
          is_posted: boolean;
          memo: string | null;
          reference: string | null;
          source_id: string | null;
          source_type: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          entry_date?: string;
          id?: string;
          is_posted?: boolean;
          memo?: string | null;
          reference?: string | null;
          source_id?: string | null;
          source_type?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          entry_date?: string;
          id?: string;
          is_posted?: boolean;
          memo?: string | null;
          reference?: string | null;
          source_id?: string | null;
          source_type?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      journal_lines: {
        Row: {
          account_id: string;
          created_at: string;
          credit: number;
          debit: number;
          description: string | null;
          entry_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          credit?: number;
          debit?: number;
          description?: string | null;
          entry_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          credit?: number;
          debit?: number;
          description?: string | null;
          entry_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "journal_lines_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "journal_lines_entry_id_fkey";
            columns: ["entry_id"];
            isOneToOne: false;
            referencedRelation: "journal_entries";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          customer_id: string | null;
          deposit_account_id: string | null;
          id: string;
          invoice_id: string;
          method: string;
          notes: string | null;
          payment_date: string;
          reference: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          deposit_account_id?: string | null;
          id?: string;
          invoice_id: string;
          method?: string;
          notes?: string | null;
          payment_date?: string;
          reference?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          deposit_account_id?: string | null;
          id?: string;
          invoice_id?: string;
          method?: string;
          notes?: string | null;
          payment_date?: string;
          reference?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_deposit_account_id_fkey";
            columns: ["deposit_account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          default_currency: string;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          default_currency?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          default_currency?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      purchase_order_items: {
        Row: {
          account_id: string | null;
          amount: number;
          created_at: string;
          description: string;
          id: string;
          item_id: string | null;
          po_id: string;
          quantity: number;
          tax_rate: number;
          unit_price: number;
          user_id: string;
        };
        Insert: {
          account_id?: string | null;
          amount?: number;
          created_at?: string;
          description: string;
          id?: string;
          item_id?: string | null;
          po_id: string;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id: string;
        };
        Update: {
          account_id?: string | null;
          amount?: number;
          created_at?: string;
          description?: string;
          id?: string;
          item_id?: string | null;
          po_id?: string;
          quantity?: number;
          tax_rate?: number;
          unit_price?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_order_items_po_id_fkey";
            columns: ["po_id"];
            isOneToOne: false;
            referencedRelation: "purchase_orders";
            referencedColumns: ["id"];
          },
        ];
      };
      purchase_orders: {
        Row: {
          converted_bill_id: string | null;
          created_at: string;
          currency: string;
          expected_date: string | null;
          id: string;
          notes: string | null;
          order_date: string;
          po_number: string;
          status: string;
          subtotal: number;
          tax: number;
          total: number;
          updated_at: string;
          user_id: string;
          vendor_id: string | null;
        };
        Insert: {
          converted_bill_id?: string | null;
          created_at?: string;
          currency?: string;
          expected_date?: string | null;
          id?: string;
          notes?: string | null;
          order_date?: string;
          po_number: string;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id: string;
          vendor_id?: string | null;
        };
        Update: {
          converted_bill_id?: string | null;
          created_at?: string;
          currency?: string;
          expected_date?: string | null;
          id?: string;
          notes?: string | null;
          order_date?: string;
          po_number?: string;
          status?: string;
          subtotal?: number;
          tax?: number;
          total?: number;
          updated_at?: string;
          user_id?: string;
          vendor_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "purchase_orders_converted_bill_id_fkey";
            columns: ["converted_bill_id"];
            isOneToOne: false;
            referencedRelation: "bills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_orders_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          },
        ];
      };
      recurring_invoices: {
        Row: {
          created_at: string;
          customer_id: string | null;
          frequency: string;
          id: string;
          is_active: boolean;
          last_run_date: string | null;
          next_run_date: string;
          template_invoice_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          customer_id?: string | null;
          frequency: string;
          id?: string;
          is_active?: boolean;
          last_run_date?: string | null;
          next_run_date: string;
          template_invoice_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string | null;
          frequency?: string;
          id?: string;
          is_active?: boolean;
          last_run_date?: string | null;
          next_run_date?: string;
          template_invoice_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recurring_invoices_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recurring_invoices_template_invoice_id_fkey";
            columns: ["template_invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
        ];
      };
      stock_movements: {
        Row: {
          balance_after: number | null;
          created_at: string;
          id: string;
          invoice_id: string | null;
          item_id: string;
          note: string | null;
          quantity_change: number;
          reason: string;
          user_id: string;
        };
        Insert: {
          balance_after?: number | null;
          created_at?: string;
          id?: string;
          invoice_id?: string | null;
          item_id: string;
          note?: string | null;
          quantity_change: number;
          reason: string;
          user_id: string;
        };
        Update: {
          balance_after?: number | null;
          created_at?: string;
          id?: string;
          invoice_id?: string | null;
          item_id?: string;
          note?: string | null;
          quantity_change?: number;
          reason?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stock_movements_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_movements_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
      vendors: {
        Row: {
          address: string | null;
          created_at: string;
          email: string | null;
          id: string;
          is_1099: boolean;
          name: string;
          notes: string | null;
          payment_terms: number;
          phone: string | null;
          tax_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_1099?: boolean;
          name: string;
          notes?: string | null;
          payment_terms?: number;
          phone?: string | null;
          tax_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_1099?: boolean;
          name?: string;
          notes?: string | null;
          payment_terms?: number;
          phone?: string | null;
          tax_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      apply_invoice_stock:
        | {
            Args: { _direction: number; _invoice_id: string };
            Returns: undefined;
          }
        | {
            Args: { _direction: number; _invoice_id: string; _reason?: string };
            Returns: undefined;
          };
      find_account: {
        Args: { _code: string; _user_id: string };
        Returns: string;
      };
      post_bill_journal: { Args: { _bill_id: string }; Returns: undefined };
      post_bill_payment_journal: {
        Args: { _pay_id: string };
        Returns: undefined;
      };
      post_credit_note_journal: { Args: { _cn_id: string }; Returns: undefined };
      post_payment_journal: {
        Args: { _payment_id: string };
        Returns: undefined;
      };
      recalc_bill_status: { Args: { _bill_id: string }; Returns: undefined };
      recalc_invoice_status: {
        Args: { _invoice_id: string };
        Returns: undefined;
      };
      seed_default_accounts: { Args: { _user_id: string }; Returns: undefined };
    };
    Enums: {
      account_type: "asset" | "liability" | "equity" | "revenue" | "expense";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      account_type: ["asset", "liability", "equity", "revenue", "expense"],
    },
  },
} as const;
