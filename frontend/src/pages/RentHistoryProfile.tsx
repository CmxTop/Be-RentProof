import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, ProfileResponse } from '../lib/api';

export function RentHistoryProfile() {
  const { propertyCode } = useParams<{ propertyCode: string }>();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyCode) return;
    api
      .getProfile(propertyCode)
      .then(setProfile)
      .catch((err) => setError(err instanceof Error ? err.message : 'Something went wrong'));
  }, [propertyCode]);

  if (error) {
    return (
      <section>
        <h1>Rent History Profile</h1>
        <p role="alert">{error}</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section>
        <h1>Rent History Profile</h1>
        <p>Loading…</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Rent History Profile</h1>
      <p>Property code: {propertyCode}</p>
      {profile.payments.length === 0 ? (
        <p>No on-chain payments indexed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Asset</th>
              <th>Status</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {profile.payments.map((payment) => (
              <tr key={payment.transaction_hash}>
                <td>{payment.paid_at}</td>
                <td>{payment.amount}</td>
                <td>{payment.asset}</td>
                <td>{payment.status}</td>
                <td>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${payment.transaction_hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
