import Chart from "./Chart";
import {
  DataSet,
  AllData,
  Molecule,
  FundingSource,
  ClinicalTrial,
} from "../types/dataTypes";
import { useTranslation } from "react-i18next";

interface DashboardChartsProps {
  dataSet: DataSet;
  filteredData: AllData;
}

interface ResearchTeamMember {
  name: string;
  role: string;
  specialty: string;
}

export default function DashboardCharts({
  dataSet,
  filteredData,
}: DashboardChartsProps) {
  const { t } = useTranslation();
  const renderCharts = () => {
    switch (dataSet) {
      case "hospital":
        return (
          <>
            <Chart
              type="line"
              title={t("hospitalizations")}
              data={
                "monthlyHospitalizations" in filteredData
                  ? filteredData.monthlyHospitalizations.map((item) => ({
                      ...item,
                      month: item.month.toString(),
                    }))
                  : []
              }
            />
            <Chart
              type="bar"
              title={t("medicalSpecialties")}
              data={
                "doctorSpecialties" in filteredData
                  ? filteredData.doctorSpecialties
                  : []
              }
            />
          </>
        );
      case "medication":
        return (
          <>
            <Chart
              type="bar"
              title={t("numberOfMedicationsPerMolecule")}
              data={
                "molecules" in filteredData
                  ? filteredData.molecules?.map((mol: Molecule) => ({
                      name: mol.name,
                      value: mol.medications?.length || 0,
                      medications:
                        mol.medications?.map((med) => med.name) || [],
                    }))
                  : []
              }
            />
            <Chart
              type="bar"
              title={t("priceEvolution")}
              data={
                "molecules" in filteredData
                  ? filteredData.molecules?.flatMap((mol: Molecule) =>
                      mol.medications?.map((med) => ({
                        name: `${mol.name} - ${med.name}`,
                        value:
                          med.priceHistory[med.priceHistory.length - 1]
                            .priceEUR,
                      }))
                    )
                  : []
              }
            />
            <div className="col-span-1 lg:col-span-2 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {t("medicationList")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {"molecules" in filteredData &&
                  filteredData.molecules?.map(
                    (molecule: Molecule, index: number) => (
                      <div
                        key={index}
                        className="bg-white shadow rounded-lg p-4"
                      >
                        <h4 className="text-lg font-semibold mb-2 text-gray-800">
                          {molecule.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {molecule.description}
                        </p>
                        {molecule.medications?.map((med, medIndex) => (
                          <div key={medIndex} className="mb-2 last:mb-0">
                            <h5 className="font-medium text-gray-800">
                              {med.name} ({med.dosage})
                            </h5>
                            <p className="text-sm text-gray-500">
                              {t("latestPrice")}: €
                              {med.priceHistory[
                                med.priceHistory.length - 1
                              ].priceEUR.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
              </div>
            </div>
          </>
        );
      case "research":
        if (
          "funding" in filteredData &&
          "clinicalTrials" in filteredData &&
          "publications" in filteredData
        ) {
          return (
            <>
              <Chart
                type="bar"
                title={t("fundingSources")}
                data={filteredData.funding.sources.map(
                  (source: FundingSource) => ({
                    name: source.name,
                    value: source.amount,
                  })
                )}
              />
              <Chart
                type="line"
                title={t("clinicalTrialsProgress")}
                data={filteredData.clinicalTrials.map(
                  (trial: ClinicalTrial) => ({
                    date: trial.startDate,
                    value: trial.totalParticipants,
                  })
                )}
              />
              <div className="col-span-1 lg:col-span-2 mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {t("researchDetails")}
                </h3>
                <div className="bg-white shadow rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    {filteredData.projectName}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("researchField")}: {filteredData.researchField}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("leadInstitution")}: {filteredData.leadInstitution}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("startDate")}: {filteredData.startDate}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("endDate")}: {filteredData.endDate}
                  </p>
                  <h5 className="font-medium text-gray-800 mt-4 mb-2">
                    {t("researchTeam")}
                  </h5>
                  {(filteredData.researchTeam as unknown as ResearchTeamMember[]).map(
                    (member: ResearchTeamMember, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-sm text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-600">
                          {member.role} - {member.specialty}
                        </p>
                      </div>
                    )
                  )}
                  <h5 className="font-medium text-gray-800 mt-4 mb-2">
                    {t("publications")}
                  </h5>
                  {filteredData.publications.map((pub, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-sm text-gray-800">{pub.title}</p>
                      <p className="text-xs text-gray-600">
                        {pub.journal} - {pub.publicationDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        }
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {renderCharts()}
    </div>
  );
}

interface ResearchTeamMember {
  name: string;
  role: string;
  specialty: string;
}
