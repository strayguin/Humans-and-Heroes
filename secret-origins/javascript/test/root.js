TestConfig.betweenEach=function(){Main.clear(); Main.setRuleset(2, 7);};
//every test needs to clear out for the other test to start clean
//even if slow do not disable Main generation because an error might occur (due to undefined values) in which case I need to see how Main was

//doesn't take as long as I thought but still leave it out of TestSuite.testAll() hence being a global function
function confirmAllXmls()
{
    TestRunner.clearResults();
    //Main.setRuleset(2, 7);  //the xmls are only saved with current rules
       //covered by clearResults and by Main.load
    SelectUtil.setText('saveType', 'XML');  //needed

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
    catch(e){alert('You idiot, you can\'t run this here. I have a shortcut in the git folder.'); throw e;}  //Whoops, my bad I better turn on the flag first
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
          document.getElementById('code box').value=originalContents;
          originalContents=originalContents.replace(/\/>/g, ' />');
          //originalContents=originalContents.replace(/<Document ruleset="\d+.\d+" version="\d+">/, '<Document>');  //don't replace: being out of date is noteworthy
          originalContents=originalContents.replace('?>', '?>\n\n');  //add a blank line
          originalContents=originalContents.replace('<Powers />', '<Powers></Powers>');  //make empty group instead of self closing
          originalContents=originalContents.replace('<Equipment />', '<Equipment></Equipment>');
          originalContents=originalContents.replace('<Advantages />', '<Advantages></Advantages>');
          originalContents=originalContents.replace('<Skills />', '<Skills></Skills>');
          originalContents+='\n';  //ends with a blank line
          originalContents=originalContents.replace(/\s+<!--[\s\S]*?-->/g, '');  //remove comments when comparing because save doesn't generate them
          Main.loadFromTextArea();
          Main.saveToTextArea();
          var newContents=document.getElementById('code box').value;
          testResults.push({Expected: originalContents, Actual: newContents, Description: actionTaken+allFolders[folderIndex]+allFiles[folderIndex][fileIndex]});
          //document.getElementById('code box').value=originalContents;
          //document.getElementById('code box').value+=stringDiffDisplay(originalContents, newContents);
          //break;
      }
       //break;
   }

    return TestRunner.displayResults('confirmAllXmls', testResults, true);
}
/*
What I want: rename, goto anything, goto definition, find all usages, stuff from np++
Visual Studio Code: https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx rename (local only), goto anything (can't mix file@fun)
Atom: https://atom.io/ has a fuzzy search (file name only) nothing else. although plugins probably have it all
Brackets: http://brackets.io/ built in lint (not hint!). goto anything (can't mix file@fun), goto definition
Sublime: goto anything (file@fun but not over all files), goto definition (via goto anything)

Next:
try webstorm if it looks good then try intelli-j with plug ins
try atom with plug ins
apparently sublime has plugins: http://stackoverflow.com/questions/18184207/ide-autocompletion-for-javascript-amd-loading-style

NetBeans: https://netbeans.org/downloads/ open file. weak goto definition which works or fails, has very few warnings
http://www.codelobster.com open file. goto definition which works or asks!
Komodo Edit (free version of Komodo IDE): http://komodoide.com/komodo-edit/ has warnings. open file. goto definition of local functions
Aptana Studio 3: http://www.aptana.com/products/studio3/download.html open file
Not free: WebStorm: https://www.jetbrains.com/webstorm/
NotePad++ has nothing
"Free JavaScript Editor": http://www.yaldex.com/Free_JavaScript_Editor.htm has nothing

http://docs.seleniumhq.org/ and http://www.eclipse.org/webtools/jsdt/
http://www.slant.co/topics/1686/~javascript-ides-and-editors
*/

//TODO: make a test for loading quirks (per section) to test for things that onChange wouldn't allow
    //for example: loading action is based on duration which is based on range which is based on duration... range is also based on modifiers
    //try: load effect name (and other power stuff), power rank, then all modifiers, then range, then duration, then action

TestSuite.test={};
TestSuite.test.unstableBubbleSort=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   try {
   var input = ['cat', 'human', 'dog'];
   function byStringLength(a,b) {
      if(a.length > b.length) return 1;
      if(a.length < b.length) return -1;
      return 0;
   }
   unstableBubbleSort(input, byStringLength);

   var expected = ['dog', 'cat', 'human'];
   testResults.push({Expected: expected, Actual: input, Description: 'Always unstable'});
   } catch(e){testResults.push({Error: e, Description: 'unstableBubbleSort'});}

   return TestRunner.displayResults('TestSuite.test.unstableBubbleSort', testResults, isFirst);
};
TestSuite.test.readXMLAsString=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.test.readXMLAsString', testResults, isFirst);
};
TestSuite.test.stringDiffIndex=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.test.stringDiffIndex', testResults, isFirst);
};
TestSuite.test.stringDiffDisplay=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.test.stringDiffDisplay', testResults, isFirst);
};
TestSuite.test.dataInfo=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.test.dataInfo', testResults, isFirst);
};
TestSuite.test.allDataInfo=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.test.allDataInfo', testResults, isFirst);
};
TestSuite.test.allDataInfoToCodeBox=function(isFirst)
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

    return TestRunner.displayResults('TestSuite.test.allDataInfoToCodeBox', testResults, isFirst);
};
//TODO: make all tests (search for ADD TESTS)
