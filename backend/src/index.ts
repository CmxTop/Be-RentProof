import { getProfileRoute } from './routes/profile';
import { getPropertiesRoute } from './routes/properties';
import { getTenantsRoute } from './routes/tenants';

export const appModules = {
  properties: getPropertiesRoute(),
  tenants: getTenantsRoute(),
  profile: getProfileRoute(),
};

console.log('RentProof backend scaffold ready', Object.keys(appModules));

