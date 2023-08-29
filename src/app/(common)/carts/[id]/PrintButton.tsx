"use client";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { IoMdPrint } from "react-icons/io";

interface Props {
  categories: string[];
  cart: any;
  userName: string;
}

export function PrintButton({ cart, categories, userName }: Props) {
  async function print() {
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw a string of text toward the top of the page
    page.moveTo(50, height - 40);

    page.drawText(cart.customer.company, { size: 32, font: helveticaBold });
    page.moveDown(28);
    page.drawText(cart.customer.name, { size: 16, font: helvetica });

    cart?.orders?.forEach((order: any) => {
      page.moveDown(36);
      page.drawText(order.customer === "You" ? userName : order.customer, {
        size: 16,
        font: helveticaBold,
      });
      categories.forEach((category) => {
        const products = order.products.filter(
          (product: any) => product.product.category.name === category
        );
        if (products.length === 0) return;
        page.moveDown(24);
        page.drawText(category, { size: 14, font: helveticaBold });
        products.forEach((product: any) => {
          page.moveDown(16);
          page.drawText(product.product.name, { size: 12 });
        });
      });
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }
  return (
    <IoMdPrint size={32} className="hover:cursor-pointer" onClick={print} />
  );
}
