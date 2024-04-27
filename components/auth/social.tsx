"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2 px-6">
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => console.log("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => console.log("google")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
