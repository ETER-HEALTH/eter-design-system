import React from 'react';
import { Modal, Input, Textarea } from '@eter/design-system';

export const Default = () => (
  <div style={{ position: 'relative', height: 520 }}>
    <Modal
      open={true}
      onClose={() => {}}
      title="Schedule Appointment"
      description="Book a follow-up visit for this patient."
      primaryAction={{ label: 'Confirm Booking', onClick: () => {} }}
      secondaryAction={{ label: 'Cancel', onClick: () => {} }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Patient Name" defaultValue="Elena Rodriguez" />
        <Input label="Date" type="date" />
        <Textarea label="Notes" placeholder="Any special instructions or pre-visit requirements..." />
      </div>
    </Modal>
  </div>
);

export const Destructive = () => (
  <div style={{ position: 'relative', height: 320 }}>
    <Modal
      open={true}
      onClose={() => {}}
      title="Delete Patient Record"
      description="This action cannot be undone. All clinical data associated with this patient will be permanently removed."
      primaryAction={{ label: 'Delete Record', onClick: () => {}, variant: 'destructive' }}
      secondaryAction={{ label: 'Keep Record', onClick: () => {} }}
      size="sm"
    />
  </div>
);
