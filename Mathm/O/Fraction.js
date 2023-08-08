const Operation=require("../Operation");
const lib=require("../lib");
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
    constructor(numerator,denominator){
        var numerator0=numerator;
        var denominator0=denominator;
        if(denominator0==undefined){
            var s=String(numerator0).split("");
            var d=s.indexOf(".");
            if(d==-1){
                denominator0=1;
            }else{
                denominator0=10**(s.length-1-d);
                numerator0*=10**(s.length-1-d);
            }
        }else if(denominator==0){
            throw("The denominator cannot be 0")
        }
        if(numerator0.type||denominator0.type){
            this.numerator=numerator0;
            this.denominator=denominator0;
            this.type="Fraction";
            this.value=Operation.divide(this.numerator,this.denominator,1);
        }else{
            var h=lib.gcd(numerator0,denominator0);
            this.numerator=Operation.divide(numerator0,h,1);
            this.denominator=Operation.divide(denominator0,h,1);
            this.type="Fraction";
            this.value=Operation.divide(this.numerator,this.denominator,1);
        }
    }
    add(n){
        if(n.type&&n.type=="Fraction"){
            var h=lib.lcm(this.denominator,n.denominator);
            return new Fraction(Operation.add(Operation.divide(Operation.mult(this.numerator,h),this.denominator,1),Operation.mult(n.numerator,Operation.divide(h,n.denominator,1))),h);
        }else{
            return new Fraction(Operation.add(this.numerator,Operation.mult(n,this.denominator)),this.denominator)
        }
    }
    reduce(n){
        if(n.type&&n.type=="Fraction"){
            var h=lib.lcm(this.denominator,n.denominator);
            return new Fraction(Operation.reduce(Operation.divide(Operation.mult(this.numerator,h),this.denominator,1),Operation.mult(n.numerator,Operation.divide(h,n.denominator,1))),h);
        }else{
            return new Fraction(Operation.reduce(this.numerator,Operation.mult(n,this.denominator)),this.denominator)
        }
    }
    bereduced(n){
        if(n.type&&n.type=="Fraction"){
            var h=lib.lcm(this.denominator,n.denominator);
            return new Fraction(Operation.reduce(Operation.mult(n.numerator,Operation.divide(h,n.denominator,1)),Operation.divide(Operation.mult(this.numerator,h),this.denominator,1)),h);
        }else{
            return new Fraction(Operation.reduce(Operation.mult(n,this.denominator),this.numerator),this.denominator)
        }
    }
    mult(n){
        if(n.type&&n.type=="Fraction"){
            return new Fraction(Operation.mult(this.numerator,n.numerator),Operation.mult(n.denominator,this.denominator));
        }else{
            return new Fraction(Operation.mult(this.numerator,n),this.denominator)
        }
    }
    divide(n){
        if(n.type&&n.type=="Fraction"){
            return new Fraction(Operation.mult(this.numerator,n.denominator),Operation.mult(n.numerator,this.denominator));
        }else{
            return new Fraction(this.numerator,Operation.mult(this.denominator,n))
        }
    }
    bedivided(n){
        if(n.type&&n.type=="Fraction"){
            return new Fraction(Operation.mult(n.numerator,this.denominator),Operation.mult(this.numerator,n.denominator));
        }else{
            return new Fraction(Operation.mult(this.denominator,n),this.numerator)
        }
    }
    trim(){
        var h=lib.gcd(this.numerator,this.denominator);
        return new Fraction(Operation.divide(this.numerator,h,1),Operation.divide(this.denominator,h,1));
    }
    toString(){
        return String(this.value);
    }
}
module.exports=Fraction;