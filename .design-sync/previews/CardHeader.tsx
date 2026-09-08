import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, Badge } from '@eter/design-system';

export const Default = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="default" padding="md">
      <CardHeader>
        <CardTitle>Vitals Overview</CardTitle>
        <CardDescription>Recorded Jun 28, 2026 · 09:42 AM</CardDescription>
      </CardHeader>
      <p style={{ fontSize: 14, color: '#555' }}>Blood pressure, heart rate, temperature all within normal range.</p>
    </Card>
  </div>
);

export const WithBadge = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="clinical" padding="md">
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <CardTitle>Lab Results</CardTitle>
            <CardDescription>CBC Panel · Jun 27, 2026</CardDescription>
          </div>
          <Badge variant="warning">Review</Badge>
        </div>
      </CardHeader>
      <p style={{ fontSize: 14, color: '#555' }}>WBC elevated. Hemoglobin within normal limits.</p>
    </Card>
  </div>
);
