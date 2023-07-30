const Operation=require("./Operation");
const lib=require("./lib");

class Fraction{
    constructor(a,b){
        if(b==0){
            throw("The dividend cannot be 0")
        }
        this.a=a;
        this.b=b;
        this.type="Fraction";
        this.value=this.a/this.b;
    }
    add(n){
        if(n.type&&n.type=="Fraction"){
            var h=lib.lcm(this.b,n.b);
            return new Fraction(Operation.add(Operation.divide(Operation.mult(this.a,h),this.b),Operation.mult(n.a,Operation.divide(h,n.b))),h);
        }else{
            return new Fraction(Operation.add(this.a,Operation.mult(n,this.b)),this.b)
        }
    }
    reduce(n){
        if(n.type&&n.type=="Fraction"){
            var h=lib.lcm(this.b,n.b);
            return new Fraction(Operation.reduce(Operation.divide(Operation.mult(this.a,h),this.b),Operation.mult(n.a,Operation.divide(h,n.b))),h);
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
        return new Fraction(Operation.divide(this.a,h),Operation.divide(this.b,h));
    }
    toString(){
        return String(this.value());
    }
}
module.exports=Fraction;