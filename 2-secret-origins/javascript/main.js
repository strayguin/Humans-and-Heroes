//include everything else because I'm cool like that
document.write("<script src=\"javascript/abilities.js\"></script>");
document.write("<script src=\"javascript/advantages.js\"></script>");
document.write("<script src=\"javascript/defenses.js\"></script>");
document.write("<script src=\"javascript/powers.js\"></script>");
document.write("<script src=\"javascript/modifiers.js\"></script>");
document.write("<script src=\"javascript/skills.js\"></script>");
document.write("<script src=\"javascript/autotest.js\"></script>");
//it could be done using innerHTML but since this is ran once I won't bother

function AbilityList(){};
function AdvantageList(){};  //C++ equivilent prototypes so that I can link to main.js before any of the others
function DefenseList(){};
function PowerListAgnostic(){};
function ModifierListAgnostic(){};
function SkillList(){};

/*Call List onChange
Hero Name: Nothing (only need to look at it when saving or loading)
Transcendence: changeTranscendence()
bio box: nothing like hero name
*/
function MainObject(){
   //public:
    this.useOldRules=false;
    this.godHoodSwitch=false;
    this.abilitySection = new AbilityList();
    this.advantageSection = new AdvantageList();
    this.skillSection = new SkillList();
    this.defenseSection = new DefenseList();
    this.equipmentSection = new PowerListAgnostic("equipment");  //give it the section name and the rest is the same
    this.powerSection = new PowerListAgnostic("power");
   //private:
    var characterPointsSpent=0;
    var offenseRowParts=["<tr><td style='width:50%;padding:5px;text-align:center'>", "</td><td style='width:50%;padding:5px;text-align:center'>", "</td></tr>"];
   this.postCreation = function(){
       var element = document.getElementById("powerChoices0");
       var outputString="";
      for (var i=1; i < element.options.length; i++)
      {
          outputString+="\""+element.options[i].text+"\", ";
      }
       document.getElementById("xml box").value=outputString;
   };
   this.ruleToggle = function(){
      if (!this.useOldRules)  //switch to old rules
      {
          this.useOldRules=true;
          document.getElementById("rule span").innerHTML="The calculator is currently using the original 3e rules: ";
          document.getElementById("rule button").value="Change to Modified 3e Rules";
          document.getElementById("Transcendence span").style.visibility="hidden";  //still takes up space so that the formatting is still good
      }
      else  //switch to new rules
      {
          this.useOldRules=false;
          document.getElementById("rule span").innerHTML="The calculator is currently using the modified 3e rules: ";
          document.getElementById("rule button").value="Change to Original 3e Rules";
          document.getElementById("Transcendence span").style.visibility="visible";
      }
       //update:
       this.powerSection.changeRules();
       this.equipmentSection.changeRules();
       this.advantageSection.changeRules();
       this.skillSection.changeRules();
       this.defenseSection.changeRules();
       this.clear();  //clear after so it will generate
   };
   this.changeTranscendence = function(){
       var transcendence=sanitizeNumber(document.getElementById("transcendence").value, -1, 0);
       if((this.powerSection.usingGodhoodPowers || this.advantageSection.usingGodhoodAdvantages) && transcendence <= 0) transcendence=1;  //higher minimum due to currently using god-like powers
       document.getElementById("transcendence").value=transcendence;
       var previousGodHood=this.godHoodSwitch;
       this.godHoodSwitch=(transcendence > 0);
       //if(this.powerSection.usingGodhoodPowers || this.advantageSection.usingGodhoodAdvantages) return;  //don't need to regenerate since you already have the godlikes
          //don't need this if since the next covers it anyway
       if(previousGodHood == this.godHoodSwitch) return;  //same transcendence
       this.powerSection.generate();  //transcendence changed so update these
       this.advantageSection.generate();
       //although devices can have godhood powers (if maker is T2+) equipment can't
   };
   this.clear = function(){
       this.abilitySection.clear();
       this.powerSection.clear();
       this.equipmentSection.clear();
       this.advantageSection.clear();
       this.skillSection.clear();
       this.defenseSection.clear();
       document.getElementById("HeroName").value="Hero Name";
       this.godHoodSwitch=false;
       document.getElementById("transcendence").value=0;
       document.getElementById("imgFileChooser").value="";
       document.getElementById("imgFilePath").value="";
       this.loadImage();  //after seting the images to blank this will reset the image
       document.getElementById("bio box").value="Complications, background and other information";
   };
   this.calculateValues = function(){
       characterPointsSpent=this.abilitySection.total+this.powerSection.total+this.advantageSection.total+this.skillSection.total+this.defenseSection.total;
       document.getElementById("ability total").innerHTML=this.abilitySection.total;
       document.getElementById("power total").innerHTML=this.powerSection.total;
       document.getElementById("equipment points used").innerHTML=this.equipmentSection.total;
       document.getElementById("equipment points max").innerHTML=this.equipmentSection.totalMax;
       document.getElementById("advantage total").innerHTML=this.advantageSection.total;
       document.getElementById("skill total").innerHTML=this.skillSection.total;
       document.getElementById("defense total").innerHTML=this.defenseSection.total;
       document.getElementById("grand total used").innerHTML=characterPointsSpent;
   };
   this.update = function(){
       this.calculateValues();
       var powerLevel=0;
       var compareTo=0;

       //start by looking at character points
       powerLevel=Math.ceil(characterPointsSpent/15);  //can't be negative and if 0 it is the same

      if (this.advantageSection.pettyRulesApply)  //since you are no longer limited by power level limitations that changes the minimum possible power level
      {
          //skills and abilities
         for (var i=0; i < 8; i++)
         {
             if(this.skillSection.maxSkillRanks[i] <= 10) continue;  //power level 0
             compareTo=this.skillSection.maxSkillRanks[i]-10;
             if(compareTo > powerLevel) powerLevel=compareTo;  //won't replace if compareTo is negative
         }

          //if(maxAttackEffect > powerLevel) powerLevel=maxAttackEffect;  //somehow loop through and get most damaging
          compareTo=this.abilitySection.get("Strength");
          //compareTo=this.powerSection.attackEffectRanks.get("Unarmed");  //not ready yet
         if (compareTo != "--")
         {
             compareTo+=this.skillSection.closeCombatHash.get("Unarmed");  //could be 0
             compareTo/=2;
             if(compareTo > powerLevel) powerLevel=compareTo;
             //default damage (unarmed) is the only one I can check right now (because I don't know the attack of the others)
         }

          //dodge and toughness
          compareTo=this.defenseSection.getToughness();
          compareTo+=parseInt(document.getElementById("Dodge final").innerHTML);
          compareTo/=2;
          if(compareTo > powerLevel) powerLevel=compareTo;

          //parry and toughness
          compareTo=this.defenseSection.getToughness();
          compareTo+=parseInt(document.getElementById("Parry final").innerHTML);
          compareTo/=2;
          if(compareTo > powerLevel) powerLevel=compareTo;

          //fortitude and will
          compareTo=parseInt(document.getElementById("Fortitude final").innerHTML);
          compareTo+=parseInt(document.getElementById("Will final").innerHTML);
          compareTo/=2;
          if(compareTo > powerLevel) powerLevel=compareTo;

          powerLevel=Math.ceil(powerLevel);  //round up. can only get halves from defeneses and damage
      }
       document.getElementById("power level").innerHTML=powerLevel;
       var transcendence=parseInt(document.getElementById("transcendence").value);
       if(powerLevel >= 20) transcendence=Math.floor(powerLevel/20);
       else if(transcendence != -1) transcendence=0;
       //else: leave it as -1
       document.getElementById("grand total max").innerHTML=(powerLevel*15);
       document.getElementById("transcendence").value=transcendence;
       this.changeTranscendence();  //to set godHoodSwitch, validate, and regenerate
   };
   this.save = function(){
       var fileString="<?xml version=\"1.0\"?>\n\n<Document>\n";
       fileString+="    <Hero name=\""+document.getElementById("HeroName").value+"\" transcendence=\""+document.getElementById("transcendence").value+"\" image=\""+document.getElementById("imgFilePath").value+"\" />\n";
       fileString+="    <Information>"+document.getElementById("bio box").value+"</Information>\n";
       fileString+=this.abilitySection.save()+"   ";
       fileString+=this.powerSection.save();
       fileString+="   "+this.equipmentSection.save();
       fileString+="   "+this.advantageSection.save();
       fileString+="   "+this.skillSection.save();
       fileString+=this.defenseSection.save()+"</Document>\n";
       document.getElementById("xml box").value=fileString;
   };
   this.loadImage = function(){  //https://developer.mozilla.org/en-US/docs/DOM/FileReader
      if (document.getElementById("imgFileChooser").files.length==0)
      {
          if(document.getElementById("imgFilePath").value=="") document.getElementById("imgFilePath").value="../images/SiroccoLoRese461.jpg";
          document.getElementById("placeImage").src=document.getElementById("imgFilePath").value;
          return;
      }
       var filePath=document.getElementById("imgFileChooser").files[0];
       var oFReader = new FileReader();
       oFReader.readAsDataURL(filePath);
       oFReader.onload = function(oFREvent){document.getElementById("placeImage").src=oFREvent.target.result;};
   };
   this.load = function(){
       if(document.getElementById("xmlFileChooser").files.length==0){this.readXMLAsThis(document.getElementById("xml box").value); return;}
       var filePath=document.getElementById("xmlFileChooser").files[0];
       var oFReader = new FileReader();
       oFReader.readAsText(filePath);
       oFReader.onload = function(oFREvent){Main.readXMLAsThis(oFREvent.target.result);};  //Main has been defined in order to use Main.load() button
   };
   this.readXMLAsThis = function(text){
       if(text=="") return;
       var xmlDoc = new DOMParser().parseFromString(text, "text/xml");
       this.clear();  //must clear out all other data first so not to have any remain
       document.getElementById("HeroName").value=xmlDoc.getElementsByTagName("Hero")[0].getAttribute("name");
       document.getElementById("transcendence").value=xmlDoc.getElementsByTagName("Hero")[0].getAttribute("transcendence");
       this.changeTranscendence();
       document.getElementById("imgFilePath").value=xmlDoc.getElementsByTagName("Hero")[0].getAttribute("image");
       this.loadImage();
       document.getElementById("bio box").value=xmlDoc.getElementsByTagName("Information")[0].childNodes[0].nodeValue;
       this.abilitySection.load(xmlDoc);  //at the end of each load it updates and generates
       this.powerSection.load(xmlDoc.getElementsByTagName("Powers")[0].getElementsByTagName("Row"));
       this.equipmentSection.load(xmlDoc.getElementsByTagName("Equipment")[0].getElementsByTagName("Row"));
       this.advantageSection.load(xmlDoc.getElementsByTagName("Advantages")[0].getElementsByTagName("Row"));
       this.skillSection.load(xmlDoc.getElementsByTagName("Skills")[0].getElementsByTagName("Row"));
       this.defenseSection.load(xmlDoc);
   };
   this.updateOffense = function(){
       var agilityScore=this.abilitySection.getZero("Agility");  //used getzero because even -- agility has initiative
       if(this.useOldRules) agilityScore+=(this.advantageSection.rankHash.get("Improved Initiative")*4);  //it holds ranks
       else agilityScore+=(this.advantageSection.rankHash.get("Improved Initiative")*2);  //change in effectiveness
       var stringUsed="";
       if(agilityScore < 0) stringUsed=agilityScore;
       else stringUsed="+"+agilityScore;
       if(this.advantageSection.rankHash.get("Seize Initiative")) stringUsed+=" with Seize Initiative";  //this is the only hash element that stores true/false
       document.getElementById("initiative").innerHTML=stringUsed;

       var allOffensiveRows="<table width='100%'>";
       var offensiveArray=this.skillSection.closeCombatHash.getAllKeys();
       var allDamageHash=this.getAllAtacks();
       var allAttackBonus=this.advantageSection.rankHash.get("Close Attack");  //could be 0 (can only be non-zero if useOldRules)
       var i=offensiveArray.indexOf("Unarmed");  //first row will be Unarmed
       if(i == -1) i=0;  //only possible to not have it if fighting is --
      for (; i < offensiveArray.length; i++)  //length is 0 if there is no unarmed or anything else so that i == length and skip the loop
      {
          //can't deal unarmed damage. remove from array then set i so that it will become 0 to do the rest in order
          if(offensiveArray[i]=="Unarmed" && this.abilitySection.get("Strength")=="--"){offensiveArray.splice(i, 1); i=-1; continue;}  
          allOffensiveRows+=offenseRowParts[0]+offensiveArray[i]+" ";
         /*if (offensiveArray[i]=="Improvised Weapon")
         {
             if((this.skillSection.closeCombatHash.get("Unarmed")+allAttackBonus) < 0) allOffensiveRows+=(this.skillSection.closeCombatHash.get("Unarmed")+allAttackBonus);
             else allOffensiveRows+="+"+(this.skillSection.closeCombatHash.get("Unarmed")+allAttackBonus);
         }
         else
         {*/
             if((this.skillSection.closeCombatHash.get(offensiveArray[i])+allAttackBonus) < 0) allOffensiveRows+=(this.skillSection.closeCombatHash.get(offensiveArray[i])+allAttackBonus);
             else allOffensiveRows+="+"+(this.skillSection.closeCombatHash.get(offensiveArray[i])+allAttackBonus);
         //}
          allOffensiveRows+=offenseRowParts[1]+"Close, Damage ";
          if(offensiveArray[i]=="Unarmed") allOffensiveRows+=this.abilitySection.get("Strength");
          //else if(offensiveArray[i]=="Improvised Weapon") allOffensiveRows+=" "+(this.abilitySection.get("Strength")+this.advantageSection.rankHash.get("Improvised Weapon"));
          //else if(offensiveArray[i]=="Throw") allOffensiveRows+=" "+(allDamageHash.get("Throw")+this.advantageSection.rankHash.get("Throwing Mastery"));
          //else allOffensiveRows+=" "+allDamageHash.get(offensiveArray[i]);
          else allOffensiveRows+=" Not Found";
          if(this.advantageSection.rankHash.get("Improved Critical: "+offensiveArray[i]) > 0)
             allOffensiveRows+=", Crit. "+(20-this.advantageSection.rankHash.get("Improved Critical: "+offensiveArray[i]))+"-20";  //the 20- is to convert the rank into minimum roll needed
          allOffensiveRows+=offenseRowParts[2];
          if(offensiveArray[i]=="Unarmed"){offensiveArray.splice(i, 1); i=-1;}  //remove from array then set i so that it will become 0 to do the rest in order
      }
       offensiveArray=this.skillSection.rangedCombatHash.getAllKeys();
       allAttackBonus=this.advantageSection.rankHash.get("Ranged Attack");
      for (i=0; i < offensiveArray.length; i++)
      {
          allOffensiveRows+=offenseRowParts[0]+offensiveArray[i]+" ";
          if((this.skillSection.rangedCombatHash.get(offensiveArray[i])+allAttackBonus) < 0) allOffensiveRows+=(this.skillSection.rangedCombatHash.get(offensiveArray[i])+allAttackBonus);
          else allOffensiveRows+="+"+(this.skillSection.rangedCombatHash.get(offensiveArray[i])+allAttackBonus);
          //allOffensiveRows+=offenseRowParts[1]+"Ranged, Damage "+allDamageHash.get(offensiveArray[i]);
          allOffensiveRows+=offenseRowParts[1]+"Ranged, Damage Not Found";
          if(this.advantageSection.rankHash.get("Improved Critical: "+offensiveArray[i]) > 0)
             allOffensiveRows+=", Crit. "+(20-this.advantageSection.rankHash.get("Improved Critical: "+offensiveArray[i]))+"-20";  //the "-20" is a range through 20
          allOffensiveRows+=offenseRowParts[2];
      }
       document.getElementById("offensive span").innerHTML=allOffensiveRows+"</table>";
       //offense example: Close, Weaken 4, Crit. 19-20 |or| Perception, Flight 3, Crit. 16-20
   };
   this.getProtectionTotal = function(){  //protection doesn't stack
       if(this.powerSection.protectionRankTotal > this.equipmentSection.protectionRankTotal) return this.powerSection.protectionRankTotal;
       return this.equipmentSection.protectionRankTotal;
   };
   this.getAllAtacks = function(){
       var totalAttacks = new Hash({}, 0);
       var theseKeys=this.powerSection.attackEffectRanks.getAllKeys();
       for(var i=0; i < theseKeys.length; i++){totalAttacks.add(theseKeys[i], this.powerSection.attackEffectRanks.get(theseKeys[i]));}
       theseKeys=this.equipmentSection.attackEffectRanks.getAllKeys();
       for(var i=0; i < theseKeys.length; i++){totalAttacks.add(theseKeys[i], this.equipmentSection.attackEffectRanks.get(theseKeys[i]));}
      return totalAttacks;
   };
   //constructor:
    this.updateOffense();  //for the default damage
};
