
import deepMerge from "@/utilities/deepMerge"
import formatSlug from "@/utilities/formatSlug"
import { Field } from "payload"



type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field
// Définition d'un type pour une fonction qui génère un champ "slug".
// Cette fonction prend un paramètre optionnel `fieldToUse` (par défaut 'title') et des `overrides`

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
    },
    overrides,
  )
