var Wheel={};
Wheel.y=a=>a.match(/(\(([A-Z][a-z]{0,1}[0-9]*)+\)[0-9]+)|([A-Z][a-z]{0,1}[0-9]*)/g);
Wheel.p=(e)=>{
    if(e.includes("(")){
        var g=Wheel.y(e.match(/^\(.+\)/g)[0].slice(1,-1));
        var t=Number(e.match(/[0-9]+$/g)[0]);
        return ["BLOCK",g.map(e=>Wheel.p(e)),t]
    }else{
        return ["ELE",e.match(/^[^0-9]+/g)[0],(e.match(/[0-9]+$/g)?Number(e.match(/[0-9]+$/g)[0]):1)]
    }
}
Wheel.d=(arr,blockid=0)=>{
    var f={};
    arr.map(e=>{
        if(e[0]=="ELE"){
            if(f[e[1]]||f[e[1]]==0){
                f[e[1]]+=e[2];
            }else{
                f[e[1]]=e[2]
            }
        }else if(e[0]=="BLOCK"){
            f["BLOCK"+blockid]=[Wheel.d(e[1]),e[2]];
            blockid++;
        }else{throw "Invalid chemical formula"}
    });
    return f;
}
Wheel.dumps=(g)=>{
    var f="";
    for(var i in g){
        if(i.startsWith("BLOCK")){
            f+="("+Wheel.dumps(g[i][0])+")"+g[i][1]
        }else{
            f+=i+(g[i]==1?"":g[i]);
        }
    }
    return f;
}
Wheel.gcd=(a, b)=> {
    if (b > a) {
        let temp = a;
        a = b;
        b = temp;
    }
    if (a == b || b == 0) { 
        return a;
    }
    return Wheel.gcd(b, a % b);
}
Wheel.lcm=(a, b)=> {
    return (a * b)/Wheel.gcd(a,b);
}
Wheel.standardadd=function(b,a){
    var le=arguments[2]+1?arguments[2]:b.length-1;
    b[le]++;
    if(b[le]>a[le]){
        b[le]=0;
        if(le==0){
            throw("Bigger than standard")
        }else{
            Wheel.standardadd(b,a,le-1)
        }
    }
}
Wheel.esort=function(a){
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
Wheel.dsort=function(a,s){
    var f={};
    f.length=s.length;
    for(var i=0;i<s.length;i++){
        f[s[i]]=a[i]
    }
    return Array.from(f);
}
Wheel.rsort=function(a,s){
    var f={};
    f.length=s.length;
    for(var i=0;i<s.length;i++){
        f[i]=a[s[i]]
    }
    return Array.from(f);
}
module.exports=Wheel;