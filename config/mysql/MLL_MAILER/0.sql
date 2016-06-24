CREATE TABLE mailee (
  id             INT NOT NULL AUTO_INCREMENT,
  user           TEXT,
  notes          TEXT,
  jsonAreas      TEXT,
  jsonCategories TEXT,
  findEvents     TINYINT(1)   DEFAULT 0,
  listEvents     TINYINT(1)   DEFAULT 0,
  ambassador     TINYINT(1)   DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE meta_versions (
  id      INT      NOT NULL AUTO_INCREMENT,
  version INT      NOT NULL,
  date    DATETIME NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO meta_versions
SET version = 0, date = now();