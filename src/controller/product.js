const productModel = require("../models/product");
const productController = {
  searchKeywordsProduct: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await productModel.searchKeywordsProduct(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllproduct: async (req, res) => {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
      const numberPerPage = Number(req.query.numberPerPage) || 5;
      const startPage = (currentPage - 1) * numberPerPage;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "DESC";
      console.log(sort);
      const result = await productModel.selectAll(
        numberPerPage,
        startPage,
        sort,
        sortby
      );
      const {
        rows: [count],
      } = await productModel.countproduct();
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
  getproduct: (req, res) => {
    const id = Number(req.params.id);
    productModel
      .select(id)
      .then((result) => res.json(result.rows))
      .catch((err) => res.send(err));
  },
  insert: (req, res) => {
    const { id, name, stock, price, category_id, transaksi_id } = req.body;
    productModel
      .insert(id, name, stock, price, category_id, transaksi_id)
      .then(res.json("product created"))
      .catch((err) => res.send(err));
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const name = req.body.name;
    const stock = req.body.stock;
    const price = req.body.price;
    const category_id = req.body.category_id;
    const transaksi_id = req.body.transaksi_id;
    productModel
      .update(id, name, stock, price, category_id, transaksi_id)
      .then(res.json("Product updated"))
      .catch((err) => res.send(err));
  },
  delete: (req, res) => {
    const id = Number(req.params.id);
    productModel
      .deleteproduct(id)
      .then(res.json("Product deleted"))
      .catch((err) => res.send(err));
  },
};

module.exports = productController;
