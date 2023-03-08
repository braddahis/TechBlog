const router = require ("express").Router()
const homeroutes = require ("./homeroutes")
const apiroutes = require ("./api")

router.use("/", homeroutes)
router.use("/api", apiroutes)


module.exports=router