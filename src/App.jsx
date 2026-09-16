import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import { generateFleet } from './mockData';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState('All');

  // Procedural mock fleet generated once and memoized
  const fleetDevices = useMemo(() => generateFleet(), []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F9FA] text-[#1A1F29] antialiased max-w-full overflow-x-hidden">
        {/* Top Navbar */}
        <Navbar
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          onOpenMobileMenu={() => setMobileDrawerOpen(true)}
        />

        {/* Left Sidebar */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileDrawerOpen}
          setMobileOpen={setMobileDrawerOpen}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />

        {/* Main Content Area */}
        <div
          className={`transition-all duration-200 ${
            collapsed ? 'pl-16' : 'pl-60'
          } max-md:pl-0`}
        >
          <main className="w-full pt-16 min-h-screen px-4 sm:px-6 py-6 max-md:px-4 max-md:py-4 max-md:overflow-x-hidden max-w-full">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    devices={fleetDevices}
                    selectedZone={selectedZone}
                  />
                }
              />
              <Route
                path="/devices"
                element={
                  <PlaceholderPage
                    title="Device Management"
                    description="Detailed hardware registry, firmware distribution, and configuration controls for all connected IoT sensors."
                  />
                }
              />
              <Route
                path="/alerts"
                element={
                  <PlaceholderPage
                    title="Alerts & Incidents"
                    description="Active alerts triage, incident response logs, and anomaly detection history."
                  />
                }
              />
              <Route
                path="/analytics"
                element={
                  <PlaceholderPage
                    title="Telemetry Analytics"
                    description="Historical telemetry aggregation, seasonal pattern analysis, and predictive hardware failure trends."
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <PlaceholderPage
                    title="System Settings"
                    description="Facility parameters, notification channels, webhook endpoints, and API credentials."
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
