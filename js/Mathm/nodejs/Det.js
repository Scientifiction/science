const Operation=require("./Operation");
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
                    var h=f[j][i]/f[i][i];
                    for(var k=0;k<f.length;k++){
                        f[j][k]=Operation.reduce(f[j][k],Operation.mult(f[i][k],h))
                    }
                }
            }
            return new Det(f);
        }else{
            var f=[];
            Object.assign(f,this.arr);
            for(var i=0;i<f.length;i++){
                for(var j=i+1;j<f.length;j++){
                    var h=f[j][i]/f[i][i];
                    for(var k=0;k<f.length;k++){
                        f[j][k]=Operation.reduce(f[j][k],Operation.mult(f[i][k],h))
                    }
                }
            }
            return new Det(f);
        }
    }
}
module.exports=Det;