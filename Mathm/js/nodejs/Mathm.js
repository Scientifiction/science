var Mathm={}
Mathm=Object.create(Math);
Mathm.A=function(m,n){if(m==1){return n;}else{return n*A(m-1,n-1)}};//Number of permutations
Mathm.C=function(m,n){return A(m,n)/A(m,m)};//Number of combinations
Mathm.factor=(num)=>Mathm.range(1,num+1).map(e=>{return num/e%1==0?e:false}).filter(e=>{return e!=false})
Mathm.gcd=(a,b)=>Mathm.set.intersection(Mathm.factor(a),Mathm.factor(b)).sort((a,b)=>a>b?-1:1)[0]
Mathm.lcm=(a,b)=>a*b/Mathm.gcd(a,b)
Mathm.range=function(){
    if(!arguments[1]){return Array(arguments[0]).fill(0).map((m,e)=>{return e})}
    else if(!arguments[2]){return Array(arguments[1]-arguments[0]).fill(0).map((m,e)=>{return e+arguments[0]})}
    else{var ru=[];Array(arguments[1]-arguments[0]).fill(0).map((m,e)=>{if(e%arguments[2]==0){ru.push(e+arguments[0])}});return ru}
}
Mathm.findprimes=(n)=>{var P=[];var isPrime = new Array(n).fill(1);
    for(let i=2;i<n;++i){if(isPrime[i]){P.push(i);for(let j=i*i;j<n;j+=i){isPrime[j]=0}}}return P;
}
Mathm.round=function(n){if(arguments[1]){var m=arguments[1];return Math.round(n*Math.pow(10,m))/Math.pow(10,m)}else{return Math.round(n)}}
Mathm.log=function(N){if(arguments[1]){var a=arguments[1];return Math.log(N)/Math.log(a)}else{return Math.log(N)}}
Mathm.root=(a,b)=>Mathm.pow(a,1/b)
Mathm.reciprocal=a=>1/a
Mathm.continued=(arr)=>{return arr.slice(1).toString()==[].toString()?arr[0]:arr[0]+1/eval("Mathm.continued(["+String(arr.slice(1))+"])")}//Continued fraction
Mathm.sigma=(i,n,f)=>Mathm.range(i,n+1).reduce((a,b) =>a+f(b),0)
Mathm.pi=(k,n,f)=>{var r=1;Mathm.range(k,n+1).map(e=>{r*=f(e)});return r}
Mathm.Set=require("./Set");
Mathm.Statistics=require("./Statistics");
Mathm.I=require("./I");
Mathm.Matrix=require("./Matrix");
Mathm.Det=require("./Det")
module.exports=Mathm;