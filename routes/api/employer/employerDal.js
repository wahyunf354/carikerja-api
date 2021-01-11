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

  return { createEmployer };
};

module.exports = EmployerDal;
