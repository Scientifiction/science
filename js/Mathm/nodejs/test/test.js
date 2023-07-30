const Mathm=require("../Mathm");
//console.log(Mathm.sigma(1,1000,(e)=>e))
//console.log(/*new Mathm.I(3,4).mult(new Mathm.I(1,2)).conjugate()*/new Mathm.I(0.1,0.8).mult(new Mathm.I(4,-2))/*.divide(new Mathm.I(4,-2))*/+"")
//console.log(Mathm.Matrix.diag(5).nummult(new Mathm.I(1,2)).trace()/*new Mathm.Matrix([[1,0,2],[-2,1,3]]).trans().trans()/*.nummult(2)/*.reduce(new Mathm.Matrix([[0,0,5],[7,5,0]]))*/)
//console.log(new Mathm.Det([[3,1,-1,2],[-5,1,3,-4],[2,0,1,-1],[1,-5,3,-3]]).totriangle())
//console.log(new Mathm.Fraction(3,10).add(new Mathm.I(2,3)))
//console.log(Mathm.log(2,1024))
console.log(Mathm.O.mult(new Mathm.I(1,2),new Mathm.Matrix([[1,2],[3,4]])).arr)