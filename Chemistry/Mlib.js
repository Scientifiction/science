function floatlen(n){
    var f=String(n);
    if(f.indexOf(".")==-1){
        return 0;
    }else{
        return f.slice(f.indexOf(".")+1).length;
    }
}
function gcd(a,b){
    return b ? gcd(b, a % b) : a;
}
var Mlib={floatlen,gcd}
module.exports=Mlib;