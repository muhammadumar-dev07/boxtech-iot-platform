import React from 'react';

export default function KpiRow({ kpis }) {
  const cards = [
    { label: "Total Devices", value: kpis.totalDevices, id: "kpi-total-devices", isAlert: false },
    { label: "Avg Temperature", value: kpis.avgTemp, id: "kpi-avg-temp", isAlert: false },
    { label: "Avg Humidity", value: kpis.avgHumidity, id: "kpi-avg-humidity", isAlert: false },
    { label: "Total Occupancy", value: kpis.totalOccupancy, id: "kpi-total-occupancy", isAlert: false },
    { label: "Active Alerts", value: kpis.activeAlerts, id: "kpi-active-alerts", isAlert: true },
    { label: "Offline Count", value: kpis.offlineCount, id: "kpi-offline-count", isAlert: false },
  ];

  return (
    <div id="kpi-metrics-row" className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 max-md:grid-cols-2 max-md:gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          id={card.id}
          className="flex flex-col justify-between p-4 max-md:p-3 rounded-[8px] bg-white border border-[#EAECF0] shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="font-label-sm text-[11px] max-md:text-[10px] text-[#475467] uppercase tracking-wider font-semibold truncate" title={card.label}>
            {card.label}
          </span>
          <div className="my-2 max-md:my-1">
            <span
              className={`font-display-kpi text-[36px] max-md:text-[26px] max-md:leading-8 font-bold leading-tight tnum ${
                card.isAlert ? "text-[#F04438]" : "text-[#1A1F29]"
              }`}
            >
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
