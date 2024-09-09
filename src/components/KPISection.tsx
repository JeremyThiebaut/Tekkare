import KPICard from "./KPICard";
import { AllData } from "../types/dataTypes";
import { useTranslation } from "react-i18next";

interface KPISectionProps {
  filteredData: AllData;
  calculateValue: (data: AllData) => number | string;
  title: string;
  icon: string;
}

export default function KPISection({
  filteredData,
  calculateValue,
  title,
  icon,
}: KPISectionProps) {
  const { t } = useTranslation();

  return (
    <KPICard
      title={t(title)}
      value={calculateValue(filteredData).toString()}
      icon={icon}
    />
  );
}
