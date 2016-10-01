TestSuite.modifierRow={};
TestSuite.modifierRow.setModifier=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.modifierRow.setModifier', testResults, isFirst);
};
TestSuite.modifierRow.setRank=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.modifierRow.setRank', testResults, isFirst);
};
TestSuite.modifierRow.calculateTotal=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
       //old modifier tests: *) changing from sustained to permanent is free *) changing from permanent to sustained is free
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierRow.calculateTotal', testResults, isFirst);
};
TestSuite.modifierRow.generate=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.modifierRow.generate', testResults, isFirst);
};
TestSuite.modifierRow.setAutoRank=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    //can't save var to powerRowTotal0 and powerModifierRowTotal0.0 because they keep getting recreated

    SelectUtil.changeText('powerChoices0', 'Damage');
    TestRunner.changeValue('powerRank0', 99);
    testResults.push({Expected: '99', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 initial total'});
    //TODO: tests (except generate and setAll) should not check the document

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '-19', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 99 Removable modifier total'});
    testResults.push({Expected: '80', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 99 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-39', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 99 Easily Removable modifier total'});
    testResults.push({Expected: '60', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 99 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-49', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 99 Alternate Effect modifier total'});
    testResults.push({Expected: '50', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 99 Alternate Effect'});}

    try{
    TestRunner.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-1', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 4 Easily Removable modifier total'});
    testResults.push({Expected: '3', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 4 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 4 Easily Removable'});}

    TestRunner.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '-20', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 100 Removable modifier total'});
    testResults.push({Expected: '80', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 100 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 100 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-40', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 100 Easily Removable modifier total'});
    testResults.push({Expected: '60', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 100 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 100 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-50', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 100 Alternate Effect modifier total'});
    testResults.push({Expected: '50', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 100 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 100 Alternate Effect'});}

    TestRunner.changeValue('powerRank0', 1);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 1 Removable modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 1 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 1 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 1 Easily Removable modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 1 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 1 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 1 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 1 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 1 Alternate Effect'});}

    try{
    TestRunner.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 4 Removable modifier total'});
    testResults.push({Expected: '4', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 4 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 4 Removable'});}

    try{
    TestRunner.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 2 Easily Removable modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 2 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 2 Easily Removable'});}

    Main.clear(); Main.setRuleset(1, 1);
    SelectUtil.changeText('powerChoices0', 'Damage');
    TestRunner.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '-98', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 100 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 100 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 100 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-99', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 100 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 100 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 100 Alternate Effect'});}

    TestRunner.changeValue('powerRank0', 99);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '-97', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 99 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 99 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 99 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-98', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 99 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 99 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 99 Alternate Effect'});}

    TestRunner.changeValue('powerRank0', 1);

    //TODO: look at changing 1.1 alt effects into an extra
    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '1', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 1 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 1 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 1 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 1 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 1 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 1 Alternate Effect'});}

    return TestRunner.displayResults('TestSuite.modifierRow.setAutoRank', testResults, isFirst);
};
TestSuite.modifierRow.setValues=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.modifierRow.setValues', testResults, isFirst);
};
