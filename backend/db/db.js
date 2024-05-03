const mongoose = require("mongoose");


const dbConnexion = () => {
    mongoose
        .connect(
            "mongodb+srv://admin:VV5uQWyIc76aWAKI@cluster0.bsoshke.mongodb.net/HappyChild",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => console.log("Database connected"))
        .catch((err) => console.log(err));
};

module.exports = dbConnexion;

// VV5uQWyIc76aWAKI