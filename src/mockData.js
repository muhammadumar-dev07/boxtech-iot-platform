// Mock data model strictly conforming to:
// {
//   "device_id": "string",
//   "type": "temperature_humidity | occupancy | door_leak",
//   "location": "string (zone)",
//   "readings": {
//     "temperature_c": "number (temperature_humidity only)",
//     "humidity_pct": "number (temperature_humidity only)"
//   },
//   "battery_pct": "number",
//   "status": "online | offline | warning | alarm"
// }

// Conversion helper: °F to °C for seeded values
const fToC = (f) => Number(((f - 32) * 5 / 9).toFixed(2));

// Seeded exact 24 devices matching screenshot
const SEEDED_24 = [
  {
    device_id: "TH-01",
    type: "temperature_humidity",
    location: "Zone A",
    readings: { temperature_c: fToC(71.2), humidity_pct: 44.2 },
    battery_pct: 98,
    status: "online",
    display_primary: "71.2°F",
    display_secondary: "44.2% RH · Bat 98%"
  },
  {
    device_id: "OCC-02",
    type: "occupancy",
    location: "Zone A",
    readings: { occupancy_count: 24 },
    battery_pct: 91,
    status: "online",
    display_primary: "24",
    display_secondary: "Count · Bat 91%"
  },
  {
    device_id: "DL-03",
    type: "door_leak",
    location: "Zone B",
    readings: { state: "Leak Detected" },
    battery_pct: 84,
    status: "alarm",
    display_primary: "Leak Detected",
    display_secondary: "Bat 84%"
  },
  {
    device_id: "TH-04",
    type: "temperature_humidity",
    location: "Zone B",
    readings: { temperature_c: fToC(68.4), humidity_pct: 42.0 },
    battery_pct: 95,
    status: "online",
    display_primary: "68.4°F",
    display_secondary: "42.0% RH · Bat 95%"
  },
  {
    device_id: "OCC-05",
    type: "occupancy",
    location: "Zone C",
    readings: { occupancy_count: 14 },
    battery_pct: 18,
    status: "warning",
    display_primary: "14",
    display_secondary: "Count · Bat 18%"
  },
  {
    device_id: "TH-06",
    type: "temperature_humidity",
    location: "Zone A",
    readings: { temperature_c: fToC(69.1), humidity_pct: 45.1 },
    battery_pct: 93,
    status: "online",
    display_primary: "69.1°F",
    display_secondary: "45.1% RH · Bat 93%"
  },
  {
    device_id: "DL-07",
    type: "door_leak",
    location: "Zone A",
    readings: { state: "Closed" },
    battery_pct: 0,
    status: "offline",
    display_primary: "Closed",
    display_secondary: "Offline · Bat 0%"
  },
  {
    device_id: "DL-08",
    type: "door_leak",
    location: "Zone B",
    readings: { state: "Dry" },
    battery_pct: 89,
    status: "online",
    display_primary: "Dry",
    display_secondary: "Bat 89%"
  },
  {
    device_id: "TH-09",
    type: "temperature_humidity",
    location: "Zone C",
    readings: { temperature_c: fToC(73.5), humidity_pct: 46.3 },
    battery_pct: 97,
    status: "online",
    display_primary: "73.5°F",
    display_secondary: "46.3% RH · Bat 97%"
  },
  {
    device_id: "OCC-10",
    type: "occupancy",
    location: "Zone B",
    readings: { occupancy_count: 12 },
    battery_pct: 90,
    status: "online",
    display_primary: "12",
    display_secondary: "Count · Bat 90%"
  },
  {
    device_id: "TH-11",
    type: "temperature_humidity",
    location: "Zone C",
    readings: { temperature_c: fToC(75.2), humidity_pct: 48.0 },
    battery_pct: 19,
    status: "warning",
    display_primary: "75.2°F",
    display_secondary: "48.0% RH · Bat 19%"
  },
  {
    device_id: "TH-12",
    type: "temperature_humidity",
    location: "Zone A",
    readings: { temperature_c: fToC(41.2), humidity_pct: 85.0 },
    battery_pct: 77,
    status: "alarm",
    display_primary: "41.2°F",
    display_secondary: "85.0% RH · Bat 77%"
  },
  {
    device_id: "DL-13",
    type: "door_leak",
    location: "Zone A",
    readings: { state: "Closed" },
    battery_pct: 92,
    status: "online",
    display_primary: "Closed",
    display_secondary: "Bat 92%"
  },
  {
    device_id: "OCC-14",
    type: "occupancy",
    location: "Zone B",
    readings: { occupancy_count: 38 },
    battery_pct: 88,
    status: "online",
    display_primary: "38",
    display_secondary: "Count · Bat 88%"
  },
  {
    device_id: "DL-15",
    type: "door_leak",
    location: "Zone B",
    readings: { state: "Dry" },
    battery_pct: 96,
    status: "online",
    display_primary: "Dry",
    display_secondary: "Bat 96%"
  },
  {
    device_id: "TH-16",
    type: "temperature_humidity",
    location: "Zone C",
    readings: { temperature_c: fToC(72.0), humidity_pct: 43.9 },
    battery_pct: 94,
    status: "online",
    display_primary: "72.0°F",
    display_secondary: "43.9% RH · Bat 94%"
  },
  {
    device_id: "OCC-17",
    type: "occupancy",
    location: "Zone C",
    readings: { occupancy_count: 8 },
    battery_pct: 17,
    status: "warning",
    display_primary: "8",
    display_secondary: "Count · Bat 17%"
  },
  {
    device_id: "OCC-18",
    type: "occupancy",
    location: "Zone A",
    readings: { occupancy_count: 0 },
    battery_pct: 99,
    status: "online",
    display_primary: "0",
    display_secondary: "Count · Bat 99%"
  },
  {
    device_id: "TH-19",
    type: "temperature_humidity",
    location: "Zone A",
    readings: { temperature_c: fToC(64.5), humidity_pct: 40.8 },
    battery_pct: 93,
    status: "online",
    display_primary: "64.5°F",
    display_secondary: "40.8% RH · Bat 93%"
  },
  {
    device_id: "TH-20",
    type: "temperature_humidity",
    location: "Zone B",
    readings: { temperature_c: fToC(69.5), humidity_pct: 45.4 },
    battery_pct: 91,
    status: "online",
    display_primary: "69.5°F",
    display_secondary: "45.4% RH · Bat 91%"
  },
  {
    device_id: "DL-21",
    type: "door_leak",
    location: "Zone C",
    readings: { state: "Closed" },
    battery_pct: 95,
    status: "online",
    display_primary: "Closed",
    display_secondary: "Bat 95%"
  },
  {
    device_id: "TH-22",
    type: "temperature_humidity",
    location: "Zone B",
    readings: { temperature_c: fToC(70.8), humidity_pct: 48.2 },
    battery_pct: 86,
    status: "online",
    display_primary: "70.8°F",
    display_secondary: "48.2% RH · Bat 86%"
  },
  {
    device_id: "DL-23",
    type: "door_leak",
    location: "Zone A",
    readings: { state: "Open" },
    battery_pct: 90,
    status: "online",
    display_primary: "Open",
    display_secondary: "Bat 90%"
  },
  {
    device_id: "TH-24",
    type: "temperature_humidity",
    location: "Zone C",
    readings: { temperature_c: fToC(71.8), humidity_pct: 44.5 },
    battery_pct: 97,
    status: "online",
    display_primary: "71.8°F",
    display_secondary: "44.5% RH · Bat 97%"
  }
];

