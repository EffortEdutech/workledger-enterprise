// Fictional partner-demo portfolio. No real customer or source-system data.
export const clientPortfolio = [
  {
    id: "client_northbank",
    name: "Northbank Development Group",
    sector: "Mixed-use development",
    projects: [{ id: "project_northbank", name: "Northbank Mixed Development", contract: "NB-042", status: "Active", value: "RM 48.2m", programme: "QS-PROG-v3", boq: "BOQ-REV-02", diaries: 9, evidence: 38, reports: 6 }],
  },
  {
    id: "client_meridian",
    name: "Meridian Infrastructure Partners",
    sector: "Infrastructure and utilities",
    projects: [{ id: "project_meridian", name: "Meridian Transit Enabling Works", contract: "MT-118", status: "Active", value: "RM 72.6m", programme: "QS-PROG-M2", boq: "BOQ-REV-M4", diaries: 14, evidence: 61, reports: 4 }],
  },
  {
    id: "client_harbourview",
    name: "Harbourview Property Holdings",
    sector: "Residential and commercial property",
    projects: [{ id: "project_harbourview", name: "Harbourview Residences", contract: "HV-207", status: "Pre-construction", value: "RM 31.8m", programme: "QS-PROG-H1", boq: "BOQ-REV-H1", diaries: 3, evidence: 12, reports: 1 }],
  },
];

export function getClientPortfolioSummary() {
  return clientPortfolio.map((client) => ({
    ...client,
    projectCount: client.projects.length,
    totalDiaries: client.projects.reduce((sum, project) => sum + project.diaries, 0),
    totalEvidence: client.projects.reduce((sum, project) => sum + project.evidence, 0),
  }));
}
