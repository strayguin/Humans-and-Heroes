Tester.data.beforeAll=function(){Main.setRuleset(2, 7); Main.clear();};
Tester.data.afterAll = Tester.data.beforeAll;  //yes I see that it is called twice but that is so that it auto clears Main if I call a single test
//every test needs to clear out for the other test to start clean
//even if slow do not disable Main generation because an error might occur (due to undefined values) in which case I need to see how Main was

//doesn't take as long as I thought but still leave it out of testAll() hence the enumerable: false
Object.defineProperty(Tester, 'confirmAllXmls', {
  enumerable: false,
  value: function()
{
    if(arguments.length !== 0){alert('Confirming Xmls demands to be first and only'); return;}
    TesterUtility.clearResults();
    //Main.setRuleset(2, 7);  //the xmls are only saved with current rules
       //covered by clearResults and by Main.load

    var testResults=[];
    var actionTaken='Load Save Confirm';
    var basePath='xml/';  //relative is the only kind that is portable. it is relative to the .html file not the js
    var allFolders=['', 'Constructs/', 'Secret Origins Hero Archtypes/', 'Gamemaster/Animals/', 'Gamemaster/Civilians/', 'Gamemaster/Public Servants/', 'Gamemaster/Trained Combatants/', 'Gamemaster/Underworld Archetypes/'];
    var allFiles=[['All Equipment.xml'],
       ['Gaint Robot.xml', 'Robot.xml', 'Zombie.xml'],
       ['Battlesuit.xml', 'Construct.xml', 'Crime Fighter.xml', 'Energy Controller.xml', 'Gadgeteer.xml', 'Martial Artist.xml', 'Mimic.xml', 'Mystic.xml', 'Paragon.xml', 'Powerhouse.xml', 'Psychic.xml', 'Shapeshifter.xml', 'Speedster.xml', 'Warrior.xml', 'Weapon Master.xml'],
       ['Ape.xml', 'Dolphin.xml', 'Hawk.xml', 'Lion.xml', 'Shark.xml', 'Whale.xml', 'Wolf.xml'],
       ['Bystander.xml', 'Reporter.xml', 'Scientist.xml'],
       ['Government Agent.xml', 'Police Chief.xml', 'Police Officer.xml', 'SWAT Officer.xml'],
       ['Militant.xml', 'Soldier.xml'],
       ['Crime Lord.xml', 'Criminal.xml', 'Gang Leader.xml', 'Street Informant.xml', 'Thug.xml']];

    try{readXMLAsString(basePath+allFolders[1]+allFiles[1][2]);}
    catch(e){alert('You idiot, you can\'t run this here.'); throw e;}  //Whoops, my bad I better turn on the flag first
       //and I don't care that file 1,2 is parsed twice:
       //1) twice in a row means it should be cached
       //2) this won't be run with other tests
       //3) it is worth the time cost
       //1,2 was chosen because it is smallest (with 0,0 being the largest)
   for (var folderIndex=0; folderIndex < allFolders.length; folderIndex++)
   {
      for (var fileIndex=0; fileIndex < allFiles[folderIndex].length; fileIndex++)
      {
          var originalContents=readXMLAsString(basePath+allFolders[folderIndex]+allFiles[folderIndex][fileIndex]);
          document.getElementById('code box').value=originalContents;  //should conform the end lines (plus can only load from here)
          originalContents=document.getElementById('code box').value;  //must be on separate lines for some reason
          originalContents=originalContents.replace(/\/>/g, ' />');
          //originalContents=originalContents.replace(/<Document ruleset='\d+' version='\d+'>/, '<Document>');  //don't remove: being out of date is noteworthy
          originalContents=originalContents.replace(/\?>/, '?>\n\n');  //add a blank line
          originalContents=originalContents.replace(/<Powers \/>/, '<Powers></Powers>');  //make empty group instead of self closing
          originalContents=originalContents.replace(/<Equipment \/>/, '<Equipment></Equipment>');
          originalContents=originalContents.replace(/<Advantages \/>/, '<Advantages></Advantages>');
          originalContents=originalContents.replace(/<Skills \/>/, '<Skills></Skills>');
          originalContents+='\n';  //ends with a blank line
          originalContents=originalContents.replace(/\s+<!--[\s\S]*?-->/g, '');  //remove comments when comparing because save doesn't generate them
          Main.load();
          Main.save();
          var newContents=document.getElementById('code box').value;
          document.getElementById('code box').value=newContents;
          newContents=document.getElementById('code box').value;  //to conform the end lines
          testResults.push({Expected: originalContents, Actual: newContents, Action: actionTaken, Description: allFolders[folderIndex]+allFiles[folderIndex][fileIndex]});
          //document.getElementById('code box').value=originalContents;
          //document.getElementById('code box').value+=stringDiffDisplay(originalContents, newContents);
      }
   }

    TesterUtility.displayResults('Tester.confirmAllXmls', testResults, true);  //grand total is pointless but will scroll me to the bottom
}
});
//free javascript debugger: http://www.aptana.com/products/studio3
    //it doesn't work (doesn't run) use chrome or firefox instead
//http://docs.seleniumhq.org/ and http://www.eclipse.org/webtools/jsdt/

//TODO: make a test for loading quirks (per section) to test for things that onChange wouldn't allow
    //for example: loading action is based on duration which is based on range which is based on duration... range is also based on modifiers
    //try: load effect name (and other power stuff), power rank, then all modifiers, then range, then duration, then action
