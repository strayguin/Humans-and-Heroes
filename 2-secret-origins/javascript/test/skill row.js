Tester.skillRow={};
Tester.skillRow.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.skillRow.data={setUp: Tester.data.beforeAll};
Tester.skillRow.setSkill=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    var firstRow = Main.skillSection.getRow(0);  //only row I care about so I made a short cut
    testResults.push({Expected: true, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First row is blank'});
    testResults.push({Expected: undefined, Actual: firstRow.doesHaveText(), Action: actionTaken, Description: 'And has no data'});
    testResults.push({Expected: undefined, Actual: firstRow.getAbilityName(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: undefined, Actual: firstRow.getName(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: undefined, Actual: firstRow.getRank(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: undefined, Actual: firstRow.getText(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: undefined, Actual: firstRow.getTotalBonus(), Action: actionTaken, Description: '...'});

    try{
    actionTaken='Set Sleight of Hand'; SelectUtil.changeText('skillChoices0', 'Sleight of Hand');
    testResults.push({Expected: false, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First row is not blank'});
    testResults.push({Expected: true, Actual: firstRow.doesHaveText(), Action: actionTaken, Description: 'And has data: hasText'});
    testResults.push({Expected: 'Dexterity', Actual: firstRow.getAbilityName(), Action: actionTaken, Description: 'AbilityName'});
    testResults.push({Expected: 'Sleight of Hand', Actual: firstRow.getName(), Action: actionTaken, Description: 'Name'});
    testResults.push({Expected: 1, Actual: firstRow.getRank(), Action: actionTaken, Description: 'Rank'});
    testResults.push({Expected: 'Skill Subtype', Actual: firstRow.getText(), Action: actionTaken, Description: 'Text'});
    testResults.push({Expected: 1, Actual: firstRow.getTotalBonus(), Action: actionTaken, Description: 'TotalBonus'});

    actionTaken='Set Some Values'; TesterUtility.changeValue('skillText0', 'Text value'); TesterUtility.changeValue('skillRank0', 2); SelectUtil.changeText('skillAbility0', 'Strength');
    actionTaken='Set Perception'; SelectUtil.changeText('skillChoices0', 'Perception');
    testResults.push({Expected: false, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First row is not blank'});
    testResults.push({Expected: false, Actual: firstRow.doesHaveText(), Action: actionTaken, Description: 'And data: hasText'});
    testResults.push({Expected: 'Awareness', Actual: firstRow.getAbilityName(), Action: actionTaken, Description: 'AbilityName'});
    testResults.push({Expected: 'Perception', Actual: firstRow.getName(), Action: actionTaken, Description: 'Name'});
    testResults.push({Expected: 1, Actual: firstRow.getRank(), Action: actionTaken, Description: 'Rank'});
    testResults.push({Expected: undefined, Actual: firstRow.getText(), Action: actionTaken, Description: 'Text'});
    testResults.push({Expected: 1, Actual: firstRow.getTotalBonus(), Action: actionTaken, Description: 'TotalBonus'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Set Other with value'; TesterUtility.changeValue('Strength', 2); SelectUtil.changeText('skillChoices0', 'Other');
    //TODO: how can I make sure all of the relationships work? I'll need to draw a map...
    testResults.push({Expected: false, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First row is not blank'});
    testResults.push({Expected: true, Actual: firstRow.doesHaveText(), Action: actionTaken, Description: 'And has data: hasText'});
    testResults.push({Expected: 'Strength', Actual: firstRow.getAbilityName(), Action: actionTaken, Description: 'AbilityName'});
    testResults.push({Expected: 'Other', Actual: firstRow.getName(), Action: actionTaken, Description: 'Name'});
    testResults.push({Expected: 1, Actual: firstRow.getRank(), Action: actionTaken, Description: 'Rank'});
    testResults.push({Expected: 'Skill Name and Subtype', Actual: firstRow.getText(), Action: actionTaken, Description: 'Text'});
    testResults.push({Expected: 3, Actual: firstRow.getTotalBonus(), Action: actionTaken, Description: 'TotalBonus'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select One');
    testResults.push({Expected: true, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First row is now blank'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.skillRow.setSkill', testResults, isFirst);
};
Tester.skillRow.generate=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Action: actionTaken, Description: 'First Row is blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Action: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Action: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: null, Actual: document.getElementById('skillText0'), Action: actionTaken, Description: 'Text doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillRank0'), Action: actionTaken, Description: 'Rank doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillAbility0'), Action: actionTaken, Description: 'Ability doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skill bonus 0'), Action: actionTaken, Description: 'Bonus doesn\'t exist'});

    try{
    actionTaken='Set Acrobatics'; SelectUtil.changeText('skillChoices0', 'Acrobatics');
    testResults.push({Expected: false, Actual: Main.skillSection.getRow(0).isBlank(), Action: actionTaken, Description: 'First Row is not blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Action: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Action: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: 'Skill Subtype', Actual: document.getElementById('skillText0').value, Action: actionTaken, Description: 'Text exists'});
    testResults.push({Expected: '1', Actual: document.getElementById('skillRank0').value, Action: actionTaken, Description: 'Rank exists'});
    testResults.push({Expected: 'Agility', Actual: document.getElementById('skillAbility0').value, Action: actionTaken, Description: 'Ability exists'});
    testResults.push({Expected: '1', Actual: document.getElementById('skill bonus 0').innerHTML, Action: actionTaken, Description: 'Bonus exists'});

    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names[0]), Action: actionTaken, Description: ('Has first ability: ' + Data.Ability.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names.last()), Action: actionTaken, Description: ('Has last ability: ' + Data.Ability.names.last())});

    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select One');
    testResults.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Action: actionTaken, Description: 'First Row is blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Action: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Action: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: null, Actual: document.getElementById('skillText0'), Action: actionTaken, Description: 'Text doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillRank0'), Action: actionTaken, Description: 'Rank doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillAbility0'), Action: actionTaken, Description: 'Ability doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skill bonus 0'), Action: actionTaken, Description: 'Bonus doesn\'t exist'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.skillRow.generate', testResults, isFirst);
};
Tester.skillRow.setValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.skillRow.setValues', testResults, isFirst);
};
