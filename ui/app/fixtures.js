export const fixtureContext = {
  mode: "local-fixture",
  organisation: { id: "org_syn_northbank", name: "Northbank Development" },
  project: { id: "project_syn_northbank", name: "Northbank Mixed Development" },
  contract: { id: "contract_syn_nb042", number: "NB-042", status: "Active" },
  appointment: { role: "project-director", capabilities: ["read:home", "read:projects", "read:contract", "read:reports"], status: "active" }
};

export const roles = [
  { id: "project-director", label: "Project Director", capabilities: ["read:home", "read:projects", "read:contract", "read:reports"] },
  { id: "contract-admin", label: "Contract Administrator", capabilities: ["read:home", "read:projects", "read:contract", "write:contract", "read:diary", "read:audit"] },
  { id: "site-manager", label: "Site Manager", capabilities: ["read:home", "read:diary", "write:diary", "read:progress"] },
  { id: "site-supervisor", label: "Site Supervisor", capabilities: ["read:home", "read:diary", "read:progress", "write:diary"] },
  { id: "quantity-surveyor", label: "Quantity Surveyor", capabilities: ["read:home", "read:programme", "read:boq", "read:progress", "read:reports"] },
  { id: "independent-reviewer", label: "Independent Reviewer", capabilities: ["read:home", "read:progress", "write:review", "read:audit"] },
  { id: "auditor", label: "Auditor / Legal Reviewer", capabilities: ["read:home", "read:contract", "read:audit", "read:reports"] }
];

export const navItems = [
  { id: "home", label: "Home", icon: "⌂", capability: "read:home" },
  { id: "projects", label: "Projects", icon: "▦", capability: "read:projects" },
  { id: "contract", label: "Contract Control", icon: "▤", capability: "read:contract" },
  { id: "diary", label: "Site Diary", icon: "◷", capability: "read:diary" },
  { id: "programme", label: "Programme", icon: "⌁", capability: "read:programme" },
  { id: "boq", label: "BOQ & QS", icon: "▧", capability: "read:boq" },
  { id: "progress", label: "Progress", icon: "◈", capability: "read:progress" },
  { id: "audit", label: "Audit & Evidence", icon: "⌕", capability: "read:audit" },
  { id: "reports", label: "Reports", icon: "▥", capability: "read:reports" },
  { id: "admin", label: "Administration", icon: "⚙", capability: "read:admin" }
];

export const fixtureTasks = [
  { id: "QS-1042", name: "Site establishment", wbs: "A.10", finish: "19 Nov 2026", progress: 82, state: "Verified", source: "D-2026-1110" },
  { id: "QS-1071", name: "Substructure concrete", wbs: "B.20", finish: "25 Nov 2026", progress: 46, state: "Verified", source: "D-2026-1112" },
  { id: "QS-1128", name: "Inspection and handover", wbs: "C.30", finish: "02 Dec 2026", progress: null, state: "Not assessed", source: "Awaiting diary" }
];
