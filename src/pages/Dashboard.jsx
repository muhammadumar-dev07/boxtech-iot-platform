import React from 'react';
import { Download01 } from '@untitledui/icons';
import KpiRow from '../components/KpiRow';
import SensorTrendsChart from '../components/SensorTrendsChart';
import SystemHealthDonut from '../components/SystemHealthDonut';
import SpotlightCards from '../components/SpotlightCards';
import RecentAlertsPanel from '../components/RecentAlertsPanel';
import ConnectedFleet from '../components/ConnectedFleet';
import { KPI_DATA } from '../mockData';

export default function Dashboard({ devices, selectedZone }) {
  // Export report as CSV function
  const handleExportReport = () => {
    const headers = ["Device ID", "Type", "Location", "Status", "Battery %", "Primary Reading", "Secondary Reading"];
    const rows = devices.map(d => [
      d.device_id,
      d.type,
      d.location,
      d.status,
      `${d.battery_pct}%`,
      `"${d.display_primary || ''}"`,
      `"${d.display_secondary || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BoxTech_Facility_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full gap-y-4 pt-3 max-md:gap-y-4 max-md:pt-14">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-md:gap-2">
        <div className="flex items-center gap-2">
          <h1 className="font-headline-lg text-[28px] max-md:text-[22px] font-semibold text-[#1A1F29] tracking-tight">
            Facility Overview
          </h1>
        </div>

        <div className="flex items-center gap-2 max-md:w-full">
          <button
            id="btn-export-report"
            type="button"
            onClick={handleExportReport}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 max-md:min-h-[44px] max-md:w-full rounded-lg bg-[#0F172A] text-white font-label-md text-[13px] shadow-sm hover:bg-[#1E293B] active:bg-[#020617] transition-colors cursor-pointer"
          >
            <Download01 className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Metrics Row (6 cards) */}
      <KpiRow kpis={KPI_DATA} />

      {/* 3. Analytics & Health Row (8 cols / 4 cols split, stacks full width on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-md:gap-3 items-stretch">
        <div className="lg:col-span-8">
          <SensorTrendsChart />
        </div>
        <div className="lg:col-span-4">
          <SystemHealthDonut />
        </div>
      </div>

      {/* 4. Device Type Spotlight Cards & Recent Alerts Row (7 cols / 5 cols split, stacks full width on mobile) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 max-md:gap-3 items-stretch">
        <div className="xl:col-span-7">
          <SpotlightCards />
        </div>
        <div className="xl:col-span-5">
          <RecentAlertsPanel />
        </div>
      </div>

      {/* 5. Comprehensive Connected Device Fleet */}
      <ConnectedFleet devices={devices} selectedZone={selectedZone} />
    </div>
  );
}
