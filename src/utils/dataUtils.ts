import { MedicationData, ResearchData } from "../types/dataTypes";

export const calculateAverageMedicationPrice = (data: MedicationData) => {
  let totalPrice = 0;
  let totalMedications = 0;
  data.molecules?.forEach((mol) => {
    mol.medications?.forEach((med) => {
      if (med.priceHistory && med.priceHistory.length > 0) {
        totalPrice += med.priceHistory[med.priceHistory.length - 1].priceEUR;
        totalMedications++;
      }
    });
  });
  return totalMedications > 0 ? totalPrice / totalMedications : 0;
};

export const calculateTotalParticipants = (data: ResearchData) => {
  return (
    data.clinicalTrials?.reduce(
      (total, trial) => total + trial.totalParticipants,
      0
    ) || 0
  );
};
