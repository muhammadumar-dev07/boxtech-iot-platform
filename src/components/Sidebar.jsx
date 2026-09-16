import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid01,
  Signal01,
  AlertTriangle,
  BarChart01,
  Sliders01,
  LayoutLeft,
  XClose
} from '@untitledui/icons';

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen = false,
  setMobileOpen = () => {},
  selectedZone = "All",
  onSelectZone
}) {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutGrid01, id: 'nav-dashboard' },
    { to: '/devices', label: 'Devices', icon: Signal01, id: 'nav-devices' },
    { to: '/alerts', label: 'Alerts', icon: AlertTriangle, id: 'nav-alerts', badge: 2 },
    { to: '/analytics', label: 'Analytics', icon: BarChart01, id: 'nav-analytics' },
    { to: '/settings', label: 'Settings', icon: Sliders01, id: 'nav-settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay - strictly below 768px */}
      {mobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          aria-label="Close sidebar overlay"
          className="hidden max-md:block fixed inset-0 bg-black/40 z-40 backdrop-blur-[1px] transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        id="left-sidebar"
        className={`fixed left-0 top-16 bottom-0 bg-white border-r border-[#EAECF0] z-40 flex flex-col justify-between py-3 transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-60'
        } max-md:top-0 max-md:z-50 max-md:w-72 max-md:shadow-2xl max-md:transition-transform max-md:duration-300 ${
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 px-2">
          {/* Mobile Drawer Header with Close Icon - strictly below 768px */}
          <div className="hidden max-md:flex items-center justify-between px-2 pb-3 border-b border-[#EAECF0] mb-2">
            <div className="flex items-center gap-2">
              <img
                src="/boxtech_logo_full.png"
                alt="BoxTech IoT"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCjgk2NeqQhmbfCSztTsqu4qoSHLZXoID8DHpqi59nZL2CMnJJo_MqbjeMR1Gwem86RY4weE4_EhDrT_QNvaw3MQz0xq7uKixMxhTzAPSUC8mAQg8AnddGz4C3yo693ZtOAIxNV_autwh1Y70vUOmbq7cniEHl5I0OL3LEgMCZu8mGv_kyVredJjDWGGOhP5ZAdXdnklin-4MG3KImI_ZzeHx_TRSF_tmhyLbvVQb1YL7Ixk_opWpXaDYWK4rgdUwHhmw";
                }}
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[15px] font-semibold text-[#1A1F29] leading-tight">
                  BoxTech IoT
                </span>
                <span className="font-label-sm text-[10px] text-[#475467] uppercase tracking-wider">
                  Facility Overview
                </span>
              </div>
            </div>
            <button
              id="btn-close-mobile-sidebar"
              aria-label="Close navigation drawer"
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 text-[#475467] hover:text-[#1A1F29] rounded-lg hover:bg-[#F0F3FF] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <XClose className="w-5 h-5 text-[#1A1F29]" />
            </button>
          </div>

          {/* Mobile Zone Selector inside off-canvas drawer */}
          <div className="hidden max-md:flex flex-col gap-1.5 px-2 pb-3 border-b border-[#EAECF0] mb-2">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold">
              Facility Zone
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {["All", "Zone A", "Zone B", "Zone C"].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => {
                    onSelectZone && onSelectZone(z);
                    setMobileOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-[12px] font-semibold min-h-[40px] transition-colors cursor-pointer text-center ${
                    selectedZone === z
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F0F3FF] text-[#475467] hover:text-[#1A1F29]'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Navigation title & collapse toggle - unchanged at >= 768px */}
          <div className="px-2 pb-2 flex items-center justify-between border-b border-[#EAECF0] mb-1 max-md:hidden">
            {!collapsed && (
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold">
                Navigation
              </span>
            )}
            <button
              id="btn-sidebar-toggle"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="text-[#475467] hover:text-[#1A1F29] p-1 rounded transition-colors cursor-pointer ml-auto"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <LayoutLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  id={item.id}
                  title={collapsed ? item.label : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center ${
                      collapsed ? 'justify-center px-2' : 'justify-between px-3'
                    } py-2 rounded-lg transition-colors group cursor-pointer max-md:min-h-[44px] max-md:px-3 ${
                      isActive
                        ? 'bg-[#0F172A] text-white font-semibold shadow-sm'
                        : 'text-[#475467] hover:bg-[#F8F9FA] hover:text-[#1A1F29]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-5 h-5 shrink-0" />
                    {(!collapsed || mobileOpen) && (
                      <span className="font-label-md text-[13px] max-md:text-[14px]">{item.label}</span>
                    )}
                  </div>
                  {(!collapsed || mobileOpen) && item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full font-label-sm text-[11px] font-semibold bg-[#F04438] text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Version Tag */}
        <div className={`px-4 pt-2 border-t border-[#EAECF0] flex items-center ${collapsed ? 'justify-center' : 'justify-between'} text-[#667085] font-label-sm text-[11px]`}>
          {!collapsed ? (
            <span className="font-data-mono tnum">v2.4.12-prod</span>
          ) : (
            <span className="font-data-mono text-[9px] tnum max-md:text-[11px]">v2.4.12</span>
          )}
        </div>
      </aside>
    </>
  );
}
