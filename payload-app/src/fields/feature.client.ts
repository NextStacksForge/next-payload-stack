"use client"
import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client';
import { TextColorPicker } from './richText/components/DropdownColorPicker';
import { HighlightColorPicker } from './richText/components/DropdownHighliter';
import { BadgePicker } from './richText/components/DropdownBadge';




export const TextStyleFeatureClient = createClientFeature({
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'textColor',
          label: 'Text Color',
          Component: TextColorPicker,
        },
        {
          key: 'highlight',
          label: 'Highlight',
          Component: HighlightColorPicker,
        },
        {
          key: 'badge',
          label: 'Badge',
          Component: BadgePicker,
        }
      ]),
    ],
  },
});