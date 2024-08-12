const express = require('express'); 
const app = express(); 

const PORT = 8000; 

app.length('/api/users',(req,res)=>{
    return res.send('Hello World');
})
app.listen(PORT,()=>console.log(`server listening on the port ${PORT}`));