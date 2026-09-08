import React from 'react';
import { Card, CardTitle, CardDescription, CardFooter, Button, Badge } from '@eter/design-system';

export const WithActions = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="default" padding="md">
      <CardTitle>Referral Request</CardTitle>
      <CardDescription>Cardiology referral pending approval · Submitted Jun 24</CardDescription>
      <CardFooter>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Approve</Button>
      </CardFooter>
    </Card>
  </div>
);

export const WithMeta = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="clinical" padding="md">
      <CardTitle>Prescription</CardTitle>
      <CardDescription>Lisinopril 10mg · Once daily with food</CardDescription>
      <CardFooter>
        <Badge variant="success" dot>Active</Badge>
        <span style={{ fontSize: 12, color: '#777', marginLeft: 'auto' }}>Refills: 3 remaining</span>
      </CardFooter>
    </Card>
  </div>
);
