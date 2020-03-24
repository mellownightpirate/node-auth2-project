const router = require("express").Router();

const authRouter = require("./auth-router");
const userRouter = require("./user-router");
const adminRouter = require("./admin-router");

router.use(authRouter);
router.use(userRouter);
router.use(adminRouter);

router.get("/", (req, res) => {
  res.json(`Working API`);
});

module.exports = router;