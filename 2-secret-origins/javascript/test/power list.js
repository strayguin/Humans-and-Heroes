Tester.powerList={};
Tester.powerList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.powerList.data={setUp: Tester.data.beforeAll};
Tester.powerList.calculateValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.powerList.calculateValues', testResults, isFirst);
};
Tester.powerList.load=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];
    var actionTaken='N/A';

    Main.setMockMessenger(Messages.errorCapture);

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"Text test","action":"Free","range":"Personal","duration":"Sustained",
       "Modifiers":[{"name":"Selective"}], "rank":2});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Happy Path: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Happy Path: 1 row'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Happy Path: no errors'});
    testResults.push({Expected: false, Actual: Main.powerSection.getRow(0).isBaseCostSettable(), Action: actionTaken, Description: 'Happy Path: isBaseCostSettable'});
    testResults.push({Expected: 'Text test', Actual: Main.powerSection.getRow(0).getText(), Action: actionTaken, Description: 'Happy Path: text'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Happy Path: default action'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Happy Path: default range'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Happy Path: default duration'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getRow(0).getModifierList().getRow(0).getName(), Action: actionTaken, Description: 'Happy Path: simple modifier'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(0).getModifierList().getRow(1).isBlank(), Action: actionTaken, Description: 'Happy Path: no others modifiers'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getRow(0).getRank(), Action: actionTaken, Description: 'Happy Path: rank'});
    testResults.push({Expected: 6, Actual: Main.powerSection.getTotal(), Action: actionTaken, Description: 'Happy Path: Make sure update was called'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Equipment.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[], "rank":1});
    dataToLoad.Advantages.push({"name":"Equipment","rank":1});  //just to make the path happy
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.equipmentSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Happy Equipment: Effect'});
    //just confirming that it loaded
    testResults.push({Expected: true, Actual: Main.equipmentSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Happy Equipment: 1 row'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    dataToLoad.Powers.push({"effect":"Invalid","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Errors: Flight was loaded'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerListAgnostic.load.notExist'), Action: actionTaken, Description: 'Errors: not found'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    dataToLoad.Powers.push({"effect":"A God I Am","text":"","action":"Triggered","range":"Personal","duration":"Continuous","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: false, Actual: Main.canUseGodHood(), Action: actionTaken, Description: 'Errors: Godhood is off'});
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Errors: Flight was loaded'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerListAgnostic.load.godhood'), Action: actionTaken, Description: 'Errors: A God I Am was not allowed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Hero.transcendence = 1;  //set godhood
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    //flight is to make sure transcendence isn't reset
    dataToLoad.Powers.push({"effect":"A God I Am","text":"","action":"Triggered","range":"Personal","duration":"Continuous","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: true, Actual: Main.canUseGodHood(), Action: actionTaken, Description: 'Load Godhood: Godhood is on'});
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Load Godhood: Flight was loaded'});
    testResults.push({Expected: 'A God I Am', Actual: Main.powerSection.getRow(1).getEffect(), Action: actionTaken, Description: 'Load Godhood: A God I Am was loaded'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(2).isBlank(), Action: actionTaken, Description: 'Load Godhood: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Load godhood: No errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Attain Knowledge","cost":3,"text":"","action":"Standard","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Attain Knowledge', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Custom Cost: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Custom Cost: 1 row'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(0).isBaseCostSettable(), Action: actionTaken, Description: 'Custom Cost: isBaseCostSettable'});
    testResults.push({Expected: 3, Actual: Main.powerSection.getRow(0).getBaseCost(), Action: actionTaken, Description: 'Custom Cost: getBaseCost'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Personal","duration":"Sustained",
       "Modifiers":[{"name":"Slower Action","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Custom Action: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Custom Action: 1 row'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Custom Action: getAction'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Standard","range":"Ranged","duration":"Instant",
       "Modifiers":[{"name":"Increased Range","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Healing', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Custom Range: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Custom Range: 1 row'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Custom Range: getRange'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Concentration",
       "Modifiers":[{"name":"Decreased Duration","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Custom Duration: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Custom Duration: 1 row'});
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Custom Duration: getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Close","duration":"Instant",
       "name":"Damage name","skill":"Skill used","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Name and skill: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Name and skill: 1 row'});
    testResults.push({Expected: 'Damage name', Actual: Main.powerSection.getRow(0).getName(), Action: actionTaken, Description: 'Name and skill: getName'});
    testResults.push({Expected: 'Skill used', Actual: Main.powerSection.getRow(0).getSkillUsed(), Action: actionTaken, Description: 'Name and skill: getSkillUsed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Mind Reading","text":"","action":"Standard","range":"Perception","duration":"Sustained",
       "name":"Mind Reading name","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Mind Reading', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Name only: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Name only: 1 row'});
    testResults.push({Expected: 'Mind Reading name', Actual: Main.powerSection.getRow(0).getName(), Action: actionTaken, Description: 'Name only: getName'});
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Action: actionTaken, Description: 'Name only: getSkillUsed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

   //TODO: fix them all

    Main.clearMockMessenger();  //restore default behavior
    TesterUtility.displayResults('Tester.powerList.load', testResults, isFirst);
};
Tester.powerList.save=function(isFirst)
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

    TesterUtility.displayResults('Tester.powerList.save', testResults, isFirst);
};
Tester.powerList.notifyDependent=function(isFirst)
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

    TesterUtility.displayResults('Tester.powerList.notifyDependent', testResults, isFirst);
};
