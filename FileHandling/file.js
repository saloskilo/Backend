const fs = require('fs'); // file handling
const os =require('os'); // operating system details 

// file create using Sync // Blocking Req
fs.writeFileSync("./fsfilesyn.txt","Hello Node js");


// file create using async // Non-Blocking Req
fs.writeFile("fsfilesasyn.txt","this is async file",(error)=>{console.log(error);
})

// read file data Sync // blocking Req
const result=fs.readFileSync("./fsfilesyn.txt","utf-8");
console.log(result);


// read file data async // Non-Blocking Req // we can assume it just like promise it wait for resolve or completion
fs.readFile("fsfilesasynode file.jsn.txt","utf-8",(error,result)=>{
    if (error) {
        console.log("Error: "+error);
        
    }else{
        console.log("Result: "+result);
        
    }
});



// to apend or add something to the file 
fs.appendFileSync("./fsfilesyn.txt",new Date().getTime().toLocaleString());




// defalut threads size = 4 
console.log(os.cpus().length);

console.log(os.hostname());
