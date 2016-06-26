TestSuite.advantageList={};
TestSuite.advantageList.calculateEquipmentRank=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is still 0'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is still 0'});

    try{
    actionTaken='Damage Added';
    SelectUtil.changeText('equipmentChoices0', 'Damage');  //use Damage because it has a base cost of 1
    testResults.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Equipment Row is created'});
    testResults.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is now the minimum'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is now 1'});

    actionTaken='Damage Rank 5'; TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is the maximum of 5'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is still 1'});
    actionTaken='Damage Rank 6'; TestRunner.changeValue('equipmentRank0', 6);
    testResults.push({Expected: 10, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is now 10'});
    testResults.push({Expected: 2, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is now 2'});
    actionTaken='Damage Rank 5'; TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is back to the maximum of 5'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is back to 1'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    actionTaken='Damage Removed';
    Main.equipmentSection.clear();  //no need for a catch here: if this fails everything will fail
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is removed'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is now 0'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is now 0'});

    return TestRunner.displayResults('TestSuite.advantageList.calculateEquipmentRank', testResults, isFirst);
};
TestSuite.advantageList.calculateValues=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': There are no Advantage Rows'});
    testResults.push({Expected: false, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has no godhood'});
    testResults.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': And petty rules apply'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRankMap().isEmpty(), Description: actionTaken+': RankMap is empty'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage total is 0'});

   //test non petty godhood
    try{
    actionTaken='Set Godhood'; TestRunner.changeValue('Strength', 30);
    testResults.push({Expected: true, Actual: Main.canUseGodHood(), Description: actionTaken+': Godhood is usable'});
    actionTaken='Set Beyond Mortal'; SelectUtil.changeText('advantageChoices0', 'Beyond Mortal');
    testResults.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Beyond Mortal is set'});
    testResults.push({Expected: true, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has godhood'});
    testResults.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': But petty rules still apply'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

   //test petty godhood
    try{
    actionTaken='Set Petty Rules'; SelectUtil.changeText('advantageChoices0', 'Your Petty Rules Don\'t Apply to Me');
    testResults.push({Expected: 'Your Petty Rules Don\'t Apply to Me', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Your Petty Rules Don\'t Apply to Me is set'});
    testResults.push({Expected: true, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has godhood'});
    testResults.push({Expected: false, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': And petty rules don\'t apply'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

   //test rank map
    try{
    actionTaken='Set Improved Initiative'; SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    testResults.push({Expected: 'Improved Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Improved Initiative is set'});
    testResults.push({Expected: false, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has no godhood'});
    testResults.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': And petty rules do apply'});
    actionTaken='Set rank to 2'; TestRunner.changeValue('advantageRank0', 2);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRankMap().containsKey('Improved Initiative'), Description: actionTaken+': RankMap has Improved Initiative'});
    testResults.push({Expected: 2, Actual: Main.advantageSection.getRankMap().get('Improved Initiative'), Description: actionTaken+': with rank of 2'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRankMap().containsKey('Defensive Roll'), Description: actionTaken+': RankMap doesn\'t have Defensive Roll'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getRankMap().get('Defensive Roll'), Description: actionTaken+': with default rank of 0'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

   //test total
    try{
    actionTaken='Set Lucky 2'; SelectUtil.changeText('advantageChoices0', 'Lucky'); TestRunner.changeValue('advantageRank0', 2);
    testResults.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Lucky is set'});
    testResults.push({Expected: 2, Actual: Main.advantageSection.getRow(0).getRank(), Description: actionTaken+': with rank of 2'});
    actionTaken='Set Defensive Roll 3'; SelectUtil.changeText('advantageChoices1', 'Defensive Roll'); TestRunner.changeValue('advantageRank1', 3);
    testResults.push({Expected: 'Defensive Roll', Actual: Main.advantageSection.getRow(1).getName(), Description: actionTaken+': Defensive Roll is set'});
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(1).getRank(), Description: actionTaken+': with rank of 3'});
    testResults.push({Expected: 13, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage total is 13'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.advantageList.calculateValues', testResults, isFirst);
};
TestSuite.advantageList.load=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];

    Main.setMockMessenger(Messages.errorCapture);

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Happy Path: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Happy Path: nothing else'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Happy Path: has rank'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Happy Path: has text'});
    } catch(e){testResults.push({Error: e, Description: 'Happy Path'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    dataToLoad.Advantages.push({name: 'Die hard'});  //not found. real name is Diehard
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Errors: Seize Initiative was loaded'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('AdvantageList.load.notExist'), Description: 'Errors: Die hard was not found'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: 'Errors: Make sure update was called'});
    } catch(e){testResults.push({Error: e, Description: 'Errors'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    Loader.sendData(dataToLoad);
    testResults.push({Expected: false, Actual: Main.canUseGodHood(), Description: 'Errors: Godhood is off'});
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Errors: Seize Initiative was loaded'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('AdvantageList.load.godhood'), Description: 'Errors: Beyond Mortal was not allowed'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: 'Errors: Make sure update was called'});
    } catch(e){testResults.push({Error: e, Description: 'Errors'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Hero.transcendence = 1;  //set godhood
    dataToLoad.Advantages.push({name: 'Seize Initiative'});  //normal to make sure transcendence isn't reset
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    Loader.sendData(dataToLoad);
    testResults.push({Expected: true, Actual: Main.canUseGodHood(), Description: 'Load godhood: Godhood is on'});
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load godhood: Seize Initiative was loaded'});
    testResults.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(1).getName(), Description: 'Load godhood: Beyond Mortal was loaded'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Load godhood: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Load godhood'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'text'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: 'Ultimate Effort', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Text: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Text: nothing else'});
    testResults.push({Expected: 'text', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Text: getText'});
    } catch(e){testResults.push({Error: e, Description: 'Text'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Defensive Roll', rank: 3});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: 'Defensive Roll', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Rank: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Rank: nothing else'});
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Rank: getRank'});
    } catch(e){testResults.push({Error: e, Description: 'Rank'});}

    Main.clearMockMessenger();  //restore default behavior
    return TestRunner.displayResults('TestSuite.advantageList.load', testResults, isFirst);
};
TestSuite.advantageList.sortOrder=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    SelectUtil.changeText('advantageChoices0', 'Connected');
    SelectUtil.changeText('equipmentChoices0', 'Damage');
    SelectUtil.changeText('advantageChoices2', 'Benefit');

    testResults.push({Expected: 'Damage', Actual: Main.equipmentSection.getRow(0).getEffect(), Description: 'equipment section row'});
    testResults.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Advantage 1'});
    testResults.push({Expected: 'Connected', Actual: Main.advantageSection.getRow(1).getName(), Description: 'Advantage 2'});
    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(2).getName(), Description: 'Advantage 3'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(3).isBlank(), Description: 'No more Advantages'});
    } catch(e){testResults.push({Error: e, Description: 'sortOrder'});}

    return TestRunner.displayResults('TestSuite.advantageList.sortOrder', testResults, isFirst);
};
