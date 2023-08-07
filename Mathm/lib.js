var lib={};
lib.factor=(num)=>lib.range(1,num+1).map(e=>{return num/e%1==0?e:false}).filter(e=>{return e!=false})
lib.A=function(m,n){if(m==1){return n;}else{return n*A(m-1,n-1)}};//Number of permutations
lib.C=function(m,n){return A(m,n)/A(m,m)};//Number of combinations
lib.gcd=function(a,b){
    return b ? lib.gcd(b, a % b) : a;
}
lib.lcm=function(a, b){
    return a*b/lib.gcd(a, b)
};

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
module.exports=lib;