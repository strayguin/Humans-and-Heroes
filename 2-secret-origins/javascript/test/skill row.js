TestSuite.skillRow={};
TestSuite.skillRow.setSkill=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    var firstRow = Main.skillSection.getRow(0);  //only row I care about so I made a short cut
    testResults.push({Expected: true, Actual: firstRow.isBlank(), Description: actionTaken+': First row is blank'});
    testResults.push({Expected: undefined, Actual: firstRow.doesHaveText(), Description: actionTaken+': And has no data'});
    testResults.push({Expected: undefined, Actual: firstRow.getAbilityName(), Description: actionTaken+': ...'});
    testResults.push({Expected: undefined, Actual: firstRow.getName(), Description: actionTaken+': ...'});
    testResults.push({Expected: undefined, Actual: firstRow.getRank(), Description: actionTaken+': ...'});
    testResults.push({Expected: undefined, Actual: firstRow.getText(), Description: actionTaken+': ...'});
    testResults.push({Expected: undefined, Actual: firstRow.getTotalBonus(), Description: actionTaken+': ...'});

    try{
    actionTaken='Set Sleight of Hand'; SelectUtil.changeText('skillChoices0', 'Sleight of Hand');
    testResults.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    testResults.push({Expected: true, Actual: firstRow.doesHaveText(), Description: actionTaken+': And has data: hasText'});
    testResults.push({Expected: 'Dexterity', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    testResults.push({Expected: 'Sleight of Hand', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    testResults.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    testResults.push({Expected: 'Skill Subtype', Actual: firstRow.getText(), Description: actionTaken+': Text'});
    testResults.push({Expected: 1, Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});

    actionTaken='Set Some Values'; TestRunner.changeValue('skillText0', 'Text value'); TestRunner.changeValue('skillRank0', 2); SelectUtil.changeText('skillAbility0', 'Strength');
    actionTaken='Set Perception'; SelectUtil.changeText('skillChoices0', 'Perception');
    testResults.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    testResults.push({Expected: false, Actual: firstRow.doesHaveText(), Description: actionTaken+': And data: hasText'});
    testResults.push({Expected: 'Awareness', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    testResults.push({Expected: 'Perception', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    testResults.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    testResults.push({Expected: undefined, Actual: firstRow.getText(), Description: actionTaken+': Text'});
    testResults.push({Expected: 1, Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Set Other with value'; TestRunner.changeValue('Strength', 2); SelectUtil.changeText('skillChoices0', 'Other');
    //TODO: how can I make sure all of the relationships work? I'll need to draw a map...
    testResults.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    testResults.push({Expected: true, Actual: firstRow.doesHaveText(), Description: actionTaken+': And has data: hasText'});
    testResults.push({Expected: 'Strength', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    testResults.push({Expected: 'Other', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    testResults.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    testResults.push({Expected: 'Skill Name and Subtype', Actual: firstRow.getText(), Description: actionTaken+': Text'});
    testResults.push({Expected: 3, Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select One');
    testResults.push({Expected: true, Actual: firstRow.isBlank(), Description: actionTaken+': First row is now blank'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.skillRow.setSkill', testResults, isFirst);
};
TestSuite.skillRow.generate=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Description: actionTaken+': First Row is blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: null, Actual: document.getElementById('skillText0'), Description: actionTaken+': Text doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillRank0'), Description: actionTaken+': Rank doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillAbility0'), Description: actionTaken+': Ability doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skill bonus 0'), Description: actionTaken+': Bonus doesn\'t exist'});

    try{
    actionTaken='Set Acrobatics'; SelectUtil.changeText('skillChoices0', 'Acrobatics');
    testResults.push({Expected: false, Actual: Main.skillSection.getRow(0).isBlank(), Description: actionTaken+': First Row is not blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: 'Skill Subtype', Actual: document.getElementById('skillText0').value, Description: actionTaken+': Text exists'});
    testResults.push({Expected: '1', Actual: document.getElementById('skillRank0').value, Description: actionTaken+': Rank exists'});
    testResults.push({Expected: 'Agility', Actual: document.getElementById('skillAbility0').value, Description: actionTaken+': Ability exists'});
    testResults.push({Expected: '1', Actual: document.getElementById('skill bonus 0').innerHTML, Description: actionTaken+': Bonus exists'});

    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names[0]), Description: actionTaken, Description: ('Has first ability: ' + Data.Ability.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names.last()), Description: actionTaken, Description: ('Has last ability: ' + Data.Ability.names.last())});

    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select One');
    testResults.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Description: actionTaken+': First Row is blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: null, Actual: document.getElementById('skillText0'), Description: actionTaken+': Text doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillRank0'), Description: actionTaken+': Rank doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillAbility0'), Description: actionTaken+': Ability doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skill bonus 0'), Description: actionTaken+': Bonus doesn\'t exist'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.skillRow.generate', testResults, isFirst);
};
TestSuite.skillRow.setValues=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.skillRow.setValues', testResults, isFirst);
};
