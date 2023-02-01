# ChemicalFormulaHelper

v0.0.1

## Methods and parameters

#### `double calcMr(String chemicalFormula)`

```
parameter
String of chemical formula

Return value
Relative molecular weight of chemical formula
```

## Precautions

Only the top 10 relative qualities of elements are given. If you want to use other relative qualities, please add them in the `getAr()` method. Note that the element symbols should be one-to-one corresponding to their relative quality, each in two arrays with equal serial numbers. The relative mass can only be taken as an integer.

Please ensure that the chemical formula entered is correct and case sensitive, otherwise the calculation will be wrong. Currently, only chemical formulas similar to `KMnO4` are supported. It is not supported to use `•`, such as ammonia monohydrate `NH3 • H2O`. It also does not support those with `()` or `[]`, such as calcium hydroxide `Ca(OH)2`, but can be disassembled and written as `CaOHOH` or `CaO2H2`.

The atomic subscript should not be too large, such as `C10000000000H2000000002`. Try to control it to `1-10000`(it is OK not to exceed `int`), otherwise the calculation will be wrong.

Do not add a coefficient in front of the chemical formula, such as `2KCl`, or the coefficient will be ignored.

In short, the format is `XaYzb` , where `a` and `b` are numbers, `X` and `Yz`are element symbols, and `1`is omitted.
