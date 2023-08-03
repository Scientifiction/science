const Physics=require("../Physics");
console.log(new Physics.ForceXY(1,2).add(new Physics.ForceXY(-10,32)).add(new Physics.ForceXY(18,-24)))