Tester.abilityList={};
Tester.abilityList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.abilityList.data={setUp: Tester.data.beforeAll};
Tester.abilityList.calculateValues=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: '0', Actual: document.getElementById('Strength').value, Action: actionTaken, Description: 'Strength says 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Strength').getValue(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is 0'});

   //test non absent
    actionTaken='Set Strength'; TesterUtility.changeValue('Strength', 2);
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Action: actionTaken, Description: 'Strength was set to 2'});
    testResults.push({Expected: 4, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is 4'});

   //test absent non stamina
    actionTaken='Set absent Awareness'; TesterUtility.changeValue('Awareness', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Awareness').isAbsent(), Action: actionTaken, Description: 'Awareness is absent'});
    testResults.push({Expected: -6, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is -6'});
    //also checks that the total is a sum
    Main.abilitySection.clear();

   //test absent stamina in new rules
    actionTaken='Set absent Stamina'; TesterUtility.changeValue('Stamina', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Action: actionTaken, Description: 'Stamina is absent'});
    testResults.push({Expected: 30, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is 30'});

   //test absent stamina in new rules
    actionTaken='Set Old absent Stamina'; Main.setRuleset(1, 1); TesterUtility.changeValue('Stamina', '--');
    testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Action: actionTaken, Description: 'Stamina is absent'});
    testResults.push({Expected: -10, Actual: Main.abilitySection.getTotal(), Action: actionTaken, Description: 'The ability section total cost is -10'});
    Main.setRuleset(2, 7);

    TesterUtility.displayResults('Tester.abilityList.calculateValues', testResults, isFirst);
};
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

    var dataToLoad, resetData, sendData;
    var testResults=[];
    var actionTaken='Set up';

   try
   {
       Tester.advantageList.load.data = {};
       SelectUtil.setText('saveType', 'JSON');  //only needs to be done once is why it isn't in resetData
      resetData = function()
      {
          Tester.advantageList.load.data.transcendence = [];
          Tester.advantageList.load.data.not_found = [];
          Main.clear();
          return JSON.parse(Main.save());  //return skeleton needed
      };
      sendData = function(jsonData)
      {
          document.getElementById('code box').value = JSON.stringify(jsonData);  //to simulate user input
          Main.loadText();
      };
      Main.setMockMessenger(function(message)
      {
          if(message.contains('transcendence')) Tester.advantageList.load.data.transcendence.push(message);
          else Tester.advantageList.load.data.not_found.push(message);
      });
   }
   catch (e)
   {
       testResults.push({Error: e, Action: actionTaken});
       //no need to revert Main.messageUser since a crash requires page refresh anyway
       TesterUtility.displayResults('Tester.advantageList.load', testResults, isFirst);
       return;  //if set up fails then it will all fail so stop now
   }

    try{
    actionTaken='Test Load Errors'; dataToLoad = resetData();
    dataToLoad.Advantages.push({name: 'Benefit'});  //no error (despite missing rank and text data)
    dataToLoad.Advantages.push({name: 'Die hard'});  //not found. real name is Diehard
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    sendData(dataToLoad);
    testResults.push({Expected: false, Actual: Main.canUseGodHood(), Action: actionTaken, Description: 'Godhood is off'});
    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Benefit was loaded'});
    testResults.push({Expected: true, Actual: Tester.advantageList.load.data.not_found[0].contains('Die hard'), Action: actionTaken, Description: 'Die hard was not found'});
    testResults.push({Expected: true, Actual: Tester.advantageList.load.data.transcendence[0].contains('Beyond Mortal'), Action: actionTaken, Description: 'Beyond Mortal was not allowed'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Action: actionTaken, Description: 'Make sure update was called'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Load godhood'; dataToLoad = resetData();
    dataToLoad.Hero.transcendence = '1';  //set godhood
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    dataToLoad.Advantages.push({name: 'Benefit'});  //normal (just to make sure there are no message generated)
    sendData(dataToLoad);
    testResults.push({Expected: true, Actual: Main.canUseGodHood(), Action: actionTaken, Description: 'Godhood is on'});
    testResults.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Beyond Mortal was loaded'});
    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(1).getName(), Action: actionTaken, Description: 'Benefit was loaded'});
    testResults.push({Expected: true, Actual: Tester.advantageList.load.data.not_found.isEmpty(), Action: actionTaken, Description: 'No errors (found)'});
    testResults.push({Expected: true, Actual: Tester.advantageList.load.data.transcendence.isEmpty(), Action: actionTaken, Description: 'No errors (godhood)'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Load rank text'; dataToLoad = resetData();
    dataToLoad.Hero.transcendence = '1';  //set godhood
    dataToLoad.Advantages.push({name: 'Benefit'});  //does have rank and text
    dataToLoad.Advantages.push({name: 'Beyond Mortal', text: 'yoyo text', rank: '45'});  //doesn't have rank or text
    dataToLoad.Advantages.push({name: 'Stay Like That', text: 'yoyo text', rank: '45'});  //doesn't have rank but does have text
    dataToLoad.Advantages.push({name: 'Omniscient', text: 'yoyo text', rank: '+45'});  //doesn't have text but does have rank. also above max rank
    dataToLoad.Advantages.push({name: 'Supreme', rank: '5', text: 'sup1'});  //does have rank and text
    dataToLoad.Advantages.push({name: 'Supreme', text: 'sup1'});  //redundant
    dataToLoad.Advantages.push({name: 'Supreme', rank: '-5', text: 'sup2'});
    sendData(dataToLoad);

    testResults.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Action: actionTaken, Description: 'Make sure they all loaded'});
    testResults.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(1).getName(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: 'Stay Like That', Actual: Main.advantageSection.getRow(2).getName(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: 'Omniscient', Actual: Main.advantageSection.getRow(3).getName(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: 'Supreme', Actual: Main.advantageSection.getRow(4).getName(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: 'Supreme', Actual: Main.advantageSection.getRow(5).getName(), Action: actionTaken, Description: '...'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(6).isBlank(), Action: actionTaken, Description: 'But not the redundant Supreme'});

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Action: actionTaken, Description: 'Benefit has rank'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Action: actionTaken, Description: 'of default rank'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveText(), Action: actionTaken, Description: 'Benefit has text'});
    testResults.push({Expected: Data.Advantage.defaultText.get('Benefit'), Actual: Main.advantageSection.getRow(0).getText(), Action: actionTaken, Description: 'of default text'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(1).doesHaveRank(), Action: actionTaken, Description: 'Beyond Mortal doesn\'t have rank'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(1).doesHaveText(), Action: actionTaken, Description: 'or text'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(2).doesHaveRank(), Action: actionTaken, Description: 'Stay Like That doesn\'t have rank'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(2).doesHaveText(), Action: actionTaken, Description: 'but does have text'});
    testResults.push({Expected: 'yoyo text', Actual: Main.advantageSection.getRow(2).getText(), Action: actionTaken, Description: 'as specified'});
    testResults.push({Expected: false, Actual: Main.advantageSection.getRow(3).doesHaveText(), Action: actionTaken, Description: 'Omniscient no text'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(3).doesHaveRank(), Action: actionTaken, Description: 'Omniscient has rank'});
    testResults.push({Expected: Data.Advantage.maxRanks.get('Omniscient'), Actual: Main.advantageSection.getRow(3).getRank(), Action: actionTaken, Description: 'as max'});

    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(4).doesHaveRank(), Action: actionTaken, Description: 'Supreme has rank'});
    testResults.push({Expected: 5, Actual: Main.advantageSection.getRow(4).getRank(), Action: actionTaken, Description: 'as specified'});
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(4).doesHaveText(), Action: actionTaken, Description: 'Supreme has text'});
    testResults.push({Expected: 'sup1', Actual: Main.advantageSection.getRow(4).getText(), Action: actionTaken, Description: 'as specified'});
    testResults.push({Expected: 1, Actual: Main.advantageSection.getRow(5).getRank(), Action: actionTaken, Description: 'Supreme with minimum rank'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    Main.clearMockMessenger();  //restore default behaviour
    document.getElementById('code box').value = '';  //clear out so that control + F won't be thrown off
    TesterUtility.displayResults('Tester.advantageList.load', testResults, isFirst);
};
Tester.advantageRow={};
Tester.advantageRow.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.advantageRow.data={setUp: Tester.data.beforeAll};
Tester.advantageRow.setAdvantage=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
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
Tester.defenseList={};
Tester.defenseList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.defenseList.data={setUp: Tester.data.beforeAll};
Tester.defenseList.calculateValues=function(isFirst)
{
    TesterUtility.clearResults(isFirst);  //this also sets old rules to false

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: '0', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will input').value, Action: actionTaken, Description: 'Will defense input says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getRank(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Presence').getValue(), Action: actionTaken, Description: 'Presence is 0'});

   //test new rule functionality
    actionTaken='Set Presence'; TesterUtility.changeValue('Presence', 2);
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Presence').getValue(), Action: actionTaken, Description: 'Presence was set to 2'});
    testResults.push({Expected: '2', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 2'});
    testResults.push({Expected: '2', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 2'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});

    actionTaken='Change Will'; TesterUtility.changeValue('Will input', 1);
    testResults.push({Expected: '2', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 2'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getByName('Will').getRank(), Action: actionTaken, Description: 'Will defense input is 1'});
    //document.getElementById('Will input').value is always valid (as long as TesterUtility.changeValue works)
    testResults.push({Expected: '3', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 1'});
    //abilitySection and defenseSection are both cleared by Main.setRuleset

   //test old rule functionality
    actionTaken='Set Old Rules'; Main.setRuleset(1, 1);
    testResults.push({Expected: '0', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Awareness').getValue(), Action: actionTaken, Description: 'Awareness is 0'});

    actionTaken='Set Awareness'; TesterUtility.changeValue('Awareness', 3);
    testResults.push({Expected: 3, Actual: Main.abilitySection.getByName('Awareness').getValue(), Action: actionTaken, Description: 'Awareness was set to 3'});
    testResults.push({Expected: '3', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: '3', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 0'});

    actionTaken='Change Will'; TesterUtility.changeValue('Will input', 1);
    testResults.push({Expected: '3', Actual: document.getElementById('Will start').innerHTML, Action: actionTaken, Description: 'Will defense inital says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Action: actionTaken, Description: 'And it is 3'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getByName('Will').getRank(), Action: actionTaken, Description: 'Will defense input is 1'});
    testResults.push({Expected: '4', Actual: document.getElementById('Will final').innerHTML, Action: actionTaken, Description: 'Will defense bonus says 4'});
    testResults.push({Expected: 4, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Action: actionTaken, Description: 'And it is 4'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getTotal(), Action: actionTaken, Description: 'The defense section total cost is 1'});
    Main.setRuleset(2, 7);

    TesterUtility.displayResults('Tester.defenseList.calculateValues', testResults, isFirst);
};
Tester.defenseList.load=function(isFirst)
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

    TesterUtility.displayResults('Tester.defenseList.load', testResults, isFirst);
};
Tester.defenseList.calculateToughness=function(isFirst)
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

    TesterUtility.displayResults('Tester.defenseList.calculateToughness', testResults, isFirst);
};
Tester.main={};
Tester.main.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.main.data={setUp: Tester.data.beforeAll};
Tester.main.changeRuleset=function(isFirst)
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
    Main.setRuleset(1, 1);  //includes Main.clear() because the rules changed
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TesterUtility.changeValue('advantageRank0', 3);
    testResults.push({Expected: '+12', Actual: initiativeElement.innerHTML, Action: actionTaken, Description: '1.1 Improved Initiative 3'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.setRuleset(3, 0);  //includes Main.clear() because the rules changed
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

    /**this value must match the result of Main.clear(); Main.save();
    It is a string so that it is completely immutable and easy to copy.*/
   const blankDoc = JSON.stringify
   ({
         "Hero":
         {
              "name": "Hero Name",
              "transcendence": 0,
              "image": "../images/Sirocco.jpg"
         },
         "Abilities":
         {
              "Strength": 0,
              "Agility": 0,
              "Fighting": 0,
              "Awareness": 0,
              "Stamina": 0,
              "Dexterity": 0,
              "Intellect": 0,
              "Presence": 0
         },
          "Powers": [],
          "Equipment": [],
          "Advantages": [],
          "Skills": [],
         "Defenses":
         {
              "Dodge": 0,
              "Fortitude": 0,
              "Parry": 0,
              "Will": 0
         },
          "ruleset": "2.7",
          "version": 2,
          "Information": "Complications, background and other information"
   });
    SelectUtil.setText('saveType', 'JSON');
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
Tester.modifierList={};
Tester.modifierList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.modifierList.data={setUp: Tester.data.beforeAll};
Tester.modifierList.calculateGrandTotal=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierList.calculateGrandTotal', testResults, isFirst);
};
Tester.modifierList.calculateValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierList.calculateValues', testResults, isFirst);
};
Tester.modifierList.createByNameRank=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierList.createByNameRank', testResults, isFirst);
};
Tester.modifierList.getUniqueName=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierList.getUniqueName', testResults, isFirst);
};
Tester.modifierList.load=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierList.load', testResults, isFirst);
};
Tester.modifierList.sanitizeRows=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierList.sanitizeRows', testResults, isFirst);
};
Tester.modifierRow={};
Tester.modifierRow.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.modifierRow.data={setUp: Tester.data.beforeAll};
Tester.modifierRow.setModifier=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.setModifier', testResults, isFirst);
};
Tester.modifierRow.setRank=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.setRank', testResults, isFirst);
};
Tester.modifierRow.calculateTotal=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
       //old modifier tests: *) changing from sustained to permanent is free *) changing from permanent to sustained is free
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.modifierRow.calculateTotal', testResults, isFirst);
};
Tester.modifierRow.generate=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.generate', testResults, isFirst);
};
Tester.modifierRow.setAutoRank=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.setAutoRank', testResults, isFirst);
};
Tester.modifierRow.setValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.modifierRow.setValues', testResults, isFirst);
};
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
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

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
Tester.powerRow={};
Tester.powerRow.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.powerRow.data={setUp: Tester.data.beforeAll};
Tester.powerRow.setDuration=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    //test Permanent duration of a base non-Permanent power without personal range
    try{
    actionTaken='Set Create'; SelectUtil.changeText('powerChoices0', 'Create');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Create has a default duration of Sustained'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Create has a default range of Ranged'});
    actionTaken='Change to Permanent'; SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Create can\'t be changed to Permanent duration'});
    actionTaken='Change to Concentration'; SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Create can be changed to Concentration duration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Permanent duration of a base non-Permanent power (with personal range)
    try{
    actionTaken='Set Flight'; SelectUtil.changeText('powerChoices0', 'Flight');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Flight has a default duration of Sustained'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Flight has a default range of Personal'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Flight has a default action of Free'});
    actionTaken='Change to Permanent'; SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Flight can change to Permanent duration'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Flight\'s action was auto changed to None'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Flight can change back to Permanent duration'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Flight\'s action was auto changed back to Free'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Permanent duration of a base Permanent power
    try{
    actionTaken='Set Regeneration'; SelectUtil.changeText('powerChoices0', 'Regeneration');
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Regeneration has a default duration of Permanent'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Regeneration has a default range of Personal'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Regeneration has a default action of None'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Regeneration was set to Sustained duration'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Regeneration\'s action was auto changed to Free'});
    actionTaken='Change to Permanent'; SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Regeneration was set to Permanent duration'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Regeneration\'s action auto changed back to None'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //base Permanent power shouldn't affect action when not setting to and from Permanent
    try{
    actionTaken='Sustained Regeneration'; SelectUtil.changeText('powerChoices0', 'Regeneration'); SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Regeneration can be set to Sustained duration'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Regeneration\'s action was auto set to Free'});
    actionTaken='Change to Move'; SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'I changed Regeneration\'s action to Move'});
    actionTaken='Change to Continuous'; SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Regeneration was changed to Continuous duration'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Regeneration\'s action was not affected'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Regeneration can be changed back to Sustained duration'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Regeneration\'s action was still not affected'});
    Main.powerSection.clear();
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Increased Duration
    try{
    actionTaken='Set Flight Continuous'; SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Flight can be set to Continuous duration'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Increased Duration was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Increased Duration is rank 1'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Increased Duration was auto removed'});
    actionTaken='Continuous to Concentration'; SelectUtil.changeText('powerSelectDuration0', 'Continuous'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Increased Duration was auto replaced with Decreased Duration'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Decreased Duration is rank 1'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Increased Duration was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Decreased Duration
    try{
    Main.powerSection.clear();
    actionTaken='Set Flight Concentration'; SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Flight can be set to Concentration duration'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Decreased Duration was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Decreased Duration is rank 1'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Decreased Duration was auto removed'});
    actionTaken='Concentration to Continuous'; SelectUtil.changeText('powerSelectDuration0', 'Concentration'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Decreased Duration was auto replaced with Increased Duration'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Increased Duration is rank 1'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Decreased Duration was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

   //feature section. still part of powerRow.setDuration because feature should not be tested separately
   {
    //Feature can set to and from Instant duration without affecting action
    try{
    actionTaken='Sustained Feature'; SelectUtil.changeText('powerChoices0', 'Feature'); SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature can be set to Sustained duration'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature\'s action was auto set to Free'});
    actionTaken='Change to Move'; SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'I changed Feature\'s action to Move'});
    actionTaken='Change to Instant'; SelectUtil.changeText('powerSelectDuration0', 'Instant');
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature can be changed to Instant duration'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature\'s action was not affected'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature can be changed back to Sustained duration'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature\'s action was still not affected'});
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Permanent duration of a base non-Permanent power without personal range
       //these tests make sure Feature is treated like any other power in these cases
    try{
    actionTaken='Set Close Range'; SelectUtil.changeText('powerSelectDuration0', 'Sustained'); SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature now has Close range'});
    actionTaken='Change to Permanent'; SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature can\'t be changed to Permanent duration'});
    actionTaken='Change to Concentration'; SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature can be changed to Concentration duration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Permanent duration of a base non-Permanent power (with personal range)
       //these tests make sure Feature is treated like any other power in these cases
    try{
    actionTaken='Personal Sustained'; SelectUtil.changeText('powerSelectRange0', 'Personal'); SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature has Sustained duration'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature has a range of Personal'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature has an action of Free'});
    actionTaken='Change to Permanent'; SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature can change to Permanent duration'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature\'s action was auto changed to None'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature can change back to Permanent duration'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature\'s action was auto changed back to Free'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Permanent duration of a base Permanent power
       //these tests make sure Feature is treated like any other power in these cases
    try{
    actionTaken='Set Permanent'; SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature has a duration of Permanent'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature has a range of Personal'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature has a action of None'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature\'s action was auto changed to Free'});
    actionTaken='Change to Permanent'; SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature\'s action auto changed back to None'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Increased Duration
    try{
    Main.powerSection.clear();
    actionTaken='Set Continuous'; SelectUtil.changeText('powerChoices0', 'Feature'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Increased Duration was not auto created'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Increased Duration still gone'});
    actionTaken='Continuous to Concentration'; SelectUtil.changeText('powerSelectDuration0', 'Continuous'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Increased Duration still gone'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Decreased Duration
    try{
    Main.powerSection.clear();
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature has Concentration duration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Decreased Duration was not auto created'});
    actionTaken='Change to Sustained'; SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Decreased Duration still gone'});
    actionTaken='Concentration to Continuous'; SelectUtil.changeText('powerSelectDuration0', 'Concentration'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Decreased Duration still gone'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}
   }

    TesterUtility.displayResults('Tester.powerRow.setDuration', testResults, isFirst);
};
Tester.powerRow.setPower=function(isFirst)
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

    TesterUtility.displayResults('Tester.powerRow.setPower', testResults, isFirst);
};
Tester.powerRow.setAction=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    //testing for setting to None exists in setDuration tests
    var testResults=[], actionTaken;
    //test Faster Action
    try{
    actionTaken='Set Attain Knowledge Free'; SelectUtil.changeText('powerChoices0', 'Attain Knowledge'); SelectUtil.changeText('powerSelectAction0', 'Free');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Attain Knowledge can be set to Free action'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Faster Action was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Faster Action is rank 2'});
    actionTaken='Change to Standard'; SelectUtil.changeText('powerSelectAction0', 'Standard');
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Attain Knowledge can be set to Standard action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Faster Action was auto removed'});
    actionTaken='Free to Slow'; SelectUtil.changeText('powerSelectAction0', 'Free'); SelectUtil.changeText('powerSelectAction0', 'Slow');
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Faster Action was auto replaced with Slower Action'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Slower Action is rank 2'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Faster Action was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Slower Action
    try{
    actionTaken='Set Attain Knowledge Slow'; SelectUtil.changeText('powerChoices0', 'Attain Knowledge'); SelectUtil.changeText('powerSelectAction0', 'Slow');
    testResults.push({Expected: 'Slow', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Attain Knowledge can be set to Slow action'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Slower Action was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Slower Action is rank 2'});
    actionTaken='Change to Standard'; SelectUtil.changeText('powerSelectAction0', 'Standard');
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Attain Knowledge can be set to Standard action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Slower Action was auto removed'});
    actionTaken='Slow to Free'; SelectUtil.changeText('powerSelectAction0', 'Slow'); SelectUtil.changeText('powerSelectAction0', 'Free');
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Slower Action was auto replaced with Faster Action'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Faster Action is rank 2'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Slower Action was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Selective
    try{
    actionTaken='Set Nullify Triggered'; SelectUtil.changeText('powerChoices0', 'Nullify'); SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Triggered', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Nullify can be set to Triggered action'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Selective was auto created'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Action: actionTaken, Description: 'Faster Action was auto created'});
    actionTaken='Change to Standard'; SelectUtil.changeText('powerSelectAction0', 'Standard');
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Selective remains'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'But Faster Action was auto removed'});
    actionTaken='Pad Selective'; SelectUtil.changeText('powerModifierChoices0.0', 'Other Free Modifier'); SelectUtil.changeText('powerModifierChoices0.1', 'Selective');
    actionTaken='Change to Triggered'; SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Triggered', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Nullify can be set to Triggered action again'});
    testResults.push({Expected: 'Other Free Modifier', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'First modifier row remains'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Action: actionTaken, Description: 'Selective remains'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 2).getName(), Action: actionTaken, Description: 'Faster Action readded'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 3).isBlank(), Action: actionTaken, Description: 'And there is only 1 Selective'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

   //feature section
   {
    //test Faster Action
    try{
    Main.powerSection.clear();
    actionTaken='Set Feature Sustained'; SelectUtil.changeText('powerChoices0', 'Feature'); SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature was set'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Free action was auto set'});
    actionTaken='Change to Reaction'; SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Attain Knowledge can be set to Free action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Faster Action was not auto added'});
    actionTaken='Change to Standard'; SelectUtil.changeText('powerSelectAction0', 'Standard');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Faster Action still gone'});
    actionTaken='Free to Slow'; SelectUtil.changeText('powerSelectAction0', 'Free'); SelectUtil.changeText('powerSelectAction0', 'Slow');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Faster Action still gone'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Slower Action
    try{
    actionTaken='Set Slow'; SelectUtil.changeText('powerSelectAction0', 'Slow');
    testResults.push({Expected: 'Slow', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature can be set to Slow action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Slower Action was not auto added'});
    actionTaken='Change to Standard'; SelectUtil.changeText('powerSelectAction0', 'Standard');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Slower Action still gone'});
    actionTaken='Slow to Free'; SelectUtil.changeText('powerSelectAction0', 'Slow'); SelectUtil.changeText('powerSelectAction0', 'Free');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Slower Action still gone'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //test Selective
    try{
    actionTaken='Set Triggered'; SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Triggered', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature can be set to Triggered action'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Selective was auto created'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Faster Action was not auto created'});
    actionTaken='Change to Standard'; SelectUtil.changeText('powerSelectAction0', 'Standard');
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Selective remains'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'And Faster Action is still gone'});
    actionTaken='Pad Selective'; SelectUtil.changeText('powerModifierChoices0.0', 'Other Free Modifier'); SelectUtil.changeText('powerModifierChoices0.1', 'Selective');
    actionTaken='Change to Triggered'; SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Other Free Modifier', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'First modifier row remains'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Action: actionTaken, Description: 'Selective remains'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 2).isBlank(), Action: actionTaken, Description: 'Faster Action still gone and nothing else exists'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}
   }
    TesterUtility.displayResults('Tester.powerRow.setAction', testResults, isFirst);
};
Tester.powerRow.setRange=function(isFirst)
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

    TesterUtility.displayResults('Tester.powerRow.setRange', testResults, isFirst);
};
Tester.powerRow.calculateValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.powerRow.calculateValues', testResults, isFirst);
};
Tester.powerRow.generate=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Set Damage';
    try{
    SelectUtil.changeText('powerChoices0', 'Damage');
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Damage has a default duration of Instant'});
    testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectDuration0'), Action: actionTaken, Description: 'The user can\'t change the duration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}
    //ADD TESTS
    //TODO: Tester sections should exist for generate and set all so that the gui logic is tested

    TesterUtility.displayResults('Tester.powerRow.generate', testResults, isFirst);

    return;
    Tester.powerRow.setDuration(isFirst, 'equipment');

    if(sectionName === undefined) sectionName='power';
    SelectUtil.changeText(sectionName+'Choices0', 'Damage');
    Main[sectionName+'Section'].getRow(0).getDuration();
    TesterUtility.displayResults('Tester.'+sectionName+'Row.setDuration', testResults, isFirst);
};
Tester.powerRow.setValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.powerRow.setValues', testResults, isFirst);
};
Tester.skillList={};
Tester.skillList.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.skillList.data={setUp: Tester.data.beforeAll};
Tester.skillList.calculateValues=function(isFirst)
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

    TesterUtility.displayResults('Tester.skillList.calculateValues', testResults, isFirst);
};
Tester.skillList.load=function(isFirst)
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

    TesterUtility.displayResults('Tester.skillList.load', testResults, isFirst);
};
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
    var firstRow = Main.skillSection.getRow(0);  //short hand
    testResults.push({Expected: true, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First Row is blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Action: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Action: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: null, Actual: document.getElementById('skillText0'), Action: actionTaken, Description: 'Text doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillRank0'), Action: actionTaken, Description: 'Rank doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skillAbility0'), Action: actionTaken, Description: 'Ability doesn\'t exist'});
    testResults.push({Expected: null, Actual: document.getElementById('skill bonus 0'), Action: actionTaken, Description: 'Bonus doesn\'t exist'});

    try{
    actionTaken='Set Acrobatics'; SelectUtil.changeText('skillChoices0', 'Acrobatics');
    testResults.push({Expected: false, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First Row is not blank'});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Action: actionTaken, Description: ('Has first skill: ' + Data.Skill.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Action: actionTaken, Description: ('Has last skill: ' + Data.Skill.names.last())});
    testResults.push({Expected: 'Skill Subtype', Actual: document.getElementById('skillText0').value, Action: actionTaken, Description: 'Text exists'});
    testResults.push({Expected: '1', Actual: document.getElementById('skillRank0').value, Action: actionTaken, Description: 'Rank exists'});
    testResults.push({Expected: 'Agility', Actual: document.getElementById('skillAbility0').value, Action: actionTaken, Description: 'Ability exists'});
    testResults.push({Expected: '1', Actual: document.getElementById('skill bonus 0').innerHTML, Action: actionTaken, Description: 'Bonus exists'});

    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names[0]), Action: actionTaken, Description: ('Has first ability: ' + Data.Ability.names[0])});
    testResults.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names.last()), Action: actionTaken, Description: ('Has last ability: ' + Data.Ability.names.last())});

    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select One');
    testResults.push({Expected: true, Actual: firstRow.isBlank(), Action: actionTaken, Description: 'First Row is blank'});
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
Tester.SelectUtil={};
Tester.SelectUtil.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.SelectUtil.data={setUp: Tester.data.beforeAll};
Tester.SelectUtil.isSelect=function(isFirst)
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

    TesterUtility.displayResults('Tester.SelectUtil.isSelect', testResults, isFirst);
};
Tester.SelectUtil.getTextById=function(isFirst)
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

    TesterUtility.displayResults('Tester.SelectUtil.getTextById', testResults, isFirst);
};
Tester.SelectUtil.containsText=function(isFirst)
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

    TesterUtility.displayResults('Tester.SelectUtil.containsText', testResults, isFirst);
};
Tester.SelectUtil.setText=function(isFirst)
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

    TesterUtility.displayResults('Tester.SelectUtil.setText', testResults, isFirst);
};
Tester.SelectUtil.changeText=function(isFirst)
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

    TesterUtility.displayResults('Tester.SelectUtil.changeText', testResults, isFirst);
};
Tester.CommonsLibrary={};
Tester.CommonsLibrary.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.CommonsLibrary.data={setUp: Tester.data.beforeAll};
Tester.CommonsLibrary.select=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.select', testResults, isFirst);
};
Tester.CommonsLibrary.change=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.change', testResults, isFirst);
};
Tester.CommonsLibrary.clear=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.clear', testResults, isFirst);
};
Tester.CommonsLibrary.getRow=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.getRow', testResults, isFirst);
};
Tester.CommonsLibrary.update=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.update', testResults, isFirst);
};
Tester.CommonsLibrary.generate=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.generate', testResults, isFirst);
};
Tester.CommonsLibrary.removeRow=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.removeRow', testResults, isFirst);
};
Tester.CommonsLibrary.sanitizeRows=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.sanitizeRows', testResults, isFirst);
};
Tester.CommonsLibrary.setAll=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.setAll', testResults, isFirst);
};
Tester.CommonsLibrary.initializeRows=function(isFirst)
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

    TesterUtility.displayResults('Tester.CommonsLibrary.initializeRows', testResults, isFirst);
};
Tester.tools={};
Tester.tools.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.tools.data={setUp: Tester.data.beforeAll};
Tester.tools.sanitizeNumber=function(isFirst)
{  //TODO: rename these tests
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    var zeroArray = ['NaN', NaN, 'Text', 'x123', '#FF00FF', 'null', null, 'undefined', undefined, '', '     \t\n  ', '1Text', 'Text1', '12,345', '1.2.3', '-', '+', '+-1', '++1', '1+', '1e', 'e', 'e1', 'Infinity', '-Infinity', '0x123', '+0x123', '-0x123', '0', '.12', '+.12', '-0.12', Number.EPSILON, Number.MIN_VALUE, '-1.2e-3'];
    var numberArray = ['123', '+123', '1.2e+3', '+1.2e3', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER];
    var result;
    var normalSanitize = function(num){return sanitizeNumber(num, -5, 0);};

    try{
    actionTaken='Invalid Loop';
   for (var i=0; i < zeroArray.length; i++)
   {
       result = normalSanitize(zeroArray[i]);
       testResults.push({Expected: 0, Actual: result, Action: actionTaken, Description: (zeroArray[i] + ' => 0 (default value)')});
   }
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    actionTaken='Valid Loop';
   for (var i=0; i < numberArray.length; i++)
   {
       result = normalSanitize(numberArray[i]);
       testResults.push({Expected: Math.floor(parseFloat(numberArray[i])), Actual: result, Action: actionTaken, Description: (numberArray[i] + ' string to number')});
   }
    result = normalSanitize(-1);
    testResults.push({Expected: -1, Actual: result, Action: actionTaken, Description: '-1 string to number'});
    result = normalSanitize(-1.2);
    testResults.push({Expected: -1, Actual: result, Action: actionTaken, Description: '-1.2 string to number'});
    result = normalSanitize(Number.MIN_SAFE_INTEGER);
    testResults.push({Expected: -5, Actual: result, Action: actionTaken, Description: (Number.MIN_SAFE_INTEGER + ' string to number (min of -5)')});
    result = normalSanitize(-500);
    testResults.push({Expected: -5, Actual: result, Action: actionTaken, Description: '-500 string to number (min of -5)'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.tools.sanitizeNumber', testResults, isFirst);
};
Tester.tools.xmlToJson=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS. mostly just make sure it doesn't crash from invalid data
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.tools.xmlToJson', testResults, isFirst);
};
Tester.tools.jsonToXml=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS. mostly just make sure it doesn't crash from invalid data
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.tools.jsonToXml', testResults, isFirst);
};
Tester.test={};
Tester.test.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.test.data={setUp: Tester.data.beforeAll};
Tester.test.readXMLAsString=function(isFirst)
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

    TesterUtility.displayResults('Tester.test.readXMLAsString', testResults, isFirst);
};
Tester.test.stringDiffIndex=function(isFirst)
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

    TesterUtility.displayResults('Tester.test.stringDiffIndex', testResults, isFirst);
};
Tester.test.stringDiffDisplay=function(isFirst)
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

    TesterUtility.displayResults('Tester.test.stringDiffDisplay', testResults, isFirst);
};
Tester.test.dataInfo=function(isFirst)
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

    TesterUtility.displayResults('Tester.test.dataInfo', testResults, isFirst);
};
Tester.test.allDataInfo=function(isFirst)
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

    TesterUtility.displayResults('Tester.test.allDataInfo', testResults, isFirst);
};
Tester.test.allDataInfoToCodeBox=function(isFirst)
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

    TesterUtility.displayResults('Tester.test.allDataInfoToCodeBox', testResults, isFirst);
};
//TODO: make all tests (search for ADD TESTS)

