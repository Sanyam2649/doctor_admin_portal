'use client';

import React from 'react';
export default function Modal({
  header,
  body,
  open = true,
  onBackdrop,
  containerClassName = 'w-[1000px] max-w-[96vw] h-[560px] max-h-[92vh] rounded-xl border border-gray-200 shadow-2xl bg-white overflow-hidden',
  backdropClassName = 'bg-black/55 backdrop-blur-[1px]',
  contentClassName = 'p-0',
  children, 
}) {
  if (!open) return null;

  const HeaderIcon = header?.Icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className={`absolute inset-0 ${backdropClassName}`} onClick={onBackdrop} />
      <div className={`relative ${containerClassName}`}>
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${header?.className || 'bg-teal-600 border-teal-700'}`}>
          {HeaderIcon ? <HeaderIcon className={header?.iconClassName || 'h-5 w-5 text-white'} /> : null}
          <h3 className="text-sm font-semibold text-white">{header?.text || ''}</h3>
        </div>

        <div className={contentClassName}>
          {body ?? children}
        </div>
      </div>
    </div>
  );
}
