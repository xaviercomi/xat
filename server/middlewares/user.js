const User = require('../models/userSchema')

// Join user to chat
async function userJoin(id, username, room) {

  try{
    const userExist = await User.findOneAndUpdate({username: username, room : room}, 
                                                  { id: id, username: username, room: room },
                                                  { new: true, upsert : true });
                                                 
    return userExist;
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
