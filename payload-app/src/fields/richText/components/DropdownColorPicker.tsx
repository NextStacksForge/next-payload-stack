"use client"

import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Type } from 'lucide-react';
import ColorPickerView from './views/ColorPickerView';

export const TextColorPicker = () => {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hasActiveSelection, setHasActiveSelection] = useState(false);
  const [lastAppliedColor, setLastAppliedColor] = useState<string | null>(null);

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          setHasActiveSelection($isRangeSelection(selection) && !selection.isCollapsed());
        });
      }
    );

    return () => {
      unregisterListener();
    };
  }, [editor]);

  const applyTextColor = (color: string | null) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          color: color,
        });
        setLastAppliedColor(color);
      }
    });
  };

  const handleReset = () => {
    applyTextColor(null);
    setLastAppliedColor(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          'background-color': open ? 'rgba(178, 255, 214, 0.2)' : null,
        });
      }
    });
  };

  return (
    <TooltipProvider>
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild disabled={!hasActiveSelection}>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 p-0 hover:bg-black/20 focus-visible:ring-1 focus-visible:ring-white/30 relative"
              >
                <Type className="w-4 h-4 text-white" />
                {lastAppliedColor && (
                  <div 
                    className="w-2 h-2 absolute bottom-1 right-1 rounded-full"
                    style={{ backgroundColor: lastAppliedColor }}
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-black/30 backdrop-blur-lg border-white/20">
            <p className="text-xs text-white">Text color</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent 
          side="top" 
          className="bg-transparent border-transparent p-0"
          hidden={!hasActiveSelection}
        >
          <ColorPickerView
            fontColor={lastAppliedColor || '#000000'}
            onFontColorChange={(color) => {
              applyTextColor(color);
            }}
            onApplyStyles={() => {
              if (lastAppliedColor) {
                applyTextColor(lastAppliedColor);
              }
            }}
            onReset={handleReset}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};