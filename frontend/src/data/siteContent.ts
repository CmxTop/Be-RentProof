export const stats = [
  { value: '3 steps', label: 'Property setup to first payment' },
  { value: 'On-chain', label: 'Receipts tenants own forever' },
  { value: 'USDC/XLM', label: 'Supported Stellar payment rails' },
];

export const featureCards = [
  {
    title: 'Property registration',
    description:
      'Landlords register properties with rent amount and due date, then generate a shareable property code for tenants.',
  },
  {
    title: 'On-chain payments',
    description:
      'Every rent payment goes directly to the landlord wallet via USDC or XLM, tagged with a property identifier on Stellar.',
  },
  {
    title: 'Verifiable history',
    description:
      'Tenants get a shareable Rent History Profile that any future landlord can verify directly on the Stellar blockchain.',
  },
];

export const milestones = [
  'Landlord registers a property and sets the monthly rent amount.',
  'Tenant links to the property using a unique property code.',
  'Tenant pays rent monthly through RentProof via USDC or XLM on Stellar.',
  'Every payment is recorded on-chain — timestamped, immutable, tied to the property.',
  'Tenant shares their Rent History Profile link with future landlords.',
];

export const personas = [
  'Tenants anywhere who want to build and own a portable rental reputation.',
  'Landlords who want consistent payment records without chasing bank alerts.',
  'Real estate agents who want a quick way to vet prospective tenants.',
  'Young professionals renting for the first time with no guarantors.',
];
