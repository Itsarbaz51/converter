import connectDB from "./db/db.index";

connectDB
    .then(() => {
        app.on('error', (err) => {
            console.log("MongoDB connection error", err.message);
        })
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })


    }).catch((err) => {
        console.log("MongoDB connection error", err.message);
    })
