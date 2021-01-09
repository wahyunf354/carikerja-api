CREATE TABLE tb_people (
  id_people SERIAL PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(100),
  hired BOOLEAN DEFAULT false,
  location VARCHAR,
  status VARCHAR(50),
  sosial_media JSON
);
CREATE TABLE tb_people_tb_tect_stack (
  id SERIAL PRIMARY KEY NOT NULL,
  id_people SERIAL,
  id_tect_stack SERIAL
);
CREATE TABLE tb_tect_stack (
  id_tect_stack SERIAL PRIMARY KEY,
  name_tect_stack VARCHAR(20),
);
ALTER TABLE tb_people_tb_tect_stack
ADD CONSTRAINT FK_tb_people_TO_tb_people_tb_tect_stack FOREIGN KEY (id_people) REFERENCES tb_people (id_people);
ALTER TABLE tb_people_tb_tect_stack
ADD CONSTRAINT FK_tb_tect_stack_TO_tb_people_tb_tect_stack FOREIGN KEY (id_tect_stack) REFERENCES tb_tect_stack (id_tect_stack);