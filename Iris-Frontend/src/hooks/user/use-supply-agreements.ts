export interface SupplyAgreementItem {
  id: number;
  supplier: string;
  type: string;
  frequency: string;
  status: string;
  nextDelivery: string;
  items: string;
  discount: string;
  startDate: string;
  endDate: string;
}

export function useSupplyAgreements() {
  const supplyAgreements: SupplyAgreementItem[] = [
    {
      id: 1,
      supplier: 'Green Valley Farm',
      type: 'Weekly Delivery',
      frequency: 'Every Monday & Thursday',
      status: 'Active',
      nextDelivery: '2024-10-28',
      items: 'Seasonal vegetables, herbs',
      discount: '15%',
      startDate: '2024-03-15',
      endDate: '2025-03-15',
    },
    {
      id: 2,
      supplier: 'Mountain Dairy Co.',
      type: 'Bi-Weekly Supply',
      frequency: 'Every other Tuesday',
      status: 'Active',
      nextDelivery: '2024-10-29',
      items: 'Dairy products, cheese',
      discount: '10%',
      startDate: '2024-04-01',
      endDate: '2025-04-01',
    },
  ];

  return {
    supplyAgreements,
  };
}
