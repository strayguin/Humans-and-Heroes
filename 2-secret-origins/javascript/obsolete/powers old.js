/*Call List onChange
Select Power: select(rowIndex);
Base: changeBaseCost(rowIndex);
Text: changeText(rowIndex);
Action: selectAction(rowIndex);
Range: selectRange(rowIndex);
Duration: selectDuration(rowIndex);
(see modifier file)
Rank: changeRank(rowIndex);

Also updates:
modifiers
Main.updateOffense();
Main.defenseSection.calculateValues();
*/
function PowerListAgnostic(sectionName){
   //static:
    PowerListAgnostic.allPowerNames=[];
    PowerListAgnostic.allPowerBaseCost=Hash.makeFromArray([["A God I Am", 5], ["Attain Knowledge", 2], ["Communication", 4], ["Comprehend", 2], ["Concealment", 2], ["Create", 2], ["Enhanced Trait", 2], ["Flight", 2], ["Growth", 6], ["Healing", 2], ["Immortality", 5], ["Insubstantial", 5], ["Luck Control", 3], ["Mental Transform", 2], ["Mind Reading", 2], ["Mind Switch", 7], ["Morph", 1], ["Move Object", 2], ["Movement", 2], ["Nullify", 3], ["Phantom Ranks", 5], ["Reality Warp", 5], ["Regeneration", 3], ["Resistance", 3], ["Shrinking", 3], ["Summon", 2], ["Summon Minion", 5], ["Summon Object", 2], ["Teleport", 2], ["Transform", 2], ["Variable", 7]], 1);
       //do not remove Morph, despite being default it needs to exist so I can set it when rules are not old
    PowerListAgnostic.allPowersWithAnInputBaseCost=["Attain Knowledge", "Concealment", "Enhanced Trait", "Environment", "Feature", "Illusion", "Remote Sensing", "Senses", "Transform"];
    PowerListAgnostic.actionArray=[];
    PowerListAgnostic.actionHash=Hash.makeFromArray([["A God I Am", "Triggered"], ["Burrowing", "Free"], ["Communication", "Free"], ["Comprehend", "None"], ["Concealment", "Free"], ["Elongation", "Free"], ["Enhanced Trait", "Free"], ["Extra Limbs", "None"], ["Feature", "None"], ["Flight", "Free"], ["Growth", "Free"], ["Immortality", "None"], ["Immunity", "None"], ["Insubstantial", "Free"], ["Leaping", "Free"], ["Luck Control", "Reaction"], ["Morph", "Free"], ["Movement", "Free"], ["Permeate", "Free"], ["Phantom Ranks", "Free"], ["Protection", "None"], ["Quickness", "Free"], ["Reality Warp", "Free"], ["Regeneration", "None"], ["Remote Sensing", "Free"], ["Resistance", "None"], ["Senses", "None"], ["Shrinking", "Free"], ["Speed", "Free"], ["Swimming", "Free"], ["Teleport", "Move"], ["Variable", "Full"]], "Standard");
    PowerListAgnostic.rangeArray=["Close", "Ranged", "Perception", "Personal"];  //Personal isn't a choice
    PowerListAgnostic.rangeHash=Hash.makeFromArray([["Affliction", "Close"], ["Create", "Ranged"], ["Damage", "Close"], ["Deflect", "Ranged"], ["Environment", "Close"], ["Healing", "Close"], ["Illusion", "Perception"], ["Luck Control", "Perception"], ["Mental Transform", "Close"], ["Mind Reading", "Perception"], ["Mind Switch", "Close"], ["Move Object", "Ranged"], ["Nullify", "Ranged"], ["Reality Warp", "Perception"], ["Summon", "Close"], ["Summon Minion", "Close"], ["Summon Object", "Close"], ["Transform", "Close"], ["Weaken", "Close"]], "Personal");
    PowerListAgnostic.durationArray=["Concentration", "Sustained", "Continuous", "Permanent", "Instant"];  //Instant isn't a choice and Permanent cost weird
    PowerListAgnostic.durationHash=Hash.makeFromArray([["A God I Am", "Continuous"], ["Affliction", "Instant"], ["Attain Knowledge", "Instant"], ["Comprehend", "Permanent"], ["Damage", "Instant"], ["Deflect", "Instant"], ["Extra Limbs", "Permanent"], ["Feature", "Permanent"], ["Healing", "Instant"], ["Immortality", "Permanent"], ["Immunity", "Permanent"], ["Leaping", "Instant"], ["Luck Control", "Instant"], ["Mental Transform", "Instant"], ["Mind Switch", "Continuous"], ["Nullify", "Instant"], ["Protection", "Permanent"], ["Reality Warp", "Continuous"], ["Regeneration", "Permanent"], ["Resistance", "Permanent"], ["Senses", "Permanent"], ["Teleport", "Instant"], ["Weaken", "Instant"]], "Sustained");
    PowerListAgnostic.actionNoneString="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>None</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    PowerListAgnostic.rangePersonalString="&nbsp;&nbsp;&nbsp;&nbsp;<b>Personal</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    PowerListAgnostic.durationInstantString="&nbsp;&nbsp;&nbsp;&nbsp;<b>Instant</b>";  //doesn't need trailing spaces since nothing comes after it
    PowerListAgnostic.godhoodNames=["A God I Am", "Reality Warp"];
   //public:
    this.total=0;
    if(sectionName === "equipment") this.totalMax=0;
    this.protectionRankTotal=0;
    this.attackEffectRanks=new Hash({}, 0);
    this.usingGodhoodPowers=false;
   //private:
    //godhood powers use powerRowParts with replaced text
    var rowArray=[new PowerObjectAgnostic(0, sectionName)];
   this.changeRules=function(){
       var commonNames=["Affliction", "Communication", "Comprehend", "Concealment", "Create", "Damage", "Enhanced Trait", "Environment", "Feature", "Flight", "Growth", "Healing", "Illusion", "Immortality", "Immunity", "Insubstantial", "Leaping", "Luck Control", "Mind Reading", "Morph", "Move Object", "Movement", "Nullify", "Protection", "Quickness", "Regeneration", "Remote Sensing", "Senses", "Shrinking", "Teleport", "Transform", "Variable", "Weaken"];
      if (Main != undefined && Main.useOldRules)
      {
          PowerListAgnostic.allPowerBaseCost.set("Growth", 2);
          PowerListAgnostic.allPowerBaseCost.set("Immortality", 2);
          PowerListAgnostic.allPowerBaseCost.set("Morph", 5);
          PowerListAgnostic.allPowerBaseCost.set("Nullify", 1);
          PowerListAgnostic.allPowerBaseCost.set("Regeneration", 1);
          PowerListAgnostic.allPowerBaseCost.set("Shrinking", 2);
          PowerListAgnostic.actionHash.set("Variable", "Standard");
          PowerListAgnostic.actionArray=["Standard", "Move", "Free", "Reaction", "None"];  //None isn't a choice
          PowerListAgnostic.allPowerNames=remakeArray(commonNames, ["Burrowing", "Deflect", "Elongation", "Extra Limbs", "Speed", "Summon", "Swimming"]);
      }
      else
      {
          PowerListAgnostic.allPowerBaseCost.set("Growth", 6);
          PowerListAgnostic.allPowerBaseCost.set("Immortality", 5);
          PowerListAgnostic.allPowerBaseCost.set("Morph", 1);  //I could add/remove morph but this is nicer
          PowerListAgnostic.allPowerBaseCost.set("Nullify", 3);
          PowerListAgnostic.allPowerBaseCost.set("Regeneration", 3);
          PowerListAgnostic.allPowerBaseCost.set("Shrinking", 3);
          PowerListAgnostic.actionHash.set("Variable", "Full");
          PowerListAgnostic.actionArray=["Slow", "Full", "Standard", "Move", "Free", "Reaction", "Triggered", "None"];  //None isn't a choice
          PowerListAgnostic.allPowerNames=remakeArray(commonNames, ["Attain Knowledge", "Mental Transform", "Mind Switch", "Permeate", "Phantom Ranks", "Resistance", "Summon Minion", "Summon Object"]);
      }
      for(var i=0; i < rowArray.length; i++)  //include last blank row
          {rowArray[i].changeRules();}
   };
   this.clear=function(){
       rowArray=[new PowerObjectAgnostic(0, sectionName)];
       this.generate();
       this.update();
   };
   this.select=function(rowIndex){
       rowArray[rowIndex].select();
       this.generate();
       this.update();
   };
   this.selectAction=function(rowIndex){
       rowArray[rowIndex].selectAction();
       this.generate();  //need to make more modifier rows
       this.update();
   };
   this.selectRange=function(rowIndex){
       rowArray[rowIndex].selectRange();
       this.generate();
       this.update();
   };
   this.selectDuration=function(rowIndex){
       rowArray[rowIndex].selectDuration();
       this.generate();
       this.update();
   };
   this.changeText=function(rowIndex){
       rowArray[rowIndex].changeText();
       this.update();
   };
   this.changeBaseCost=function(rowIndex){
       rowArray[rowIndex].changeBaseCost();
       this.update();
   };
   this.selectModifier=function(totalIndex, secondIndex){
       //console.log(totalIndex+', '+secondIndex);
       var indexArray=totalIndex.split(".");
       var powerRowIndex=parseInt(indexArray[0]);
       rowArray[powerRowIndex].selectModifier(parseInt(indexArray[1]));  //calls calculateTotal()
       this.generate();
       this.update();  //total is calculated again here
       //below could be put in own function requestRangeSet called by modifier.select but that's silly
      if (rowArray[powerRowIndex].doesHaveAttack() && document.getElementById(sectionName+"SelectRangeHolder"+powerRowIndex).innerHTML === PowerListAgnostic.rangePersonalString)
      //if there is a modifier for making personal range effects into close and the effect is still personal then change it to close
      {
          rowArray[powerRowIndex].setRange("Close");
          this.generate();  //set the range
          //don't need to update because the costs haven't changed
      }
      else if(!rowArray[powerRowIndex].doesHaveAttack() && document.getElementById(sectionName+"SelectRangeHolder"+powerRowIndex).innerHTML !== PowerListAgnostic.rangePersonalString)
      {
          rowArray[powerRowIndex].setRange("Personal");
          this.generate();  //must generate in case the number of modifier rows has changed again
      }
   };
   this.changeModifierRank=function(totalIndex){
       var indexArray=totalIndex.split(".");
       rowArray[parseInt(indexArray[0])].changeModifierRank(parseInt(indexArray[1]));
       this.update();
   };
   this.changeModifierText=function(totalIndex){
       var indexArray=totalIndex.split(".");
       rowArray[parseInt(indexArray[0])].changeModifierText(parseInt(indexArray[1]));
       this.update();
   };
   this.changeRank=function(rowIndex){
       rowArray[rowIndex].changeRank();
       this.update();
   };
   this.update=function(){
       this.calculateValues();
       this.setAll();  //TODO: why is this needed here?
       this.total=0;
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {this.total+=rowArray[i].totalCost;}
      if (sectionName === "equipment")  //power section.totalMax is undefined
          if(this.total > this.totalMax || this.total+5=this.totalMax) Main.advantageSection.correctEquipmentRank();  //too low or too high advantage rank
       Main.updateOffense();
       Main.defenseSection.calculateValues();
       Main.update();  //updates totals and power level
   };
   this.generate=function(){
       var allPowerRows="";
      for(var i=0; i < rowArray.length; i++)
          {allPowerRows+=rowArray[i].generate();}
      if (!rowArray.last().isBlank())  //if last row isn't blank add one
      {
          rowArray.push(new PowerObjectAgnostic(rowArray.length, sectionName));
          allPowerRows+=rowArray.last().generate();
      }
       document.getElementById(sectionName+" section").innerHTML=allPowerRows;
       this.setAll();
   };
   this.calculateValues=function(){
       this.attackEffectRanks.clear();
       //TODO: the hash needs to be Name -> string of base and rank then update power level and offense.
          //currently non-unique will be ignored.
       this.protectionRankTotal=0;
       this.usingGodhoodPowers=false;
       var namesSoFar=new Array();
      for (var i=0; i < rowArray.length; i++)  //the last row is always blank
      {
          if(rowArray[i].isBlank() && i < rowArray.length-1){this.removeRow(i); i--; continue;}  //remove blank row that isn't last
          else if(rowArray[i].isBlank()) continue;  //nothing to do

          rowArray[i].autoSetTotalChangers(rowArray[i].calculateRawTotal());  //total before removable/ alt effect
          rowArray[i].calculateTotal();  //total after those
          var bigPowerName=rowArray[i].getUniqueName();  //this includes all modifiers since you may have the same power with different modifiers
          if(namesSoFar.contains(bigPowerName)){this.removeRow(i); i--; continue;}  //remove redundant row
          namesSoFar.push(bigPowerName);

          var basePowerName=rowArray[i].getName();
          var rank=rowArray[i].getRank();
          if(PowerListAgnostic.godhoodNames.contains(basePowerName)) this.usingGodhoodPowers=true;
          else if(basePowerName === "Affliction" || basePowerName === "Damage" || basePowerName === "Mental Transform" || basePowerName === "Mind Switch" || basePowerName === "Nullify" || basePowerName === "Weaken") this.attackEffectRanks.add(basePowerName, rank);
          //there could be an attack array but I'm not going to bother since later the attack modifier will change everything
          //TODO later: if range is not personal add to attack hash
          else if(basePowerName === "Protection" && rank > this.protectionRankTotal) this.protectionRankTotal=rank;  //protection doesn't stack and may have more than 1
      }
       /*//should always have unarmed damage
       var abilityValue=Main.abilitySection.get("Strength");
       if(abilityValue === "--" || sectionName === "equipment") return;  //don't add if -- and only add once in powers
       this.attackEffectRanks.add("Damage", abilityValue);*/
   };
   this.setAll=function(){
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
         {rowArray[i].setValues();}
   };
   this.removeRow=function(rowIndex){  //is only called during update so don't call update at end
       rowArray.remove(rowIndex);
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setRowIndex(i);}  //correct all indexing
       this.generate();
   };
   this.getRow=function(rowIndex)
   {
       if(rowIndex === rowArray.length) return;
       return rowArray[rowIndex];
   };
   this.save=function(){
       var capsSectionName=sectionName.substring(0, 1).toUpperCase() + sectionName.substring(1);
       //xml must have caps but everything else must be lower
       if(sectionName === "power") capsSectionName+="s";
       if(rowArray.length === 1) return " <"+capsSectionName+"></"+capsSectionName+">\n";  //the only row is the empty one: ie there are no rows
       var fileString="<"+capsSectionName+">\n";
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       fileString+="   </"+capsSectionName+">\n";
       return fileString;
   };
   this.load=function(xmlSection){
       //rowArray=[new PowerObjectAgnostic(0, sectionName)];  //redundant since Main.load calls Main.clear before coming here
      for (var i=0, j=0; i < xmlSection.length; i++)
      {
          var indexToUse=PowerListAgnostic.allPowerNames.indexOf(xmlSection[i].getAttribute("name"));
          if(indexToUse === -1 && PowerListAgnostic.godhoodNames.contains(basePowerName)) indexToUse=PowerListAgnostic.allPowerNames.length+PowerListAgnostic.godhoodNames.indexOf(selectName);
          else if(indexToUse === -1){alert("Load Error: "+xmlSection[i].getAttribute("name")+" is not a power name."); continue;}  //not found
          if(indexToUse=PowerListAgnostic.allPowerNames.length && !Main.godHoodSwitch){alert("Load Error: "+xmlSection[i].getAttribute("name")+" is the power listed without transcendence (="+Main.getTranscendence()+")"); continue;}
          if(indexToUse=PowerListAgnostic.allPowerNames.length) this.usingGodhoodPowers=true;
          rowArray[j].setChoiceIndex(indexToUse+1);  //must be done before all others. +1 to avoid default
          rowArray[j].setBaseCost(xmlSection[i].getAttribute("cost"));
          rowArray[j].setText(xmlSection[i].getAttribute("text"));
          rowArray[j].setAction(xmlSection[i].getAttribute("action"));  //all sets take strings
          rowArray[j].setRange(xmlSection[i].getAttribute("range"));
          rowArray[j].setDuration(xmlSection[i].getAttribute("duration"));
          if(xmlSection[i].getElementsByTagName("Modifier").length > 0) rowArray[j].load(xmlSection[i].getElementsByTagName("Modifier"));  //only load them if they exist
          rowArray[j].setRank(xmlSection[i].getAttribute("rank"));
          j++;  //rowArray index will be correct even if load error
          rowArray.push(new PowerObjectAgnostic(j, sectionName));  //add a new blank data row
      }
       this.generate();
       this.update();
   };
   //constructor:
    this.changeRules();
    this.generate();
};  //TODO: make PowerObjectAgnostic private object to the list, then make alot more of list members private
function PowerObjectAgnostic(rowIndexPassed, sectionName){
   //public:
    this.totalCost=0;
   //private:
    var rowIndex=rowIndexPassed;  //because rowIndex can change
    var choiceIndex;  //mostly used to check if the row is blank
    var name, canSetBaseCost, baseCost, text, actionIndex, rangeIndex, durationIndex, rank;
    var modifierSection=new ModifierList(rowIndex, sectionName);
   this.setRowIndex=function(indexGiven){rowIndex=indexGiven; modifierSection.setSectionRowIndex(rowIndex);};
   this.changeRules=function(){modifierSection.changeRules();};
   this.generate=function(){
       var htmlString="";
       htmlString+="<select id='"+sectionName+"Choices"+rowIndex+"' onChange='Main."+sectionName+"Section.select("+rowIndex+");'>\n";
       htmlString+="    <option>Select One</option>\n";
      for (var i=0; i < PowerListAgnostic.allPowerNames.length; i++)
      {
          htmlString+="    <option>"+PowerListAgnostic.allPowerNames[i]+"</option>\n";
      }
      if (Main != undefined && sectionName !== "equipment" && (Main.powerSection.usingGodhoodPowers || Main.godHoodSwitch))
      //equipment can't be god-like so I only need to check power section's switch
         for (var i=0; i < PowerListAgnostic.godhoodNames.length; i++)
         {
             htmlString+="    <option>"+PowerListAgnostic.godhoodNames[i]+"</option>\n";
         }
       htmlString+="</select>\n";
       htmlString+="<span id='"+sectionName+"Remainder"+rowIndex+"' style='display:none'>\n";
       htmlString+="    Base Cost per Rank:\n";
       htmlString+="    <span id='"+sectionName+"BaseCostHolder"+rowIndex+"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n";
       htmlString+="    <input type='text' value='Other Text' id='"+sectionName+"Text"+rowIndex+"' onChange='Main."+sectionName+"Section.changeText("+rowIndex+");' size='90' />\n";
       htmlString+="    <br />\n";
       htmlString+="   <table width='100%'>\n";
       htmlString+="      <tr>\n";
       htmlString+="         <td width='34%' style='text-align:right;'>\n";
       htmlString+="             Action\n";
       htmlString+="             <span id='"+sectionName+"SelectActionHolder"+rowIndex+"'>"+PowerListAgnostic.actionNoneString+"</span>\n";
       htmlString+="         </td>\n";
       htmlString+="         <td colspan='2' width='66%'>\n";
       htmlString+="             Range\n";
       htmlString+="             <span id='"+sectionName+"SelectRangeHolder"+rowIndex+"'>"+PowerListAgnostic.rangePersonalString+"</span>\n";
       htmlString+="             Duration\n";
       htmlString+="             <span id='"+sectionName+"SelectDurationHolder"+rowIndex+"'>"+PowerListAgnostic.durationInstantString+"</span>\n";
       htmlString+="         </td>\n";
       htmlString+="      </tr>\n";
       htmlString+=modifierSection.generate();
       htmlString+="   </table>\n";
       htmlString+="   Ranks:\n";
       htmlString+="   <input type='text' size='1' value='1' id='"+sectionName+"Rank"+rowIndex+"' onChange='Main."+sectionName+"Section.changeRank("+rowIndex+");' />\n";
       htmlString+="   Total Cost per Rank:\n";
       htmlString+="   <span id='"+sectionName+"TotalCostPerRank"+rowIndex+"'>0</span>\n";
       htmlString+="   Total Flat Modifier Cost:\n";
       htmlString+="   <span id='"+sectionName+"FlatModifierCost"+rowIndex+"'>0</span>\n";
       htmlString+="=\n";
       htmlString+="   <span id='"+sectionName+"RowTotal"+rowIndex+"'>0</span>\n";
       htmlString+="   <br />\n";
       htmlString+="</span>\n";
       return htmlString;
   };
   this.save=function()
   {
       var fileString="      <Row name=\""+name+"\" ";
       if(canSetBaseCost) fileString+="cost=\""+baseCost+"\" ";
       fileString+="text=\""+text+"\" ";
       if(document.getElementById(sectionName+"SelectAction"+rowIndex) != undefined) fileString+="action=\""+document.getElementById(sectionName+"SelectAction"+rowIndex).options[actionIndex].text+"\" ";
       else fileString+="action=\"None\" ";
       if(document.getElementById(sectionName+"SelectRange"+rowIndex) != undefined) fileString+="range=\""+document.getElementById(sectionName+"SelectRange"+rowIndex).options[rangeIndex].text+"\" ";
       else fileString+="range=\"Personal\" ";
       if(document.getElementById(sectionName+"SelectDuration"+rowIndex) != undefined) fileString+="duration=\""+document.getElementById(sectionName+"SelectDuration"+rowIndex).options[durationIndex].text+"\" ";
       else fileString+="duration=\"Instant\" ";
       fileString+="rank=\""+rank+"\"";  //must be before modifiers
       fileString+=modifierSection.save();  //with self close if there are no modifiers
       if(modifierSection.getRow(0).isBlank()) fileString=" "+fileString;  //no modifiers
       else fileString+="      </Row>\n";
       return fileString;
   };
   this.load=function(xmlSection){modifierSection.load(xmlSection);};
   this.getDefaultRange=function()
   {
       if(this.isBlank()) return;
       return PowerListAgnostic.rangeHash.get(name);
   };
   this.doesHaveAttack=function(){return modifierSection.hasAttack;};  //some of these are just bridges
   this.selectModifier=function(modifierIndex){modifierSection.select(modifierIndex); this.calculateTotal(); this.setValues();};
   this.changeModifierRank=function(modifierIndex){modifierSection.changeRank(modifierIndex); this.calculateTotal(); this.setValues();};  //update rank and spans
   this.changeModifierText=function(modifierIndex){modifierSection.changeText(modifierIndex);};
   this.autoSetTotalChangers=function(rawTotal){modifierSection.autoSetTotalChangers(rawTotal); this.calculateTotal();};
       //don't need to set since this is only called right before generate anyway
   this.autoRemoveRowRequestAttacks=function(modifierIndex){modifierSection.autoRemoveRowRequestAttacks();};
   this.select=function(){
       this.setChoiceIndex(document.getElementById(sectionName+"Choices"+rowIndex).selectedIndex);
   };
   this.isBlank=function(){return (choiceIndex === 0);};
   this.setChoiceIndex=function(indexGiven){
       choiceIndex=sanitizeNumber(indexGiven, 0, 0);
       modifierSection.clear();  //always clear them out on select
      if (this.isBlank())
      {
          name="";
          this.totalCost=0;
          canSetBaseCost=false;
          baseCost=0;
          text="";
          actionIndex=0;
          rangeIndex=0;
          durationIndex=0;
          rank=0;
          return;
      }
       name=PowerListAgnostic.allPowerNames[choiceIndex-1];  //-1 to avoid default
       canSetBaseCost=PowerListAgnostic.allPowersWithAnInputBaseCost.contains(name);
       baseCost=PowerListAgnostic.allPowerBaseCost.get(name);
       text="Descriptors and other text";
       actionIndex=PowerListAgnostic.actionArray.indexOf(PowerListAgnostic.actionHash.get(name));
       rangeIndex=PowerListAgnostic.rangeArray.indexOf(PowerListAgnostic.rangeHash.get(name));
       durationIndex=PowerListAgnostic.durationArray.indexOf(PowerListAgnostic.durationHash.get(name));
       rank=1;
       this.calculateTotal();  //called for things like godhood powers
   };
   this.changeText=function(){
       this.setText(document.getElementById(sectionName+"Text"+rowIndex).value);
       //document.getElementById(sectionName+"Text"+rowIndex).value=text;  //always the same
   };
   this.setText=function(textGiven){text=textGiven;};
   this.selectAction=function(){  //can only be called if SelectAction exists
       this.setAction(SelectUtil.getTextById(sectionName+"SelectAction"+rowIndex));
       document.getElementById(sectionName+"SelectAction"+rowIndex).selectedIndex=actionIndex;
   };
   this.setAction=function(actionGiven){
       var baseActionName=PowerListAgnostic.actionHash.get(name);  //only used twice
       Logger.log("setAction(); baseActionName="+baseActionName+"; actionGiven="+actionGiven);
       var baseActionIndex=PowerListAgnostic.actionArray.indexOf(baseActionName);
       if(baseActionName === "None" && actionGiven !== "None") baseActionIndex=PowerListAgnostic.actionArray.indexOf("Free");  //calculate distance from free
       var newIndex=PowerListAgnostic.actionArray.indexOf(actionGiven);
       if(newIndex === -1){actionIndex=baseActionIndex; return;}  //if not found (only possible when loading)
       if(actionIndex === newIndex) return;  //nothing has changed
       if(actionGiven === "None" || name === "Feature") modifierSection.autoSetAction(0);  //clear out the action modifiers. feature does this to add selective
       //else if(name === "Feature"){}  //do nothing so that the action modifiers don't clear out and aren't autoset
       else modifierSection.autoSetAction(newIndex-baseActionIndex);
       actionIndex=newIndex;
   };
   this.selectRange=function(){
       //if(rangeIndex === PowerListAgnostic.rangeArray.indexOf("Personal") && name !== "Feature") return;  //only Feature can change duration from Personal (without modifiers)
       this.setRange(SelectUtil.getTextById(sectionName+"SelectRange"+rowIndex));
       document.getElementById(sectionName+"SelectRange"+rowIndex).selectedIndex=rangeIndex;
   };
   this.setRange=function(rangeGiven){
       var baseRangeName=PowerListAgnostic.rangeHash.get(name);
       //if(name !== "Feature" && (baseRangeName !== "Personal" && rangeGiven === "Personal")) return;  //only Feature can change duration to Personal
      if (rangeGiven === "Personal")
      {
          modifierSection.autoRemoveRowRequestAttacks();  //remove range modifiers
          if(baseRangeName !== "Personal") return;  //when loading bad data or if user attempts it
      }
       if(durationIndex === PowerListAgnostic.durationArray.indexOf("Permanent") && rangeGiven !== "Personal") return;  //can't be Personal
       var baseRangeIndex=PowerListAgnostic.rangeArray.indexOf(baseRangeName);
       var newIndex=PowerListAgnostic.rangeArray.indexOf(rangeGiven);
       if(newIndex === -1){rangeIndex=baseRangeIndex; return;}  //if not found (only possible when loading)
       if(rangeIndex === newIndex) return;  //nothing has changed
       if(baseRangeName === "Perception") baseRangeIndex++;  //more of a flaw to get away from Perception
       else if(baseRangeName === "Personal") baseRangeIndex=PowerListAgnostic.rangeArray.indexOf("Close");  //calculate distance from close
       rangeIndex=newIndex;  //must be set before newIndex might change
       if(rangeGiven === "Perception") newIndex++;  //more of an extra to get to Perception. do not use else because if both then they should cancel
       if(name === "Feature"){}  //do nothing so that the modifiers are not cleared out
       else if(rangeGiven === "Personal") Logger.trace(modifierSection, modifierSection.autoSetRange, [0]);
       else modifierSection.autoSetRange(newIndex-baseRangeIndex);
       //rangeIndex already set above
   };
   this.selectDuration=function(){
       this.setDuration(SelectUtil.getTextById(sectionName+"SelectDuration"+rowIndex));
       document.getElementById(sectionName+"SelectDuration"+rowIndex).selectedIndex=durationIndex;
   };
   this.setDuration=function(durationGiven){
       var baseDurationName=PowerListAgnostic.durationHash.get(name);
       Logger.log("setDuration(); baseDurationName="+baseDurationName+"; durationGiven="+durationGiven);
       //if(name !== "Feature" && (durationGiven === "Instant" || baseDurationName === "Instant")) return;  //only feature can change duration to or from Instant
       Logger.log("rangeIndex="+rangeIndex+" vs "+PowerListAgnostic.rangeArray.indexOf("Personal"));
       if(rangeIndex !== PowerListAgnostic.rangeArray.indexOf("Personal") && durationGiven === "Permanent") return;  //can't be Permanent
      if (name === "Feature")
      {
          if(durationGiven === "Permanent") this.setAction("None");  //set action to None (resets action modifiers)
          else if(actionIndex === PowerListAgnostic.actionArray.indexOf("None")) this.setAction("Free");  //reset action to Free
      }
      else
      {
         if (durationGiven === "Permanent")
         {
             Logger.down();
             this.setAction("None");  //set action to None (resets action modifiers)
             if(baseDurationName === "Permanent") modifierSection.autoRemoveRowRequest("Sustained");  //returning to base duration
             else modifierSection.autoAddRowRequest("Permanent");
             Logger.up();
         }
         else if (actionIndex === PowerListAgnostic.actionArray.indexOf("None"))  //if the action is none but duration is not Permanent
         {  //meaning that is was Permanent but is being switched back
             Logger.down();
            if (baseDurationName === "Permanent")  //changing from base duration
            {
                this.setAction("Free");  //becomes Free action
                modifierSection.autoAddRowRequest("Sustained");
            }
            else
            {
                this.setAction(PowerListAgnostic.actionHash.get(name));  //must reset action first
                modifierSection.autoRemoveRowRequest("Permanent");
            }
             Logger.up();
         }
      }
       var baseDurationIndex=PowerListAgnostic.durationArray.indexOf(baseDurationName);
       var newIndex=PowerListAgnostic.durationArray.indexOf(durationGiven);
       if(newIndex === -1){durationIndex=baseDurationIndex; return;}  //if not found (only possible when loading)
       if(durationIndex === newIndex) return;  //nothing has changed
       durationIndex=newIndex;  //must be set before newIndex might be changed
       if(baseDurationName === "Permanent") baseDurationIndex-=2;  //is a +1 extra instead of a -1 flaw
       if(durationGiven === "Permanent") newIndex-=2;  //is a -1 flaw instead of a +1 extra
       //do not use else because it is both when returning to the default of Permanent
       if(name === "Feature"){}  //do nothing so that the modifiers are not reset
       else Logger.trace(modifierSection, modifierSection.autoSetDuration, [newIndex-baseDurationIndex]);
       //the durationIndex was set above
   };
   this.changeBaseCost=function(){  //won't be called if you can't set base cost
       this.setBaseCost(document.getElementById(sectionName+"BaseCost"+rowIndex).value);
       document.getElementById(sectionName+"BaseCost"+rowIndex).value=baseCost;
   };
   this.setBaseCost=function(baseGiven){
       baseCost=sanitizeNumber(baseGiven, 1, PowerListAgnostic.allPowerBaseCost.get(name));  //unique defaults
       this.calculateTotal();
   };
   this.changeRank=function(){
       this.setRank(document.getElementById(sectionName+"Rank"+rowIndex).value);
       document.getElementById(sectionName+"Rank"+rowIndex).value=rank;
       //setRank calls calculateTotal
   };
   this.getRank=function(){return rank;};
   this.setRank=function(rankGiven){
       rank=sanitizeNumber(rankGiven, 1, 1);
       this.calculateTotal();
   };
   this.calculateTotal=function(){  //TODO: too much duplicate code with below
      while (true)  //using a loop instead of recursion
      {
          var costPerRank=baseCost+modifierSection.rankTotal;
          if(costPerRank < 1) costPerRank=1/(2-costPerRank);
          var rowTotal=Math.ceil(costPerRank*rank);  //round up
          var flatValue=modifierSection.flatTotal;
          if(name === "A God I Am") flatValue+=145;  //for first rank
          else if(name === "Reality Warp") flatValue+=75;
         if (flatValue < 0 && (rowTotal+flatValue) < 1)  //flat flaw more than (or equal to) the total cost is not allowed. so adjust the power rank
         {
             rank=(Math.abs(flatValue)/costPerRank);
             rank=Math.floor(rank)+1;  //must be higher than for this to work. don't use ceil so that if even will still be +1
             continue;  //loop back around and try again
         }
          rowTotal+=flatValue;  //might be negative
          break;  //done
      }
       this.totalCost=rowTotal;
   };
   this.calculateRawTotal=function(){
       modifierSection.clearTotalChangers();
      while (true)  //using a loop instead of recursion
      {
          var costPerRank=baseCost+modifierSection.rankTotal;
          if(costPerRank < 1) costPerRank=1/(2-costPerRank);
          var rowTotal=Math.ceil(costPerRank*rank);  //round up
          var flatValue=modifierSection.flatTotal;
          if(name === "A God I Am") flatValue+=145;  //for first rank
          else if(name === "Reality Warp") flatValue+=75;
         if (flatValue < 0 && (rowTotal+flatValue) < 1)  //flat flaw more than (or equal to) the total cost is not allowed. so adjust the power rank
         {
             rank=(Math.abs(flatValue)/costPerRank);
             rank=Math.floor(rank)+1;  //must be higher than for this to work. don't use ceil so that if even will still be +1
             continue;  //loop back around and try again
         }
          rowTotal+=flatValue;  //might be negative
          break;  //done
      }
       return rowTotal;
   };
   this.setValues=function(){
       document.getElementById(sectionName+"Choices"+rowIndex).selectedIndex=choiceIndex;
       if(this.isBlank()){document.getElementById(sectionName+"Remainder"+rowIndex).style.display="none"; return;}
       document.getElementById(sectionName+"Remainder"+rowIndex).style.display="inline";
      if (canSetBaseCost)
      {
          document.getElementById(sectionName+"BaseCostHolder"+rowIndex).innerHTML="<input type='text' size='1' value='0' id='"+sectionName+"BaseCost"+rowIndex+"' onChange='Main."+sectionName+"Section.changeBaseCost("+rowIndex+");' />";
          document.getElementById(sectionName+"BaseCost"+rowIndex).value=baseCost;
      }
       else document.getElementById(sectionName+"BaseCostHolder"+rowIndex).innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+baseCost+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          //fragile string but it has 2 parts and is only used twice so whatever
       document.getElementById(sectionName+"Text"+rowIndex).value=text;  //might be empty
       //feature has the same action as the others
       if(actionIndex === PowerListAgnostic.actionArray.indexOf("None")) document.getElementById(sectionName+"SelectActionHolder"+rowIndex).innerHTML=PowerListAgnostic.actionNoneString;
          //could also use durationIndex === PowerListAgnostic.durationArray.indexOf("Permanent")
      else
      {
          var actionSelectHTML="<select id='"+sectionName+"SelectAction"+rowIndex+"' onChange='Main."+sectionName+"Section.selectAction("+rowIndex+");'>";
         for (var i=0; i < PowerListAgnostic.actionArray.length-1; i++)
             {actionSelectHTML+="<option>"+PowerListAgnostic.actionArray[i]+"</option>";}
          actionSelectHTML+="</select>";
          document.getElementById(sectionName+"SelectActionHolder"+rowIndex).innerHTML=actionSelectHTML;
          document.getElementById(sectionName+"SelectAction"+rowIndex).selectedIndex=actionIndex;
      }
      if (name === "Feature")  //has unique drop downs
      {
          //these 2 holders always have selects
          document.getElementById(sectionName+"SelectRangeHolder"+rowIndex).innerHTML="<select id='"+sectionName+"SelectRange"+rowIndex+"' onChange='Main."+sectionName+"Section.selectRange("+rowIndex+");'><option>Close</option><option>Ranged</option><option>Perception</option><option>Personal</option></select>";
          document.getElementById(sectionName+"SelectRange"+rowIndex).selectedIndex=rangeIndex;
          document.getElementById(sectionName+"SelectDurationHolder"+rowIndex).innerHTML="<select id='"+sectionName+"SelectDuration"+rowIndex+"' onChange='Main."+sectionName+"Section.selectDuration("+rowIndex+");'><option>Concentration</option><option>Sustained</option><option>Continuous</option><option>Permanent</option><option>Instant</option></select>";
          document.getElementById(sectionName+"SelectDuration"+rowIndex).selectedIndex=durationIndex;
      }
      else
      {
          if(rangeIndex === PowerListAgnostic.rangeArray.indexOf("Personal")) document.getElementById(sectionName+"SelectRangeHolder"+rowIndex).innerHTML=PowerListAgnostic.rangePersonalString;
         else
         {
             document.getElementById(sectionName+"SelectRangeHolder"+rowIndex).innerHTML="<select id='"+sectionName+"SelectRange"+rowIndex+"' onChange='Main."+sectionName+"Section.selectRange("+rowIndex+");'><option>Close</option><option>Ranged</option><option>Perception</option></select>";
             document.getElementById(sectionName+"SelectRange"+rowIndex).selectedIndex=rangeIndex;
         }
          if(durationIndex === PowerListAgnostic.durationArray.indexOf("Instant")) document.getElementById(sectionName+"SelectDurationHolder"+rowIndex).innerHTML=PowerListAgnostic.durationInstantString;
         else
         {
             document.getElementById(sectionName+"SelectDurationHolder"+rowIndex).innerHTML="<select id='"+sectionName+"SelectDuration"+rowIndex+"' onChange='Main."+sectionName+"Section.selectDuration("+rowIndex+");'><option>Concentration</option><option>Sustained</option><option>Continuous</option><option>Permanent</option></select>";
             document.getElementById(sectionName+"SelectDuration"+rowIndex).selectedIndex=durationIndex;
         }
      }
       document.getElementById(sectionName+"Rank"+rowIndex).value=rank;  //must come first
       modifierSection.setAll();
       var totalRankCost=baseCost+modifierSection.rankTotal;
       if(totalRankCost > 0) document.getElementById(sectionName+"TotalCostPerRank"+rowIndex).innerHTML=totalRankCost;
       else document.getElementById(sectionName+"TotalCostPerRank"+rowIndex).innerHTML=" (1/"+(2-totalRankCost)+") ";  //awesome
       document.getElementById(sectionName+"FlatModifierCost"+rowIndex).innerHTML=modifierSection.flatTotal;
       document.getElementById(sectionName+"RowTotal"+rowIndex).innerHTML=this.totalCost;  //must have already been calculated
   };
   this.getName=function(){return name;};
   this.getUniqueName=function(){return name+": "+text+"; "+modifierSection.getUniqueName();};  //text might be empty
   //constructor:
    this.setChoiceIndex(0);
};
