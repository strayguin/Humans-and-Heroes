TestSuite.powerList={};
TestSuite.powerList.calculateValues=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.powerList.calculateValues', testResults, isFirst);
};
TestSuite.powerList.load=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];

    Main.setMockMessenger(Messages.errorCapture);

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"Text test","action":"Free","range":"Personal","duration":"Sustained",
       "Modifiers":[{"name":"Selective"}], "rank":2});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Happy Path: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Happy Path: 1 row'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Happy Path: no errors'});
    testResults.push({Expected: false, Actual: Main.powerSection.getRow(0).isBaseCostSettable(), Description: 'Happy Path: isBaseCostSettable'});
    testResults.push({Expected: 'Text test', Actual: Main.powerSection.getRow(0).getText(), Description: 'Happy Path: text'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Happy Path: default action'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Happy Path: default range'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Happy Path: default duration'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getRow(0).getModifierList().getRow(0).getName(), Description: 'Happy Path: simple modifier'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(0).getModifierList().getRow(1).isBlank(), Description: 'Happy Path: no others modifiers'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getRow(0).getRank(), Description: 'Happy Path: rank'});
    testResults.push({Expected: 6, Actual: Main.powerSection.getTotal(), Description: 'Happy Path: Make sure update was called'});
    } catch(e){testResults.push({Error: e, Description: 'Happy Path'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Equipment.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[], "rank":1});
    dataToLoad.Advantages.push({"name":"Equipment","rank":1});  //just to make the path happy
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.equipmentSection.getRow(0).getEffect(), Description: 'Happy Equipment: Effect'});
    //just confirming that it loaded
    testResults.push({Expected: true, Actual: Main.equipmentSection.getRow(1).isBlank(), Description: 'Happy Equipment: 1 row'});
    } catch(e){testResults.push({Error: e, Description: 'Happy Equipment'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    dataToLoad.Powers.push({"effect":"Invalid","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Errors: Flight was loaded'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerListAgnostic.load.notExist'), Description: 'Errors: not found'});
    } catch(e){testResults.push({Error: e, Description: 'Errors'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    dataToLoad.Powers.push({"effect":"A God I Am","text":"","action":"Triggered","range":"Personal","duration":"Continuous","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: false, Actual: Main.canUseGodHood(), Description: 'Errors: Godhood is off'});
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Errors: Flight was loaded'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerListAgnostic.load.godhood'), Description: 'Errors: A God I Am was not allowed'});
    } catch(e){testResults.push({Error: e, Description: 'Errors'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Hero.transcendence = 1;  //set godhood
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    //flight is to make sure transcendence isn't reset
    dataToLoad.Powers.push({"effect":"A God I Am","text":"","action":"Triggered","range":"Personal","duration":"Continuous","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: true, Actual: Main.canUseGodHood(), Description: 'Load Godhood: Godhood is on'});
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Load Godhood: Flight was loaded'});
    testResults.push({Expected: 'A God I Am', Actual: Main.powerSection.getRow(1).getEffect(), Description: 'Load Godhood: A God I Am was loaded'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(2).isBlank(), Description: 'Load Godhood: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Load godhood: No errors'});
    } catch(e){testResults.push({Error: e, Description: 'Load godhood'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Attain Knowledge","cost":3,"text":"","action":"Standard","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Attain Knowledge', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Cost: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Cost: 1 row'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(0).isBaseCostSettable(), Description: 'Custom Cost: isBaseCostSettable'});
    testResults.push({Expected: 3, Actual: Main.powerSection.getRow(0).getBaseCost(), Description: 'Custom Cost: getBaseCost'});
    } catch(e){testResults.push({Error: e, Description: 'Custom Cost'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Personal","duration":"Sustained",
       "Modifiers":[{"name":"Slower Action","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Description: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Description: 1 row'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Custom Description: getAction'});
    } catch(e){testResults.push({Error: e, Description: 'Custom Description'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Standard","range":"Ranged","duration":"Instant",
       "Modifiers":[{"name":"Increased Range","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Healing', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Range: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Range: 1 row'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Custom Range: getRange'});
    } catch(e){testResults.push({Error: e, Description: 'Custom Range'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Concentration",
       "Modifiers":[{"name":"Decreased Duration","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Duration: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Duration: 1 row'});
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Custom Duration: getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Custom Duration'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Close","duration":"Instant",
       "name":"Damage name","skill":"Skill used","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Name and skill: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Name and skill: 1 row'});
    testResults.push({Expected: 'Damage name', Actual: Main.powerSection.getRow(0).getName(), Description: 'Name and skill: getName'});
    testResults.push({Expected: 'Skill used', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Name and skill: getSkillUsed'});
    } catch(e){testResults.push({Error: e, Description: 'Name and skill'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Mind Reading","text":"","action":"Standard","range":"Perception","duration":"Sustained",
       "name":"Mind Reading name","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Mind Reading', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Name only: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Name only: 1 row'});
    testResults.push({Expected: 'Mind Reading name', Actual: Main.powerSection.getRow(0).getName(), Description: 'Name only: getName'});
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Name only: getSkillUsed'});
    } catch(e){testResults.push({Error: e, Description: 'Name only'});}

    Main.clearMockMessenger();  //restore default behavior
    return TestRunner.displayResults('TestSuite.powerList.load', testResults, isFirst);
};
TestSuite.powerList.save=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.powerList.save', testResults, isFirst);
};
TestSuite.powerList.notifyDependent=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.powerList.notifyDependent', testResults, isFirst);
};
