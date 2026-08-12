import { ReactNode, ElementType } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: ElementType;
}

export interface CounterProps {
  number: number;
  title?: string;
  isCounting: boolean;
}