class ForceXY{
    constructor(a,b){
        this.a=a;
        this.b=b;
        this.type="ForceXY";
    }
    add(n){
        if(n.type="ForceXY"){
            return new ForceXY(this.a+n.a,this.b+n.b);
        }else{
            throw("ForceXY can only be added to forceXY")
        }
    }
    reduce(n){
        if(n.type=="ForceXY"){
            return new ForceXY(this.a-n.a,this.b-n.b);
        }else{
            throw("Vectors can only be reduced to vectors")
        }
    }
    mult(n){
        if(n.type=="ForceXY"){
            return new ForceXY(this.a*n.a,this.b*n.b);
        }else{
            return new ForceXY(this.a*n,this.b*n);
        }
    }
    divide(n){
        if(n.type=="ForceXY"){
            return new ForceXY(this.a*n.a,this.b*n.b);
        }else{
            return new ForceXY(this.a*n,this.b*n);
        }
    }
}
module.exports=ForceXY;