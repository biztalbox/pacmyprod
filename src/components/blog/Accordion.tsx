"use client";

import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-6 border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 cursor-pointer font-semibold text-white bg-gray-800/50 hover:bg-gray-800/70 transition-colors text-left flex items-center justify-between"
      >
        <span>{title}</span>
        <span
          className={`text-primary transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-700">{children}</div>
      )}
    </div>
  );
}

