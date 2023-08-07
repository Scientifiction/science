const Chemistry=(function(){
    const Mlib={
        floatlen:function(n){
            var f=String(n);
            if(f.indexOf(".")==-1){
                return 0;
            }else{
                return f.slice(f.indexOf(".")+1).length;
            }
        }
    }
    class MMatrix{
        constructor(arr){
            this.arr=arr;
            this.m=arr.length;
            this.n=arr[0].length;
        }
        homofunc(){
            var x=Array(this.m).fill(0);
            for(var i=0;i<this.n-this.m-1;i++){
                x.push(1)
            }
            var f=[];
            Object.assign(f,this.arr);
            for(var i=0;i<f.length;i++){
                for(var j=i+1;j<f.length;j++){
                    var h=f[j][i]/f[i][i];
                    if(j!=f.length-1&&f[j][j]==f[i][j]*h){
                        var m=j;
                        while(f[j][j]==f[i][j]*h){
                            if(f[m+1][i]){
                                h=f[j][i]/f[++m][i]
                            }else{
                                m++;
                            }
                        }
                        for(var k=0;k<f[0].length;k++){
                            f[j][k]=f[j][k]-f[m][k]*h
                        }
                    }else{
                        for(var k=0;k<f[0].length;k++){
                            f[j][k]=f[j][k]-f[i][k]*h
                        }
                    }
                }
            }
            for(var i=f.length-1;i>=0;i--){
                var sum=f[i][f[0].length-1];
                for(var j=f[0].length-2;j>i;j--){
                    sum=sum-x[j]*f[i][j]
                }
                x[i]=sum/f[i][i];
            }
            return x;
        }
    }
    const Chemistry={};
    Chemistry.Wheel={};
    Chemistry.Wheel.y=a=>a.match(/(\(([A-Z][a-z]{0,1}[0-9]*)+\)[0-9]+)|([A-Z][a-z]{0,1}[0-9]*)/g);
    Chemistry.Wheel.p=(e)=>{
        if(e.includes("(")){
            var g=Chemistry.Wheel.y(e.match(/^\(.+\)/g)[0].slice(1,-1));
            var t=Number(e.match(/[0-9]+$/g)[0]);
            return ["BLOCK",g.map(e=>Chemistry.Wheel.p(e)),t]
        }else{
            return ["ELE",e.match(/^[^0-9]+/g)[0],(e.match(/[0-9]+$/g)?Number(e.match(/[0-9]+$/g)[0]):1)]
        }
    }
    Chemistry.Wheel.d=(arr,blockid=0)=>{
        var f={};
        arr.map(e=>{
            if(e[0]=="ELE"){
                if(f[e[1]]||f[e[1]]==0){
                    f[e[1]]+=e[2];
                }else{
                    f[e[1]]=e[2]
                }
            }else if(e[0]=="BLOCK"){
                f["BLOCK"+blockid]=[Chemistry.Wheel.d(e[1]),e[2]];
                blockid++;
            }else{throw "Invalid chemical Formula"}
        });
        return f;
    }
    Chemistry.Wheel.dumps=(g)=>{
        var f="";
        for(var i in g){
            if(i.startsWith("BLOCK")){
                f+="("+Chemistry.Wheel.dumps(g[i][0])+")"+g[i][1]
            }else{
                f+=i+(g[i]==1?"":g[i]);
            }
        }
        return f;
    }
    Chemistry.Wheel.gcd=(a, b)=> {
        if (b > a) {
            let temp = a;
            a = b;
            b = temp;
        }
        if (a == b || b == 0) { 
            return a;
        }
        return Chemistry.Wheel.gcd(b, a % b);
    }
    Chemistry.Wheel.lcm=(a, b)=> {
        return (a * b)/Chemistry.Wheel.gcd(a,b);
    }
    Chemistry.Wheel.standardadd=function(b,a){
        var le=arguments[2]+1?arguments[2]:b.length-1;
        b[le]++;
        if(b[le]>a[le]){
            b[le]=0;
            if(le==0){
                throw("Bigger than standard")
            }else{
                Chemistry.Wheel.standardadd(b,a,le-1)
            }
        }
    }
    
    Chemistry.Wheel.esort=function(a){
        var f=[];
        for(var i=0;i<a.length;i++){
            var s=[];
            for(var j=0;j<a.length;j++){
                if(a[i][j]!=0){
                    s.push(j)
                }
            }
            f.push(s)
        }
        function sadd(b,a){
            var le=arguments[2]+1?arguments[2]:b.length-1;
            b[le]++;
            if(b[le]>a[le]){
                b[le]=0;
                if(le==0){
                    throw("Bigger than standard")
                }else{
                    sadd(b,a,le-1)
                }
            }
        }
        var standard=f.map(e=>e.length-1);
        var s=Array(f.length).fill(0);
        function c(s){
            var g=[];
            for(var h=0;h<f.length;h++){
                if(g.includes(f[h][s[h]])){
                    sadd(s,standard);
                    return c(s);
                }else{
                    g.push(f[h][s[h]]);
                }
            }
            
            return g; 
        }
        return c(s)
    }
    Chemistry.Wheel.dsort=function(a,s){
        var f={};
        f.length=s.length;
        for(var i=0;i<s.length;i++){
            f[s[i]]=a[i]
        }
        return Array.from(f);
    }
    Chemistry.Wheel.rsort=function(a,s){
        var f={};
        f.length=s.length;
        for(var i=0;i<s.length;i++){
            f[i]=a[s[i]]
        }
        return Array.from(f);
    }

    class Formula{
        constructor(mula){
            if(Object.prototype.toString.call(mula).slice(8,-1)=="String"){
                this.mula=this.parse(mula);
            }else{
                this.mula=mula;
            }
        }
        toArray(x){
            if(x.length==0){return []}
            return(Chemistry.Wheel.y(x).map(e=>Chemistry.Wheel.p(e)));
        }
        toString(){
            return Chemistry.Wheel.dumps(this.mula)
        }
        parse(x){
            if(x.length==0){return {}}
            return Chemistry.Wheel.d(this.toArray(x))
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

    Chemistry.Speed={
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
            u=Chemistry.Wheel.dsort(u,sortarr);
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
                maxf=Chemistry.Wheel.gcd(u[i],maxf);
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
                t+=Chemistry.Wheel.dumps(e[1].mula);
                return t;
            }).join("+");
            s+="=";
            s+=this.right.map(e=>{
                var t="";
                if(e[0]!=1){
                    t+=e[0];
                }
                t+=Chemistry.Wheel.dumps(e[1].mula);
                return t;
            }).join("+");
            return s;
        }
    }
    Chemistry.Formula=Formula;
    Chemistry.Equation=Equation;
    return Chemistry;
})()