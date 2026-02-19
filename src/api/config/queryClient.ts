import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query Client Configuration
 * 
 * This is the global configuration for React Query.
 * It handles caching, refetching, and error handling for all queries.
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Refetch on window focus
            refetchOnWindowFocus: false,

            // Retry failed requests
            retry: 1,

            // Stale time - how long data is considered fresh
            staleTime: 5 * 60 * 1000, // 5 minutes

            // Cache time - how long unused data stays in cache
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        },
        mutations: {
            // Retry failed mutations
            retry: 0,
        },
    },
});
