Tester.advantageList={};
Tester.advantageList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.advantageList.data={setUp: Tester.data.beforeAll};
Tester.advantageList.calculateEquipmentRank=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getEquipmentMaxTotal(), Action: actionTaken, Description: 'Equipment Max Total is still 0'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage Total is still 0'});

    try{
    actionTaken='Damage Added';
    SelectUtil.changeText('equipmentChoices0', 'Damage');  //use Damage because it has a base cost of 1
    testResults.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Equipment Row is created'});
    testResults.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Action: actionTaken, Description: 'Equipment Max Total is now the minimum'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage Total is now 1'});

    actionTaken='Damage Rank 5'; TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Action: actionTaken, Description: 'Equipment Max Total is the maximum of 5'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage Total is still 1'});
    actionTaken='Damage Rank 6'; TesterUtility.changeValue('equipmentRank0', 6);
    testResults.push({Expected: 10, Actual: Main.advantageSection.getEquipmentMaxTotal(), Action: actionTaken, Description: 'Equipment Max Total is now 10'});
    testResults.push({Expected: 2, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage Total is now 2'});
    actionTaken='Damage Rank 5'; TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Action: actionTaken, Description: 'Equipment Max Total is back to the maximum of 5'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage Total is back to 1'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    actionTaken='Damage Removed';
    Main.equipmentSection.clear();  //no need for a catch here: if this fails everything will fail
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is removed'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getEquipmentMaxTotal(), Action: actionTaken, Description: 'Equipment Max Total is now 0'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage Total is now 0'});

    TesterUtility.displayResults('Tester.advantageList.calculateEquipmentRank', testResults, isFirst);
};
Tester.advantageList.calculateValues=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'There are no Advantage Rows'});
    testResults.push({Expected: false, Actual: Main.advantageSection.hasGodhoodAdvantages(), Action: actionTaken, Description: 'Advantage section has no godhood'});
    testResults.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Action: actionTaken, Description: 'And petty rules apply'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRankMap().isEmpty(), Action: actionTaken, Description: 'RankMap is empty'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage total is 0'});

   //test non petty godhood
    try{
    actionTaken='Set Godhood'; TesterUtility.changeValue('Strength', 30);
    testResults.push({Expected: true, Actual: Main.canUseGodHood(), Action: actionTaken, Description: 'Godhood is usable'});
    actionTaken='Set Beyond Mortal'; SelectUtil.changeText('advantageChoices0', 'Beyond Mortal');
    testResults.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Beyond Mortal is set'});
    testResults.push({Expected: true, Actual: Main.advantageSection.hasGodhoodAdvantages(), Action: actionTaken, Description: 'Advantage section has godhood'});
    testResults.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Action: actionTaken, Description: 'But petty rules still apply'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

   //test petty godhood
    try{
    actionTaken='Set Petty Rules'; SelectUtil.changeText('advantageChoices0', 'Your Petty Rules Don\'t Apply to Me');
    testResults.push({Expected: 'Your Petty Rules Don\'t Apply to Me', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Your Petty Rules Don\'t Apply to Me is set'});
    testResults.push({Expected: true, Actual: Main.advantageSection.hasGodhoodAdvantages(), Action: actionTaken, Description: 'Advantage section has godhood'});
    testResults.push({Expected: false, Actual: Main.advantageSection.isUsingPettyRules(), Action: actionTaken, Description: 'And petty rules don\'t apply'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

   //test rank map
    try{
    actionTaken='Set Improved Initiative'; SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    testResults.push({Expected: 'Improved Initiative', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Improved Initiative is set'});
    testResults.push({Expected: false, Actual: Main.advantageSection.hasGodhoodAdvantages(), Action: actionTaken, Description: 'Advantage section has no godhood'});
    testResults.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Action: actionTaken, Description: 'And petty rules do apply'});
    actionTaken='Set rank to 2'; TesterUtility.changeValue('advantageRank0', 2);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRankMap().containsKey('Improved Initiative'), Action: actionTaken, Description: 'RankMap has Improved Initiative'});
    testResults.push({Expected: 2, Actual: Main.advantageSection.getRankMap().get('Improved Initiative'), Action: actionTaken, Description: 'with rank of 2'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRankMap().containsKey('Defensive Roll'), Action: actionTaken, Description: 'RankMap doesn\'t have Defensive Roll'});
    testResults.push({Expected: 0, Actual: Main.advantageSection.getRankMap().get('Defensive Roll'), Action: actionTaken, Description: 'with default rank of 0'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

   //test total
    try{
    actionTaken='Set Lucky 2'; SelectUtil.changeText('advantageChoices0', 'Lucky'); TesterUtility.changeValue('advantageRank0', 2);
    testResults.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Lucky is set'});
    testResults.push({Expected: 2, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'with rank of 2'});
    actionTaken='Set Defensive Roll 3'; SelectUtil.changeText('advantageChoices1', 'Defensive Roll'); TesterUtility.changeValue('advantageRank1', 3);
    testResults.push({Expected: 'Defensive Roll', Actual: Main.advantageSection.getRow(1).getName(), Action: actionTaken, Description: 'Defensive Roll is set'});
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(1).getRank(), Action: actionTaken, Description: 'with rank of 3'});
    testResults.push({Expected: 13, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Advantage total is 13'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.advantageList.calculateValues', testResults, isFirst);
};
Tester.advantageList.load=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];
    var actionTaken='N/A';

    Main.setMockMessenger(Messages.errorCapture);

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Happy Path: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Happy Path: nothing else'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Action: actionTaken, Description: 'Happy Path: has rank'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveText(), Action: actionTaken, Description: 'Happy Path: has text'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    dataToLoad.Advantages.push({name: 'Die hard'});  //not found. real name is Diehard
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Errors: Seize Initiative was loaded'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('AdvantageList.load.notExist'), Action: actionTaken, Description: 'Errors: Die hard was not found'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Errors: Make sure update was called'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    Loader.sendData(dataToLoad);
    testResults.push({Expected: false, Actual: Main.canUseGodHood(), Action: actionTaken, Description: 'Errors: Godhood is off'});
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Errors: Seize Initiative was loaded'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Errors: Nothing else was loaded'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('AdvantageList.load.godhood'), Action: actionTaken, Description: 'Errors: Beyond Mortal was not allowed'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Errors: Make sure update was called'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Hero.transcendence = 1;  //set godhood
    dataToLoad.Advantages.push({name: 'Seize Initiative'});  //normal to make sure transcendence isn't reset
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    Loader.sendData(dataToLoad);
    testResults.push({Expected: true, Actual: Main.canUseGodHood(), Action: actionTaken, Description: 'Load godhood: Godhood is on'});
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Load godhood: Seize Initiative was loaded'});
    testResults.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(1).getName(), Action: actionTaken, Description: 'Load godhood: Beyond Mortal was loaded'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Load godhood: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'text'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: 'Ultimate Effort', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Text: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Text: nothing else'});
    testResults.push({Expected: 'text', Actual: Main.advantageSection.getRow(0).getText(), Action: actionTaken, Description: 'Text: getText'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Defensive Roll', rank: 3});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: 'Defensive Roll', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Rank: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Rank: nothing else'});
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'Rank: getRank'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    Main.clearMockMessenger();  //restore default behavior
    TesterUtility.displayResults('Tester.advantageList.load', testResults, isFirst);
};
