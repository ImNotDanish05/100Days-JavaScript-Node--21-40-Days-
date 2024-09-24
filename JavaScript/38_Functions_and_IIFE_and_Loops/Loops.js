// Ill make a simple looping

let bawal = 0;
const bakhir = 10;

for(; bawal < bakhir ; bawal++){
    if (bawal == 4){
        console.log("This continue will not continue the loop and go to the next loop")
        continue;
    }else if (bawal == 7){
        console.log("This break function will stop the loop and continue to the next program");
        break;
    }
    console.log(bawal);
}
console.log("the next program");

//Lets play array
let himpunan = ["Var 1", "Var 2", "Var 3", "Var 4"];
console.log(himpunan.length); // This will show how much variable on the array of himpunan
//foreach itu membuat array looping sebanyak variable yang ada di dalammnya
himpunan.forEach(function(himpunan, loop){ //
    console.log(himpunan);
    console.log(`loop ke ${loop}`);
})

himpunan.forEach(function(){
    console.log(himpunan);
})

//Now while and do while
//While will check first and then loop
//Do is executing first before checking. there is 0 on the console, that meaning the program is running first
var i = 0;
while (i < 0){
    console.log (i);
    i++;
}

do {
    console.log (i);
    i++;
}while (i < 0)


/*
First will show the each var
Second will show the loop counter
Third will show the whole array
After that undefined
*/
himpunan.forEach(function(himpunan, loop, x, a, b){ 
    console.log(himpunan);
    console.log(`loop ke ${loop}`);
    console.log(`${x} ${a} ${b}`)
})

/*
now the final
for(let x in person)
*/

let lmao = {
    username: "ImNotDanish05",
    password: "9JF94JF94JF",
    age: "20"
}

for(let x in lmao){
    console.log(lmao.username);
    console.log(lmao);
    console.log(`${x} adalah ${lmao[x]}`)
}