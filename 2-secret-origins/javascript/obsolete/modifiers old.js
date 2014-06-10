/*Call List onChange
Select Modifier: select(modifierRowIndex);
Rank: changeRank(modifierRowIndex);
Text: changeText(modifierRowIndex);
*/
/*Notes
Accurate: increases attack
Inaccurate: lowers attack

Fragile: first is -2 then -1 per application, lowers device toughness with min 0
    do the same thing as godhood base costs: the span... no
    until then make a note that it will need to be 2 ranks higher to have the right cost
*/
function ModifierList(sectionRowIndexPassed, sectionName){
   //static:
    ModifierList.allModifierNames=[];
    ModifierList.allModifierMaxRanks=Hash.makeFromArray([["Accurate", -1], ["Activation", 2], ["Affects Corporeal", -1], ["Affects Insubstantial", 2], ["Alternate Effect", -1], ["Ammunition", 2], ["Area", -1], ["Check Required", -1], ["Decreased Duration", 3], ["Dimensional", 3], ["Diminished Range", 1], ["Dynamic Alternate Effect", -1], ["Easily Removable", -1], ["Extended Range", -1], ["Faster Action", 6], ["Fragile", -1], ["Homing", -1], ["Impervious", -1], ["Inaccurate", -1], ["Increased Duration", 3], ["Increased Mass", -1], ["Increased Range", 4], ["Indirect", 4], ["Limited", 2], ["Other Flat Extra", -1], ["Other Flat Flaw", -1], ["Other Rank Extra", -1], ["Other Rank Flaw", -1], ["Penetrating", -1], ["Reach", -1], ["Reduced Range", 4], ["Removable", -1], ["Ricochet", -1], ["Side Effect", 2], ["Slower Action", 6], ["Split", -1], ["Subtle", 2], ["Triggered", -1], ["Variable Descriptor", 2]], 1);
    ModifierList.allModifiersType=Hash.makeFromArray([["Accurate", "Flat"], ["Activation", "Flat"], ["Affects Corporeal", "Flat"], ["Affects Insubstantial", "Flat"], ["Affects Objects Only", "Free"], ["Affects Others Only", "Free"], ["Alternate Effect", "Flat"], ["Alternate Resistance (Free)", "Free"], ["Attack", "Rank"], ["Check Required", "Flat"], ["Dimensional", "Flat"], ["Diminished Range", "Flat"], ["Dynamic Alternate Effect", "Flat"], ["Easily Removable", "Flat"], ["Existence Dependent", "Free"], ["Extended Range", "Flat"], ["Feature", "Flat"], ["Fragile", "Flat"], ["Homing", "Flat"], ["Impervious", "Flat"], ["Inaccurate", "Flat"], ["Increased Mass", "Flat"], ["Incurable", "Flat"], ["Indirect", "Flat"], ["Innate", "Rank"], ["Insidious", "Flat"], ["Linked", "Free"], ["Noticeable", "Flat"], ["Other Flat Extra", "Flat"], ["Other Flat Flaw", "Flat"], ["Other Free Modifier", "Free"], ["Penetrating", "Flat"], ["Permanent", "Free"], ["Precise", "Flat"], ["Quirk", "Flat"], ["Reach", "Flat"], ["Removable", "Flat"], ["Reversible", "Flat"], ["Ricochet", "Flat"], ["Sleep", "Free"], ["Split", "Flat"], ["Subtle", "Flat"], ["Sustained", "Free"], ["System Dependent", "Flat"], ["Triggered", "Flat"], ["Variable Descriptor", "Flat"]], "Rank");
    ModifierList.allModifierCosts=Hash.makeFromArray([["Activation", -1], ["Affects Objects Only", 0], ["Affects Others Only", 0], ["Alternate Effect", -1], ["Alternate Resistance (Free)", 0], ["Ammunition", -1], ["Attack", 1], ["Decreased Duration", -1], ["Diminished Range", -1], ["Distracting", -1], ["Dynamic Alternate Effect", -1], ["Easily Removable", -1], ["Existence Dependent", 0], ["Fades", -1], ["Feedback", -1], ["Fragile", -1], ["Grab-Based", -1], ["Impervious", 2], ["Inaccurate", -1], ["Increased Mass", 3], ["Limited", -1], ["Linked", 0], ["Noticeable", -1], ["Other Flat Flaw", -1], ["Other Free Modifier", 0], ["Other Rank Flaw", -1], ["Penetrating", 2], ["Permanent", 0], ["Quirk", -1], ["Reduced Range", -1], ["Removable", -1], ["Resistible", -1], ["Sense-Dependent", -1], ["Side Effect", -1], ["Sleep", 0], ["Slower Action", -1], ["Sustained", 0], ["System Dependent", -2], ["Tiring", -1], ["Uncontrollable Entirely", -5], ["Uncontrollable Result", -1], ["Uncontrollable Target", -1], ["Uncontrolled", -1], ["Unreliable", -1]], 1);
    ModifierList.allModifierTextHash=Hash.makeFromArray([["Activation", "Action Required"], ["Alternate Effect", "To What"], ["Alternate Resistance (Cost)", "Name of Resistance"], ["Alternate Resistance (Free)", "Name of Resistance"], ["Ammunition", "Usage Per time or reload"], ["Area", "Shape"], ["Check Required", "What Check"], ["Contagious", "Method of Spreading"], ["Dimensional", "Which Dimensions"], ["Dynamic Alternate Effect", "To What"], ["Easily Removable", "Type of item"], ["Extended Range", "Total Ranges"], ["Feature", "Description"], ["Fragile", "Total Toughness"], ["Homing", "Description or Method of targeting"], ["Increased Mass", "Total Mass"], ["Indirect", "Direction"], ["Limited", "Description"], ["Linked", "To What"], ["Noticeable", "Description"], ["Other Flat Extra", "Description"], ["Other Flat Flaw", "Description"], ["Other Free Modifier", "Description"], ["Other Rank Extra", "Description"], ["Other Rank Flaw", "Description"], ["Quirk", "Description"], ["Reach", "Total Attack Distance"], ["Removable", "Type of item"], ["Resistible", "Name of Resistance"], ["Sense-Dependent", "Name of Sense"], ["Side Effect", "Description"], ["Subtle", "Description"], ["Triggered", "Description"], ["Variable Descriptor", "Category"]], undefined);
    ModifierList.allAutoModifierNames=["Alternate Effect", "Decreased Duration", "Dynamic Alternate Effect", "Easily Removable", "Faster Action", "Increased Duration", "Increased Range", "Permanent", "Reduced Range", "Removable", "Selective", "Slower Action", "Sustained"];
   //public:
    this.rankTotal=0;
    this.flatTotal=0;
    this.hasAttack=false;
   //private:
    ModifierList.allAutoModifierCanCreate=["Alternate Effect", "Dynamic Alternate Effect", "Easily Removable", "Removable", "Selective"];
    var autoModifierNameToRowIndex=new Hash({}, -1);
    var unchangableRows=[];
    var sectionRowIndex=sectionRowIndexPassed;
    var rowArray=[new ModifierObjectAgnostic(sectionRowIndex+".0", sectionName)];
   this.changeRules=function(){
       var commonExtraNames=["Accurate", "Affects Corporeal", "Affects Objects Also", "Affects Objects Only", "Affects Others Also", "Affects Others Only", "Alternate Effect", "Alternate Resistance (Cost)", "Alternate Resistance (Free)", "Area", "Attack", "Contagious", "Dimensional", "Extended Range", "Faster Action", "Feature", "Homing", "Impervious", "Increased Duration", "Increased Mass", "Increased Range", "Indirect", "Innate", "Insidious", "Linked", "Multiattack", "Penetrating", "Precise", "Reach", "Reversible", "Ricochet", "Secondary Effect", "Selective", "Split", "Subtle", "Sustained", "Variable Descriptor"];
       var commonFlawNames=["Activation", "Check Required", "Decreased Duration", "Diminished Range", "Distracting", "Easily Removable", "Fades", "Feedback", "Grab-Based", "Inaccurate", "Limited", "Noticeable", "Permanent", "Quirk", "Reduced Range", "Removable", "Resistible", "Sense-Dependent", "Side Effect", "Slower Action", "Tiring", "Unreliable"];
       var otherNames=["Other Flat Extra", "Other Rank Extra", "Other Free Modifier", "Other Rank Flaw", "Other Flat Flaw"];
      if (Main != undefined && Main.useOldRules)
      {
          var oldExtraNames=remakeArray(commonExtraNames, ["Affects Insubstantial", "Dynamic Alternate Effect", "Incurable", "Sleep", "Triggered"]);
          var oldFlawNames=remakeArray(commonFlawNames, ["Uncontrolled"]);  //call this instead of push so that it's sorted
          ModifierList.allModifierNames=oldExtraNames.concat(oldFlawNames);

          ModifierList.allModifierMaxRanks.set("Diminished Range", 3);
          ModifierList.allModifierCosts.set("Attack", 0);
          ModifierList.allModifiersType.set("Attack", "Free");
          ModifierList.allModifierCosts.set("Impervious", 1);
          ModifierList.allModifierMaxRanks.set("Impervious", 1);
          ModifierList.allModifiersType.set("Impervious", "Rank");
          ModifierList.allModifierCosts.set("Increased Mass", 1);
          ModifierList.allModifiersType.set("Innate", "Flat");
          ModifierList.allModifierCosts.set("Penetrating", 1);
      }
      else
      {
          var newExtraNames=remakeArray(commonExtraNames, ["Existence Dependent"]);  //call this instead of push so that it's sorted
          var newFlawNames=remakeArray(commonFlawNames, ["Ammunition", "Fragile", "System Dependent", "Uncontrollable Entirely", "Uncontrollable Result", "Uncontrollable Target"]);
          ModifierList.allModifierNames=newExtraNames.concat(newFlawNames);

          ModifierList.allModifierMaxRanks.set("Diminished Range", 1);
          ModifierList.allModifierCosts.set("Attack", 1);
          ModifierList.allModifiersType.set("Attack", "Rank");
          ModifierList.allModifierCosts.set("Impervious", 2);
          ModifierList.allModifierMaxRanks.set("Impervious", -1);
          ModifierList.allModifiersType.set("Impervious", "Flat");
          ModifierList.allModifierCosts.set("Increased Mass", 3);
          ModifierList.allModifiersType.set("Innate", "Rank");
          ModifierList.allModifierCosts.set("Penetrating", 2);
      }
       ModifierList.allModifierNames=ModifierList.allModifierNames.concat(otherNames);
   };
   this.setSectionRowIndex=function(sectionRowIndexGiven){
       sectionRowIndex=sectionRowIndexGiven;
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setTotalIndex(sectionRowIndex+"."+i);}  //correct all indexing
   };
   this.autoAddRowRequest=function(rowName){
       Logger.log("autoAddRowRequest("+rowName+");");
      for(var i=0; i < rowArray.length; i++)
      {
          if(rowArray[i].getName() === rowName) return;  //if already exists do nothing (since can't be redundant)
      }
       this.createRowByName(rowName);
       Logger.log_same(" created");
       this.validate();
   };
   this.autoRemoveRowRequestAttacks=function(){
       Logger.log("autoRemoveRowRequestAttacks();");
       this.autoRemoveRowRequest("Attack");  //if not found does nothing
       this.autoRemoveRowRequest("Affects Others Also");
       this.autoRemoveRowRequest("Affects Others Only");
       //this.validate();  //not needed since it updates after each remove request
   };
   this.autoRemoveRowRequest=function(rowName){
       Logger.log("autoRemoveRowRequest("+rowName+");");
      for(var i=0; i < rowArray.length; i++)
      {
          if(rowArray[i].getName() === rowName){this.removeRow(i); Logger.log_same(" removed row "+i); break;}
      }
       //if not found do nothing
       this.validate();
   };
   this.autoSetAction=function(actionIndexDifference){
       var fasterIndex=autoModifierNameToRowIndex.get("Faster Action");  //extra
       var slowerIndex=autoModifierNameToRowIndex.get("Slower Action");  //flaw
       var selectiveIndex=autoModifierNameToRowIndex.get("Selective");  //extra needed for triggered

       if(actionIndexDifference=0 && fasterIndex !== -1) this.removeRow(fasterIndex);  //there can't be any extras
       //0 may be both... no it isn't possible to get faster and slower at the same time
       else if(actionIndexDifference=0 && slowerIndex !== -1) this.removeRow(slowerIndex);  //there can't be any flaws
      if (actionIndexDifference > 0)  //if extra request
      {
         if (fasterIndex === -1)  //must add the extra
         {
             fasterIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Faster Action");
         }
          rowArray[fasterIndex].setRank(actionIndexDifference);
      }
      else if (actionIndexDifference < 0)  //if flaw request
      {
         if (slowerIndex === -1)  //must add the flaw
         {
             slowerIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Slower Action");
         }
          rowArray[slowerIndex].setRank(Math.abs(actionIndexDifference));  //since actionIndexDifference is negative
          //don't auto remove selective
      }
       //else //if (actionIndexDifference === 0)  //if request to remove action modifiers. already covered
      if(SelectUtil.getTextById(sectionName+"SelectAction"+sectionRowIndex) === "Triggered" && selectiveIndex === -1)  //must add selective
          this.createRowByName("Selective");  //has only 1 rank
       //TODO: don't and can't add Selective if Triggered is the default action (feature and godhood) but that's a power quirk
       this.validate();
   };
   this.autoSetRange=function(rangeIndexDifference){
       var increaseIndex=autoModifierNameToRowIndex.get("Increased Range");  //extra
       var decreaseIndex=autoModifierNameToRowIndex.get("Reduced Range");  //flaw

       if(rangeIndexDifference=0 && increaseIndex !== -1) this.removeRow(increaseIndex);  //there can't be any extras
       else if(rangeIndexDifference=0 && decreaseIndex !== -1) this.removeRow(decreaseIndex);  //there can't be any flaws
      if (rangeIndexDifference > 0)  //if extra request
      {
         if (increaseIndex === -1)  //must add the extra
         {
             increaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Increased Range");
         }
          rowArray[increaseIndex].setRank(rangeIndexDifference);
      }
      else if (rangeIndexDifference < 0)  //if flaw request
      {
         if (decreaseIndex === -1)  //must add the flaw
         {
             decreaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Reduced Range");
         }
          rowArray[decreaseIndex].setRank(Math.abs(rangeIndexDifference));  //since rangeIndexDifference is negative
      }
       //else //if (rangeIndexDifference === 0)  //if request to remove range modifiers. already covered
       this.validate();
   };
   this.autoSetDuration=function(durationIndexDifference){
       Logger.log("autoSetDuration("+durationIndexDifference+");");
       var increaseIndex=autoModifierNameToRowIndex.get("Increased Duration");  //extra
       var decreaseIndex=autoModifierNameToRowIndex.get("Decreased Duration");  //flaw

       if(durationIndexDifference=0 && increaseIndex !== -1) this.removeRow(increaseIndex);  //there can't be any extras
       else if(durationIndexDifference=0 && decreaseIndex !== -1) this.removeRow(decreaseIndex);  //there can't be any flaws
      if (durationIndexDifference > 0)  //if extra request
      {
         if (increaseIndex === -1)  //must add the extra
         {
             increaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Increased Duration");
         }
          rowArray[increaseIndex].setRank(durationIndexDifference);  //update extra's rank
      }
      else if (durationIndexDifference < 0)  //if flaw request
      {
         if (decreaseIndex === -1)  //must add the flaw
         {
             decreaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Decreased Duration");
         }
          rowArray[decreaseIndex].setRank(Math.abs(durationIndexDifference));  //since durationIndexDifference is negative
      }
       this.validate();
   };
   this.clearTotalChangers=function(){  //if has none then just updates
       var easyIndex=autoModifierNameToRowIndex.get("Easily Removable");
       var regIndex=autoModifierNameToRowIndex.get("Removable");

       if(easyIndex !== -1 && regIndex !== -1){this.removeRow(regIndex); regIndex=-1;}  //you can't have both (must remove that modifier even though it is logicly ignored)
       if(easyIndex !== -1) rowArray[easyIndex].setRank(0);  //clear modifier's rank. TODO: shouldn't it be set to 1?
       else if(regIndex !== -1) rowArray[regIndex].setRank(0);

       var alternateIndex=autoModifierNameToRowIndex.get("Alternate Effect");
       var dynamicIndex=autoModifierNameToRowIndex.get("Dynamic Alternate Effect");  //only exists in old rules

       if(dynamicIndex !== -1 && alternateIndex !== -1){this.removeRow(alternateIndex); alternateIndex=-1;}
       if(dynamicIndex !== -1) rowArray[dynamicIndex].setRank(0);  //clear modifier ranks
       else if(alternateIndex !== -1) rowArray[alternateIndex].setRank(0);
          //only useOldRules can have Dynamic Alternate Effect

       this.validate();
   };
   this.autoSetTotalChangers=function(rawRowTotal){  //if has none then just updates
       var easyIndex=autoModifierNameToRowIndex.get("Easily Removable");
       var regIndex=autoModifierNameToRowIndex.get("Removable");

       var changeBy=rawRowTotal/5;  //don't round yet
       if(easyIndex !== -1 && regIndex !== -1){this.removeRow(regIndex); regIndex=-1;}  //you can't have both (must remove that modifier even though it is logicly ignored)
       if(easyIndex !== -1){changeBy*=2; rowArray[easyIndex].setRank(Math.floor(changeBy));}  //update modifier's rank
       else if(regIndex !== -1) rowArray[regIndex].setRank(Math.floor(changeBy));  //round down  //if (regIndex !== -1)
       else changeBy=0;
       rawRowTotal-=Math.floor(changeBy);  //number of ranks set to removable
          //update rawRowTotal for the Alternate Effect to use

       var alternateIndex=autoModifierNameToRowIndex.get("Alternate Effect");
       var dynamicIndex=autoModifierNameToRowIndex.get("Dynamic Alternate Effect");  //only exists in old rules

       if(dynamicIndex !== -1 && alternateIndex !== -1){this.removeRow(alternateIndex); alternateIndex=-1;}
       if(Main.useOldRules) rawRowTotal--;
       else rawRowTotal=Math.floor(rawRowTotal/2);
       if(dynamicIndex !== -1) rowArray[dynamicIndex].setRank(rawRowTotal-1);  //another -1 because dynamic costs 2
       else if(alternateIndex !== -1) rowArray[alternateIndex].setRank(rawRowTotal);  //rawRowTotal is correct for either rules  //if (alternateIndex !== -1)
          //only useOldRules can have Dynamic Alternate Effect

       this.validate();
   };
   this.clear=function(){
       rowArray=[new ModifierObjectAgnostic(sectionRowIndex+".0", sectionName)];
       this.validate();
   };
   this.select=function(modifierRowIndex){
      if (SelectUtil.getTextById(sectionName+"SelectAction"+sectionRowIndex) === "Triggered" && SelectUtil.getTextById(sectionName+"Choices"+sectionRowIndex) !== "A God I Am")
      //if action select exists and is triggered
      {
          var elementId=sectionName+"ModifierChoices"+sectionRowIndex+"."+autoModifierNameToRowIndex.get("Selective");
             //selective will have an index because changing action to triggered will create it
          if(SelectUtil.getTextById(elementId) !== "Selective"){this.setAll(); return;}  //if it was switched off then revert it
          //whole thing: if selective is required (due to triggered action) and it did exist but you switched it off, then switch it back on
      }
       if(unchangableRows.contains(modifierRowIndex)) return;  //can't remove or change the row
       rowArray[modifierRowIndex].select();
       if(ModifierList.allAutoModifierNames.contains(rowArray[modifierRowIndex].getName()) && !ModifierList.allAutoModifierCanCreate.contains(rowArray[modifierRowIndex].getName()) &&
          SelectUtil.getTextById(sectionName+"Choices"+sectionRowIndex) !== "Feature") rowArray[modifierRowIndex].setSelectIndex(0);  //don't add it (but feature can add it)
          //TODO: what is all this? and I don't think I should call set 0 and instead have a remove row function
       //if last row isn't blank add one
       if(!rowArray.last().isBlank()) rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));
       //so that update will correctly count the rows
       this.validate();
   };
   this.changeRank=function(modifierRowIndex)
   {
       rowArray[modifierRowIndex].changeRank();
       this.validate();
   };
   this.changeText=function(modifierRowIndex)
   {
       rowArray[modifierRowIndex].changeText();
       this.validate();
   };
   this.validate=function()
   {
       this.specificRules();
       this.calculateValues();
       this.rankTotal=0;
       this.flatTotal=0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          this.rankTotal+=rowArray[i].rankTotal;  //one will be 0 (or both)
          this.flatTotal+=rowArray[i].flatTotal;
      }
   };
   this.specificRules=function()
   {
       //TODO: move changeRank validation into here somehow
   };
   this.calculateValues=function(){
       this.sanitizeRows();
       this.hasAttack=false;
       autoModifierNameToRowIndex.clear();
       unchangableRows=[];
      for (var i=0; i < rowArray.length-1; i++)
      {
          var modifierName=rowArray[i].getUniqueName();
         if (modifierName === "Attack" || modifierName === "Affects Others")  //Affects Others Also and Only return same unique name
             this.hasAttack=true;
          modifierName=rowArray[i].getName();  //to remove text
          if(ModifierList.allAutoModifierNames.contains(modifierName)) autoModifierNameToRowIndex.add(modifierName, i);
          if(ModifierList.allAutoModifierNames.contains(modifierName) && !ModifierList.allAutoModifierCanCreate.contains(modifierName)) unchangableRows.push(i);
      }
   };
   this.getRow=function(rowIndex)
   {
       if(rowIndex === rowArray.length) return;
       return rowArray[rowIndex];
   };
   this.sanitizeRows=function()
   {
       var namesSoFar=new Array();
       var canHaveAttack=true;
       //if(Main != undefined) console.log(Main[sectionName+"Section"].getRow(sectionRowIndex).getDefaultRange());
       if(PowerListAgnostic.rangeHash.get(SelectUtil.getTextById(sectionName+"Choices"+sectionRowIndex)) !== "Personal") canHaveAttack=false;
          //if the default range is not personal then it can't have attack modifiers
      for (var i=0; i < rowArray.length; i++)
      {
          if(rowArray[i].isBlank() && i < rowArray.length-1){this.removeRow(i); i--; continue;}  //remove blank row that isn't last
          else if(rowArray[i].isBlank()) continue;  //do nothing if last row is blank
          var modifierName=rowArray[i].getUniqueName();
          if(namesSoFar.contains(modifierName)){this.removeRow(i); i--; continue;}
         if (modifierName === "Attack" || modifierName === "Affects Others")  //Affects Others Also and only return same name
         {
             if(!canHaveAttack){this.removeRow(i); i--; continue;}  //redundant or invalid modifier
             canHaveAttack=false;
         }
         else if (modifierName === "Affects Corporeal" || modifierName === "Split" || modifierName === "Impervious")
         {
             var maxRank=parseInt(document.getElementById(sectionName+"Rank"+sectionRowIndex).value);
             if(modifierName === "Impervious") maxRank=Math.ceil(maxRank/2);
             if(modifierName === "Impervious" && Main.useOldRules){}  //doesn't have ranks so do nothing
             else if(rowArray[i].getRank() > maxRank) rowArray[i].setRank(maxRank);
         }
          namesSoFar.push(modifierName);
      }
      if(!rowArray.last().isBlank())  //if last row isn't blank add one
          rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));
   };
   this.generate=function(){
       var allModifierRows="";
       if(SelectUtil.getTextById(sectionName+"Choices"+sectionRowIndex) === "A God I Am")
          allModifierRows+="<tr><td width='34%' style='text-align:right;'>First Rank</td><td colspan='3' width='66%'> +145 Flat Points</td></tr>";
       else if(SelectUtil.getTextById(sectionName+"Choices"+sectionRowIndex) === "Reality Warp")
          allModifierRows+="<tr><td width='34%' style='text-align:right;'>First Rank</td><td colspan='3' width='66%'> +75 Flat Points</td></tr>";
      for(var i=0; i < rowArray.length; i++){allModifierRows+=rowArray[i].generate();}
      if (!rowArray.last().isBlank())  //if last row isn't blank add one
      {
          rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));
          allModifierRows+=rowArray.last().generate();
      }
       return allModifierRows;
   };
   this.setAll=function(){
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
         {rowArray[i].setValues();}
       this.validate();
   };
   this.removeRow=function(rowIndex){
       rowArray.remove(rowIndex);
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setTotalIndex(sectionRowIndex+"."+i);}  //correct all indexing
      if(!rowArray.last().isBlank())  //if last row isn't blank add one  //TODO: shouldn't be here but might be needed for now
          rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));
   };
   this.createRowByName=function(rowName){
       var modifierIndex=ModifierList.allModifierNames.indexOf(rowName)+1;  //+1 to avoid default
       rowArray.last().setSelectIndex(modifierIndex);  //set the last row (which is blank) to become the new modifier
       rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));  //add a new blank row
   };
   this.save=function(){
       if(rowArray.length === 1) return " />\n";
       var fileString=">\n";
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       return fileString;
   };
   this.load=function(xmlSection){
       //rowArray=[new ModifierObjectAgnostic(sectionRowIndex+".0", sectionName)];
       var dontSet=["Decreased Duration", "Faster Action", "Increased Duration", "Increased Range", "Permanent", "Reduced Range", "Slower Action", "Sustained"];
       //dontSet can't have Attack and either Affects Others because powers doesn't know which one to use
      for (var i=0; i < xmlSection.length; i++)
      {
          if(dontSet.contains(xmlSection[i].getAttribute("name"))) continue;
          var indexToUse=ModifierList.allModifierNames.indexOf(xmlSection[i].getAttribute("name"));
          if(indexToUse === -1){alert("Load Error: "+xmlSection[i].getAttribute("name")+" is not a modifier name. Did you mean \"Other\" with text?"); continue;}  //not found
          rowArray.last().setSelectIndex(indexToUse+1);  //+1 to avoid default
          rowArray.last().setRank(xmlSection[i].getAttribute("applications"), false);
          rowArray.last().setText(xmlSection[i].getAttribute("text"));
          rowArray.push(new ModifierObjectAgnostic((sectionRowIndex+"."+rowArray.length), sectionName));
      }
   };
   this.getUniqueName=function(){
       var nameArray=new Array();
      for(var i=0; i < rowArray.length; i++)
          {nameArray.push(rowArray[i].getUniqueName());}
       nameArray.sort();  //must be sorted because order doesn't matter when considering uniqueness
       //note that the rows are not sorted only this name array
       return nameArray;  //it will become a string next
   };
   //constructor:
    this.changeRules();
};
function ModifierObjectAgnostic(totalIndexPassed, sectionName){
   //public:
    this.rankTotal=0;  //one will always be 0 (or both)
    this.flatTotal=0;
   //private:
    var totalIndex=totalIndexPassed;
    var selectIndex, name, modifierType, costPerRank, hasRank, rank, hasText, text;
   this.getRank=function(){return rank;};
   this.save=function(){
       var rowString="          <Modifier name=\""+name+"\" ";
       if(hasRank) rowString+="applications=\""+rank+"\" ";
       if(hasText) rowString+="text=\""+text+"\" ";
       rowString+="/>\n";
       return rowString;
   };
   this.generate=function(){
       var htmlString="";
       htmlString+="<tr>\n";
       htmlString+="   <td width='34%' style='text-align:right;'>\n";
       htmlString+="      <select id='"+sectionName+"ModifierChoices"+totalIndex+"' onChange='Main."+sectionName+"Section.selectModifier(\""+totalIndex+"\")'>\n";
       htmlString+="         <option>Select One</option>\n";
      for (var i=0; i < ModifierList.allModifierNames.length; i++)
      {
          htmlString+="         <option>"+ModifierList.allModifierNames[i]+"</option>\n";
      }
       htmlString+="      </select>\n";
       htmlString+="   </td>\n";
       htmlString+="   <td colspan='2' width='66%'>\n";
       htmlString+="      <span id='"+sectionName+"ModifierRankHolder"+totalIndex+"' style='display:none;'> Applications \n";
       htmlString+="          <span id='"+sectionName+"ModifierRankInputHolder"+totalIndex+"'></span>\n";
       htmlString+="      </span>\n";
       htmlString+="      <span id='"+sectionName+"ModifierTextHolder"+totalIndex+"' style='display:none;'> Text \n";
       htmlString+="          <input type='text' value='Text Here' id='"+sectionName+"ModifierText"+totalIndex+"' size='40' onChange='Main."+sectionName+"Section.changeModifierText(\""+totalIndex+"\")' />\n";
       htmlString+="      </span>\n";
       htmlString+="      <span id='"+sectionName+"ModifierRowTotalHolder"+totalIndex+"' style='display:none;'= \n";
       htmlString+="          <span id='"+sectionName+"ModifierRowTotal"+totalIndex+"'>0</span>\n";
       htmlString+="      </span>\n";
       htmlString+="   </td>\n";
       htmlString+="</tr>\n";
       return htmlString;
   };
   this.setValues=function()
   {
       document.getElementById(sectionName+"ModifierChoices"+totalIndex).selectedIndex=selectIndex;
       //if selectIndex === 0 then all will turn off
      if (hasRank)
      {
          document.getElementById(sectionName+"ModifierRankHolder"+totalIndex).style.display="inline";
          if(ModifierList.allAutoModifierCanCreate.contains(name)) document.getElementById(sectionName+"ModifierRankInputHolder"+totalIndex).innerHTML=rank;
             //so that you can't change the rank. ignore selective since it doesn't have rank.
         else
         {
             document.getElementById(sectionName+"ModifierRankInputHolder"+totalIndex).innerHTML="<input type='text' size='1' value='1' id='"+sectionName+"ModifierRank"+totalIndex+"' onChange='Main."+sectionName+"Section.changeModifierRank(\""+totalIndex+"\")' />";
                //hard coded so that it is destroyed each time
             if (document.getElementById(sectionName+"ModifierRank"+totalIndex) != undefined)
             {
                document.getElementById(sectionName+"ModifierRank"+totalIndex).value=rank;
             }
                //will be undefined first time only
         }
      }
       else document.getElementById(sectionName+"ModifierRankHolder"+totalIndex).style.display="none";
       if(hasText){document.getElementById(sectionName+"ModifierTextHolder"+totalIndex).style.display="inline"; document.getElementById(sectionName+"ModifierText"+totalIndex).value=text;}
       else document.getElementById(sectionName+"ModifierTextHolder"+totalIndex).style.display="none";
       if(Math.abs(costPerRank)=1 || modifierType === "Free"){document.getElementById(sectionName+"ModifierRowTotalHolder"+totalIndex).style.display="none"; return;}  //doesn't need a row total
       document.getElementById(sectionName+"ModifierRowTotalHolder"+totalIndex).style.display="inline";
       if(modifierType === "Rank") document.getElementById(sectionName+"ModifierRowTotal"+totalIndex).innerHTML=this.rankTotal;
       else document.getElementById(sectionName+"ModifierRowTotal"+totalIndex).innerHTML=this.flatTotal;
   };
   this.setTotalIndex=function(indexGiven){totalIndex=indexGiven;};
   /*this.setModifierIndex=function(indexGiven){  //TODO: might use for resetting all indexes or for passing on change as 2 parameters
       var indexArray=totalIndex.split(".");
       totalIndex=indexArray[0]+'.'+indexGiven;
   };
   this.setPowerIndex=function(indexGiven){
       var indexArray=totalIndex.split(".");
       totalIndex=indexGiven+'.'+indexArray[1];
   };*/
   this.select=function(){
       this.setSelectIndex(document.getElementById(sectionName+"ModifierChoices"+totalIndex).selectedIndex);
       document.getElementById(sectionName+"ModifierChoices"+totalIndex).selectedIndex=selectIndex;
   };
   this.setSelectIndex=function(indexGiven){
       selectIndex=sanitizeNumber(indexGiven, 0, 0);
      if (this.isBlank())
      {
          this.rankTotal=0;
          this.flatTotal=0;
          name="";
          modifierType="Free";
          costPerRank=0;
          hasRank=false;
          rank=0;
          hasText=false;
          text="";
          return;
      }
       name=ModifierList.allModifierNames[selectIndex-1];  //-1 to avoid the default
       modifierType=ModifierList.allModifiersType.get(name);
       costPerRank=ModifierList.allModifierCosts.get(name);
       hasRank=(ModifierList.allModifierMaxRanks.get(name) !== 1);
       rank=1;
       text=ModifierList.allModifierTextHash.get(name);
       if(text == undefined){text=""; hasText=false;}
       else hasText=true;
       if(modifierType === "Rank") this.rankTotal=costPerRank;  //*(rank 1)
       else this.rankTotal=0;
       if(modifierType === "Flat") this.flatTotal=costPerRank;
       else this.flatTotal=0;
   };
   this.changeRank=function(){
       this.setRank(document.getElementById(sectionName+"ModifierRank"+totalIndex).value, false);
       document.getElementById(sectionName+"ModifierRank"+totalIndex).value=rank;
   };
   this.setRank=function(rankGiven, skipValidation){
       if(skipValidation == undefined) skipValidation=true;
      if (!skipValidation && ModifierList.allAutoModifierNames.contains(name))  //ModifierList.allAutoModifierCanCreate are span so that this isn't called (can't change them anyway)
          return;  //can't change the rank since it is auto
       if(!hasRank) return;
       if(costPerRank < 0) rank=sanitizeNumber(rankGiven, 0, 1);  //a rank 0 flaw exists but is worthless
       else rank=sanitizeNumber(rankGiven, 1, 1);  //all extras must have at least 1 rank
       if(ModifierList.allModifierMaxRanks.get(name) !== -1 && rank > ModifierList.allModifierMaxRanks.get(name)) rank=ModifierList.allModifierMaxRanks.get(name);
       if(modifierType === "Rank") this.rankTotal=costPerRank*rank;
       else if(modifierType === "Flat") this.flatTotal=costPerRank*rank;
   };
   this.changeText=function(){
       this.setText(document.getElementById(sectionName+"ModifierText"+totalIndex).value);
       //document.getElementById(sectionName+"ModifierText"+totalIndex).value=text;  //always the same
   };
   this.setText=function(textGiven){
       if(!hasText) return;
       text=textGiven;
   };
   this.isBlank=function(){return (selectIndex === 0);};
   this.getName=function(){return name;}
   this.getUniqueName=function(){
       if(hasText) return (name+" ("+text+")");
       if(name === 'Affects Others Also' || name === 'Affects Others Only') return 'Affects Others';  //doesn't have text
       if(name === 'Affects Objects Also' || name === 'Affects Objects Only') return 'Affects Objects';  //and these are exclusive
       return name;
   };
   //constructor:
    this.setSelectIndex(0);
};
