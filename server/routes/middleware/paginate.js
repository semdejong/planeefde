function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const amountOfResults = await model
      .countDocuments(req.body.query || {})
      .exec();

    results.amount = amountOfResults;

    if (endIndex < amountOfResults) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    console.log(req.body.query);
    try {
      if (req.body.query) {
        results.results = await model
          .find(req.body.query)
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.results = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .exec();
      }
      res.paginatedResults = results;
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  };
}

module.exports = { paginatedResults };
