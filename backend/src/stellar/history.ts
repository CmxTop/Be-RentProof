export type IndexedPayment = {
  transactionHash: string;
  propertyCode: string;
  paidAt: string;
};

export const reconstructHistory = (payments: IndexedPayment[]) => ({
  paymentCount: payments.length,
  payments,
});

