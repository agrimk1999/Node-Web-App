console.log("I am here");




const form=document.querySelector("form");
const search=document.querySelector("input");
const messageOne=document.querySelector("#messageOne");
const messageTwo=document.querySelector("#messageTwo");

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    messageOne.textContent='Loading...';
    fetch('http://localhost:3000/weather/?address=' + search.value).then((res)=>{
        res.json().then((data)=>{
           if(data.err)
           {
              return messageOne.textContent=data.err;
           }
    
          messageOne.textContent="It is " + data.temperature + " degrees in " + data.location + ". The weather is " + data.description;
        })
    });
})