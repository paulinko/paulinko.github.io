var lineLength = 0;

replaceDict = {
	">":"<",
	"<":">",
	"E":"3",
	"3":"E",
	"Z":"5",
	"[":"]",
	"]":"[",
	"{":"}",
	"}":"{",
	"(":")",
	")":"(",
	"C":")",
	"J":"L",
	"\\":"/",
	"L":"J",
	"/": "\\",
	"9":"F",
	"F":"9",
	";":":"

}



// Object.prototype.getKeyByValue = function( value ) {
//     for( var prop in this ) {
//         if( this.hasOwnProperty( prop ) ) {
//              if( this[ prop ] === value )
//                  return prop;
//         }
//     }
// }

replaceAll = function(str, search, replacement) {
    var target = str;
    return target.split(search).join(replacement);
};


reverse = function(str){
	return str.split("").reverse().join("")
}


/*function reverseAscii(str){
	return str.replaceAll("/","\\").replaceAll("/","\\")
}*/
function replaceStrChar(str, idx, replacement){
	console.log("str:")
	console.log(str)
	console.log("idx:" + idx)
	console.log("replacementL:" +replacement.length)
	console.log("Substr:" + str.substr(idx + replacement.length))
	subPos = parseInt(idx) + replacement.length
	console.log(subPos +"sub")
	return str.substr(0, idx) + replacement+ str.substr(subPos);
}

function formatInput(input_arr){
	replace_arr = [];
	for (i in input_arr){
		str = reverse(input_arr[i]);
		replace_arr.push(str);
	}
	return replace_arr;
}

function replaceChars(format_arr){
	console.log(format_arr)
	for (r in format_arr){
		for (i in format_arr[r]){
			let char = format_arr[r][i];
			if (replaceDict[char] != undefined){
				console.log("replace" + replaceDict[char])
				console.log(format_arr[r])
				format_arr[r] = replaceStrChar(format_arr[r], i , replaceDict[char]);
				
			}
			// else{
			// 	r_char = replaceDict.getKeyByValue(char)
			// 	if (r_char != undefined){
			// 		format_arr[r][i] = r_char
			// 	}
			// }
		}

	}
	return format_arr;
}

function getMaxLengthOfLines(arr){
	var longest = 0;
	for (a in arr){
		if (arr[a].length > longest){
			longest = arr[a].length;
		}
	}

	lineLength =  longest;
	return longest;
}

function padAsciiLines(arr){
	maxLen = getMaxLengthOfLines(arr)
	for (a in arr){
		arr[a] += " ".repeat((maxLen - arr[a].length))
	}
	return arr
}

function reverseAscii(){
	content = document.getElementById("in");
	output_div = document.getElementById("out");
	input_arr = content.value.split("\n");
	pad_arr = padAsciiLines(input_arr);
	format_arr = formatInput(pad_arr);
	for (i in format_arr){

	}
	output = replaceChars(format_arr).join("\n");
	output_div.value = output

}

 	