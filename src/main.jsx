import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { routes } from '@/routes';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

import './index.css';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
