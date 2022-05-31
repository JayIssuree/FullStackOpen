import express from 'express';
import patientsService from '../services/patientsService';
import { PublicPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: PublicPatient[] = patientsService.getNonSentitivePatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation} = req.body;
  const newPatient = patientsService.addPatient(name, dateOfBirth, ssn, gender, occupation)
  res.send(newPatient)
})

router.get('/:id', (req, res) => {
  const foundPatient = patientsService.findPatient(req.params.id)
  res.send(foundPatient)
})

export default router;