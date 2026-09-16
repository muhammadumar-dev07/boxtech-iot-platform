import React from 'react';
import { Link } from 'react-router-dom';
import { RECENT_ALERTS } from '../mockData';

// Status badge configurations per design tokens
const STATUS_BADGE_STYLES = {
  online: {
    bg: '#ECFDF3',
    border: '#A6F4C5',
    text: '#027A48',
    dot: '#12B76A',
    label: 'Online'
  },
  warning: {
    bg: '#FEF0C7',
    border: '#FEDF89',
    text: '#B54708',
    dot: '#F79009',
    label: 'Warning'
  },
  alarm: {
    bg: '#FEF3F2',
    border: '#FECDCA',
    text: '#B42318',
    dot: '#F04438',
    label: 'Critical'
  },
  offline: {
    bg: '#F2F4F7',
    border: '#EAECF0',
    text: '#344054',
    dot: '#98A2B3',
    label: 'Offline'
  }
};

export default function RecentAlertsPanel() {
  return (
    <div
      id="recent-alerts-card"
      className="flex flex-col p-4 max-md:p-3 rounded-[8px] bg-white border border-[#EAECF0] shadow-sm h-full"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[#E8EEFF] mb-1">
        <div className="flex items-center gap-2">
          <h2 className="font-headline-sm text-[16px] font-semibold text-[#1A1F29]">
            Recent Alerts
          </h2>
          <span className="font-body-sm text-[12px] text-[#475467]">
            (2 active)
          </span>
        </div>
        <Link
          to="/alerts"
          id="btn-view-all-alerts"
          className="font-label-sm text-[11px] text-[#475467] hover:text-[#1A1F29] transition-colors font-medium cursor-pointer max-md:min-h-[40px] max-md:flex max-md:items-center"
        >
          View All (14)
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-[#F0F3FF]">
        {RECENT_ALERTS.map((alert) => {
          const badgeStyle = STATUS_BADGE_STYLES[alert.status] || STATUS_BADGE_STYLES.warning;

          return (
            <div
              key={alert.id}
              className="py-2.5 max-md:py-3 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: alert.statusColor }}
                ></span>
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="font-data-mono text-[12px] font-semibold text-[#1A1F29] shrink-0">
                    {alert.device_id}
                  </span>
                  <span className="font-body-sm text-[11px] text-[#475467] shrink-0">
                    · {alert.zone}
                  </span>
                  <span className="font-body-sm text-[11px] text-[#475467] truncate">
                    · {alert.detail}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-data-mono text-[11px] text-[#475467] tnum max-md:text-[10px]">
                  {alert.timeAgo}
                </span>

                {/* Ground truth required: each alert row ends in exactly one status badge */}
                <span
                  className="inline-flex items-center gap-1 h-[21px] px-2 rounded-full font-label-sm text-[11px] font-semibold border shrink-0"
                  style={{
                    backgroundColor: badgeStyle.bg,
                    borderColor: badgeStyle.border,
                    color: badgeStyle.text
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: badgeStyle.dot }}
                  ></span>
                  <span>{badgeStyle.label}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
