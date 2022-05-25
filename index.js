const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// nn.outputlayer =  [ { name: 'NN', outputlayer: [0,0,0,0,0]} ]
/* 
    Incase you are using mongodb atlas database uncomment below line
    and replace "mongoAtlasUri" with your mongodb atlas uri.
*/
// mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true})
// Read data.json file

function isArrayOfNumbers(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number') {
      return false;
    }
  }

  return true;
}

function getNumberArrays(obj) {
  var numArrays = [];
  if (Array.isArray(obj)) {
    if (isArrayOfNumbers(obj)) {
      numArrays.push(obj);
    }
  } else if ((typeof obj === "object") && (obj !== null)) {
    for (var key in obj) {
      if (Array.isArray(obj[key]) && isArrayOfNumbers(obj[key])) {
        numArrays.push(obj[key]);
      }
    }
  }

  return numArrays;
}

function sumlist(a,b){

  var intArr = [];
  for(i=0; i < a.length; i++){
     intArr.push(a[i]+b[i]);
  }
  return intArr;
}

app.get('/', (req, res) => {
  res.send('NN Server..')
})

app.get('/update', function(req, res) {
  var output = JSON.parse(req.query.output);

  const fs = require('fs');
  fs.readFile("data.json", function(err, data) {  
  if (err) throw err;
  var  jsonData = JSON.parse(data);
  var outputlayer =  jsonData.outputlayer;


    var array1 =outputlayer.split(",").map(Number)
    var array2 =output.split(",").map(Number)

    console.log("arr1 "+array1)
    console.log("arr2 "+array2)
    var summation = sumlist(array1,array2); 
    console.log(summation)
    res.send({
      'updated': summation
    });
  });
});


   

// let nn = {
//     outputlayer: ["PHP", "Go", "JavaScript"]
// };
   
   
// // STEP 3: Writing to a file
// fs.writeFile("data.json", JSON.stringify(nn), err => {
     
//     // Checking for errors
//     if (err) throw err; 
   
//     console.log("Done writing"); // Success
// });


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})