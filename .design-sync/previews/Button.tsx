import React from 'react';
import { Button } from '@eter/design-system';

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 7l3 3 3-3M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24, background: '#fff' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="accent">Accent</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, padding: 24, background: '#fff' }}>
    <Button variant="primary" size="sm">Small</Button>
    <Button variant="primary" size="md">Medium</Button>
    <Button variant="primary" size="lg">Large</Button>
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24, background: '#fff' }}>
    <Button variant="primary" leftIcon={<PlusIcon />}>Add Patient</Button>
    <Button variant="outline" leftIcon={<DownloadIcon />}>Export Records</Button>
    <Button variant="secondary" rightIcon={<PlusIcon />}>New Visit</Button>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24, background: '#fff' }}>
    <Button variant="primary" loading>Saving...</Button>
    <Button variant="primary" disabled>Disabled</Button>
    <Button variant="outline" disabled>Disabled</Button>
    <Button variant="destructive">Delete Record</Button>
  </div>
);
