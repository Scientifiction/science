const Operation=require("./Operation");
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
        if(b.type&&b.type=="Matrix"){}else{
            return this.nummult(b);
        }
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
module.exports=Matrix;