import { createServerFeature } from '@payloadcms/richtext-lexical';
import { TextStyleFeatureClient } from './feature.client';

export const TextStyleFeature = createServerFeature({
  feature: {
    ClientFeature: TextStyleFeatureClient,
  },
  key: 'textStyles',
});
