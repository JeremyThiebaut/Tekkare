import KPISection from "./KPISection";
import { DataSet, AllData } from "../types/dataTypes";
import { useTranslation } from "react-i18next";

interface DashboardKPIsProps {
  dataSet: DataSet;
  filteredData: AllData;
  calculateAverageMedicationPrice: (data: AllData) => number;
  calculateTotalParticipants: (data: AllData) => number;
}

export default function DashboardKPIs({
  dataSet,
  filteredData,
  calculateAverageMedicationPrice,
  calculateTotalParticipants,
}: DashboardKPIsProps) {
  const { t } = useTranslation();
  const kpiSections: Record<
    DataSet,
    Array<{
      title: string;
      calculateValue: (data: AllData) => number | string;
      icon: string;
    }>
  > = {
    hospital: [
      {
        title: t("totalPatients"),
        calculateValue: (data: AllData) =>
          "overview" in data ? data.overview.totalPatients : 0,
        icon: "🏥",
      },
      {
        title: t("satisfactionRate"),
        calculateValue: (data: AllData) =>
          "overview" in data ? data.overview.satisfactionRate : "0%",
        icon: "😊",
      },
    ],
    medication: [
      {
        title: t("averageMedicationPrice"),
        calculateValue: calculateAverageMedicationPrice,
        icon: "💊",
      },
    ],
    research: [
      {
        title: t("totalFunding"),
        calculateValue: (data: AllData) =>
          "funding" in data ? data.funding.totalAmount : 0,
        icon: "💰",
      },
      {
        title: t("totalParticipants"),
        calculateValue: calculateTotalParticipants,
        icon: "👥",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {kpiSections[dataSet].map((section, index) => (
        <KPISection
          key={index}
          filteredData={filteredData}
          calculateValue={section.calculateValue}
          title={section.title}
          icon={section.icon}
        />
      ))}
    </div>
  );
}
