"use client";

import CountUp from "react-countup";

interface CounterProps {
  number: number;
  title?: string;
  isCounting: boolean;
}

export default function Counter({ number, title, isCounting }: CounterProps) {
  return (
    <div className="number">
      {isCounting && <CountUp duration={7} className="counter" end={number} />}
      {title && <span>{title}</span>}
    </div>
  );
}