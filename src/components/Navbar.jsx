import React from 'react';
import { Bell01, Menu01 } from '@untitledui/icons';

export default function Navbar({ selectedZone = "All", onSelectZone, onOpenMobileMenu }) {
  const zones = ["All", "Zone A", "Zone B", "Zone C"];

  return (
    <header
      id="top-navbar"
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-[#EAECF0] flex items-center justify-between px-4 sm:px-6 max-md:px-3"
    >
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {/* Mobile Hamburger Trigger - strictly below 768px */}
        <button
          id="btn-mobile-sidebar-toggle"
          aria-label="Open navigation menu"
          type="button"
          onClick={onOpenMobileMenu}
          className="hidden max-md:flex items-center justify-center p-2 rounded-lg text-[#475467] hover:text-[#1A1F29] hover:bg-[#F0F3FF] transition-colors cursor-pointer min-h-[44px] min-w-[44px] shrink-0"
        >
          <Menu01 className="w-5 h-5 text-[#1A1F29]" />
        </button>

        <img
          src="/boxtech_logo_full.png"
          alt="BoxTech IoT Logo Mark"
          className="h-8 w-auto object-contain max-md:h-7 shrink-0"
          onError={(e) => {
            // fallback if needed
            e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCjgk2NeqQhmbfCSztTsqu4qoSHLZXoID8DHpqi59nZL2CMnJJo_MqbjeMR1Gwem86RY4weE4_EhDrT_QNvaw3MQz0xq7uKixMxhTzAPSUC8mAQg8AnddGz4C3yo693ZtOAIxNV_autwh1Y70vUOmbq7cniEHl5I0OL3LEgMCZu8mGv_kyVredJjDWGGOhP5ZAdXdnklin-4MG3KImI_ZzeHx_TRSF_tmhyLbvVQb1YL7Ixk_opWpXaDYWK4rgdUwHhmw";
          }}
        />
        <div className="flex flex-col min-w-0">
          <span className="font-headline-sm text-base max-md:text-[13px] text-[#1A1F29] leading-tight tracking-tight font-semibold brand-title-mobile whitespace-nowrap truncate">
            BoxTech IoT Platform
          </span>
          <span className="font-label-sm text-[#475467] uppercase tracking-wider font-semibold text-[11px] max-md:hidden">
            Multi-site facilty overview
          </span>
        </div>

        {/* Divider for Tablet and Desktop (768px+) */}
        <div className="h-6 w-px bg-[#EAECF0] mx-1 hidden md:block"></div>

        {/* Tablet & Desktop Zone Tabs (768px+) */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-[#F8F9FA] rounded-lg border border-[#EAECF0]">
          {zones.map((zone) => {
            const isActive = selectedZone === zone;
            return (
              <button
                key={zone}
                id={`zone-tab-${zone.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => onSelectZone && onSelectZone(zone)}
                className={`px-3 py-0.5 rounded font-label-sm text-[11px] transition-colors cursor-pointer ${
                  isActive
                    ? "font-semibold bg-[#0F172A] text-white shadow-sm"
                    : "text-[#475467] hover:text-[#1A1F29]"
                }`}
              >
                {zone}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Device Status Pill - always visible */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F9FA] border border-[#EAECF0] max-md:px-2 max-md:py-1">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: '#12B76A' }}
            ></span>
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: '#12B76A' }}
            ></span>
          </span>
          <span className="font-data-mono text-[12px] text-[#475467] font-medium tnum max-md:text-[11px] whitespace-nowrap">
            <span className="max-md:hidden">312 devices · Online</span>
            <span className="hidden max-md:inline">312 Online</span>
          </span>
        </div>

        <div className="h-5 w-px bg-[#EAECF0] mx-1 max-md:hidden"></div>

        {/* Notification Bell - touch target >= 44px on mobile */}
        <button
          id="btn-notifications"
          aria-label="Notifications"
          type="button"
          className="relative p-1 text-[#475467] hover:text-[#1A1F29] transition-colors cursor-pointer rounded max-md:min-h-[44px] max-md:min-w-[44px] max-md:flex max-md:items-center max-md:justify-center"
        >
          <Bell01 className="w-5 h-5 text-[#475467]" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F04438] ring-2 ring-white max-md:top-2.5 max-md:right-2.5"></span>
        </button>
      </div>
    </header>
  );
}
