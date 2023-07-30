const {MongoClient} = require('mongodb');
const express = require('express');
const { raw } = require('body-parser');
exports.main=(req,res)=>{
    res.render("main")
}
exports.iv=(req,res)=>{
    res.render("iv")
}
exports.team=(req,res)=>{
    res.render("team")
}
exports.ivForm=async(req,res)=>{


  

    const client = new MongoClient(process.env.URI.toString());

    try {
        const database = client.db(process.env.DB.toString());
        const roll = req.body.roll;
        const Roll = parseInt(roll)
        const ans = req.body.ans;
        console.log(typeof(Roll),Roll)
        const col = database.collection(process.env.IV_COLLECTION.toString());
        const result = await col.findOne({
            Roll_no : Roll,
            Willing_to : "not_filled",
        });

        if (result) {
            await col.updateOne(
                {Roll_no : Roll},
                {
                    $set:{Willing_to : ans}
                }
                
            );
            return res.render('iv', {msg : 'Successfully filled your Form!'});
        }else{
            const reloadScript =  `
                  <script>
                    alert('Warning: You already filled your IV - Form!.');
                    window.location.href='/';
                    
                  </script>
                `;
                 return res.send(reloadScript);
        }
    } catch (error) {
        
    }
}


exports.formation = async(req,res)=>{
    try {
        

        const client = new MongoClient(process.env.URI.toString());
        const database = client.db(process.env.DB.toString())
        
        const col = database.collection(process.env.SUBMIT_TEAM_COLLECTION.toString());
        const result = await col.find(
            {team_members: []}
        )
        if (result) {
            for await (doc of result){
                console.log(doc.Names)
            }
        }

    } catch (error) {
        
    }
}

exports.placement = (req,res)=>{
    console.log(req.body.roll)
    console.log(req.body.mark1)
    const str = JSON.stringify(req.body);
    console.log(req.body)
}
exports.placement_page = (req,res)=>{
    res.render('placement')
}