TestSuite.modifierList={};
TestSuite.modifierList.calculateGrandTotal=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.calculateGrandTotal', testResults, isFirst);
};
TestSuite.modifierList.calculateValues=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.calculateValues', testResults, isFirst);
};
TestSuite.modifierList.createByNameRank=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.createByNameRank', testResults, isFirst);
};
TestSuite.modifierList.getUniqueName=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.getUniqueName', testResults, isFirst);
};
TestSuite.modifierList.load=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.load', testResults, isFirst);
};
TestSuite.modifierList.sanitizeRows=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.sanitizeRows', testResults, isFirst);
};
TestSuite.modifierList.sortOrder=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    SelectUtil.changeText('powerModifierChoices0.1', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerModifierChoices0.4', 'Precise');

    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'power row'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Modifier 1'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Modifier 2'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Modifier 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Description: 'Modifier 4'});
    testResults.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,4).getName(), Description: 'Modifier 5'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0,5).isBlank(), Description: 'No more modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'sortOrder'});}

    return TestRunner.displayResults('TestSuite.modifierList.sortOrder', testResults, isFirst);
};
