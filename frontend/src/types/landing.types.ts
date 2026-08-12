export interface ValueCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Achievement {
  number: number;
  label: string;
  bgColor: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  gradient: string;
  textAccent: string;
  buttonText: string;
}

export interface Testimonial {
  name: string;
  title: string;
  feedback: string;
  avatar: string;
}