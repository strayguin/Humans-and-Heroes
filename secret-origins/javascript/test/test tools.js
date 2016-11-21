/**This function will sort input using compare but will do so in a way that is deterministically unstable.
@param {array} input the array to be sorted
@param {function} compare a comparison function that must return either 1, 0, or -1 for each combination of input
@returns {array} input which is also modified in place
*/
function unstableBubbleSort(input, compare)
{
   var swapped;
   do {
      swapped = false;
      for (var i=0; i < input.length-1; i++) {
         var result = compare(input[i], input[i+1]);
         if (result === 1) {
            var temp = input[i];
            input[i] = input[i+1];
            input[i+1] = temp;
            swapped = true;
         }
         else if (result === 0) {  //if equal then swap them anyway to make it unstable
            var temp = input[i];
            input[i] = input[i+1];
            input[i+1] = temp;
            //if swapped=true then this loop will never end (if any 2 are equal)
         }
         //if -1 then it's already in the correct order
      }
   } while (swapped);
   return input;
}

/**Given the relative (might also allow absolute) path to the xml this method returns a string of the contents.
None of my browsers allow this by default for security reasons. In order to run this in chrome: first close all chrome then run:
C:\Program Files (x86)\Google\Chrome\Application>chrome.exe --allow-file-access-from-files
I have a shortcut to this in the git folder*/
function readXMLAsString(xmlLocation)
{
    var xmlhttp=new XMLHttpRequest();  //code for IE7+, Chrome, Firefox, Opera, Safari
    //if(!window.XMLHttpRequest){xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');}// code for IE5, IE6
       //removed so IE won't complain about old code. I don't support old browsers anyway
    xmlhttp.open('GET', xmlLocation, false);  //will throw null pointer if IE5, IE6
       //uses false to block because it needs the response to do anything else
    xmlhttp.send();
    var xmlText=new XMLSerializer().serializeToString(xmlhttp.responseXML);
    return xmlText;
}
/**Compares the 2 strings and returns the character index at which they are different or nothing if they match.
Keep in mind that if the strings are not the same length the index returned is equal to the length of the shorter string.
stringA[i] is used over stringA.charAt(i) if that matters*/
function stringDiffIndex(stringA, stringB)
{
    for(var i=0; i < stringA.length; i++)
       {if(stringA[i] !== stringB[i]) return i;}  //if i >= stringB.length then stringB[i] is undefined which can't match stringA[i]
    if(stringB.length > stringA.length) return stringA.length;
    return;  //same string
}
/**Compares the 2 strings and returns either 'Matches' (if the strings match) or a string that shows the index, character, and character code at which they are different*/
function stringDiffDisplay(stringA, stringB)
{
    var diffIndex=stringDiffIndex(stringA, stringB);
    if(diffIndex === undefined) return 'Matches';
    return ('index='+diffIndex+'; |'+stringA[diffIndex]+'| ('+stringA.charCodeAt(diffIndex)+') vs |'+stringB[diffIndex]+'| ('+stringB.charCodeAt(diffIndex)+')');
}
/**Returns a json object that represents all of the data related to an entry (such as all data about the power Flight).
dataSource needs to be one of the data objects. name is the name of the entry.
Note that it returns a boolean which is if the name is contained in an array which doesn't always make sense.
this is used to find unusual data for the sake of testing*/
function dataInfo(dataSource, name)
{
    var output = {};
   for (var i in dataSource)
   {
       if(dataSource[i] instanceof MapDefault) output[i] = dataSource[i].get(name);
       else if(Array.isArray(dataSource[i])) output[i] = dataSource[i].contains(name);
   }
    return output;
}
/**Returns an array of json objects that represents all of the data related to every entry of a data set (such as all data about all powers).
dataSource needs to be one of the data objects.
This simply calls dataInfo in a loop and adds the name to it.
See dataInfo's doc for more info*/
function allDataInfo(dataSource)
{
    var output = [];
   for (var i=0; i < dataSource.names.length; i++)
   {
       output.push(dataInfo(dataSource, dataSource.names[i]));
       output.last().name = dataSource.names[i];
   }
    return output;
}
/**Prints the result of allDataInfo in the code box.
See allDataInfo for more info*/
function allDataInfoToCodeBox(dataSource)
{
    document.getElementById('code box').value = JSON.stringify(allDataInfo(Data.Skill));
}

/**This is NOT a normal bling! It only allows getting an element by id (starting with '#'). Nothing is returned in any other case (undefined not null).*/
//if(window.$ === undefined){window.$=function(name){if(name[0] === '#') return document.getElementById(name.substring(1));};}
//I could use $('#transcendence') over document.getElementById('transcendence'); etc but why bother: the latter is more clear
//I only use this for debugging

