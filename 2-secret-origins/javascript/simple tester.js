//Note that throughout this file the word 'suite' is like naive set theory: a suite it can contain any number of test cases and suites.
    //TODO: see if I can replace 'suite' with something more clear
//TODO: test itself
//TODO: add: 2 links for first unmade and first unfinished (if neither then don't have links)
//TODO: add: link for bottom of suite and top of suite

//this is optional. feel free to remove it.
/**Provided as a default way to compare objects.
It simply enumerates over all properties and makes sure they match.
Note that it enumerates up the prototype chain in case one of them overrides a parent property so they don't match.
It is type safe and also makes sure they have the same number of enumerable properties.*/
Object.prototype.equals = function(obj)
{
    if(!(obj instanceof Object)) return false;
    if(obj === this) return true;
    if(Object.keys(obj).length !== Object.keys(this).length) return false;
   for (var i in obj)
   {
       //if(!obj.hasOwnProperty(i)) continue;  //intentionally not used: all enumerated properties must match
       if(obj[i] !== this[i]) return false;  //this[i] could be undefined
   }
    return true;
};
//also optional but helpful for comparing errors
/**Provided as a default way to compare errors.
It does the same thing as Object.prototype.equals then compares name and message but ignores stack etc.*/
Error.prototype.equals=function(err)
{
    if(!(err instanceof Error)) return false;
    if(err === this) return true;
    if(Object.keys(err).length !== Object.keys(this).length) return false;
   for (var i in err)
   {
       //if(!err.hasOwnProperty(i)) continue;  //intentionally not used: all enumerated properties must match
       if(err[i] !== this[i]) return false;  //this[i] could be undefined
   }
    //all Errors have these and they are not enumerated
    if(err.name !== this.name) return false;  //defined in Function
    if(err.message !== this.message) return false;  //defined in Error
    if(err.description !== this.description) return false;  //for IE users. same as message
    //if(err.stack !== this.stack) return false;  //ignore the stack value
       //also ignore: fileName, lineNumber, columnNumber
    return true;
};

