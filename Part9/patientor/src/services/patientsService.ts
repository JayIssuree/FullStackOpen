import patientsData from '../../data/patients.json';
import { Patient, NewPatientEntry, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientsData;

const getPatients = (): PublicPatient[] => {
  return patients;
};

const getNonSentitivePatients = (): PublicPatient[] => {
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
        occupation,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
};

const findPatient = (id: string): Patient => {
    const patient = patients.find(patient => patient.id === id);
    if (!patient){
        return {
            id: id,
            name: "undefined",
            ssn: "undefined",
            dateOfBirth: "undefined",
            gender: "undefined",
            occupation: "undefined",
            entries: []
        }
    } else {
        return {
            id: id,
            name: patient.name,
            ssn: patient.ssn,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
            entries: patient.entries
        }
    }
}

export default {
    getPatients,
    getNonSentitivePatients,
    addPatient,
    findPatient
};