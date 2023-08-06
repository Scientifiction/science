const Wheel=require("./Wheel");
const Speed=require("./Speed");
const Formula=require("./Formula");
const MMatrix=require("./MMatrix");
const Mlib=require("./Mlib");
class Equation{
    constructor(equ){
        var f=equ.replaceAll(" ","").split("=");
        this.left=f[0].split("+").map(e=>[e.match(/^[0-9]+/g)?Number(e.match(/^[0-9]+/g)[0]):1,new Formula(e.replace(/^[0-9]+/g,""))]);
        this.right=f[1].split("+").map(e=>[e.match(/^[0-9]+/g)?Number(e.match(/^[0-9]+/g)[0]):1,new Formula(e.replace(/^[0-9]+/g,""))]);
        this.op=this.left.map(e=>e[1].all()).concat(this.right.map(e=>e[1].reverse()));
    }
    trim(){
        var u={};
        for(var i=0;i<this.left.length;i++){
            for(var j in this.left[i][1].mula){
                if(u[j]){
                    u[j].push(this.left[i][1].mula[j])
                }else{
                    u[j]=Array(i).fill(0).concat([this.left[i][1].mula[j]])
                }
            }
            for(var j in u){
                if(u[j].length==i){
                    u[j].push(0)
                }
            }
        }
        for(var i=0;i<this.right.length;i++){
            for(var j in this.right[i][1].mula){
                if(u[j]){
                    u[j].push(-this.right[i][1].mula[j])
                }else{
                    u[j]=Array(i).fill(0).concat([-this.right[i][1].mula[j]])
                }
            }
            for(var j in u){
                if(u[j].length==i){
                    u[j].push(0)
                }
            }
        }
        for(var j in u){
            u[j].push(0)
        }
        u=Object.values(u).slice(0,this.left.length+this.right.length-1);
        u=new MMatrix(u).homofunc();
        var maxf=0
        for(var i in u){
            var j=Mlib.floatlen(u[i]);
            maxf=maxf>j?maxf:j;
        }
        maxf=10**maxf;
        for(var i in u){
            u[i]*=maxf;
        }
        maxf=u[0];
        for(var i in u){
            maxf=Mlib.gcd(u[i],maxf);
        }
        for(var i in u){
            u[i]/=maxf;
        }
        for(var i=0;i<this.left.length;i++){
            this.left[i][0]=u[i]
        }
        for(var i=0;i<this.right.length;i++){
            this.right[i][0]=u[i+this.left.length]
        }
        return u;
    }
    toString(){
        var s="";
        s+=this.left.map(e=>{
            var t="";
            if(e[0]!=1){
                t+=e[0];
            }
            t+=Wheel.dumps(e[1].mula);
            return t;
        }).join("+");
        s+="=";
        s+=this.right.map(e=>{
            var t="";
            if(e[0]!=1){
                t+=e[0];
            }
            t+=Wheel.dumps(e[1].mula);
            return t;
        }).join("+");
        return s;
    }
}
module.exports =Equation;