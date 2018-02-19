var input = document.getElementById('input');
var output = document.getElementById('output');
var shiftKey = document.getElementById('shiftKey');
var keyword = document.getElementById('keyword');

function mod(n, m){
	return ((n % m) + m) % m;
}

function encrypt(){
	let shift = parseInt(shiftKey.value); 
	if (input.value.length == 0){
		alert("Input is empty");
		return;
	}
	
	let text = input.value;
	let encryptedText = "";
	var abc = /[a-z]/;
	var ABC = /[A-Z]/;
	for(let i = 0; i < text.length; i++){ 
		let c;
		if(abc.test(text.charAt(i)))
		{
			var x = mod((text.charCodeAt(i) - 97 + shift), 26);
			c = String.fromCharCode(x + 97);
		}
		else if(ABC.test(text.charAt(i)))
		{
			var x = mod((text.charCodeAt(i) - 65 + shift), 26);
			c = String.fromCharCode(x + 65);
		}
		else 
			c = text.charAt(i); 	
		
		encryptedText += c;
	}		
	output.value = encryptedText;
	console.log(encryptedText);
}

function decrypt(){
	let shift = parseInt(shiftKey.value); 
	if (output.value.length == 0){
		alert("Output is empty");
		return;
	}
	
	let text = "";
	let encryptedText = output.value;
	var abc = /[a-z]/;
	var ABC = /[A-Z]/;
	for(let i = 0; i < encryptedText.length; i++){ 
		let c;
		if(abc.test(encryptedText.charAt(i)))
		{
			var x = mod((encryptedText.charCodeAt(i) - 97 - shift), 26);
			c = String.fromCharCode(x + 97);
		}
		else if(ABC.test(encryptedText.charAt(i)))
		{
			var x = mod((encryptedText.charCodeAt(i) - 65 - shift), 26);
			c = String.fromCharCode(x + 65);
		}
		else 
			c = encryptedText.charAt(i); 	
		
		text += c;
	}		
	input.value = text;
	console.log(text);
}

function clearAll(){
	input.value = '';
	output.value = '';
}

function encrypt2(){ 
	if (input.value.length == 0){
		alert("Input is empty");
		return;
	}

	let text = input.value;
	let encryptedText = "";
	for(let i = 0; i < text.length; i++){ 
		let c;
	if ((text.charAt(i).toUpperCase() <= "M") && (text.charAt(i).toUpperCase() >= "A"))
		c = String.fromCharCode(text.charCodeAt(i) + 13);
	else if ((text.charAt(i).toUpperCase() >= "N") && (text.charAt(i).toUpperCase() <= "Z"))
		c = String.fromCharCode(text.charCodeAt(i) - 13); 
	else
		c = text.charAt(i);  	

	encryptedText += c;
	}
output.value = encryptedText;
}

function decrypt2(){
	if (output.value.length == 0){
		alert("Output is empty");
		return;
	}
	
	let text = "";
	let encryptedText = output.value;
	for(let i = 0; i < encryptedText.length; i++){ 
		let c;
	if ((encryptedText.charAt(i).toUpperCase() <= "M") && (encryptedText.charAt(i).toUpperCase() >= "A"))
		c = String.fromCharCode(encryptedText.charCodeAt(i) + 13);
	else if ((encryptedText.charAt(i).toUpperCase() >= "N") && (encryptedText.charAt(i).toUpperCase() <= "Z"))
		c = String.fromCharCode(encryptedText.charCodeAt(i) - 13); 
	else
		c = encryptedText.charAt(i);  
	
	text += c;
	}
	
	input.value = text;
}

function encrypt3(){
	if (keyword.value.length == 0){
		alert("Key is empty");
		return;
	}
	
	var key = keywordToAscii(keyword.value);

	if (key.length == 0) {
		alert("Key has to have letters");
		return;
	}
	output.value = vigenere(input.value, key);
}

function decrypt3(){
	if (keyword.value.length == 0){
		alert("Key is empty");
		return;
	}
	
	var key = decryptingKey(keywordToAscii(keyword.value));
	
	if (key.length == 0) {
		alert("Key has to have letters");
		return;
	}
	input.value = vigenere(output.value, key);
}

function keywordToAscii(keyword){
	var key = [];
	for (var i = 0; i < keyword.length; i++) {
		if (keyword.charCodeAt(i) >= 65 && keyword.charCodeAt(i) <= 122)
			key.push((keyword.charCodeAt(i) - 65) % 32);
	}
	return key;
}

function decryptingKey(key)
{
	for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	return key;
}
/* 
 * Returns the result the Vigenère encryption on the given text with the given key.
 */
 
function vigenere(input, key){
	var encryptedText = "";

	for (var i = 0, j = 0; i < input.length; i++) {
		var c;
		if (input.charAt(i) >= "A" && input.charAt(i) <= "Z") 
		{
			c = String.fromCharCode((input.charCodeAt(i) - 65 + key[j % key.length]) % 26 + 65);
			j++;
		}
		else if (input.charAt(i) >= "a" && input.charAt(i) <= "z") {
			c = String.fromCharCode((input.charCodeAt(i) - 97 + key[j % key.length]) % 26 + 97);
			j++;
		}
		else 
			c = input.charAt(i);
		
		encryptedText += c;
	}
	return encryptedText;
}

function clearAll2(){
	input.value = '';
	output.value = '';
	keyword.value = '';
}

function makeMap(len, n) {
    var pip, period = 2 * (n - 1);
    var rows = Array.apply( null, Array(n)).map( function(){ return []}); // array of arrays
    for(var i = 0; i < len; i++) {
      pip = i % period;
      r = pip < (n - 1) ? pip : period - pip; 
      rows[r] = i;
    }
    return Array.concat.apply(null,rows);
  }
  
  function decrypt4() {
    var len = output.value.length, mapped = makeMap(len, shiftKey.value), result = "";
    return output.value.split('').reduce(function(p,c,i,a)
	{ return p + a[mapped.indexOf(i)]},'');
    for(var i = 0; i < len; i++) 
		result += output.value.substr( mapped.indexOf( i), 1);
    input.value = result;  
  }
  
  function encrypt4(){
    var len = input.value.length, mapped = makeMap(len, shiftKey.value), result = "";
    for(var i = 0; i < len; i++) 
		result += input.value.substr( mapped[ i], 1);
    output.value = result; 
  }

