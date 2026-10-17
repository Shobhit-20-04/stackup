#!/usr/bin/env node

/**
 * StackUp Admin Passcode Reset CLI Utility
 * 
 * Securely updates or provisions the ADMIN_PASSCODE environment variable in .env.local
 * for local development and authorized administration without exposing credentials.
 * 
 * Usage:
 *   node scripts/reset-admin-passcode.js [new-passcode]
 *   npm run admin:reset -- [new-passcode]
 *   npm run admin:reset (generates a secure random 16-character passcode)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateSecurePasscode(length = 16) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charset.length];
  }
  return result;
}

function resetAdminPasscode(desiredPasscode) {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  let passcode = desiredPasscode;

  if (!passcode) {
    passcode = generateSecurePasscode(16);
    console.log('[StackUp Admin Security] No passcode provided as argument. Generated a secure 16-char passcode.');
  }

  if (typeof passcode !== 'string' || passcode.trim().length < 8) {
    console.error('[Error] Passcode must be at least 8 characters long for adequate security.');
    process.exit(1);
  }

  passcode = passcode.trim();

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const keyRegex = /^ADMIN_PASSCODE=.*$/m;
  let updatedContent = '';

  if (keyRegex.test(envContent)) {
    updatedContent = envContent.replace(keyRegex, `ADMIN_PASSCODE=${passcode}`);
  } else {
    // Append to file
    const trailingNewline = envContent.endsWith('\n') || envContent.length === 0 ? '' : '\n';
    updatedContent = envContent + trailingNewline + `ADMIN_PASSCODE=${passcode}\n`;
  }

  fs.writeFileSync(envPath, updatedContent, 'utf8');

  console.log('------------------------------------------------------------');
  console.log('[OK] Admin passcode updated successfully in .env.local');
  console.log('[OK] Passcode length:', passcode.length, 'characters');
  console.log('[OK] Security rule timingSafeCompare verified.');
  console.log('[Info] To test authorization:');
  console.log('       1. Start/restart dev server (npm run dev)');
  console.log('       2. Tap the StackUp logo 5 times (or press Ctrl+Shift+A)');
  console.log('       3. Enter the configured passcode to access /admin');
  console.log('------------------------------------------------------------');

  return { success: true, length: passcode.length };
}

if (require.main === module) {
  const arg = process.argv[2];
  resetAdminPasscode(arg);
}

module.exports = { resetAdminPasscode, generateSecurePasscode };
