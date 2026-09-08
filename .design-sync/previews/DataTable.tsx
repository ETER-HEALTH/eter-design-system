import React from 'react';
import { DataTable, Badge } from '@eter/design-system';

const patients = [
  { id: 'MRN-2847163', name: 'Elena Rodriguez', age: 54, department: 'Cardiology', status: 'active', lastVisit: 'Jun 20, 2026' },
  { id: 'MRN-1039284', name: 'James Thornton', age: 71, department: 'Neurology', status: 'critical', lastVisit: 'Jun 28, 2026' },
  { id: 'MRN-5821047', name: 'Maria Chen', age: 38, department: 'Oncology', status: 'active', lastVisit: 'Jun 15, 2026' },
  { id: 'MRN-7634921', name: 'David Okafor', age: 62, department: 'Internal Medicine', status: 'scheduled', lastVisit: 'Jun 10, 2026' },
  { id: 'MRN-3019857', name: 'Ruth Kapoor', age: 45, department: 'Cardiology', status: 'discharged', lastVisit: 'Jun 5, 2026' },
];

const columns = [
  { key: 'id', label: 'MRN', width: '140px' },
  { key: 'name', label: 'Patient Name', sortable: true },
  { key: 'age', label: 'Age', width: '70px', align: 'center' as const },
  { key: 'department', label: 'Department' },
  {
    key: 'status',
    label: 'Status',
    width: '120px',
    render: (value: unknown) => {
      const map: Record<string, { variant: 'success' | 'error' | 'primary' | 'neutral', label: string }> = {
        active: { variant: 'success', label: 'Active' },
        critical: { variant: 'error', label: 'Critical' },
        scheduled: { variant: 'primary', label: 'Scheduled' },
        discharged: { variant: 'neutral', label: 'Discharged' },
      };
      const s = map[value as string] ?? { variant: 'neutral' as const, label: String(value) };
      return <Badge variant={s.variant} dot={s.variant !== 'neutral'}>{s.label}</Badge>;
    },
  },
  { key: 'lastVisit', label: 'Last Visit' },
];

export const Default = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <DataTable columns={columns} data={patients} rowKey="id" />
  </div>
);

export const Selectable = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <DataTable columns={columns} data={patients} rowKey="id" selectable />
  </div>
);

export const Loading = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <DataTable columns={columns} data={[]} rowKey="id" loading />
  </div>
);

export const Empty = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <DataTable
      columns={columns}
      data={[]}
      rowKey="id"
      emptyStateTitle="No patients found"
      emptyStateDescription="Try adjusting your filters or search criteria."
    />
  </div>
);
