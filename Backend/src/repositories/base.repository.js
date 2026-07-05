class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data, options = {}) {
    const docs = await this.model.create([data], options);
    return docs[0];
  }

  async findById(id, selectFields = "", options = {}) {
    return this.model.findById(id, null, options).select(selectFields);
  }

  async findOne(filter = {}, selectFields = "", options = {}) {
    return this.model.findOne(filter, null, options).select(selectFields);
  }

  async findAll(filter = {}, queryOptions = {}) {
    const {
      select = "",
      sort = { createdAt: -1 },
      page = 1,
      limit = 10,
      populate = "",
      session = null,
    } = queryOptions;

    const skip = (Number(page) - 1) * Number(limit);

    let query = this.model
      .find(filter)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    if (populate) query = query.populate(populate);
    if (session) query = query.session(session);

    return query;
  }

  async updateById(id, data, options = {}) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      ...options,
    });
  }

  async deleteById(id, options = {}) {
    return this.model.findByIdAndDelete(id, options);
  }

  async count(filter = {}, options = {}) {
    let query = this.model.countDocuments(filter);

    if (options.session) {
      query = query.session(options.session);
    }

    return query;
  }

  async save(document, options = {}) {
    return document.save(options);
  }
}

module.exports = BaseRepository;