import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import 'leaflet/dist/leaflet.css';
import App from './App';
import CreateTrip from './create-trip';
import Header from './components/custom/Header';
import { Toaster } from '@/components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripid]';

const Layout = () => (
  <div className="min-h-screen">
    <Header />
    <Toaster />
    <main>
      <Outlet />
    </main>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create-trip",
        element: <CreateTrip />,
      },
      {
        path: "/view-trip/:tripId",
        element: <ViewTrip />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
