import { AllData, DataSet } from "../types/dataTypes";

export const filterData = (
  data: AllData,
  dataSet: DataSet,
  dateRange: { start: string; end: string },
  searchTerm: string,
  selectedSpecialty: string
): AllData => {
  if (!data) return data;

  const filteredData = { ...data };

  if (dateRange.start && dateRange.end) {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);

    if (dataSet === "hospital" && "monthlyHospitalizations" in filteredData) {
      filteredData.monthlyHospitalizations =
        filteredData.monthlyHospitalizations.filter((item) => {
          const date = new Date(`${item.year}-${item.month}-01`);
          return date >= start && date <= end;
        });
    } else if (dataSet === "medication" && "molecules" in filteredData) {
      filteredData.molecules = filteredData.molecules.map((mol) => ({
        ...mol,
        medications: mol.medications.map((med) => ({
          ...med,
          priceHistory: med.priceHistory.filter((price) => {
            const date = new Date(price.date);
            return date >= start && date <= end;
          }),
        })),
      }));
    } else if (dataSet === "research" && "clinicalTrials" in filteredData) {
      filteredData.clinicalTrials = filteredData.clinicalTrials.filter(
        (trial) => {
          const startDate = new Date(trial.startDate);
          return startDate >= start && startDate <= end;
        }
      );
    }
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    if (dataSet === "hospital" && "doctorSpecialties" in filteredData) {
      filteredData.doctorSpecialties = filteredData.doctorSpecialties.filter(
        (specialty) => specialty.specialty.toLowerCase().includes(term)
      );
    } else if (dataSet === "medication" && "molecules" in filteredData) {
      filteredData.molecules = filteredData.molecules.filter(
        (mol) =>
          mol.name.toLowerCase().includes(term) ||
          mol.medications.some((med) => med.name.toLowerCase().includes(term))
      );
    } else if (dataSet === "research" && "publications" in filteredData) {
      filteredData.publications = filteredData.publications.filter((pub) =>
        pub.title.toLowerCase().includes(term)
      );
    }
  } else if (
    dataSet === "hospital" &&
    "doctorSpecialties" in filteredData &&
    selectedSpecialty
  ) {
    filteredData.doctorSpecialties = filteredData.doctorSpecialties.filter(
      (specialty) => specialty.specialty === selectedSpecialty
    );
  }

  return filteredData;
};
