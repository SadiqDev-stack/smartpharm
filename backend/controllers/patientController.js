import Patient from "../models/patient.js";
import { log } from "../middlewares/logger.js";

export const getPatients = async (req, res) => {
  try {
    const { search = "", resolved = "", page = 1, limit = 20 } = req.query;
    const userId = req.user?._id;
    const skip = (page - 1) * limit;

    const filter = { userId };
    if (search) filter.name = { $regex: search, $options: "i" };
    if (resolved !== "") filter.isResolved = resolved === "true";

    const patients = await Patient.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Patient.countDocuments(filter);

    res.json({
      success: true,
      data: patients,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching patients" });
  }
};

export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const patient = await Patient.findOne({ _id: id, userId });
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    res.json({ success: true, data: patient });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching patient" });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { name, phone, gender, age, condition, location, healthData, notes } = req.body;
    const userId = req.user?._id;

    if (!name) return res.status(400).json({ success: false, message: "Patient name required" });

    const patient = new Patient({
      name,
      phone,
      gender,
      age,
      condition,
      location,
      healthData,
      notes,
      userId,
      createdBy: userId,
    });

    await patient.save();
    res.status(201).json({ success: true, data: patient, message: "Patient created" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error creating patient" });
  }
};

export const addDosage = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, description } = req.body;
    const userId = req.user?._id;

    const patient = await Patient.findOne({ _id: id, userId });
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    patient.dosageSchedule.push({
      label,
      description,
      prescribedDate: new Date(),
      completed: false,
    });

    await patient.save();
    res.json({ success: true, data: patient, message: "Dosage added" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error adding dosage" });
  }
};

export const completeDosage = async (req, res) => {
  try {
    const { id, dosageId } = req.params;
    const userId = req.user?._id;

    const patient = await Patient.findOne({ _id: id, userId });
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    const dosage = patient.dosageSchedule.find((d) => d._id.toString() === dosageId);
    if (!dosage) return res.status(404).json({ success: false, message: "Dosage not found" });

    dosage.completed = true;
    dosage.completedDate = new Date();
    patient.returningCount += 1;

    // Check if all dosages completed
    const allCompleted = patient.dosageSchedule.every((d) => d.completed);
    if (allCompleted && !patient.isResolved) {
      patient.isResolved = true;
      patient.resolutionHistory.push({
        date: new Date(),
        status: "Resolved",
        snapshot: patient.healthData,
      });
    }

    await patient.save();
    res.json({ success: true, data: patient, message: "Dosage completed" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error completing dosage" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?._id;

    const patient = await Patient.findOneAndUpdate({ _id: id, userId }, { ...updates, updatedAt: new Date() }, { new: true });

    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    res.json({ success: true, data: patient, message: "Patient updated" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error updating patient" });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const patient = await Patient.findOneAndDelete({ _id: id, userId });
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    res.json({ success: true, message: "Patient deleted" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error deleting patient" });
  }
};
