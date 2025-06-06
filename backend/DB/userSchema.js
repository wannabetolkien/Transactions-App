import { Schema,model } from "mongoose";

const userSchema =new Schema({
    username:{type:String,required:true,unique:true,trim:true,lowercase:true,minLength:3,maxLength:30},
    password:{type:String, required:true,trim:true,maxLength:200},
    firstName:{type:String,required:true,trim:true,maxLength:50},
    lastName:{type:String,required:true,trim:true,maxLength:50}
});

const User = model('User',userSchema,'User');
export default User;