/**Given the relative (might also allow absolute) path to the xml this method returns a string of the contents.
None of my browsers allow this by default for security reasons. In order to run this in chrome: first close all chrome then run:
C:\Program Files (x86)\Google\Chrome\Application>chrome.exe --allow-file-access-from-files*/
function readXMLAsString(xmlLocation)
{
    var xmlhttp=new XMLHttpRequest();  //code for IE7+, Chrome, Firefox, Opera, Safari
    //if(!window.XMLHttpRequest){xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');}// code for IE5, IE6
       //removed so IE won't complain about old code. I don't support old browsers anyway
    xmlhttp.open('GET', xmlLocation, false);  //will throw null pointer if IE5, IE6
       //uses false to block because it needs the response to do anything else
    xmlhttp.send();
    var xmlText=new XMLSerializer().serializeToString(xmlhttp.responseXML);
    return xmlText;
}
/**Compares the 2 strings and returns the character index at which they are different or nothing if they match.
Keep in mind that if the strings are not the same length the index returned is equal to the length of the shorter string.
stringA[i] is used over stringA.charAt(i) if that matters*/
function stringDiffIndex(stringA, stringB)
{
    for(var i=0; i < stringA.length; i++)
       {if(stringA[i] !== stringB[i]) return i;}  //if i >= stringB.length then stringB[i] is undefined which can't match stringA[i]
    if(stringB.length > stringA.length) return stringA.length;
    return;  //same string
}
/**Compares the 2 strings and returns either 'Matches' (if the strings match) or a string that shows the index, character, and character code at which they are different*/
function stringDiffDisplay(stringA, stringB)
{
    var diffIndex=stringDiffIndex(stringA, stringB);
    if(diffIndex === undefined) return 'Matches';
    return ('index='+diffIndex+'; |'+stringA[diffIndex]+'| ('+stringA.charCodeAt(diffIndex)+') vs |'+stringB[diffIndex]+'| ('+stringB.charCodeAt(diffIndex)+')');
}
/**Returns a json object that represents all of the data related to an entry (such as all data about the power Flight).
dataSource needs to be one of the data objects. name is the name of the entry.
Note that it returns a boolean which is if the name is contained in an array which doesn't always make sense.
this is used to find unusual data for the sake of testing*/
function dataInfo(dataSource, name)
{
    var output = {};
   for (var i in dataSource)
   {
       if(dataSource[i] instanceof MapDefault) output[i] = dataSource[i].get(name);
       else if(Array.isArray(dataSource[i])) output[i] = dataSource[i].contains(name);
   }
    return output;
}
/**Returns an array of json objects that represents all of the data related to every entry of a data set (such as all data about all powers).
dataSource needs to be one of the data objects.
This simply calls dataInfo in a loop and adds the name to it.
See dataInfo's doc for more info*/
function allDataInfo(dataSource)
{
    var output = [];
   for (var i=0; i < dataSource.names.length; i++)
   {
       output.push(dataInfo(dataSource, dataSource.names[i]));
       output.last().name = dataSource.names[i];
   }
    return output;
}
/**Prints the result of allDataInfo in the code box.
See allDataInfo for more info*/
function allDataInfoToCodeBox(dataSource)
{
    document.getElementById('code box').value = JSON.stringify(allDataInfo(Data.Skill));
}
/**This is NOT a normal bling! It only allows getting an element by id (starting with '#'). Nothing is returned in any other case (undefined not null).*/
//if(window.$ === undefined){window.$=function(name){if(name[0] === '#') return document.getElementById(name.substring(1));};}
//I could use $('#transcendence') over document.getElementById('transcendence'); etc but why bother: the latter is more clear
//I only use this for debugging

