import con from("./db_connect.js")

async function createTemplateTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS Template (
        templateId INT AUTO_INCREMENT,
        templateName VARCHAR(255) NOT NULL,
        header VARCHAR(100000),
        footer VARCHAR(100000),
        userId INT NOT NULL REFERENCES User(userId),
        CONSTRAINT userFK FOREIGN KEY (userId) REFERENCES User(userId)
    );`

    await con.query(sql)
}

createTemplateTable()

async function getAllTemplates() {
    let sql = `
      SELECT * FROM Template;
    `
    return await con.query(sql)
}

export { getAllTemplates }