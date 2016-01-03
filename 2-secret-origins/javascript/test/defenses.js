Tester.defenseList={};
Tester.defenseList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.defenseList.data={setUp: Tester.data.beforeAll};
Tester.defenseList.calculateValues=function(isFirst)
{
    TesterUtility.clearResults(isFirst);  //this also sets old rules to false

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: '0', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will input').value, Action: actionTaken, Description: 'Will defense input says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getRank(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Presence').getValue(), Action: actionTaken, Description: 'Presence is 0'});

   //test new rule functionality
    actionTaken='Set Presence'; TesterUtility.changeValue('Presence', 2);
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Presence').getValue(), Action: actionTaken, Description: 'Presence was set to 2'});
    testResults.push({Expected: '2', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 2'});
    testResults.push({Expected: '2', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 2'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});

    actionTaken='Change Will'; TesterUtility.changeValue('Will input', 1);
    testResults.push({Expected: '2', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 2'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getByName('Will').getRank(), Action: actionTaken, Description: 'Will defense input is 1'});
    //document.getElementById('Will input').value is always valid (as long as TesterUtility.changeValue works)
    testResults.push({Expected: '3', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 1'});
    //abilitySection and defenseSection are both cleared by Main.setRuleset

   //test old rule functionality
    actionTaken='Set Old Rules'; Main.setRuleset(1, 1);
    testResults.push({Expected: '0', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Awareness').getValue(), Action: actionTaken, Description: 'Awareness is 0'});

    actionTaken='Set Awareness'; TesterUtility.changeValue('Awareness', 3);
    testResults.push({Expected: 3, Actual: Main.abilitySection.getByName('Awareness').getValue(), Action: actionTaken, Description: 'Awareness was set to 3'});
    testResults.push({Expected: '3', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: '3', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});

    actionTaken='Change Will'; TesterUtility.changeValue('Will input', 1);
    testResults.push({Expected: '3', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getByName('Will').getRank(), Action: actionTaken, Description: 'Will defense input is 1'});
    testResults.push({Expected: '4', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 4'});
    testResults.push({Expected: 4, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 4'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 1'});
    Main.setRuleset(2, 7);

    TesterUtility.displayResults('Tester.defenseList.calculateValues', testResults, isFirst);
};
Tester.defenseList.load=function(isFirst)
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

    TesterUtility.displayResults('Tester.defenseList.load', testResults, isFirst);
};
Tester.defenseList.calculateToughness=function(isFirst)
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

    TesterUtility.displayResults('Tester.defenseList.calculateToughness', testResults, isFirst);
};
