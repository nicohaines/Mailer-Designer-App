const con = require("./db_connect")

async function createMailerTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS Mailer (
        mailerId INT AUTO_INCREMENT,
        mailerName VARCHAR(255) NOT NULL,
        mailerType VARCHAR(255),
        isTemplate BOOLEAN,
        userId INT NOT NULL REFERENCES User(userId),
        CONSTRAINT mailerPK PRIMARY KEY(mailerId)
    );`

    await con.query(sql)
}

createMailerTable()

async function getAllMailers() {
    let sql = `
      SELECT * FROM Mailer;
    `
    return await con.query(sql)
}

async function getAllMailers() {
    let sql = `
      SELECT * FROM Mailer;
    `
    return await con.query(sql)
}

module.exports = { getAllMailers }