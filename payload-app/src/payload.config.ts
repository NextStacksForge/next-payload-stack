// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  FixedToolbarFeature,
  lexicalEditor,
  TreeViewFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

/**
 * @payload
 */
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { RichTextExemple } from './collections/RichText'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    autoLogin: {
      email: 'zelenionzelenion@gmail.com',
      password: 'MarieCurie!',
      prefillOnly: true,
    },
  },
  collections: [Users, Media, RichTextExemple],
  editor: lexicalEditor({
    features: ({ defaultFeatures }: any) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      TreeViewFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    supportedLanguages: { en, fr },
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Français',
        code: 'fr',
      },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: [],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `Website.com — ${doc.title}`,
      generateDescription: ({ doc }: any) => doc.excerpt,
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})
