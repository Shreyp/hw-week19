var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  money: Number,
  itemsOwned: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }],
  username: { 
    type: String, 
    unique: true 
  },
  password: { 
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);