const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const salt = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const deriveKey = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 60000, 32, 'sha256');
}

const encryptData = (data) => {
    const key = deriveKey("password", salt)
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    const jsonData = JSON.stringify(data)
    const encrypteData = Buffer.from(
        cipher.update(jsonData, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64')

    return {
        salt: salt.toString('base64'),
        iv: iv.toString('base64'),
        data: encrypteData
    }
}

const decryptData = (salt, iv, encryptedData) => {
    const key = deriveKey("password", Buffer.from(salt, 'base64'))
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'base64'))
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
}
module.exports = {
    encryptData,
    decryptData,
}