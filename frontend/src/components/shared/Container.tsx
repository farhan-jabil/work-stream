import { ContainerProps, ContainerSize } from "@/types/ui.types";

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-2xl",   // ~672px  — FAQ-style narrow content
  md: "max-w-4xl",   // ~896px
  lg: "max-w-7xl",   // ~1280px — most of your sections (Features, About, Pricing)
  xl: "max-w-screen-xl", // Navbar
  full: "max-w-full",
};

const Container = ({
  children,
  size = "lg",
  className = "",
  as: Tag = "div",
}: ContainerProps) => {
  return (
    <Tag className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeMap[size]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Container;