import con from("./db_connect.js")

async function createMailerTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS Mailer (
        mailerId INT AUTO_INCREMENT,
        mailerName VARCHAR(255) NOT NULL,
        mailerType VARCHAR(255),
        userId INT NOT NULL REFERENCES User(userId),
        templateId INT NOT NULL REFERENCES Template(templateId),
        CONSTRAINT userFK FOREIGN KEY (userId) REFERENCES User(userId),
        CONSTRAINT templateFK FOREIGN KEY (templateId) REFERENCES Template(templateId)
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

export { getAllMailers }