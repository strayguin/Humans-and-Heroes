//TODO: js doc all. I guess
if(String.prototype.trim == undefined){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};}
if(String.prototype.endsWith == undefined){String.prototype.endsWith=function(suffix) {
    return (this.indexOf(suffix, this.length - suffix.length) !== -1);
};}
if(String.prototype.startsWith == undefined){String.prototype.startsWith=function(prefix) {
    return (this.indexOf(prefix) === 0);
};}
if(Array.prototype.indexOf == undefined){  //just like native version
   Array.prototype.indexOf=function (obj, fromIndex) {  //overrides not overloads
       if(fromIndex == undefined) fromIndex=0;  //if none provided
       else if(fromIndex < 0) fromIndex=Math.max(0, this.length + fromIndex);  //can index from end
      for(var i=fromIndex; i < this.length; i++){
          if(this[i] === obj) return i;
      }
       return -1;
   };
}
if(Array.prototype.contains == undefined){Array.prototype.contains=function(obj){
   for(var i=0; i < this.length; i++){
       if(this[i] === obj) return true;
   }
    return false;
};}
Array.prototype.last=function(){return this[this.length-1];};
Array.prototype.isEmpty=function(){return (this.length === 0);};
Array.prototype.copy=function(){return this.slice(0);};  //shallow copy
Array.prototype.remove=function(index){return this.splice(index, 1);};
Array.prototype.removeByValue=function(value){return this.remove(this.indexOf(value));};
if(window.$ == undefined){function $(name){return document.getElementById(name.substring(1));};}
//I could use $('#transcendence') over document.getElementById('transcendence'); but why bother

