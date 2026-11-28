import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { connectFreighter, signWithFreighter } from '../lib/stellar';

export function TenantDashboard() {
  const [displayName, setDisplayName] = useState('');
  const [propertyCode, setPropertyCode] = useState('');
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [linkedCode, setLinkedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentResult, setPaymentResult] = useState<string | null>(null);

  const handleLink = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const id = tenantId ?? (await api.createTenant(displayName)).id;
      setTenantId(id);
      await api.linkTenantToProperty(id, propertyCode);
      setLinkedCode(propertyCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const payWithFreighter = async () => {
    if (!linkedCode) return;
    setError(null);
    setPaying(true);
    try {
      const address = await connectFreighter();
      const { xdr, networkPassphrase } = await api.buildPayment(address, linkedCode);
      const signedXdr = await signWithFreighter(xdr, networkPassphrase);
      const { transactionHash } = await api.submitPayment(signedXdr);
      setPaymentResult(transactionHash);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  const payWithDemoAccount = async () => {
    if (!linkedCode) return;
    setError(null);
    setPaying(true);
    try {
      const { transactionHash } = await api.demoPay(linkedCode);
      setPaymentResult(transactionHash);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo payment failed');
    } finally {
      setPaying(false);
    }
  };

  if (linkedCode) {
    return (
      <section>
        <h1>Tenant Dashboard</h1>
        <p>You're linked to property {linkedCode}.</p>

        {paymentResult ? (
          <div>
            <p>Payment submitted on Stellar Testnet.</p>
            <p>
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${paymentResult}`}
                target="_blank"
                rel="noreferrer"
              >
                View transaction
              </a>
            </p>
            <p>
              It may take a few seconds to show up on your{' '}
              <Link to={`/profile/${linkedCode}`}>Rent History Profile</Link> while it's indexed.
            </p>
          </div>
        ) : (
          <div>
            <button type="button" onClick={payWithFreighter} disabled={paying}>
              {paying ? 'Paying…' : 'Pay rent with Freighter'}
            </button>
            <p>
              Don't have Freighter installed?{' '}
              <button type="button" onClick={payWithDemoAccount} disabled={paying}>
                {paying ? 'Paying…' : 'Pay with a demo Testnet account'}
              </button>
            </p>
          </div>
        )}
        {error && <p role="alert">{error}</p>}
      </section>
    );
  }

  return (
    <section>
      <h1>Tenant Dashboard</h1>
      <form onSubmit={handleLink}>
        <label>
          Your name
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        </label>
        <label>
          Property code
          <input value={propertyCode} onChange={(e) => setPropertyCode(e.target.value)} required />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Linking…' : 'Link to property'}
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
