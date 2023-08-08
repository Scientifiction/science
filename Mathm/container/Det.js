const Operation=require("../Operation");
class Det{
    constructor(arr){
        if(arr.length!=arr[0].length){
            throw("Det must be a square array")
        }
        this.arr=arr;
        this.n=arr.length;
        this.m=arr.length;
        this.type="Det";
    }
    value(){
        if(this.n==0){
            return 0;
        }
        else if(this.n==1){
            return arr[0][0];
        }
        else if(this.n==2){
            return Operation.reduce(Operation.mult(arr[0][0],arr[1][1]),Operation.mult(arr[0][1],arr[1][0]));
        }else{
            for(var i=0;i<this.n;i++){
                
            }
        }
    }
    totriangle(way=0){//way:0down,1up
        if(way){
            var f=[];
            Object.assign(f,this.arr);
            for(var i=f.length-1;i>=0;i--){
                for(var j=i-1;j>-1;j--){
                    var h=Operation.divide(f[j][i],f[i][i]);
                    if(j!=0&&f[j][j]==Operation.mult(f[i][j],h)){
                        var m=j;
                        while(f[j][j]==Operation.mult(f[i][j],h)&&m<f.length-1){
                            if(f[m+1][i]){
                                h=Operation.divide(f[j][i],f[++m][i])
                            }else{
                                m++;
                            }
                        }
                        for(var k=0;k<f[0].length;k++){
                            f[j][k]=Operation.reduce(f[j][k],Operation.mult(f[m][k],h))
                        }
                    }else{
                        for(var k=0;k<f[0].length;k++){
                            f[j][k]=Operation.reduce(f[j][k],Operation.mult(f[i][k],h))
                        }
                    }
                }
            }
            return new Det(f);
        }else{
            var f=[];
            Object.assign(f,this.arr);
            for(var i=0;i<f.length;i++){
                for(var j=i+1;j<f.length;j++){
                    var h=Operation.divide(f[j][i],f[i][i]);
                    if(j!=f.length-1&&f[j][j]==Operation.mult(f[i][j],h)){
                        var m=j;
                        while(f[j][j]==Operation.mult(f[i][j],h)&&m<f.length-1){
                            if(f[m+1][i]){
                                h=Operation.divide(f[j][i],f[++m][i])
                            }else{
                                m++;
                            }
                        }
                        for(var k=0;k<f[0].length;k++){
                            f[j][k]=Operation.reduce(f[j][k],Operation.mult(f[m][k],h))
                        }
                    }else{
                        for(var k=0;k<f[0].length;k++){
                            f[j][k]=Operation.reduce(f[j][k],Operation.mult(f[i][k],h))
                        }
                    }
                }
            }
            return new Det(f);
        }
    }
}
module.exports=Det;