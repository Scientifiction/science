class I{
    constructor(real,imaginary){
        this.real=real;
        this.imaginary=imaginary;
        this.type="I";
    }
    conjugate(){
        return new I(this.real,-this.imaginary);
    }
    toString(){
        if(this.imaginary>0){
            return this.real+"+"+this.imaginary+"i";
        }else{
            return this.real+""+this.imaginary+"i";
        }
    }
    mult(n){
        if(n.type&&n.type=="I"){
            return this.mult(n.real).add(-n.imaginary*this.imaginary).add(new I(0,this.real*n.imaginary))
        }else if(n==0){
            return 0;
        }else{
            return new I(this.real*n,this.imaginary*n);
        }
    }
    add(n){
        if(n.type&&n.type=="I"){
            return new I(this.real+n.real,this.imaginary+n.imaginary);
        }else{
            return new I(this.real+n,this.imaginary);
        }
    }
    reduce(n){
        if(n.type&&n.type=="I"){
            return new I(this.real-n.real,this.imaginary-n.imaginary);
        }else{
            return new I(this.real-n,this.imaginary);
        }
        
    }
    divide(n){
        if(n.imaginary!=0&&n.type&&n.type=="I"){
            return this.mult(n.conjugate()).divide(n.mult(n.conjugate()));
        }else{
            return new I(this.real/n,this.imaginary/n);
        }
        
    }
}
module.exports=I;