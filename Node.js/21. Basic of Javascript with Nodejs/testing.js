const express = require("express");
const testing =  express();

testing.listen(2000, () => console.log("SERVER IS RUNNING!!"));