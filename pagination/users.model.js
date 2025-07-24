const {Schema,model} = require("mongoose")

const userSchema = new Schema({
  name:{
    type:String
  },
  id:{
    type:Number
  }
})

const UserModel = model("user",userSchema)

module.exports = UserModel