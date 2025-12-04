import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface TeamMember {
  role: string;
  name: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}