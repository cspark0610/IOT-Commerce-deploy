const router = require("express").Router();
//const {User} = require("../models")

const {
  getAll,
  getOne,
  getById,
  byCategory,
  addOne,
  deleteOne,
  getProductsByKeyword,
  editOne,
  getAllProductsByPages
} = require("../controllers/products");
const { addReview, getReviewsByProduct } = require("../controllers/reviews");

/*RUTAS NECESARIAS
GET ALL PRODUCTS
ONE PRODUCT
ADD PRODUCT
CHANGE PRODUCT
DELETE PRODUCT
*/
//aca ya estoy parado sobre /products !


router.get("/search", getProductsByKeyword);
router.get("/prueba", getAllProductsByPages)
router.put("/:id", editOne);
router.get("/admin/:name", getOne);
router.get("/byCategory/:id", byCategory);
router.get("/:id/reviews", getReviewsByProduct);
router.get("/:id", getById)
router.post("/:id/reviews", addReview);
router.get("/", getAll);

//ADMIN
router.post("/", addOne);
router.delete("/:id", deleteOne);

module.exports = router;
