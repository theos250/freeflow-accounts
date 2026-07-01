import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCurrency } from "./currencies";

export type PdfCompany = {
  name?: string | null;
  logo_url?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  tax_number?: string | null;
};

export type PdfCustomer = {
  name?: string | null;
  email?: string | null;
  address?: string | null;
};

export type PdfInvoice = {
  invoice_number: string;
  issue_date: string;
  due_date: string | null;
  status: string;
  currency: string;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string | null;
};

export type PdfLine = {
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
};

async function loadImageDataUrl(url: string): Promise<{ dataUrl: string; w: number; h: number } | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    const dataUrl: string = await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
    const dims: { w: number; h: number } = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ w: 0, h: 0 });
      img.src = dataUrl;
    });
    return { dataUrl, w: dims.w, h: dims.h };
  } catch {
    return null;
  }
}

export async function generateInvoicePdf(opts: {
  invoice: PdfInvoice;
  lines: PdfLine[];
  company: PdfCompany | null;
  customer: PdfCustomer | null;
}) {
  const { invoice, lines, company, customer } = opts;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let cursorY = margin;

  // Logo
  if (company?.logo_url) {
    const img = await loadImageDataUrl(company.logo_url);
    if (img && img.w && img.h) {
      const maxW = 120, maxH = 60;
      const ratio = Math.min(maxW / img.w, maxH / img.h);
      const w = img.w * ratio, h = img.h * ratio;
      try { doc.addImage(img.dataUrl, "PNG", margin, cursorY, w, h); } catch {}
    }
  }

  // Company block (right)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const rightX = pageWidth - margin;
  let ry = cursorY;
  if (company?.name) { doc.text(company.name, rightX, ry, { align: "right" }); ry += 14; }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const compLines = [
    company?.address,
    [company?.city, company?.state, company?.postal_code].filter(Boolean).join(", "),
    company?.country,
    company?.email,
    company?.phone,
    company?.website,
    company?.tax_number ? `Tax #: ${company.tax_number}` : null,
  ].filter((x): x is string => Boolean(x && x.trim()));
  compLines.forEach((l) => { doc.text(l, rightX, ry, { align: "right" }); ry += 12; });

  cursorY = Math.max(cursorY + 70, ry + 10);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INVOICE", margin, cursorY);
  cursorY += 8;

  // Meta
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const metaY = cursorY + 16;
  doc.text(`Invoice #: ${invoice.invoice_number}`, margin, metaY);
  doc.text(`Issue date: ${invoice.issue_date}`, margin, metaY + 14);
  if (invoice.due_date) doc.text(`Due date: ${invoice.due_date}`, margin, metaY + 28);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, rightX, metaY, { align: "right" });

  // Bill to
  let billY = metaY + 56;
  doc.setFont("helvetica", "bold");
  doc.text("Bill to", margin, billY);
  doc.setFont("helvetica", "normal");
  billY += 14;
  if (customer?.name) { doc.text(customer.name, margin, billY); billY += 12; }
  if (customer?.email) { doc.text(customer.email, margin, billY); billY += 12; }
  if (customer?.address) {
    customer.address.split("\n").forEach((l) => { doc.text(l, margin, billY); billY += 12; });
  }

  // Table
  const body = lines.map((l) => {
    const amount = l.quantity * l.unit_price;
    const withTax = amount + amount * (l.tax_rate / 100);
    return [
      l.description || "—",
      String(l.quantity),
      formatCurrency(l.unit_price, invoice.currency),
      `${l.tax_rate || 0}%`,
      formatCurrency(withTax, invoice.currency),
    ];
  });

  autoTable(doc, {
    startY: billY + 12,
    head: [["Description", "Qty", "Unit price", "Tax", "Amount"]],
    body,
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    columnStyles: {
      1: { halign: "right" },
      2: { halign: "right" },
      3: { halign: "right" },
      4: { halign: "right" },
    },
    margin: { left: margin, right: margin },
  });

  // Totals
  // @ts-ignore
  const endY = (doc as any).lastAutoTable.finalY + 12;
  const totalsX = pageWidth - margin;
  const labelX = totalsX - 140;
  doc.setFontSize(10);
  doc.text("Subtotal", labelX, endY);
  doc.text(formatCurrency(invoice.subtotal, invoice.currency), totalsX, endY, { align: "right" });
  doc.text("Tax", labelX, endY + 14);
  doc.text(formatCurrency(invoice.tax, invoice.currency), totalsX, endY + 14, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total", labelX, endY + 32);
  doc.text(formatCurrency(invoice.total, invoice.currency), totalsX, endY + 32, { align: "right" });

  if (invoice.notes) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Notes", margin, endY + 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const wrapped = doc.splitTextToSize(invoice.notes, pageWidth - margin * 2);
    doc.text(wrapped, margin, endY + 74);
  }

  doc.save(`invoice-${invoice.invoice_number}.pdf`);
}
