const resolvers = {
  users: async (_, context) => {
    const { db } = await context();
    return db
      .collection("users")
      .find()
      .toArray();
  },
  user: async ({ id }, context) => {
    const { db } = await context();
    return db.collection("users").findOne({ id });
  },
  //Mutation resolvers
  editUser: async ({ id, name, email }, context) => {
    const { db } = await context();

    return db
      .collection("users")
      .findOneAndUpdate(
        { id },
        { $set: { name, email } },
        { returnOriginal: false }
      )
      .then(resp => resp.value);
  } 
};

module.exports = resolvers;