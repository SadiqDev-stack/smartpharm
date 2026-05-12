import express from "express";
import {
  getPatients,
  getPatient,
  createPatient,
  addDosage,
  completeDosage,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/", getPatients);
router.get("/:id", getPatient);
router.post("/", createPatient);
router.post("/:id/dosage", addDosage);
router.patch("/:id/dosage/:dosageId/complete", completeDosage);
router.patch("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
