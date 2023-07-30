//const Fraction=require("./Fraction");
var Operation={};
Operation.list=["I","Fraction","Det","Matrix"];
Operation.add=function(a,b){
    if(a.type=="I"||a.type=="Matrix"){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.add(a)
        }else{
            return a.add(b);
        }
    }else if(b.type=="I"||b.type=="Matrix"){
        return b.add(a);
    }else{
        return a+b;
    }
}
Operation.reduce=function(a,b){
    if(a.type=="I"||a.type=="Matrix"){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.reduce(a)
        }else{
            return a.reduce(b);
        }
    }else if(b.type=="I"||b.type=="Matrix"){
        return b.reduce(a);
    }else{
        return a-b;
    }
}
Operation.mult=function(a,b){
    if(a.type=="I"||a.type=="Matrix"){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.mult(a)
        }else{
            return a.mult(b);
        }
    }else if(b.type=="I"||b.type=="Matrix"){
        return b.mult(a);
    }else{
        return a*b;
    }
}
Operation.divide=function(a,b){
    if(a.type=="I"||a.type=="Matrix"){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.divide(a)
        }else{
            return a.divide(b);
        }
    }else if(b.type=="I"||b.type=="Matrix"){
        return b.divide(a);
    }else{
        //return new Fraction(a,b);
        return a/b;
    }
}
module.exports=Operation;