const lib=require("./lib");
var Operation={};
Operation.list=["I","Fraction","Det","Matrix"];
Operation.add=function(a,b){
    if(a==undefined){
        return b;
    }else if(b==undefined){
        return a
    }else if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.add(a)
        }else{
            return a.add(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.add(a);
    }else{
        return a+b;
    }
}
Operation.reduce=function(a,b){
    if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.bereduced(a)
        }else{
            return a.reduce(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.bereduced(a);
    }else{
        return a-b;
    }
}
Operation.bereduced=function(a,b){
    if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.reduce(a)
        }else{
            return a.bereduced(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.reduce(a);
    }else{
        return b-a;
    }
}
Operation.mult=function(a,b){
    if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.mult(a)
        }else{
            return a.mult(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.mult(a);
    }else{
        return a*b;
    }
}
Operation.divide=function(a,b){
    if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.bedivided(a)
        }else{
            return a.divide(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.bedivided(a);
    }else if(arguments[2]){
        return a/b;
    }else{
        return new Fraction(a,b);
    }
}
Operation.bedivided=function(a,b){
    if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.divide(a)
        }else{
            return a.bedivided(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.divide(a);
    }else if(arguments[2]){
        return b/a;
    }else{
        return new Fraction(b,a);
    }
}
Operation.involute=function(a,b){
    if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.binvoluted(a)
        }else{
            return a.involute(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.beinvoluted(a);
    }else{
        return lib.pow(a,b);
    }
}
Operation.beinvoluted=function(a,b){
    if(Operation.list.indexOf(a.type)!=-1){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.involute(a)
        }else{
            return a.beinvoluted(b);
        }
    }else if(Operation.list.indexOf(b.type)!=-1){
        return b.involute(a);
    }else{
        return lib.pow(b,a);
    }
}
module.exports=Operation;
const Fraction=require("./O/Fraction");