//this is used by TesterUtility.testPassed. don't remove it
/**precision is the number of decimal places (base 10 after the decimal point) that need to be ensured, any further digits are ignored.
If necessary this Number is multiplied (this is not changed) by Math.pow(10, precision); then rounded (not truncated) via Half_Down then divided back.
Therefore ensurePrecision increased accuracy but does not guarantee it.
So for example precision of 2 means to compare the numbers but ignore any value smaller than 1/100.
precision of 0 means compare them as whole numbers.
precision must be a number type and can't be infinite.
There is no range checking done on precision because I can't ask the browser for the maximum precision (appears to be 15).
This function is similar to Number(num.toFixed(precision)) except this function uses Half_Down instead of Half_Up.
This function is not similar to Number.prototype.toPrecision (which returns a string of significant figures via Half_Up).*/
Number.prototype.ensurePrecision = function(precision)
{
    if(!isFinite(this)) return this.valueOf();
    if(typeof(precision) !== 'number' || !isFinite(precision) || isNaN(this)) return NaN;
    //Infinity and NaN precision are not allowed (isFinite calls isNaN)
    //I am allowing people to specify negative precision or ones that are not whole numbers. why and what that means is up to the user
    if(this.valueOf() === 0) return 0;  //already perfect
    var resultWhole = Math.floor(this);
    if(resultWhole > this) return resultWhole;  //in case Math.floor ensured some precision when this is 0.999999 etc
    resultWhole = simpleTruncate(this);
       //notice how this is not changed
    var resultDigits = ((this - resultWhole) * Math.pow(10, precision));

    var savedDigits = simpleTruncate(resultDigits);
    var digitsInQuestion = Math.abs(resultDigits - savedDigits);

    //if exactly half then truncate. else round away from half
       //need to round in case of 0.999999999, 0.6666666, or 0.0000001 etc
    if(digitsInQuestion <= 0.5){}  //remain whole if exactly half or smaller
    else if(resultWhole > 0) savedDigits++;
    else savedDigits--;  //step away from 0 if digitsInQuestion > 0.5

    savedDigits /= Math.pow(10, precision);
    return (resultWhole+savedDigits);

   function simpleTruncate(num)
   {
       if(num >= 0) return Math.floor(num);
       return Math.ceil(num);
   }
};
const TesterUtility={};
/*If all of the requirements pass then return true otherwise add the failures to the testResults and return false
Use this if the test output gets too huge*/
TesterUtility.assert=function(testResults, requiredArray)
{
    var shouldContinue = true;
   for (var i=0; i < requiredArray.length; i++)
   {
      if (!TesterUtility.testPassed(requiredArray[i]))
      {
          shouldContinue = false;
          testResults.push(requiredArray[i]);
      }
   }
    return shouldContinue;
};
/**Given the DOM's id this function sets the value property equal to valueToSet then calls onchange.
No validation is done so if the id is not found it will throw an error.*/
TesterUtility.changeValue=function(elementID, valueToSet)
{
    var element = document.getElementById(elementID);
    element.value = valueToSet;
    element.onchange();
};
/**Will do nothing if isFirst is not either undefined or true (strict).
but if(isFirst) this function will reset the grand totals and testing area and call Tester.data.beforeAll.
Note that this function will clear out window.location.hash.*/
TesterUtility.clearResults=function(isFirst)
{
    if(isFirst === undefined) isFirst = true;
    if(isFirst !== true) return;
    Tester.data.startTime = new Date();
    window.location.hash = '';  //this is needed so that it will scroll to the grand totals when finished
    Tester.data.endTime = undefined;
    document.getElementById('test results').innerHTML = '';
    Tester.data.passCount = 0;
    Tester.data.failCount = 0;
    Tester.data.errorCount = 0;
    Tester.data.isFirstFailedSuite = true;
    Tester.data.isFirstFailedTest = true;
    Tester.data.beforeAll();
};
/**Will do nothing if isFirst is not either undefined or true (strict).
but if(isFirst) this function will call Tester.data.afterAll then display the grand totals and scroll to the bottom.
The percent will be green if 100% and red if 0%.*/
//TODO: doc the format and colors
TesterUtility.displayGrandTotal=function(isFirst)
{
    if(isFirst === undefined) isFirst = true;
    if(isFirst !== true) return;
    Tester.data.afterAll();
    var grandFormat = TesterUtility.formatPassFail(Tester.data.passCount, Tester.data.failCount, Tester.data.errorCount).split('\n');
    document.getElementById('test results').innerHTML+='<a id="test results grand totals"></a>Grand Totals. ' + grandFormat[0] + '\n';
    if(Tester.data.passCount === 0) document.getElementById('test results').innerHTML+='<span style="background-color: red;">'+grandFormat[1] + '</span>\n';
    else if((Tester.data.failCount+Tester.data.errorCount) === 0) document.getElementById('test results').innerHTML+='<span style="background-color: #53E753;">'+grandFormat[1] + '</span>\n';
    else document.getElementById('test results').innerHTML+=grandFormat[1] + '\n';
    Tester.data.endTime = new Date();
    var milliseconds = (Tester.data.endTime - Tester.data.startTime);
    var seconds = Math.floor(milliseconds/1000);
    milliseconds-=(seconds*1000);
    var minutes = Math.floor(seconds/60);
    seconds-=(minutes*60);
    //tests should not take hours so the units stop at minutes
    document.getElementById('test results').innerHTML+='<br />Time taken: ' + minutes + ' minutes, ' + seconds +' seconds, and ' + milliseconds + ' milliseconds\n';
    //yes I know that it would display "1 seconds" etc so change it if you care so much
    document.getElementById('test results').innerHTML+='<br /><a href="#test results">Go to top of tests</a>\n';
    document.getElementById('test results').innerHTML+='<br /><a href="#First Failed Test">Go to first failed test</a> ';
    document.getElementById('test results').innerHTML+='<a href="#First Failed Suite">Go to containing suite</a>\n';
    window.location.hash = '#test results grand totals';  //scroll to the grand totals
};
/**This function creates the table used to display the test results of a section.
Pass, fail, and error counts are counted and added to the grand total.
The table is added to the test result section.*/
TesterUtility.displayResults=function(tableName, testResults, isFirst)
{
    var passCount = 0;
    var failCount = 0;
    var errorCount = 0;
    var output = '<table border="1">\n';
    output+='<tr><td colspan="5" style="text-align:center">'+tableName+'</td></tr>\n<tr>\n';
    //max table width is about 1036 px. the columns are set to auto width
    output+='<td style="text-align: center;">Action Taken</td>\n';
    output+='<td style="text-align: center;">Description of test</td>\n';
    output+='<td style="text-align: center;">Expected</td>\n';
    output+='<td style="text-align: center;">Actual</td>\n';
    output+='<td style="text-align: center;">Result</td>\n</tr>\n';
   for (var i=0; i < testResults.length; i++)
   {
       output+='<tr';
       var testPassed = TesterUtility.testPassed(testResults[i]);
       if(Tester.data.isFirstFailedTest && (testResults[i].Error !== undefined || !testPassed)){output+=' id="First Failed Test"'; Tester.data.isFirstFailedTest = false;}
      if (testResults[i].Error !== undefined)
      {
          output+=' style="background-color: red;"';
          output+='>\n<td>'+testResults[i].Action+'</td>\n<td colspan="3">'+testResults[i].Error+'</td>\n<td>Error</td>\n</tr>\n';
          errorCount++;
          continue;
      }
       if(!testPassed) output+=' style="background-color: red;"';
       //else: default white
       output+='>\n<td>'+testResults[i].Action+'</td>\n<td>'+testResults[i].Description+'</td>\n<td style="text-align: right;">';

       if(typeof(testResults[i].Expected) === 'string' && testResults[i].Expected.length > 80) output+='<pre>(Too Long)</pre>';  //string.length to see if too long to display
       else output+=testResults[i].Expected;  //string append is null safe but calls toString

       output+='</td>\n<td>\n';
       if(typeof(testResults[i].Actual) === 'string' && testResults[i].Actual.length > 80) output+='<pre>(Too Long)</pre>';  //of course this includes html tags but these should be plain text
       else output+=testResults[i].Actual;  //if Actual is an html object it will not be embedded into the table
       //however if the toString is valid html it can be embedded

       output+='</td>\n<td>\n';
       if(testPassed){output+='Pass'; passCount++;}
       else{output+='Failure'; failCount++;}
       output+='</td>\n</tr>\n';
   }
    output+='<tr';
    if(errorCount !== 0) output+=' style="background-color: red;"';
    else if(failCount === 0) output+=' style="background-color: #53E753;"';
    output+='><td colspan="3">Section Totals. '+TesterUtility.formatPassFail(passCount, failCount, errorCount).replace('<br />\n', '</td><td colspan="2">')+'</td></tr>\n';
    output+='</table>\n<br />\n';
   if (Tester.data.isFirstFailedSuite && (failCount + errorCount) > 0)
   {
       output = ('<table border="1" id="First Failed Suite">' + output.substring(output.indexOf('\n')));
       Tester.data.isFirstFailedSuite = false;
   }
    Tester.data.passCount+=passCount;
    Tester.data.failCount+=failCount;
    Tester.data.errorCount+=errorCount;

    document.getElementById('test results').innerHTML+=output;
    TesterUtility.displayGrandTotal(isFirst);
};
/**Given the pass, fail, and error counts this function returns a formatted string to display the results.*/
TesterUtility.formatPassFail=function(passCount, failCount, errorCount)
{
    var output = 'Pass: '+passCount+', Fail: '+failCount;
    if(errorCount !== 0) output+=', Error: '+errorCount;
    output+='<br />\n';
    var totalTestCount = passCount + failCount + errorCount;
    output+='('+passCount+'/'+totalTestCount+')';
    output+=' is '+(passCount/totalTestCount*100).toFixed(2)+'%';  //if totalTestCount is 0 then it will show NaN%
    return output;
};
/**Used by every test suite in order to run each of their tests.
This function will call TesterUtility.clearResults before running the tests and TesterUtility.displayGrandTotal afterwards.
The main loop enumerates over the object given and calls each function that isn't named "testAll".
The loop is deep and all properties that are objects and not named "data" will also be enumerated over.
It will call testSuite.data.setUp (if it is defined) before each test. The setUp called will be for that suite not the top most.
If the called test function throws TesterUtility.testAll will catch it and display the list of errors when finished (and will also send the stack to console.error).*/
TesterUtility.testAll=function(testSuite, isFirst)
{
    TesterUtility.clearResults(isFirst);
    if(testSuite === undefined) testSuite = Tester;
    var suiteCollection = [testSuite], setUp, errorTests = [];
   while (suiteCollection.length !== 0)
   {
       testSuite = suiteCollection[0];
       if(testSuite.data !== undefined) setUp = testSuite.data.setUp;
       if(setUp === undefined) setUp = function(){};  //does nothing
      for (var i in testSuite)
      {
          if(!testSuite.hasOwnProperty(i)) continue;  //"for in" loops are always risky and therefore require sanitizing
          if(typeof(testSuite[i]) === 'object' && testSuite[i] !== null && i !== 'data') suiteCollection.push(testSuite[i]);
             //null is a jerk: typeof erroneously returns 'object' (null isn't an object because it doesn't inherit Object.prototype)
         else if(typeof(testSuite[i]) === 'function' && i !== 'testAll')
         {
             setUp();
             try{testSuite[i](false);}
             catch(e){console.error(e.stack); errorTests.push({Error: e, Action: i});}
         }
      }
       suiteCollection.shift();
       setUp = undefined;
   }
    if(errorTests.length !== 0) TesterUtility.displayResults('TesterUtility.testAll', errorTests, false);
    TesterUtility.displayGrandTotal(isFirst);
};
/**Returns true if testResult.Expected === testResult.Actual, however this also returns true if both are equal to NaN.
If Expected and Actual are both (non-null) objects and Expected.equals is a function then it will return the result of Expected.equals(Actual).
If Expected and Actual are both numbers then testResult.Precision can also be specified (it must be a number).
Precision is passed to Number.prototype.ensurePrecision (see doc for details).
If Precision is not specified (or is invalid) it will default to Tester.data.defaultPrecision (if valid).*/
TesterUtility.testPassed=function(testResult)
{
    if(typeof(testResult.Expected) !== typeof(testResult.Actual)) return false;  //testing is type strict
    if(testResult.Expected === testResult.Actual) return true;  //base case. if this is true no need to get more advanced

    if(testResult.Expected instanceof Object && typeof(testResult.Expected.equals) === 'function') return testResult.Expected.equals(testResult.Actual);

    if(typeof(testResult.Expected) === 'number' && isNaN(testResult.Expected) && isNaN(testResult.Actual)) return true;
       //NaN is a jerk: NaN === NaN erroneously returns false (x === x is a tautology. the reason the standard returns false no longer applies)
    var precision = testResult.Precision;
    if(typeof(testResult.Precision) !== 'number' || !isFinite(testResult.Precision)) precision = Tester.data.defaultPrecision;
    if(typeof(testResult.Expected) !== 'number' || typeof(precision) !== 'number' || !isFinite(precision))
       return false;  //equality was denied at base case
       //if precision isn't needed or is invalid or undefined

    return (testResult.Expected === testResult.Actual.ensurePrecision(precision));
       //testResult.Actual is not changed by ensurePrecision
};
/**This is a simple way to mark unfinished test suites. This makes them easy to find because they show up in testAll.
Unfinished can be in the middle of a test suite but must return afterwards without any more tests. Or can be at the end of a suite.
This will add a test with Error: 'Not finished.' to testsSoFar then call TesterUtility.displayResults with each parameter.
Unlike unmade, unfinished takes isFirst which allows that suite to be called directly.
name: the name of the test suite that will be displayed as the name of the table.*/
TesterUtility.unfinished=function(name, testsSoFar, isFirst)
{
    testsSoFar.push({Error: 'Not finished.', Action: 'TesterUtility.unfinished'});
    TesterUtility.displayResults(name, testsSoFar, isFirst);
};
/**This is a simple way to mark test suites that have not not been made. This makes them easy to find because they show up in testAll.
This will call TesterUtility.displayResults with a single test with Error: 'Not yet implemented.'.
name: the name of the test suite that will be displayed as the name of the table.*/
TesterUtility.unmade=function(name)
{
    TesterUtility.displayResults(name, [{Error: 'Not yet implemented.', Action: 'TesterUtility.unmade'}], false);
};
Object.freeze(TesterUtility);

