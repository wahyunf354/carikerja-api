CREATE TABLE tb_people (
  id_people SERIAL PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(100),
  hired BOOLEAN DEFAULT false,
  location VARCHAR,
  status VARCHAR(50),
  sosial_media JSON,
  tect_stack TEXT []
);