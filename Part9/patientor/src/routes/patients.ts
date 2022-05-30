import express from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatientData } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: NonSensitivePatientData[] = patientsService.getNonSentitivePatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation} = req.body;
  const newPatient = patientsService.addPatient(name, dateOfBirth, ssn, gender, occupation)
  res.send(newPatient)
})

export default router;