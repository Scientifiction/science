// GitHub tcxone/ChemicalFormulaHelper

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

public class ChemicalFormulaHelper{


	//Calculate the relative mass of the chemical formula
	public static int calcMr(String chemicalFormula){
		int n = 0; //Chemical formula relative mass
		int r = 0 , t = 0 , x = 0; //Small variable
		char[] arrCF = chemicalFormula.toCharArray(); //Chemical formula String to array
		for(int i = 0;i < arrCF.length;i++){
			try{
				if((typer(arrCF[i]) == 2) && /*(checkCapitalLetters(chemicalFormula.substring(i + 1,arrCF.length)))*/i < 4){ //If capital letters
					if(typer(arrCF[i + 1]) == 3){ //If the next character is a lowercase letter
						r = i;
						while(!(typer(arrCF[r]) == 1)){ //Stop if it is a number
							r++;
						}
						t = r;
						while(!(typer(arrCF[t]) == 2)){ //Stop if it is a capital letter
							t++;
						}
						n = n + ((getAr(chemicalFormula.substring(i,r))) * (stringToInt(chemicalFormula.substring(r,t))));
					}else if(typer(arrCF[i + 1]) == 2){ //If the next character is an uppercase letter
						n = n + (getAr(chemicalFormula.substring(i,(i + 1))));
					}else if(typer(arrCF[i + 1]) == 1){ //If the next character is a number
						x = i;
						while(!(typer(arrCF[x]) == 1)){ //Stop if it is a number
							x++;
						}
						n = n + ((getAr(chemicalFormula.substring(i,(i + 1)))) * (stringToInt(chemicalFormula.substring((i + 1),(x + 1)))));
					}
				}else{
					//No operation
				}
			}catch(Exception e){
				System.out.println("Something went wrong.");
			}
		}
		//Return Results
		return n;
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


	//Convert a numeric string to int
	public static int stringToInt(String aStr){
		int number = 0;
		char[] arr = aStr.toCharArray();
		int length = aStr.length(); //Error getting length from array, so use String length
		for(int i = 0;i < length;i++){
			number = number + (int)(charToInt(arr[i]) * Math.pow(10,(length - (i + 1))));
		}
		return number;
	}


	//Convert a numeric char to int
	public static int charToInt(char aChar){
		int number = 0;
		switch(aChar){
			case '0':
				number = 0;
				break;
			case '1':
				number = 1;
				break;
			case '2':
				number = 2;
				break;
			case '3':
				number = 3;
				break;
			case '4':
				number = 4;
				break;
			case '5':
				number = 5;
				break;
			case '6':
				number = 6;
				break;
			case '7':
				number = 7;
				break;
			case '8':
				number = 8;
				break;
			case '9':
				number = 9;
				break;
			default:
				number = 0;
				break;
		}
		return number;
	}


	//Char content judgment: numeric reply 1, uppercase letter reply 2, lowercase letter reply 3, other replies 4
	public static int typer(char aChar){
		int type = 0;
		int n = (int)aChar;
		if(n >= 48 && n <= 57){
			type = 1;
		}else if(n >= 65 && n <= 90){
			type = 2;
		}else if(n >= 97 && n <= 122){
			type = 3;
		}else{
			type = 4;
		}
		return type;
	}


	public static boolean checkCapitalLetters(String str){
		boolean b = false;
		char[] arr = str.toCharArray();
		for(int i = 0;i < arr.length;i++){
			if(typer(arr[i]) == 2){
				b = true;
			}
		}
		return b;
	}


}

/* Copyright (c) 2022 Code Robertson */