//thanks to hasOwnProperty the hash is safe from Object.prototype tampering. assuming Object.hasOwnProperty hasn't been changed
function Hash(obj, defaultValue){  //based on http://www.mojavelinux.com/articles/javascript_hashes.html
    var items={};  //new object (built in hash)
   //constructor:
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            items[p]=obj[p];  //overrides if repeated key
        }
    }
    //constructor example: var myHash=new Hash({'One': 'Two', 'Blue': true, 'Protection': 0}, 'Not Found');
    //empty hash example: var myHash=new Hash({}, 'Not Found');

    this.add=function(key, value)
    {
        if(this.containsKey(key)) return false;
        items[key]=value;  //isn't push since this needs to be by name
        return true;
    };

    this.set=function(key, value)
    {
        if(!this.containsKey(key)) return false;
        items[key]=value;
        return true;
    };

    this.get=function(key) {
        if(this.containsKey(key)) return items[key];
        return defaultValue;  //might be undefined
    };

    this.containsKey=function(key){return items.hasOwnProperty(key);};

    this.remove=function(key)
    {
         if(!this.containsKey(key)) return false;
         delete items[key];
         return true;
    };

    this.getAllKeys=function()
    {
        var keys=[];
        for (var k in items) {
            if (this.containsKey(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    this.getAllValues=function()
    {
        var values=[];
        for (var k in items) {
            if (this.containsKey(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };

    this.clear=function(){items={};};

   this.toSource=function()  //shows code to create it
   {
       var output='Hash.makeFromArray([';
       var keys=this.getAllKeys().sort();
      for (var i=0; i < keys.length; i++)
      {
          output+='[';
          if(typeof(keys[i]) === 'string') output+='"';
          output+=keys[i];
          if(typeof(keys[i]) === 'string') output+='"';
          output+=', ';

          var value=items[keys[i]];
          if(typeof(value) === 'string') output+='"';
          output+=value;
          if(typeof(value) === 'string') output+='"';
          output+=']';
          if(i+1 < keys.length) output+=', ';  //if not last add a comma
      }
       output+='], ';
       if(typeof(defaultValue) === 'string') output+='"';
       output+=defaultValue;
       if(typeof(defaultValue) === 'string') output+='"';
       output+=')';
       return output;
   };
};
Hash.makeFromArray=function (arrayGiven, defaultValue){
    var myHash=new Hash({}, defaultValue);  //empty
   for (var i=0; i < arrayGiven.length; i++) {
       myHash.add(arrayGiven[i][0], arrayGiven[i][1]);
       //constructor example: var myHash=Hash.makeFromArray([['One', 'Two'], ['Blue', true], ['Protection', 0]], 'Not Found');
       //empty hash example: var myHash=Hash.makeFromArray([], 'Not Found');
   }
    return myHash;
};

//note: chrome does not make this pointless because this allows me to see how I got here and is easily scrollable
function LoggerObject(enabledPassed){
    //based on web file: www.wired.com/wired/webmonkey/stuff/simpledebug.js
    //from web page: http://www.webmonkey.com/2010/02/javascript_debugging_for_beginners/
    //Simple Debug, written by Chris Klimas licensed under the GNU LGPL. http://www.gnu.org/licenses/lgpl.txt

    var enabled=enabledPassed;
    if(enabled == undefined) enabled=true;
    var depth=0;
    var log_messages=new Array();

   this.clear=function(){depth=0; log_messages=new Array();};
   this.on=function(){enabled=true;};
   this.off=function(){enabled=false;};
   this.up=function(){depth--;};
   this.down=function(){depth++;};
   this.forceLogFunction=function(thisObject, functionName, parameterArray){
       var enabledOld=enabled;
       enabled=true;  //force on
       var returnValue=functionName.apply(thisObject, parameterArray);
       enabled=enabledOld;  //reset back
       return returnValue;
   };
   this.forceLogText=function(textToLog){
       var enabledOld=enabled;
       enabled=true;  //force on
       this.log(textToLog);
       enabled=enabledOld;  //reset back
   };
   this.trace=function(thisObject, functionName, parameterArray){
       depth++;
       var returnValue=functionName.apply(thisObject, parameterArray);
       depth--;
       return returnValue;
   };
   this.log_same=function(message){if(enabled) log_messages[log_messages.length-1]+=message;};
   /** Logs a message. Every second, all logged messages are displayed
    in an alert box. This saves you from having to hit Return a ton
    of times as your script executes.*/
   this.log=function(message)
   {
       if(!enabled) return;  //all other log functions come here
       var whiteSpace='';
       for(var i=0; i < depth; i++){whiteSpace+='   ';}
       log_messages.push(whiteSpace+message);
   };
   this.dump_log=function()
   {
       var message=this.print();
       this.clear();
       return message;
   };
   this.print=function()
   {
       var message='';
       for(var i=0; i < log_messages.length; i++){message +=log_messages[i]+'\n';}
       return message;
   };
   /** Logs the interesting properties an object possesses. Skips functions*/
   this.log_all_properties=function(obj)
   {
       if(!obj){this.log('Object is undefined'); return;}
       var message='Object possesses these properties:\n';
      for (var i in obj)
      {
          if(!(obj[i] instanceof Function) && obj[i] != undefined) message +=i + ', ';
      }
       message=message.substr(0, message.length - 2);  //remove the last ', '
       this.log(message);
   };
   /** Like log_all_properties(), but displays values for the properties. The output
    for this can get very large -- for example, if you are inspecting
    a DOM element.*/
   this.log_all_property_values=function(obj)
   {
       if(!obj){this.log('Object is undefined'); return;}
       var message='';
      for (var i in obj)
      {
          if(!(obj[i] instanceof Function) && obj[i] != undefined && obj[i] != '') message +=i + '=' + obj[i] + '\n';
      }
       this.log(message);
   };
   this.log_all_functions=function(obj)
   {
       if(!obj){this.log('Object is undefined'); return;}
       var message='Object possesses these functions:\n';
      for (var i in obj)
      {
          if(obj[i] instanceof Function && obj[i] != undefined) message +=i + ', ';
      }
       message=message.substr(0, message.length - 2);  //remove the last ', '
       this.log(message);
   };
};
var SelectUtil={};
SelectUtil.getOptionById=function(optionID){
    var element=document.getElementById(optionID);
    if(element == undefined) return;  //this line is why you shouldn't just SelectUtil.getOptionById(id).text
    return element.options[element.selectedIndex];
};
SelectUtil.getTextById=function(optionID){
    var element=SelectUtil.getOptionById(optionID);
    if(element == undefined) return;  //this line is why you shouldn't just SelectUtil.getOptionById(id).text
    return element.text;
};
SelectUtil.addAllOptions=function(optionID, optionTextArray){
    var element=document.getElementById(optionID);
   for (var i=0; i < optionTextArray.length; i++){
       element.add(new Option(optionTextArray[i]));  //added to the end
   }
};
SelectUtil.removeByText=function(optionID, textToRemove){
    var element=document.getElementById(optionID);
   for (var i=0; i < element.options.length; i++)
   {
       if(element.options[i].text === textToRemove){element.remove(i); return true;}  //found
   }
    return false;  //not found
};
SelectUtil.removeAllByText=function(optionID, optionTextArray){
   for (var i=0; i < optionTextArray.length; i++){
       SelectUtil.removeByText(optionID, optionTextArray[i]);
   }
};
SelectUtil.sortByOptionText=function(optionID){
    var element=document.getElementById(optionID);
    var nameArray=[];
   while (element.options.length > 0)
   {
       nameArray.push(element.options[0].text);  //populate names
       element.remove(0);  //remove all options
   }
    nameArray.sort();  //alphabetical ascending is default
    SelectUtil.addAllOptions(optionID, nameArray);  //add them all back
};
SelectUtil.containsText=function(optionID, textToFind){
    var element=document.getElementById(optionID);
   for (var i=0; i < element.options.length; i++)
   {
       if(element.options[i].text === textToFind) return true;
   }
    return false;
};
/**This searches each option text of the select id given for the text given, when found the select is set to that index*/
SelectUtil.setText=function(optionID, textToSet){
    var element=document.getElementById(optionID);
    if(element == undefined) return;
   for (var i=0; i < element.options.length; i++)
   {
       if(element.options[i].text === textToSet){element.selectedIndex=i; return;}
       //onChange doesn't auto trigger when set like this
   }
};
/**Simply calls SelectUtil.setText then onchange() for that element*/
SelectUtil.changeText=function(optionID, textToSet){
    var element=document.getElementById(optionID);
    if(element == undefined) return;
    var oldIndex=element.selectedIndex;
    SelectUtil.setText(optionID, textToSet);
    if(element.selectedIndex !== oldIndex) element.onchange();
};

function sanitizeNumber(numberGiven, minimum, defaultValue){
    var value=numberGiven+'';  //convert the type in case it is something that isn't int or string
    if(value === '') return defaultValue;
    if(isNaN(value)) return defaultValue;
    value=parseInt(value);  //int includes Math.floor()
    if(value < minimum) return minimum;  //make minimum -Infinity to skip this
    return value;
};
function remakeArray(commonArray, newElements){
    var result=commonArray.copy();  //shallow
   for(var i=0; i < newElements.length; i++)
       {result.push(newElements[i]);}
    return result.sort();  //alphabetical ascending is default
};
//no one allows this by default so use: C:\Program Files (x86)\Google\Chrome\Application>chrome.exe --allow-file-access-from-files
//must first close all chrome
function readXMLAsString(xmlLocation){
    var xmlhttp;
    if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}  //code for IE7+, Chrome, Firefox, Opera, Safari
    else{xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');}// code for IE6, IE5
    xmlhttp.open('GET', xmlLocation, false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    var xmlText=new XMLSerializer().serializeToString(xmlDoc);
    return xmlText;
};
function stringDiffIndex(stringA, stringB){
    for(var i=1; i < stringA.length; i++)
       {if(stringA.substring(i-1, i) !== stringB.substring(i-1, i)) return (i-1);}
    if(stringB.length > stringA.length) return stringA.length;
    return -1;  //same string
};
function stringDiffDisplay(stringA, stringB){
    var diffIndex=stringDiffIndex(stringA, stringB);
    if(diffIndex === -1) return 'Matches';
    return ('|'+stringA.charCodeAt(diffIndex)+'| vs |'+stringB.charCodeAt(diffIndex)+'|');
};
