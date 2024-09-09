import { useState, useEffect } from "react";
import {
  calculateAverageMedicationPrice,
  calculateTotalParticipants,
} from "../utils/dataUtils";
import { filterData } from "../utils/filterUtils";
import DashboardFilters from "../components/DashboardFilters";
import DashboardKPIs from "../components/DashboardKPIs";
import DashboardCharts from "../components/DashboardCharts";
import LanguageSelector from "../components/LanguageSelector";
import {
  AllData,
  DataSet,
  MedicationData,
  ResearchData,
} from "@/types/dataTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setDataSet } from "../slices/dataSetSlice";
import { setSelectedHospital } from "../slices/dataSlice";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const dataSet = useSelector((state: RootState) => state.dataSet.value);
  const data = useSelector((state: RootState) => state.data);
  const selectedHospital = useSelector(
    (state: RootState) => state.data.selectedHospital
  );
  const dispatch = useDispatch();

  const [currentData, setCurrentData] = useState<AllData | null>(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedResearchProject, setSelectedResearchProject] = useState("");

  useEffect(() => {
    if (dataSet === "hospital") {
      setCurrentData(data.hospital[selectedHospital]);
    } else if (dataSet === "research") {
      setCurrentData(data.research[0]);
    } else {
      setCurrentData(data[dataSet as keyof typeof data] as AllData);
    }
  }, [dataSet, data, selectedHospital]);

  const filteredData = currentData
    ? filterData(currentData, dataSet, dateRange, searchTerm, selectedSpecialty)
    : null;

  if (!filteredData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{t("dashboard")}</h1>
        <div className="flex space-x-4">
          <select
            value={dataSet}
            onChange={(e) => dispatch(setDataSet(e.target.value as DataSet))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base py-2 px-3 truncate"
          >
            <option value="hospital">{t("hospital")}</option>
            <option value="medication">{t("medication")}</option>
            <option value="research">{t("research")}</option>
          </select>
          {dataSet === "hospital" && (
            <select
              value={selectedHospital}
              onChange={(e) =>
                dispatch(setSelectedHospital(Number(e.target.value)))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base py-2 px-3 truncate"
            >
              {data.hospital.map((hospital, index) => (
                <option key={index} value={index}>
                  {/* {hospital.name} */}
                </option>
              ))}
            </select>
          )}
          <LanguageSelector />
        </div>
      </header>

      <DashboardFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        selectedResearchProject={selectedResearchProject}
        setSelectedResearchProject={setSelectedResearchProject}
        dataSet={dataSet}
        currentData={currentData}
      />

      <DashboardKPIs
        dataSet={dataSet}
        filteredData={filteredData}
        calculateAverageMedicationPrice={(data: AllData) =>
          "molecules" in data
            ? calculateAverageMedicationPrice(data as MedicationData)
            : 0
        }
        calculateTotalParticipants={(data: AllData) => {
          if ("clinicalTrials" in data) {
            return calculateTotalParticipants(data as ResearchData);
          }
          return 0;
        }}
      />

      <DashboardCharts dataSet={dataSet} filteredData={filteredData} />
    </div>
  );
}
