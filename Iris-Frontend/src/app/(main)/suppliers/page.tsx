'use client';

import { useState } from 'react';
import { SuppliersPage as SuppliersDirectory } from '@components/features/suppliers/SuppliersPage';
import { SupplierProfileView } from '@components/features/suppliers/SupplierProfileView';

export default function SuppliersRoutePage() {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(
    null
  );

  if (selectedSupplierId) {
    return (
      <SupplierProfileView
        supplierId={selectedSupplierId}
        onBack={() => setSelectedSupplierId(null)}
      />
    );
  }

  return (
    <SuppliersDirectory onViewSupplier={id => setSelectedSupplierId(id)} />
  );
}
