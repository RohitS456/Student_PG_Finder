const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
app.use(express.urlencoded({extended:true}));

const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
const MongooseURL="mongodb://127.0.0.1:27017/PG";

main().then(()=>{
  console.log("Connected to database!");
}).catch((err)=>{
  console.log(err);
});


async function main(){
    await mongoose.connect(MongooseURL);
}

const pgmodel=require("./Database/pg.js");
const Reg=require("./Database/dataSchema.js");
const tiffin=require("./Database/tiffin.js");



app.use(express.static(path.join(__dirname,"Design")));
 
 app.use(express.static(path.join(__dirname, "JavaScript")));

 
app.get("/",(req,res)=>{
    res.render("login.ejs");
});
app.get("/front",(req,res)=>{
    res.render("front.ejs");
})
app.get("/tiffin", async(req,res)=>{
    const result=await tiffin.find({});
    res.render("tiffin.ejs",{result});
})
app.post("/Register", async(req,res)=>{
    console.log(req.body);
    const{name,email,password,check}=req.body;
    const NewReg= new Reg({
        name:name,
        email:email,
        password:password,
        check:check,
    });
    await NewReg.save();
    res.redirect("/front");

});

    app.post("/Register/log", async (req,res)=>{
        const{email,password}=req.body;
        if(await Reg.findOne({email:email,password:password})){
            console.log("Right email & password");
            res.redirect("/front");
        } 
           else{
            res.redirect("/login?error=1");
           } 
           
    });

    

  

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

app.get("/ps", async(req,res)=>{
    res.render("ps.ejs");
});

app.get("/add",(req,res)=>{
    res.render("add.ejs");
})
//Adding pg information route
app.post("/ps/add", async (req, res) => {
    // Destructuring fields from the request body
    const { city, location, budget, occupancy, available, owner, img1, img2, img3 } = req.body;

    // Converting string to boolean for ac and wifi fields
    const ac = req.body.ac === 'true';
    const wifi = req.body.wifi === 'true';

    // Creating a new instance of pgmodel with the form data
    const NewData = new pgmodel({
        city: city,
        location: location,
        budget: budget,
        occupancy: occupancy,
        available: available,
        ac: ac,
        owner: owner,
        wifi: wifi,
        img1: img1,
        img2: img2,
        img3: img3,
    });

    // Saving the new data to the database
    await NewData.save();
    console.log("Data saved!");

    // Redirecting to the /front page after saving
    res.redirect("/front");
});
app.get("/add-data",(req,res)=>{
    res.render("addTiffin.ejs");
})

 app.post("/tiffin/add",async (req,res)=>{
        const{name,city,location,variety,meal,contact,img}=req.body;
        const delivery = req.body.delivery === 'true';
        const newData=new tiffin({
            name:name,
            city:city,
            location:location,
            variety:variety,
            meal:meal,
            delivery:delivery,
            contact:contact,
            img:img,
        });
         await newData.save();
         console.log("tiffin data is save!");
          
         res.redirect("/tiffin");
     });

     //All Boys pG List route
     app.get("/ps/boys", async (req,res)=>{
        const data= await pgmodel.find({available:{$eq:"Boys"}});
        res.render("boy_card.ejs",{data});
     });

     app.get("/ps/girls", async (req,res)=>{
        const data= await pgmodel.find({available:{$eq:"Girls"}});
        res.render("boy_card.ejs",{data});
     });

     app.get("/ps/family", async (req,res)=>{
        const data= await pgmodel.find({available:{$eq:"Family"}});
        res.render("boy_card.ejs",{data});
     });

app.post("/tiffin/search", async(req,res)=>{
    const {city,variety,meal}=req.body;
    const query = {
        city: { $regex: new RegExp(city, "i") },
        variety: { $regex: new RegExp(variety, "i") },
        meal: { $regex: new RegExp(meal, "i") },
    };
    console.log(query);

    try {
        const result = await tiffin.find(query);
        console.log(result);
        res.render("tiffin.ejs", { result });
    } catch (error) {
        console.error("Database Query Error:", error);
        res.status(500).send("Error querying the database.");
    }
});
//find the pg more details by id 
app.get("/pg/:id", async(req,res)=>{
    const {id}=req.params;
   const Idres= await pgmodel.findById(id);
   res.render("new.ejs",{Idres});
});

app.post("/ps/search", async (req, res) => {
    const { city, occupancy, available, budget } = req.body;

    // Build the query object
    const query = {
        city: { $regex: new RegExp(city, "i") }, // Case-insensitive search
        occupancy: { $regex: new RegExp(occupancy, "i") },
        available: { $regex: new RegExp(available, "i") },
        budget: { $gte: Number(budget) || 0 }, // Ensure budget is a number
    };

    try {
        // Fetch results from the database
        const finres = await pgmodel.find(query);

        // Check if results were found
        if (finres.length === 0) {
            // Render the EJS template with a message indicating no data found
            res.render("ps.ejs", { finres: [], message: "No data found", dataFound: false });
        } else {
            // Render the EJS template with the found results
            res.render("ps.ejs", { finres, message: null, dataFound: true });
        }
    } catch (error) {
        console.error("Database Query Error:", error);
        res.status(500).send("Error querying the database.");
    }
});




app.listen(3000,()=>{
    console.log("server is running on port 3000");
})