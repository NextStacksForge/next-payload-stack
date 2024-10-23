"use client"

import React, { useState, useEffect } from 'react';
import { TagIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import type { BadgeStyle } from '../types';
import { BADGE_STYLES, BadgePickerView } from './views/BadgeView';


export const BadgePicker = () => {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<BadgeStyle>(BADGE_STYLES[0]);
  const [hasActiveSelection, setHasActiveSelection] = useState(false);
  const [lastAppliedStyle, setLastAppliedStyle] = useState<BadgeStyle | null>(null);

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

  const applyBadgeStyle = (style: BadgeStyle | null) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (style === null) {
          // Reset tous les styles
          $patchStyleText(selection, {
            'background-color': null,
            'color': null,
            'border-radius': null,
            'padding': null,
            'border': null,
            'font-size': null,
            'display': null,
            'line-height': null,
          });
        } else {
          // Applique les styles du badge
          $patchStyleText(selection, {
            'background-color': style.background,
            'color': null,
            'border-radius': '0.5rem',
            'padding': '0.375rem 0.75rem',
            'border': `1px solid ${style.borderColor}`,
            'display': 'inline-block',
            'line-height': '1',
            'font-size': '0.875rem',
          });
        }
      }
    });
  };

  const resetAfterApply = () => {
    // Reset l'état local
    setLastAppliedStyle(null);
    setSelectedStyle(BADGE_STYLES[0]);
    // Ferme le dropdown
    setIsOpen(false);
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
                <TagIcon className="w-4 h-4 text-white" />
                {lastAppliedStyle && (
                  <div 
                    className="w-2 h-2 absolute bottom-1 right-1 rounded-full"
                    style={{ backgroundColor: lastAppliedStyle.background }}
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-black/30 backdrop-blur-lg border-white/20">
            <p className="text-xs text-white">Add badge</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent 
          side="top" 
          className="bg-transparent border-transparent p-0"
          hidden={!hasActiveSelection}
        >
          <BadgePickerView
            selectedStyle={selectedStyle}
            onStyleChange={(style) => {
              setSelectedStyle(style);
              setLastAppliedStyle(style);
              applyBadgeStyle(style);
              // Reset après l'application
              setTimeout(resetAfterApply, 0);
            }}
            onReset={() => {
              applyBadgeStyle(null);
              resetAfterApply();
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};
