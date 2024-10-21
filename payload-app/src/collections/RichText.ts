import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";


export const RichTextExemple: CollectionConfig = {
    slug: 'rich-text-exemple',
    labels: {
        singular: "Rich Text Exemple",
        plural: "Rich Text Exemples"
    },
    admin:{
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview:{
            url:({ data}) => `${process.env.NEXT_PUBLIC_APP_URL}/${data.slug}: ''`,
        },
        useAsTitle: 'title'
    },
    versions:{
        drafts: true
    },
    access:{
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
          },
          {
            name: 'updatedAt',
            type: 'date',
            required: true,
            admin: {
              position: 'sidebar',
            },
          },
          slugField(),
          {
            name:'rich-text',
            type: 'richText',
            label:'Rich Text Lexical',
          }
    ]
}