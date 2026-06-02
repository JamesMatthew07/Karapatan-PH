"use client";

import NextLink from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof NextLink>;

export function Link({ className = "", ...props }: Props) {
  return (
    <NextLink
      className={`inline-flex items-center focus-visible:outline focus-visible:outline-3 focus-visible:outline-ph-gold focus-visible:outline-offset-2 rounded-sm ${className}`}
      {...props}
    />
  );
}
