/* const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gofood:user123@cluster0.eqngokl.mongodb.net/gofoodmern?retryWrites=true&w=majority"

/// const mongoURI = "mongodb://gofood:user123@ac-tkiq4qq-shard-00-00.eqngokl.mongodb.net:27017,ac-tkiq4qq-shard-00-01.eqngokl.mongodb.net:27017,ac-tkiq4qq-shard-00-02.eqngokl.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-6mtva7-shard-0&authSource=admin&retryWrites=true&w=majority"
 const mongoDB = async () => {
    await mongoose.connect(mongoURI, { userNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log('database connected');

            const fatched_Data = await mongoose.connection.db.collection("food_items");
            fatched_Data.find({}).toArray(function (err, data) {
                if (err) console.log(err);
                else {
                    global.food_items = data;
                    console.log(global.food_items);
                }
            })
        }

    })

}

module.exports = mongoDB; */



const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gofood:user123@cluster0.eqngokl.mongodb.net/gofoodmern?retryWrites=true&w=majority";

/* const mongoURI = "mongodb://gofood:user123@ac-tkiq4qq-shard-00-00.eqngokl.mongodb.net:27017,ac-tkiq4qq-shard-00-01.eqngokl.mongodb.net:27017,ac-tkiq4qq-shard-00-02.eqngokl.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-6mtva7-shard-0&authSource=admin&retryWrites=true&w=majority"
 */
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('database connected');

        const fatched_Data = await mongoose.connection.db.collection("food_items");
        const data = await fatched_Data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
        global.foodCategory = catData;
        global.food_items = data;


    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}


module.exports = mongoDB; 
