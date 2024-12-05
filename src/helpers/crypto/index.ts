import { HASH, VECTOR } from 'const';
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from 'crypto';

const algorithm = 'aes-256-cbc'; 
const Securitykey = Buffer.from(VECTOR); 
const initVector = Buffer.from(HASH); 

export function generateUUID(): string {
    return randomUUID();
}
export function encodeBase64(input: string): string {
    return Buffer.from(input, 'utf8').toString('base64');
}
export function decodeBase64(input: string): string {
    return Buffer.from(input, 'base64').toString('utf8');
}
export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}
export function generateRandomString(length: number): string {
    return randomBytes(length).toString('hex');
}
export const hashPassword = (password: string) => {
    const salt = generateRandomString(16);
    const hash = sha256(password+salt);
    return { hashedPassword: hash, salt };
};
export const encrypt = (data: string | null | undefined): string | null | undefined => {
    if (!data) return data;
    try {
      const cipher = createCipheriv(algorithm, Securitykey, initVector);
      let encryptedData = cipher.update(data, 'utf-8', 'hex');
      encryptedData += cipher.final('hex');
      return encryptedData;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Encryption failed:', err);
      return null;
    }
  };
  
  export const decrypt = <T extends string | null | undefined>(data: T): string | null | undefined => {
    if (!data) return data;
    try {
      const decipher = createDecipheriv(algorithm, Securitykey, initVector);
      let decryptedData = decipher.update(data, 'hex', 'utf-8');
      decryptedData += decipher.final('utf-8');
      return decryptedData;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Decryption failed:', err);
      return null; 
    }
  };

export const verifyPassword = ({
    password,
    salt,
    hashedPassword,
  }: {
    password: string;
    salt: string;
    hashedPassword: string;
  }) => {
    const hash = sha256(password+salt);
    const hashedInputPassword = hash;
    return hashedInputPassword === hashedPassword;
  };