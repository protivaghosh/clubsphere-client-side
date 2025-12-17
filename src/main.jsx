import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import Router from './Component/Router/Router.jsx';
import AuthProvider from './Component/Page/Auth/AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
       <RouterProvider router={Router} />
    </AuthProvider>
  </QueryClientProvider>
   
  </StrictMode>,
)
