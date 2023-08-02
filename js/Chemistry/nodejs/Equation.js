const Wheel=require("./Wheel");
const Speed=require("./Speed");
const Formula=require("./Formula")

class Equation{
    constructor(equ){
        var f=equ.replaceAll(" ","").split("=");
        this.left=f[0].split("+").map(e=>[e.match(/^[0-9]+/g)?Number(e.match(/^[0-9]+/g)[0]):1,new Formula(e.replace(/^[0-9]+/g,""))]);
        this.right=f[1].split("+").map(e=>[e.match(/^[0-9]+/g)?Number(e.match(/^[0-9]+/g)[0]):1,new Formula(e.replace(/^[0-9]+/g,""))]);
        this.op=this.left.map(e=>e[1].all()).concat(this.right.map(e=>e[1].reverse()));
    }
    trim(){
        var sumt=new Formula({});
        this.left.forEach(e=>{
            sumt=sumt.add(e[1])
        });
        var sumr=new Formula({});
        this.right.forEach(e=>{
            sumr=sumr.add(e[1])
        });
        var andt=sumr.reduce(sumt).all();
        for(var i in sumr.mula){
            sumt.mula[i]=Wheel.lcm(sumt.mula[i],sumr.mula[i]);
        }
        var standard=Array(this.left.length).fill(0).map((e,m)=>{
            var g=1;
            var az=this.left[m][1].all();
            for(var i in az){
                g*=Math.ceil(sumt.mula[i]/az[i])
            }
            return g;
        }).concat(Array(this.right.length).fill(0).map((e,m)=>{
            var g=1;
            var az=this.right[m][1].all();
            for(var i in az){
                g*=Math.ceil(sumt.mula[i]/az[i])
            }
            return g;
        }));
        var k=Array(this.left.length+this.right.length).fill(0);
        var allnum=1;
        standard.map(e=>allnum*=e+1);
        var sum;
        for(var i=0;i<allnum;i++){
            sum={};
            for(var j in k){
                sum=Speed.add(sum,Speed.mult(this.op[j],k[j]))
            }
            if(Speed.isequal(sum,andt)){
                break;
            }
            if(i!=allnum-1){Wheel.standardadd(k,standard);}
        }
        for(var i=0;i<this.left.length;i++){
            this.left[i][0]+=k[i];
        }
        for(var i=0;i<k.length-this.left.length;i++){
            this.right[i][0]+=k[i+this.left.length];
        }
        return k;
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