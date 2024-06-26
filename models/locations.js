import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/cloud');

const Location=mongoose.model("Location",
    {userid :String ,
     city :String,
    }
);

export async function createLocation(userid,city) {
    const location = new Location({
        userid:userid,
        city:city,
    });
    location.save();
}

export async function getLocations(userid){
    const f = await Location.find({ userid: userid }).lean();
    return f;
}