// Procedural generation to reach exactly 312 total sensors
// Target breakdowns matching specs and screenshot:
// Total: 312
// - Temp & Humidity: 140 sensors
// - Occupancy: 84 sensors
// - Door & Leak: 88 sensors
// Statuses:
// - Online: 306
// - Warning: 3 (Occ-05, TH-11, Occ-17)
// - Alarm: 2 (DL-03, TH-12)
// - Offline: 1 (DL-07)
export function generateFleet() {
  const devices = [...SEEDED_24];
  const zones = ["Zone A", "Zone B", "Zone C"];

  // Count existing types in SEEDED_24
  let thCount = SEEDED_24.filter(d => d.type === "temperature_humidity").length; // 10
  let occCount = SEEDED_24.filter(d => d.type === "occupancy").length; // 6
  let dlCount = SEEDED_24.filter(d => d.type === "door_leak").length; // 8

  // We need to generate up to 312 devices (140 TH, 84 OCC, 88 DL)
  // All remaining 288 devices are online!
  let currentId = 25;
  while (devices.length < 312) {
    let type;
    if (thCount < 140 && (dlCount >= 88 || currentId % 3 === 0)) {
      type = "temperature_humidity";
      thCount++;
      const zone = zones[currentId % 3];
      const tempF = Number((70.5 + Math.sin(currentId) * 2.2).toFixed(1));
      const rh = Number((44.0 + Math.cos(currentId) * 3.5).toFixed(1));
      const bat = 85 + (currentId % 15);
      devices.push({
        device_id: `TH-${currentId < 100 ? String(currentId).padStart(2, '0') : currentId}`,
        type,
        location: zone,
        readings: {
          temperature_c: fToC(tempF),
          humidity_pct: rh
        },
        battery_pct: bat,
        status: "online",
        display_primary: `${tempF}°F`,
        display_secondary: `${rh}% RH · Bat ${bat}%`
      });
    } else if (occCount < 84 && (thCount >= 140 || currentId % 3 === 1)) {
      type = "occupancy";
      occCount++;
      const zone = zones[currentId % 3];
      const count = (currentId * 7) % 25;
      const bat = 82 + (currentId % 18);
      devices.push({
        device_id: `OCC-${currentId < 100 ? String(currentId).padStart(2, '0') : currentId}`,
        type,
        location: zone,
        readings: { occupancy_count: count },
        battery_pct: bat,
        status: "online",
        display_primary: `${count}`,
        display_secondary: `Count · Bat ${bat}%`
      });
    } else if (dlCount < 88) {
      type = "door_leak";
      dlCount++;
      const zone = zones[currentId % 3];
      const state = currentId % 2 === 0 ? "Closed" : "Dry";
      const bat = 88 + (currentId % 12);
      devices.push({
        device_id: `DL-${currentId < 100 ? String(currentId).padStart(2, '0') : currentId}`,
        type,
        location: zone,
        readings: { state },
        battery_pct: bat,
        status: "online",
        display_primary: state,
        display_secondary: `Bat ${bat}%`
      });
    } else if (thCount < 140) {
      type = "temperature_humidity";
      thCount++;
      const zone = zones[currentId % 3];
      const tempF = Number((71.0 + Math.sin(currentId) * 1.8).toFixed(1));
      const rh = Number((44.5 + Math.cos(currentId) * 2.0).toFixed(1));
      const bat = 90 + (currentId % 10);
      devices.push({
        device_id: `TH-${currentId < 100 ? String(currentId).padStart(2, '0') : currentId}`,
        type,
        location: zone,
        readings: {
          temperature_c: fToC(tempF),
          humidity_pct: rh
        },
        battery_pct: bat,
        status: "online",
        display_primary: `${tempF}°F`,
        display_secondary: `${rh}% RH · Bat ${bat}%`
      });
    } else {
      type = "occupancy";
      occCount++;
      const zone = zones[currentId % 3];
      const count = 5;
      const bat = 95;
      devices.push({
        device_id: `OCC-${currentId < 100 ? String(currentId).padStart(2, '0') : currentId}`,
        type,
        location: zone,
        readings: { occupancy_count: count },
        battery_pct: bat,
        status: "online",
        display_primary: `${count}`,
        display_secondary: `Count · Bat ${bat}%`
      });
    }
    currentId++;
  }

  return devices;
}

