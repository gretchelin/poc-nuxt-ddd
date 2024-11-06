export default defineNuxtPlugin(() => {
  const secretKey = useRuntimeConfig().public.encryptKey;
  const encryptIv = useRuntimeConfig().public.encryptIv || '0000000000000000';

  /**
   * Prepare secret key or encryption
   * @param secretKeyString
   */
  const generateCryptoKey = (secretKeyString) => {
    const encoder = new TextEncoder();
    const keyArrayBuffer = encoder.encode(secretKeyString);

    return window.crypto.subtle.importKey(
      'raw',
      keyArrayBuffer,
      { name: 'AES-CBC', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );
  };

  const generateIvKey = (iv) => {
    const encoder = new TextEncoder();
    return encoder.encode(iv);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const decrypt = () => {

  };

  const encrypt = async (message: string, urlSafe?: boolean, publicKey?: string) => {
    try {
      console.log({ encryptIv, publicKey, secretKey });
      const iv = generateIvKey(encryptIv);
      const cryptoKey = await generateCryptoKey(publicKey || secretKey);

      const encoder = new TextEncoder();
      const paramsValue = encoder.encode(message);

      const encryptValueBuffer = await window.crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv: iv,
        },
        cryptoKey,
        paramsValue,
      );

      const encrypted = arrayBufferToBase64(encryptValueBuffer);

      return urlSafe ? encrypted.replace(/\//g, 'replacedStr') : encrypted;
    }
    catch (error) {
      console.log('Encrypt error', { error });
      return message;
    }
  };

  // Expose to useNuxtApp().$encrypt and useNuxtApp().$decrypt
  return {
    provide: {
      encrypt,
      decrypt,
    },
  };
});
