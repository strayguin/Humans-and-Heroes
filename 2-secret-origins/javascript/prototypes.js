/**Returns true if this string contains the string parameter*/
if(String.prototype.contains === undefined){String.prototype.contains=function(text) {
    return (this.indexOf(text) !== -1);
};}
/**Capitalizes the first character of every word.*/
String.prototype.toTitleCase=function() {
  return this.replace(/\w+ */g, function(match){
    return match.charAt(0).toUpperCase() + match.substring(1);
  });
};

/**For each element of this array a type strict comparison is done against the parameter and returns true if any of them match*/
if(Array.prototype.contains === undefined){Array.prototype.contains=function(obj){
    return (this.indexOf(obj) !== -1);  //Array.prototype.indexOf is type strict (using ===)
};}
/**Returns true if this array contains no elements, false otherwise*/
if(Array.prototype.isEmpty === undefined){Array.prototype.isEmpty=function(){return (this.length === 0);};}
/**Removes all elements from an array. This must be used over ar=[]; if ar is references anywhere else.*/
Array.prototype.clear=function(){while(this.length > 0) this.pop();};
/**Returns a shallow copy of this array.*/
Array.prototype.copy=function(){return this.slice(0);};
/**Returns the last element of this array or undefined if this array has no elements*/
Array.prototype.last=function(){return this[this.length-1];};
/**Removes the element from this array that is located at the index specified.
Negative index is counted from the end.
If the index does not exist nothing happens.
This array is changed and nothing is returned.*/
Array.prototype.remove=function(index){if(typeof(index) === 'number' && isFinite(index)) this.splice(index, 1);};
/**Removes the first element from this array that is equal to (type strict) the value specified.
If the value is not found, nothing happens.
This array is changed and nothing is returned.*/
Array.prototype.removeByValue=function(value)
{
    var index = this.indexOf(value);
    if(-1 === index) return;  //not found
    this.remove(index);
};
