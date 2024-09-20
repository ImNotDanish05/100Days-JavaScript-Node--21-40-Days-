/*
Its different
*/

let Budi = 10;
let Wati = 20;

if (Budi == Wati){
    console.log("It's same")
}else{
    console.log("It's different")
}

/*
It's same
*/
Budi = 20;
Wati = 20;

if (Budi == Wati){
    console.log("It's same")
}else{
    console.log("It's different")
}

/*
It's different, include the type of the variable
*/
Budi = "20";
Wati = 20;

if (Budi == Wati){
    console.log("It's same")
}else{
    console.log("It's different")
}

if (Budi === Wati){
    console.log("It's same")
}else{
    console.log("It's different")
}

Budi = "20";
Wati = "20";

if (Budi == Wati){
    console.log("It's same")
}else{
    console.log("It's different")
}

/*
It's also work with the !
*/

Budi = "20";
Wati = 20;

if (Budi !== Wati){
    console.log("True")
}else{
    console.log("False")
}

if (Budi != Wati){
    console.log("True")
}else{
    console.log("False")
}

/*
If, else if, else
*/


Budi = "20";
Wati = "20";

if (Budi !== Wati){ //Different type of variable, it will print true
    console.log("True")
}else if(Budi != 30){
    console.log("True with different type of variable")
}else{
    console.log("False")
}

Budi = "20";
Wati = "20";
console.log(Budi == Wati ? "YES" : "NO")

Budi = "10";
Wati = "20";
console.log(Budi == Wati ? "YES" : "NO")