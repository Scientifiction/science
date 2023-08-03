var Set={
    issubset:(a,b)=>b.every((e)=>a.indexOf(e)!=-1),//b is a's subset?
    ispsubset:(a,b)=>Set.issubset(a,b)&&a.sort().toString()!=b.sort().toString(),//b is a's proper subset?
    intersection:(a,b)=>a.filter(e=>b.indexOf(e)!=-1),//get intersection
    union:(a,b)=>[...new Set(a.concat(b))],//get union
    complement:(a,b)=>Set.remove(a,Set.intersection(a,b)),
    remove:(a,b)=>a.filter(e=>b.indexOf(e)!=-1?false:true)
}
module.exports=Set;