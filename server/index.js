const express = require('express');
var app = express();

//allow json parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('hi')
})


app.listen(8080 ,() => {
    console.log(`Server is listening on 8080`);
});