const {MongoClient} = require('mongodb');
const express = require('express');
const { raw } = require('body-parser');

const router = express.Router();


exports.validate=async(req,res)=>{
   

    const client = new MongoClient(process.env.URI.toString());

    try {
        const user = req.body.username.trim()
        const database = client.db(process.env.DB.toString())
        
        const col = database.collection(process.env.TEAM.toString());
        
        // const options = {
        //     projection: { login: "AADHITHYA.V" },
        //   };
        const findResult = await col.findOne({login : user}) 
        if(findResult == null){
            res.render('team', {msg : 'Incorrect username'});
        }else if(req.body.password.trim() != 1234567890){
            
             res.render('team', {msg : 'Incorrect password'});
        }else{
            //res.render('list')
            try {
                const students = []
                const col_1 =database.collection(process.env.STUDENTS_LIST_COLLECTION.toString());
                col_1.find()
                    .forEach(list => students.push(list))
                    .then(()=>{
                        
                        res.render('list', {students,user});
                    })
                    
                
            } catch (error) {
                
            }
            
        }
        //console.log(findResult)
    } catch (error) {
        
    }
}

exports.submit=async(req,res)=>{
    var request = req.body;
    // console.log(Object.keys(req.body[0]).length)
    
   // var obj = JSON.parse(JSON.stringify(req.body)); 
    // var list = Object.keys(obj.list).length
    console.log(req.body)
    var array = req.body.list;
    if(Array.isArray(array)){
        if(array.length > 5){
            const reloadScript = `
            <script>
              alert('Select only 5 to submit');
              window.history.back();
              
            </script>
          `;
           return res.send(reloadScript);
        }else if(array.length < 5){
            const reloadScript = `
                  <script>
                    alert('Select atleast 5 to submit');
                    window.history.back();
                    
                  </script>
                `;
                 return res.send(reloadScript);
        }else{
            try {
                const name = req.body.user
                const list = req.body.list
               
                const client = new MongoClient(process.env.URI.toString());
                const database = client.db(process.env.DB.toString())
        
                const col = database.collection(process.env.SUBMIT_TEAM_COLLECTION.toString());
                const finalResult = await col.findOne({
                    Names : name,
                    team_members : [],

                })
                if(finalResult){
                    await col.updateOne(
                        {Names : name},
                        {
                            $set: {team_members :list}
                        }
                    );

                    for(let x in list){
                        const col_1 = database.collection(process.env.STUDENTS_LIST_COLLECTION.toString())

                        await col_1.updateOne(
                           {Names : list[x]},
                            {
                                $set: {Team_Leader : 1}
                            }
                        );

                    };
                    const reloadScript =  `
                  <script>
                    alert('Success: Your Team Selection Process is completed Now!.');
                    window.location.href='/';
                    
                  </script>
                `;
                 return res.send(reloadScript);
                    
                }else{
                    const reloadScript =  `
                  <script>
                    alert('Error: You have already Selected you Teammates');
                    window.history.back();
                    
                  </script>
                `;
                 return res.send(reloadScript);
                }
            } catch (error) {
                
            }
        }
    }else{
      return res.status(400).json({ message: 'Invalid request' });
        
    }

    
    // if (list <= 5) {
    //     console.log('Working')
    // }
}
