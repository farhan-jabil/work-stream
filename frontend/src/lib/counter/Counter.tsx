"use client";

import { CounterProps } from "@/types/ui.types";
import CountUp from "react-countup";

export default function Counter({ number, title, isCounting }: CounterProps) {
  return (
    <div className="number">
      {isCounting && <CountUp duration={7} className="counter" end={number} />}
      {title && <span>{title}</span>}
    </div>
  );
}