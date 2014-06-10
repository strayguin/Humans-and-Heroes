/*Call List onChange
Select Skill: select(rowIndex);
Text: changeText(rowIndex);
Rank: changeRank(rowIndex);
Select Ability: selectAbility(rowIndex);  //needs to be saved for generating reasons
*/
function SkillList(){
   //static:
    SkillList.allSkillNames=["Acrobatics", "Athletics", "Close Combat", "Common Knowledge", "Deception", "Expertise", "Insight", "Intimidation", "Investigation", "Knowledge", "Memory", "Perception", "Persuasion", "Ranged Combat", "Sleight of Hand", "Stealth", "Strategy", "Technology", "Tracking", "Treatment", "Vehicles", "Other"];
    SkillList.skillAbilityHash = convertToHash([["Acrobatics", 1], ["Athletics", 0], ["Close Combat", 2], ["Common Knowledge", 6], ["Deception", 7], ["Expertise", 6], ["Insight", 3], ["Intimidation", 7], ["Investigation", 6], ["Knowledge", 6], ["Memory", 6], ["Perception", 3], ["Persuasion", 7], ["Ranged Combat", 5], ["Sleight of Hand", 5], ["Stealth", 1], ["Strategy", 6], ["Technology", 6], ["Tracking", 3], ["Treatment", 6], ["Vehicles", 5]], 0);
   //public:
    this.total=0;
    this.maxSkillRanks=[0, 0, 0, 0, 0, 0, 0, 0];  //for each ability/ skill
    this.closeCombatHash=convertToHash([], 0);  //empty
    this.rangedCombatHash=convertToHash([], 0);
   //private:
    var skillRowParts=["<select id='skillChoices", "' onChange='Main.skillSection.select(", ");'><option value='0'>Select One</option><option value='1'>Acrobatics</option><option value='0'>Athletics</option><option value='2'>Close Combat</option><option value='6'>Common Knowledge</option><option value='7'>Deception</option><option value='6'>Expertise</option><option value='3'>Insight</option><option value='7'>Intimidation</option><option value='6'>Investigation</option><option value='6'>Knowledge</option><option value='6'>Memory</option><option value='3'>Perception</option><option value='7'>Persuasion</option><option value='5'>Ranged Combat</option><option value='5'>Sleight of Hand</option><option value='1'>Stealth</option><option value='6'>Strategy</option><option value='6'>Technology</option><option value='3'>Tracking</option><option value='6'>Treatment</option><option value='5'>Vehicles</option><option value='0'>Other</option></select><span id='skillRemainder", "' style='display:none'><span id='skillTextHolder", "' style='display:none;'><input type='text' value='Skill Subtype' id='skillText", "' onChange='Main.skillSection.changeText(", ");' /></span> Ranks <input type='text' value='1' id='skillRank", "' size='1' onChange='Main.skillSection.changeRank(", ");' /> + <select id='skillAbility", "' onChange='Main.skillSection.selectAbility(", ");'><option value='Strength'>Strength</option><option value='Agility'>Agility</option><option value='Fighting'>Fighting</option><option value='Awareness'>Awareness</option><option value='Stamina'>Stamina</option><option value='Dexterity'>Dexterity</option><option value='Intellect'>Intellect</option><option value='Presence'>Presence</option></select> = <span id='skill bonus ", "'>0</span></span><br />"];
    var rowArray = [new SkillObject(0)];
   this.changeRules = function(){
      if (Main.useOldRules)
      {
          SkillList.allSkillNames=["Acrobatics", "Athletics", "Close Combat", "Deception", "Expertise", "Insight", "Intimidation", "Investigation", "Perception", "Persuasion", "Ranged Combat", "Sleight of Hand", "Stealth", "Technology", "Treatment", "Vehicles"];
          skillRowParts=["<select id='skillChoices", "' onChange='Main.skillSection.select(", ");'><option value='0'>Select One</option><option value='1'>Acrobatics</option><option value='0'>Athletics</option><option value='2'>Close Combat</option><option value='7'>Deception</option><option value='6'>Expertise</option><option value='3'>Insight</option><option value='7'>Intimidation</option><option value='6'>Investigation</option><option value='3'>Perception</option><option value='7'>Persuasion</option><option value='5'>Ranged Combat</option><option value='5'>Sleight of Hand</option><option value='1'>Stealth</option><option value='6'>Technology</option><option value='6'>Treatment</option><option value='5'>Vehicles</option></select><span id='skillRemainder", "' style='display:none'><span id='skillTextHolder", "' style='display:none;'><input type='text' value='Skill Subtype' id='skillText", "' onChange='Main.skillSection.changeText(", ");' /></span> Ranks <input type='text' value='1' id='skillRank", "' size='1' onChange='Main.skillSection.changeRank(", ");' /> + <select id='skillAbility", "' onChange='Main.skillSection.selectAbility(", ");'><option value='Strength'>Strength</option><option value='Agility'>Agility</option><option value='Fighting'>Fighting</option><option value='Awareness'>Awareness</option><option value='Stamina'>Stamina</option><option value='Dexterity'>Dexterity</option><option value='Intellect'>Intellect</option><option value='Presence'>Presence</option></select> = <span id='skill bonus ", "'>0</span></span><br />"];
      }
      else
      {
          SkillList.allSkillNames=["Acrobatics", "Athletics", "Close Combat", "Common Knowledge", "Deception", "Expertise", "Insight", "Intimidation", "Investigation", "Knowledge", "Memory", "Perception", "Persuasion", "Ranged Combat", "Sleight of Hand", "Stealth", "Strategy", "Technology", "Tracking", "Treatment", "Vehicles", "Other"];
          skillRowParts=["<select id='skillChoices", "' onChange='Main.skillSection.select(", ");'><option value='0'>Select One</option><option value='1'>Acrobatics</option><option value='0'>Athletics</option><option value='2'>Close Combat</option><option value='6'>Common Knowledge</option><option value='7'>Deception</option><option value='6'>Expertise</option><option value='3'>Insight</option><option value='7'>Intimidation</option><option value='6'>Investigation</option><option value='6'>Knowledge</option><option value='6'>Memory</option><option value='3'>Perception</option><option value='7'>Persuasion</option><option value='5'>Ranged Combat</option><option value='5'>Sleight of Hand</option><option value='1'>Stealth</option><option value='6'>Strategy</option><option value='6'>Technology</option><option value='3'>Tracking</option><option value='6'>Treatment</option><option value='5'>Vehicles</option><option value='0'>Other</option></select><span id='skillRemainder", "' style='display:none'><span id='skillTextHolder", "' style='display:none;'><input type='text' value='Skill Subtype' id='skillText", "' onChange='Main.skillSection.changeText(", ");' /></span> Ranks <input type='text' value='1' id='skillRank", "' size='1' onChange='Main.skillSection.changeRank(", ");' /> + <select id='skillAbility", "' onChange='Main.skillSection.selectAbility(", ");'><option value='Strength'>Strength</option><option value='Agility'>Agility</option><option value='Fighting'>Fighting</option><option value='Awareness'>Awareness</option><option value='Stamina'>Stamina</option><option value='Dexterity'>Dexterity</option><option value='Intellect'>Intellect</option><option value='Presence'>Presence</option></select> = <span id='skill bonus ", "'>0</span></span><br />"];
      }
   };
   this.clear = function(){
       rowArray = [new SkillObject(0)];
       this.generate();
       this.update();  //all others will be updated in calculateValues
   };
   this.select = function(rowIndex){
       rowArray[rowIndex].select();
       this.generate();  //in case a physical row is added or removed
       this.update();
   };
   this.changeRank = function(rowIndex){
       rowArray[rowIndex].changeRank();
       this.update();
       //don't need to generate because the rows are the same and that field has already been updated
   };
   this.changeText = function(rowIndex){
       rowArray[rowIndex].changeText();
       this.update();  //will generate if rows are changed due to redundancy
   };
   this.selectAbility = function(rowIndex){
       rowArray[rowIndex].selectAbility();
       this.update();
       //don't need to generate because the rows can't change from this
   };
   this.update = function(){
       this.calculateValues();
       this.total=0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          this.total+=rowArray[i].getRank();
      }
       this.total/=2;  //do not round
       Main.updateOffense();
       Main.update();  //updates totals and power level
   };
   this.generate = function (){
       var allSkillRows="";
      for (var i=0; i < rowArray.length; i++)
      {
          allSkillRows+=generateRow(skillRowParts, i);
      }
      if (rowArray[rowArray.length-1].getSelectIndex()!=0)  //if last row isn't blank add one
      {
          allSkillRows+=generateRow(skillRowParts, rowArray.length);
          rowArray.push(new SkillObject(rowArray.length));
      }
       document.getElementById("skill section").innerHTML=allSkillRows;
       this.setAll();
   };
   this.calculateValues = function(){
       var compareTo, abilityNameUsed, abilityValue, skillFullName;
       this.closeCombatHash.clear();
       this.rangedCombatHash.clear();
       var skillTypeList = new Array();
       Main.abilitySection.resetMaxSkillRanks();  //this resets the array to the abilities
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          if(rowArray[i].getSelectIndex()==0){this.removeRow(i); i--; continue;}  //remove empty rows
          skillFullName=rowArray[i].getUniqueName();
          if(skillTypeList.contains(skillFullName)){this.removeRow(i); i--; continue;}  //remove redundant rows
          skillTypeList.push(skillFullName);
          compareTo=rowArray[i].getRank();
          if(rowArray[i].name=="Close Combat") this.closeCombatHash.add(document.getElementById("skillText"+i).value, compareTo);  //add, there is no redundancy
          else if(rowArray[i].name=="Ranged Combat") this.rangedCombatHash.add(document.getElementById("skillText"+i).value, compareTo);  //only use the subtype for the hash
      }
       //now all redundant or blank rows (except last) are removed. so now I set all the totals (the totals are set after to avoid being reset by remove row)
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          compareTo=rowArray[i].getRank();
          abilityNameUsed = AbilityList.allAbilityNames[document.getElementById("skillAbility"+i).selectedIndex];
          abilityValue=Main.abilitySection.get(abilityNameUsed);
          if(abilityValue=="--" && abilityNameUsed=="Stamina" && !Main.useOldRules) document.getElementById("skill bonus "+i).innerHTML="Always Pass";
          else if(abilityValue=="--") document.getElementById("skill bonus "+i).innerHTML="Always Fail";  //old rules stamina always fails
         else
         {
             compareTo+=abilityValue;
             document.getElementById("skill bonus "+i).innerHTML=compareTo;
             if(compareTo > this.maxSkillRanks[document.getElementById("skillAbility"+i).selectedIndex]) this.maxSkillRanks[document.getElementById("skillAbility"+i).selectedIndex]=compareTo;
         }
      }
      if (this.closeCombatHash.get("Unarmed")==0)  //should always have unarmed rank
      {
          abilityValue=Main.abilitySection.get("Fighting");
          if(abilityValue == "--") return;
          this.closeCombatHash.add("Unarmed", abilityValue);  //don't add if --
      }
   };
   this.setAll = function(){
      for(var i=0; i < rowArray.length-1; i++)  //the last row (being blank) is already set
         {rowArray[i].setValues();}
   };
   this.removeRow = function(rowIndex){
       rowArray.splice(rowIndex, 1);  //remove from array
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].rowIndex=i;}  //correct all indexing
       this.generate();
   };
   this.getSkillCombatTotal = function(CombatRange, subtypeName){
       if(CombatRange=="Close") return closeCombatHash.get(subtypeName);
       if(CombatRange=="Ranged") return rangedCombatHash.get(subtypeName);
       if(CombatRange=="Perception") return "--";  //can't miss
       alert("Error: getSkillCombatTotal("+CombatRange+", "+subtypeName+"); Bad range");
       return "None";
   };
   this.save = function(){
       if(rowArray.length==1) return " <Skills></Skills>\n";
       var fileString="<Skills>\n";
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          var element = document.getElementById("skillChoices"+i);
          element=element.options[element.selectedIndex].text;
          fileString+="       <Row name=\""+rowArray[i].name+"\"";
          if(document.getElementById("skillTextHolder"+i).style.display!="none") fileString+=" subtype=\""+rowArray[i].getText()+"\"";
          fileString+=" rank=\""+document.getElementById("skillRank"+i).value+"\"";
          element = document.getElementById("skillAbility"+i);
          element=element.options[element.selectedIndex].text;
          fileString+=" ability=\""+element+"\"";
          fileString+=" />\n";
      }  //document or rowArray, either way since they should have the same values
       fileString+="   </Skills>\n";
       return fileString;
   };
   this.load = function(rowPointer){
       rowArray = [new SkillObject(0)];
      for (var i=0; i < rowPointer.length; i++)
      {
          var arrayPointer = rowArray[rowArray.length-1];
          var indexToUse=SkillList.allSkillNames.indexOf(rowPointer[i].getAttribute("name"));
          if(indexToUse == -1){alert("Load Error: "+rowPointer[i].getAttribute("name")+" is not a basic skill name. Perhaps you mean \"Other\" with a subtype?"); continue;}
          arrayPointer.setSelectIndex(indexToUse+1);  //+1 to avoid default
          arrayPointer.setRank(rowPointer[i].getAttribute("rank"));
          if(rowPointer[i].getAttribute("subtype")!=undefined) arrayPointer.setText(rowPointer[i].getAttribute("subtype"));
          arrayPointer.setAbility(rowPointer[i].getAttribute("ability"));
          rowArray.push(new SkillObject(rowArray.length));  //add new blank data row
      }
       this.generate();
       this.update();
   };
   //constructor:
    this.generate();
};
function SkillObject(rowIndexPassed){
   //public:
    this.rowIndex=rowIndexPassed;
    this.name="";
   //private:
    var selectIndex=0;
    var rank=0;
    var hasText=false;
    var text="";
    var abilityIndex=-1;
   this.select = function (){
       var element = document.getElementById("skillChoices"+this.rowIndex);
       this.name = element.options[element.selectedIndex].text;
       this.setSelectIndex(document.getElementById("skillChoices"+this.rowIndex).selectedIndex);
   };
    this.getSelectIndex = function (){return selectIndex;};
   this.setSelectIndex = function (indexGiven){
       selectIndex=sanitizeNumber(indexGiven, 0, 0);
      if (selectIndex==0)
      {
          this.name="";
          rank=0;
          hasText=false;
          text="";
          abilityIndex=-1;
          return;
      }
       rank=1;
       this.name=SkillList.allSkillNames[selectIndex-1];  //to avoid the default
       abilityIndex=SkillList.skillAbilityHash.get(this.name);
       if(!Main.useOldRules) hasText=!(this.name=="Memory" || this.name=="Perception" || this.name=="Persuasion" || this.name=="Tracking");  //ones that don't have text
       else hasText=(this.name=="Close Combat" || this.name=="Expertise" || this.name=="Ranged Combat");  //ones that have text
       if(this.name=="Other") text="Skill Name and Subtype";
       else if(hasText) text="Skill Subtype";
   };
   this.changeRank = function (){  //this is not the same as set rank because this assumes the section exists
       this.setRank(document.getElementById("skillRank"+this.rowIndex).value);
       document.getElementById("skillRank"+this.rowIndex).value=rank;
   };
    this.getRank = function (){return rank;};
   this.setRank = function (rankGiven){
       if(selectIndex==0){alert("Unknown: Skill.setRank("+this.rowIndex+"); Has selectedIndex == 0"); return;}
       rank=sanitizeNumber(rankGiven, 1, 1);
   };
   this.changeText = function (){
       this.setText(document.getElementById("skillText"+this.rowIndex).value);
       document.getElementById("skillText"+this.rowIndex).value=text;
   };
    this.getText = function (){return text;};
   this.setText = function (textGiven){
       if(selectIndex==0){alert("Unknown: Skill.setText("+this.rowIndex+"); Has selectedIndex == 0"); return;}
       if(!hasText) return;  //can only happen when loading
       text=textGiven.trim();
   };
   this.selectAbility = function(){
       abilityIndex=document.getElementById("skillAbility"+this.rowIndex).selectedIndex;
   };
   this.setAbility = function(abilityNameGiven){  //by name only
       abilityIndex=AbilityList.allAbilityNames.indexOf(abilityNameGiven);
   };
   this.setValues = function (){  //can only be and is only called after the skill section has been generated
       document.getElementById("skillChoices"+this.rowIndex).selectedIndex=selectIndex;
       if(selectIndex==0){document.getElementById("skillRemainder"+this.rowIndex).style.display="none"; return;}
       document.getElementById("skillRemainder"+this.rowIndex).style.display="inline";
       if(hasText){document.getElementById("skillTextHolder"+this.rowIndex).style.display="inline"; document.getElementById("skillText"+this.rowIndex).value=text;}
       else document.getElementById("skillTextHolder"+this.rowIndex).style.display="none";
       //display none is default but needs to be set here in case of select change
       document.getElementById("skillRank"+this.rowIndex).value=rank;
       document.getElementById("skillAbility"+this.rowIndex).selectedIndex=abilityIndex;
   };
   this.getUniqueName = function (){
       if(hasText) return this.name+": "+text;
       return this.name;
   };
};
