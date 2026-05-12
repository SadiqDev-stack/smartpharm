import Loan from "../models/loan.js";
import { log } from "../middlewares/logger.js";

export const getLoans = async (req, res) => {
  try {
    const { search = "", status = "", page = 1, limit = 20 } = req.query;
    const userId = req.user?._id;
    const skip = (page - 1) * limit;

    const filter = { userId };
    if (search) {
      filter.$or = [
        { borrowerName: { $regex: search, $options: "i" } },
        { borrowerPhone: { $regex: search, $options: "i" } },
      ];
    }
    if (status) filter.loanStatus = status;

    const loans = await Loan.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Loan.countDocuments(filter);

    res.json({
      success: true,
      data: loans,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching loans" });
  }
};

export const getLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const loan = await Loan.findOne({ _id: id, userId }).populate("loanItems.productId");
    if (!loan) return res.status(404).json({ success: false, message: "Loan not found" });

    res.json({ success: true, data: loan });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching loan" });
  }
};

export const createLoan = async (req, res) => {
  try {
    const { borrowerName, borrowerPhone, borrowerGender, borrowerLocation, loanItems } = req.body;
    const userId = req.user?._id;

    if (!borrowerName || !borrowerPhone) {
      return res.status(400).json({ success: false, message: "Borrower name and phone required" });
    }

    // Calculate totals
    const totalLoanAmount = loanItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

    const loan = new Loan({
      borrowerName,
      borrowerPhone,
      borrowerGender,
      borrowerLocation,
      loanItems,
      amountSummary: {
        totalLoanAmount,
        totalPaid: 0,
        balanceRemaining: totalLoanAmount,
      },
      userId,
      createdBy: userId,
    });

    await loan.save();
    res.status(201).json({ success: true, data: loan, message: "Loan created" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error creating loan" });
  }
};

export const addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amountPaid, paymentMethod, paidBy, itemsCovered, notes } = req.body;
    const userId = req.user?._id;

    const loan = await Loan.findOne({ _id: id, userId });
    if (!loan) return res.status(404).json({ success: false, message: "Loan not found" });

    // Update payment tracking
    loan.amountSummary.totalPaid += amountPaid;
    loan.amountSummary.balanceRemaining = loan.amountSummary.totalLoanAmount - loan.amountSummary.totalPaid;

    // Add payment to history
    loan.paymentHistory.push({
      amountPaid,
      paymentMethod,
      paidBy,
      itemsCovered,
      notes,
    });

    // Update loan status
    if (loan.amountSummary.balanceRemaining <= 0) {
      loan.loanStatus = "fully_paid";
    } else {
      loan.loanStatus = "partial_paid";
    }

    await loan.save();
    res.json({ success: true, data: loan, message: "Payment recorded" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error adding payment" });
  }
};

export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const loan = await Loan.findOneAndDelete({ _id: id, userId });
    if (!loan) return res.status(404).json({ success: false, message: "Loan not found" });

    res.json({ success: true, message: "Loan deleted" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error deleting loan" });
  }
};

export const getOverdueLoans = async (req, res) => {
  try {
    const userId = req.user?._id;
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const loans = await Loan.find({
      userId,
      loanStatus: { $in: ["active", "partial_paid"] },
      createdAt: { $lt: thirtyDaysAgo },
      "amountSummary.balanceRemaining": { $gt: 0 },
    });

    res.json({ success: true, data: loans });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching overdue loans" });
  }
};
