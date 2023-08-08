const Operation=require("../Operation");
class Vector2d{
    constructor(a,b){
        this.a=a;
        this.b=b;
        this.type="Vector2d";
    }
    add(n){
        if(n.type=="Vector2d"){
            return new Vector2d(this.a+n.a,this.b+n.b);
        }else{
            throw("Vectors can only be added to vectors")
        }
    }
    reduce(n){
        if(n.type=="Vector2d"){
            return new Vector2d(this.a-n.a,this.b-n.b);
        }else{
            throw("Vectors can only be reduced to vectors")
        }
    }
    mult(n){
        if(n.type=="Vector2d"){
            return new Vector2d(Operation.mult(this.a,n.a),Operation.mult(this.b,n.b));
        }else{
            return new Vector2d(Operation.mult(this.a,n),Operation.mult(this.b,n));
        }
    }
    divide(n){
        if(n.type=="Vector2d"){
            return new Vector2d(Operation.divide(this.a,n.a),Operation.divide(this.b,n.b));
        }else{
            return new Vector2d(Operation.divide(this.a,n),Operation.divide(this.b,n));
        }
    }
}
module.exports=Vector2d;