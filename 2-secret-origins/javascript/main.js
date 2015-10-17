//include everything else because I'm cool like that
var jsFileNamesUsed = ['tools', 'MapDefault', 'data', 'abilities', 'advantage list', 'advantage row', 'CommonsLibrary',
    'defenses', 'modifier list', 'modifier row', 'power list', 'power row', 'SelectUtil', 'skill list', 'skill row'];
//the first 3 are first because everything depends on data which depends on MapDefault which depends on tools. everything else is alphabetical
jsFileNamesUsed = jsFileNamesUsed.concat(['simple tester', 'test suite', 'Logger']);  //comment this out in production to save memory
    //if I feel like it that is. although test suite is the largest file
for(var i=0; i < jsFileNamesUsed.length; i++){includeJsFile(jsFileNamesUsed[i]);}
function includeJsFile(jsName)
{
    document.write('<script type="text/javascript1.3" src="javascript/'+jsName+'.js"></script>');
    //document write is not a problem since this is ran only once
}

/**Call List onChange
Hero Name: Nothing (only need to look at it when saving or loading)
Transcendence: changeTranscendence()
bio box: nothing: same as hero name
*/
function MainObject()
{
   //private variable section:
    var latestRuleset = 3.0, latestVersion = 2;  //see bottom of this document for a version list
    var characterPointsSpent = 0, transcendence = 0, previousGodHood = false;
    var powerLevelAttackEffect = 0, powerLevelPerceptionEffect = 0;
    var useOldRules = false, mockMessenger;
    //TODO: have Main track ruleset #
    //TODO: have Main track ruleset major and minor

   //Single line function section
    this.canUseGodHood=function(){return (transcendence > 0);};
    this.getTranscendence=function(){return transcendence;};
    this.isOldRules=function(){return useOldRules;};
    /**This sets the code box with the saved text.*/
    this.saveToText=function(){document.getElementById('code box').value = this.save();};
    /**This loads the text text within the code box.*/
    this.loadText=function(){this.loadFromString(document.getElementById('code box').value);};
    /**Set a replacement function that is called in place of the normal user messenger.*/
    this.setMockMessenger=function(mockedFun){mockMessenger = mockedFun;};
    /**Restores the default function for messaging the user*/
    this.clearMockMessenger=function(){mockMessenger = undefined;};

   //Onchange section
   /**Onchange function for changing the transcendence. Sets the document values as needed*/
   this.changeTranscendence=function()
   {
       if(useOldRules){transcendence = 0; return;}
       transcendence = sanitizeNumber(document.getElementById('transcendence').value, -1, 0);
       if((this.powerSection.isUsingGodhoodPowers() || this.advantageSection.hasGodhoodAdvantages()) && transcendence <= 0)
          transcendence = 1;  //must raise the minimum due to currently using god-like powers
       document.getElementById('transcendence').value = transcendence;
       if(previousGodHood === this.canUseGodHood()) return;  //same transcendence so don't need to regenerate
       previousGodHood = this.canUseGodHood();
       this.powerSection.update();  //transcendence changed so update these
       this.advantageSection.update();
       //although devices can have godhood powers (if maker is T2+) equipment can't so equipment isn't regenerated
   };

   //public functions section
   /**Resets all values then updates. Each section is cleared. The code box and file selectors are not touched.*/
   this.clear=function()
   {
       document.getElementById('HeroName').value = 'Hero Name';
       document.getElementById('transcendence').value = transcendence = 0;
       this.abilitySection.clear();
       document.getElementById('imgFilePath').value='';
       this.loadImageFromPath();  //after setting the images to blank this will reset the image
       this.powerSection.clear();
       this.equipmentSection.clear();
       this.advantageSection.clear();
       this.skillSection.clear();
       this.defenseSection.clear();
       document.getElementById('bio box').value = 'Complications, background and other information';
       //do not change old rules and do not change the code box (just in case the user needed that)
       //I also decided not to touch either file chooser so that the user can easily select from same folder again
   };
   /**Loads the file's data*/
   this.loadFile=function()
   {
       var filePath=document.getElementById('fileChooser').files[0];
       var oFReader=new FileReader();  //reference: https://developer.mozilla.org/en-US/docs/DOM/FileReader
       oFReader.readAsText(filePath);
       oFReader.onload=function(oFREvent){Main.loadFromString(oFREvent.target.result);};  //Main has been defined in order to use Main.loadFile() button
   };
   /**Loads the image file*/
   this.loadImageFromFile=function()
   {
       var filePath=document.getElementById('imgFileChooser').files[0];  //there's only ever 1 file
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
       if(useOldRules) return (this.powerSection.getProtectionRankTotal() + this.equipmentSection.getProtectionRankTotal());
       //protection stacks only in old rules
       if(this.powerSection.getProtectionRankTotal() > this.equipmentSection.getProtectionRankTotal()) return this.powerSection.getProtectionRankTotal();
       return this.equipmentSection.getProtectionRankTotal();
   };
   /**This method passes a message to the user in some way (currently uses alert).
   It is abstracted for mocking and so it can easily be changed later.*/
   this.messageUser=function(messsageSent)
   {
       if(mockMessenger !== undefined){mockMessenger(messsageSent); return;}
       alert(messsageSent);
   };
   /**Used to toggle between old and new rules. Will set useOldRules to the opposite of what it currently is.*/
   this.ruleToggle=function()
   {
       if(useOldRules) this.setOldRules(false);
       else this.setOldRules(true);
   };
   /**Onclick event for the saveToFileLink anchor link only.
   It changes the a tag so that the link downloads the document as a saved file.*/
   this.saveToFile=function()
   {
       var link = document.getElementById('saveToFileLink');
      if (document.getElementById('saveType').value === 'JSON')
      {
          link.download = document.getElementById('HeroName').value+'.json';
          link.href = 'data:application/json;charset=utf-8,'+encodeURIComponent(this.save());
      }
      else
      {
          link.download = document.getElementById('HeroName').value+'.xml';
          link.href = 'data:application/xml;charset=utf-8,'+encodeURIComponent(this.save());
      }
       //encodeURIComponent is called to convert end lines
       //there is no way to clear out the link info right after the save as prompt. So just ignore the huge href
       //assigning window.location doesn't work because it just takes you to the page instead of save prompt
       //an iframe form submit might work but this is better
   };
   /**This function handles all changes needed when switching between rules. Main.clear() is called unless no change is needed.*/
   this.setOldRules=function(valueGiven)
   {
       if(useOldRules === valueGiven) return;  //done. don't clear out everything
       useOldRules = valueGiven;

      if (useOldRules)  //switched to old rules
      {
          document.getElementById('rule description td').innerHTML = 'The calculator is currently using the original 3e rules';
          document.getElementById('Transcendence span').style.visibility = 'hidden';  //still takes up space so that the formatting is still good
          document.getElementById('to new rules button').style.display = 'inline';
          document.getElementById('to new rules span').style.display = 'none';
          document.getElementById('to old rules button').style.display = 'none';
          document.getElementById('to old rules span').style.display = 'inline';
      }
      else  //switched to new rules
      {
          document.getElementById('rule description td').innerHTML = 'The calculator is currently using the modified 3e rules';
          document.getElementById('Transcendence span').style.visibility = 'visible';
          document.getElementById('to old rules button').style.display = 'inline';
          document.getElementById('to old rules span').style.display = 'none';
          document.getElementById('to new rules button').style.display = 'none';
          document.getElementById('to new rules span').style.display = 'inline';
      }
       Data.change(useOldRules);
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
      if (!useOldRules)
      {
          if(powerLevel >= 20) transcendence = Math.floor(powerLevel/20);  //gain a transcendence every 20 PL
          else if(transcendence !== -1) transcendence = 0;  //if PL < 20 then set to minimum (which is 0 unless -1 is specified)
          //else: leave it as -1
          document.getElementById('transcendence').value = transcendence;
          this.changeTranscendence();  //to regenerate as needed
      }
   };
   /**Calculates initiative and sets the document.*/
   this.updateInitiative=function()
   {
       var agilityScore = this.abilitySection.getByName('Agility').getZeroedValue();  //used zeroed because even -- agility has initiative
       if(useOldRules) agilityScore+=(this.advantageSection.getRankMap().get('Improved Initiative')*4);
       else agilityScore+=(this.advantageSection.getRankMap().get('Improved Initiative')*2);  //change in effectiveness

       var stringUsed;
       if(agilityScore >= 0) stringUsed='+'+agilityScore;
       else stringUsed=agilityScore;
       if(this.advantageSection.getRankMap().get('Seize Initiative') === 1) stringUsed+=' with Seize Initiative';  //if has Seize Initiative
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
       var closeAttackBonus = this.advantageSection.getRankMap().get('Close Attack');  //only exists in old rules. will be 0 otherwise
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
       //TODO: (old) if Improvised Weapon advantage then use Unarmed damage
       allOffensiveRows+='</table>';
       document.getElementById('offensive section').innerHTML = allOffensiveRows;
       //offense example: Close, Weaken 4, Crit. 19-20 |or| Perception, Flight 3, Crit. 16-20
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**This returns the minimum possible power level based on the powerLevel given and the power level limitations.*/
   this.calculatePowerLevelLimitations=function(powerLevel)
   {
       var compareTo;
       //Skills and Abilities
       //TODO: old rules has advantages I need to include: Close Attack etc (Improvised Weapon, Ranged Attack, Throwing Mastery), Eidetic Memory, Great Endurance
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
       //the ruleset is used to determine if using original rules. The version is to inform the user of possible incompatibility
       var version, ruleset;

       //Number.parseInt(undefined) => NaN
       ruleset = Number.parseInt(jsonDoc.ruleset);  //will ignore everything after the decimal point
       version = Number.parseInt(jsonDoc.version);
       //version will always be an int (user shouldn't mess with that) but users might mess with ruleset

       //typeof version and ruleset can only be number at this point
       if(Number.isNaN(version)) version = 1;  //only version 1 doesn't have a version number so that's default
       if(Number.isNaN(ruleset)) ruleset = 2.7;  //there's no way to know if the document is for 1.x or 2.x so guess the more common 2.x
          //2.x ruleset is fairly compatible so the most recent is default
          //3.x should always have a ruleset defined but user tampering may cause it to default to 2.x

       //set old rules flag accordingly
       if(ruleset < 2) this.setOldRules(true);
       else this.setOldRules(false);

       //inform user as needed:
      if (ruleset > latestRuleset)
      {
          Main.messageUser('The requested document uses game rules newer than what is supported by this code. It might not load correctly.');
          ruleset = latestRuleset;  //default so that things can possibly load
      }
      if (version > latestVersion)
      {
          Main.messageUser('The requested document was saved in a format newer than what is supported by this code. It might not load correctly.');
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

       var jsonDoc, transcendenceMinimum = -1, docType;
       try{
       if(fileString[0] === '<'){docType = 'XML'; jsonDoc = xmlToJson(fileString);}  //if the first character is less than then assume XML
       else{docType = 'JSON'; jsonDoc = JSON.parse(fileString);}  //else assume JSON
       }
       catch(e){Main.messageUser('A parsing error has occured. The document you provided is not legal '+docType+'.\n\n'+e); throw e;}
          //yeah I know the error message is completely unhelpful but there's nothing more I can do

       this.determineCompatibilityIssues(jsonDoc);
       if(jsonDoc.version < latestVersion) this.convertDocument(jsonDoc);
       //TODO: if(this.determineValidity(jsonDoc)) return;  //which will return true if valid. checks for the things I assume exist below (Hero etc)

       //useOldRules has already been set in determineCompatibilityIssues (clear does not change it)
       this.clear();  //must clear out all other data first so not to have any remain
       document.getElementById('HeroName').value = jsonDoc.Hero.name;
      if (jsonDoc.Hero.transcendence !== undefined && !useOldRules)
      {
          transcendenceMinimum = sanitizeNumber(jsonDoc.Hero.transcendence, -1, 0);
      }
       document.getElementById('imgFilePath').value = jsonDoc.Hero.image;
       this.loadImageFromPath();  //can't set the file chooser for obvious security reasons
       document.getElementById('bio box').value = jsonDoc.Information;
       this.abilitySection.load(jsonDoc.Abilities);  //at the end of each load it updates and generates

       if(transcendenceMinimum > transcendence) transcendence = transcendenceMinimum;  //so that godhood powers can be loaded
       this.powerSection.load(jsonDoc.Powers);
       this.equipmentSection.load(jsonDoc.Equipment);  //equipment can't have godhood

       if(transcendenceMinimum > transcendence) transcendence = transcendenceMinimum;  //so that godhood advantages can be loaded
       this.advantageSection.load(jsonDoc.Advantages);
       this.skillSection.load(jsonDoc.Skills);
       this.defenseSection.load(jsonDoc.Defenses);
       window.scrollTo(0,0);  //jump to top left of page after loading so the user can see the loaded hero
   };
   /**This is a simple generator called by updateOffense to create a row of offense information.*/
   this.makeOffenseRow=function(skillName, attackBonus, range, effect, damage)
   {
       var thisOffensiveRow = '<tr><td class="character-sheet-offense-row">' + skillName + ' ';
       if(attackBonus !== '--' && attackBonus >= 0) thisOffensiveRow+='+';  //add leading plus. checking for '--' is unneeded but more clear
       thisOffensiveRow+=attackBonus+'</td><td class="character-sheet-offense-row">' + range + ', ' + effect + ', ' + damage;

       var minCritNum = (20 - this.advantageSection.getRankMap().get('Improved Critical: '+skillName));
       if(minCritNum < 20) thisOffensiveRow+=', Crit. '+minCritNum+'-20';  //the '-20' is a range through 20

       if(attackBonus === '--' && powerLevelPerceptionEffect < damage) powerLevelPerceptionEffect = damage;
       else if(attackBonus !== '--' && powerLevelAttackEffect < (attackBonus+damage)) powerLevelAttackEffect = (attackBonus+damage);

       thisOffensiveRow+='</td></tr>\n';
       return thisOffensiveRow;
   };
   /**This returns the document's data as a string*/
   this.save=function()
   {
       var jsonDoc = {Hero: {}, Abilities: {}, Powers: [], Equipment: [], Advantages: [], Skills: [], Defenses: {}};
          //skeleton so I don't need to create these later
       if(useOldRules) jsonDoc.ruleset = 1;
       else jsonDoc.ruleset = latestRuleset;
       jsonDoc.version = latestVersion;
       jsonDoc.Hero.name = document.getElementById('HeroName').value;
       if(!useOldRules) jsonDoc.Hero.transcendence = transcendence;
       jsonDoc.Hero.image = document.getElementById('imgFilePath').value;
       jsonDoc.Information = document.getElementById('bio box').value;
       jsonDoc.Abilities = this.abilitySection.save();
       jsonDoc.Powers = this.powerSection.save();
       jsonDoc.Equipment = this.equipmentSection.save();
       jsonDoc.Advantages = this.advantageSection.save();
       jsonDoc.Skills = this.skillSection.save();
       jsonDoc.Defenses = this.defenseSection.save();

       var fileString;
       if(document.getElementById('saveType').value === 'JSON') fileString = JSON.stringify(jsonDoc);
          //in this case value returns the selected text because the html attribute named value is not defined
       else fileString = jsonToXml(jsonDoc);

       return fileString;
   };
   this.constructor=function()
   {
       Data.change(useOldRules);  //needed to initialize some data
       this.abilitySection = new AbilityList();
       this.powerSection = new PowerListAgnostic('power');
       //Object.freeze(this.powerSection);  //TODO: what should and shouldn't be frozen? Main and data only (and commons etc?). freeze isn't deep. maybe screw it because tests
       this.equipmentSection = new PowerListAgnostic('equipment');  //give it the section name and the rest is the same
       this.advantageSection = new AdvantageList();
       this.skillSection = new SkillList();
       this.defenseSection = new DefenseList();
       this.updateOffense();  //for the default damage
   };
   //constructor:
    this.constructor();
}

/*xml version list:
1: original from rule set 2.5
2: (added version and ruleset) name and skill attributes were added to both powers. old "name" was renamed to "effect"
*/
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
