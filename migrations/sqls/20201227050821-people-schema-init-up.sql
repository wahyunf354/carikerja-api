CREATE TABLE tb_people (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  hired BOOLEAN DEFAULT false,
  location VARCHAR,
  status VARCHAR(50),
  social_media JSON,
  tech_stack TEXT []
);
CREATE TABLE tb_employer (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  link VARCHAR(100),
  description VARCHAR(255)
)