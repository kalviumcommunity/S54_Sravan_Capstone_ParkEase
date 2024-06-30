const express = require("express")
const router = express.Router()
const {createOrder , validatePayment  } = require("../controllers/PaymentController")

router.post("/order", createOrder)
router.post("/validate", validatePayment)

module.exports = router