import React, { useState, useMemo } from 'react';
import { SearchLg, Grid01, Rows01 } from '@untitledui/icons';

// Status colors mapping
const STATUS_COLORS = {
  online: '#12B76A',
  warning: '#F79009',
  alarm: '#F04438',
  offline: '#98A2B3'
};

export default function ConnectedFleet({ devices, selectedZone }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  // Filter devices by selectedZone, typeFilter, and searchQuery
  const filteredDevices = useMemo(() => {
    return devices.filter((d) => {
      // Zone filter from navbar
      if (selectedZone !== 'All' && d.location !== selectedZone) {
        return false;
      }
      // Type tab filter
      if (typeFilter !== 'all' && d.type !== typeFilter) {
        return false;
      }
      // Search text filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = d.device_id.toLowerCase().includes(q);
        const matchLoc = d.location.toLowerCase().includes(q);
        const matchType = d.type.toLowerCase().includes(q);
        const matchVal = d.display_primary?.toLowerCase().includes(q);
        if (!matchId && !matchLoc && !matchType && !matchVal) {
          return false;
        }
      }
      return true;
    });
  }, [devices, selectedZone, typeFilter, searchQuery]);

  // Counts for tabs
  const typeCounts = useMemo(() => {
    const base = selectedZone === 'All' ? devices : devices.filter(d => d.location === selectedZone);
    return {
      all: base.length,
      temperature_humidity: base.filter(d => d.type === 'temperature_humidity').length,
      occupancy: base.filter(d => d.type === 'occupancy').length,
      door_leak: base.filter(d => d.type === 'door_leak').length,
    };
  }, [devices, selectedZone]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredDevices.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  // Paginated slice
  const paginatedDevices = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredDevices.slice(start, start + pageSize);
  }, [filteredDevices, safePage, pageSize]);

  const startIndex = filteredDevices.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIndex = Math.min(safePage * pageSize, filteredDevices.length);

  return (
    <div id="connected-device-fleet-section" className="flex flex-col gap-4">
      {/* Fleet Header & Control Toolbar */}
      <div className="flex flex-col gap-3 p-4 max-md:p-3 rounded-[8px] bg-white border border-[#EAECF0] shadow-sm">
        {/* Top title line */}
        <div className="flex items-center justify-between w-full border-b border-[#E8EEFF] pb-3 max-md:flex-col max-md:items-start max-md:gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-headline-md text-[20px] max-md:text-[17px] font-semibold text-[#1A1F29] whitespace-nowrap tracking-tight">
              Connected Device Fleet
            </h2>
            <span className="font-data-mono text-[12px] max-md:text-[11px] px-2 py-0.5 rounded bg-[#F0F3FF] border border-[#EAECF0] text-[#475467] font-medium whitespace-nowrap tnum">
              {filteredDevices.length} Total · {paginatedDevices.length} Displayed
            </span>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 w-full pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 w-full">
            {/* Search Input - full width and 44px on mobile */}
            <div className="relative min-w-[240px] max-w-xs w-full max-md:min-w-0 max-md:max-w-none">
              <SearchLg className="absolute left-2.5 top-2 max-md:top-3.5 w-4 h-4 text-[#475467] pointer-events-none" />
              <input
                id="fleet-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search ID, tag, or room..."
                className="w-full h-8 max-md:h-11 max-md:min-h-[44px] pl-8 pr-3 rounded-lg bg-[#F0F3FF] text-[#1A1F29] font-body-sm text-[12px] max-md:text-[14px] placeholder:text-[#475467] focus:outline-none focus:bg-white border border-transparent focus:border-[#0F172A] shadow-xs transition-colors"
              />
            </div>

            {/* Type Filter Tabs - horizontally scrollable without breaking row, 40px touch targets */}
            <div className="flex items-center gap-1 bg-[#F0F3FF] p-0.5 max-md:p-1 rounded-lg overflow-x-auto border border-[#EAECF0] max-md:w-full">
              <button
                type="button"
                onClick={() => { setTypeFilter('all'); setCurrentPage(1); }}
                className={`px-2.5 py-1 rounded font-label-sm text-[11px] whitespace-nowrap transition-colors cursor-pointer max-md:min-h-[40px] max-md:px-3 max-md:py-2 flex items-center justify-center shrink-0 ${
                  typeFilter === 'all'
                    ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                    : 'text-[#475467] hover:text-[#1A1F29]'
                }`}
              >
                All ({typeCounts.all})
              </button>
              <button
                type="button"
                onClick={() => { setTypeFilter('temperature_humidity'); setCurrentPage(1); }}
                className={`px-2.5 py-1 rounded font-label-sm text-[11px] whitespace-nowrap transition-colors cursor-pointer max-md:min-h-[40px] max-md:px-3 max-md:py-2 flex items-center justify-center shrink-0 ${
                  typeFilter === 'temperature_humidity'
                    ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                    : 'text-[#475467] hover:text-[#1A1F29]'
                }`}
              >
                Temp &amp; Humidity ({typeCounts.temperature_humidity})
              </button>
              <button
                type="button"
                onClick={() => { setTypeFilter('occupancy'); setCurrentPage(1); }}
                className={`px-2.5 py-1 rounded font-label-sm text-[11px] whitespace-nowrap transition-colors cursor-pointer max-md:min-h-[40px] max-md:px-3 max-md:py-2 flex items-center justify-center shrink-0 ${
                  typeFilter === 'occupancy'
                    ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                    : 'text-[#475467] hover:text-[#1A1F29]'
                }`}
              >
                Occupancy ({typeCounts.occupancy})
              </button>
              <button
                type="button"
                onClick={() => { setTypeFilter('door_leak'); setCurrentPage(1); }}
                className={`px-2.5 py-1 rounded font-label-sm text-[11px] whitespace-nowrap transition-colors cursor-pointer max-md:min-h-[40px] max-md:px-3 max-md:py-2 flex items-center justify-center shrink-0 ${
                  typeFilter === 'door_leak'
                    ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                    : 'text-[#475467] hover:text-[#1A1F29]'
                }`}
              >
                Door &amp; Leak ({typeCounts.door_leak})
              </button>
            </div>
          </div>

          {/* View mode toggle - touch target min 40px on mobile */}
          <div className="flex items-center gap-1 shrink-0 max-md:self-end">
            <button
              id="btn-view-grid"
              aria-label="Grid View"
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 max-md:p-2.5 max-md:min-h-[40px] max-md:min-w-[40px] flex items-center justify-center rounded transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#DFE8FF] text-[#1A1F29]'
                  : 'text-[#475467] hover:text-[#1A1F29]'
              }`}
            >
              <Grid01 className="w-4 h-4" />
            </button>
            <button
              id="btn-view-table"
              aria-label="Table View"
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 max-md:p-2.5 max-md:min-h-[40px] max-md:min-w-[40px] flex items-center justify-center rounded transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#DFE8FF] text-[#1A1F29]'
                  : 'text-[#475467] hover:text-[#1A1F29]'
              }`}
            >
              <Rows01 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View: 1 card per row on mobile (< 768px), 2 on sm, 3 on md, 4 on xl */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-md:grid-cols-1 gap-4 max-md:gap-3">
          {paginatedDevices.map((device) => {
            const statusDotColor = STATUS_COLORS[device.status] || STATUS_COLORS.online;
            const isAlarm = device.status === 'alarm';
            const isOffline = device.status === 'offline';

            return (
              <div
                key={device.device_id}
                id={`card-${device.device_id.toLowerCase()}`}
                className="p-4 max-md:p-3.5 rounded-[8px] bg-white border border-[#EAECF0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Header row: Device ID + Zone (left) and strict colored dot (right) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-data-mono text-[11px] text-[#475467] tnum">
                      {device.device_id}
                    </span>
                    <span className="font-body-md text-[14px] font-semibold text-[#1A1F29] truncate">
                      {device.location}
                    </span>
                  </div>

                  {/* Status Indicator Rule: small colored dot ONLY */}
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: statusDotColor }}
                    title={`Status: ${device.status}`}
                  ></span>
                </div>

                {/* Telemetry values */}
                <div className="mt-3 flex items-baseline justify-between">
                  <span
                    className={`font-metric-val text-[24px] font-bold tracking-tight tnum ${
                      isAlarm
                        ? 'text-[#F04438]'
                        : isOffline
                        ? 'text-[#475467]'
                        : 'text-[#1A1F29]'
                    }`}
                  >
                    {device.display_primary}
                  </span>
                  <span className="font-body-sm text-[11px] text-[#475467] tnum">
                    {device.display_secondary}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Data Table View conforming to 36px header / 44px row specification */
        <div className="w-full overflow-x-auto rounded-[8px] border border-[#EAECF0] bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="h-9 bg-[#F8F9FA] border-b border-[#EAECF0]">
                <th className="px-4 py-2 font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold w-12 text-center">
                  Status
                </th>
                <th className="px-4 py-2 font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold">
                  Device ID
                </th>
                <th className="px-4 py-2 font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold">
                  Type
                </th>
                <th className="px-4 py-2 font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold">
                  Zone
                </th>
                <th className="px-4 py-2 font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold">
                  Reading
                </th>
                <th className="px-4 py-2 font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold">
                  Battery &amp; Telemetry
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {paginatedDevices.map((device) => {
                const statusDotColor = STATUS_COLORS[device.status] || STATUS_COLORS.online;
                const isAlarm = device.status === 'alarm';
                const isOffline = device.status === 'offline';

                return (
                  <tr
                    key={device.device_id}
                    className="h-11 hover:bg-[#F8F9FA] transition-colors"
                  >
                    <td className="px-4 py-2 text-center">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: statusDotColor }}
                        title={`Status: ${device.status}`}
                      ></span>
                    </td>
                    <td className="px-4 py-2 font-data-mono text-[12px] font-semibold text-[#1A1F29] tnum">
                      {device.device_id}
                    </td>
                    <td className="px-4 py-2 font-body-sm text-[12px] text-[#475467] capitalize">
                      {device.type.replace('_', ' ')}
                    </td>
                    <td className="px-4 py-2 font-body-sm text-[12px] text-[#1A1F29] font-medium">
                      {device.location}
                    </td>
                    <td className={`px-4 py-2 font-data-mono text-[13px] font-semibold tnum ${
                      isAlarm ? 'text-[#F04438]' : isOffline ? 'text-[#475467]' : 'text-[#1A1F29]'
                    }`}>
                      {device.display_primary}
                    </td>
                    <td className="px-4 py-2 font-data-mono text-[12px] text-[#475467] tnum">
                      {device.display_secondary}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Fleet Pagination & Bottom Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 px-1 text-[#475467] font-body-sm text-[12px] max-md:items-center max-md:text-center">
        <div className="flex items-center gap-2">
          <span>
            Showing {startIndex}–{endIndex} of {filteredDevices.length} sensors
          </span>
          <span className="text-[#D0D5DD] max-md:hidden">·</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 max-md:px-3 max-md:py-2 max-md:min-h-[40px] rounded border border-[#EAECF0] bg-white text-[#475467] hover:text-[#1A1F29] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center font-medium"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`w-7 h-7 max-md:w-10 max-md:h-10 max-md:min-h-[40px] max-md:min-w-[40px] rounded text-center text-[12px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                safePage === pageNum
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-white border border-[#EAECF0] text-[#475467] hover:text-[#1A1F29]'
              }`}
            >
              {pageNum}
            </button>
          ))}

          {totalPages > 4 && <span className="px-1 text-[#475467]">...</span>}

          {totalPages > 3 && (
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className={`w-7 h-7 max-md:w-10 max-md:h-10 max-md:min-h-[40px] max-md:min-w-[40px] rounded text-center text-[12px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                safePage === totalPages
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-white border border-[#EAECF0] text-[#475467] hover:text-[#1A1F29]'
              }`}
            >
              {totalPages}
            </button>
          )}

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 max-md:px-3 max-md:py-2 max-md:min-h-[40px] rounded border border-[#EAECF0] bg-white text-[#475467] hover:text-[#1A1F29] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
