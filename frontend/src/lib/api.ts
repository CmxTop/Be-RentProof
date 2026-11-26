const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(body.error ? JSON.stringify(body.error) : response.statusText, response.status);
  }

  return response.json();
}

export type Landlord = { id: string; walletAddress: string };
export type Property = {
  id: string;
  propertyCode: string;
  address: string;
  rentAmount: string;
  currency: 'USDC' | 'XLM';
  dueDay: number;
};
export type Tenant = { id: string; displayName: string };
export type RentPayment = {
  transaction_hash: string;
  amount: string;
  asset: string;
  paid_at: string;
  status: string;
};
export type ProfileResponse = { property: Record<string, unknown>; payments: RentPayment[] };

export const api = {
  createLandlord: (walletAddress: string) =>
    request<Landlord>('/api/landlords', { method: 'POST', body: JSON.stringify({ walletAddress }) }),

  createProperty: (input: {
    landlordId: string;
    address: string;
    rentAmount: string;
    currency: 'USDC' | 'XLM';
    dueDay: number;
  }) => request<Property>('/api/properties', { method: 'POST', body: JSON.stringify(input) }),

  createTenant: (displayName: string) =>
    request<Tenant>('/api/tenants', { method: 'POST', body: JSON.stringify({ displayName }) }),

  linkTenantToProperty: (tenantId: string, propertyCode: string) =>
    request<{ tenantId: string; propertyId: string }>(`/api/tenants/${tenantId}/link`, {
      method: 'POST',
      body: JSON.stringify({ propertyCode }),
    }),

  getProfile: (propertyCode: string) => request<ProfileResponse>(`/api/profile/${propertyCode}`),
};
