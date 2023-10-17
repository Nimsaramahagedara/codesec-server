import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favorites:{
        type:Array,
        default: []
    }
},{timestamps:true})


//Encrypt the password before saving the document
userSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//Password compare method
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
export const UserModel = mongoose.model('users', userSchema);

