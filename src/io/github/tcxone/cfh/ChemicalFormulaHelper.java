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
	private static final Pattern elementPattern = Pattern.compile("([A-Z][a-z]?)(\d*)");
	public static double calcMr(String formula){
		Matcher matcher = elementPattern.matcher(formula);
		double mass = 0;
		while (matcher.find()){
			String elementSymbol = matcher.group(1);
			int elementCount = matcher.group(2).isEmpty() ? 1 : Integer.parseint(matcher.group(2));
			mass += getAr(elementSymbol) * elementCount;
		}
		return mass;
	}


	//Obtain the relative atomic mass of an element
	public static int getAr(String formula){
		int ar = 0;
		//Element symbol
		String[] arrA = {"H","He","Li","Be","B","C","N","O","F","Ne"};
		//Relative atomic mass
		int[] arrB = {1,4,7,9,10,12,14,16,19,20};
		for (int i = 0;i < arrA.length;i++){
			if(arrA[i] == formula){
				ar = arrB[i];
				break;
			}
		}
		return ar;
	}


}


/* Copyright (c) 2022 Code Robertson */
