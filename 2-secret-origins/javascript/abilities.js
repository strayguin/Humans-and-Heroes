/*Call List onChange
Ability: change(abilityIndex);
*/
function AbilityList(){
   //static:
    AbilityList.allAbilityNames=["Strength", "Agility", "Fighting", "Awareness", "Stamina", "Dexterity", "Intellect", "Presence"];
   //public:
    this.total=0;
   //private:
    var rowArray = new Array();
   this.clear = function(){
       for(var i=0; i < AbilityList.allAbilityNames.length; i++){rowArray[i].set(0);}
       this.update();
   };
   this.change = function(abilityIndex){
       rowArray[abilityIndex].set(document.getElementById(AbilityList.allAbilityNames[abilityIndex]).value);
       this.update();
   };
   this.get = function(nameOfAbility){return rowArray[AbilityList.allAbilityNames.indexOf(nameOfAbility)].get();};
   this.getZero = function(nameOfAbility){return rowArray[AbilityList.allAbilityNames.indexOf(nameOfAbility)].getZero();};
   this.resetMaxSkillRanks = function(){
      for (var i=0; i < AbilityList.allAbilityNames.length; i++)
      {
          Main.skillSection.maxSkillRanks[i]=rowArray[i].getZero();  //since this is for power level it can't be blank
      }
   };
   this.update = function(){
       this.total=0;
      for (var i=0; i < rowArray.length; i++)
      {
          var abilityValue = rowArray[i].get();  //not getZero for below
          if(!Main.useOldRules && abilityValue=="--" && AbilityList.allAbilityNames[i]=="Stamina") this.total+=30;
          else if(abilityValue=="--") this.total-=10;
          else this.total+=(abilityValue*2);
      }
       Main.skillSection.calculateValues();
       Main.updateOffense();
       Main.defenseSection.calculateValues();
       Main.update();  //updates totals and power level
   }
   this.save = function(){
       var fileString="   <Abilities>\n";
      for (var i=0; i < rowArray.length; i++)
      {
          fileString+="       <"+AbilityList.allAbilityNames[i]+" value=\""+rowArray[i].get()+"\" />\n";
      }
       fileString+="   </Abilities>\n";
       return fileString;
   };
   this.load = function(xmlDoc){
      for (var i=0; i < rowArray.length; i++)
      {
          rowArray[i].set(xmlDoc.getElementsByTagName(AbilityList.allAbilityNames[i])[0].getAttribute("value"));
      }
       this.update();
   };
   //constructor:
    for(var i=0; i < AbilityList.allAbilityNames.length; i++){rowArray.push(new AbilityObject(AbilityList.allAbilityNames[i]));}
}
function AbilityObject(abilityName){
    var abilityValue=0;
   this.get = function(){return abilityValue;}
   this.getZero = function(){if(abilityValue=="--"){return 0;} return abilityValue;}
   this.set = function(givenValue){
       abilityValue = (givenValue+'').trim();
       if(abilityValue=="--") document.getElementById(abilityName).value=abilityValue;
       else document.getElementById(abilityName).value=abilityValue=sanitizeNumber(abilityValue, -5, 0);
   };
}
