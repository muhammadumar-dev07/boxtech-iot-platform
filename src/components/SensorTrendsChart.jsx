import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area
} from 'recharts';
import { SENSOR_TRENDS_DATA } from '../mockData';

// Custom Tooltip Card matching screenshot
function CustomChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const tempVal = payload.find(p => p.dataKey === 'temp')?.value ?? dataPoint.temp;
    const humVal = payload.find(p => p.dataKey === 'humidity')?.value ?? dataPoint.humidity;
    const note = dataPoint.tooltipNote || `${label} · Zone B`;

    return (
      <div className="px-3 py-2 rounded-lg bg-[#273143] text-white shadow-xl text-left pointer-events-none border border-[#3C475A]">
        <span className="font-data-mono text-[11px] block text-[#D9E3FB] font-medium tnum">
          {note}
        </span>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="font-data-mono text-[12px] font-semibold text-[#ECF0FF] tnum">
            Temp: {tempVal ? tempVal.toFixed(1) : ''}°F
          </span>
          <span className="font-data-mono text-[12px] text-[#D5E0F8] tnum">
            RH: {humVal ? humVal.toFixed(1) : ''}%
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export default function SensorTrendsChart() {
  const [range, setRange] = useState("7d");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const data = SENSOR_TRENDS_DATA[range] || SENSOR_TRENDS_DATA["7d"];
  const xKey = range === "24h" ? "time" : "day";
  const refLineKey = range === "7d" ? "Thu" : data[Math.floor(data.length / 2)]?.[xKey];

  return (
    <div
      id="sensor-trends-card"
      className="flex flex-col p-4 max-md:p-3 rounded-[8px] bg-white border border-[#EAECF0] shadow-sm h-full"
    >
      {/* Card Header & Range Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
        <h2 className="font-headline-md text-[20px] max-md:text-[16px] font-semibold text-[#1A1F29] tracking-tight">
          Sensor Trends — {range === "7d" ? "7 Day" : range.toUpperCase()}
        </h2>

        <div className="flex items-center gap-1 bg-[#F0F3FF] p-1 rounded-lg border border-[#EAECF0] max-md:w-full max-md:justify-between">
          {["24h", "7d", "30d", "Custom"].map((r) => {
            const isActive = range === r;
            return (
              <button
                key={r}
                id={`btn-range-${r.toLowerCase()}`}
                type="button"
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded font-label-sm text-[11px] transition-colors cursor-pointer max-md:min-h-[40px] max-md:flex-1 max-md:flex max-md:items-center max-md:justify-center ${
                  isActive
                    ? "bg-white text-[#1A1F29] font-semibold shadow-xs"
                    : "text-[#475467] hover:text-[#1A1F29]"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Axis Line Chart */}
      <div className="relative w-full h-64 max-md:h-56 my-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={
              isMobile
                ? { top: 15, right: 6, left: -14, bottom: 5 }
                : { top: 15, right: 30, left: 10, bottom: 5 }
            }
          >
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#111C2D" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#111C2D" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#545F73" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#545F73" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#F0F3FF"
              strokeWidth={1.5}
              vertical={false}
            />

            {/* Left Y-Axis: Temperature (°F) */}
            <YAxis
              yAxisId="left"
              domain={[68, 76]}
              ticks={[68, 70, 72, 74, 76]}
              tickFormatter={(v) => `${v}°`}
              stroke="#545F73"
              tick={{ fontSize: isMobile ? 9 : 10, fontFamily: 'Inter', fill: '#545F73' }}
              axisLine={false}
              tickLine={false}
              width={isMobile ? 26 : 32}
            />

            {/* Right Y-Axis: Humidity (%) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[40, 60]}
              ticks={[40, 45, 50, 55, 60]}
              tickFormatter={(v) => `${v}%`}
              stroke="#545F73"
              tick={{ fontSize: isMobile ? 9 : 10, fontFamily: 'Inter', fill: '#545F73' }}
              axisLine={false}
              tickLine={false}
              width={isMobile ? 28 : 36}
            />

            {/* X-Axis */}
            <XAxis
              dataKey={xKey}
              stroke="#E8EEFF"
              tick={{ fontSize: isMobile ? 10 : 11, fontFamily: 'Inter', fill: '#545F73' }}
              tickLine={false}
              dy={6}
            />

            {/* Reference Line at specified day */}
            {refLineKey && (
              <ReferenceLine
                x={refLineKey}
                stroke="#76777D"
                strokeDasharray="2 2"
                strokeWidth={1}
              />
            )}

            <Tooltip content={<CustomChartTooltip />} />

            {/* Subtle Gradient Fills */}
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              fill="url(#humGradient)"
              stroke="none"
              isAnimationActive={false}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="temp"
              fill="url(#tempGradient)"
              stroke="none"
              isAnimationActive={false}
            />

            {/* Dashed Humidity Line */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              name="Humidity (%)"
              stroke="#545F73"
              strokeWidth={2}
              strokeDasharray="4 3"
              dot={false}
              activeDot={{ r: 4.5, fill: '#545F73', stroke: '#FFFFFF', strokeWidth: 1.5 }}
            />

            {/* Solid Temperature Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temp"
              name="Temp (°F)"
              stroke="#111C2D"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#111C2D', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Mini stats summary footer */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#E8EEFF] mt-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#111C2D] inline-block"></span>
            <span className="font-label-sm text-[11px] text-[#475467] font-medium">
              Temp (°F)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-b border-dashed border-[#545F73] inline-block"></span>
            <span className="font-label-sm text-[11px] text-[#475467] font-medium">
              Humidity (%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
