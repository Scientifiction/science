class MMatrix{
    constructor(arr){
        this.arr=arr;
        this.m=arr.length;
        this.n=arr[0].length;
    }
    homofunc(){
        if(this.n-this.m!=1&&this.n-this.m!=2){
            throw("The size difference of the linear matrix of a homogeneous equation is not 1")
        }
        var x=Array(this.m).fill(0);
        if(this.n-this.m==2){
            x.push(1)
        }
        var f=[];
        Object.assign(f,this.arr);
        for(var i=0;i<f.length;i++){
            for(var j=i+1;j<f.length;j++){
                var h=f[j][i]/f[i][i];
                for(var k=0;k<f[0].length;k++){
                    f[j][k]=f[j][k]-f[i][k]*h
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