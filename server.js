
const express=require('express');
const res =require('express/lib/response');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/hosteldb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
mongoose.connect(url,{useNewUrlParser:true})
const Schema = mongoose.Schema
const hostelschema=new Schema({
hostelno :'number',   
name:'string',
rooms:'number',
warden_name:'string',
Mess_capacity:'number',

})
const hostel = mongoose.model('hostel',hostelschema)
const app =express();
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, function() {
    console.log('listening on 3000')
})
app.get('/hostel',async(req,res)=>
{  
console.log('hostellist')
//res.send('dhivya')
const hostellist=await hostel.find()
res.json(hostellist);
});

app.post('/hostel',(req,res)=>{
    console.log(req.body)
    res.json(req.body);
    const hostelobj=new hostel(req.body)
    hostelobj.save();
    })
    app.put('/hostel',async(req,res)=>{
        console.log(req.body)
        let h=req.body.hostelno
        let v=await hostel.findOne({'hostelno':h})
        console.log(v);
        v.name=req.body.name
        v.roomno=req.body.roomno

        v.warden_name=req.body.warden_name
        v.mess_capacity=req.body.mess_capcity
        v.save();
        res.json(req.body)
       
    })
    app.delete('/hostel',async(req,res)=>{
        console.log(req.body)
        const h=req.body.hostelno
        const v=await hostel.findOneAndDelete({'hostelno':h})
        console.log(v);
        v.hoselno=req.body.hostelno
        v.save();
        res.json(req.body)
    })


    

