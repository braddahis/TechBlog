const router = require("express").Router()
const {User} = require("../../models")

//remove this route after testing
router.get("/all", async (req,res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.error("failed at route")
    }
})

router.post("/login", async (req,res) => {
    try {
      const userData = await User.findOne({
        where: {email: req.body.email}
      })
      if(!userData){
        res.status(400).json({msg: "no user found"})
        return;
      }
      const validPassword = userData.checkPassword(req.body.password)
      if(!validPassword){
        res.status(400).json({msg: "no user found"})
        return; 
      }
      req.session.save(()=> {
        req.session.user_id = userData.id
        req.session.logged_in = true
        res.status (200).json(userData)
      })
    } catch (error) {
      res.status(400).json(error);
    }
})

//works in insonia not front end 

router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports=router