const User = require("../models/user.model");
const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email, selectFields = "") {
    return this.findOne({ email }, selectFields);
  }

  async findActiveByEmail(email, selectFields = "") {
    return this.findOne(
      {
        email,
        isDeleted: false,
      },
      selectFields
    );
  }
}

module.exports = new UserRepository();