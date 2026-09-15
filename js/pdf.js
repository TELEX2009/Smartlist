export function generatePrintableList(items) {
  if (!items.length) {
    alert("Please select at least one grocery item.");
    return;
  }

  const rows = items.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.ta} / ${item.en}</td>
      <td>${item.quantity} ${item.unit}</td>
    </tr>
  `).join("");

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>SRI Grocery Planner List</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 28px; color: #222; }
        h1 { margin-bottom: 4px; }
        p { color: #666; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 22px; }
        th, td { border: 1px solid #bbb; padding: 10px; text-align: left; }
        th { background: #f2f2f2; }
        .footer { margin-top: 18px; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>SRI Grocery Planner</h1>
      <p>Generated on ${new Date().toLocaleDateString()}</p>
      <table>
        <thead>
          <tr><th>No</th><th>Item</th><th>Quantity</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">Total Items: ${items.length}</div>
      <script>window.onload = () => window.print();<\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}
