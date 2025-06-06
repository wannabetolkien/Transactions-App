import mongoose, {Schema,model} from 'mongoose';

const accountSchema = new Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = model('Account',accountSchema,'Account');

export default Account;