"use client "

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HexColorPicker } from 'react-colorful';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  onFontColorChange: (color: string) => void;
  fontColor: string;
  onApplyStyles: () => void;
  onReset: () => void;
}

const ColorPickerView = ({ fontColor, onFontColorChange, onApplyStyles, onReset }: Props) => {
  const [color, setColor] = React.useState<string>(fontColor || '#000000');
  const [activeTab, setActiveTab] = React.useState('hex');

  const [colorValues, setColorValues] = React.useState({
    hex: color,
    rgb: { r: 0, g: 0, b: 0 },
    hsl: { h: 0, s: 0, l: 0 }
  });

  // Function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Function to convert hex to HSL
  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setColorValues({
      hex: newColor,
      rgb: hexToRgb(newColor),
      hsl: hexToHsl(newColor)
    });
    onFontColorChange(newColor);
  };

  return (
    <Card className="w-full min-w-[270px] bg-black/30 backdrop-blur-lg text-white" >
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <HexColorPicker
              color={color}
              onChange={handleColorChange}
              className=""
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-w-[230px] ">
            <TabsList className="w-full py-2 bg-white/10">
              <TabsTrigger value="hex">HEX</TabsTrigger>
              <TabsTrigger value="rgb">RGB</TabsTrigger>
              <TabsTrigger value="hsl">HSL</TabsTrigger>
            </TabsList>

            <TabsContent value="hex" className="mt-4 min-w-[230px]">
              <div className="flex items-center gap-4">
                <Label htmlFor="hex-input" className="w-12">HEX</Label>
                <Input
                  id="hex-input"
                  value={colorValues.hex.replace('#', '')}
                  onChange={(e) => handleColorChange(`#${e.target.value}`)}
                  className="font-mono"
                  maxLength={6}
                />
              </div>
            </TabsContent>

            <TabsContent value="rgb" className="mt-4 space-y-4 w-full min-w-[230px]">
              <div className="flex items-center gap-4">
                <Label htmlFor="rgb-r" className="w-12">R</Label>
                <Input
                  id="rgb-r"
                  type="number"
                  min="0"
                  max="255"
                  value={colorValues.rgb.r}
                  className="font-mono"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="rgb-g" className="w-12">G</Label>
                <Input
                  id="rgb-g"
                  type="number"
                  min="0"
                  max="255"
                  value={colorValues.rgb.g}
                  className="font-mono"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="rgb-b" className="w-12">B</Label>
                <Input
                  id="rgb-b"
                  type="number"
                  min="0"
                  max="255"
                  value={colorValues.rgb.b}
                  className="font-mono"
                />
              </div>
            </TabsContent>

            <TabsContent value="hsl" className="mt-4 space-y-4 min-w-[230px]">
              <div className="flex items-center gap-4">
                <Label htmlFor="hsl-h" className="w-12">H</Label>
                <Input
                  id="hsl-h"
                  type="number"
                  min="0"
                  max="360"
                  value={colorValues.hsl.h}
                  className="font-mono"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="hsl-s" className="w-12">S%</Label>
                <Input
                  id="hsl-s"
                  type="number"
                  min="0"
                  max="100"
                  value={colorValues.hsl.s}
                  className="font-mono"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="hsl-l" className="w-12">L%</Label>
                <Input
                  id="hsl-l"
                  type="number"
                  min="0"
                  max="100"
                  value={colorValues.hsl.l}
                  className="font-mono"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-5">

          <Button onClick={onReset} className="w-24 bg-red-400/10 text-white hover:bg-red-500/50">
              Reset
            </Button>

            <Button onClick={onApplyStyles} className="w-24 bg-white text-black hover:bg-white/50">
              Apply
            </Button>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPickerView;