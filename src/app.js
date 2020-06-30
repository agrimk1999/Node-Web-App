const path=require('path');//core module
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();

const publicPath=path.join(__dirname,"../public");
const partialsPath=path.join(__dirname,'../views/partials');

app.use(express.static(publicPath));

app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

app.get('',(req,res)=> {
    res.render('index',{
        title:'Weather',
        name:'Agrim Khurana'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'This is about page',
        name:'Agrim Khurana'

    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title: 'This is a help page',
    msg:'This is the help me page' ,
    name:'Agrim Khurana'   
    })
})
app.get('/weather',(req,res)=> {

    if(!req.query.address)
    {
        return res.send({
            err: 'Address required'
        })
    }
    geocode(req.query.address , (err,{ location }={})=> {
                  if(err){
                      return res.send({
                          err
                      })
                  }
                  forecast(location,(err,{ temperature ,location ,description}={})=> {
                      if(err){
                          return res.send({
                             err
                          })
                      }
                    res.send({
                       description:description,
                       temperature: temperature,
                       location:location

                    })
                  })


    })
})

const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})