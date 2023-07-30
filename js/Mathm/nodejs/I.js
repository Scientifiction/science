class I{
    constructor(a,b){
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
        }else if(n==0){
            return 0;
        }else{
            return new I(this.a*n,this.b*n);
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
    divide(n){
        if(n.b!=0&&n.type&&n.type=="I"){
            return this.mult(n.conjugate()).divide(n.mult(n.conjugate()));
        }else{
            return new I(this.a/n,this.b/n);
        }
        
    }
}
module.exports=I;