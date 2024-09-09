import { DataSet, AllData, HospitalData } from "../types/dataTypes";
import { useTranslation } from "react-i18next";

interface DashboardFiltersProps {
  dateRange: { start: string; end: string };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ start: string; end: string }>
  >;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedSpecialty: string;
  setSelectedSpecialty: React.Dispatch<React.SetStateAction<string>>;
  dataSet: DataSet;
  currentData: AllData | null;
  selectedResearchProject: string;
  setSelectedResearchProject: React.Dispatch<React.SetStateAction<string>>;
}

export default function DashboardFilters({
  dateRange,
  setDateRange,
  searchTerm,
  setSearchTerm,
  selectedSpecialty,
  setSelectedSpecialty,
  dataSet,
  currentData,
  selectedResearchProject,
  setSelectedResearchProject,
}: DashboardFiltersProps) {
  const { t } = useTranslation();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setSelectedSpecialty("");
    }
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
    if (e.target.value) {
      setSearchTerm("");
    }
  };

  const handleResearchProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedResearchProject(e.target.value);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("startDate")}
        </label>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base py-2 px-3 truncate"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("endDate")}
        </label>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base py-2 px-3 truncate"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("search")}
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={`${t("search")} ...`}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base py-2 px-3 truncate"
        />
      </div>
      {dataSet === "hospital" &&
        currentData &&
        "doctorSpecialties" in currentData && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("specialty")}
            </label>
            <select
              value={selectedSpecialty}
              onChange={handleSpecialtyChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base py-2 px-3 truncate"
            >
              <option value="">{t("all")}</option>
              {(currentData as HospitalData).doctorSpecialties.map(
                (specialty) => (
                  <option key={specialty.specialty} value={specialty.specialty}>
                    {specialty.specialty}
                  </option>
                )
              )}
            </select>
          </div>
        )}
      {dataSet === "research" && Array.isArray(currentData) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("researchProject")}
          </label>
          <select
            value={selectedResearchProject}
            onChange={handleResearchProjectChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 text-base py-2 px-3 truncate"
          >
            <option value="">{t("all")}</option>
            {currentData.map((project, index) => (
              <option key={index} value={index.toString()}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
