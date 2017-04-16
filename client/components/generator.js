function capitalize(s){
	return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
}

/*
	Thanks to Alexandre Giraud. Some of this code is based off his work on fantasygen.
*/

function Pointer(char) {
	this.character = char;
	this.adjacent = [];
}

function addWord(word, pointer, reg, order) {
	var temp = pointer,
	key = '',
	char, 
	newPointer;

	for (var i = 0; i < word.length; i += 1) {
		char = word[i];
		key += char;
		if (key.length > order) {
			key = key.substr(1);
		}
		newPointer = reg[key];

		if (!newPointer) {
			newPointer = new Pointer(char);
			reg[key] = newPointer;
		}

		temp.adjacent.push(newPointer);
		temp = newPointer;
	}

	temp.adjacent.push(null);	
}

module.exports.generate = function(words, max, maxAttemps){
	var mainNode = new Pointer(''),
	reg = {},
	word = '',
	attemps = 0,
	nextNodeIndex,
	currentNode;

	for(var i = 0; i < words.length; i++){
		addWord(words[i], mainNode, reg, 3);
	}

	while(word.length == 0){
		if (attemps++ >= maxAttemps){
			return;
		}

		nextNodeIndex = Math.floor(Math.random() * mainNode.adjacent.length);
		currentNode = mainNode.adjacent[nextNodeIndex];
		word = '';

		while (currentNode && word.length <= max) {
			word += currentNode.character;
			nextNodeIndex = Math.floor(Math.random() * currentNode.adjacent.length);
			currentNode = currentNode.adjacent[nextNodeIndex];
		}
	}

	return capitalize(word);
}
