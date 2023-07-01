import User from "../models/User.js";

//req => is which is where you can get the params and the body
//res => it is going to be what we send back information to the frontEnd or whoever is calling the API
export const getUser = async(req, res) => {
  try{
    //we will try to find the user based on this id 
   const { id } = req.params; //this id comes from id we are passing in general routes
   // that is router.get("/user/:id", getUser);
   //so in the frontend we need to pass this id to grab the user
   const user = await User.findById(id);
   res.status(200).json(user);
  } catch(error) {
    //if error cannot find the user we will hit this catch block
    res.status(404).json({ message: error.message })
  }
}