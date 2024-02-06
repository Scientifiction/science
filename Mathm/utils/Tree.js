const M=require("../container/Matrix");
const D=require("../container/Det");
const F=require("../O/Fraction");
const V=require("../container/Vector2d");
const I=require("../container/I");


function FindStruct(str,o){
    var n=o+1;
    var lock=1;
    for(n;n<str.length;n++){
        if(str[n]=="("){lock++};
        if(str[n]==")"){
            lock--;
            if(lock==0){
                return n;
            }
        }
    }
    throw("[Science.Mathm.Tree] Can't find struct ) for ( at chars "+o);
    return 0;
}
function TypeFunc(str){
    return eval("new "+str);
    //return str;
}
function og(ar){
    var arr=ar.map(e=>{
        if(e.push){
            return og(e)
        }else{
            return e
        }
    });
    var t={};
    var j="";
    for(var i=arr.length-1;i>3;i=i-2){
        eval("t"+j).b=arr[i];
        eval("t"+j).O=arr[i-1];
        eval("t"+j).a={};
        j+="['a']"
    };
    eval("t"+j).b=arr[2];
    eval("t"+j).O=arr[1];
    eval("t"+j).a=arr[0];
    return t
}
function TurnToArray(a){
    var summ=[];
    var sum=[];
    var l=-1;
    var n=0;
    var v="";
    function addv(v){
        return {
            "name":v,
            "type":"variable"
        }
    }
    for(n;n<a.length;n++){
        if(a[n]=="("){
            if(TYPE.dictmap.indexOf(a[n-1])+1){
                var g=FindStruct(a,n);
                sum.push(TypeFunc(a.slice(n-1,g+1)));
                n=g;
            }else{
                var g=FindStruct(a,n);
                sum.push(TurnToArray(a.slice(n+1,g)));
                n=g;
            }
        }else if(a[n]==")"){
            throw("[Science.Mathm.Tree] Can't find struct ( for ) at chars "+n);
        }else if("0123456789".includes(a[n])){
            if(!(l+1)){l=0}
            l=10*l+Number(a[n]);
        }else if("+-*/".includes(a[n])){
            if(l+1){
                sum.push(l);
                l=-1;
            }else if(v.length){
                sum.push(addv(v));
                v="";
            }
            if("*/".includes(a[n])){
                sum.push(TYPE.O[a[n]]);
            }else{
                if(sum.length==1){
                    summ.push(sum[0]);
                }else{
                    summ.push(sum);
                }
                summ.push(TYPE.O[a[n]]);
                sum=[];
            }
        }else if(!(TYPE.dictmap.indexOf(a[n])+1)){
            v+=a[n];
        }
    }
    if(l+1){
        sum.push(l);
    }else if(v.length){
        sum.push(addv(v));
    }
    if(sum.length==1){
        summ.push(sum[0]);
    }else{
        summ.push(sum);
    }
    if(summ.length==1){
        return summ[0]
    }
    return summ;
}

const TYPE=require("../type/type");
class Tree{
    constructor(str){
        var a=str;
        while(a[0]=="("&&a[a.length-1]==")"){a=a.slice(1,-1)};
        this.tree=og(TurnToArray(str));
        this.type="Tree";
        this.str=str;
    }
}
module.exports=Tree;