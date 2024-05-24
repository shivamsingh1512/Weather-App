import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/cloud');

const User=mongoose.model("User",
    {username :String ,
     password :String,
    }
);

export async function createuser(username,password) {
    const user = new User({
        username:username,
        password:password,
    });
    user.save();
}

export async function checkUser(username,password) {
    // let user = new User({
    //     username:username,
    //     password:password,
    // });
    // var user = mongoose.model("User");
    // user.findOne({username:username,password:password},function(err,data){
    //     console.log(data);
    //     // return data;
    // });
    let user = await User.findOne({ username: username, password: password }).lean();
    console.log(user);
    if (user === null){
        return false;
    }else{
        return true;
    }
}