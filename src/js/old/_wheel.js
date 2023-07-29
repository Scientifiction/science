const fs=require("node:fs");
const y=a=>a.match(/(\(([A-Z][a-z]{0,1}[0-9]*)+\)[0-9]+)|([A-Z][a-z]{0,1}[0-9]*)/g);
var dat=JSON.parse(fs.readFileSync("./src/js/data.json","utf-8"));
var data=(e)=>{
    return dat[e]?Number(dat[e]):0
}
var p=(e)=>{
    if(e.includes("(")){
        var g=y(e.match(/^\(.+\)/g)[0].slice(1,-1));
        var t=Number(e.match(/[0-9]+$/g)[0]);
        var b=0;
        g.map(e=>b+=p(e));
        return b*t;
    }else{
        return (e.match(/[0-9]+$/g)?e.match(/[0-9]+$/g)[0]:1)*data(e.match(/^[^0-9]+/g)[0])
    }
}
const ChemicalFormulaHelper=(e)=>{
    var f=0;
    y(e).map(er=>f+=p(er));
    return f;
}
module.exports=ChemicalFormulaHelper;