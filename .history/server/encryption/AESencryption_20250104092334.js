import crypto from 'crypto';

// Generate a 256-bit key and initialization vector (IV)
const key = crypto.randomBytes(32); // 32 bytes = 256 bits
const iv = crypto.randomBytes(16); // 16 bytes for AES IV

/**
 * Encrypts a given text using AES-256-CBC.
 * @param {string} plainText - The text to encrypt.
 * @returns {string} The encrypted text in base64 format.
 */
function encryptionText(plainText) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(plainText, "utf-8", "base64");
  encrypted += cipher.final("base64");
  return `${iv.toString("base64")}:${encrypted}`; // Include IV with encrypted data
}

/**
 * Decrypts an encrypted text using AES-256-CBC.
 * @param {string} encryptedText - The text to decrypt (base64 format).
 * @returns {string} The decrypted plain text.
 */
function decryptionText(encryptedText) {
  const [ivBase64, encryptedData] = encryptedText.split(":");
  const ivBuffer = Buffer.from(ivBase64, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuffer);
  let decrypted = decipher.update(encryptedData, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}


module.exports = {
    
}