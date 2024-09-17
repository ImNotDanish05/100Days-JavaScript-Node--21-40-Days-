let Tanggal = new Date();

console.log(Tanggal);

Tanggal = new Date("September 5, 2005");
console.log(Tanggal);

Tanggal = new Date("September 5 2005");
console.log(Tanggal);


Tanggal = new Date("5/20/2005");
console.log(Tanggal);

for (var i = 0 ; i < 10 ; i++ ){
    console.warn(null);
}

/*
To get an time thingy
*/

let DateGet;
Tanggal = new Date();

DateGet = Tanggal.getMonth();
console.log(DateGet);
console.log(Tanggal);

DateGet = Tanggal.getDate();
console.log(DateGet);
console.log(Tanggal);

DateGet = Tanggal.getDay();
console.log(DateGet);
console.log(Tanggal);

DateGet = Tanggal.getFullYear();
console.log(DateGet);
console.log(Tanggal);

DateGet = Tanggal.getTime();
console.log(DateGet);
console.log(Tanggal);

/*
To set manually
*/
Tanggal.setMonth(9);
console.log(Tanggal);

Tanggal.setDate(5);
console.log(Tanggal);

Tanggal.setFullYear(2005);
console.log(Tanggal);

Tanggal.setTime(0); // <= Millsec
console.log(Tanggal);

/*
Indonesia Translate:
Tanggal = Date
*/