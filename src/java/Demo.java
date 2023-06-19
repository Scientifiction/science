import io.github.tcxone.cfh.ChemicalFormulaHelper;
import java.util.Scanner;

public class Demo{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        ChemicalFormulaHelper cfh = new ChemicalFormulaHelper();
        System.out.print(">>>");
        String str = sc.nextLine();
        System.out.println(cfh.calcMr(str));
        System.out.println(cfh.getDataInt(7,"YearDiscovered"));
        cfh.balanceEquation("CH4 + O2 -> CO2 + H2O");
    }
}