const pgp = require("pg-promise")({
  capSQL: true,
});

const PeopleDal = (db) => {
  const createPeople = async ({
    name,
    role,
    location,
    status,
    social_media,
    tech_stack,
  }) => {
    try {
      // insert people
      const {
        id_people,
      } = await db.one(
        "INSERT INTO tb_people(name, role, location, status) VALUES ($1, $2, $3, $4) RETURNING id_people",
        [name, role, location, status]
      );

      // insert social media
      const columnSetSosialMedia = new pgp.helpers.ColumnSet(
        ["name_sosial_media", "url_sosial_media", "id_people"],
        { table: "tb_sosial_media" }
      );
      const namesSosialMedia = Object.keys(social_media);

      let valuesSosialMedia = [];
      namesSosialMedia.forEach((e) => {
        valuesSosialMedia.push({
          name_sosial_media: e,
          url_sosial_media: social_media[e],
          id_people: id_people,
        });
      });

      const queryInsertSosialMedia = pgp.helpers.insert(
        valuesSosialMedia,
        columnSetSosialMedia
      );
      await db.none(queryInsertSosialMedia);

      // insert tect_stack
      const columnSetTectStack = new pgp.helpers.ColumnSet(
        ["name_tect_stack", "id_people"],
        { table: "tb_tect_stack" }
      );

      let valuesTectStack = [];
      tech_stack.forEach((e) => {
        valuesTectStack.push({
          name_tect_stack: e,
          id_people: id_people,
        });
      });

      const queryInsertTectStack = pgp.helpers.insert(
        valuesTectStack,
        columnSetTectStack
      );
      await db.none(queryInsertTectStack);

      return {
        id_people,
        name,
        role,
        location,
        status,
        social_media,
        tech_stack,
        hired: false,
      };
    } catch (err) {
      console.log("Create People:" + err);
    }
  };

  const getAllPeople = () => {};
  const updatePeople = (id) => {};
  const deletePeople = (id) => {};

  return { createPeople, getAllPeople, updatePeople, deletePeople };
};

module.exports = PeopleDal;
