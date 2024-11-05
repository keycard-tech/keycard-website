import path from 'node:path'
import process from 'node:process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(
  path.resolve(process.cwd()),
  process.env.NODE_ENV !== 'production',
)
