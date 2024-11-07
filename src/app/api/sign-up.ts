'use server'

// import { serverEnv } from '@/config/env.server.mjs'
import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { signUpSchema } from './validation/sign-up'

// Config variables
// const SPREADSHEET_ID = serverEnv.GOOGLE_SPREADSHEET_ID
// const SHEET_ID = serverEnv.GOOGLE_SHEET_ID
// const GOOGLE_CLIENT_EMAIL = serverEnv.GOOGLE_CLIENT_EMAIL
// const GOOGLE_SERVICE_PRIVATE_KEY = serverEnv.GOOGLE_SERVICE_PRIVATE_KEY

const SPREADSHEET_ID = '1'
const SHEET_ID = '1'
const GOOGLE_CLIENT_EMAIL = ''
const GOOGLE_SERVICE_PRIVATE_KEY = ''

const serviceAccountAuth = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_SERVICE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    await doc.loadInfo()

    const sheet = doc.sheetsById[Number(SHEET_ID)]

    const data = signUpSchema.parse(req.body)

    await sheet.addRow({
      Email: data.email,
      'Signup Date': new Date().toLocaleString(),
    })

    res.status(200).json({
      data: {
        email: data.email,
      },
    })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: {
          code: 'invalid',
          message: 'Invalid input',
        },
      })
    }

    // Check Vercel logs if necessary
    console.warn(error)

    res.status(500).json({
      error: {
        code: 'Unexpected',
        message: 'An unexpected error occurred',
      },
    })
  }
}
