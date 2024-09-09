export type DataSet = "hospital" | "medication" | "research";

export type HospitalData = {
  overview: {
    totalPatients: number;
    satisfactionRate: string;
    numberOfDoctors: number;
    averageLengthOfStay: number;
  };
  monthlyHospitalizations: Array<{
    year: number;
    month: number;
    count: number;
  }>;
  doctorSpecialties: Array<{ specialty: string; count: number }>;
  patientAgeDistribution: Array<{ ageRange: string; count: number }>;
  id: number;
  name: string;
};

export type MedicationData = {
  molecules: Array<{
    description: string;
    name: string;
    medications: Array<{
      dosage: string;
      name: string;
      priceHistory: Array<{ date: string; priceEUR: number }>;
      category: string;
    }>;
  }>;
  id: number;
  name: string;
};

export type ResearchData = {
  projectName: string | Iterable<string>;
  researchField: string | Iterable<string>;
  leadInstitution: string | Iterable<string>;
  startDate: string | Iterable<string>;
  endDate: string | Iterable<string>;
  researchTeam: string[];
  funding: {
    totalAmount: number;
    sources: Array<{ name: string; amount: number }>;
  };
  clinicalTrials: Array<{ startDate: string; totalParticipants: number }>;
  publications: Array<{
    journal: string | Iterable<string>;
    publicationDate: string | Iterable<string>;
    title: string;
    field: string;
  }>;
  id: number;
  name: string;
};

export type AllData = HospitalData | MedicationData | ResearchData;

export type Medication = {
  dosage: string;
  name: string;
  priceHistory: Array<{ date: string; priceEUR: number }>;
};

export type Molecule = {
  description: string | Iterable<string>;
  name: string;
  medications: Medication[];
};

export type FundingSource = {
  name: string;
  amount: number;
};

export type ClinicalTrial = {
  startDate: string;
  totalParticipants: number;
};
