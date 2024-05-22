const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cloud');

const Location=mongoose.model("Location",
    {userid :String ,
     city :String,
    }
);
