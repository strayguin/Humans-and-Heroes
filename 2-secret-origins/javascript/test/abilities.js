TestSuite.abilityList={};
TestSuite.abilityList.calculateValues=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: '0', Actual: document.getElementById('Strength').value, Description: actionTaken+': Strength says 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: actionTaken+': And it is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getTotal(), Description: actionTaken+': The ability section total cost is 0'});

   //test non absent
    actionTaken='Set Strength'; TestRunner.changeValue('Strength', 2);
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: actionTaken+': Strength was set to 2'});
    testResults.push({Expected: 4, Actual: Main.abilitySection.getTotal(), Description: actionTaken+': The ability section total cost is 4'});

   //test absent non stamina
    actionTaken='Set absent Awareness'; TestRunner.changeValue('Awareness', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Awareness').isAbsent(), Description: actionTaken+': Awareness is absent'});
    testResults.push({Expected: -6, Actual: Main.abilitySection.getTotal(), Description: actionTaken+': The ability section total cost is -6'});
    //also checks that the total is a sum
    Main.abilitySection.clear();

   //test absent stamina in new rules
    actionTaken='Set absent Stamina'; TestRunner.changeValue('Stamina', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: actionTaken+': Stamina is absent'});
    testResults.push({Expected: 30, Actual: Main.abilitySection.getTotal(), Description: actionTaken+': The ability section total cost is 30'});

   //test absent stamina in new rules
    actionTaken='Set Old absent Stamina'; Main.setRuleset(1, 1); TestRunner.changeValue('Stamina', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: actionTaken+': Stamina is absent'});
    testResults.push({Expected: -10, Actual: Main.abilitySection.getTotal(), Description: actionTaken+': The ability section total cost is -10'});
    Main.setRuleset(2, 7);

    return TestRunner.displayResults('TestSuite.abilityList.calculateValues', testResults, isFirst);
};
