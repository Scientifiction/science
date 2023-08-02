const Operation=require("./Operation");
class Vector{
    constructor(a,b){
        this.a=a;
        this.b=b;
        this.type="Vector";
    }
    add(n){
        if(n.type=="Vector"){
            return new Vector(this.a+n.a,this.b+n.b);
        }else{
            throw("Vectors can only be added to vectors")
        }
    }
    reduce(n){
        if(n.type=="Vector"){
            return new Vector(this.a-n.a,this.b-n.b);
        }else{
            throw("Vectors can only be reduced to vectors")
        }
    }
    mult(n){
        if(n.type=="Vector"){
            return new Vector(Operation.mult(this.a,n.a),Operation.mult(this.b,n.b));
        }else{
            return new Vector(Operation.mult(this.a,n),Operation.mult(this.b,n));
        }
    }
    divide(n){
        if(n.type=="Vector"){
            return new Vector(Operation.divide(this.a,n.a),Operation.divide(this.b,n.b));
        }else{
            return new Vector(Operation.divide(this.a,n),Operation.divide(this.b,n));
        }
    }
}
module.exports=Vector;