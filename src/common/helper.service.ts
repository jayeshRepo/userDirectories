import { Injectable } from '@nestjs/common';
import { createCipher, createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class HelperService {
   async getEncryptedValue(textToEncrypt: string): Promise<string> {
      let binary =Buffer.alloc(16,  process.env.CIPHER_BYT_KEY, 'base64');
      const key = (await promisify(scrypt)(process.env.CIPHER_KEY, process.env.CIPHER_SLT, 32)) as Buffer;
      const cipher = createCipheriv(process.env.CIPHER_ALG, key,binary);

      return Buffer.concat([cipher.update(textToEncrypt), cipher.final()]).toString();
   }
}
