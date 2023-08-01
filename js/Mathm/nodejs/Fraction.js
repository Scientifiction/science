const Operation=require("./Operation");
const lib=require("./lib");
/*
Operation.divide=function(a,b){
    if(a.type=="I"||a.type=="Matrix"){
        if(b.type&&Operation.list.indexOf(b.type)>Operation.list.indexOf(a.type)){
            return b.divide(a)
        }else{
            return a.divide(b);
        }
    }else if(b.type=="I"||b.type=="Matrix"){
        return b.divide(a);
    }else if(arguments[2]){
        return a/b;
    }else{
        return new Fraction(a,b);
    }
}*/
class Fraction{
    constructor(a,b){
        if(b==0){
            throw("The dividend cannot be 0")
        }
        this.a=a;
        this.b=b;
        this.type="Fraction";
        this.value=Operation.divide(this.a,this.b,1);
    }
    add(n){
        if(n.type&&n.type=="Fraction"){
            var h=lib.lcm(this.b,n.b);
            return new Fraction(Operation.add(Operation.divide(Operation.mult(this.a,h),this.b,1),Operation.mult(n.a,Operation.divide(h,n.b,1))),h);
        }else{
            return new Fraction(Operation.add(this.a,Operation.mult(n,this.b)),this.b)
        }
    }
    reduce(n){
        if(n.type&&n.type=="Fraction"){
            var h=lib.lcm(this.b,n.b);
            return new Fraction(Operation.reduce(Operation.divide(Operation.mult(this.a,h),this.b,1),Operation.mult(n.a,Operation.divide(h,n.b,1))),h);
        }else{
            return new Fraction(Operation.reduce(this.a,Operation.mult(n,this.b)),this.b)
        }
    }
    mult(n){
        if(n.type&&n.type=="Fraction"){
            return new Fraction(Operation.mult(this.a,n.a),Operation.mult(n.b,this.b));
        }else{
            return new Fraction(Operation.mult(this.a,n),this.b)
        }
    }
    divide(n){
        if(n.type&&n.type=="Fraction"){
            return new Fraction(Operation.mult(this.a,n.b),Operation.mult(n.a,this.b));
        }else{
            return new Fraction(this.a,Operation.mult(this.b,n))
        }
    }
    trim(){
        var h=lib.gcd(this.a,this.b);
        return new Fraction(Operation.divide(this.a,h,1),Operation.divide(this.b,h,1));
    }
    toString(){
        return String(this.value);
    }
}
module.exports=Fraction;