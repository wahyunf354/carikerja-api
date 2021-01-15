const EmployerDal = (db) => {
  const createEmployer = async (data) => {
    try {
      const { id } = await db.one(
        "INSERT INTO tb_employer(name, category, link, description) VALUES (${name}, ${category}, ${link}, ${description}) RETURNING id",
        data
      );
      return {
        id,
        ...data,
      };
    } catch (err) {
      throw new Error("Crete data employer: ", err.message);
    }
  };

  const getAllEmployer = async () => {
    try {
      const data = await db.any("SELECT * FROM tb_employer");
      return data;
    } catch (err) {
      throw new Error("Get All Employer : ", err);
    }
  };

  const getEmployerById = async (id) => {
    try {
      const data = await db.any("SELECT * FROM tb_employer WHERE id=$1", [id]);
      return data[0];
    } catch (err) {
      throw new Error("Get employer by Id: ", err);
    }
  };

  const updateEmployer = async (id, data) => {
    try {
      await db.none(
        "UPDATE tb_employer SET name=${name}, category=${category}, link=${link}, description=${description} WHERE id=${id}",
        { ...data, id }
      );

      return {
        id,
        ...data,
      };
    } catch (err) {
      throw new Error("Update employer: ", err);
    }
  };

  const deleteEmployerById = async (id) => {
    try {
      await db.none("DELETE FROM tb_employer WHERE id=$1", [id]);

      return { message: `Successful delete data employer with id: ${id}` };
    } catch (err) {
      throw new Error("Delete employer : ", err);
    }
  };

  return {
    createEmployer,
    getAllEmployer,
    getEmployerById,
    updateEmployer,
    deleteEmployerById,
  };
};

module.exports = EmployerDal;
