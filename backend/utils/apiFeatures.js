class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // req.query
    const queryStringObj = { ...this.queryString };
    // exluding fields in querystring
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryStringObj[el]);

    // prefixing with '$' for query string with greater, lesser or greater and lesser than equal queries
    let queryString = JSON.stringify(queryStringObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // ?sort=date,likes
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      // '-'prefix is descending
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); //with the minus excluding
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    //trick to convert String to number
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    // if we are requesting page no 3, our result are gonna start page No 21

    return this;
  }
}

module.exports = APIFeatures;
