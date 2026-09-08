import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Badge, Button } from '@eter/design-system';

export const Variants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 24, background: '#f7f7f7' }}>
    <Card variant="default" padding="md">
      <CardTitle>Default</CardTitle>
      <CardDescription>Standard card with subtle shadow.</CardDescription>
    </Card>
    <Card variant="elevated" padding="md">
      <CardTitle>Elevated</CardTitle>
      <CardDescription>Stronger shadow for emphasis.</CardDescription>
    </Card>
    <Card variant="clinical" padding="md">
      <CardTitle>Clinical</CardTitle>
      <CardDescription>Brand accent left border for clinical data.</CardDescription>
    </Card>
    <Card variant="insight" padding="md">
      <CardTitle>Insight</CardTitle>
      <CardDescription>Lime top border for AI-driven content.</CardDescription>
    </Card>
  </div>
);

export const Selected = () => (
  <div style={{ padding: 24, background: '#f7f7f7', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Card variant="default" padding="md">
      <CardTitle>Unselected Card</CardTitle>
      <CardDescription>Click to select this patient record.</CardDescription>
    </Card>
    <Card variant="selected" padding="md">
      <CardTitle>Selected Card</CardTitle>
      <CardDescription>This card is currently active.</CardDescription>
    </Card>
  </div>
);

export const WithHeaderAndFooter = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="default" padding="md">
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <CardTitle>Patient Summary</CardTitle>
            <CardDescription>Last updated Jun 28, 2026</CardDescription>
          </div>
          <Badge variant="success" dot>Active</Badge>
        </div>
      </CardHeader>
      <p style={{ fontSize: 14, color: '#333', lineHeight: '20px' }}>
        No acute findings. Continue current medication regimen and schedule follow-up in 30 days.
      </p>
      <CardFooter>
        <Button variant="outline" size="sm">View Full Record</Button>
        <Button variant="primary" size="sm">Schedule Visit</Button>
      </CardFooter>
    </Card>
  </div>
);
