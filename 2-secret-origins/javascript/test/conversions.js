Tester.conversions={};
Tester.conversions.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.conversions.data={setUp: Tester.data.beforeAll};
Tester.conversions.sanitizeNumber=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    var zeroArray = ['NaN', NaN, 'Text', 'x123', '#FF00FF', 'null', null, 'undefined', undefined, '', '     \t\n  ', '1Text', 'Text1', '12,345', '1.2.3', '-', '+', '+-1', '++1', '1+', '1e', 'e', 'e1', 'Infinity', '-Infinity', '0x123', '+0x123', '-0x123', '0', '.12', '+.12', '-0.12', Number.EPSILON, Number.MIN_VALUE, '-1.2e-3'];
    var numberArray = ['123', '+123', '1.2e+3', '+1.2e3', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER];
    var result;
    var normalSanitize = function(num){return sanitizeNumber(num, -5, 0);};

    try{
    actionTaken='Invalid Loop';
   for (var i=0; i < zeroArray.length; i++)
   {
       result = normalSanitize(zeroArray[i]);
       testResults.push({Expected: 0, Actual: result, Action: actionTaken, Description: (zeroArray[i] + ' => 0 (default value)')});
   }
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Valid Loop';
   for (var i=0; i < numberArray.length; i++)
   {
       result = normalSanitize(numberArray[i]);
       testResults.push({Expected: Math.floor(parseFloat(numberArray[i])), Actual: result, Action: actionTaken, Description: (numberArray[i] + ' string to number')});
   }
    result = normalSanitize(-1);
    testResults.push({Expected: -1, Actual: result, Action: actionTaken, Description: '-1 string to number'});
    result = normalSanitize(-1.2);
    testResults.push({Expected: -1, Actual: result, Action: actionTaken, Description: '-1.2 string to number'});
    result = normalSanitize(Number.MIN_SAFE_INTEGER);
    testResults.push({Expected: -5, Actual: result, Action: actionTaken, Description: (Number.MIN_SAFE_INTEGER + ' string to number (min of -5)')});
    result = normalSanitize(-500);
    testResults.push({Expected: -5, Actual: result, Action: actionTaken, Description: '-500 string to number (min of -5)'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.conversions.sanitizeNumber', testResults, isFirst);
};
Tester.conversions.xmlToJson=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS. mostly just make sure it doesn't crash from invalid data
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.conversions.xmlToJson', testResults, isFirst);
};
Tester.conversions.jsonToXml=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS. mostly just make sure it doesn't crash from invalid data
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.conversions.jsonToXml', testResults, isFirst);
};
