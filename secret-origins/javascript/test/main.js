TestSuite.main={};
TestSuite.main.changeRuleset=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var rulesetElement = document.getElementById('ruleset');
    var latestRuleString = Main.getLatestRuleset().toString();

    TestRunner.changeValue('ruleset', latestRuleString);
    //unfortunately I can't test the default values because by test runner resets the version every test
    //it needs to do this so that a test for 1.1 doesn't mess up a test for 2.7
    //testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Default ActiveRuleset is LatestRuleset'});
    //testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Default value of element'});

    try{
    TestRunner.changeValue('ruleset', '');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Empty: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Empty: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Empty'});}

    try{
    TestRunner.changeValue('ruleset', '   ');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Blank: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Blank: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Blank'});}

    try{
    TestRunner.changeValue('ruleset', 'zasduiasdhui');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Invalid: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Invalid: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Invalid'});}

    try{
    TestRunner.changeValue('ruleset', 'v2.0');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Typo v2.0: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Typo v2.0: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Typo v2.0'});}

    try{
    TestRunner.changeValue('ruleset', '-2.0');
    testResults.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: 'Negative: ActiveRuleset -2.0 -> 1.0'});
    testResults.push({Expected: '1.0', Actual: rulesetElement.value, Description: 'Negative: Element -2.0 -> 1.0'});
    } catch(e){testResults.push({Error: e, Description: 'Negative'});}

    try{
    TestRunner.changeValue('ruleset', '999');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Huge: ActiveRuleset 999 -> latest'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Huge: Element 999 -> latest'});
    } catch(e){testResults.push({Error: e, Description: 'Huge'});}

    try{
    TestRunner.changeValue('ruleset', '2.5');
    testResults.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Normal: ActiveRuleset 2.5 -> 2.5'});
    testResults.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Normal: Element 2.5 -> 2.5'});
    } catch(e){testResults.push({Error: e, Description: 'Normal'});}

    try{
    TestRunner.changeValue('ruleset', '2');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'No minor: ActiveRuleset 2 -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'No minor: Element 2 -> 2.0'});
    } catch(e){testResults.push({Error: e, Description: 'No minor'});}

    try{
    TestRunner.changeValue('ruleset', '2.7.0184e9a');
    testResults.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Description: 'Ignore micro: ActiveRuleset 2.7.0184e9a -> 2.7'});
    testResults.push({Expected: '2.7', Actual: rulesetElement.value, Description: 'Ignore micro: Element 2.7.0184e9a -> 2.7'});
    } catch(e){testResults.push({Error: e, Description: 'Ignore micro'});}

    try{
    TestRunner.changeValue('ruleset', '2.invalid');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Minor defaults: ActiveRuleset 2.invalid -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Minor defaults: Element 2.invalid -> 2.0'});
    } catch(e){testResults.push({Error: e, Description: 'Minor defaults'});}

    try{
    TestRunner.changeValue('ruleset', 'invalid.5');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Major doesn\'t default: ActiveRuleset invalid.5 -> not changed'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Major doesn\'t default: Element invalid.5 -> not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Major doesn\'t default'});}

    try{
    TestRunner.changeValue('ruleset', '3,3');
    testResults.push({Expected: '3.0', Actual: Main.getActiveRuleset().toString(), Description: 'Typo 3,3: ActiveRuleset minor not changed'});
    testResults.push({Expected: '3.0', Actual: rulesetElement.value, Description: 'Typo 3,3: Element minor not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Typo 3,3'});}

    try{
    TestRunner.changeValue('ruleset', '2.5');  //this will work if above tests pass. so don't assert
    TestRunner.changeValue('ruleset', '2.-5.2');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, negative minor: ActiveRuleset 2.-5.2 -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Edge case, negative minor: Element 2.-5.2 -> 2.0'});
    } catch(e){testResults.push({Error: e, Description: 'Edge case, negative minor'});}

    try{
    TestRunner.changeValue('ruleset', '2.4');
    TestRunner.changeValue('ruleset', '2.5.2.1.7.8');
    testResults.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, numbers and dots: ActiveRuleset 2.5.2.1.7.8 -> 2.5'});
    testResults.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Edge case, numbers and dots: Element 2.5.2.1.7.8 -> 2.5'});
    } catch(e){testResults.push({Error: e, Description: 'Edge case, numbers and dots'});}

    try{
    TestRunner.changeValue('ruleset', '2.6');
    TestRunner.changeValue('Strength', '2');
    TestRunner.changeValue('ruleset', '2.7');
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Maintains document on version change'});
    } catch(e){testResults.push({Error: e, Description: 'Maintains document on version change'});}

    return TestRunner.displayResults('TestSuite.main.changeRuleset', testResults, isFirst);
};
TestSuite.main.changeTranscendence=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.changeTranscendence', testResults, isFirst);
};
TestSuite.main.clear=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.clear', testResults, isFirst);
};
TestSuite.main.loadFile=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    try{
    document.getElementById('fileChooser').value = '';  //clear the input
    SelectUtil.changeText('powerChoices0', 'Damage');
    Main.loadFile();
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Loading no file does nothing'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    //this test is complete since I can't set the file chooser to anything else

    return TestRunner.displayResults('TestSuite.main.loadFile', testResults, isFirst);
};
TestSuite.main.loadImageFromFile=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    try{
    document.getElementById('imgFileChooser').value = '';  //clear the input
    document.getElementById('characterImage').src = '../images/Construct.jpg';
    var expected = document.getElementById('characterImage').src;  //will be converted to absolute path
    Main.loadImageFromFile();
    testResults.push({Expected: expected, Actual: document.getElementById('characterImage').src, Description: 'Loading no file does nothing'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    //this test is complete since I can't set the file chooser to anything else

    return TestRunner.displayResults('TestSuite.main.loadImageFromFile', testResults, isFirst);
};
TestSuite.main.getProtectionTotal=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.getProtectionTotal', testResults, isFirst);

    //be sure to call Main.setRuleset(1, 1); inside tests and:
    //return TestRunner.displayResults('TestSuite.powerRow.setDuration. Rules: '+Main.getActiveRuleset(), testResults, isFirst);
};
TestSuite.main.update=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.update', testResults, isFirst);
};
TestSuite.main.updateInitiative=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var initiativeElement = document.getElementById('initiative');

    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Agility').getValue(), Description: 'Initial Agility'});
    testResults.push({Expected: '+0', Actual: initiativeElement.innerHTML, Description: 'Initial Initiative'});

    try{
    TestRunner.changeValue('Agility', 2);
    testResults.push({Expected: '+2', Actual: initiativeElement.innerHTML, Description: 'Set Agility 2'});
    } catch(e){testResults.push({Error: e, Description: 'Set Agility 2'});}

    try{
    TestRunner.changeValue('Agility', -3);
    testResults.push({Expected: '-3', Actual: initiativeElement.innerHTML, Description: 'Set Agility -3'});
    } catch(e){testResults.push({Error: e, Description: 'Set Agility -3'});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Seize Initiative');
    testResults.push({Expected: '-3 with Seize Initiative', Actual: initiativeElement.innerHTML, Description: 'Add Seize Initiative'});
    } catch(e){testResults.push({Error: e, Description: 'Add Seize Initiative'});}

    try{
    SelectUtil.changeText('advantageChoices1', 'Improved Initiative');
    TestRunner.changeValue('advantageRank1', 2);
    testResults.push({Expected: '+1 with Seize Initiative', Actual: initiativeElement.innerHTML, Description: '2.7 Improved Initiative 2'});
    } catch(e){testResults.push({Error: e, Description: '2.7 Improved Initiative 2'});}

    try{
    Main.clear();
    Main.setRuleset(1, 1);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 3);
    testResults.push({Expected: '+12', Actual: initiativeElement.innerHTML, Description: '1.1 Improved Initiative 3'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Improved Initiative 3'});}

    try{
    Main.clear();
    Main.setRuleset(3, 0);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 4);
    testResults.push({Expected: '+4', Actual: initiativeElement.innerHTML, Description: '3.0 Improved Initiative 4'});
    } catch(e){testResults.push({Error: e, Description: '3.0 Improved Initiative 4'});}

    return TestRunner.displayResults('TestSuite.main.updateInitiative', testResults, isFirst);
};
TestSuite.main.updateOffense=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.updateOffense', testResults, isFirst);
};
TestSuite.main.calculatePowerLevelLimitations=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.calculatePowerLevelLimitations', testResults, isFirst);
};
TestSuite.main.calculateTotal=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.calculateTotal', testResults, isFirst);
};
TestSuite.main.convertDocument=function(isFirst)
{
    TestRunner.clearResults(isFirst);

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
    testResults.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Description: actionTaken+': Convert a Power'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    try{
    input = JSON.parse(blankDoc);
    input.version = 1;
    useLoadButton(JSON.stringify(input));
    testResults.push({Expected: blankDoc, Actual: useSaveButton(), Description: 'Convert old nothing'});
    useLoadButton(blankDoc);
    testResults.push({Expected: blankDoc, Actual: useSaveButton(), Description: 'Convert new nothing'});
    } catch(e){testResults.push({Error: e, Description: 'Convert nothing'});}

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
    testResults.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Description: actionTaken+': Convert 2 Powers and 2 equipments'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    //minor clean up:
    document.getElementById('code box').value = '';

    return TestRunner.displayResults('TestSuite.main.convertDocument', testResults, isFirst);
};
TestSuite.main.determineCompatibilityIssues=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.determineCompatibilityIssues', testResults, isFirst);
};
TestSuite.main.loadFromString=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.loadFromString', testResults, isFirst);
};
TestSuite.main.makeOffenseRow=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.main.makeOffenseRow', testResults, isFirst);
};
