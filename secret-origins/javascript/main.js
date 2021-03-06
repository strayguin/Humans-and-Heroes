(function(){
//include everything else because I'm cool like that
var jsFileNamesUsed = ['MapDefault', 'data', 'abilities', 'advantage list', 'advantage row', 'CommonsLibrary',
    'conversions', 'defenses', 'modifier list', 'modifier row', 'power list', 'power row', 'prototypes', 'SelectUtil',
    'skill list', 'skill row', 'Version'];
//the first 2 are first because everything depends on data which depends on MapDefault. everything else is alphabetical
if (null !== document.getElementById('testResults'))  //false in production to save memory (like half the files)
{
   var runnerPath = '../../../Miscellaneous/src/javascript/test runner';  //only works locally
   jsFileNamesUsed = jsFileNamesUsed.concat([runnerPath, 'test/root', 'test/abilities', 'test/advantage list',
      'test/advantage row', 'test/CommonsLibrary', 'test/conversions', 'test/defenses',
      'test/main', 'test/modifier list', 'test/modifier row', 'test/power list', 'test/power row',
      'test/SelectUtil', 'test/skill list', 'test/skill row', 'test/test tools']);
}
for(var i=0; i < jsFileNamesUsed.length; i++){includeJsFile(jsFileNamesUsed[i]);}
function includeJsFile(jsName)
{
    document.write('<script type="text/javascript" src="javascript/'+jsName+'.js"></script>');
    //document write is not a problem since this is ran only once
}
})();

