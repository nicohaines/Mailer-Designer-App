import con from("./db_connect.js")

async function createUserTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS User (
        userId INT AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        CONSTRAINT userPK PRIMARY KEY (userId)
);`

    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
      SELECT * FROM User;
    `
    return await con.query(sql)
}

export { getAllUsers }