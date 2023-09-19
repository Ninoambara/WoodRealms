const bcrypt = require('bcrypt')

const hashPass = (password) => {
    return bcrypt.hashSync(password, 10)
}

const comparePass = (plainPass, hasedPass) => {
    return bcrypt.compareSync(plainPass, hasedPass)
}

module.exports = {
    hashPass,comparePass
}