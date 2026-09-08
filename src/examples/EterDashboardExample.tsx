import React, { useState } from "react";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/Card";
import { Badge } from "../components/Badge";
import { Input, Select, Textarea } from "../components/Input";
import { PatientHeader } from "../components/PatientHeader";
import { ClinicalMetricCard } from "../components/ClinicalMetricCard";
import { SidebarNavigation, NavGroup } from "../components/SidebarNavigation";
import { PageHeader } from "../components/PageHeader";
import { Alert } from "../components/Alert";
import { DataTable, Column } from "../components/DataTable";
import { Tabs } from "../components/Tabs";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";

// ─── Icons ──────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 17V10h4v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PatientIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RecordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AIIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1l1.8 5.4H16l-4.5 3.3 1.8 5.4L9 12l-4.3 3.1 1.8-5.4L2 6.4h5.2L9 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
  </svg>
);

const LabIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M7 2v6L3 15a1 1 0 00.9 1.5h10.2A1 1 0 0015 15L11 8V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7.5" cy="13" r="1" fill="currentColor" />
    <circle cx="11" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.37 13.37l1.41 1.41M3.22 14.78l1.41-1.41M13.37 4.63l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13.5S2 9.5 2 5.5a3.5 3.5 0 017-0 3.5 3.5 0 017 0C16 9.5 8 13.5 8 13.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// ─── Navigation ─────────────────────────────────────────

const navGroups: NavGroup[] = [
  {
    items: [
      { id: "home", label: "Dashboard", icon: <HomeIcon /> },
      { id: "patients", label: "Patients", icon: <PatientIcon />, badge: 3 },
      { id: "records", label: "Clinical Records", icon: <RecordIcon /> },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { id: "ai", label: "AI Insights", icon: <AIIcon />, isAI: true, isNew: true },
      { id: "labs", label: "Lab Results", icon: <LabIcon /> },
    ],
  },
  {
    label: "System",
    items: [
      { id: "settings", label: "Settings", icon: <SettingsIcon /> },
    ],
  },
];

// ─── Patient data ────────────────────────────────────────

interface PatientRow {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  status: "active" | "critical" | "scheduled" | "inactive";
  lastVisit: string;
  physician: string;
}

const patientData: PatientRow[] = [
  { id: "PT-0012", name: "María García Rodríguez", age: 54, diagnosis: "Hypertension, T2DM", status: "active", lastVisit: "Jun 22, 2026", physician: "Dr. López" },
  { id: "PT-0013", name: "Carlos Méndez Fuentes", age: 71, diagnosis: "COPD", status: "critical", lastVisit: "Jun 25, 2026", physician: "Dr. Ramírez" },
  { id: "PT-0014", name: "Ana Beatriz Herrera", age: 38, diagnosis: "Anxiety disorder", status: "scheduled", lastVisit: "Jun 18, 2026", physician: "Dr. Torres" },
  { id: "PT-0015", name: "Roberto Lima Castillo", age: 63, diagnosis: "Heart failure", status: "active", lastVisit: "Jun 20, 2026", physician: "Dr. López" },
  { id: "PT-0016", name: "Laura Vega Montoya", age: 29, diagnosis: "Asthma", status: "inactive", lastVisit: "May 10, 2026", physician: "Dr. Torres" },
];

const statusBadgeMap: Record<PatientRow["status"], { variant: "success" | "error" | "primary" | "neutral"; label: string }> = {
  active: { variant: "success", label: "Active" },
  critical: { variant: "error", label: "Critical" },
  scheduled: { variant: "primary", label: "Scheduled" },
  inactive: { variant: "neutral", label: "Inactive" },
};

