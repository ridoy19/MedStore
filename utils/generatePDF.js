const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require('moment')

function createInvoice(invoice, path) {
    let doc = new PDFDocument({
        size: "A4",
        margin: 50
    });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
    doc
        .image("logo.png", 50, 45, {
            width: 50
        })
        .fillColor("#444444")
        .fontSize(20)
        .text("MediStore.", 110, 57)
        .fontSize(10)
        .text("MediStore.", 200, 50, {
            align: "right"
        })
        .text("House # 62, Road # 13, Sector # 10", 200, 65, {
            align: "right"
        })
        .text("Uttara, Dhaka, Bangladesh", 200, 80, {
            align: "right"
        })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("Order Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice._id, 150, customerInformationTop)
        .font("Helvetica")
        .text("Order Date:", 50, customerInformationTop + 15)
        .text(moment(invoice.createAt).format('lll'), 150, customerInformationTop + 15)
        .text("Shipping Address:", 300, customerInformationTop + 15)
        .font("Helvetica")
        .text(invoice.shipping_address, 385, customerInformationTop + 15)
        .moveDown();

    generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Unit Price",
        "Quantity",
        "Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.products.length; i++) {
        const item = invoice.products[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.brandName,
            item.price,
            item.count,
            parseFloat(item.total).toFixed(2)
        );

        generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "Subtotal",
        "",
        parseFloat(invoice.subtotal).toFixed(2)
    );
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Thank you for purchasing from us. Stay blessed, Stay Healthy :)",
            50,
            780, {
                align: "center",
                width: 500
            }
        );
}

function generateTableRow(
    doc,
    y,
    Item,
    UnitPrice,
    Quantity,
    Total
) {
    doc
        .fontSize(10)
        .text(Item, 50, y)
        .text(UnitPrice, 150, y)
        .text(Quantity, 280, y, {
            width: 90,
            align: "right"
        })
        .text(Total, 370, y, {
            width: 90,
            align: "right"
        })
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

module.exports = {
    createInvoice
};