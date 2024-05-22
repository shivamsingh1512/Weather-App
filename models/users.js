const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cloud');

const User=mongoose.model("User",
    {username :String ,
     password :String,
    }
);

function createuser(usename,password) {
    const user = new User({
        username:username,
        password:password,
    });
    user.save();
}