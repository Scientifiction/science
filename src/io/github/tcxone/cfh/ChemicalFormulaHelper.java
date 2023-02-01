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

import java.util.Map;
import java.util.HashMap;

public class ChemicalFormulaHelper{


	public static double calcMr(String formula){
		Map<String, Integer> elements = new HashMap<>();
		int n = formula.length();
		String element = "";
		int count = 1;
		for(int i = 0; i < n; i++){
			char c = formula.charAt(i);
			if(Character.isUpperCase(c)){
				if(!element.isEmpty()){
					elements.put(element, count);
				}
				element = "" + c;
				count = 1;
			}else if(Character.isLowerCase(c)){
				element += c;
			}else if(Character.isDigit(c)){
				int end = i + 1;
				while(end < n && Character.isDigit(formula.charAt(end))){
					end++;
				}
				count = Integer.parseint(formula.substring(i, end));
				i = end - 1;
			}
		}
		if(!element.isEmpty()){
			elements.put(element, count);
		}
		double molecularMass = 0.0;
		for(Map.Entry<String, Integer> entry : elements.entrySet()){
			element = entry.getKey();
			count = entry.getValue();
			molecularMass += count * getAr(element);
		}
		return molecularMass;
	}


	//Obtain the relative atomic mass of an element
	public static int getAr(String formula){
		int ar = 0;
		//Element symbol
		String[] arrA = {"H","He","Li","Be","B","C","N","O","F","Ne"};
		//Relative atomic mass
		int[] arrB = {1,4,7,9,10,12,14,16,19,20};
		for(int i = 0;i < arrA.length;i++){
			if(arrA[i] == formula){
				ar = arrB[i];
				break;
			}
		}
		return ar;
	}


}


/* Copyright (c) 2022 Code Robertson */