// 7-day trend historical readings matching the screenshot curve
export const SENSOR_TRENDS_DATA = {
  "24h": [
    { time: "00:00", temp: 70.2, humidity: 46.5, tooltipNote: "00:00 · Zone A" },
    { time: "04:00", temp: 69.8, humidity: 48.0, tooltipNote: "04:00 · Zone B" },
    { time: "08:00", temp: 71.0, humidity: 45.2, tooltipNote: "08:00 · Zone A" },
    { time: "12:00", temp: 72.4, humidity: 44.1, tooltipNote: "12:00 · Zone C" },
    { time: "14:00", temp: 72.1, humidity: 46.0, tooltipNote: "14:00 · Zone B" },
    { time: "16:00", temp: 72.8, humidity: 43.8, tooltipNote: "16:00 · Zone B" },
    { time: "20:00", temp: 71.5, humidity: 45.0, tooltipNote: "20:00 · Zone A" },
    { time: "Now", temp: 71.4, humidity: 44.8, tooltipNote: "Now · All Zones" }
  ],
  "7d": [
    { day: "Mon", temp: 71.8, humidity: 47.2, tooltipNote: "Mon 12:00 · All Zones" },
    { day: "Tue", temp: 71.2, humidity: 48.5, tooltipNote: "Tue 12:00 · All Zones" },
    { day: "Wed", temp: 71.9, humidity: 46.8, tooltipNote: "Wed 12:00 · All Zones" },
    { day: "Thu", temp: 72.1, humidity: 46.0, tooltipNote: "Thu 14:00 · Zone B" },
    { day: "Fri", temp: 73.6, humidity: 52.5, tooltipNote: "Fri 12:00 · All Zones" },
    { day: "Sat", temp: 74.5, humidity: 51.0, tooltipNote: "Sat 12:00 · All Zones" },
    { day: "Today", temp: 74.0, humidity: 49.5, tooltipNote: "Today · All Zones" }
  ],
  "30d": [
    { day: "Week 1", temp: 70.8, humidity: 45.1, tooltipNote: "W1 Average" },
    { day: "Week 2", temp: 71.5, humidity: 46.0, tooltipNote: "W2 Average" },
    { day: "Week 3", temp: 72.3, humidity: 47.5, tooltipNote: "W3 Average" },
    { day: "Week 4", temp: 71.4, humidity: 44.8, tooltipNote: "W4 Average" }
  ],
  "Custom": [
    { day: "Sep 10", temp: 71.1, humidity: 45.3, tooltipNote: "Sep 10" },
    { day: "Sep 11", temp: 71.4, humidity: 46.1, tooltipNote: "Sep 11" },
    { day: "Sep 12", temp: 72.0, humidity: 45.8, tooltipNote: "Sep 12" },
    { day: "Sep 13", temp: 72.1, humidity: 46.0, tooltipNote: "Sep 13" },
    { day: "Sep 14", temp: 73.2, humidity: 50.4, tooltipNote: "Sep 14" },
    { day: "Sep 15", temp: 74.1, humidity: 51.2, tooltipNote: "Sep 15" },
    { day: "Sep 16", temp: 73.8, humidity: 48.9, tooltipNote: "Sep 16" }
  ]
};

