const router = require("express").Router();
const productController = require("../controllers/product.controller.js");

router.post("/add", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.get("/getAll", productController.getAllProducts);
router.get("/get/:id", productController.getProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
