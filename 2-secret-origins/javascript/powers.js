/*Call List onChange
Select Power: select(rowIndex);
Base: changeBaseCost(rowIndex);
Text: changeText(rowIndex);
Action: selectAction(rowIndex);
Range: selectRange(rowIndex);
Duration: selectDuration(rowIndex);
(see modifier file)
Rank: changeRank(rowIndex);
*/
function PowerListAgnostic(sectionName){
   //static:
    PowerListAgnostic.allPowerBaseCost=convertToHash([["Attain Knowledge", 2], ["Communication", 4], ["Comprehend", 2], ["Concealment", 2], ["Create", 2], ["Enhanced Trait", 2], ["Flight", 2], ["Growth", 6], ["Healing", 2], ["Immortality", 5], ["Insubstantial", 5], ["Luck Control", 3], ["Mental Transform", 2], ["Mind Reading", 2], ["Mind Switch", 7], ["Move Object", 2], ["Movement", 2], ["Nullify", 3], ["Phantom Ranks", 5], ["Regeneration", 3], ["Resistance", 3], ["Shrinking", 3], ["Summon Minion", 5], ["Summon Object", 2], ["Teleport", 2], ["Transform", 2], ["Variable", 7], ["A God I Am", 5], ["Reality Warp", 5], ["Morph", 1], ["Summon", 2]], 1);
    PowerListAgnostic.allPowersWithAnInputBaseCost = ["Attain Knowledge", "Concealment", "Enhanced Trait", "Environment", "Feature", "Illusion", "Remote Sensing", "Senses", "Transform"];
    PowerListAgnostic.actionArray = ["Slow", "Full", "Standard", "Move", "Free", "Reaction", "Triggered", "None"];  //None isn't a choice
    PowerListAgnostic.actionHash = convertToHash([["Communication", "Free"], ["Comprehend", "None"], ["Concealment", "Free"], ["Enhanced Trait", "Free"], ["Feature", "None"], ["Flight", "Free"], ["Growth", "Free"], ["Immortality", "None"], ["Immunity", "None"], ["Insubstantial", "Free"], ["Leaping", "Free"], ["Luck Control", "Reaction"], ["Morph", "Free"], ["Movement", "Free"], ["Permeate", "Free"], ["Phantom Ranks", "Free"], ["Protection", "None"], ["Quickness", "Free"], ["Regeneration", "None"], ["Remote Sensing", "Free"], ["Resistance", "None"], ["Senses", "None"], ["Shrinking", "Free"], ["Teleport", "Move"], ["Variable", "Full"], ["A God I Am", "Triggered"], ["Reality Warp", "Free"], ["Burrowing", "Free"], ["Elongation", "Free"], ["Extra Limbs", "None"], ["Speed", "Free"], ["Swimming", "Free"]], "Standard");
    PowerListAgnostic.rangeArray = ["Close", "Ranged", "Perception", "Personal"];  //Personal isn't a choice
    PowerListAgnostic.rangeHash = new Hash({"Affliction": "Close", "Create": "Ranged", "Damage": "Close", "Environment": "Close", "Healing": "Close", "Illusion": "Perception", "Luck Control": "Perception", "Mental Transform": "Close", "Mind Reading": "Perception", "Mind Switch": "Close", "Move Object": "Ranged", "Nullify": "Ranged", "Summon Minion": "Close", "Summon Object": "Close", "Transform": "Close", "Weaken": "Close", "Reality Warp": "Perception", "Deflect": "Ranged", "Summon": "Close"}, "Personal");
       //PowerListAgnostic.rangeHash = convertToHash([["Affliction", "Close"], ["Create", "Ranged"], ["Damage", "Close"], ["Environment", "Close"], ["Healing", "Close"], ["Illusion", "Perception"], ["Luck Control", "Perception"], ["Mental Transform", "Close"], ["Mind Reading", "Perception"], ["Mind Switch", "Close"], ["Move Object", "Ranged"], ["Nullify", "Ranged"], ["Summon Minion", "Close"], ["Summon Object", "Close"], ["Transform", "Close"], ["Weaken", "Close"], ["Reality Warp", "Perception"]], "Personal");
    PowerListAgnostic.durationArray = ["Concentration", "Sustained", "Continuous", "Permanent", "Instant"];  //Instant isn't a choice and Permanent cost weird
    PowerListAgnostic.durationHash = convertToHash([["Affliction", "Instant"], ["Attain Knowledge", "Instant"], ["Comprehend", "Permanent"], ["Damage", "Instant"], ["Feature", "Permanent"], ["Healing", "Instant"], ["Immortality", "Permanent"], ["Immunity", "Permanent"], ["Leaping", "Instant"], ["Luck Control", "Instant"], ["Mental Transform", "Instant"], ["Mind Switch", "Continuous"], ["Nullify", "Instant"], ["Protection", "Permanent"], ["Regeneration", "Permanent"], ["Resistance", "Permanent"], ["Senses", "Permanent"], ["Teleport", "Instant"], ["Weaken", "Instant"], ["A God I Am", "Continuous"], ["Reality Warp", "Continuous"], ["Deflect", "Instant"], ["Extra Limbs", "Permanent"]], "Sustained");
    PowerListAgnostic.actionNoneString = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>None</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    PowerListAgnostic.rangePersonalString = "&nbsp;&nbsp;&nbsp;&nbsp;<b>Personal</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    PowerListAgnostic.durationInstantString = "&nbsp;&nbsp;&nbsp;&nbsp;<b>Instant</b>";  //doesn't need trailing spaces since nothing comes after it
   //public:
    this.total=0;
    if(sectionName=="equipment") this.totalMax=0;
    this.protectionRankTotal=0;
    this.attackEffectRanks = new Hash({}, 0);
    this.usingGodhoodPowers=false;
    this.powerRowActionSelect=["<select id='"+sectionName+"SelectAction", "' onChange='Main."+sectionName+"Section.selectAction(", ");'><option>Slow</option><option>Full</option><option>Standard</option><option>Move</option><option>Free</option><option>Reaction</option><option>Triggered</option></select>"];
    this.powerRowDurationSelect=["<select id='"+sectionName+"SelectDuration", "' onChange='Main."+sectionName+"Section.selectDuration(", ");'><option>Concentration</option><option>Sustained</option><option>Continuous</option><option>Permanent</option></select>"];
    this.powerRowRangeSelect=["<select id='"+sectionName+"SelectRange", "' onChange='Main."+sectionName+"Section.selectRange(", ");'><option>Close</option><option>Ranged</option><option>Perception</option></select>"];
    this.powerFeatureRowDurationSelect=["<select id='"+sectionName+"SelectDuration", "' onChange='Main."+sectionName+"Section.selectDuration(", ");'><option>Concentration</option><option>Sustained</option><option>Continuous</option><option>Permanent</option><option>Instant</option></select>"];  //TODO use these
    this.powerFeatureRowRangeSelect=["<select id='"+sectionName+"SelectRange", "' onChange='Main."+sectionName+"Section.selectRange(", ");'><option>Close</option><option>Ranged</option><option>Perception</option><option>Personal</option></select>"];  //TODO use if to move personal to front
    this.powerRowBaseCost=["<input type='text' size='1' value='0' id='"+sectionName+"BaseCost", "' onChange='Main."+sectionName+"Section.changeBaseCost(", ");' />"];
    this.modifierRankRowParts=["<input type='text' size='1' value='1' id='"+sectionName+"ModifierRank", "' onChange='Main."+sectionName+"Section.changeModifierRank(\"", "\")' />"];
       //needs to be here so that it is public and has the right section
   //private:
    var allPowerNames=["Affliction", "Attain Knowledge", "Communication", "Comprehend", "Concealment", "Create", "Damage", "Enhanced Trait", "Environment", "Feature", "Flight", "Growth", "Healing", "Illusion", "Immortality", "Immunity", "Insubstantial", "Leaping", "Luck Control", "Mental Transform", "Mind Reading", "Mind Switch", "Morph", "Move Object", "Movement", "Nullify", "Permeate", "Phantom Ranks", "Protection", "Quickness", "Regeneration", "Remote Sensing", "Resistance", "Senses", "Shrinking", "Summon Minion", "Summon Object", "Teleport", "Transform", "Variable", "Weaken", "A God I Am", "Reality Warp"];
    var godhoodString="<option>Weaken</option><option>A God I Am</option><option>Reality Warp</option></select>";
    var godhoodArray=["Weaken", "A God I Am", "Reality Warp"];
    //godhood powers use powerRowParts with replaced text
    var powerRowPartsWithModifiers=["<select id='"+sectionName+"Choices", "' onChange='Main."+sectionName+"Section.select(", ");'><option>Select One</option><option>Affliction</option><option>Attain Knowledge</option><option>Communication</option><option>Comprehend</option><option>Concealment</option><option>Create</option><option>Damage</option><option>Enhanced Trait</option><option>Environment</option><option>Feature</option><option>Flight</option><option>Growth</option><option>Healing</option><option>Illusion</option><option>Immortality</option><option>Immunity</option><option>Insubstantial</option><option>Leaping</option><option>Luck Control</option><option>Mental Transform</option><option>Mind Reading</option><option>Mind Switch</option><option>Morph</option><option>Move Object</option><option>Movement</option><option>Nullify</option><option>Permeate</option><option>Phantom Ranks</option><option>Protection</option><option>Quickness</option><option>Regeneration</option><option>Remote Sensing</option><option>Resistance</option><option>Senses</option><option>Shrinking</option><option>Summon Minion</option><option>Summon Object</option><option>Teleport</option><option>Transform</option><option>Variable</option><option>Weaken</option></select><span id='"+sectionName+"Remainder", "' style='display:none'> Base Cost per Rank: <span id='"+sectionName+"BaseCostHolder", "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><input type='text' value='Other Text' id='"+sectionName+"Text", "' onChange='Main."+sectionName+"Section.changeText(", ");' size='90' /><br /><table width='100%'><tr><td width='34%' style='text-align:right;'>Action <span id='"+sectionName+"SelectActionHolder", "'>"+PowerListAgnostic.actionNoneString+"</span></td><td colspan='2' width='66%'> Range <span id='"+sectionName+"SelectRangeHolder", "'>"+PowerListAgnostic.rangePersonalString+"</span> Duration <span id='"+sectionName+"SelectDurationHolder", "'>"+PowerListAgnostic.durationInstantString+"</span></td></tr>"];
    //arrays doesn't need to be updated since sectionName can't change
    var finalPowerRowParts=["</table>Ranks: <input type='text' size='1' value='1' id='"+sectionName+"Rank", "' onChange='Main."+sectionName+"Section.changeRank(", ");' /> Total Cost per Rank: <span id='"+sectionName+"TotalCostPerRank", "'>0</span> Total Flat Modifier Cost: <span id='"+sectionName+"FlatModifierCost", "'>0</span> = <span id='"+sectionName+"RowTotal", "'>0</span><br /></span>"];
    var rowArray = [new PowerObjectAgnostic(0, sectionName)];
   this.changeRules = function(){
      if (Main.useOldRules)
      {
          PowerListAgnostic.allPowerBaseCost.set("Growth", 2);
          PowerListAgnostic.allPowerBaseCost.set("Immortality", 2);
          PowerListAgnostic.allPowerBaseCost.set("Morph", 5);
          PowerListAgnostic.allPowerBaseCost.set("Nullify", 1);
          PowerListAgnostic.allPowerBaseCost.set("Regeneration", 1);
          PowerListAgnostic.allPowerBaseCost.set("Shrinking", 2);
          PowerListAgnostic.actionHash.set("Variable", "Standard");
          powerRowPartsWithModifiers[2]=");'><option>Select One</option><option>Affliction</option><option>Burrowing</option><option>Communication</option><option>Comprehend</option><option>Concealment</option><option>Create</option><option>Damage</option><option>Deflect</option><option>Elongation</option><option>Enhanced Trait</option><option>Environment</option><option>Extra Limbs</option><option>Feature</option><option>Flight</option><option>Growth</option><option>Healing</option><option>Illusion</option><option>Immortality</option><option>Immunity</option><option>Insubstantial</option><option>Leaping</option><option>Luck Control</option><option>Mind Reading</option><option>Morph</option><option>Move Object</option><option>Movement</option><option>Nullify</option><option>Protection</option><option>Quickness</option><option>Regeneration</option><option>Remote Sensing</option><option>Senses</option><option>Shrinking</option><option>Speed</option><option>Summon</option><option>Swimming</option><option>Teleport</option><option>Transform</option><option>Variable</option><option>Weaken</option></select><span id='"+sectionName+"Remainder";
          allPowerNames=["Affliction", "Burrowing", "Communication", "Comprehend", "Concealment", "Create", "Damage", "Deflect", "Elongation", "Enhanced Trait", "Environment", "Extra Limbs", "Feature", "Flight", "Growth", "Healing", "Illusion", "Immortality", "Immunity", "Insubstantial", "Leaping", "Luck Control", "Mind Reading", "Morph", "Move Object", "Movement", "Nullify", "Protection", "Quickness", "Regeneration", "Remote Sensing", "Senses", "Shrinking", "Speed", "Summon", "Swimming", "Teleport", "Transform", "Variable", "Weaken", "A God I Am", "Reality Warp"];
          this.powerRowActionSelect[2]=");'><option>Standard</option><option>Move</option><option>Free</option><option>Reaction</option></select>";
          PowerListAgnostic.actionArray = ["Standard", "Move", "Free", "Reaction", "None"];  //None isn't a choice
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
          powerRowPartsWithModifiers[2]=");'><option>Select One</option><option>Affliction</option><option>Attain Knowledge</option><option>Communication</option><option>Comprehend</option><option>Concealment</option><option>Create</option><option>Damage</option><option>Enhanced Trait</option><option>Environment</option><option>Feature</option><option>Flight</option><option>Growth</option><option>Healing</option><option>Illusion</option><option>Immortality</option><option>Immunity</option><option>Insubstantial</option><option>Leaping</option><option>Luck Control</option><option>Mental Transform</option><option>Mind Reading</option><option>Mind Switch</option><option>Morph</option><option>Move Object</option><option>Movement</option><option>Nullify</option><option>Permeate</option><option>Phantom Ranks</option><option>Protection</option><option>Quickness</option><option>Regeneration</option><option>Remote Sensing</option><option>Resistance</option><option>Senses</option><option>Shrinking</option><option>Summon Minion</option><option>Summon Object</option><option>Teleport</option><option>Transform</option><option>Variable</option><option>Weaken</option></select><span id='"+sectionName+"Remainder";
          allPowerNames=["Affliction", "Attain Knowledge", "Communication", "Comprehend", "Concealment", "Create", "Damage", "Enhanced Trait", "Environment", "Feature", "Flight", "Growth", "Healing", "Illusion", "Immortality", "Immunity", "Insubstantial", "Leaping", "Luck Control", "Mental Transform", "Mind Reading", "Mind Switch", "Morph", "Move Object", "Movement", "Nullify", "Permeate", "Phantom Ranks", "Protection", "Quickness", "Regeneration", "Remote Sensing", "Resistance", "Senses", "Shrinking", "Summon Minion", "Summon Object", "Teleport", "Transform", "Variable", "Weaken", "A God I Am", "Reality Warp"];
          this.powerRowActionSelect[2]=");'><option>Slow</option><option>Full</option><option>Standard</option><option>Move</option><option>Free</option><option>Reaction</option><option>Triggered</option></select>";
          PowerListAgnostic.actionArray = ["Slow", "Full", "Standard", "Move", "Free", "Reaction", "Triggered", "None"];  //None isn't a choice
      }
      for(var i=0; i < rowArray.length; i++)  //include last blank row
          {rowArray[i].changeRules();}
   };
   this.clear = function(){
       rowArray = [new PowerObjectAgnostic(0, sectionName)];
       this.generate();
       this.update();
   }
   this.select = function(rowIndex){
       rowArray[rowIndex].select();
       this.generate();
       this.update();
   }
   this.selectAction = function(rowIndex){
       rowArray[rowIndex].selectAction();
       this.generate();  //need to make more modifier rows
       this.update();
   }
   this.selectRange = function(rowIndex){
       rowArray[rowIndex].selectRange();
       this.generate();
       this.update();
   }
   this.selectDuration = function(rowIndex){
       rowArray[rowIndex].selectDuration();
       this.generate();
       this.update();
   }
   this.changeText = function(rowIndex){
       rowArray[rowIndex].changeText();
       this.update();
   };
   this.changeBaseCost = function(rowIndex){
       rowArray[rowIndex].changeBaseCost();
       this.update();
   };
   this.selectModifier = function(totalIndex){
       var indexArray=totalIndex.split(".");
       var powerRowIndex=parseInt(indexArray[0]);
       rowArray[powerRowIndex].selectModifier(parseInt(indexArray[1]));  //calls calculateTotal()
       this.generate();
       this.update();  //total is calculated again here
       //below could be put in own function requestRangeSet called by modifier.select but that's silly
      if (rowArray[powerRowIndex].doesHaveAttack() && document.getElementById(sectionName+"SelectRangeHolder"+powerRowIndex).innerHTML==PowerListAgnostic.rangePersonalString)
      //if there is a modifier for making personal range effects into close and the effect is still personal then change it to close
      {
          rowArray[powerRowIndex].setRange("Close");
          this.generate();  //set the range
          //don't need to update because the costs haven't changed
      }
      else if(!rowArray[powerRowIndex].doesHaveAttack() && document.getElementById(sectionName+"SelectRangeHolder"+powerRowIndex).innerHTML!=PowerListAgnostic.rangePersonalString)
      {
          rowArray[powerRowIndex].setRange("Personal");
          this.generate();  //must generate in case the number of modifier rows has changed again
      }
   }
   this.changeModifierRank = function(totalIndex){
       var indexArray=totalIndex.split(".");
       rowArray[parseInt(indexArray[0])].changeModifierRank(parseInt(indexArray[1]));
       this.update();
   }
   this.changeModifierText = function(totalIndex){
       var indexArray=totalIndex.split(".");
       rowArray[parseInt(indexArray[0])].changeModifierText(parseInt(indexArray[1]));
       this.update();
   }
   this.changeRank = function(rowIndex){
       rowArray[rowIndex].changeRank();
       this.update();
   };
   this.update = function(){
       this.calculateValues();
       this.setAll();  //for the totals
       this.total=0;
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {this.total+=rowArray[i].totalCost;}
      if (sectionName=="equipment")  //power section.totalMax is undefined
          if(this.total > this.totalMax || this.total+5 <= this.totalMax) Main.advantageSection.correctEquipmentRank();  //too low or too high advantage rank
       Main.updateOffense();
       Main.defenseSection.calculateValues();
       Main.update();  //updates totals and power level
   };
   this.generate = function(){
       var allPowerRows="";
      for (var i=0; i < rowArray.length; i++)
      {
          allPowerRows+=generateRow(powerRowPartsWithModifiers, i);
          allPowerRows+=rowArray[i].generate();  //this makes the modifiers
          allPowerRows+=generateRow(finalPowerRowParts, i);
      }
      if (rowArray[rowArray.length-1].getChoiceIndex()!=0)  //if last row isn't blank add one
      {
          rowArray.push(new PowerObjectAgnostic(rowArray.length, sectionName));
          allPowerRows+=generateRow(powerRowPartsWithModifiers, rowArray.length-1);
          allPowerRows+=rowArray[rowArray.length-1].generate();
          allPowerRows+=generateRow(finalPowerRowParts, rowArray.length-1);
      }
       //if(Main!=undefined && Main.godHoodSwitch && sectionName!="equipment") allPowerRows=allPowerRows.replace(/<option>Weaken<\/option><\/select>/g, godhoodString);  
       document.getElementById(sectionName+" section").innerHTML=allPowerRows;
      if (Main!=undefined && Main.godHoodSwitch && sectionName!="equipment")  //equipment can't be god-like
      {
          for(var i=0; i < rowArray.length; i++)
             addOptionArray(sectionName+"Choices"+i, godhoodArray);
      }
       this.setAll();
   };
   this.calculateValues = function(){
       this.attackEffectRanks.clear();  //TODO: the hash needs to be Name -> string of base and rank. currently non-unique will overwrite. then update power level and offense
       this.protectionRankTotal=0;
       this.usingGodhoodPowers=false;
       var namesSoFar=new Array();
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          if(rowArray[i].getChoiceIndex()==0){this.removeRow(i); i--; continue;}  //remove blank rows
          rowArray[i].autoSetTotalChangers(rowArray[i].calculateRawTotal());  //total before removable/ alt effect
          rowArray[i].calculateTotal();  //total after those
          var bigPowerName = rowArray[i].getUniqueName();  //this includes all modifiers since you may have the same power with different modifiers
          if(namesSoFar.contains(bigPowerName)){this.removeRow(i); i--; continue;}  //remove redundant row
          namesSoFar.push(bigPowerName);
          var basePowerName = rowArray[i].name;
          var rank=rowArray[i].getRank();
          if(basePowerName=="A God I Am" || basePowerName=="Reality Warp") this.usingGodhoodPowers=true;
          else if(basePowerName=="Affliction" || basePowerName=="Damage" || basePowerName=="Mental Transform" || basePowerName=="Mind Switch" || basePowerName=="Nullify" || basePowerName=="Weaken") this.attackEffectRanks.add(basePowerName, rank);
          //there could be an attack array but I'm not going to bother since later the attack modifier will change everything
          //TODO later: if range is not personal add to attack hash
          else if(basePowerName=="Protection" && rank > this.protectionRankTotal) this.protectionRankTotal=rank;  //protection doesn't stack and may have more than 1
          document.getElementById(sectionName+"RowTotal"+i).innerHTML=rowArray[i].totalCost;
      }
       /*//should always have unarmed damage
       var abilityValue=Main.abilitySection.get("Strength");
       if(abilityValue == "--" || sectionName=="equipment") return;  //don't add if -- and only add once in powers
       this.attackEffectRanks.add("Damage", abilityValue);*/
   };
   this.setAll = function(){
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
         {rowArray[i].setValues();}
   };
   this.removeRow = function(rowIndex){  //is only called during update so don't call update at end
       rowArray.splice(rowIndex, 1);  //remove from array
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setRowIndex(i);}  //correct all indexing
       this.generate();
   };
   this.save = function(){
       var capsSectionName = sectionName.substring(0, 1).toUpperCase() + sectionName.substring(1);
       //xml must have caps but everything else must be lower
       if(sectionName=="power") capsSectionName+="s";
       if(rowArray.length==1) return " <"+capsSectionName+"></"+capsSectionName+">\n";  //the only row is the empty one: ie there are no rows
       var fileString="<"+capsSectionName+">\n";
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       fileString+="   </"+capsSectionName+">\n";
       return fileString;
   };
   this.load = function(xmlSection){
       rowArray = [new PowerObjectAgnostic(0, sectionName)];  //redundant since Main.load calls Main.clear before coming here
      for (var i=0, j=0; i < xmlSection.length; i++)
      {
          var indexToUse=allPowerNames.indexOf(xmlSection[i].getAttribute("name"));
          if(indexToUse == -1){alert("Load Error: "+xmlSection[i].getAttribute("name")+" is not a power name."); continue;}  //not found
          if((indexToUse == allPowerNames.indexOf("A God I Am") || indexToUse == allPowerNames.indexOf("Reality Warp")) && !Main.godHoodSwitch){alert("Load Error: "+allPowerNames[indexToUse]+" is the power listed without transcendence (="+parseInt(document.getElementById("transcendence").value)+")"); continue;}
          indexToUse++;  //to avoid default
          rowArray[j].name=xmlSection[i].getAttribute("name");  //must be done before setChoiceIndex
          rowArray[j].setChoiceIndex(indexToUse);  //must be done before all others
          rowArray[j].setBaseCost(xmlSection[i].getAttribute("cost"));
          rowArray[j].setText(xmlSection[i].getAttribute("text"));
          rowArray[j].setAction(xmlSection[i].getAttribute("action"));  //all sets take strings
          rowArray[j].setRange(xmlSection[i].getAttribute("range"));
          rowArray[j].setDuration(xmlSection[i].getAttribute("duration"));
          if(xmlSection[i].getElementsByTagName("Modifier").length > 0) rowArray[j].load(xmlSection[i].getElementsByTagName("Modifier"));  //only load them if they exist
          rowArray[j].setRank(xmlSection[i].getAttribute("rank"));
          rowArray.push(new PowerObjectAgnostic(j+1, sectionName));  //add a new blank data row
          j++;  //rowArray index will be correct even if load error
      }
       this.generate();
       this.update();
   };
   //constructor:
    this.generate();
};  //TODO: make PowerObjectAgnostic private object to the list, then make alot more of list members private
function PowerObjectAgnostic(rowIndexPassed, sectionName){
   //public:
    this.name="";
    this.totalCost=0;
   //private:
    var rowIndex=rowIndexPassed;  //because rowIndex can change
    var choiceIndex=0;  //mostly used to check if the row is blank
    var canSetBaseCost=false;
    var baseCost=0;
    var text="";
    var actionIndex=0;
    var rangeIndex=0;
    var durationIndex=0;
    var rank=0;
    var modifierSection=new ModifierList(rowIndex, sectionName);
   this.setRowIndex = function(indexGiven){rowIndex=indexGiven; modifierSection.setSectionRowIndex(rowIndex);};
   this.changeRules = function(){modifierSection.changeRules();};
   this.generate = function(){return modifierSection.generate();};
   this.save = function()
   {
       var fileString="      <Row name=\""+this.name+"\" ";
       if(canSetBaseCost) fileString+="cost=\""+baseCost+"\" ";
       fileString+="text=\""+text+"\" ";
       if(document.getElementById(sectionName+"SelectAction"+rowIndex)!=undefined) fileString+="action=\""+document.getElementById(sectionName+"SelectAction"+rowIndex).options[actionIndex].text+"\" ";
       else fileString+="action=\"None\" ";
       if(document.getElementById(sectionName+"SelectRange"+rowIndex)!=undefined) fileString+="range=\""+document.getElementById(sectionName+"SelectRange"+rowIndex).options[rangeIndex].text+"\" ";
       else fileString+="range=\"Personal\" ";
       if(document.getElementById(sectionName+"SelectDuration"+rowIndex)!=undefined) fileString+="duration=\""+document.getElementById(sectionName+"SelectDuration"+rowIndex).options[durationIndex].text+"\" ";
       else fileString+="duration=\"Instant\" ";
       fileString+="rank=\""+rank+"\"";  //must be before modifiers
       fileString=modifierSection.save(fileString);  //with self close if there are no modifiers (only passed for the leading space)
       if(fileString.split(">\n").length!=2) fileString+="      </Row>\n";  //if there were any modifiers
       return fileString;
   };
   this.load = function(xmlSection){modifierSection.load(xmlSection);};
   this.doesHaveAttack = function(){return modifierSection.hasAttack;};  //some of these are just bridges
   this.selectModifier = function(modifierIndex){modifierSection.select(modifierIndex); this.calculateTotal(); this.setValues();};
   this.changeModifierRank = function(modifierIndex){modifierSection.changeRank(modifierIndex); this.calculateTotal(); this.setValues();};  //update rank and spans
   this.changeModifierText = function(modifierIndex){modifierSection.changeText(modifierIndex);};
   this.autoSetTotalChangers = function(rawTotal){modifierSection.autoSetTotalChangers(rawTotal); this.calculateTotal();};  //don't need to set since this is only called right before generate anyway
   this.autoRemoveRowRequestAttacks = function(modifierIndex){modifierSection.autoRemoveRowRequestAttacks();};
   this.select = function(){
       this.name = getOption(sectionName+"Choices"+rowIndex, "text");  //must be done first
       this.setChoiceIndex(document.getElementById(sectionName+"Choices"+rowIndex).selectedIndex);
   };
   this.getChoiceIndex = function(){return choiceIndex;};
   this.setChoiceIndex = function(indexGiven){
       choiceIndex=sanitizeNumber(indexGiven, 0, 0);
       modifierSection.clear();  //always clear them out on select
      if (choiceIndex==0)
      {
          this.name="";
          this.totalCost=0;
          canSetBaseCost=false;
          baseCost=0;
          text="";
          actionIndex=0;
          rangeIndex=0;
          durationIndex=0;
          rank=0;
          return;  //TODO: have the constructor call this so that the default values are only listed in one place
      }
       canSetBaseCost=PowerListAgnostic.allPowersWithAnInputBaseCost.contains(this.name);
       baseCost=PowerListAgnostic.allPowerBaseCost.get(this.name);
       text="Descriptors and other text";
       actionIndex=PowerListAgnostic.actionArray.indexOf(PowerListAgnostic.actionHash.get(this.name));
       rangeIndex=PowerListAgnostic.rangeArray.indexOf(PowerListAgnostic.rangeHash.get(this.name));
       durationIndex=PowerListAgnostic.durationArray.indexOf(PowerListAgnostic.durationHash.get(this.name));
       rank=1;
       this.calculateTotal();  //called for things like godhood powers
   };
   this.changeText = function(){
       this.setText(document.getElementById(sectionName+"Text"+rowIndex).value);
       //document.getElementById(sectionName+"Text"+rowIndex).value=text;  //always the same
   };
   this.setText = function(textGiven){text=textGiven;};
   this.selectAction = function(){  //can only be called if SelectAction exists
       this.setAction(getOption(sectionName+"SelectAction"+rowIndex, "text"));
       document.getElementById(sectionName+"SelectAction"+rowIndex).selectedIndex=actionIndex;
   };
   this.setAction = function(actionGiven){
       var baseActionName=PowerListAgnostic.actionHash.get(this.name);  //only used twice
       Logger.log("setAction(); baseActionName="+baseActionName+"; actionGiven="+actionGiven);
       var baseActionIndex=PowerListAgnostic.actionArray.indexOf(baseActionName);
       if(baseActionName=="None" && actionGiven!="None") baseActionIndex=PowerListAgnostic.actionArray.indexOf("Free");  //calculate distance from free
       var newIndex=PowerListAgnostic.actionArray.indexOf(actionGiven);
       if(newIndex==-1){actionIndex=baseActionIndex; return;}  //if not found (only possible when loading)
       if(actionIndex==newIndex) return;  //nothing has changed
       if(actionGiven=="None" || this.name=="Feature") modifierSection.autoSetAction(0);  //clear out the action modifiers. feature does this to add selective
       //else if(this.name=="Feature"){}  //do nothing so that the action modifiers don't clear out and aren't autoset
       else modifierSection.autoSetAction(newIndex-baseActionIndex);
       actionIndex=newIndex;
   };
   this.selectRange = function(){
       //if(rangeIndex==PowerListAgnostic.rangeArray.indexOf("Personal") && this.name!="Feature") return;  //only Feature can change duration from Personal (without modifiers)
       this.setRange(getOption(sectionName+"SelectRange"+rowIndex, "text"));
       document.getElementById(sectionName+"SelectRange"+rowIndex).selectedIndex=rangeIndex;
   };
   this.setRange = function(rangeGiven){
       var baseRangeName=PowerListAgnostic.rangeHash.get(this.name);
       //if(this.name!="Feature" && (baseRangeName!="Personal" && rangeGiven=="Personal")) return;  //only Feature can change duration to Personal
      if (rangeGiven=="Personal")
      {
          modifierSection.autoRemoveRowRequestAttacks();  //remove range modifiers
          if(baseRangeName!="Personal") return;  //when loading bad data or if user attempts it
      }
       if(durationIndex == PowerListAgnostic.durationArray.indexOf("Permanent") && rangeGiven!="Personal") return;  //can't be Personal
       var baseRangeIndex=PowerListAgnostic.rangeArray.indexOf(baseRangeName);
       var newIndex=PowerListAgnostic.rangeArray.indexOf(rangeGiven);
       if(newIndex==-1){rangeIndex=baseRangeIndex; return;}  //if not found (only possible when loading)
       if(rangeIndex==newIndex) return;  //nothing has changed
       if(baseRangeName=="Perception") baseRangeIndex++;  //more of a flaw to get away from Perception
       else if(baseRangeName=="Personal") baseRangeIndex=PowerListAgnostic.rangeArray.indexOf("Close");  //calculate distance from close
       rangeIndex=newIndex;  //must be set before newIndex might change
       if(rangeGiven=="Perception") newIndex++;  //more of an extra to get to Perception. do not use else because if both then they should cancel
       if(this.name=="Feature"){}  //do nothing so that the modifiers are not cleared out
       else if(rangeGiven=="Personal") Logger.trace(modifierSection, modifierSection.autoSetRange, [0]);
       else modifierSection.autoSetRange(newIndex-baseRangeIndex);
       //rangeIndex already set above
   };
   this.selectDuration = function(){
       this.setDuration(getOption(sectionName+"SelectDuration"+rowIndex, "text"));
       document.getElementById(sectionName+"SelectDuration"+rowIndex).selectedIndex=durationIndex;
   };
   this.setDuration = function(durationGiven){
       var baseDurationName=PowerListAgnostic.durationHash.get(this.name);
       Logger.log("setDuration(); baseDurationName="+baseDurationName+"; durationGiven="+durationGiven);
       //if(this.name!="Feature" && (durationGiven=="Instant" || baseDurationName=="Instant")) return;  //only feature can change duration to or from Instant
       Logger.log("rangeIndex="+rangeIndex+" vs "+PowerListAgnostic.rangeArray.indexOf("Personal"));
       if(rangeIndex != PowerListAgnostic.rangeArray.indexOf("Personal") && durationGiven=="Permanent") return;  //can't be Permanent
      if (this.name=="Feature")
      {
          if(durationGiven=="Permanent") this.setAction("None");  //set action to None (resets action modifiers)
          else if(actionIndex == PowerListAgnostic.actionArray.indexOf("None")) this.setAction("Free");  //reset action to Free
      }
      else
      {
         if (durationGiven=="Permanent")
         {
             Logger.down();
             this.setAction("None");  //set action to None (resets action modifiers)
             if(baseDurationName=="Permanent") modifierSection.autoRemoveRowRequest("Sustained");  //returning to base duration
             else modifierSection.autoAddRowRequest("Permanent");
             Logger.up();
         }
         else if (actionIndex==PowerListAgnostic.actionArray.indexOf("None"))  //if the action is none but duration is not Permanent
         {  //meaning that is was Permanent but is being switched back
             Logger.down();
            if (baseDurationName=="Permanent")  //changing from base duration
            {
                this.setAction("Free");  //becomes Free action
                modifierSection.autoAddRowRequest("Sustained");
            }
            else
            {
                this.setAction(PowerListAgnostic.actionHash.get(this.name));  //must reset action first
                modifierSection.autoRemoveRowRequest("Permanent");
            }
             Logger.up();
         }
      }
       var baseDurationIndex=PowerListAgnostic.durationArray.indexOf(baseDurationName);
       var newIndex=PowerListAgnostic.durationArray.indexOf(durationGiven);
       if(newIndex==-1){durationIndex=baseDurationIndex; return;}  //if not found (only possible when loading)
       if(durationIndex==newIndex) return;  //nothing has changed
       durationIndex=newIndex;  //must be set before newIndex might be changed
       if(baseDurationName=="Permanent") baseDurationIndex-=2;  //is a +1 extra instead of a -1 flaw
       if(durationGiven=="Permanent") newIndex-=2;  //is a -1 flaw instead of a +1 extra
       //do not use else because it is both when returning to the default of Permanent
       if(this.name=="Feature"){}  //do nothing so that the modifiers are not reset
       else Logger.trace(modifierSection, modifierSection.autoSetDuration, [newIndex-baseDurationIndex]);
       //the durationIndex was set above
   };
   this.changeBaseCost = function(){  //won't be called if you can't set base cost
       this.setBaseCost(document.getElementById(sectionName+"BaseCost"+rowIndex).value);
       document.getElementById(sectionName+"BaseCost"+rowIndex).value=baseCost;
   };
   this.setBaseCost = function(baseGiven){
       baseCost=sanitizeNumber(baseGiven, 1, PowerListAgnostic.allPowerBaseCost.get(this.name));  //unique defaults
       this.calculateTotal();
   };
   this.changeRank = function(){
       this.setRank(document.getElementById(sectionName+"Rank"+rowIndex).value);
       document.getElementById(sectionName+"Rank"+rowIndex).value=rank;
       //setRank calls calculateTotal
   };
   this.getRank = function(){return rank;};
   this.setRank = function(rankGiven){
       rank=sanitizeNumber(rankGiven, 1, 1);
       this.calculateTotal();
   };
   this.calculateTotal = function(){
      while (true)  //using a loop instead of recursion
      {
          var costPerRank=baseCost+modifierSection.rankTotal;
          if(costPerRank < 1) costPerRank=1/(2-costPerRank);
          var rowTotal=Math.ceil(costPerRank*rank);  //round up
          var flatValue=modifierSection.flatTotal;
          if(this.name=="A God I Am") flatValue+=145;  //for first rank
          else if(this.name=="Reality Warp") flatValue+=75;
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
   this.calculateRawTotal = function(){
       modifierSection.clearTotalChangers();
      while (true)  //using a loop instead of recursion
      {
          var costPerRank=baseCost+modifierSection.rankTotal;
          if(costPerRank < 1) costPerRank=1/(2-costPerRank);
          var rowTotal=Math.ceil(costPerRank*rank);  //round up
          var flatValue=modifierSection.flatTotal;
          if(this.name=="A God I Am") flatValue+=145;  //for first rank
          else if(this.name=="Reality Warp") flatValue+=75;
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
   this.setValues = function(){
       document.getElementById(sectionName+"Choices"+rowIndex).selectedIndex=choiceIndex;
       if(choiceIndex==0){document.getElementById(sectionName+"Remainder"+rowIndex).style.display="none"; return;}
       document.getElementById(sectionName+"Remainder"+rowIndex).style.display="inline";
      if (canSetBaseCost)
      {
          document.getElementById(sectionName+"BaseCostHolder"+rowIndex).innerHTML=generateRow(Main[sectionName+"Section"].powerRowBaseCost, rowIndex);
          document.getElementById(sectionName+"BaseCost"+rowIndex).value=baseCost;
      }
       else document.getElementById(sectionName+"BaseCostHolder"+rowIndex).innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+baseCost+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          //fragile string but it has 2 parts and is only used twice so whatever
       document.getElementById(sectionName+"Text"+rowIndex).value=text;  //might be empty
       //feature has the same action as the others
       if(actionIndex==PowerListAgnostic.actionArray.indexOf("None")) document.getElementById(sectionName+"SelectActionHolder"+rowIndex).innerHTML=PowerListAgnostic.actionNoneString;
          //could also use durationIndex==PowerListAgnostic.durationArray.indexOf("Permanent")
      else
      {
          document.getElementById(sectionName+"SelectActionHolder"+rowIndex).innerHTML=generateRow(Main[sectionName+"Section"].powerRowActionSelect, rowIndex);
          document.getElementById(sectionName+"SelectAction"+rowIndex).selectedIndex=actionIndex;
      }
      if (this.name=="Feature")  //has unique drop downs
      {
          //these 2 holders always have selects
          document.getElementById(sectionName+"SelectRangeHolder"+rowIndex).innerHTML=generateRow(Main[sectionName+"Section"].powerFeatureRowRangeSelect, rowIndex);
          document.getElementById(sectionName+"SelectRange"+rowIndex).selectedIndex=rangeIndex;
          document.getElementById(sectionName+"SelectDurationHolder"+rowIndex).innerHTML=generateRow(Main[sectionName+"Section"].powerFeatureRowDurationSelect, rowIndex);
          document.getElementById(sectionName+"SelectDuration"+rowIndex).selectedIndex=durationIndex;
      }
      else
      {
          if(rangeIndex==PowerListAgnostic.rangeArray.indexOf("Personal")) document.getElementById(sectionName+"SelectRangeHolder"+rowIndex).innerHTML=PowerListAgnostic.rangePersonalString;
         else
         {
             document.getElementById(sectionName+"SelectRangeHolder"+rowIndex).innerHTML=generateRow(Main[sectionName+"Section"].powerRowRangeSelect, rowIndex);
             document.getElementById(sectionName+"SelectRange"+rowIndex).selectedIndex=rangeIndex;
         }
          if(durationIndex==PowerListAgnostic.durationArray.indexOf("Instant")) document.getElementById(sectionName+"SelectDurationHolder"+rowIndex).innerHTML=PowerListAgnostic.durationInstantString;
         else
         {
             document.getElementById(sectionName+"SelectDurationHolder"+rowIndex).innerHTML=generateRow(Main[sectionName+"Section"].powerRowDurationSelect, rowIndex);
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
   this.getUniqueName = function(){return this.name+": "+text+"; "+modifierSection.getUniqueName();};  //text might be empty
};
