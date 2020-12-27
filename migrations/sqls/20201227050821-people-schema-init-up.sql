CREATE TABLE tb_people (
  id_people SERIAL PRIMARY KEY,
  name varchar,
  role varchar,
  hired boolean DEFAULT false,
  location varchar,
  status varchar
);
CREATE TABLE tb_sosial_media (
  id_sosial_media SERIAL PRIMARY KEY,
  name_sosial_media varchar,
  url_sosial_media varchar,
  id_people SERIAL
);
CREATE TABLE tb_tect_stack (
  id_tect_stack SERIAL PRIMARY KEY,
  name_tact_stack varchar,
  id_people SERIAL
);
ALTER TABLE tb_sosial_media
ADD CONSTRAINT FK_tb_people_TO_tb_sosial_media FOREIGN KEY (id_people) REFERENCES tb_people (id_people);
ALTER TABLE tb_tect_stack
ADD CONSTRAINT FK_tb_people_TO_tb_tect_stack FOREIGN KEY (id_people) REFERENCES tb_people (id_people);