// Recent Alerts exactly matching screenshot
export const RECENT_ALERTS = [
  {
    id: "alert-1",
    device_id: "Occ-14",
    zone: "Zone C",
    detail: "Battery 18%",
    timeAgo: "35m ago",
    status: "warning",
    badgeLabel: "Low Battery",
    statusColor: "#F79009"
  },
  {
    id: "alert-2",
    device_id: "Door-07",
    zone: "Zone A",
    detail: "Disconnected",
    timeAgo: "42m ago",
    status: "offline",
    badgeLabel: "Offline",
    statusColor: "#98A2B3"
  },
  {
    id: "alert-3",
    device_id: "Leak-04",
    zone: "Zone B",
    detail: "Leak Detected",
    timeAgo: "1h ago",
    status: "alarm",
    badgeLabel: "Critical",
    statusColor: "#F04438"
  }
];

export const KPI_DATA = {
  totalDevices: 312,
  avgTemp: "71.4°F",
  avgHumidity: "44.8%",
  totalOccupancy: 184,
  activeAlerts: 2,
  offlineCount: 1
};

export const SYSTEM_HEALTH_DATA = {
  onlineCount: 306,
  onlinePct: "98.1%",
  warningCount: 3,
  warningPct: "1.0%",
  alarmCount: 2,
  alarmPct: "0.6%",
  offlineCount: 1,
  offlinePct: "0.3%"
};
