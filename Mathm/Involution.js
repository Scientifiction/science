const Fraction=require("./Fraction");
const Operation=require("./Operation")
class Involution{
    constructor(base_number,exponent){
        this.base_number=base_number;
        if(exponent.type){
            this.exponent=exponent;
        }else{
            this.exponent=new Fraction(exponent);
        }
        this.type="Involution";
    }
    value(){

    }
}