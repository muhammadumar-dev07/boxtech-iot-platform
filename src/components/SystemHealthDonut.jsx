import React from 'react';
import { SYSTEM_HEALTH_DATA } from '../mockData';

export default function SystemHealthDonut() {
  const items = [
    {
      label: "Online",
      count: SYSTEM_HEALTH_DATA.onlineCount,
      pct: SYSTEM_HEALTH_DATA.onlinePct,
      color: "#12B76A",
      textClass: "text-[#1A1F29]"
    },
    {
      label: "Warning / Low Battery",
      count: SYSTEM_HEALTH_DATA.warningCount,
      pct: SYSTEM_HEALTH_DATA.warningPct,
      color: "#F79009",
      textClass: "text-[#475467]"
    },
    {
      label: "Alarm / Critical",
      count: SYSTEM_HEALTH_DATA.alarmCount,
      pct: SYSTEM_HEALTH_DATA.alarmPct,
      color: "#F04438",
      textClass: "text-[#1A1F29]"
    },
    {
      label: "Offline",
      count: SYSTEM_HEALTH_DATA.offlineCount,
      pct: SYSTEM_HEALTH_DATA.offlinePct,
      color: "#98A2B3",
      textClass: "text-[#475467]"
    }
  ];

  return (
    <div
      id="system-health-card"
      className="flex flex-col justify-between p-4 max-md:p-3 rounded-[8px] bg-white border border-[#EAECF0] shadow-sm h-full"
    >
      <div className="flex items-center justify-between pb-1">
        <h2 className="font-headline-md text-[20px] max-md:text-[16px] font-semibold text-[#1A1F29] tracking-tight">
          System Health
        </h2>
      </div>

      {/* Donut Gauge */}
      <div className="flex flex-col items-center justify-center my-3">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="transparent"
              stroke="#F0F3FF"
              strokeWidth="12"
            />
            {/* Warning / Error Slice */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="transparent"
              stroke="#FFDAD6"
              strokeWidth="12"
              strokeDasharray="414.69"
              strokeDashoffset="15"
              strokeLinecap="round"
            />
            {/* Main Online Slice (98.1% of circumference) */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="transparent"
              stroke="#111C2D"
              strokeWidth="12"
              strokeDasharray="414.69"
              strokeDashoffset="24"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-display-kpi text-[36px] font-bold text-[#1A1F29] leading-none tnum">
              {SYSTEM_HEALTH_DATA.onlineCount}
            </span>
            <span className="font-label-sm text-[11px] text-[#475467] uppercase tracking-wider font-semibold mt-1">
              Online Devices
            </span>
          </div>
        </div>
      </div>

      {/* Health Breakdown List */}
      <div className="flex flex-col gap-1.5 pt-1">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-2 rounded-lg bg-[#F0F3FF] font-label-md text-[13px]"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className={`font-medium ${item.textClass}`}>{item.label}</span>
            </div>
            <span className={`font-data-mono font-semibold tnum ${item.textClass}`}>
              {item.count} ({item.pct})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
