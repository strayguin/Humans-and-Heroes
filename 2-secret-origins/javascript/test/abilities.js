Tester.abilityList={};
Tester.abilityList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.abilityList.data={setUp: Tester.data.beforeAll};
Tester.abilityList.calculateValues=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: '0', Actual: document.getElementById('Strength').value, Action: actionTaken, Description: 'Strength says 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Strength').getValue(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is 0'});

   //test non absent
    actionTaken='Set Strength'; TesterUtility.changeValue('Strength', 2);
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Action: actionTaken, Description: 'Strength was set to 2'});
    testResults.push({Expected: 4, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is 4'});

   //test absent non stamina
    actionTaken='Set absent Awareness'; TesterUtility.changeValue('Awareness', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Awareness').isAbsent(), Action: actionTaken, Description: 'Awareness is absent'});
    testResults.push({Expected: -6, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is -6'});
    //also checks that the total is a sum
    Main.abilitySection.clear();

   //test absent stamina in new rules
    actionTaken='Set absent Stamina'; TesterUtility.changeValue('Stamina', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Action: actionTaken, Description: 'Stamina is absent'});
    testResults.push({Expected: 30, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is 30'});

   //test absent stamina in new rules
    actionTaken='Set Old absent Stamina'; Main.setRuleset(1, 1); TesterUtility.changeValue('Stamina', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Action: actionTaken, Description: 'Stamina is absent'});
    testResults.push({Expected: -10, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is -10'});
    Main.setRuleset(2, 7);

    TesterUtility.displayResults('Tester.abilityList.calculateValues', testResults, isFirst);
};
