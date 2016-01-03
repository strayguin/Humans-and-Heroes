Tester.advantageRow={};
Tester.advantageRow.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.advantageRow.data={setUp: Tester.data.beforeAll};
Tester.advantageRow.setAdvantage=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    //testResults.push({Expected: Data.Advantage.defaultText.get('Benefit'), Actual: Main.advantageSection.getRow(0).getText(), Action: actionTaken, Description: 'of default text'});
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    //TODO: plan: make sure all the data for normal and godhood are set (with useNewData) with and without text then without useNewData
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.advantageRow.setAdvantage', testResults, isFirst);
};
Tester.advantageRow.setRank=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];
    var actionTaken='N/A';

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', rank: 123456});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Load Benefit: no other rows'});
    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Load Benefit: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Action: actionTaken, Description: 'Load Benefit: doesHaveRank'});
    testResults.push({Expected: 123456, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'Load Benefit: rank set'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('advantageRank0', 5);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'Change Benefit rank'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative', rank: 5});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Load Seize Initiative: no other rows'});
    testResults.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Load Seize Initiative: the advantage'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Action: actionTaken, Description: 'Load Seize Initiative: doesHaveRank'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'Load Seize Initiative: Rank ignored'});
    //if you have the advantage means 1 rank which is why it isn't undefined
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Lucky');
    testResults.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Change to Lucky'});
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getMaxRanks(), Action: actionTaken, Description: 'Lucky getMaxRanks'});

    TesterUtility.changeValue('advantageRank0', 5);
    testResults.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'Lucky max rank enforced'});

    TesterUtility.changeValue('advantageRank0', -5);
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'Lucky min rank enforced'});

    TesterUtility.changeValue('advantageRank0', 2);
    TesterUtility.changeValue('advantageRank0', 'invalid');
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'Lucky rank defaults to 1'});

    TesterUtility.changeValue('advantageRank0', 2);
    testResults.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getCostPerRank(), Action: actionTaken, Description: 'Lucky getCostPerRank'});
    testResults.push({Expected: 10, Actual: Main.advantageSection.getRow(0).getTotal(), Action: actionTaken, Description: 'Lucky total cost'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.advantageRow.setRank', testResults, isFirst);
};
Tester.advantageRow.setText=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];
    var actionTaken='N/A';

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', text: '\thas text: also trimmed  \n'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Load Benefit: no other rows'});
    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Load Benefit: the advantage'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveText(), Action: actionTaken, Description: 'Load Benefit: doesHaveText'});
    testResults.push({Expected: 'has text: also trimmed', Actual: Main.advantageSection.getRow(0).getText(), Action: actionTaken, Description: 'Load Benefit: text set'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    TesterUtility.changeValue('advantageText0', '\tchanged text: trimmed \n');
    testResults.push({Expected: 'changed text: trimmed', Actual: Main.advantageSection.getRow(0).getText(), Action: actionTaken, Description: 'Change Benefit text'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Lucky', text: 'can\'t have text'});
    Loader.sendData(dataToLoad);

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Load Lucky: no other rows'});
    testResults.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Load Lucky: the advantage'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveText(), Action: actionTaken, Description: 'Load Lucky: doesHaveText'});
    testResults.push({Expected: undefined, Actual: Main.advantageSection.getRow(0).getText(), Action: actionTaken, Description: 'Load Lucky: Text not set'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.advantageRow.setText', testResults, isFirst);
};
Tester.advantageRow.generate=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Equipment'), Action: actionTaken, Description: 'Advantage Row exists but doesn\'t have Equipment'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.names.last()), Action: actionTaken, Description: 'Advantage Row has (last) '+Data.Advantage.names.last()});
    testResults.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames[0]), Action: actionTaken, Description: 'Advantage Row doesn\'t have (first Godhood) '+Data.Advantage.godhoodNames[0]});

    try{
    actionTaken='Set Godhood'; TesterUtility.changeValue('Strength', 100);
    testResults.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames[0]), Action: actionTaken, Description: 'Advantage Row now has (first) '+Data.Advantage.godhoodNames[0]});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames.last()), Action: actionTaken, Description: 'And has (last) '+Data.Advantage.godhoodNames.last()});
    actionTaken='Clear Godhood'; TesterUtility.changeValue('Strength', 0);
    testResults.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', Data.Advantage.godhoodNames[0]), Action: actionTaken, Description: 'Advantage Row Godhood removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Padded Equipment Row Test'; SelectUtil.changeText('advantageChoices0', Data.Advantage.names.last()); SelectUtil.changeText('equipmentChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 10); SelectUtil.changeText('advantageChoices2', Data.Advantage.names[0]);
    testResults.push({Expected: Data.Advantage.names.last(), Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'First Advantage Row is '+Data.Advantage.names.last()});
    testResults.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(1).getName(), Action: actionTaken, Description: 'Then Equipment'});
    testResults.push({Expected: Data.Advantage.names[0], Actual: Main.advantageSection.getRow(2).getName(), Action: actionTaken, Description: 'Then '+Data.Advantage.names[0]});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(3).isBlank(), Action: actionTaken, Description: 'Then blank'});

    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices0'), Action: actionTaken, Description: 'First row is a select'});
    testResults.push({Expected: null, Actual: document.getElementById('advantageChoices1'), Action: actionTaken, Description: '2nd Row select id doesn\'t exist'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices2'), Action: actionTaken, Description: '3rd row is a select'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices3'), Action: actionTaken, Description: '4th row is a select'});
    testResults.push({Expected: 'Equipment', Actual: document.getElementById('advantageEquipment').innerHTML, Action: actionTaken, Description: '2nd Row says equipment'});

    testResults.push({Expected: '2', Actual: document.getElementById('advantageEquipmentRankSpan').innerHTML, Action: actionTaken, Description: 'Equipment row is rank 2'});
    testResults.push({Expected: null, Actual: document.getElementById('advantageRank2'), Action: actionTaken, Description: 'Equipment rank input doesn\'t exist'});

    actionTaken='Cleared Equipment'; Main.equipmentSection.clear();
    testResults.push({Expected: Data.Advantage.names.last(), Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'First Advantage Row is '+Data.Advantage.names.last()});
    testResults.push({Expected: Data.Advantage.names[0], Actual: Main.advantageSection.getRow(1).getName(), Action: actionTaken, Description: 'Then '+Data.Advantage.names[0]});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(2).isBlank(), Action: actionTaken, Description: 'Then blank'});

    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices0'), Action: actionTaken, Description: 'First row is a select'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices1'), Action: actionTaken, Description: '2nd row is a select'});
    testResults.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices2'), Action: actionTaken, Description: '3rd row is a select'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Pre Defensive Roll'; Main.advantageSection.clear();
    testResults.push({Expected: null, Actual: document.getElementById('advantageRank0'), Action: actionTaken, Description: 'Advantage Rank doesn\'t exist'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Advantage section is blank'});

    actionTaken='Set Defensive Roll'; SelectUtil.changeText('advantageChoices0', 'Defensive Roll');
    testResults.push({Expected: '1', Actual: document.getElementById('advantageRank0').value, Action: actionTaken, Description: 'Advantage rank was created with a value of 1'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    testResults.push({Expected: null, Actual: document.getElementById('advantageRank0'), Action: actionTaken, Description: 'Advantage rank was removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Pre Languages'; Main.advantageSection.clear();
    testResults.push({Expected: null, Actual: document.getElementById('advantageText0'), Action: actionTaken, Description: 'Advantage text doesn\'t exist'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Advantage section is blank'});

    actionTaken='Set Languages'; SelectUtil.changeText('advantageChoices0', 'Languages');
    testResults.push({Expected: Data.Advantage.defaultText.get('Languages'), Actual: document.getElementById('advantageText0').value, Action: actionTaken, Description: 'Advantage text was created with default text'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    testResults.push({Expected: null, Actual: document.getElementById('advantageText0'), Action: actionTaken, Description: 'Advantage text was removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Pre Lucky'; Main.advantageSection.clear();
    testResults.push({Expected: null, Actual: document.getElementById('advantageRowTotal0'), Action: actionTaken, Description: 'Advantage row total doesn\'t exist'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Advantage section is blank'});

    actionTaken='Set Lucky'; SelectUtil.changeText('advantageChoices0', 'Lucky');
    testResults.push({Expected: Data.Advantage.costPerRank.get('Lucky').toString(), Actual: document.getElementById('advantageRowTotal0').innerHTML, Action: actionTaken, Description: 'Advantage row total was created with default value'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    testResults.push({Expected: null, Actual: document.getElementById('advantageRowTotal0'), Action: actionTaken, Description: 'Advantage row total was removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.advantageRow.generate', testResults, isFirst);
};
Tester.advantageRow.setValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.advantageRow.setValues', testResults, isFirst);
};
