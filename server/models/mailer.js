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

async function getAllUserMailers(user) {
    let sql = `
      SELECT * FROM Mailer
        WHERE userId=?;
    `
    return await con.query(sql, [user.userId])
}

async function createMailer(mailer) {
    let sql = `
        INSERT INTO Mailer(mailerName, mailerType, isTemplate, userId)
        VALUES(?, ?, ?, ?)
    `

    await con.query(sql, [mailer.title, mailer.category, mailer.isTemplate, mailer.userId])
}

async function getMailerById(mailerId) {
    let sql = `
        SELECT * FROM Mailer
        WHERE mailerId=?
    `
    let mailer = await con.query(sql, [mailerId])
    return mailer
}

async function deleteMailer(mailerId) {
    let sql = `
        DELETE FROM Mailer
        WHERE mailerId=?
    `
    await con.query(sql, [mailerId])
}

async function updateMailer(mailer) {
    let sql = `
        UPDATE Mailer
        SET mailerName=?, mailerType=?, isTemplate=?
        WHERE mailerId=?
    `
    await con.query(sql, [mailer.title, mailer.category, mailer.isTemplate, mailer.mailerId])
}

module.exports = { getAllUserMailers, createMailer, getMailerById, deleteMailer, updateMailer }