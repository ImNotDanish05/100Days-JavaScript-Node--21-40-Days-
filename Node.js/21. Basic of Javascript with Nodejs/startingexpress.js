const express = require("express");
const catMe = require('cat-me');
const startingexpress = express();



startingexpress.listen(1999, function(){
    console.log(catMe());
});