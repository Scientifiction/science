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
    constructor(numerator,denominator){
        if(denominator==0){
            throw("The denominator cannot be 0")
        }
        this.numerator=numerator;
        this.denominator=denominator;
        this.type="Fraction";
        this.value=Operation.divide(this.numerator,this.denominator,1);
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
    trim(){
        var h=lib.gcd(this.numerator,this.denominator);
        return new Fraction(Operation.divide(this.numerator,h,1),Operation.divide(this.denominator,h,1));
    }
    toString(){
        return String(this.value);
    }
}
module.exports=Fraction;