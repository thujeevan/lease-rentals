import fetchAPI, {
    API_ROOT,
} from './fetch';

export const BASE = `${API_ROOT}/leases`;
export const fetchLeases = async () => fetchAPI(BASE);
export const fetchLease = async (lease) => fetchAPI(`${BASE}/${lease}`);
