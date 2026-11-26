import { FormEvent, useState } from 'react';
import { api } from '../lib/api';

export function PropertySetup() {
  const [walletAddress, setWalletAddress] = useState('');
  const [address, setAddress] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [currency, setCurrency] = useState<'USDC' | 'XLM'>('USDC');
  const [dueDay, setDueDay] = useState(1);
  const [propertyCode, setPropertyCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const landlord = await api.createLandlord(walletAddress);
      const property = await api.createProperty({
        landlordId: landlord.id,
        address,
        rentAmount,
        currency,
        dueDay,
      });
      setPropertyCode(property.propertyCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (propertyCode) {
    return (
      <section>
        <h1>Property registered</h1>
        <p>Share this code with your tenant so they can link to this property:</p>
        <p>
          <strong style={{ fontSize: '1.5rem' }}>{propertyCode}</strong>
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>Property Setup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Your Stellar wallet address
          <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} required />
        </label>
        <label>
          Property address
          <input value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Monthly rent amount
          <input value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} required />
        </label>
        <label>
          Currency
          <select value={currency} onChange={(e) => setCurrency(e.target.value as 'USDC' | 'XLM')}>
            <option value="USDC">USDC</option>
            <option value="XLM">XLM</option>
          </select>
        </label>
        <label>
          Due day of month
          <input
            type="number"
            min={1}
            max={28}
            value={dueDay}
            onChange={(e) => setDueDay(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Registering…' : 'Register property'}
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
