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
      throw new Error("Crete data employer: ", err);
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

  const getEmployerById = async () => {};

  return { createEmployer, getAllEmployer };
};

module.exports = EmployerDal;
