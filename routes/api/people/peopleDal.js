const PeopleDal = (db) => {
  const createPeople = async (data) => {
    try {
      const { id } = await db.one(
        "INSERT INTO tb_people( name, role,location, status, sosial_media,tect_stack) VALUES (${name},${role},${location},${status},${sosial_media},${tect_stack}) RETURNING id",
        data
      );
      return {
        id,
        hired: false,
        ...data,
      };
    } catch (err) {
      throw new Error("Create People:" + err);
    }
  };

  const getAllPeople = async () => {
    try {
      const data = await db.any("SELECT * FROM tb_people");
      return data;
    } catch (err) {
      throw new Error("Get All People:" + err);
    }
  };

  const getPeopleById = async (id) => {
    try {
      const data = await db.any("SELECT * FROM tb_people WHERE id=$1", [id]);

      return data;
    } catch (err) {
      throw new Error("Get People By Id:" + err);
    }
  };

  const updatePeople = async (id, data) => {
    try {
      await db.none(
        "UPDATE tb_people SET name=${name}, role=${role}, location=${location}, hired=${hired}, status=${status}, sosial_media=${sosial_media}, tect_stack=${tect_stack} WHERE id=${id}",
        { ...data, id }
      );

      return {
        id,
        ...data,
      };
    } catch (err) {
      throw new Error("Update People:" + err);
    }
  };

  const deletePeople = async (id) => {
    try {
      await db.none("DELETE FROM tb_people WHERE id=$1", [id]);
      return {
        message: "Successful delete schema",
      };
    } catch (err) {
      throw new Error("Delete People:" + err);
    }
  };

  return {
    createPeople,
    getPeopleById,
    getAllPeople,
    updatePeople,
    deletePeople,
  };
};

module.exports = PeopleDal;
