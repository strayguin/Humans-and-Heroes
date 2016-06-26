TestSuite.advantageRow={};
TestSuite.advantageRow.setAdvantage=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    //testResults.push({Expected: Data.Advantage.defaultText.get('Benefit'), Actual: Main.advantageSection.getRow(0).getText(), Description: actionTaken+': of default text'});
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    //TODO: plan: make sure all the data for normal and godhood are set (with useNewData) with and without text then without useNewData
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.advantageRow.setAdvantage', testResults, isFirst);
};
TestSuite.advantageRow.setRank=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', rank: 123456});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Benefit: no other rows'});
    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Benefit: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Load Benefit: doesHaveRank'});
    testResults.push({Expected: 123456, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Load Benefit: rank set'});
    } catch(e){testResults.push({Error: e, Description: 'Load Benefit'});}

    try{
    TestRunner.changeValue('advantageRank0', 5);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Change Benefit rank'});
    } catch(e){testResults.push({Error: e, Description: 'Change Benefit rank'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative', rank: 5});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Seize Initiative: no other rows'});
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Seize Initiative: the advantage'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Load Seize Initiative: doesHaveRank'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Load Seize Initiative: Rank ignored'});
    //if you have the advantage then it is rank 1 not undefined
    } catch(e){testResults.push({Error: e, Description: 'Load Seize Initiative'});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Lucky');
    testResults.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Change to Lucky'});
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getMaxRanks(), Description: 'Lucky getMaxRanks'});

    TestRunner.changeValue('advantageRank0', 5);
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky max rank enforced'});

    TestRunner.changeValue('advantageRank0', -5);
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky min rank enforced'});

    TestRunner.changeValue('advantageRank0', 2);
    TestRunner.changeValue('advantageRank0', 'invalid');
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky rank defaults to 1'});

    TestRunner.changeValue('advantageRank0', 2);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getCostPerRank(), Description: 'Lucky getCostPerRank'});
    testResults.push({Expected: 10, Actual: Main.advantageSection.getRow(0).getTotal(), Description: 'Lucky total cost'});
    } catch(e){testResults.push({Error: e, Description: 'Lucky'});}

    return TestRunner.displayResults('TestSuite.advantageRow.setRank', testResults, isFirst);
};
TestSuite.advantageRow.setText=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', text: '\thas text: also trimmed  \n'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Benefit: no other rows'});
    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Benefit: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Load Benefit: doesHaveText'});
    testResults.push({Expected: 'has text: also trimmed', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Load Benefit: text set'});
    } catch(e){testResults.push({Error: e, Description: 'Load Benefit'});}

    try{
    TestRunner.changeValue('advantageText0', '\tchanged text: trimmed \n');
    testResults.push({Expected: 'changed text: trimmed', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Change Benefit text'});
    } catch(e){testResults.push({Error: e, Description: 'Change Benefit text'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Lucky', text: 'can\'t have text'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Lucky: no other rows'});
    testResults.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Lucky: the advantage'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Load Lucky: doesHaveText'});
    testResults.push({Expected: undefined, Actual: Main.advantageSection.getRow(0).getText(), Description: 'Load Lucky: Text not set'});
    } catch(e){testResults.push({Error: e, Description: 'Load Lucky'});}

    return TestRunner.displayResults('TestSuite.advantageRow.setText', testResults, isFirst);
};
TestSuite.advantageRow.generate=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Equipment'), Description: actionTaken+': Advantage Row exists but doesn\'t have Equipment'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.names.last()), Description: actionTaken+': Advantage Row has (last) '+Data.Advantage.names.last()});
    testResults.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames[0]), Description: actionTaken+': Advantage Row doesn\'t have (first Godhood) '+Data.Advantage.godhoodNames[0]});

    try{
    actionTaken='Set Godhood'; TestRunner.changeValue('Strength', 100);
    testResults.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames[0]), Description: actionTaken+': Advantage Row now has (first) '+Data.Advantage.godhoodNames[0]});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames.last()), Description: actionTaken+': And has (last) '+Data.Advantage.godhoodNames.last()});
    actionTaken='Clear Godhood'; TestRunner.changeValue('Strength', 0);
    testResults.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames[0]), Description: actionTaken+': Advantage Row Godhood removed'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Padded Equipment Row Test'; SelectUtil.changeText('advantageChoices0', Data.Advantage.names.last()); SelectUtil.changeText('equipmentChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 10); SelectUtil.changeText('advantageChoices2', Data.Advantage.names[0]);
    testResults.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': First Advantage Row is Equipment'});
    testResults.push({Expected: Data.Advantage.names.last(), Actual: Main.advantageSection.getRow(1).getName(), Description: actionTaken+': Then '+Data.Advantage.names.last()});
    testResults.push({Expected: Data.Advantage.names[0], Actual: Main.advantageSection.getRow(2).getName(), Description: actionTaken+': Then '+Data.Advantage.names[0]});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(3).isBlank(), Description: actionTaken+': Then blank'});

    testResults.push({Expected: null, Actual: document.getElementById('advantageChoices0'), Description: actionTaken+': Equipment select id doesn\'t exist'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices1'), Description: actionTaken+': 2nd Row is a select'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices2'), Description: actionTaken+': 3rd row is a select'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices3'), Description: actionTaken+': 4th row is a select'});
    testResults.push({Expected: 'Equipment', Actual: document.getElementById('advantageEquipment').innerHTML, Description: actionTaken+': 2nd Row says equipment'});

    testResults.push({Expected: '2', Actual: document.getElementById('advantageEquipmentRankSpan').innerHTML, Description: actionTaken+': Equipment row is rank 2'});
    testResults.push({Expected: null, Actual: document.getElementById('advantageRank2'), Description: actionTaken+': Equipment rank input doesn\'t exist'});

    actionTaken='Cleared Equipment'; Main.equipmentSection.clear();
    testResults.push({Expected: Data.Advantage.names.last(), Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': First Advantage Row is '+Data.Advantage.names.last()});
    testResults.push({Expected: Data.Advantage.names[0], Actual: Main.advantageSection.getRow(1).getName(), Description: actionTaken+': Then '+Data.Advantage.names[0]});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(2).isBlank(), Description: actionTaken+': Then blank'});

    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices0'), Description: actionTaken+': First row is a select'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices1'), Description: actionTaken+': 2nd row is a select'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices2'), Description: actionTaken+': 3rd row is a select'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Pre Defensive Roll'; Main.advantageSection.clear();
    testResults.push({Expected: null, Actual: document.getElementById('advantageRank0'), Description: actionTaken+': Advantage Rank doesn\'t exist'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Advantage section is blank'});

    actionTaken='Set Defensive Roll'; SelectUtil.changeText('advantageChoices0', 'Defensive Roll');
    testResults.push({Expected: '1', Actual: document.getElementById('advantageRank0').value, Description: actionTaken+': Advantage rank was created with a value of 1'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    testResults.push({Expected: null, Actual: document.getElementById('advantageRank0'), Description: actionTaken+': Advantage rank was removed'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Pre Languages'; Main.advantageSection.clear();
    testResults.push({Expected: null, Actual: document.getElementById('advantageText0'), Description: actionTaken+': Advantage text doesn\'t exist'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Advantage section is blank'});

    actionTaken='Set Languages'; SelectUtil.changeText('advantageChoices0', 'Languages');
    testResults.push({Expected: Data.Advantage.defaultText.get('Languages'), Actual: document.getElementById('advantageText0').value, Description: actionTaken+': Advantage text was created with default text'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    testResults.push({Expected: null, Actual: document.getElementById('advantageText0'), Description: actionTaken+': Advantage text was removed'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Pre Lucky'; Main.advantageSection.clear();
    testResults.push({Expected: null, Actual: document.getElementById('advantageRowTotal0'), Description: actionTaken+': Advantage row total doesn\'t exist'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Advantage section is blank'});

    actionTaken='Set Lucky'; SelectUtil.changeText('advantageChoices0', 'Lucky');
    testResults.push({Expected: Data.Advantage.costPerRank.get('Lucky').toString(), Actual: document.getElementById('advantageRowTotal0').innerHTML, Description: actionTaken+': Advantage row total was created with default value'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    testResults.push({Expected: null, Actual: document.getElementById('advantageRowTotal0'), Description: actionTaken+': Advantage row total was removed'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.advantageRow.generate', testResults, isFirst);
};
TestSuite.advantageRow.setValues=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.advantageRow.setValues', testResults, isFirst);
};
