const request=require('postman-request');


const geocode=(address,callback)=> {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiYWdyaW0xOTk5IiwiYSI6ImNrYnhrN3ZnbDBxa20ycmxnZjBvNDJ0OHIifQ.QhLIAbtq-ahPBfoUwY-N0g&limit=1';
    request({
         url,
      json: true
         },(err,{ body={} } )=> {
             if(err){
                 callback('Unable to connect to services!',undefined);
             }
             else if(body.features.length===0)
             {
                 callback('Unable to find location',undefined);
             }
             else{
                 callback(undefined,{
                     latitude: body.features[0].center[1],
                     longtitude: body.features[0].center[0],
                     location: body.features[0].place_name
                 })

             }

      })
}

module.exports=geocode;