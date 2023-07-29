const ChemistryWheel={};
ChemistryWheel.y=a=>a.match(/(\(([A-Z][a-z]{0,1}[0-9]*)+\)[0-9]+)|([A-Z][a-z]{0,1}[0-9]*)/g);
ChemistryWheel.p=(e)=>{
    if(e.includes("(")){
        var g=ChemistryWheel.y(e.match(/^\(.+\)/g)[0].slice(1,-1));
        var t=Number(e.match(/[0-9]+$/g)[0]);
        return ["BLOCK",g.map(e=>ChemistryWheel.p(e)),t]
    }else{
        return ["ELE",e.match(/^[^0-9]+/g)[0],(e.match(/[0-9]+$/g)?Number(e.match(/[0-9]+$/g)[0]):1)]
    }
}
ChemistryWheel.d=(arr,blockid=0)=>{
    var f={};
    arr.map(e=>{
        if(e[0]=="ELE"){
            if(f[e[1]]||f[e[1]]==0){
                f[e[1]]+=e[2];
            }else{
                f[e[1]]=e[2]
            }
        }else if(e[0]=="BLOCK"){
            f["BLOCK"+blockid]=[ChemistryWheel.d(e[1]),e[2]];
            blockid++;
        }else{throw "Invalid chemical Formula"}
    });
    return f;
}
ChemistryWheel.dumps=(g)=>{
    var f="";
    for(var i in g){
        if(i.startsWith("BLOCK")){
            f+="("+ChemistryWheel.dumps(g[i][0])+")"+g[i][1]
        }else{
            f+=i+(g[i]==1?"":g[i]);
        }
    }
    return f;
}
ChemistryWheel.gcd=(a, b)=> {
    if (b > a) {
        let temp = a;
        a = b;
        b = temp;
    }
    if (a == b || b == 0) { 
        return a;
    }
    return ChemistryWheel.gcd(b, a % b);
}
ChemistryWheel.lcm=(a, b)=> {
    return (a * b)/ChemistryWheel.gcd(a,b);
}
ChemistryWheel.standardadd=function(b,a){
    var le=arguments[2]+1?arguments[2]:b.length-1;
    b[le]++;
    if(b[le]>a[le]){
        b[le]=0;
        if(le==0){
            throw("Bigger than standard")
        }else{
            ChemistryWheel.standardadd(b,a,le-1)
        }
    }
}

class Chemistry{
    constructor(x){
    }
}
class Formula extends Chemistry{
    constructor(mula){
        super(mula);
        if(Object.prototype.toString.call(mula).slice(8,-1)=="String"){
            this.mula=this.parse(mula);
        }else{
            this.mula=mula;
        }
    }
    toArray(x){
        if(x.length==0){return []}
        return(ChemistryWheel.y(x).map(e=>ChemistryWheel.p(e)));
    }
    toString(){
        return ChemistryWheel.dumps(this.mula)
    }
    parse(x){
        if(x.length==0){return {}}
        return ChemistryWheel.d(this.toArray(x))
    }
    all(){
        if(Object.keys(this.mula).length==0){return {}}
        var f=this.mula;
        var g={};
        for(var i in f){
            if(i.startsWith("BLOCK")){
                for(var j in f[i][0]){
                    if(g[j]||g[j]==0){
                        g[j]+=f[i][0][j]*f[i][1]
                    }else{
                        g[j]=f[i][0][j]*f[i][1]
                    }
                }
            }else{
                if(g[i]||g[i]==0){
                    g[i]+=f[i]
                }else{
                    g[i]=f[i]
                }
            }
        }
        return g;
    }
    add(g){
        var f={};
        Object.assign(f,g);
        if(g.mula){
            f=g.all();
        }
        var t_all=this.all();
        for(var i in f){
            if(t_all[i]||t_all[i]==0){
                t_all[i]+=f[i]
            }else{
                t_all[i]=f[i]
            }
        }
        return new Formula(t_all);
    }
    reduce(g){
        var f={};
        Object.assign(f,g)
        if(g.mula){
            f=g.all();
        }
        var t_all=this.all();
        for(var i in f){
            if(t_all[i]||t_all[i]==0){
                t_all[i]-=f[i]
            }else{
                t_all[i]=-f[i]
            }
        }
        return new Formula(t_all);
    }
    mult(n){
        var t_all=this.all();
        for(var i in t_all){
            t_all[i]*=n;
        }
        return new Formula(t_all);
    }
    isequal(g){
        var f={};
        Object.assign(f,g)
        if(g.mula){
            f=g.all();
        }
        var t_all=this.all();
        for(var i in f){
            if(t_all[i]!=0&&f[i]!=0&&t_all[i]!=f[i]){
                return false;
            }
        }
        return true;
    }
    reverse(){
        var f={};
        var g=this.all();
        for(var i in g){
            f[i]=-g[i]
        }
        return f;
    }
}

const Speed={
    isequal:(g,f)=>{
        for(var i in f){
            if((g[i]==undefined&&f[i]==0)||(f[i]==undefined&&g[i]==0)){continue;}
            else if(g[i]!=f[i]){
                return false;
            }
        }
        return true;
    },
    mult:(f,n)=>{
        var g={};
        Object.assign(g,f);
        for(var i in g){
            g[i]*=n;
        }
        return g;
    },
    add:(g,f)=>{
        var t_all={};
        Object.assign(t_all,g);
        for(var i in f){
            if(t_all[i]||t_all[i]==0){
                t_all[i]+=f[i]
            }else{
                t_all[i]=f[i]
            }
        }
        return t_all;
    }
}

class Equation extends Chemistry{
    constructor(equ){
        super(equ);
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
            sumt.mula[i]=ChemistryWheel.lcm(sumt.mula[i],sumr.mula[i]);
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
            if(i!=allnum-1){ChemistryWheel.standardadd(k,standard);}
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
            t+=ChemistryWheel.dumps(e[1].mula);
            return t;
        }).join("+");
        s+="=";
        s+=this.right.map(e=>{
            var t="";
            if(e[0]!=1){
                t+=e[0];
            }
            t+=ChemistryWheel.dumps(e[1].mula);
            return t;
        }).join("+");
        return s;
    }
}