import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export function TenantDashboard() {
  const [displayName, setDisplayName] = useState('');
  const [propertyCode, setPropertyCode] = useState('');
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [linkedCode, setLinkedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  if (linkedCode) {
    return (
      <section>
        <h1>Tenant Dashboard</h1>
        <p>You're linked to property {linkedCode}.</p>
        <p>
          Paying rent on Stellar and viewing your history is coming next — for now, check your{' '}
          <Link to={`/profile/${linkedCode}`}>Rent History Profile</Link>.
        </p>
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
