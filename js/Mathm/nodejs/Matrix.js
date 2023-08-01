const Operation=require("./Operation");
const lib=require("./lib2")

class Matrix{
    constructor(arr){
        this.arr=arr;
        this.m=arr.length;
        this.n=arr[0].length;
        this.type="Matrix";
    }
    ishomotype(b){
        return this.m==b.m&&this.n==b.n;
    }
    add(b){
        if(!this.ishomotype(b)){
            throw("Different size of additive matrices")
        }
        var g=[];
        Object.assign(g,this.arr);
        for(var i=0;i<this.m;i++){
            for(var j=0;j<this.n;j++){
                g[i][j]=Operation.add(g[i][j],b.arr[i][j])
            }
        }
        return new Matrix(g)
    }
    reduce(b){
        if(!this.ishomotype(b)){
            throw("Different size of additive matrices")
        }
        var g=[];
        Object.assign(g,this.arr);
        for(var i=0;i<this.m;i++){
            for(var j=0;j<this.n;j++){
                g[i][j]=Operation.reduce(g[i][j],b.arr[i][j]);
            }
        }
        return new Matrix(g)
    }
    nummult(n){
        if(n.arr){
            return this.mult(n)
        }
        var g=[];
        Object.assign(g,this.arr);
        for(var i=0;i<this.m;i++){
            for(var j=0;j<this.n;j++){
                g[i][j]=Operation.mult(g[i][j],n);
            }
        }
        return new Matrix(g)
    }
    mult(b){
        if(b.type&&(b.type=="Matrix"||b.type=="Det")){
            if(this.n!=b.m){
                throw("The rows and columns of two matrix matrices are not equal")
            }
            var g=[];
            for(var i=0;i<this.m;i++){
                g.push([]);
                for(var j=0;j<b.n;j++){
                    g[i].push(lib.sigma(0,this.n-1,(e)=>Operation.mult(this.arr[i][e],b.arr[e][j])))
                }
            }
            return new Matrix(g)
        }else{
            return this.nummult(b);
        }
    }
    conjugate(){
        var g=[];
        Object.assign(g,this.arr);
        for(var i=0;i<this.m;i++){
            for(var j=0;j<this.n;j++){
                if(g[i][j].type=="I"){
                    g[i][j]=g[i][j].conjugate();
                }
            }
        }
        return new Matrix(g)
    }
    trans(){
        var g=new Array(this.n).fill(0).map(()=>{
            return Array(this.m)
        });
        for(var i=0;i<this.n;i++){
            for(var j=0;j<this.m;j++){
                g[i][j]=this.arr[j][i];
            }
        }
        return new Matrix(g)
    }
    conjtrans(){
        return this.conjugate().trans();
    }
    homofunc(){}
    trace(){
        var f=0;
        for(var i=0;i<this.m;i++){
            f=Operation.add(f,this.arr[i][i]);
        }
        return f;
    }
}
Matrix.diag=function(x){
    var g=[];
    for(var i=0;i<x;i++){
        g.push([]);
        for(var j=0;j<x;j++){
            if(i==j){
                g[i].push(1);
            }else{
                g[i].push(0);
            }
        }
    }
    return new Matrix(g);
}
Matrix.Hadamard=function(a,b){
    if(!(a.n==b.n&&a.m==b.m&&(a.type=="Matrix"||a.type=="Det")&&(b.type=="Matrix"||b.type=="Det"))){
        throw("The two parameters have different sizes")
    }
    var g=[];
    Object.assign(g,a.arr);
    for(var i=0;i<b.m;i++){
        for(var j=0;j<b.n;j++){
            g[i][j]=Operation.mult(g[i][j],b.arr[i][j]);
        }
    }
    return new Matrix(g)

}
Matrix.Kronecker=function(a,b){
    console.log(a,b)
    if(a.n==0||a.m==0||b.n==0||b.m==0){
        return new Matrix([]);
    }
    var g=[];
    for(var a0=0;a0<a.m;a0++){
        for(var b0=0;b0<b.m;b0++){
            g.push([]);
            for(var c=0;c<a.n;c++){
                for(var d=0;d<b.n;d++){
                    g[a0*b.m+b0].push(Operation.mult(a.arr[a0][c],b.arr[b0][d]))
                }
            }
        }
    }/*
    for(var j=0;j<a.m*b.m;j++){
        g.push([]);
        for(var i=0;i<a.n*b.n;i++){
            g[j].push(Operation.mult(a.arr[(j-j%a.m)/a.m][(i-i%a.n)/a.n],b.arr[j%b.m][i%b.n]))
        }
    }*/
    return new Matrix(g)
}
module.exports=Matrix;