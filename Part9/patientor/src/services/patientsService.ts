import patientsData from '../../data/patients.json';
import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSentitivePatients = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): NewPatientEntry => {
    const newPatient = {
        id: uuid(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSentitivePatients,
    addPatient
};