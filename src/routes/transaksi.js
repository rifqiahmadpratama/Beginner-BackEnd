const express = require("express");
const router = express.Router();
const transaksiController = require("../controller/transaksi");

router.get("/search/", transaksiController.searchKeywordstransaksi);
router.get("/", transaksiController.getAlltransaksi);
router.get("/:id", transaksiController.gettransaksi);
router.post("/", transaksiController.insert);
router.put("/:id", transaksiController.update);
router.delete("/:id", transaksiController.delete);

module.exports = router;
