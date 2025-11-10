'use client';
import { cn } from '@/lib/utils';
import type React from 'react';

type SmoothScrollLinkProps = {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function SmoothScrollLink({ href, children, className, ...props }: SmoothScrollLinkProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    props.onClick?.(e);
  };

  return (
    <a href={href} onClick={handleScroll} className={className} {...props}>
      {children}
    </a>
  );
}
