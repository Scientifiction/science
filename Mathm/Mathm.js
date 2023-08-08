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
const lib2=require("./lib2");
Mathm.reciprocal=lib2.reciprocal;
Mathm.continued=lib2.continued;
Mathm.sigma=lib2.sigma;
Mathm.pi=lib2.pi;
Mathm.Set=lib2.Set;
Mathm.Statistics=require("./Statistics");
Mathm.I=Mathm.Complex=require("./I");
Mathm.Matrix=require("./Matrix");
Mathm.Det=require("./Det");
Mathm.Fraction=require("./Fraction");
Mathm.O=require("./Operation");
Mathm.Vector2d=require("./Vector2d");
Mathm.Involution=require("./Involution")
module.exports=Mathm;