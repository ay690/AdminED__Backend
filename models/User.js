//This is going to be the schema that we create for the user that will represent  the model of data
import mongoose from 'mongoose';

//So this is the schema we pass into mongoose 
//and MONGO database will be using this model to make sure that
//everytime you put in the data into the database for a particular user
//it has to follow this format given below


const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        min: 2,
        max: 100,
      },

      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },

      password: {
        type: String,
        required: true,
        min: 5,
      },

      city: String,
      state: String,
      occupation: String,
      country: String,
      phoneNumber: String,
      transactions: Array,
      role: {
        type: String,
        enum: ["user", "admin", "superadmin"],  //this means any one of the 3
        default: "admin",
      }
    },
    {
        timestamps: true
    },
);

const User = mongoose.model("User", UserSchema);
export default User;