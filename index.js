const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var total="0,0,0,0,0"
const fs = require('fs');
let  jsonData=""

function sumlist(a,b){

  var intArr = [];
  for(i=0; i < a.length; i++){
     intArr.push(a[i]+b[i]);
  }
  return intArr;
}


fs.readFile("data.json", function(err, data) {  
  if (err) throw err;
    jsonData = JSON.parse(data);
});


app.get('/', (req, res) => {
  res.send('NN Server..')
})

app.get('/reset', (req, res) => {
  res.send('Reset NN Server..')

  fs.writeFile("data.json", {"updated":"0,0,0,0,0"}, err => { 
    if (err) throw err; 
});
  res.send({"updated":"0,0,0,0,0"});

})

app.get('/update', function(req, res) {
    var output = JSON.parse(req.query.output);
    var outputlayer =  jsonData.updated;
  
    var array1  =  Array.from(outputlayer.split(','),Number);
    var array2 =   Array.from(output.split(','),Number);

    total = sumlist(array1,array2); 

    let stringWithoutBrackets = JSON.stringify(total).replace(/[{()}[\]]/g, '');
    jsonData.updated=stringWithoutBrackets
  
    fs.writeFile("data.json", jsonData, err => { 
      if (err) throw err; 
  });
    res.send(jsonData);
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
