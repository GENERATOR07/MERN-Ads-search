import express from "express";
import {MongoClient} from "mongodb"
const app=express();


//DB connection
const main=async (name)=>{
    const uri="mongodb+srv://shubham:X9X0bMXJypf8OuXI@cluster0.xgbwtdf.mongodb.net/companyAds?retryWrites=true&w=majority"
    const client=new MongoClient(uri)
    try{
        await client.connect()
       // console.log("successfully connected")
        return await findAds(client,name)
        
       
    }catch(e){
        console.log(e)
    }finally{
        client.close()
        //console.log("dissconcted sucessfully")
    }
}
 

//app connection
app.listen(8000,()=>{
    console.log("listening...")
})
//GET request
app.get("/:name",(req,res)=>{
    // res.send(`Response ${req.params.name}`)
    //const name=req.params.name[0].toUpperCase()+req.params.name.slice(1)
    res.header('Access-Control-Allow-Origin', '*');
    const name=req.params.name
    
    const mongoFind=async(name)=>{
        
        res.json({"data":await main(name)})
    }
    mongoFind(name);

})

//mongo query 
const findAds=async (client,name)=>{
    const result1=await client.db("companyAds").collection("companies").find({name:{$regex:`${name}`}})
    const company=await result1.toArray()
   // console.log(company)
    const id=company.map(c=>c.id)
    const result2=await client.db("companyAds").collection("ads").find({companyId:{$in:id}})
    const ads=await result2.toArray()
    //console.log(ads)
    return ads
}