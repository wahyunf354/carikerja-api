const PeopleDal = (db) => {
  const createPeople = async ({
    name,
    role,
    location,
    status,
    sosial_media,
    tech_stack,
  }) => {
    try {
      // FIXME: id_people is not defined
      const {
        id_people,
      } = await db.one(
        "INSERT INTO tb_people(name, role, location, status) VALUES ($1, $2, $3, $4) RETURNING id_people",
        [name, role, location, status]
      );

      const namesSosialMedia = Object.keys(sosial_media);

      namesSosialMedia.forEach(async (e) => {
        await db.one(
          "INSERT INTO tb_sosial_media (name_sosial_media, url_sosial_media, id_people) VALUES ($1, $2, $3);",
          [e, sosial_media[e], id_people]
        );
      });

      tech_stack.forEach(async (e) => {
        await db.one(
          "INSERT INTO tb_tect_stack (name_tect_stack, id_people) VALUES ($1, $2);",
          [e, id_people]
        );
      });
    } catch (err) {
      console.log("createPeople ERROR:", err);
    }
    return {
      id_people,
      name,
      role,
      location,
      status,
      sosial_media,
      tect_stack,
    };
  };

  const getAllPeople = () => {};
  const updatePeople = (id) => {};
  const deletePeople = (id) => {};

  return { createPeople, getAllPeople, updatePeople, deletePeople };
};

module.exports = PeopleDal;
