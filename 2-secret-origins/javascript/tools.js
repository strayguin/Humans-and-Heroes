if(!Array.prototype.indexOf){  //just like native version
   Array.prototype.indexOf = function (obj, fromIndex) {  //overrides not overloads
       if(fromIndex == null) fromIndex = 0;  //if none provided
       else if(fromIndex < 0) fromIndex = Math.max(0, this.length + fromIndex);  //can index from end
      for(var i = fromIndex; i < this.length; i++){
          if(this[i] === obj) return i;
      }
       return -1;
   };
}
if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};}
if(!String.prototype.endsWith){String.prototype.endsWith = function(suffix) {
    return (this.indexOf(suffix, this.length - suffix.length) !== -1);
};}
if(!String.prototype.startsWith){String.prototype.startsWith = function(prefix) {
    return (this.indexOf(prefix) === 0);
};}
//if(!Array.prototype.contains){  //always do this so I can override contains
   Array.prototype.contains=function(obj){
      for(var i = 0; i < this.length; i++){
          if(this[i] == obj) return true;
      }
       return false;
   };
   /*Array.prototype.containsExact=function(obj){  //I just don't need exact
      for(var i = 0; i < this.length; i++){
          if(this[i] === obj) return true;
      }
       return false;
   };*/
//}
//TODO: put all non-objects in a ToolBox object
function convertToHash(arrayGiven, defaultValue){
    var myHash = new Hash({}, defaultValue);  //empty
   for (var i=0; i < arrayGiven.length; i++) {
       myHash.add(arrayGiven[i][0], arrayGiven[i][1]);
       //constructor example: var myHash = new Hash([["One", "Two"], ["Blue", true], ["Protection", 0]], "Not Found");
       //empty hash example: var myHash = new Hash([], "Not Found"); or var myHash = new Hash(new Array(), "Not Found");
   }
    return myHash;
};
function Hash(obj, defaultValue){  //based on http://www.mojavelinux.com/articles/javascript_hashes.html
    var length = 0;
    this.items = {};  //new object (built in hash)
   //constructor:
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p]=obj[p];
            length++;
        }
    }
    //constructor example: var myHash = new Hash({"One": "Two", "Blue": true, "Protection": 0}, "Not Found");
    //empty hash example: var myHash = new Hash({}, "Not Found");

    this.add = function(key, value)
    {
        if(this.containsKey(key)) return false;
        length++;
        this.items[key] = value;  //isn't push since this needs to be by name
        return true;
    }

    this.set = function(key, value)
    {
        if(!this.containsKey(key)) return false;
        this.items[key] = value;
        return true;
    }

    this.get = function(key) {
        if(this.containsKey(key)) return this.items[key];
        return defaultValue;  //might be undefined
    }

    this.containsKey = function(key)
    {
        return this.items.hasOwnProperty(key);
    }
   
    this.remove = function(key)
    {
        if(!this.containsKey(key)) return false;
         length--;
         delete this.items[key];
         return true;
    }

    this.getAllKeys = function()
    {
        var keys = [];
        for (var k in this.items) {
            if (this.containsKey(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.getAllValues = function()
    {
        var values = [];
        for (var k in this.items) {
            if (this.containsKey(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.applyFunctionToEach = function(fn) {
        for (var k in this.items) {
            if (this.containsKey(k)) {
                fn(k, this.items[k]);  //key, value
            }
        }
    }

    this.clear = function()
    {
        this.items = {}
        length = 0;
    }
};
function LoggerObject(autoDumpPassed, enabledPassed){
    //based on web file: www.wired.com/wired/webmonkey/stuff/simpledebug.js
    //from web page: http://www.webmonkey.com/2010/02/javascript_debugging_for_beginners/
    //Simple Debug, written by Chris Klimas licensed under the GNU LGPL. http://www.gnu.org/licenses/lgpl.txt

    var enabled = enabledPassed;
    var depth = 0;
    var autoDump = autoDumpPassed;
    var log_timeout;
    var log_messages = new Array();

   this.setAutoDump = function(){autoDump=true;};
   this.clearAutoDump = function(){autoDump=false; log_timeout = null;};
   this.clear = function(){depth = 0; log_timeout = null; log_messages = new Array();};
   this.on = function(){enabled=true;};
   this.off = function(){enabled=false;};
   this.up = function(){depth--;};
   this.down = function(){depth++;};
   this.logOnly = function(thisObject, functionName, parameterArray){
       enabled=true;  //turn on
       var returnValue=functionName.apply(thisObject, parameterArray);
       enabled=false;  //turn off
       return returnValue;
   };
   this.trace = function(thisObject, functionName, parameterArray){
       depth++;
       var returnValue=functionName.apply(thisObject, parameterArray);
       depth--;
       return returnValue;
   };
   this.log_same = function(message){if(enabled) log_messages[log_messages.length-1]+=message;};
    //no idea if anything will recognize this as javaDoc
   /** Logs a message. Every second, all logged messages are displayed
    in an alert box. This saves you from having to hit Return a ton
    of times as your script executes.*/
   this.log = function(message)
   {
       if(!enabled) return;  //all other log functions come here
       if(!log_timeout && autoDump) log_timeout = window.setTimeout(auto_dump_log, 1000);
       var whiteSpace="";
       for(var i=0; i < depth; i++){whiteSpace+="   ";}
       log_messages.push(whiteSpace+message);
       function auto_dump_log(){alert(this.dump_log());};
   }
   this.dump_log = function()
   {
       var message = this.print();
       this.clear();
       return message;
   }
   this.print = function()
   {
       var message = '';
       for(var i = 0; i < log_messages.length; i++){message += log_messages[i]+"\n";}
       return message;
   }
   /** Logs the interesting properties an object possesses. Skips functions*/
   this.log_all_properties = function(obj)
   {
       if(!obj){this.log('Object is null'); return;}
       var message = 'Object possesses these properties:\n';
      for (var i in obj)
      {
          if(!(obj[i] instanceof Function) && obj[i] != null) message += i + ', ';
      }
       message = message.substr(0, message.length - 2);  //remove the last ", "
       this.log(message);
   }
   /** Like log_all_properties(), but displays values for the properties. The output
    for this can get very large -- for example, if you are inspecting
    a DOM element.*/
   this.log_all_property_values = function(obj)
   {
       if(!obj){this.log('Object is null'); return;}
       var message = '';
      for (var i in obj)
      {
          if(!(obj[i] instanceof Function) && obj[i]!=null && obj[i]!="") message += i + '=' + obj[i] + '\n';
      }
       this.log(message);
   }
   this.log_all_functions = function(obj)
   {
       if(!obj){this.log('Object is null'); return;}
       var message = 'Object possesses these functions:\n';
      for (var i in obj)
      {
          if(obj[i] instanceof Function && obj[i] != null) message += i + ', ';
      }
       message = message.substr(0, message.length - 2);  //remove the last ", "
       this.log(message);
   }
};
function sanitizeNumber(numberGiven, minimum, defaultValue){
    var value=numberGiven+'';  //convert the type in case it is something that isn't int or string
    if(value=="") return defaultValue;
    if(isNaN(value)) return defaultValue;
    value=parseInt(value);  //int includes Math.floor()
    if(minimum=="None") return value;
    if(value < minimum) return minimum;
    return value;
}
function generateRow(rowArray, rowNumber){
    var returnValue="";
   for (var i=0; i < rowArray.length; i++)
   {
       returnValue+=rowArray[i];
       if(i+1 != rowArray.length) returnValue+=rowNumber;
   }
    return returnValue;
}
function getOption(optionID, property){
    var element=document.getElementById(optionID);
    if(element==undefined) return undefined;  //this line is why you shouldn't just getOption(id)["text"]
    element=element.options[element.selectedIndex];
    if(property==undefined) return element;
    return element[property];
};
function addOptionArray(optionID, optionNameArray){
    var element=document.getElementById(optionID);
   for (var i=0; i < optionNameArray.length; i++){
       element.add(new Option(optionNameArray[i]), null);  //added to the end
   }
};
function removeOptionByName(optionID, textToRemove){
    var element=document.getElementById(optionID);
   for (var i=0; i < element.options.length; i++)
   {
       if(element.options[i].text==textToRemove){element.remove(i); return true;}  //found
   }
    return false;  //not found
};
function removeOptionArray(optionID, optionNameArray){
   for (var i=0; i < optionNameArray.length; i++){
       removeOptionByName(optionID, optionNameArray[i]);
   }
};
function sortOptionByName(optionID){
    var element=document.getElementById(optionID);
    var nameArray=[];
   for (var i=0; i < element.options.length; i++)
   {
       nameArray.push(element.options[i].text);  //populate names
       element.remove(i);  //remove all options
       i--;  //lol i will never get to 1
   }
    nameArray.sort(function(a,b){if(a > b) return 1; if(a < b) return -1; return 0;});  //A comes first (alphabetical ascending) also works for numbers since all are strings
   for (var i=0; i < nameArray.length; i++){  //same as calling addOptionArray(optionID, nameArray)
       element.add(new Option(nameArray[i]), null);  //added to the end
   }
};
function readXMLAsString(xmlLocation){
    if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}  //code for IE7+, Firefox, Chrome, Opera, Safari
    else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}// code for IE6, IE5
    xmlhttp.open("GET", xmlLocation, false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    var xmlText = new XMLSerializer().serializeToString(xmlDoc);
    return xmlText;
};
function stringDiffIndex(stringA, stringB){
    for(var i=1; i < stringA.length; i++)
       {if(stringA.substring(i-1, i)!=stringB.substring(i-1, i)) return (i-1);}
    if(stringB.length > stringA.length) return stringA.length;
    return -1;  //same string
};
function strinDiffDisplay(stringA, stringB){
    var diffIndex=stringDiffIndex(stringA, stringB);
    if(diffIndex == -1) return "Matches";
    return ("|"+stringA.charCodeAt(diffIndex)+"| vs |"+stringB.charCodeAt(diffIndex)+"|");
}
