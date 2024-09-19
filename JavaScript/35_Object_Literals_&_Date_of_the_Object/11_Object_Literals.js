let Danish = {
    Name : "Danish05",
    age : "19",
    Single : "No",
    Function : function(){
        return Danish.age;
    },
    NiceArray : ["LMAO", 843, true, undefined, null]

}

console.log(Danish.age);
console.log(Danish.Function());
console.log(Danish.NiceArray[0]);
console.log(Danish.NiceArray[2]);
console.log(typeof Danish.NiceArray[0]);
console.log(typeof Danish.NiceArray[2]);

