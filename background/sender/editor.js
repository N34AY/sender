function replaceTagsInMessage(innerMessage, man) {
  var message = innerMessage
  while (message.indexOf('{name}') != -1) {
    var message = message.replace('{name}', man.n)
    message = message
  }
  while (message.indexOf('{age}') != -1) {
    var message = message.replace('{age}', man.e)
    message = message
  }
  return message
}
function useSynonyms(text) {
  function chooseRandomWord(string) {
    function random(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
    var words = string.split(',')
    console.log('words: ' + words)
    var word = words[random(0, words.length)]
    console.log('word: ' + word)
    return word
  }
  while (text.indexOf('{', 0) != -1) {
    var obrace = text.indexOf('{', 0)
    var cbrace = text.indexOf('}', 0)
    var synblock = text.substr(obrace, cbrace - obrace)
    synblock = synblock.replace('{', '')
    synblock = synblock.replace('}', '')
    var repword = chooseRandomWord(synblock)
    var text = text.replace('{' + synblock + '}', repword)
  }
  return text
}
