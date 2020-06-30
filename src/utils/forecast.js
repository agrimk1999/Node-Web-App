const request=require('postman-request');

//used destructuring
const forecast=(location,callback)=> {
    const url='http://api.weatherstack.com/current?access_key=43322fceba0420d71ea50d6407715ee6&query=' + encodeURI(location);

    request({
        url,
        json: true
    },(err,{ body }={})=>{
        if(err)
        {
            callback('Unable to connect to services!',undefined);
        }
        else if(body.error)
        {
            callback('Wrong Location',undefined);
        }
        else{
            callback(undefined,{
                location:location,
                description :  body.current.weather_descriptions[0],
                temperature: body.current.temperature
            });
        }
    })
}

module.exports=forecast;

