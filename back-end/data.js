const fs = require('fs');
const { encryptData, decryptData } = require('./encrypt');

const saveUsers = (users) => {
    const encrypteData = encryptData(users);
    fs.writeFileSync("users.json", JSON.stringify(encrypteData), 'utf8');
}

const getUsers = () => {
    const encryptedContent = JSON.parse(fs.readFileSync("users.json", 'utf8'));
    const { salt, iv, data } = encryptedContent;
    const decrypteData = decryptData(salt, iv, data)
    return JSON.parse(decrypteData);
}

module.exports = {
    saveUsers,
    getUsers
}