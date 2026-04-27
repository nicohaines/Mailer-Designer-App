CREATE TABLE IF NOT EXISTS User (
    userId INT AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS Template (
    templateId INT AUTO_INCREMENT,
    templateName VARCHAR(255) NOT NULL,
    header VARCHAR(100000),
    footer VARCHAR(100000),
    userId INT NOT NULL REFERENCES User(userId),
    CONSTRAINT userFK FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE IF NOT EXISTS TemplatePreference (
  templateId INT,
  preference VARCHAR(255),
  CONSTRAINT preferencePK PRIMARY KEY(templateId, preference),
  CONSTRAINT templateFK FOREIGN KEY(templateId) REFERENCES Template(templateId)
);

CREATE TABLE IF NOT EXISTS Mailer (
    mailerId INT AUTO_INCREMENT,
    mailerName VARCHAR(255) NOT NULL,
    mailerType VARCHAR(255),
    userId INT NOT NULL REFERENCES User(userId),
    templateId INT NOT NULL REFERENCES Template(templateId),
    CONSTRAINT userFK FOREIGN KEY (userId) REFERENCES User(userId),
    CONSTRAINT templateFK FOREIGN KEY (templateId) REFERENCES Template(templateId)
);

CREATE TABLE IF NOT EXISTS MailerSection (
  mailerId INT,
  section VARCHAR(100000),
  CONSTRAINT sectionPK PRIMARY KEY(mailerId, section),
  CONSTRAINT mailerFK FOREIGN KEY(mailerId) REFERENCES Mailer(mailerId)
);