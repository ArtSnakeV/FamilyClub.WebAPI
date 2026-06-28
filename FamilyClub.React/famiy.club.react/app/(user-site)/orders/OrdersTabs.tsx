"use client";

import React from "react";
import { OrderTabId, ORDERS_TABS } from "./mockData";

interface OrdersTabsProps {
  activeTab: OrderTabId;
  onSelectTab: (tab: OrderTabId) => void;
  counts?: Record<OrderTabId, number>;
}

export default function OrdersTabs({ activeTab, onSelectTab, counts }: OrdersTabsProps) {
  const getTabIcon = (id: OrderTabId) => {
    switch (id) {
      case "waiting_payment":
        return (
          <svg className="w-7 h-7 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "waiting_dispatch":
        return (
          <svg className="w-7 h-7 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case "order_sent":
        return (
          <svg className="w-7 h-7 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        );
      case "add_review":
        return (
          <svg className="w-7 h-7 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case "returns":
        return (
          <svg className="w-7 h-7 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case "history":
        return (
          <svg className="w-7 h-7 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full flex justify-between gap-2 md:gap-4 overflow-x-auto pb-6 pt-2 px-1">
      {ORDERS_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const countVal = counts ? counts[tab.id] : tab.count;
        return (
          <div key={tab.id} className="relative flex-1 min-w-[130px] max-w-[170px] flex flex-col items-center">
            {/* Ribbon Tab Button */}
            <button
              onClick={() => onSelectTab(tab.id)}
              className={`w-full flex flex-col items-center justify-start pt-4 px-2 transition-all duration-300 transform ${
                isActive
                  ? "bg-[#004e2B] pb-9 shadow-lg translate-y-1"
                  : "bg-[#006338] pb-7 hover:bg-[#005430] hover:translate-y-0.5"
              }`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
              }}
            >
              {getTabIcon(tab.id)}
              <span className="text-white text-[12px] md:text-[13px] font-medium text-center leading-tight mt-1 px-1">
                {tab.label}
              </span>
            </button>

            {/* Badge Count Circle */}
            {countVal !== undefined && countVal > 0 && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#F5F3EE] text-[#004e2B] rounded-full flex items-center justify-center text-[12px] font-bold shadow-md border border-[#004e2B] z-10">
                {countVal}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
