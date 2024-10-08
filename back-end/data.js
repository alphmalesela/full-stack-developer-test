const fs = require('fs');
const { encryptData, decryptData } = require('./encrypt');
let writeStream = fs.createWriteStream('duplicateUsers.csv')

const tokenFilePath = "loginToken.json"

const saveToken = (token) => {
    fs.writeFileSync(tokenFilePath, JSON.stringify({ token }));
};

const getToken = () => {
    if (fs.existsSync(tokenFilePath)) {
        const tokenData = fs.readFileSync(tokenFilePath, 'utf-8');
        return JSON.parse(tokenData);
    }
    return null;
};

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

const saveUniqueUsers = (users) => {
    fs.writeFileSync("uniqueUsers.json", JSON.stringify(users), 'utf8');
}

const readUniqueUsers = () => {
    return JSON.parse(fs.readFileSync("uniqueUsers.json", 'utf8'));
}

const writeDuplicate = (user) => {
    let newLine = []
    newLine.push(user.name)
    newLine.push(user.surname)
    newLine.push(user.duplicates)

    writeStream.write(newLine.join(',') + '\n', () => { })
}

const completeDuplicates = () => {
    writeStream.end()
}

module.exports = {
    saveToken,
    getToken,
    saveUsers,
    getUsers,
    saveUniqueUsers,
    readUniqueUsers,
    writeDuplicate,
    completeDuplicates
}