"use client";
interface BackButtonProps {
  href: string;
  label: string;
}

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full pt-6" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