SelectUtil.setText('saveType', 'JSON');  //not needed for Loader but when I test I always use json
var Loader = {};
var errorList = [];
Loader.resetData=function()
{
    errorList = [];
    Main.clear();
    return Main.save();  //return skeleton needed
};
Loader.sendData=function(jsonData)
{
    document.getElementById('code box').value = JSON.stringify(jsonData);  //to simulate user input
    Main.loadFromTextArea();
};
var Messages = {};
Messages.errorCapture=function(errorCode, message)
{
    errorList.push({errorCode: errorCode, message: message});
};
Messages.isValid=function(){return errorList.isEmpty();};
Messages.isOnlyErrorCodes=function(errorCodeArray)
{
    if(!Array.isArray(errorCodeArray)) errorCodeArray = [errorCodeArray];
    if(errorList.length !== errorCodeArray.length) return false;
   for (var i=0; i<errorCodeArray.length; ++i)
   {
       if(errorList[i].errorCode !== errorCodeArray[i]) return false;
   }
    return true;
};

/**This function was made to test the difference and reliability of isNaN and isFinite. It is not included in TestSuite so that it isn't auto ran.
Unlike confirmAllXmls this test suite is not in any way related to the project which is why is isn't hidden in TestSuite.*/
function unlinkedNanTest()
{
    var testResults=[], actionTaken, testDescription;
    var trueTests=['NaN', NaN, 'Text', 'x123', '#FF00FF', 'null', null, 'undefined', undefined, '', '     \t\n  ', '1Text', 'Text1', '12,345', '1.2.3', '-', '+', true, false, new Date(2009,1,1), {}, function(){}, [], '+-1', '++1', '1+', '1e', 'e', 'e1'];
    var falseTests=['123', '+123', 123, new Number(123), '0x123', '+0x123', '-0x123', '0', '-1.2', '.12', '+.12', '-1.2e-3', '1.2e+3', '+1.2e3', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER, Number.MIN_VALUE, Number.MIN_SAFE_INTEGER, '09'];
    var testFunctions=[isNaN, isNotFinite, numberConstructorNaN];
    function numberConstructorNaN(num){return (Number(num).toString() === 'NaN');}  //this works
    function isNotFinite(num){return (!isFinite(num));}

    TestRunner.clearResults();

   for (var functionIndex=0; functionIndex < testFunctions.length; functionIndex++)
   {
       actionTaken='NaN tests';
      for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
      {
          testDescription=testFunctions[functionIndex].name+'(';
          if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
          else testDescription+=trueTests[inputIndex];
          testDescription+=')';
          testResults.push({Expected: true, Actual: testFunctions[functionIndex](trueTests[inputIndex]), Description: actionTaken, Description: testDescription});
      }
       actionTaken='Number tests';
      for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
      {
          testDescription=testFunctions[functionIndex].name+'(';
          if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
          else testDescription+=falseTests[inputIndex];
          testDescription+=')';
          testResults.push({Expected: false, Actual: testFunctions[functionIndex](falseTests[inputIndex]), Description: actionTaken, Description: testDescription});
      }
   }

    actionTaken='Infinity tests';
    testResults.push({Expected: false, Actual: isNaN('Infinity'), Description: actionTaken+': isNaN("Infinity")'});
    testResults.push({Expected: false, Actual: isNaN(Infinity), Description: actionTaken+': isNaN(Infinity)'});
    testResults.push({Expected: false, Actual: isNaN('-Infinity'), Description: actionTaken+': isNaN("-Infinity")'});
    testResults.push({Expected: false, Actual: isNaN(-Infinity), Description: actionTaken+': isNaN(-Infinity)'});

    testResults.push({Expected: true, Actual: !isFinite('Infinity'), Description: actionTaken+': !isFinite("Infinity")'});
    testResults.push({Expected: true, Actual: !isFinite(Infinity), Description: actionTaken+': !isFinite(Infinity)'});
    testResults.push({Expected: true, Actual: !isFinite('-Infinity'), Description: actionTaken+': !isFinite("-Infinity")'});
    testResults.push({Expected: true, Actual: !isFinite(-Infinity), Description: actionTaken+': !isFinite(-Infinity)'});

    testResults.push({Expected: true, Actual: !numberConstructorNaN('Infinity'), Description: actionTaken+': !numberConstructorNaN("Infinity")'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN(Infinity), Description: actionTaken+': !numberConstructorNaN(Infinity)'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN('-Infinity'), Description: actionTaken+': !numberConstructorNaN("-Infinity")'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN(-Infinity), Description: actionTaken+': !numberConstructorNaN(-Infinity)'});

    actionTaken='No Parameter tests';
    testResults.push({Expected: true, Actual: isNaN(), Description: actionTaken+': isNaN()'});
    testResults.push({Expected: true, Actual: !isFinite(), Description: actionTaken+': !isFinite()'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN(), Description: actionTaken+': !numberConstructorNaN()'});

    actionTaken='Comparing NaN tests';
   for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
       else testDescription+=trueTests[inputIndex];
       testDescription+=') vs isNotFinite';
       testResults.push({Expected: isNaN(trueTests[inputIndex]), Actual: isNotFinite(trueTests[inputIndex]), Description: actionTaken, Description: testDescription});
   }
    actionTaken='Comparing Number tests';
   for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
       else testDescription+=falseTests[inputIndex];
       testDescription+=') vs isNotFinite';
       testResults.push({Expected: isNaN(falseTests[inputIndex]), Actual: isNotFinite(falseTests[inputIndex]), Description: actionTaken, Description: testDescription});
   }

    actionTaken='Comparing NaN tests';
   for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
       else testDescription+=trueTests[inputIndex];
       testDescription+=') vs numberConstructorNaN';
       testResults.push({Expected: isNaN(trueTests[inputIndex]), Actual: numberConstructorNaN(trueTests[inputIndex]), Description: actionTaken, Description: testDescription});
   }
    actionTaken='Comparing Number tests';
   for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
       else testDescription+=falseTests[inputIndex];
       testDescription+=') vs numberConstructorNaN';
       testResults.push({Expected: isNaN(falseTests[inputIndex]), Actual: numberConstructorNaN(falseTests[inputIndex]), Description: actionTaken, Description: testDescription});
   }

    return TestRunner.displayResults('unlinkedNanTest', testResults, true);  //grand total is pointless but this will scroll me to the bottom
};
/*
Primitives and objects get the same results. The special values:
NaN (also with optional leading +-), undefined, Infinity (also with optional leading +-)
all get the same results as is or with the string version. Except null

The following are NaN:
NaN (duh), 'Text', 'x123', '#FF00FF', 'null', undefined (and obviously passing in nothing is the same),
'1Text', 'Text1', '12,345', '1.2.3'

The following are numbers:
Infinity, -Infinity, '123', 123 (obviously anything that typeof() === 'number' or is a Number object), '0x123', null

Problem: isNaN(null) returns false (meaning isNaN thinks null is a number)

Failed tests:
isNaN(null), empty string, white space only string, primitive booleans, Date object, [], '+0x123'

so here's the code for isFinite:
function isFinite(num)
{
    if(isNaN(num)) return false;
    num=Math.abs(Number(num));
    if(num === Infinity) return false;
    return true;
}

WTF JS moments:
isNaN(null) === false
numberConstructorNaN() === true but numberConstructorNaN(undefined) === false
    which is only possible if it checks the number of parameters even though it only uses the first
NaN !== NaN
    there used to be a reason for this. javascript being old obeyed it by convention.
    currently the rational behind it is obsolete and some modern languages have fixed this logical contradiction
(new Number(1)) !== 1 and (new Number(1)) !== (new Number(1))
    They are the same type and value
    This makes sense in Java where == compares if they are pointing to the same object but that's not what === does in js
    unless they are both objects in which case that's exactly how they behave (=== and == are the same in such cases)
    ({}) !== ({}) so comparing objects is never possible yet Object.prototype.equals (or even Object.equals) doesn't exist
(new Number(1)) < (new Number(2))
    so it probably just calls valueOf but then why doesn't it do that for equality?
    but 'as' < 'asd' compares by ascii despite valueOf returning the same thing as toString (both return itself)
typeof(new Number(1)) !== typeof(Number(1))
    returns: 'object' and 'number'
typeof(new String(1)) === 'object' but typeof('1') === 'string'
    Why is there a primitive string? That doesn't even make sense. The reason for it is so that strings can be compared with any numeric comparison
    here's something confusing: since there is no character class all strings are arrays of strings, with string length 1 containing only itself
typeof(/a/) === 'object' despite being first class it has no primitive value and is considered an object
    the same is true for functions partially: typeof(function(){}) === 'function' but also has a wrapper object and primitive function compares like objects
function outerFun()
{
   console.log('outerFun '+(this === window || this === undefined));  //prints false
   innerFun();
   function innerFun()
   {
       console.log('innerFun '+(this === window || this === undefined));  //prints true
   }
}; new outerFun();
    innerFun is a private function that only exists within outerFun and can only be called from within outerFun.
    outerFun is constructed and exists as an object yet innerFun has global scope?
    global: { outerFun:{ innerFun:{} } } in definition and scope, yet this pointer does: global: { outerFun:{}, innerFun:{} }
    this is the reason why I made all my functions public
*/
