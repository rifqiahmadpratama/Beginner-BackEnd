const categoryModel = require("../models/category");
const categoryController = {
  searchKeywordsCategory: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await categoryModel.searchKeywordsCategory(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
      const numberPerPage = Number(req.query.numberPerPage) || 5;
      const startPage = (currentPage - 1) * numberPerPage;
      const sortby = req.query.sortby || "name";
      const sort = req.query.sort || "DESC";
      console.log(sort);
      const result = await categoryModel.selectAll(
        numberPerPage,
        startPage,
        sort,
        sortby
      );
      const {
        rows: [count],
      } = await categoryModel.countCategory();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / numberPerPage);
      console.log(result);
      res.status(200).json({
        pagination: {
          currentPage: currentPage,
          numberPerPage: numberPerPage,
          totalData: totalData,
          totalPage: totalPage,
        },
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getCategory: (req, res) => {
    const id = Number(req.params.id);
    categoryModel
      .select(id)
      .then((result) => res.json(result.rows))
      .catch((err) => res.send(err));
  },
  insert: (req, res) => {
    const { id, name } = req.body;
    categoryModel
      .insert(id, name)
      .then(res.json("category created"))
      .catch((err) => res.send(err));
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const name = req.body.name;
    categoryModel
      .update(id, name)
      .then(res.json("Product updated"))
      .catch((err) => res.send(err));
  },
  delete: (req, res) => {
    const id = Number(req.params.id);
    categoryModel
      .deleteCategory(id)
      .then(res.json("Product deleted"))
      .catch((err) => res.send(err));
  },
};

module.exports = categoryController;
