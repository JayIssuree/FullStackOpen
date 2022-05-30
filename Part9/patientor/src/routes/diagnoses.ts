import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses:Diagnosis[] = diagnosesService.getDiagnoses()
  res.send(diagnoses);
});

export default router;