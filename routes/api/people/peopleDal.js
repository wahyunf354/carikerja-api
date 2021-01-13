const PeopleDal = (db) => {
  const createPeople = async (data) => {
    try {
      const { id } = await db.one(
        "INSERT INTO tb_people( name, role,location, status, social_media,tech_stack) VALUES (${name},${role},${location},${status},${social_media},${tech_stack}) RETURNING id",
        data
      );
      return {
        status: 200,
        data: {
          id,
          hired: false,
          ...data,
        },
      };
    } catch (err) {
      return {
        status: 500,
        message: err.massage,
      };
    }
  };

  const getAllPeople = async () => {
    try {
      const data = await db.any("SELECT * FROM tb_people");
      return { status: 200, data };
    } catch (err) {
      return {
        status: 500,
        message: err.massage,
      };
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
        "UPDATE tb_people SET name=${name}, role=${role}, location=${location}, hired=${hired}, status=${status}, social_media=${social_media}, tech_stack=${tech_stack} WHERE id=${id}",
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
