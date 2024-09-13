let Var1 = "Danish";
let Var2 = "Handsome";

console.warn("");

let Result = Var1 + Var2;
console.log(Result);


//Appealing
Result = Var1
Result += " "
Result += Var2
console.log(Result);

Result = Var1.concat(" ", Var2, " HEHEHE")
console.log(Result);

Result = Result.length
console.log(Result);

//Escaping
Result = "They say \"DONT RUN\" LIKE THAT "
console.log(Result);

//Auto Capslock
Result = Result.toUpperCase();
console.log(Result);
Result = Result.toLowerCase();
console.log(Result);

//index
Result = "I aM DANISH05"
Result = Result.indexOf("a")
console.log(Result);

//Character at
Result = "KodySimpson love his family"
let Test = Result.charAt(4)
console.log(Test)

//String Cut
Test = Result.substring(2, 22)
console.log(Test)
Test = Result.slice(2, 22)
console.log(Test)

//Split to array
Test = "Danish, Aulia, Human, Being, Stupidy"
Arrays = Test.split(",")
console.log(Arrays)
console.log(Arrays[1])
Arrays = Test.split("a")
console.log(Arrays)
console.log(Arrays[1])

//Replace
Test = "YALL NOOB"
Result = Test.replace("NOOB", "GOOD")
console.log(Result)

//include (boolean)
Result = Test.includes("NOOB")
console.log(Result)
Result = Test.includes("BAD")
console.log(Result)