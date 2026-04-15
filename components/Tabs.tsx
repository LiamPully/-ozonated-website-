"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              active === index
                ? "border-teal-600 bg-teal-600 text-white"
                : "border-teal-100 bg-white text-teal-700 hover:bg-teal-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-teal-100 bg-white p-5">{tabs[active]?.content}</div>
    </div>
  );
}
