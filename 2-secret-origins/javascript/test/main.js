Tester.main={};
Tester.main.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.main.data={setUp: Tester.data.beforeAll};
Tester.main.changeRuleset=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='N/A';
    var rulesetElement = document.getElementById('ruleset');
    var latestRuleString = Main.getLatestRuleset().toString();

    TesterUtility.changeValue('ruleset', latestRuleString);
    //unfortunately I can't test the default values because by test runner resets the version every test
    //it needs to do this so that a test for 1.1 doesn't mess up a test for 2.7
    //testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Default ActiveRuleset is LatestRuleset'});
    //testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Action: actionTaken, Description: 'Default value of element'});

    try{
    TesterUtility.changeValue('ruleset', '');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Empty: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Action: actionTaken, Description: 'Empty: Element not changed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '   ');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Blank: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Action: actionTaken, Description: 'Blank: Element not changed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', 'zasduiasdhui');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Invalid: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Action: actionTaken, Description: 'Invalid: Element not changed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', 'v2.0');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Typo v2.0: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Action: actionTaken, Description: 'Typo v2.0: Element not changed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '-2.0');
    testResults.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Negative: ActiveRuleset -2.0 -> 1.0'});
    testResults.push({Expected: '1.0', Actual: rulesetElement.value, Action: actionTaken, Description: 'Negative: Element -2.0 -> 1.0'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '999');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Huge: ActiveRuleset 999 -> latest'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Action: actionTaken, Description: 'Huge: Element 999 -> latest'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2.5');
    testResults.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Normal: ActiveRuleset 2.5 -> 2.5'});
    testResults.push({Expected: '2.5', Actual: rulesetElement.value, Action: actionTaken, Description: 'Normal: Element 2.5 -> 2.5'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'No minor: ActiveRuleset 2 -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Action: actionTaken, Description: 'No minor: Element 2 -> 2.0'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2.7.0184e9a');
    testResults.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Ignore micro: ActiveRuleset 2.7.0184e9a -> 2.7'});
    testResults.push({Expected: '2.7', Actual: rulesetElement.value, Action: actionTaken, Description: 'Ignore micro: Element 2.7.0184e9a -> 2.7'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2.invalid');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Minor defaults: ActiveRuleset 2.invalid -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Action: actionTaken, Description: 'Minor defaults: Element 2.invalid -> 2.0'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', 'invalid.5');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Major doesn\'t default: ActiveRuleset invalid.5 -> not changed'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Action: actionTaken, Description: 'Major doesn\'t default: Element invalid.5 -> not changed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '3. 1');
    testResults.push({Expected: '3.0', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Typo 3. 1: ActiveRuleset minor not changed'});
    testResults.push({Expected: '3.0', Actual: rulesetElement.value, Action: actionTaken, Description: 'Typo 3. 1: Element minor not changed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2,3');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Typo 2,3: ActiveRuleset minor not changed'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Action: actionTaken, Description: 'Typo 2,3: Element minor not changed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2.5');  //this will work if above tests pass. so don't assert
    TesterUtility.changeValue('ruleset', '2.-5.2');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Edge case, negative minor: ActiveRuleset 2.-5.2 -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Action: actionTaken, Description: 'Edge case, negative minor: Element 2.-5.2 -> 2.0'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2.4');
    TesterUtility.changeValue('ruleset', '2.5.2.1.7.8');
    testResults.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Action: actionTaken, Description: 'Edge case, numbers and dots: ActiveRuleset 2.5.2.1.7.8 -> 2.5'});
    testResults.push({Expected: '2.5', Actual: rulesetElement.value, Action: actionTaken, Description: 'Edge case, numbers and dots: Element 2.5.2.1.7.8 -> 2.5'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('ruleset', '2.6');
    TesterUtility.changeValue('Strength', '2');
    TesterUtility.changeValue('ruleset', '2.7');
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Action: actionTaken, Description: 'Maintains document on version change'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.main.changeRuleset', testResults, isFirst);
};
Tester.main.changeTranscendence=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.changeTranscendence', testResults, isFirst);
};
Tester.main.clear=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.clear', testResults, isFirst);
};
Tester.main.getProtectionTotal=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.getProtectionTotal', testResults, isFirst);

    //be sure to call Main.setRuleset(1, 1); inside tests and:
    //TesterUtility.displayResults('Tester.powerRow.setDuration. Rules: '+Main.getActiveRuleset(), testResults, isFirst);
};
Tester.main.update=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.update', testResults, isFirst);
};
Tester.main.updateInitiative=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='N/A';
    var initiativeElement = document.getElementById('initiative');

    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Agility').getValue(), Action: actionTaken, Description: 'Initial Agility'});
    testResults.push({Expected: '+0', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: 'Initial Initiative'});

    try{
    TesterUtility.changeValue('Agility', 2);
    testResults.push({Expected: '+2', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: 'Set Agility 2'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('Agility', -3);
    testResults.push({Expected: '-3', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: 'Set Agility -3'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Seize Initiative');
    testResults.push({Expected: '-3 with Seize Initiative', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: 'Add Seize Initiative'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('advantageChoices1', 'Improved Initiative');
    TesterUtility.changeValue('advantageRank1', 2);
    testResults.push({Expected: '+1 with Seize Initiative', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: '2.7 Improved Initiative 2'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.clear();
    Main.setRuleset(1, 1);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TesterUtility.changeValue('advantageRank0', 3);
    testResults.push({Expected: '+12', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: '1.1 Improved Initiative 3'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.clear();
    Main.setRuleset(3, 0);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TesterUtility.changeValue('advantageRank0', 4);
    testResults.push({Expected: '+4', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: '3.0 Improved Initiative 4'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.main.updateInitiative', testResults, isFirst);
};
Tester.main.updateOffense=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.updateOffense', testResults, isFirst);
};
Tester.main.calculatePowerLevelLimitations=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.calculatePowerLevelLimitations', testResults, isFirst);
};
Tester.main.calculateTotal=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.calculateTotal', testResults, isFirst);
};
Tester.main.convertDocument=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken, input, expected;

    Main.clear(); Main.setRuleset(2, 7);
    SelectUtil.setText('saveType', 'JSON');
    const blankDoc = JSON.stringify(Main.save());
   function useLoadButton(input)
   {
       document.getElementById('code box').value = input;
       document.getElementById('load text button').onclick();
   }
   function useSaveButton()
   {
       document.getElementById('save text button').onclick();
       return document.getElementById('code box').value;
   }

    try{
    input = JSON.parse(blankDoc);
    input.version = 1;
    input.Powers = [{"name":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant",
       "Modifiers":[{"name":"Selective"}],"rank":3}];
    actionTaken = 'Simple';
    useLoadButton(JSON.stringify(input));
    expected = JSON.parse(blankDoc);
    expected.Powers = [{"effect":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant",
       "name":"Power 1 Damage","skill":"Skill used for attack","Modifiers":[{"name":"Selective"}],"rank":3}];
    testResults.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Action: actionTaken, Description: 'Convert a Power'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    input = JSON.parse(blankDoc);
    input.version = 1;
    actionTaken = 'N/A';
    useLoadButton(JSON.stringify(input));
    testResults.push({Expected: blankDoc, Actual: useSaveButton(), Action: actionTaken, Description: 'Convert old nothing'});
    useLoadButton(blankDoc);
    testResults.push({Expected: blankDoc, Actual: useSaveButton(), Action: actionTaken, Description: 'Convert new nothing'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    input = JSON.parse(blankDoc);
    input.version = 1;
    input.Powers = [{"name":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":3},
       {"name":"Damage","text":"Damage 2","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":2}];
    input.Equipment = [{"name":"Affliction","text":"a","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":1},
       {"name":"Damage","text":"b","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":1}];
    input.Advantages = [{"name":"Equipment","rank":1}];
    actionTaken = '2 Each';
    useLoadButton(JSON.stringify(input));
    expected = JSON.parse(blankDoc);
   expected.Powers = [
      {
          "effect":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant",
          "name":"Power 1 Damage","skill":"Skill used for attack","Modifiers":[],"rank":3
      },
      {
          "effect":"Damage","text":"Damage 2","action":"Standard","range":"Close","duration":"Instant",
          "name":"Power 2 Damage","skill":"Skill used for attack","Modifiers":[],"rank":2
      }
   ];
   expected.Equipment = [
      {
          "effect":"Affliction","text":"a","action":"Standard","range":"Close","duration":"Instant",
          "name":"Equipment 1 Affliction","skill":"Skill used for attack","Modifiers":[],"rank":1
      },
      {
          "effect":"Damage","text":"b","action":"Standard","range":"Close","duration":"Instant",
          "name":"Equipment 2 Damage","skill":"Skill used for attack","Modifiers":[],"rank":1
      }
   ];
    expected.Advantages = [{"name":"Equipment","rank":1}];
    testResults.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Action: actionTaken, Description: 'Convert 2 Powers and 2 equipments'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //minor clean up:
    document.getElementById('code box').value = '';

    TesterUtility.displayResults('Tester.main.convertDocument', testResults, isFirst);
};
Tester.main.determineCompatibilityIssues=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.determineCompatibilityIssues', testResults, isFirst);
};
Tester.main.loadFromString=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.loadFromString', testResults, isFirst);
};
Tester.main.makeOffenseRow=function(isFirst)
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

    TesterUtility.displayResults('Tester.main.makeOffenseRow', testResults, isFirst);
};