/**Call List onChange
Hero Name: Nothing (only need to look at it when saving or loading)
Transcendence: changeTranscendence()
bio box: nothing: same as hero name
*/
function MainObject()
{
   //private variable section:
    const latestRuleset = new VersionObject(3, latestMinorVersion), latestVersion = 2;  //see bottom of this file for a version list
    var characterPointsSpent = 0, transcendence = 0, minimumTranscendence = 0, previousGodHood = false;
    var powerLevelAttackEffect = 0, powerLevelPerceptionEffect = 0;
    var activeRuleset = latestRuleset.clone();
    var mockMessenger;  //used for testing

   //Single line function section
    this.canUseGodHood=function(){return (transcendence > 0);};
    this.getActiveRuleset=function(){return activeRuleset.clone();};  //defensive copy so that yoda conditions function
    this.getLatestRuleset=function(){return latestRuleset.clone();};  //used for testing
    this.getTranscendence=function(){return transcendence;};
    /**This sets the code box with the saved text.*/
    this.saveToTextArea=function(){document.getElementById('code box').value = this.saveAsString();};
    /**This loads the text text within the code box.*/
    this.loadFromTextArea=function(){this.loadFromString(document.getElementById('code box').value);};
    /**Set a replacement function that is called in place of the normal user messenger.*/
    this.setMockMessenger=function(mockedFun){mockMessenger = mockedFun;};
    /**Restores the default function for messaging the user*/
    this.clearMockMessenger=function(){mockMessenger = undefined;};

   //Onchange section
   /**Onchange function for changing the ruleset. Sets the document values as needed*/
   this.changeRuleset=function()
   {
       var ruleset = document.getElementById('ruleset').value.trim();
      if ('' !== ruleset)
      {
          ruleset = ruleset.split('.');
          //major needs special treatment so only use Number.parseInt
          ruleset = new VersionObject(Number.parseInt(ruleset[0]), sanitizeNumber(ruleset[1], 0, 0));
          //if ruleset[1] is undefined then minor will be 0
          //ignore ruleset[2+] if there is any: eg 2.7.0184e9a
         if (!Number.isNaN(ruleset.major))  //ignore NaN. could be a typo like v2.0 in which case don't convert the version
         {
             if(ruleset.major < 1) ruleset = new VersionObject(1, 0);  //easy way to change to the oldest version
             else if(ruleset.isGreaterThan(latestRuleset)) ruleset = latestRuleset.clone();  //easy way to change to the latest version

            if (!ruleset.equals(activeRuleset))  //if changed
            {
                var jsonDoc = this.save();
                this.setRuleset(ruleset.major, ruleset.minor);
                jsonDoc.ruleset = activeRuleset.toString();  //so that the activeRuleset isn't reverted on load
                this.loadFromString(JSON.stringify(jsonDoc));
            }
         }
      }
       document.getElementById('ruleset').value = activeRuleset.toString();
   };
   /**Onchange function for changing the transcendence. Sets the document values as needed*/
   this.changeTranscendence=function()
   {
       if(1 === activeRuleset.major){transcendence = 0; return;}  //1.x doesn't have transcendence
       transcendence = sanitizeNumber(document.getElementById('transcendence').value, -1, 0);
       if((this.powerSection.isUsingGodhoodPowers() || this.advantageSection.hasGodhoodAdvantages()) && transcendence <= 0)
          transcendence = 1;  //must raise the minimum due to currently using god-like powers
       minimumTranscendence = transcendence;
       this.updateTranscendence();
   };

   //public functions section
   /**Resets all values that can be saved (except ruleset), then updates. Each section is cleared. The code box and file selectors are not touched.*/
   this.clear=function()
   {
       document.getElementById('HeroName').value = 'Hero Name';
       document.getElementById('transcendence').value = transcendence = minimumTranscendence = 0;
       this.abilitySection.clear();
       document.getElementById('imgFilePath').value='';
       this.loadImageFromPath();  //after setting the images to blank this will reset the image
       this.powerSection.clear();
       this.equipmentSection.clear();
       this.advantageSection.clear();
       this.skillSection.clear();
       this.defenseSection.clear();
       document.getElementById('bio box').value = 'Complications, background and other information';
       //do not change ruleset and do not change the code box (just in case the user needed that)
       //I also decided not to touch either file chooser so that the user can easily select from same folder again
   };
   /**Loads the file's data*/
   this.loadFile=function()
   {
       var filePath=document.getElementById('fileChooser').files[0];
       if(undefined === filePath) return;  //no file to load
       var oFReader=new FileReader();  //reference: https://developer.mozilla.org/en-US/docs/DOM/FileReader
       oFReader.readAsText(filePath);
       oFReader.onload=function(oFREvent){Main.loadFromString(oFREvent.target.result);};  //Main has been defined in order to use Main.loadFile() button
   };
   /**Loads the image file*/
   this.loadImageFromFile=function()
   {
       var filePath=document.getElementById('imgFileChooser').files[0];  //there's only ever 1 file
       if(undefined === filePath) return;  //no file to load
       var oFReader=new FileReader();  //reference: https://developer.mozilla.org/en-US/docs/DOM/FileReader
       oFReader.readAsDataURL(filePath);
       oFReader.onload=function(oFREvent){document.getElementById('characterImage').src = oFREvent.target.result;};
   };
   /**Loads the image path. If blank the image path is reset*/
   this.loadImageFromPath=function()
   {
       if(document.getElementById('imgFilePath').value === '')  //the reason for this is because the user doesn't know this default image path
          document.getElementById('imgFilePath').value = '../images/Sirocco.jpg';
       document.getElementById('characterImage').src = document.getElementById('imgFilePath').value;
   };
   /**Gets the total protection value of the sections power and equipment.*/
   this.getProtectionTotal=function()
   {
       if(1 === activeRuleset.major) return (this.powerSection.getProtectionRankTotal() + this.equipmentSection.getProtectionRankTotal());
       //protection stacks only in v1.x
       if(this.powerSection.getProtectionRankTotal() > this.equipmentSection.getProtectionRankTotal()) return this.powerSection.getProtectionRankTotal();
       return this.equipmentSection.getProtectionRankTotal();
   };
   /**This method passes a message to the user in some way (currently uses code box).
   It is abstracted for mocking and so it can easily be changed later.
   errorCode only exists to be sent to the mockMessenger*/
   this.messageUser=function(errorCode, messsageSent)
   {
       if(mockMessenger !== undefined){mockMessenger(errorCode, messsageSent); return;}
       document.getElementById('code box').value += messsageSent + '\n\n';
   };
   /**Onclick event for the saveToFileLink anchor link only.
   It changes the a tag so that the link downloads the document as a saved file.*/
   this.saveToFile=function()
   {
       var link = document.getElementById('saveToFileLink');
      if (document.getElementById('saveType').value === 'JSON')
      {
          link.download = document.getElementById('HeroName').value+'.json';
          link.href = 'data:application/json;charset=utf-8,'+encodeURIComponent(this.saveAsString());
      }
      else
      {
          link.download = document.getElementById('HeroName').value+'.xml';
          link.href = 'data:application/xml;charset=utf-8,'+encodeURIComponent(this.saveAsString());
      }
       //encodeURIComponent is called to convert end lines
       //there is no way to clear out the link info right after the save as prompt. So just ignore the huge href
       //assigning window.location doesn't work because it just takes you to the page instead of save prompt
       //an iframe form submit might work but this is better
   };
   /**This function handles all changes needed when switching between rules. Main.clear() is called unless no change is needed.*/
   this.setRuleset=function(major, minor)
   {
       if(activeRuleset.major === major && activeRuleset.minor === minor) return;  //done. don't clear out everything
       activeRuleset.major = major;
       activeRuleset.minor = minor;

       Data.change(major, minor);
       this.clear();  //needed to regenerate advantages etc
   };
   /**This counts character points and power level and sets the document. It needs to be called by every section's update.*/
   this.update=function()
   {
       this.calculateTotal();
       var powerLevel=0;

       //start by looking at character points which can't be negative
       powerLevel = Math.ceil(characterPointsSpent/15);  //if characterPointsSpent is 0 then powerLevel is 0

      //if you are no longer limited by power level limitations that changes the minimum possible power level:
      if(this.advantageSection.isUsingPettyRules())
          powerLevel = this.calculatePowerLevelLimitations(powerLevel);

       document.getElementById('power level').innerHTML = powerLevel;
       document.getElementById('grand total max').innerHTML = (powerLevel*15);
      if (activeRuleset.major > 1)
      {
          transcendence = Math.floor(powerLevel/20);  //gain a transcendence every 20 PL
          if(transcendence < minimumTranscendence) transcendence = minimumTranscendence;  //don't auto-set below the user requested value
          this.updateTranscendence();  //to regenerate as needed
      }
   };
   /**Calculates initiative and sets the document.*/
   this.updateInitiative=function()
   {
       var agilityScore = this.abilitySection.getByName('Agility').getZeroedValue();  //used zeroed because even absent agility has initiative
       var initiative = this.advantageSection.getRankMap().get('Improved Initiative');
       if(1 === activeRuleset.major) initiative *= 4;
       else if(2 === activeRuleset.major) initiative *= 2;
       //else v3.0 initiative *1
       initiative += agilityScore;

       var stringUsed;
       if(initiative >= 0) stringUsed = '+' + initiative;
       else stringUsed = initiative;
       if(1 === this.advantageSection.getRankMap().get('Seize Initiative')) stringUsed += ' with Seize Initiative';  //if has Seize Initiative
       document.getElementById('initiative').innerHTML = stringUsed;
   };
   /**Calculates and creates the offense section of the document.*/
   this.updateOffense=function()
   {
       powerLevelAttackEffect=0; powerLevelPerceptionEffect=0;
       var attackBonus;
       var allOffensiveRows = '<table width="100%">';
       var closeSkillMap = this.skillSection.getCloseCombatMap();
       var rangeSkillMap = this.skillSection.getRangedCombatMap();
       var closeAttackBonus = this.advantageSection.getRankMap().get('Close Attack');  //these only exist in ruleset 1.x. will be 0 otherwise
       var rangedAttackBonus = this.advantageSection.getRankMap().get('Ranged Attack');

       //if Unarmed is possible then it will be the first row
      if (closeSkillMap.containsKey('Unarmed') || this.abilitySection.getByName('Fighting').getValue() !== '--')
      {
          var strengthValue = this.abilitySection.getByName('Strength').getValue();
         if (strengthValue !== '--')
         {
             //if can deal unarmed damage
             attackBonus = closeAttackBonus;
             if(closeSkillMap.containsKey('Unarmed')) attackBonus+=closeSkillMap.get('Unarmed');
             else attackBonus+=this.abilitySection.getByName('Fighting').getValue();  //Fighting is the default for unarmed
             allOffensiveRows+=this.makeOffenseRow('Unarmed', attackBonus, 'Close', 'Damage', strengthValue);
         }
      }

       var sectionArray = [this.powerSection, this.equipmentSection];
      for (var sectionIndex=0; sectionIndex < sectionArray.length; sectionIndex++)
      {
          var sectionPointer = sectionArray[sectionIndex];
          var damageKeys = sectionPointer.getAttackEffectRanks().getAllKeys();

         for (var i=0; i < damageKeys.length; i++)
         {
             var rowPointer = sectionPointer.getRow(sectionPointer.getAttackEffectRanks().get(damageKeys[i]));
             var range = rowPointer.getRange();
             var skillUsed = rowPointer.getSkillUsed();

             //TODO: probably won't work for Feature
             if(range === 'Close') attackBonus = (closeSkillMap.get(skillUsed) + closeAttackBonus);
             else if(range === 'Ranged') attackBonus = (rangeSkillMap.get(skillUsed) + rangedAttackBonus);
             else attackBonus = '--';  //range === 'Perception' can't miss
             allOffensiveRows+=this.makeOffenseRow(rowPointer.getName(), attackBonus, range, rowPointer.getEffect(), rowPointer.getRank());
         }
      }

       //TODO: doesn't include skills like Swords
       //TODO: (v1.x) if Improvised Weapon advantage then use Unarmed damage
       allOffensiveRows+='</table>';
       document.getElementById('offensive section').innerHTML = allOffensiveRows;
       //offense example: Close, Weaken 4, Crit. 19-20 |or| Perception, Flight 3, Crit. 16-20
   };
   /**Updates the document for transcendence field and might regenerate powers and advantages.*/
   this.updateTranscendence=function()
   {
       document.getElementById('transcendence').value = transcendence;
       if(previousGodHood === this.canUseGodHood()) return;  //same transcendence so don't need to regenerate
       previousGodHood = this.canUseGodHood();
       this.powerSection.update();  //transcendence changed so update these
       this.advantageSection.update();
       //although devices can have godhood powers (if maker is T2+) equipment can't so equipment isn't regenerated
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**This returns the minimum possible power level based on the powerLevel given and the power level limitations.*/
   this.calculatePowerLevelLimitations=function(powerLevel)
   {
       var compareTo;
       //Skills and Abilities
       //TODO: ruleset 1.x has advantages I need to include: Close Attack etc (Improvised Weapon, Ranged Attack, Throwing Mastery), Eidetic Memory, Great Endurance
      for (var i=0; i < Data.Ability.names.length; i++)
      {
          compareTo = this.skillSection.getMaxSkillRanks().get(Data.Ability.names[i]);
          compareTo-=10;
          if(compareTo > powerLevel) powerLevel = compareTo;  //won't replace if compareTo is negative
      }

       //Attack and Effect
       compareTo = powerLevelAttackEffect;  //only the highest 2 were stored for power level
       compareTo/=2;
       if(compareTo > powerLevel) powerLevel = Math.ceil(compareTo);  //round up

       //Effect without Attack (ie Perception range)
       compareTo = powerLevelPerceptionEffect;
       if(compareTo > powerLevel) powerLevel = compareTo;

       //Dodge and Toughness
       compareTo = this.defenseSection.getByName('Dodge').getTotalBonus();
       compareTo+= this.defenseSection.getMaxToughness();
       compareTo/=2;
       if(compareTo > powerLevel) powerLevel = Math.ceil(compareTo);

       //Parry and Toughness
       compareTo = this.defenseSection.getByName('Parry').getTotalBonus();
       compareTo+= this.defenseSection.getMaxToughness();
       compareTo/=2;
       if(compareTo > powerLevel) powerLevel = Math.ceil(compareTo);

       //Fortitude and Will
       compareTo = this.defenseSection.getByName('Fortitude').getTotalBonus();
       compareTo+= this.defenseSection.getByName('Will').getTotalBonus();
       compareTo/=2;
       if(compareTo > powerLevel) powerLevel = Math.ceil(compareTo);

       return powerLevel;
   };
   /**This calculates the grand total based on each section's total and sets the document.*/
   this.calculateTotal=function()
   {
       characterPointsSpent=0;
       document.getElementById('ability total').innerHTML=this.abilitySection.getTotal();
       characterPointsSpent+=this.abilitySection.getTotal();
       document.getElementById('power total').innerHTML=this.powerSection.getTotal();
       characterPointsSpent+=this.powerSection.getTotal();
       document.getElementById('equipment points used').innerHTML=this.equipmentSection.getTotal();
       document.getElementById('equipment points max').innerHTML=this.advantageSection.getEquipmentMaxTotal();
       //the character points spent for equipment points is accounted for in the advantage section
       document.getElementById('advantage total').innerHTML=this.advantageSection.getTotal();
       characterPointsSpent+=this.advantageSection.getTotal();
       document.getElementById('skill total').innerHTML=this.skillSection.getTotal();
       characterPointsSpent+=this.skillSection.getTotal();
       document.getElementById('defense total').innerHTML=this.defenseSection.getTotal();
       characterPointsSpent+=this.defenseSection.getTotal();
       document.getElementById('grand total used').innerHTML=characterPointsSpent;
   };
   /**Given an older json document, this function converts it to the newest document format.*/
   this.convertDocument=function(jsonDoc)
   {
      if (1 === jsonDoc.version)
      {
          var powerSections = [jsonDoc.Powers, jsonDoc.Equipment];
         for (var sectionIndex = 0; sectionIndex < powerSections.length; ++sectionIndex)
         {
            for (var rowIndex = 0; rowIndex < powerSections[sectionIndex].length; ++rowIndex)
            {
                   var thisRow = powerSections[sectionIndex][rowIndex];
                   thisRow.effect = thisRow.name;  //was renamed
                   thisRow.name = undefined;
                   //don't need to default name and skill since they will be auto-defaulted if not populated
            }
         }
          //also some images were renamed like: ../images/TCP Elf 11611.jpg => ../images/Energy-Controller.jpg
          //but I don't care about converting those
          ++jsonDoc.version;
      }
       //if(2 ===) convert it; ++; repeat until it is the most recent version
   };
   /**Given the json, this compares the version and rule set then alerts the user with a message if necessary.*/
   this.determineCompatibilityIssues=function(jsonDoc)
   {
       //the ruleset is for game rules. The version is to inform the user of possible incompatibility
       var version, ruleset;

       version = sanitizeNumber(jsonDoc.version, 1, 1);  //only version 1 doesn't have a version number so that's default
       //user shouldn't mess with the version but users might mess with ruleset

      if (undefined === jsonDoc.ruleset)
      {
          jsonDoc.ruleset = '2.7';  //there's no way to know if the document is for 1.x or 2.x so guess the more common 2.x
             //2.x ruleset is fairly compatible so the most recent is default
             //3.x should always have a ruleset defined but user tampering may cause it to default to 2.x
          Main.messageUser('MainObject.determineCompatibilityIssues.noRuleset', 'The requested document doesn\'t have the version for the game rules defined. It might not load correctly.\n'+
             'Version 2.7 has been assumed, if this is incorrect add ruleset to the root element with value "1.1" (save a blank document for an example but don\'t add "version").');
      }
       jsonDoc.ruleset = jsonDoc.ruleset.split('.');
       //major needs special treatment so only use Number.parseInt
       ruleset = new VersionObject(Number.parseInt(jsonDoc.ruleset[0]), sanitizeNumber(jsonDoc.ruleset[1], 0, 0));

       if(Number.isNaN(ruleset.major)) ruleset = new VersionObject(2, 7);  //see above comments for why 2.7
       else if(ruleset.major < 1) ruleset = new VersionObject(1, 0);

       //inform user as needed:
      if (ruleset.isGreaterThan(latestRuleset))
      {
          Main.messageUser('MainObject.determineCompatibilityIssues.newRuleset', 'The requested document uses game rules newer than what is supported by this code. It might not load correctly.');
          ruleset = latestRuleset.clone();  //default so that things can possibly load
      }
      if (version > latestVersion)
      {
          Main.messageUser('MainObject.determineCompatibilityIssues.newVersion', 'The requested document was saved in a format newer than what is supported by this code. It might not load correctly.');
          version = latestVersion;
      }

       //(re)set these so they can be used later
       jsonDoc.ruleset = ruleset;
       jsonDoc.version = version;
   };
   /**This function loads the document according to the text string given.*/
   this.loadFromString=function(fileString)
   {
       fileString = fileString.trim();
       if(fileString === '') return;  //done

       document.getElementById('code box').value = '';
       var jsonDoc, docType;
       try{
       if(fileString[0] === '<'){docType = 'XML'; jsonDoc = xmlToJson(fileString);}  //if the first character is less than then assume XML
       else{docType = 'JSON'; jsonDoc = JSON.parse(fileString);}  //else assume JSON
       }
       catch(e)
       {
           Main.messageUser('MainObject.loadFromString.parsing', 'A parsing error has occurred. The document you provided is not legal '+docType+'.\n\n'+e);
           //yeah I know the error message is completely unhelpful but there's nothing more I can do
           window.location.hash = '#code box';  //scroll to the code box
           throw e;
       }

       this.determineCompatibilityIssues(jsonDoc);
       if(jsonDoc.version < latestVersion) this.convertDocument(jsonDoc);
       //TODO: if(!this.isValidDocument(jsonDoc)) return;  //checks for the things I assume exist below (Hero etc)

       this.setRuleset(jsonDoc.ruleset.major, jsonDoc.ruleset.minor);
       document.getElementById('ruleset').value = activeRuleset.toString();
       //clear does not change activeRuleset
       this.clear();  //must clear out all other data first so not to have any remain
       document.getElementById('HeroName').value = jsonDoc.Hero.name;
      if (activeRuleset.major > 1)
      {
          transcendence = minimumTranscendence = sanitizeNumber(jsonDoc.Hero.transcendence, -1, 0);
          document.getElementById('transcendence').value = transcendence;
      }
       document.getElementById('imgFilePath').value = jsonDoc.Hero.image;
       this.loadImageFromPath();  //can't set the file chooser for obvious security reasons
       document.getElementById('bio box').value = jsonDoc.Information;
       this.abilitySection.load(jsonDoc.Abilities);  //at the end of each load it updates and generates

       this.powerSection.load(jsonDoc.Powers);
       this.equipmentSection.load(jsonDoc.Equipment);  //equipment can't have godhood

       this.advantageSection.load(jsonDoc.Advantages);
       this.skillSection.load(jsonDoc.Skills);
       this.defenseSection.load(jsonDoc.Defenses);
       if('' !== document.getElementById('code box').value) window.location.hash = '#code box';  //scroll to the code box if there's an error
       else window.scrollTo(0,0);  //jump to top left of page after loading so the user can see the loaded hero
   };
   /**This is a simple generator called by updateOffense to create a row of offense information.*/
   this.makeOffenseRow=function(skillName, attackBonus, range, effect, damage)
   {
       var thisOffensiveRow = '<tr><td class="character-sheet-offense-row">' + skillName + ' ';
       if(attackBonus !== '--' && attackBonus >= 0) thisOffensiveRow+='+';  //add leading plus. checking for '--' is unneeded but more clear
       thisOffensiveRow+=attackBonus+'</td><td class="character-sheet-offense-row">' + range + ', ' + effect + ' ' + damage;

       var minCritNum = (20 - this.advantageSection.getRankMap().get('Improved Critical: '+skillName));
       if(minCritNum < 20) thisOffensiveRow+=', Crit. '+minCritNum+'-20';  //the '-20' is a range through 20

       if(attackBonus === '--' && powerLevelPerceptionEffect < damage) powerLevelPerceptionEffect = damage;
       else if(attackBonus !== '--' && powerLevelAttackEffect < (attackBonus+damage)) powerLevelAttackEffect = (attackBonus+damage);

       thisOffensiveRow+='</td></tr>\n';
       return thisOffensiveRow;
   };
   /**This returns the document's data as a json object*/
   this.save=function()
   {
       var jsonDoc = {Hero: {}, Abilities: {}, Powers: [], Equipment: [], Advantages: [], Skills: [], Defenses: {}};
          //skeleton so I don't need to create these later
       jsonDoc.ruleset = activeRuleset.toString();
       jsonDoc.version = latestVersion;
       jsonDoc.Hero.name = document.getElementById('HeroName').value;
       if(activeRuleset.major > 1) jsonDoc.Hero.transcendence = transcendence;
       jsonDoc.Hero.image = document.getElementById('imgFilePath').value;
       //TODO: use jsonDoc.Hero.image = document.getElementById('characterImage').src;
       jsonDoc.Information = document.getElementById('bio box').value;
       jsonDoc.Abilities = this.abilitySection.save();
       jsonDoc.Powers = this.powerSection.save();
       jsonDoc.Equipment = this.equipmentSection.save();
       jsonDoc.Advantages = this.advantageSection.save();
       jsonDoc.Skills = this.skillSection.save();
       jsonDoc.Defenses = this.defenseSection.save();
       return jsonDoc;
   };
   /**This returns the document's data as a string*/
   this.saveAsString=function()
   {
       var jsonDoc = this.save();
       var fileString;
       if(document.getElementById('saveType').value === 'JSON') fileString = JSON.stringify(jsonDoc);
          //in this case value returns the selected text because the html attribute named value is not defined
       else fileString = jsonToXml(jsonDoc);

       return fileString;
   };
   this.constructor=function()
   {
       Data.change(activeRuleset.major, activeRuleset.minor);  //needed to initialize some data
       this.abilitySection = new AbilityList();
       this.powerSection = new PowerListAgnostic('power');
       //Object.freeze(this.powerSection);  //TODO: what should and shouldn't be frozen? Main and data only (and commons etc?). freeze isn't deep. maybe screw it because tests
       this.equipmentSection = new PowerListAgnostic('equipment');  //give it the section name and the rest is the same
       //TODO: define the naming conventions for html elements.
       //I'm thinking: user input: TitleCase, output: snake_case, else: two words
       //but why not make them all TitleCase? Power row.generate uses 'Main.'+sectionName+'Section' for onchange
       this.advantageSection = new AdvantageList();
       this.skillSection = new SkillList();
       this.defenseSection = new DefenseList();
       this.updateOffense();  //for the default damage
   };
   //constructor:
    this.constructor();
}

/*Map of objects that update others:
everything (except modifier) calls Main.update();  //updates totals and power level
Main.updateOffense(); is called by ability, advantages, power, and skills
ability:
{
    Main.skillSection.calculateValues();
    Main.skillSection.generate();
    Main.updateOffense();
    Main.defenseSection.calculateValues();
}
advantages:
{
    Main.defenseSection.calculateValues();
    Main.updateOffense();
}
power:
{
    modifiers
   if (equipment)
   {
       Main.advantageSection.calculateValues();
       Main.advantageSection.generate();
   }
    Main.updateOffense();
    Main.defenseSection.calculateValues();
}
skill: Main.updateOffense();
*/
/*xml version list:
1: original from rule set 2.5
2: (added version and ruleset) name and skill attributes were added to both powers. old "name" was renamed to "effect"
*/
