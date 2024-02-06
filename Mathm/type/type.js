const TYPE={
    "order":["RealNumber","I","Fraction","Det","Matrix"],
    "dict":{
        "M":"Matrix",
        "I":"I",
        "D":"Det",
        "V":"Vector",
        "F":"Fraction"
    },
    "dictmap":["M","I","D","V","F"],
    "O":{
        "+":"add",
        "-":"reduce",
        "*":"mult",
        "/":"divide"
    }
};
module.exports=TYPE;