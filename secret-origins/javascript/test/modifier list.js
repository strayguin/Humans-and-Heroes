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
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerModifierChoices0.2', 'Precise');
    Main.powerSection.getRow(0).getModifierList().testSortStability();
    //this test proves that the sort order forces stability

    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Stability: Modifier 1'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Stability: Modifier 2'});
    testResults.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Stability: Modifier 3'});
    } catch(e){testResults.push({Error: e, Description: 'Stability'});}

    try{
    Main.clear();
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Perception');
    SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    SelectUtil.changeText('powerSelectAction0', 'Free');
    //this test proves that these are in the right order: Faster Action, Increased Range, Increased Duration, else

    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Auto Extras: Modifier 1'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Auto Extras: Modifier 2'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Auto Extras: Modifier 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Description: 'Auto Extras: Modifier 4'});
    } catch(e){testResults.push({Error: e, Description: 'Auto Extras'});}

    try{
    Main.clear();
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    //this test proves that these are in the right order: Slower Action, Reduced Range, Decreased Duration, else

    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Auto Flaws: Modifier 1'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Auto Flaws: Modifier 2'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Auto Flaws: Modifier 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Description: 'Auto Flaws: Modifier 4'});
    } catch(e){testResults.push({Error: e, Description: 'Auto Flaws'});}

    return TestRunner.displayResults('TestSuite.modifierList.sortOrder', testResults, isFirst);
};
