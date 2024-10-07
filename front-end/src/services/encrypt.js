const crypto = require('crypto');
export async function generateKey() {
  return crypto.subtle.generateKey(
      {
          name: "AES-GCM",
          length: 256, // Key length
      },
      true,
      ["encrypt", "decrypt"] // Usages
  );
}

export async function encryptData(data, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM
  const encodedData = new TextEncoder().encode(JSON.stringify(data)); // Convert data to bytes

  const encrypted = await crypto.subtle.encrypt(
      {
          name: "AES-GCM",
          iv: iv,
      },
      key,
      encodedData
  );

  // Return encrypted data and IV (both will be stored)
  return { encryptedData: new Uint8Array(encrypted), iv };
}

export async function decryptData(encryptedData, key, iv) {
  const decrypted = await crypto.subtle.decrypt(
      {
          name: "AES-GCM",
          iv: iv,
      },
      key,
      encryptedData
  );

  const decodedData = new TextDecoder().decode(decrypted);
  return JSON.parse(decodedData); // Convert back to original format
}
