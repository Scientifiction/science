var Statistics={}
const lib=require("./lib2")
Statistics.mean={
    arithmetic:function(a){
        q=arguments[1]||Array(a.length).fill(1);
        return lib.sigma(0,a.length-1,(e)=>a[e]*q[e])/lib.sigma(0,q.length-1,(e)=>q[e])},
    geometric:function(a){
        q=arguments[1]||Array(a.length).fill(1);
        return lib.root(lib.pi(0,a.length-1,(e)=>lib.pow(a[e],q[e])),lib.sigma(0,q.length-1,(e)=>q[e]))},
    harmonic:function(a){
        q=arguments[1]||Array(a.length).fill(1);
        return lib.sigma(0,q.length-1,(e)=>q[e])/lib.sigma(0,a.length-1,(e)=>q[e]/a[e])},
    quadratic:(a)=>lib.root(lib.sigma(0,a.length-1,(e)=>a[e]*a[e])/a.length,2)
}
module.exports=Statistics;