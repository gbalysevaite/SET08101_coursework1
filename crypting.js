let input = document.getElementById('input')
let output = document.getElementById('output')
let shiftKey = document.getElementById('shiftKey')
let keyword = document.getElementById('keyword')

function mod (n, m) {
  return ((n % m) + m) % m
}

function encrypt () {
  let shift = parseInt(shiftKey.value)
  if (input.value.length == 0) {
    alert('Input is empty')
    return
  }

  let text = input.value
  let encryptedText = ''
  let abc = /[a-z]/
  let ABC = /[A-Z]/
  for (let i = 0; i < text.length; i++) {
    let c
    if (abc.test(text.charAt(i))) {
      let x = mod((text.charCodeAt(i) - 97 + shift), 26)
      c = String.fromCharCode(x + 97)
    }
    else if (ABC.test(text.charAt(i))) {
      let x = mod((text.charCodeAt(i) - 65 + shift), 26)
      c = String.fromCharCode(x + 65)
    }
    else
      c = text.charAt(i)

    encryptedText += c
  }
  output.value = encryptedText
  console.log(encryptedText)
}

function decrypt () {
  let shift = parseInt(shiftKey.value)
  if (output.value.length == 0) {
    alert('Output is empty')
    return
  }

  let text = ''
  let encryptedText = output.value
  let abc = /[a-z]/
  let ABC = /[A-Z]/
  for (let i = 0; i < encryptedText.length; i++) {
    let c
    if (abc.test(encryptedText.charAt(i))) {
      let x = mod((encryptedText.charCodeAt(i) - 97 - shift), 26)
      c = String.fromCharCode(x + 97)
    }
    else if (ABC.test(encryptedText.charAt(i))) {
      let x = mod((encryptedText.charCodeAt(i) - 65 - shift), 26)
      c = String.fromCharCode(x + 65)
    }
    else
      c = encryptedText.charAt(i)

    text += c
  }
  input.value = text
  console.log(text)
}

function clearAll () {
  input.value = ''
  output.value = ''
}

function encrypt2 () {
  if (input.value.length == 0) {
    alert('Input is empty')
    return
  }

  let text = input.value
  let encryptedText = ''
  for (let i = 0; i < text.length; i++) {
    let c
    if ((text.charAt(i).toUpperCase() <= 'M') && (text.charAt(i).toUpperCase() >= 'A'))
      c = String.fromCharCode(text.charCodeAt(i) + 13)
    else if ((text.charAt(i).toUpperCase() >= 'N') && (text.charAt(i).toUpperCase() <= 'Z'))
      c = String.fromCharCode(text.charCodeAt(i) - 13)
    else
      c = text.charAt(i)

    encryptedText += c
  }
  output.value = encryptedText
}

function decrypt2 () {
  if (output.value.length == 0) {
    alert('Output is empty')
    return
  }

  let text = ''
  let encryptedText = output.value
  for (let i = 0; i < encryptedText.length; i++) {
    let c
    if ((encryptedText.charAt(i).toUpperCase() <= 'M') && (encryptedText.charAt(i).toUpperCase() >= 'A'))
      c = String.fromCharCode(encryptedText.charCodeAt(i) + 13)
    else if ((encryptedText.charAt(i).toUpperCase() >= 'N') && (encryptedText.charAt(i).toUpperCase() <= 'Z'))
      c = String.fromCharCode(encryptedText.charCodeAt(i) - 13)
    else
      c = encryptedText.charAt(i)

    text += c
  }

  input.value = text
}

function encrypt3 () {
  if (keyword.value.length == 0) {
    alert('Key is empty')
    return
  }

  let key = keywordToAscii(keyword.value)

  if (key.length == 0) {
    alert('Key has to have letters')
    return
  }
  output.value = vigenere(input.value, key)
}

function decrypt3 () {
  if (keyword.value.length == 0) {
    alert('Key is empty')
    return
  }

  let key = decryptingKey(keywordToAscii(keyword.value))

  if (key.length == 0) {
    alert('Key has to have letters')
    return
  }
  input.value = vigenere(output.value, key)
}

function keywordToAscii (keyword) {
  let key = []
  for (let i = 0; i < keyword.length; i++) {
    if (keyword.charCodeAt(i) >= 65 && keyword.charCodeAt(i) <= 122)
      key.push((keyword.charCodeAt(i) - 65) % 32) //because there is 32 characters between the same uppercase and lowercase letters
  }
  return key
}

function decryptingKey (key) {
  for (let i = 0; i < key.length; i++)
    key[i] = (26 - key[i]) % 26;
  return key
}

/*
 * Returns the result the Vigenère encryption on the given text with the given key.
 */

function vigenere (input, key) {
  let encryptedText = ''

  for (let i = 0, j = 0; i < input.length; i++) {
    let c
    if (input.charAt(i) >= 'A' && input.charAt(i) <= 'Z') {
      c = String.fromCharCode((input.charCodeAt(i) - 65 + key[j % key.length]) % 26 + 65)
      j++
    }
    else if (input.charAt(i) >= 'a' && input.charAt(i) <= 'z') {
      c = String.fromCharCode((input.charCodeAt(i) - 97 + key[j % key.length]) % 26 + 97)
      j++
    }
    else
      c = input.charAt(i)

    encryptedText += c
  }
  return encryptedText
}

function clearAll2 () {
  input.value = ''
  output.value = ''
  keyword.value = ''
}

function encrypt4 () {
  if (shiftKey.value == 1) {
    output.value = input.value
  }
  else {
    let len = input.value.length, result = ''
    let arr = []
    for (let i = 0; i < shiftKey.value; i++) {
      arr.push([])
    }

    let k = 0, id = 0
    for (let j = 0; j < len; j++) {
      id += k
      if (id === 0) {
        arr[id].push(input.value.charAt(j))
        k = 1
      }
      else if (id === shiftKey.value - 1) {
        arr[id].push(input.value.charAt(j))
        k = -1
      }
      else {
        arr[id].push(input.value.charAt(j))
      }
    }

    for (let i = 0; i < shiftKey.value; i++) {
      for (let j = 0; j < arr[i].length; j++)
        result += arr[i][j];
    }
    output.value = result
  }
}

function decrypt4 () {
  let len = output.value.length, result = ''
  let arr = []
  for (let i = 0; i < shiftKey.value; i++) {
    arr.push([])
    for (let j = 0; j < output.value.length; j++) {
      arr[i].push('')
    }
  }

  let id = 0
  for (let i = 0; i < shiftKey.value; i++) {
    let idx = i, k = 0
    while (idx < output.value.length) {

      arr[i][idx] = output.value.charAt(id)
      if (i === 0 || i === shiftKey.value - 1) {

        idx += (shiftKey.value * 2 - 2 )
      }
      else {
        idx += (2 * Math.abs(i - (k++ % 2 === 0 ? shiftKey.value : 0)))
      }
      id++
    }
  }

  for (let j = 0; j < output.value.length; j++)
    for (let i = 0; i < shiftKey.value; i++) {

      result += arr[i][j]
    }
  input.value = result
}


