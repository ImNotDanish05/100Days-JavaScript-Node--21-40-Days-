console.log("WORK");

let NumberArray = [240,242,4214435,3,35,353,53,5];
let StringArray = ["Danish", "Is", "Very", `Handsome`];
let MixArray = [false,true,"LMAO", 240, undefined, null];
let NotArray = 2424

let Test;

//Telling if is Array or not
Test = Array.isArray(NumberArray);
console.log(Test);

Test = Array.isArray(NotArray);
console.log(Test);

Test = Array.isArray(NumberArray[0]);
console.log(Test);

//Replacing one of the var at array
NumberArray[0] = "YAAA IM A STRING YESS"
Test = NumberArray;
console.log(Test);

//For reverse from memory address 0 to 6 and 1 to 5 and so on
Test = NumberArray.reverse();
console.log(Test);

Test = NumberArray.reverse();
console.log(Test);

//its for which place var inside of array. for example 'YAA IM A STRING YESS' its a number 0'
Test = NumberArray.indexOf("YAAA IM A STRING YESS");
console.log(Test);
Test = NumberArray.indexOf(53);
console.log(Test);
Test = NumberArray.indexOf(442);
console.log(Test);

/*
push = to add var at array at last
unshift = to add var at array at first
pop = to delete var at array at last
shift = to delete var at array at first
*/
NumberArray.push(2324);
Test = NumberArray;
console.log(Test);

NumberArray.unshift(2324);
Test = NumberArray;
console.log(Test);

NumberArray.pop();
Test = NumberArray;
console.log(Test);

NumberArray.shift();
Test = NumberArray;
console.log(Test);


//To remove var from var1 until var2
NumberArray = [240,242,4214435,3,35,353,53,5];
NumberArray.splice(1,2);
Test = NumberArray;
console.log(Test);

//Combine array NumberArray with MixArray
Test = NumberArray.concat(MixArray);
console.log(Test);