const Tester = {};
Tester.testAll=function(){TesterUtility.testAll(this, true);};  //true is the default for isFirst but it is explicit in this case
Tester.data = {beforeAll: function(){}, afterAll: function(){}, defaultPrecision: 15};
//note that setUp is only called from TesterUtility.testAll. If an individual test is called directly setUp will not run (but beforeAll and afterAll will).
//be careful not to override the other properties of Tester.data. beforeAll and afterAll should be the only ones overridden
    //do not modify the following properties of Tester.data: startTime, endTime, passCount, failCount, errorCount, isFirstFailedSuite, isFirstFailedTest
//although feel free to add new properties to Tester.data to act as global storage for testing data

/*example:
Tester.abilityList = {};
Tester.abilityList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
  //this is shorthand so that Tester.abilityList.testAll() may be called instead of TesterUtility.testAll(Tester.abilityList);
//data does not need to be defined nor does data.setUp
Tester.abilityList.calculateValues=function(isFirst)
{
    //be sure to copy the name of the function here:
    TesterUtility.unmade('Tester.abilityList.calculateValues'); return;  //remove this line when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var catchFailed = function(action, description){return {Expected: 'throw', Actual: 'return', Action: action, Description: description};};
    var catchPass = function(error, action, description){return {Expected: error, Actual: error, Action: action, Description: description};};
    //catchFailed and catchPass are shorthand if you are expecting an error to be thrown
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: NaN, Actual: Math.factorial('Not a number'), Action: actionTaken, Description: 'Math.factorial when passed NaN'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}  //not expecting an error to be thrown but it was. fail instead of crash

    try{
    actionTaken='Validation';
    validator.validate(null);
    testResults.push(catchFailed(actionTaken, 'Validator did not throw given an invalid value/ state.'));
    }
   catch(e)
   {
       testResults.push(catchPass(e, actionTaken, 'Validator threw when null was passed in.'));
       testResults.push({Expected: 'Invalid state: object can\'t be null.', Actual: e.message, Action: actionTaken, Description: 'Validator threw the correct error message.'});
       testResults.push({Expected: 'TypeError', Actual: e.name, Action: actionTaken, Description: 'Validator threw the correct error type.'});
       testResults.push({Expected: new TypeError('Invalid state: object can\'t be null.'), Actual: e, Action: actionTaken, Description: 'Validator threw the correct type and message.'});
          //this last one is only possible if Error.prototype.equals is defined to ignore the stack etc
   }

    //be sure to copy the name of the function here:
    TesterUtility.displayResults('Tester.abilityList.calculateValues', testResults, isFirst);
};
Tester.abilityList.setAll=function(isFirst){TesterUtility.unmade('Tester.abilityList.setAll');};
*/