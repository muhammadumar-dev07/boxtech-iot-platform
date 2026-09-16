import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="flex flex-col items-start p-8 bg-white rounded-[8px] border border-[#EAECF0] shadow-sm max-w-2xl">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#475467] font-semibold bg-[#F0F3FF] px-2 py-0.5 rounded border border-[#EAECF0]">
          Section
        </span>
      </div>
      <h1 className="font-headline-lg text-[24px] font-semibold text-[#1A1F29] tracking-tight mb-2">
        {title}
      </h1>
      <p className="font-body-md text-[#475467] mb-6">
        {description || "This module is coming soon. The Facility Overview dashboard contains the active live monitoring console."}
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-4 py-2 rounded bg-[#0F172A] text-white font-label-md text-[13px] hover:bg-[#1E293B] transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
