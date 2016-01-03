Tester.modifierRow={};
Tester.modifierRow.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.modifierRow.data={setUp: Tester.data.beforeAll};
Tester.modifierRow.setModifier=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.setModifier', testResults, isFirst);
};
Tester.modifierRow.setRank=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.setRank', testResults, isFirst);
};
Tester.modifierRow.calculateTotal=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
       //old modifier tests: *) changing from sustained to permanent is free *) changing from permanent to sustained is free
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierRow.calculateTotal', testResults, isFirst);
};
Tester.modifierRow.generate=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.generate', testResults, isFirst);
};
Tester.modifierRow.setAutoRank=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='N/A';
    //can't save var to powerRowTotal0 and powerModifierRowTotal0.0 because they keep getting recreated

    SelectUtil.changeText('powerChoices0', 'Damage');
    TesterUtility.changeValue('powerRank0', 99);
    testResults.push({Expected: '99', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 99 initial total'});

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '-19', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 99 Removable modifier total'});
    testResults.push({Expected: '80', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 99 Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-39', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 99 Easily Removable modifier total'});
    testResults.push({Expected: '60', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 99 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-49', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 99 Alternate Effect modifier total'});
    testResults.push({Expected: '50', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 99 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-1', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 4 Easily Removable modifier total'});
    testResults.push({Expected: '3', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 4 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '-20', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 100 Removable modifier total'});
    testResults.push({Expected: '80', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 100 Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-40', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 100 Easily Removable modifier total'});
    testResults.push({Expected: '60', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 100 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-50', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 100 Alternate Effect modifier total'});
    testResults.push({Expected: '50', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 100 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.changeValue('powerRank0', 1);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 1 Removable modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 1 Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 1 Easily Removable modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 1 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 1 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 1 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 4 Removable modifier total'});
    testResults.push({Expected: '4', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 4 Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: 'Damage 2 Easily Removable modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: 'Damage 2 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    Main.clear(); Main.setRuleset(1, 1);
    SelectUtil.changeText('powerChoices0', 'Damage');
    TesterUtility.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '-98', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: '1.1 Damage 100 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: '1.1 Damage 100 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-99', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: '1.1 Damage 100 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: '1.1 Damage 100 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.changeValue('powerRank0', 99);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '-97', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: '1.1 Damage 99 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: '1.1 Damage 99 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-98', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: '1.1 Damage 99 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: '1.1 Damage 99 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.changeValue('powerRank0', 1);

    //TODO: look at changing 1.1 alt effects into an extra
    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '1', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: '1.1 Damage 1 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: '1.1 Damage 1 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Action: actionTaken, Description: '1.1 Damage 1 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Action: actionTaken, Description: '1.1 Damage 1 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierRow.setAutoRank', testResults, isFirst);
};
Tester.modifierRow.setValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.setValues', testResults, isFirst);
};
