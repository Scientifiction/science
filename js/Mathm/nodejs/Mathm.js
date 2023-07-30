var Mathm={}
Mathm=Object.create(Math);
const lib=require("./lib");
Mathm.A=lib.A;
Mathm.C=lib.C;
Mathm.factor=lib.factor;
Mathm.gcd=lib.gcd;
Mathm.lcm=lib.lcm;
Mathm.range=lib.range;
Mathm.findprimes=lib.findprimes;
Mathm.round=lib.round;
Mathm.log=lib.log;
Mathm.root=lib.root;
Mathm.reciprocal=lib.reciprocal;
Mathm.continued=lib.continued;
Mathm.sigma=lib.sigma;
Mathm.pi=lib.pi;
Mathm.Set=lib.Set;
Mathm.Statistics=require("./Statistics");
Mathm.I=require("./I");
Mathm.Matrix=require("./Matrix");
Mathm.Det=require("./Det");
Mathm.Fraction=require("./Fraction");
Mathm.O=require("./Operation")
module.exports=Mathm;