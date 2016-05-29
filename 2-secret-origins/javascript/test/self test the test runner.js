Tester.TesterUtility={};
Tester.TesterUtility.testPassed=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults = [], actual, input;

    try{
    actual = TesterUtility.testPassed({Expected: true, Actual: true});
    testResults.push({Expected: true, Actual: actual, Description: 'Happy path: pass'});
    } catch(e){testResults.push({Error: e, Description: 'Happy path: pass'});}

    try{
    actual = TesterUtility.testPassed({Expected: true, Actual: false});
    testResults.push({Expected: false, Actual: actual, Description: 'Happy path: fail'});
    } catch(e){testResults.push({Error: e, Description: 'Happy path: fail'});}

    try{
    actual = TesterUtility.testPassed({Expected: 1, Actual: '1'});
    testResults.push({Expected: false, Actual: actual, Description: 'Different types'});
    } catch(e){testResults.push({Error: e, Description: 'Different types'});}

    try{
    input = {};
    input.Expected = {hairColor: 'green', isCached: false, equals: function(other){return other.hairColor === this.hairColor;}};
    input.Actual = {hairColor: 'green', isCached: true, equals: function(other){return other.hairColor === this.hairColor;}};
    actual = TesterUtility.testPassed(input);
    testResults.push({Expected: true, Actual: actual, Description: 'Custom equals function: true'});
    } catch(e){testResults.push({Error: e, Description: 'Custom equals function: true'});}

    try{
    input = {};
    input.Expected = {hairColor: 'green', isCached: false, equals: function(other){return other.hairColor === this.hairColor;}};
    input.Actual = {hairColor: 'blue', isCached: true, equals: function(other){return other.hairColor === this.hairColor;}};
    actual = TesterUtility.testPassed(input);
    testResults.push({Expected: false, Actual: actual, Description: 'Custom equals function: false'});
    } catch(e){testResults.push({Error: e, Description: 'Custom equals function: false'});}

    try{
    actual = TesterUtility.testPassed({Expected: NaN, Actual: NaN});
    testResults.push({Expected: true, Actual: actual, Description: 'NaN === NaN'});
    } catch(e){testResults.push({Error: e, Description: 'NaN === NaN'});}

    try{
    actual = TesterUtility.testPassed({Expected: 1.0000000000000002, Actual: 1.0000000000000004});
    testResults.push({Expected: true, Actual: actual, Description: 'Using default precision'});
    } catch(e){testResults.push({Error: e, Description: 'Using default precision'});}

    try{
    actual = TesterUtility.testPassed({Expected: 1.0000000000000002, Actual: 1.0000000000000004, Precision: 'ham'});
    testResults.push({Expected: true, Actual: actual, Description: 'Using invalid precision'});
    } catch(e){testResults.push({Error: e, Description: 'Using invalid precision'});}

    try{
    Tester.data.defaultPrecision = 'pork';
    actual = TesterUtility.testPassed({Expected: 1.0000000000000002, Actual: 1.0000000000000004, Precision: 'ham'});
    testResults.push({Expected: false, Actual: actual, Description: 'Default precision is invalid'});
    } catch(e){testResults.push({Error: e, Description: 'Default precision is invalid'});}
    Tester.data.defaultPrecision = 15;

    try{
    actual = TesterUtility.testPassed({Expected: 1.02, Actual: 1.04, Precision: 1});
    testResults.push({Expected: true, Actual: actual, Description: 'Using custom precision'});
    } catch(e){testResults.push({Error: e, Description: 'Using custom precision'});}

    TesterUtility.displayResults('meta: TesterUtility.testPassed', testResults, isFirst);
};
