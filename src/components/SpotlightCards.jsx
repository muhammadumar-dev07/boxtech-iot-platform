import React from 'react';

export default function SpotlightCards() {
  const spotlights = [
    {
      id: "spotlight-temp-humidity",
      title: "Temp & Humidity",
      metricPrimary: "71.4°F",
      metricSecondary: "44.8% RH",
      zoneInfo: "Zone A · Battery 96%",
      sensorCount: "140 Sensors"
    },
    {
      id: "spotlight-occupancy",
      title: "Occupancy",
      metricPrimary: "184",
      metricSecondary: "Count",
      zoneInfo: "Zone C · Battery 18%",
      sensorCount: "84 Sensors"
    },
    {
      id: "spotlight-door-leak",
      title: "Door & Leak",
      metricPrimary: "Leak Detected",
      metricSecondary: "",
      zoneInfo: "Zone B · Battery 82%",
      sensorCount: "68 Sensors"
    }
  ];

  return (
    <div id="spotlight-cards-grid" className="grid grid-cols-1 sm:grid-cols-3 max-md:grid-cols-1 gap-4 max-md:gap-3">
      {spotlights.map((card) => (
        <div
          key={card.title}
          id={card.id}
          className="flex flex-col justify-between p-4 max-md:p-3 rounded-[8px] bg-white border border-[#EAECF0] shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-[11px] text-[#475467] uppercase tracking-wider font-semibold">
              {card.title}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="font-metric-val text-[24px] font-bold text-[#1A1F29] tracking-tight tnum">
                {card.metricPrimary}
              </span>
              {card.metricSecondary && (
                <span className="font-data-mono text-[12px] font-medium text-[#475467] tnum">
                  {card.metricSecondary}
                </span>
              )}
            </div>

            <div className="pt-2 border-t border-[#E8EEFF] flex items-center justify-between text-[#475467] font-body-sm text-[11px] mt-3">
              <span>{card.zoneInfo}</span>
              <span className="font-data-mono tnum">{card.sensorCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
