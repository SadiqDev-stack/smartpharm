import Invoice from "../models/invoice.js";
import { log } from "../middlewares/logger.js";

const generateInvoiceNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `INV-${date}-${random}`;
};

export const getInvoices = async (req, res) => {
  try {
    const { search = "", type = "", completed = "", page = 1, limit = 20 } = req.query;
    const userId = req.user?._id;
    const skip = (page - 1) * limit;

    const filter = { userId };
    if (search) filter.invoiceNumber = { $regex: search, $options: "i" };
    if (type) filter.type = type;
    if (completed !== "") filter.isCompleted = completed === "true";

    const invoices = await Invoice.find(filter).skip(skip).limit(limit).sort({ invoiceDate: -1 });
    const total = await Invoice.countDocuments(filter);

    res.json({
      success: true,
      data: invoices,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching invoices" });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const invoice = await Invoice.findOne({ _id: id, userId }).populate("items.productId");
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    res.json({ success: true, data: invoice });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching invoice" });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { type, items, customerDetails, notes } = req.body;
    const userId = req.user?._id;

    if (!type || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invoice type and items required" });
    }

    // Calculate totals
    const totalAmount = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

    const invoice = new Invoice({
      invoiceNumber: generateInvoiceNumber(),
      type,
      items,
      totalAmount,
      customerDetails,
      notes,
      invoiceDate: new Date(),
      userId,
      createdBy: userId,
    });

    await invoice.save();
    res.status(201).json({ success: true, data: invoice, message: "Invoice created" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error creating invoice" });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, customerDetails, notes, isCompleted } = req.body;
    const userId = req.user?._id;

    const invoice = await Invoice.findOne({ _id: id, userId });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    if (items) {
      invoice.items = items;
      invoice.totalAmount = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    }
    if (customerDetails) invoice.customerDetails = { ...invoice.customerDetails, ...customerDetails };
    if (notes !== undefined) invoice.notes = notes;
    if (isCompleted !== undefined) {
      invoice.isCompleted = isCompleted;
      if (isCompleted) invoice.completedDate = new Date();
    }

    await invoice.save();
    res.json({ success: true, data: invoice, message: "Invoice updated" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error updating invoice" });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const invoice = await Invoice.findOneAndDelete({ _id: id, userId });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    res.json({ success: true, message: "Invoice deleted" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error deleting invoice" });
  }
};

export const markCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, userId },
      { isCompleted: true, completedDate: new Date() },
      { new: true }
    );

    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    res.json({ success: true, data: invoice, message: "Invoice completed" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error completing invoice" });
  }
};
