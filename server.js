const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productmodel")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.get('/' ,(req,res) =>{
    res.send("Hello Node API");
})

app.get("/blog" ,(req,res)=>{
    res.send("Hello Blog")
})

app.get('/product' ,async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
  const products = await Product.findById(id);
     res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.post('/product',async (req,res)=>{
    try{
        const product = await  Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(500).json({message: error.message});
    }
})

app.put('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){  // no product in database
            return res.status(404).json({message:  `cannot find with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://200305105291:o9rBjzCS0H1YnQgG@cluster0.wbrgvcw.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{

    console.log(`connected to MongoDB`);
    app.listen(7000 , ()=>{
        console.log(`Node API app is running on port 3000`);
    })
}).catch((error) => {
console.log(error);
})