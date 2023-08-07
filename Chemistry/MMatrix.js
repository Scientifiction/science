class MMatrix{
    constructor(arr){
        this.arr=arr;
        this.m=arr.length;
        this.n=arr[0].length;
    }
    homofunc(){
        var x=Array(this.m).fill(0);
        for(var i=0;i<this.n-this.m-1;i++){
            x.push(1)
        }
        var f=[];
        Object.assign(f,this.arr);
        for(var i=0;i<f.length;i++){
            for(var j=i+1;j<f.length;j++){
                var h=f[j][i]/f[i][i];
                if(j!=f.length-1&&f[j][j]==f[i][j]*h){
                    var m=j;
                    while(f[j][j]==f[i][j]*h){
                        if(f[m+1][i]){
                            h=f[j][i]/f[++m][i]
                        }else{
                            m++;
                        }
                    }
                    for(var k=0;k<f[0].length;k++){
                        f[j][k]=f[j][k]-f[m][k]*h
                    }
                }else{
                    for(var k=0;k<f[0].length;k++){
                        f[j][k]=f[j][k]-f[i][k]*h
                    }
                }
            }
        }
        for(var i=f.length-1;i>=0;i--){
            var sum=f[i][f[0].length-1];
            for(var j=f[0].length-2;j>i;j--){
                sum=sum-x[j]*f[i][j]
            }
            x[i]=sum/f[i][i];
        }
        return x;
    }
}
module.exports=MMatrix;