/**This function was made to test the difference and reliability of isNaN and isFinite. It is not included in Tester so that it isn't auto ran.
Unlike confirmAllXmls this test suite is not in any way related to the project which is why is isn't hidden in Tester.*/
function unlinkedNanTest()
{
    var testResults=[], actionTaken, testDescription;
    var trueTests=['NaN', NaN, 'Text', 'x123', '#FF00FF', 'null', null, 'undefined', undefined, '', '     \t\n  ', '1Text', 'Text1', '12,345', '1.2.3', '-', '+', true, false, new Date(2009,1,1), {}, function(){}, [], '+-1', '++1', '1+', '1e', 'e', 'e1'];
    var falseTests=['123', '+123', 123, new Number(123), '0x123', '+0x123', '-0x123', '0', '-1.2', '.12', '+.12', '-1.2e-3', '1.2e+3', '+1.2e3', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER, Number.MIN_VALUE, Number.MIN_SAFE_INTEGER, '09'];
    var testFunctions=[isNaN, isNotFinite, numberConstructorNaN];
    function numberConstructorNaN(num){return (Number(num).toString() === 'NaN');}  //this works
    function isNotFinite(num){return (!isFinite(num));}

    TesterUtility.clearResults();

   for (var functionIndex=0; functionIndex < testFunctions.length; functionIndex++)
   {
       actionTaken='NaN tests';
      for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
      {
          testDescription=testFunctions[functionIndex].name+'(';
          if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
          else testDescription+=trueTests[inputIndex];
          testDescription+=')';
          testResults.push({Expected: true, Actual: testFunctions[functionIndex](trueTests[inputIndex]), Action: actionTaken, Description: testDescription});
      }
       actionTaken='Number tests';
      for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
      {
          testDescription=testFunctions[functionIndex].name+'(';
          if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
          else testDescription+=falseTests[inputIndex];
          testDescription+=')';
          testResults.push({Expected: false, Actual: testFunctions[functionIndex](falseTests[inputIndex]), Action: actionTaken, Description: testDescription});
      }
   }

    actionTaken='Infinity tests';
    testResults.push({Expected: false, Actual: isNaN('Infinity'), Action: actionTaken, Description: 'isNaN("Infinity")'});
    testResults.push({Expected: false, Actual: isNaN(Infinity), Action: actionTaken, Description: 'isNaN(Infinity)'});
    testResults.push({Expected: false, Actual: isNaN('-Infinity'), Action: actionTaken, Description: 'isNaN("-Infinity")'});
    testResults.push({Expected: false, Actual: isNaN(-Infinity), Action: actionTaken, Description: 'isNaN(-Infinity)'});

    testResults.push({Expected: true, Actual: !isFinite('Infinity'), Action: actionTaken, Description: '!isFinite("Infinity")'});
    testResults.push({Expected: true, Actual: !isFinite(Infinity), Action: actionTaken, Description: '!isFinite(Infinity)'});
    testResults.push({Expected: true, Actual: !isFinite('-Infinity'), Action: actionTaken, Description: '!isFinite("-Infinity")'});
    testResults.push({Expected: true, Actual: !isFinite(-Infinity), Action: actionTaken, Description: '!isFinite(-Infinity)'});

    testResults.push({Expected: true, Actual: !numberConstructorNaN('Infinity'), Action: actionTaken, Description: '!numberConstructorNaN("Infinity")'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN(Infinity), Action: actionTaken, Description: '!numberConstructorNaN(Infinity)'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN('-Infinity'), Action: actionTaken, Description: '!numberConstructorNaN("-Infinity")'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN(-Infinity), Action: actionTaken, Description: '!numberConstructorNaN(-Infinity)'});

    actionTaken='No Parameter tests';
    testResults.push({Expected: true, Actual: isNaN(), Action: actionTaken, Description: 'isNaN()'});
    testResults.push({Expected: true, Actual: !isFinite(), Action: actionTaken, Description: '!isFinite()'});
    testResults.push({Expected: true, Actual: !numberConstructorNaN(), Action: actionTaken, Description: '!numberConstructorNaN()'});

    actionTaken='Comparing NaN tests';
   for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
       else testDescription+=trueTests[inputIndex];
       testDescription+=') vs isNotFinite';
       testResults.push({Expected: isNaN(trueTests[inputIndex]), Actual: isNotFinite(trueTests[inputIndex]), Action: actionTaken, Description: testDescription});
   }
    actionTaken='Comparing Number tests';
   for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
       else testDescription+=falseTests[inputIndex];
       testDescription+=') vs isNotFinite';
       testResults.push({Expected: isNaN(falseTests[inputIndex]), Actual: isNotFinite(falseTests[inputIndex]), Action: actionTaken, Description: testDescription});
   }

    actionTaken='Comparing NaN tests';
   for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
       else testDescription+=trueTests[inputIndex];
       testDescription+=') vs numberConstructorNaN';
       testResults.push({Expected: isNaN(trueTests[inputIndex]), Actual: numberConstructorNaN(trueTests[inputIndex]), Action: actionTaken, Description: testDescription});
   }
    actionTaken='Comparing Number tests';
   for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
   {
       testDescription='isNaN(';
       if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
       else testDescription+=falseTests[inputIndex];
       testDescription+=') vs numberConstructorNaN';
       testResults.push({Expected: isNaN(falseTests[inputIndex]), Actual: numberConstructorNaN(falseTests[inputIndex]), Action: actionTaken, Description: testDescription});
   }

    TesterUtility.displayResults('unlinkedNanTest', testResults, true);  //grand total is pointless but this will scroll me to the bottom
};
/*
Primitives and objects get the same results. The special values:
NaN (also with optional leading +-), undefined, Infinity (also with optional leading +-)
all get the same results as is or with the string version. Except null

The following are NaN:
NaN (duh), 'Text', 'x123', '#FF00FF', 'null', undefined (and obviously passing in nothing is the same),
'1Text', 'Text1', '12,345', '1.2.3'

The following are numbers:
Infinity, -Infinity, '123', 123 (obviously anything that typeof() === 'number' or is a Number object), '0x123', null

Problem: isNaN(null) returns false (meaning isNaN thinks null is a number)

Failed tests:
isNaN(null), empty string, white space only string, primitive booleans, Date object, [], '+0x123'

so here's the code for isFinite:
function isFinite(num)
{
    if(isNaN(num)) return false;
    num=Math.abs(Number(num));
    if(num === Infinity) return false;
    return true;
}

WTF JS moments:
isNaN(null) === false
numberConstructorNaN() === true but numberConstructorNaN(undefined) === false
    which is only possible if it checks the number of parameters even though it only uses the first
NaN !== NaN
    there used to be a reason for this. javascript being old obeyed it by convention.
    currently the rational behind it is obsolete and some modern languages have fixed this logical contradiction
(new Number(1)) !== 1 and (new Number(1)) !== (new Number(1))
    They are the same type and value
    This makes sense in Java where == compares if they are pointing to the same object but that's not what === does in js
    unless they are both objects in which case that's exactly how they behave (=== and == are the same in such cases)
    ({}) !== ({}) so comparing objects is never possible yet Object.prototype.equals (or even Object.equals) doesn't exist
(new Number(1)) < (new Number(2))
    so it probably just calls valueOf but then why doesn't it do that for equality?
    but 'as' < 'asd' compares by ascii despite valueOf returning the same thing as toString (both return itself)
typeof(new Number(1)) !== typeof(Number(1))
    returns: 'object' and 'number'
typeof(new String(1)) === 'object' but typeof('1') === 'string'
    Why is there a primitive string? That doesn't even make sense. The reason for it is so that strings can be compared with any numeric comparison
    here's something confusing: since there is no character class all strings are arrays of strings, with string length 1 containing only itself
typeof(/a/) === 'object' despite being first class it has no primitive value and is considered an object
    the same is true for functions partially: typeof(function(){}) === 'function' but also has a wrapper object and primitive function compares like objects
function outerFun()
{
   console.log('outerFun '+(this === window || this === undefined));  //prints false
   innerFun();
   function innerFun()
   {
       console.log('innerFun '+(this === window || this === undefined));  //prints true
   }
}; new outerFun();
    innerFun is a private function that only exists within outerFun and can only be called from within outerFun.
    outerFun is constructed and exists as an object yet innerFun has global scope?
    global: { outerFun:{ innerFun:{} } } in definition and scope, yet this pointer does: global: { outerFun:{}, innerFun:{} }
    this is the reason why I made all my functions public
*/