const patientColumns: Column<PatientRow>[] = [
  {
    key: "name",
    label: "Patient",
    sortable: true,
    render: (_, row) => (
      <div>
        <p className="text-[14px] font-medium text-[#000000]">{row.name}</p>
        <p className="text-[12px] text-[#777777] font-mono">{row.id}</p>
      </div>
    ),
  },
  { key: "age", label: "Age", width: "80px", align: "center", sortable: true },
  {
    key: "diagnosis",
    label: "Diagnosis",
    render: (val) => (
      <span className="text-[13px] text-[#555555]">{val as string}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "120px",
    render: (val) => {
      const cfg = statusBadgeMap[val as PatientRow["status"]];
      return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
    },
  },
  { key: "lastVisit", label: "Last Visit", sortable: true },
  { key: "physician", label: "Physician" },
];

// ─── Main Example ────────────────────────────────────────

export const EterDashboardExample: React.FC = () => {
  const [activeNav, setActiveNav] = useState("patients");
  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState<Set<string>>(new Set());
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f7f7f7] font-[Inter,system-ui,sans-serif]">
      {/* Sidebar */}
      <SidebarNavigation
        groups={navGroups}
        activeItemId={activeNav}
        onItemClick={(item) => setActiveNav(item.id)}
        user={{
          name: "Dr. Andrea López",
          role: "Cardiología · IMSS",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Page header */}
        <PageHeader
          eyebrow="Patients"
          title="Patient Registry"
          description="Manage clinical records, view diagnostics and AI-generated insights."
          primaryAction={{
            label: "New Patient",
            onClick: () => setModalOpen(true),
            icon: <PlusIcon />,
          }}
          secondaryAction={{
            label: "Export",
            onClick: () => {},
          }}
          tabs={
            <Tabs
              variant="underline"
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: "overview", label: "Overview" },
                { id: "records", label: "Records", badge: 24 },
                { id: "labs", label: "Lab Results" },
                { id: "ai-insights", label: "AI Insights", icon: <span className="w-1.5 h-1.5 rounded-full bg-[#c1e328] inline-block" /> },
              ]}
            />
          }
        />

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* AI alert */}
          {!alertDismissed && (
            <Alert
              variant="ai-suggestion"
              title="AI Clinical Insight"
              onDismiss={() => setAlertDismissed(true)}
              action={{ label: "View recommendations", onClick: () => {} }}
            >
              3 patients show early indicators of metabolic syndrome based on recent lab trends. Review is recommended.
            </Alert>
          )}

          {/* Patient header for selected patient */}
          <PatientHeader
            name="María García Rodríguez"
            age={54}
            sex="Female"
            patientId="PT-0012"
            lastVisit="Jun 22, 2026"
            status="active"
            onPrimaryAction={() => {}}
            onSecondaryAction={() => {}}
            primaryActionLabel="Open Record"
            secondaryActionLabel="Schedule Visit"
          />

          {/* Metric cards */}
          <section aria-label="Clinical metrics">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777777] mb-4">
              Latest Clinical Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ClinicalMetricCard
                title="Blood Pressure"
                value="148/94"
                unit="mmHg"
                variant="abnormal"
                trend="up"
                trendValue="↑ vs. last visit"
                description="Above normal threshold. Monitor closely."
                icon={<HeartIcon />}
              />
              <ClinicalMetricCard
                title="Blood Glucose"
                value="112"
                unit="mg/dL"
                variant="improving"
                trend="down"
                trendValue="↓ 18 mg/dL this month"
              />
              <ClinicalMetricCard
                title="HbA1c"
                value="6.8"
                unit="%"
                variant="default"
                trend="stable"
                trendValue="Stable"
                showBadge
              />
              <ClinicalMetricCard
                title="Cardiovascular Risk"
                value="14"
                unit="% / 10y"
                variant="ai-insight"
                description="AI model suggests reassessing lipid panel."
                showBadge
              />
            </div>
          </section>

          {/* Patient table */}
          <section aria-label="Patient list">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#777777]">
                All Patients
              </h2>
              {selectedPatients.size > 0 && (
                <Badge variant="primary">
                  {selectedPatients.size} selected
                </Badge>
              )}
            </div>
            <DataTable
              columns={patientColumns}
              data={patientData}
              rowKey="id"
              selectable
              selectedKeys={selectedPatients}
              onSelectionChange={setSelectedPatients}
              onRowClick={() => {}}
              emptyStateTitle="No patients found"
              emptyStateDescription="Add a new patient to get started."
            />
          </section>

          {/* Cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle as="h3">Upcoming Visits</CardTitle>
                  <Badge variant="accent">Today</Badge>
                </div>
                <CardDescription>3 appointments scheduled</CardDescription>
              </CardHeader>
              <div className="space-y-2">
                {["09:00 – Carlos Méndez", "11:30 – Ana Herrera", "15:00 – Roberto Lima"].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-[#f7f7f7] last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a20eff] flex-shrink-0" aria-hidden="true" />
                    <span className="text-[14px] text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="insight">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle as="h3">AI Summary</CardTitle>
                  <Badge variant="ai-insight" size="sm">Active</Badge>
                </div>
                <CardDescription>Updated 2 hours ago</CardDescription>
              </CardHeader>
              <p className="text-[14px] leading-[22px] text-[#333333]">
                2 patients with hypertensive crisis risk were identified. HbA1c trends across the panel show 18% improvement.
              </p>
              <button className="mt-4 text-[13px] font-semibold text-[#a20eff] hover:text-[#8a0cdb] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a20eff] rounded">
                View full report →
              </button>
            </Card>

            <Card variant="clinical">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle as="h3">Critical Alerts</CardTitle>
                  <Badge variant="error" dot>1 Critical</Badge>
                </div>
                <CardDescription>Requires immediate attention</CardDescription>
              </CardHeader>
              <Alert variant="clinical-warning" title="Carlos Méndez — COPD Exacerbation">
                SpO₂ below 90% recorded at 08:42. Escalation protocol initiated.
              </Alert>
            </Card>
          </div>

          {/* Empty state example */}
          <Card variant="default" padding="none">
            <EmptyState
              title="No lab results available"
              description="Lab results for this patient will appear here once processed by the laboratory."
              primaryAction={{ label: "Request Lab Order", onClick: () => {}, icon: <PlusIcon /> }}
              secondaryAction={{ label: "Learn more", onClick: () => {} }}
            />
          </Card>
        </main>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Register New Patient"
        description="Complete the clinical intake form to add a new patient to the registry."
        primaryAction={{ label: "Register Patient", onClick: () => setModalOpen(false) }}
        secondaryAction={{ label: "Cancel", onClick: () => setModalOpen(false) }}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="e.g. María" />
            <Input label="Last Name" placeholder="e.g. García" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date of Birth" type="date" />
            <Select
              label="Sex"
              placeholder="Select…"
              options={[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>
          <Input label="Patient ID / CURP" placeholder="e.g. GAML8503254E3" helperText="National ID used for interoperability." />
          <Textarea label="Clinical Notes" placeholder="Initial clinical observations, allergies, relevant history…" />
        </div>
      </Modal>
    </div>
  );
};

export default EterDashboardExample;
