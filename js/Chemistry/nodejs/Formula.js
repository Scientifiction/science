const Wheel=require("./Wheel");
class Formula{
    constructor(mula){
        if(Object.prototype.toString.call(mula).slice(8,-1)=="String"){
            this.mula=this.parse(mula);
        }else{
            this.mula=mula;
        }
    }
    toArray(x){
        if(x.length==0){return []}
        return(Wheel.y(x).map(e=>Wheel.p(e)));
    }
    toString(){
        return Wheel.dumps(this.mula)
    }
    parse(x){
        if(x.length==0){return {}}
        return Wheel.d(this.toArray(x))
    }
    all(){
        if(Object.keys(this.mula).length==0){return {}}
        var f=this.mula;
        var g={};
        for(var i in f){
            if(i.startsWith("BLOCK")){
                for(var j in f[i][0]){
                    if(g[j]||g[j]==0){
                        g[j]+=f[i][0][j]*f[i][1]
                    }else{
                        g[j]=f[i][0][j]*f[i][1]
                    }
                }
            }else{
                if(g[i]||g[i]==0){
                    g[i]+=f[i]
                }else{
                    g[i]=f[i]
                }
            }
        }
        return g;
    }
    add(g){
        var f={};
        Object.assign(f,g);
        if(g.mula){
            f=g.all();
        }
        var t_all=this.all();
        for(var i in f){
            if(t_all[i]||t_all[i]==0){
                t_all[i]+=f[i]
            }else{
                t_all[i]=f[i]
            }
        }
        return new Formula(t_all);
    }
    reduce(g){
        var f={};
        Object.assign(f,g)
        if(g.mula){
            f=g.all();
        }
        var t_all=this.all();
        for(var i in f){
            if(t_all[i]||t_all[i]==0){
                t_all[i]-=f[i]
            }else{
                t_all[i]=-f[i]
            }
        }
        return new Formula(t_all);
    }
    mult(n){
        var t_all=this.all();
        for(var i in t_all){
            t_all[i]*=n;
        }
        return new Formula(t_all);
    }
    isequal(g){
        var f={};
        Object.assign(f,g)
        if(g.mula){
            f=g.all();
        }
        var t_all=this.all();
        for(var i in f){
            if(t_all[i]!=0&&f[i]!=0&&t_all[i]!=f[i]){
                return false;
            }
        }
        return true;
    }
    reverse(){
        var f={};
        var g=this.all();
        for(var i in g){
            f[i]=-g[i]
        }
        return f;
    }
}
module.exports =Formula;