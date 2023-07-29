const Speed={
    isequal:(g,f)=>{
        for(var i in f){
            if((g[i]==undefined&&f[i]==0)||(f[i]==undefined&&g[i]==0)){continue;}
            else if(g[i]!=f[i]){
                return false;
            }
        }
        return true;
    },
    mult:(f,n)=>{
        var g={};
        Object.assign(g,f);
        for(var i in g){
            g[i]*=n;
        }
        return g;
    },
    add:(g,f)=>{
        var t_all={};
        Object.assign(t_all,g);
        for(var i in f){
            if(t_all[i]||t_all[i]==0){
                t_all[i]+=f[i]
            }else{
                t_all[i]=f[i]
            }
        }
        return t_all;
    }
}
module.exports=Speed;