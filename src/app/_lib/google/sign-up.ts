import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const SPREADSHEET_ID = process.env['GOOGLE_SPREADSHEET_ID'] ?? ''
const SHEET_ID = process.env['GOOGLE_SHEET_ID']
const GOOGLE_CLIENT_EMAIL = process.env['GOOGLE_CLIENT_EMAIL']
const GOOGLE_SERVICE_PRIVATE_KEY = process.env['GOOGLE_SERVICE_PRIVATE_KEY']

const serviceAccountAuth = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_SERVICE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)

export const addRowToSheet = async (email: string) => {
  try {
    await doc.loadInfo()
    const sheet = doc.sheetsById[Number(SHEET_ID)]
    if (!sheet) {
      throw new Error(`Sheet with ID ${SHEET_ID} not found.`)
    }
    await sheet.addRow({
      Email: email,
      'Signup Date': new Date().toLocaleString(),
    })
  } catch (error) {
    console.error('Error in addRowToSheet:', error)
    throw error
  }
}
