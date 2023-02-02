// GitHub tcxone/ChemicalFormulaHelper
// v0.0.1
// MIT License
// Copyright (c) 2022 Code Robertson
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

package io.github.tcxone.cfh;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ChemicalFormulaHelper{
	private static final Pattern elementPattern = Pattern.compile("([A-Z][a-z]?)(\\d*)");
	public static double calcMr(String formula){
		Matcher matcher = elementPattern.matcher(formula);
		double mass = 0;
		while (matcher.find()){
			String elementSymbol = matcher.group(1);
			int elementCount = matcher.group(2).isEmpty() ? 1 : Integer.parseInt(matcher.group(2));
			mass += getAr(elementSymbol) * elementCount;
		}
		return mass;
	}


	//Obtain the relative atomic mass of an element
	public static double getAr(String formula){
		double ar = 0.0;
		//Element symbol
		String[] arrA = {"H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Fl","Lv"};
		//Relative atomic mass
		double[] arrB = {1,4,7,9,11,12,14,16,19,20,23,24,27,28,31,32,35.5,40,39,40,45,48,51,52,55,56,59,59,64,65,70,73,75,79,80,84,85,87,89,91,93,96,98,101,103,106,108,112,115,119,122,128,127,131,133,137,139,140,141,144,145,150,152,157,159,162,165,167,169,173,175,178,181,184,186,190,192,195,197,201,204,207,209,209,210,222,223,226,227,232,231,238,239,243,245,247,249,253,254,259,260,261,264,269,270,273,274,272,278,283,282,287,291,295};
		for (int i = 0;i < arrA.length;i++){
			if(arrA[i].equals(formula)){
				ar = arrB[i];
				break;
			}
		}
		return ar;
	}


}


/* Copyright (c) 2022 Code Robertson */
