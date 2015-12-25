/**Returns true if this string contains the string parameter*/
if(String.prototype.contains === undefined){String.prototype.contains=function(text) {
    return (this.indexOf(text) !== -1);
};}
/**Returns true if this string ends with the string parameter*/
if(String.prototype.endsWith === undefined){String.prototype.endsWith=function(suffix) {
    return (this.indexOf(suffix, (this.length - suffix.length)) !== -1);
};}
/**Returns true if this string starts with the string parameter*/
if(String.prototype.startsWith === undefined){String.prototype.startsWith=function(prefix) {
    return (this.indexOf(prefix) === 0);
};}
/**Same as native version:
deletes all leading and trailing spaces from a string (returns new version).*/
if(String.prototype.trim === undefined){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};}
    //regex | is for the entire expression, same as /(?:^\s+|\s+$)/g I don't like how | does that
/**Removes all elements from an array. This must be used over ar=[]; if ar is references anywhere else.*/
Array.prototype.clear=function(){while(this.length > 0) this.pop();};
/**For each element of this array a type strict comparison is done against the parameter and returns true if any of them match*/
if(Array.prototype.contains === undefined){Array.prototype.contains=function(obj){
    for(var i=0; i < this.length; i++){if(this[i] === obj) return true;}
    return false;
};}
/**Returns a shallow copy of this array.*/
Array.prototype.copy=function(){return this.slice(0);};  //shallow copy
/**Same as native version:
The indexOf() method returns the first index at which a given element can be found (type strict) in this array,
or -1 if it is not present.*/
if(Array.prototype.indexOf === undefined){
   Array.prototype.indexOf=function (obj, fromIndex) {
       if(fromIndex === undefined) fromIndex = 0;  //if none provided
       else if(fromIndex < 0) fromIndex=Math.max(0, this.length + fromIndex);  //can index from end
       for(var i=fromIndex; i < this.length; i++){if(this[i] === obj) return i;}
       return -1;
   };
}
/**Returns true if this array contains no elements, false otherwise*/
Array.prototype.isEmpty=function(){return (this.length === 0);};
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
