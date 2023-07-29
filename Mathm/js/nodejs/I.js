class I{
    constructor(a,b){
        if(b==0){
            throw("Imaginary Part can't be 0")
        }
        this.a=a;
        this.b=b;
        this.type="I";
    }
    conjugate(){
        return new I(this.a,-this.b);
    }
    toString(){
        if(this.b>0){
            return this.a+"+"+this.b+"i";
        }else{
            return this.a+""+this.b+"i";
        }
    }
    mult(n){
        if(n.type&&n.type=="I"){
            return this.mult(n.a).add(-n.b*this.b).add(new I(0,this.a*n.b))
        }else{
            return new I(this.a*n,this.b);
        }
    }
    add(n){
        if(n.type&&n.type=="I"){
            return new I(this.a+n.a,this.b+n.b);
        }else{
            return new I(this.a+n,this.b);
        }
    }
    reduce(n){
        if(n.type&&n.type=="I"){
            return new I(this.a-n.a,this.b-n.b);
        }else{
            return new I(this.a-n,this.b);
        }
        
    }
}
module.exports=I;