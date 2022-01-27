const User = require('../models/userSchema')

// Join user to chat
async function userJoin(id, username, room) {

  try {
      const findUser = await User.findOne({id: id});
      if (findUser !== null) {
        console.log("en server")      
        return { message: "user already exists!" };
      } else {
        const newUser = await User.create({ id: id, username: username, room: room});
        console.log(newUser)
        return newUser;
      }
  } catch (e) {
      console.log(e)
  }

};

// Get current user
async function getCurrentUser(id) {
  try{
    const user = await User.find({ id: id })
    if(user){
      return user;
    }
    return null
  } catch(e){
    console.log(e);
  }
} 

// Get room users
async function getRoomUsers(room) {
  try {
    const users = await User.find({ room: room })
    return users
  } catch (e) {
    console.log(e)
  }
};

// User leaves chat
async function userLeave(id) {
  try{
    const user = await User.findOneAndDelete(id)
    return user
  } catch(e){
    console.log(e)
  }
}



// add message to database
async function addMessage(user, msg) {

  try{
    const userUpdated = await User.findByIdAndUpdate(user, { $push: {message: msg} });
    //return userUpdated;
  } catch(e){
    console.log(e)
  }

}

module.exports = {
  addMessage,
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
