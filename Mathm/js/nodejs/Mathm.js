var Mathm={}
Mathm=Object.create(Math);
const lib=require("./lib");
Object.assign(Mathm,lib);
Mathm.Statistics=require("./Statistics");
Mathm.I=require("./I");
Mathm.Matrix=require("./Matrix");
Mathm.Det=require("./Det");
Mathm.Fraction=require("./Fraction");
module.exports=Mathm;