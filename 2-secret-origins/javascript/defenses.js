/*Call List onChange
Defense: change(defenseIndex);
*/
function DefenseList(){
   //public:
    this.total=0;
   //private:
    var allDefenseNames=["Dodge", "Fortitude", "Parry", "Will", "Toughness"];  //Toughness (Stamina) is listed for completeness
    var defenseAbilityUsed=["Agility", "Stamina", "Fighting", "Presence", "Stamina"];
    var rowArray = new Array();  //not actually rows but an array to each input
    var toughnessMaxValue = 0;  //for power level
   this.changeRules = function(){
       if(Main.useOldRules) defenseAbilityUsed[3]="Awareness";  //change the ability used by will defense
       else defenseAbilityUsed[3]="Presence";
   };
   this.clear = function(){
      for(var i=0; i < rowArray.length; i++)
          {rowArray[i].set(0);}
       this.update();
   };
   this.update = function(){
       this.total=0;
      for(var i=0; i < rowArray.length; i++)
          {this.total+=rowArray[i].get();}
       this.calculateValues();
       Main.update();  //updates totals and power level
   };
   this.calculateValues = function(){
      for (var i=0; i < rowArray.length; i++)
      {
          var abilityValue=Main.abilitySection.getZero(defenseAbilityUsed[i]);  //getZero because you can't lack defense scores
          document.getElementById(allDefenseNames[i]+" start").innerHTML=abilityValue;
          document.getElementById(allDefenseNames[i]+" final").innerHTML=rowArray[i].get()+abilityValue;
      }
       var toughnessString, staminaValue, protectionValue, defensiveRollValue, toughnessValue;
       staminaValue=Main.abilitySection.getZero("Stamina");  //again always has toughness
       protectionValue=Main.getProtectionTotal();
       if(Main.useOldRules) protectionValue+=staminaValue;  //in old rules stamina stacked but nothing else
       defensiveRollValue=Main.advantageSection.rankHash.get("Defensive Roll");
       toughnessValue = staminaValue+defensiveRollValue;

       if(protectionValue > 0 && protectionValue >= toughnessValue) toughnessString=toughnessMaxValue=protectionValue;
      else if (defensiveRollValue > 0)
      {
          toughnessMaxValue=toughnessValue;  //with defensive roll is the max
          toughnessString=toughnessValue+" (";
          if(protectionValue > staminaValue) toughnessString+=protectionValue;  //this also works for old rules
          else toughnessString+=staminaValue;
          toughnessString+=" without Defensive Roll)";
      }
       else toughnessString=toughnessMaxValue=staminaValue;  //staminaValue == toughnessValue;
       document.getElementById("Toughness").innerHTML=toughnessString;
   };
   this.getToughness = function(){return toughnessMaxValue;};
   this.change = function(defenseIndex){
       rowArray[defenseIndex].set(document.getElementById(allDefenseNames[defenseIndex]+" input").value);
       this.update();
   };
   this.save = function(){
       var fileString="   <Defenses>\n";
       for(var i=0; i < rowArray.length; i++){fileString+="       <"+allDefenseNames[i]+" value=\""+rowArray[i].get()+"\" />\n";}
       fileString+="   </Defenses>\n";
       return fileString;
   };
   this.load = function(xmlDoc){
       for(var i=0; i < rowArray.length; i++){rowArray[i].set(xmlDoc.getElementsByTagName(allDefenseNames[i])[0].getAttribute("value"));}
       this.update();
   };
   //constructor:
    for(var i=0; i < allDefenseNames.length-1; i++){rowArray.push(new DefenseObject(allDefenseNames[i]));}  //-1 to avoid toughness
}
function DefenseObject(defenseName){
    var defenseValue=0;
   this.get = function(){return defenseValue;};
   this.set = function(valueGiven){
       document.getElementById(defenseName+" input").value=defenseValue=sanitizeNumber(valueGiven, 0, 0);
   };
}
