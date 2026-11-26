import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LandlordDashboard } from './pages/LandlordDashboard';
import { PropertySetup } from './pages/PropertySetup';
import { RentHistoryProfile } from './pages/RentHistoryProfile';
import { TenantDashboard } from './pages/TenantDashboard';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/landlord', element: <LandlordDashboard /> },
  { path: '/property/setup', element: <PropertySetup /> },
  { path: '/tenant', element: <TenantDashboard /> },
  { path: '/profile/:propertyCode', element: <RentHistoryProfile /> },
]);
