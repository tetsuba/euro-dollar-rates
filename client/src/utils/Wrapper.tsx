import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {MemoryRouter} from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            cacheTime: 0,
            retryDelay: 1,
            retry:0,
        }
    }
})

export default function Wrapper({pathname, children}: any) {
    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['', { pathname }]}>
                {children}
            </MemoryRouter>
        </QueryClientProvider>
    )
}