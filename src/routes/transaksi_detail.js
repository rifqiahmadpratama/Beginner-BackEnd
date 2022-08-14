const express = require("express");
const router = express.Router();
const transaksi_detailController = require("../controller/transaksi_detail");

router.get(
  "/search/",
  transaksi_detailController.searchKeywordstransaksi_detail
);
router.get("/", transaksi_detailController.getAlltransaksi_detail);
router.get("/:id", transaksi_detailController.gettransaksi_detail);
router.post("/", transaksi_detailController.insert);
router.put("/:id", transaksi_detailController.update);
router.delete("/:id", transaksi_detailController.delete);

module.exports = router;
