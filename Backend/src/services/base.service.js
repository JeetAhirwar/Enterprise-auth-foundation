const ApiError = require("../utils/ApiError");
const HTTP_STATUS = require("../constants/httpStatus");

class BaseService {
  constructor(repository, resourceName = "Resource") {
    this.repository = repository;
    this.resourceName = resourceName;
  }

  async create(data, options = {}) {
    return this.repository.create(data, options);
  }

  async getById(id, selectFields = "", options = {}) {
    const document = await this.repository.findById(id, selectFields, options);

    if (!document) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        `${this.resourceName} not found`
      );
    }

    return document;
  }

  async getAll(filter = {}, queryOptions = {}) {
    const [items, total] = await Promise.all([
      this.repository.findAll(filter, queryOptions),
      this.repository.count(filter, { session: queryOptions.session }),
    ]);

    return {
      items,
      pagination: {
        total,
        page: Number(queryOptions.page) || 1,
        limit: Number(queryOptions.limit) || 10,
        totalPages: Math.ceil(total / (Number(queryOptions.limit) || 10)),
      },
    };
  }

  async updateById(id, data, options = {}) {
    const document = await this.repository.updateById(id, data, options);

    if (!document) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        `${this.resourceName} not found`
      );
    }

    return document;
  }

  async deleteById(id, options = {}) {
    const document = await this.repository.deleteById(id, options);

    if (!document) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        `${this.resourceName} not found`
      );
    }

    return document;
  }
}

module.exports = BaseService;