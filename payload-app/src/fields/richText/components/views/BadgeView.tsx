"use client"

import { BadgePickerViewProps, BadgeStyle } from "../../types";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

export const BADGE_STYLES: BadgeStyle[] = [
  {
    name: 'Info',
    background: 'rgba(14, 165, 233)',
    color: 'rgb(14, 165, 233)',
    borderColor: 'rgba(14, 165, 233, 0.25)'
  },
  {
    name: 'Success',
    background: 'rgba(34, 197, 94)',
    color: 'rgb()',
    borderColor: 'rgba(34, 197, 94, 0.25)'
  },
  {
    name: 'Warning',
    background: 'rgba(245, 158, 11)',
    color: 'rgb(245, 158, 11)',
    borderColor: 'rgba(245, 158, 11, 0.25)'
  },
  {
    name: 'Error',
    background: 'rgba(239, 68, 68)',
    color: 'rgb(239, 68, 68)',
    borderColor: 'rgba(239, 68, 68, 0.25)'
  },
  {
    name: 'Neutral',
    background: 'rgba(107, 114, 128)',
    color: 'rgb(107, 114, 128)',
    borderColor: 'rgba(107, 114, 128, 0.25)'
  }
];

const Badge = ({ style }: { style: BadgeStyle }) => (
  <span
    className="inline-flex text-white items-center px-3 py-1.5 font-medium rounded-lg border"
    style={{
      
      background: style.background,
      borderColor: style.borderColor,
    }}
  >
    {style.name}
  </span>
);

export const BadgePickerView = ({
  selectedStyle,
  onStyleChange,
  onReset
}: BadgePickerViewProps) => {
  return (
    <Card className="w-full min-w-[270px] bg-black/30 backdrop-blur-lg text-white">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <RadioGroup
            value={selectedStyle?.name || "none"}
            onValueChange={(value) => {
              if (value === "none") {
                onReset();
              } else {
                const style = BADGE_STYLES.find(s => s.name === value);
                if (style) onStyleChange(style);
              }
            }}
            className="gap-2.5"
          >
            <div className="flex items-center gap-3 -mb-1">
              <RadioGroupItem
                value="none"
                id="none"
                className="text-white border-white/30"
              />
              <Label
                htmlFor="none"
                className="flex items-center gap-2 cursor-pointer text-sm text-white/80"
              >
                No badge
              </Label>
            </div>

            {BADGE_STYLES.map((style) => (
              <div key={style.name} className="flex items-center gap-3">
                <RadioGroupItem
                  value={style.name}
                  id={style.name}
                  className="text-white border-white/30"
                />
                <Label
                  htmlFor={style.name}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Badge style={style} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};