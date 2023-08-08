const O=require("./Operation")
var lib={};
lib.A=function(m,n){if(m==1){return n;}else{return n*A(m-1,n-1)}};//Number of permutations
lib.C=function(m,n){return A(m,n)/A(m,m)};//Number of combinations
lib.factor=(num)=>lib.range(1,num+1).map(e=>{return num/e%1==0?e:false}).filter(e=>{return e!=false})
lib.gcd=(a,b)=>lib.Set.intersection(lib.factor(a),lib.factor(b)).sort((a,b)=>a>b?-1:1)[0]
lib.lcm=(a,b)=>a*b/lib.gcd(a,b)
lib.range=function(){
    if(!arguments[1]){return Array(arguments[0]).fill(0).map((m,e)=>{return e})}
    else if(!arguments[2]){return Array(arguments[1]-arguments[0]).fill(0).map((m,e)=>{return e+arguments[0]})}
    else{var ru=[];Array(arguments[1]-arguments[0]).fill(0).map((m,e)=>{if(e%arguments[2]==0){ru.push(e+arguments[0])}});return ru}
}
lib.findprimes=(n)=>{var P=[];var isPrime = new Array(n).fill(1);
    for(let i=2;i<n;++i){if(isPrime[i]){P.push(i);for(let j=i*i;j<n;j+=i){isPrime[j]=0}}}return P;
}
lib.round=function(n){if(arguments[1]){var m=arguments[1];return Math.round(n*Math.pow(10,m))/Math.pow(10,m)}else{return Math.round(n)}}
lib.log=function(N){if(arguments[1]){var a=arguments[0];var N=arguments[1];return Math.log(N)/Math.log(a)}else{return Math.log(N)}}
lib.pow=function(a,b){return Math.pow(a,b)}
lib.root=(a,b)=>lib.pow(a,1/b)
lib.reciprocal=a=>1/a
lib.continued=(arr)=>{return arr.slice(1).toString()==[].toString()?arr[0]:arr[0]+1/eval("lib.continued(["+String(arr.slice(1))+"])")}//Continued fraction
lib.sigma=(i,n,f)=>lib.range(i,n+1).reduce((a,b) =>O.add(a,f(b)),0)
lib.pi=(k,n,f)=>{var r=1;lib.range(k,n+1).map(e=>{r*=f(e)});return r}
lib.Set=require("./container/Set");
module.exports=lib;