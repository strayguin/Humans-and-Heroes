Tester.modifierList={};
Tester.modifierList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.modifierList.data={setUp: Tester.data.beforeAll};
Tester.modifierList.calculateGrandTotal=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierList.calculateGrandTotal', testResults, isFirst);
};
Tester.modifierList.calculateValues=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierList.calculateValues', testResults, isFirst);
};
Tester.modifierList.createByNameRank=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierList.createByNameRank', testResults, isFirst);
};
Tester.modifierList.getUniqueName=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierList.getUniqueName', testResults, isFirst);
};
Tester.modifierList.load=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierList.load', testResults, isFirst);
};
Tester.modifierList.sanitizeRows=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierList.sanitizeRows', testResults, isFirst);
};
Tester.modifierList.sortOrder=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='N/A';

    try{
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    SelectUtil.changeText('powerModifierChoices0.1', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerModifierChoices0.4', 'Precise');

    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'power row'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Action: actionTaken, Description: 'Modifier 1'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Action: actionTaken, Description: 'Modifier 2'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Action: actionTaken, Description: 'Modifier 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Action: actionTaken, Description: 'Modifier 4'});
    testResults.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,4).getName(), Action: actionTaken, Description: 'Modifier 5'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0,5).isBlank(), Action: actionTaken, Description: 'No more modifiers'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierList.sortOrder', testResults, isFirst);
};
