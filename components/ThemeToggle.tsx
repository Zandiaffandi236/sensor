"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Toggle } from "./ui/toggle";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();

  const [pressedState, setPressedState] = useState(false);

  const handlePressedChange = (pressed: boolean) => {
    if (pressed === true) {
      setTheme("light");
      setPressedState(true);
    } else {
      setTheme("dark");
      setPressedState(false);
    }
  };

  return (
    <Toggle
      aria-label="Toggle italic"
      pressed={pressedState}
      onPressedChange={(pressed) => {
        handlePressedChange(pressed);
        toast({
          title: `Theme successfully changed to ${pressed ? "Light" : "Dark"}`,
          description: "Press undo to change the theme again",
          action: (
            <ToastAction
              altText="undo"
              onClick={() => handlePressedChange(!pressed)}
            >
              Undo
            </ToastAction>
          ),
        });
      }}
      className="flex flex-row gap-2"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Toggle>
  );
};

export default ThemeToggle;
