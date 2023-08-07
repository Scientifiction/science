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
            var t=this.left[i][1].all()
            for(var j in t){
                if(u[j]){
                    u[j].push(t[j])
                }else{
                    u[j]=Array(i).fill(0).concat([t[j]])
                }
            }
            for(var j in u){
                if(u[j].length==i){
                    u[j].push(0)
                }
            }
        }
        for(var i=0;i<this.right.length;i++){
            var t=this.right[i][1].all()
            for(var j in t){
                if(u[j]){
                    u[j].push(-t[j])
                }else{
                    u[j]=Array(i+this.left.length-1).fill(0).concat([-t[j]])
                }
            }
            for(var j in u){
                if(u[j].length==i+this.left.length){
                    u[j].push(0)
                }
            }
        }
        for(var j in u){
            u[j].push(0)
        }
        u=Object.values(u).slice(0,this.left.length+this.right.length-1);
        var sortarr=Wheel.esort(u);
        u=Wheel.dsort(u,sortarr);
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
        return {u,sortarr};
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