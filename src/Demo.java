import io.github.tcxone.cfh.ChemicalFormulaHelper;

public class Demo{
    public static void main(String args[]){
        ChemicalFormulaHelper cfh = new ChemicalFormulaHelper();
        System.out.println(cfh.calcMr("KMnO4"));
    }
}