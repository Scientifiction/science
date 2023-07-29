var Statistics={}
const Mathm=require("./Mathm")
Statistics.mean={
    arithmetic:function(a){
        q=arguments[1]||Array(a.length).fill(1);
        return Mathm.sigma(0,a.length-1,(e)=>a[e]*q[e])/Mathm.sigma(0,q.length-1,(e)=>q[e])},
    geometric:function(a){
        q=arguments[1]||Array(a.length).fill(1);
        return Mathm.root(Mathm.pi(0,a.length-1,(e)=>Mathm.pow(a[e],q[e])),Mathm.sigma(0,q.length-1,(e)=>q[e]))},
    harmonic:function(a){
        q=arguments[1]||Array(a.length).fill(1);
        return Mathm.sigma(0,q.length-1,(e)=>q[e])/Mathm.sigma(0,a.length-1,(e)=>q[e]/a[e])},
    quadratic:(a)=>Mathm.root(Mathm.sigma(0,a.length-1,(e)=>a[e]*a[e])/a.length,2)
}
module.exports=Statistics;