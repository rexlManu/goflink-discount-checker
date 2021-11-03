"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypt = void 0;
const crypto_1 = require("crypto");
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = (0, crypto_1.randomBytes)(16);
const encrypt = (text) => {
    const cipher = (0, crypto_1.createCipheriv)(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex'),
    };
};
const decrypt = (hash) => {
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, 'hex')),
        decipher.final(),
    ]);
    return decrpyted.toString();
};
const crypt = {
    encrypt,
    decrypt,
};
exports.crypt = crypt;
