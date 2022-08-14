const Pool = require("../config/db");
//const { post } = require("../routes/product");

const searchKeywordsProduct = (keywords) => {
  return Pool.query("SELECT * FROM product WHERE id || ' ' || name ILIKE $1", [
    `%${keywords}%`,
  ]);
};
const selectAll = (numberPerPage, startPage, sort, sortby) => {
  return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort}
LIMIT ${numberPerPage} OFFSET ${startPage}`);
};
const select = (id) => {
  return Pool.query(`select * from product where id=${id}`);
};
const insert = (id, name, stock, price, category_id, transaksi_id) => {
  return Pool.query(
    `INSERT INTO product(id,name,stock,price,category_id,transaksi_id) VALUES('${id}','${name}','${stock}','${price}','${category_id}','${transaksi_id}')`
  );
};
const update = (id, name) => {
  return Pool.query(`UPDATE product SET name='${name}' WHERE id=${id}`);
};

const updatestock = (id, stock) => {
  return Pool.query(`UPDATE product SET stock='${stock}' WHERE id=${id}`);
};
const updateprice = (id, price) => {
  return Pool.query(`UPDATE product SET price='${price}' WHERE id=${id}`);
};
const deleteproduct = (id) => {
  return Pool.query(`DELETE FROM product WHERE id=${id};`);
};

const countproduct = () => {
  return Pool.query(`SELECT COUNT(*) FROM product`);
};

module.exports = {
  searchKeywordsProduct,
  selectAll,
  select,
  insert,
  update,
  updatestock,
  updateprice,
  deleteproduct,
  countproduct,
};
