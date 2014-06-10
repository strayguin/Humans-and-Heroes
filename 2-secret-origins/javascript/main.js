//include everything else because I'm cool like that
var jsFileNamesUsed=['tools', 'data', 'abilities', 'advantage list', 'advantage row', 'autotest', 'defenses', 'modifier list', 'modifier row', 'power list', 'power row', 'skill list', 'skill row'];
//tools must be first because many depend on it. followed by data
for(var i=0; i < jsFileNamesUsed.length; i++)
    {document.write('<script type="text/javascript1.3" src="javascript/'+jsFileNamesUsed[i]+'.js"></script>');}
//it could be done using innerHTML instead of document write but since this is ran only once I won't bother

/**Call List onChange
Hero Name: Nothing (only need to look at it when saving or loading)
Transcendence: changeTranscendence()
bio box: nothing: same as hero name
*/
function MainObject()
{
   //private variable section:
    var defaultRuleSet = 3, defaultVersion = 2;  //see bottom of this document for a version list
    var characterPointsSpent=0, transcendence=0;
    var powerLevelAttackEffect=0, powerLevelPerceptionEffect=0;
    var useOldRules=false;

   //Single line function section
    this.canUseGodHood=function(){return (transcendence > 0);};
    this.getTranscendence=function(){return transcendence;};
    this.isOldRules=function(){return useOldRules;};
    /**This sets the xml box with the saved xml text.*/
    this.saveToText=function(){document.getElementById('xml box').value = this.save();};
    /**This loads the xml text text within the xml box.*/
    this.loadText=function(){this.loadFromXmlString(document.getElementById('xml box').value);};

   //Onchange section
   /**Onchange function for changing the transcendence. Sets the document values as needed*/
   this.changeTranscendence=function()
   {
       var previousGodHood=this.canUseGodHood();
       transcendence=sanitizeNumber(document.getElementById('transcendence').value, -1, 0);
       if((this.powerSection.isUsingGodhoodPowers() || this.advantageSection.hasGodhoodAdvantages()) && transcendence <= 0) transcendence=1;
          //must raise the minimum due to currently using god-like powers
       document.getElementById('transcendence').value = transcendence;
       if(previousGodHood === this.canUseGodHood()) return;  //same transcendence so don't need to regenerate
       this.powerSection.generate();  //transcendence changed so update these
       this.advantageSection.generate();
       //although devices can have godhood powers (if maker is T2+) equipment can't so equipment isn't regenerated
   };

   //public functions section
   /**Resets all values then updates. Each section is cleared. The xml box and file selectors are not touched.*/
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
       //do not change old rules and do not change the xml box (just in case the user needed that)
       //I also decided not to touch either file chooser so that the user can easily select from same folder again
   };
   /**Loads the xml file's data*/
   this.loadFile=function()
   {
       var filePath=document.getElementById('xmlFileChooser').files[0];
       var oFReader=new FileReader();  //reference: https://developer.mozilla.org/en-US/docs/DOM/FileReader
       oFReader.readAsText(filePath);
       oFReader.onload=function(oFREvent){Main.loadFromXmlString(oFREvent.target.result);};  //Main has been defined in order to use Main.loadFile() button
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
          document.getElementById('imgFilePath').value = '../images/SiroccoLoRese461.jpg';
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
   /**Used to toggle between old and new rules. Will set useOldRules to the opposite of what it currently is.*/
   this.ruleToggle=function()
   {
       if(useOldRules) this.setOldRules(false);
       else this.setOldRules(true);
   };
   /**Onclick event for the saveToFileLink anchor link only.
   It changes the a tag so that the link downloads the document as a saved xml file.*/
   this.saveToFile=function()
   {
       var link = document.getElementById('saveToFileLink');
       link.download = document.getElementById('HeroName').value+'.xml';
       link.href = 'data:application/xml;charset=utf-8,'+encodeURIComponent(this.save());
       //encodeURIComponent is called to convert endlines
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
          document.getElementById('rule span').innerHTML = 'The calculator is currently using the original 3e rules: ';
          document.getElementById('rule button').value = 'Change to Modified 3e Rules';
          document.getElementById('Transcendence span').style.visibility = 'hidden';  //still takes up space so that the formatting is still good
      }
      else  //switched to new rules
      {
          document.getElementById('rule span').innerHTML = 'The calculator is currently using the modified 3e rules: ';
          document.getElementById('rule button').value = 'Change to Original 3e Rules';
          document.getElementById('Transcendence span').style.visibility = 'visible';
      }
       changeData();
       this.clear();  //needed to regenerate abilities etc
       this.defenseSection=new DefenseList();  //needs to be recreated
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
       if(powerLevel >= 20) transcendence = Math.floor(powerLevel/20);  //gain a transcendence every 20 PL
       else if(transcendence !== -1) transcendence = 0;  //if PL < 20 then set to minimum (which is 0 unless -1 is specified)
       //else: leave it as -1
       document.getElementById('grand total max').innerHTML = (powerLevel*15);
       document.getElementById('transcendence').value = transcendence;
       this.changeTranscendence();  //to regenerate as needed
   };
   /**Calculates initiative and sets the document.*/
   this.updateInitiative=function()
   {
       var agilityScore = this.abilitySection.getByName('Agility').getZeroedValue();  //used zeroed because even -- agility has initiative
       if(useOldRules) agilityScore+=(this.advantageSection.getRankHash().get('Improved Initiative')*4);
       else agilityScore+=(this.advantageSection.getRankHash().get('Improved Initiative')*2);  //change in effectiveness

       var stringUsed;
       if(agilityScore >= 0) stringUsed='+'+agilityScore;
       else stringUsed=agilityScore;
       if(this.advantageSection.getRankHash().get('Seize Initiative') === 1) stringUsed+=' with Seize Initiative';  //if has Seize Initiative
       document.getElementById('initiative').innerHTML = stringUsed;
   };
   /**Calculates and creates the offense section of the document.*/
   this.updateOffense=function()
   {
       powerLevelAttackEffect=0, powerLevelPerceptionEffect=0;
       var allOffensiveRows='<table width="100%">';
       var closeSkillHash = this.skillSection.getCloseCombatHash();
       var rangeSkillHash = this.skillSection.getRangedCombatHash();
       var closeAttackBonus = this.advantageSection.getRankHash().get('Close Attack');  //only exists in old rules. will be 0 otherwise
       var rangedAttackBonus = this.advantageSection.getRankHash().get('Ranged Attack');

       //if Unarmed exists it will be the first row
      if (closeSkillHash.getAllKeys().contains('Unarmed'))
      {
          //can only be -1 if fighting is --
          var strengthValue = this.abilitySection.getByName('Strength').getValue();
         if (strengthValue !== '--')
         {
             //if can deal unarmed damage
             var attackBonus = (closeSkillHash.get('Unarmed') + closeAttackBonus);
             allOffensiveRows+=this.makeOffenseRow('Unarmed', attackBonus, 'Close', 'Damage', strengthValue);
         }
          closeSkillHash.remove('Unarmed');
          //remove unarmed from hash so it doesn't appear twice
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
             var attackBonus;

             //TODO: probably won't work for Feature
             if(range === 'Close') attackBonus = (closeSkillHash.get(skillUsed) + closeAttackBonus);
             else if(range === 'Ranged') attackBonus = (rangeSkillHash.get(skillUsed) + rangedAttackBonus);
             else attackBonus = '--';  //range === 'Perception' can't miss
             allOffensiveRows+=this.makeOffenseRow(rowPointer.getName(), attackBonus, range, rowPointer.getEffect(), rowPointer.getRank());
         }
      }

       //TODO: doesn't include skills like Swords
       //TODO: (old) if Improvised Weapon advantage then use Unarmed damage
       allOffensiveRows+='</table>';
       document.getElementById('offensive span').innerHTML = allOffensiveRows;
       //offense example: Close, Weaken 4, Crit. 19-20 |or| Perception, Flight 3, Crit. 16-20
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**This returns the minimum possible power level based on the powerLevel given and the power level limitations.*/
   this.calculatePowerLevelLimitations=function(powerLevel)
   {
       var compareTo;
       //Skills and Abilities
       //TODO: old rules has advantages I need to include: Close Attack etc (Improvised Weapon, Ranged Attack, Throwing Mastery), Eidetic Memory, Great Endurance
      for (var i=0; i < AbilityData.names.length; i++)
      {
          compareTo = this.skillSection.getMaxSkillRanks().get(AbilityData.names[i]);
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
   /**Given the xml document, this compares the version and rule set then alerts the user a message if necessary.*/
   this.determineCompatibilityIssues=function(xmlDoc)
   {
       //the ruleset is used to determine if using original rules. The version is to inform the user of possible incompatibility
       var version = 1;  //only version 1 doesn't have a version number so that's default
       var ruleset = defaultRuleSet;  //ruleset is fairly compatible so the most recent is default

       if(xmlDoc.getElementsByTagName('Document')[0].hasAttribute('ruleset')) ruleset = parseInt(xmlDoc.getElementsByTagName('Document')[0].getAttribute('ruleset'));
       if(xmlDoc.getElementsByTagName('Document')[0].hasAttribute('version')) version = parseInt(xmlDoc.getElementsByTagName('Document')[0].getAttribute('version'));
       //used parseInt in case someone writes in ruleset='3.0' etc. version will always be an int (user shouldn't mess with that)

       //set old rules flag accordingly
       if(ruleset === 1) this.setOldRules(true);
       else this.setOldRules(false);

       //inform user as needed:
       if(ruleset === 1 && version < defaultVersion) alert('The document uses original rules but is saved in an old format. It might not load correctly.');
       else if(ruleset === 1 && version > defaultVersion) alert('The document uses original rules but is saved in a format more recent than this code. It might not load correctly.');
       else if(ruleset < defaultRuleSet || version < defaultVersion) alert('The document is old and no longer supported. It might not load correctly.');
       else if(ruleset > defaultRuleSet || version > defaultVersion) alert('The document is more recent than this code. It might not load correctly.');
   };
   /**This function loads the document according to the xml text string given.*/
   this.loadFromXmlString=function(xmlString)
   {
       if(xmlString.trim() === '') return;  //done
       var xmlDoc=new DOMParser().parseFromString(xmlString, 'text/xml');  //reference: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
       this.determineCompatibilityIssues(xmlDoc);

       //useOldRules has already been set
       this.clear();  //must clear out all other data first so not to have any remain
       document.getElementById('HeroName').value = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('name');
       document.getElementById('transcendence').value = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('transcendence');
       this.changeTranscendence();  //transcendence will be set here
       document.getElementById('imgFilePath').value = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('image');
       this.loadImageFromPath();  //can't set the file chooser for obvious security reasons
       document.getElementById('bio box').value = xmlDoc.getElementsByTagName('Information')[0].childNodes[0].nodeValue;
       this.abilitySection.load(xmlDoc);  //at the end of each load it updates and generates
       this.powerSection.load(xmlDoc.getElementsByTagName('Powers')[0].getElementsByTagName('Row'));
       this.equipmentSection.load(xmlDoc.getElementsByTagName('Equipment')[0].getElementsByTagName('Row'));
       this.advantageSection.load(xmlDoc.getElementsByTagName('Advantages')[0].getElementsByTagName('Row'));
       this.skillSection.load(xmlDoc.getElementsByTagName('Skills')[0].getElementsByTagName('Row'));
       this.defenseSection.load(xmlDoc);
       window.scrollTo(0,0);  //jump to top left of page after loading so the user can see the loaded hero
   };
   /**This is a simple generator called by updateOffense to create a row of offense information.*/
   this.makeOffenseRow=function(skillName, attackBonus, range, effect, damage)
   {
       var thisOffensiveRow = '<tr><td style="width:50%;padding:5px;text-align:center">' + skillName + ' ';
       if(attackBonus !== '--' && attackBonus >= 0) thisOffensiveRow+='+';  //add leading plus. checking for '--' is unneeded but more clear
       thisOffensiveRow+=attackBonus+'</td><td style="width:50%;padding:5px;text-align:center">' + range + ', ' + effect + ', ' + damage;

       var minCritNum = (20 - this.advantageSection.getRankHash().get('Improved Critical: '+skillName));
       if(minCritNum < 20) thisOffensiveRow+=', Crit. '+minCritNum+'-20';  //the '-20' is a range through 20

       if(attackBonus === '--' && powerLevelPerceptionEffect < damage) powerLevelPerceptionEffect = damage;
       else if(attackBonus !== '--' && powerLevelAttackEffect < (attackBonus+damage)) powerLevelAttackEffect = (attackBonus+damage);

       thisOffensiveRow+='</td></tr>\n';
       return thisOffensiveRow;
   };
   /**This returns the documents data as an xml string*/
   this.save=function()
   {
       var fileString='<?xml version="1.0" encoding="UTF-8"?>\n\n<Document ruleset="';
       if(useOldRules) fileString+='1';
       else fileString+=defaultRuleSet;
       fileString+='" version="'+defaultVersion+'">\n';
       fileString+='    <Hero name="'+document.getElementById('HeroName').value+'" transcendence="'+transcendence+'" image="'+document.getElementById('imgFilePath').value+'" />\n';
       fileString+='    <Information>'+document.getElementById('bio box').value+'</Information>\n';
       fileString+=this.abilitySection.save();  //provides spacing because it is never empty
       fileString+='   '+this.powerSection.save();
       fileString+='   '+this.equipmentSection.save();
       fileString+='   '+this.advantageSection.save();
       fileString+='   '+this.skillSection.save();
       fileString+=this.defenseSection.save();  //also never empty
       fileString+='</Document>\n';
       return fileString;
   };
   this.constructor=function()
   {
       changeData();  //needed to initialize some data
       this.abilitySection=new AbilityList();
       this.powerSection=new PowerListAgnostic('power');
       this.equipmentSection=new PowerListAgnostic('equipment');  //give it the section name and the rest is the same
       this.advantageSection=new AdvantageList();
       this.skillSection=new SkillList();
       this.defenseSection=new DefenseList();
       this.updateOffense();  //for the default damage
   };
   //constructor:
    this.constructor();
};

/*xml version list:
1: original from rule set 2.5
2: (added version and ruleset) name and skill attributes were added to both powers
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
