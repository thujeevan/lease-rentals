import {
    useQuery,
} from 'react-query';
import {
    fetchLeases, fetchLease,
} from 'api/lease';

export function useFetchLeases() {
    return useQuery('leases', fetchLeases, {
        refetchOnWindowFocus: false
    });
}

export function useFetchLease(lease) {
    return useQuery(['lease', lease], () => fetchLease(lease), {
        refetchOnWindowFocus: false
    });
}