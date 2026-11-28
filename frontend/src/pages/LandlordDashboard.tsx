import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, PropertyWithPaymentCount } from '../lib/api';

export function LandlordDashboard() {
  const [walletAddress, setWalletAddress] = useState('');
  const [properties, setProperties] = useState<PropertyWithPaymentCount[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const landlord = await api.createLandlord(walletAddress);
      const rows = await api.listProperties(landlord.id);
      setProperties(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Landlord Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Your Stellar wallet address
          <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'View my properties'}
        </button>
      </form>
      {error && <p role="alert">{error}</p>}

      {properties && (
        <div>
          {properties.length === 0 ? (
            <p>
              No properties yet. <Link to="/property/setup">Register one</Link>.
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Address</th>
                  <th>Rent</th>
                  <th>Payments received</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.property_code}</td>
                    <td>{property.address}</td>
                    <td>
                      {property.rent_amount} {property.currency}
                    </td>
                    <td>{property.payment_count}</td>
                    <td>
                      <Link to={`/profile/${property.property_code}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}
