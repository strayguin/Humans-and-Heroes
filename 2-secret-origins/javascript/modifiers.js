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
    ModifierList.allModifierNames=["Accurate", "Affects Corporeal", "Affects Objects Also", "Affects Objects Only", "Affects Others Also", "Affects Others Only", "Alternate Effect", "Alternate Resistance (Cost)", "Alternate Resistance (Free)", "Area", "Attack", "Contagious", "Dimensional", "Existence Dependent", "Extended Range", "Faster Action", "Feature", "Homing", "Impervious", "Increased Duration", "Increased Mass", "Increased Range", "Indirect", "Innate", "Insidious", "Linked", "Multiattack", "Penetrating", "Precise", "Reach", "Reversible", "Ricochet", "Secondary Effect", "Selective", "Split", "Subtle", "Sustained", "Variable Descriptor", "Activation", "Ammunition", "Check Required", "Decreased Duration", "Diminished Range", "Distracting", "Fades", "Feedback", "Fragile", "Grab-Based", "Inaccurate", "Limited", "Noticeable", "Permanent", "Quirk", "Reduced Range", "Easily Removable", "Removable", "Resistible", "Sense-Dependent", "Side Effect", "Slower Action", "System Dependent", "Tiring", "Uncontrollable Entirely", "Uncontrollable Result", "Uncontrollable Target", "Unreliable", "Other Flat Extra", "Other Rank Extra", "Other Free Modifier", "Other Rank Flaw", "Other Flat Flaw"];
       //array order is important
    ModifierList.allModifierMaxRanks=convertToHash([["Accurate", -1], ["Affects Corporeal", -1], ["Alternate Effect", -1], ["Dynamic Alternate Effect", -1], ["Area", -1], ["Dimensional", 3], ["Extended Range", -1], ["Homing", -1], ["Impervious", -1], ["Increased Mass", -1], ["Indirect", 4], ["Penetrating", -1], ["Reach", -1], ["Ricochet", -1], ["Split", -1], ["Subtle", 2], ["Variable Descriptor", 2], ["Activation", 2], ["Ammunition", 2], ["Check Required", -1], ["Fragile", -1], ["Inaccurate", -1], ["Limited", 2], ["Easily Removable", -1], ["Removable", -1], ["Side Effect", 2], ["Other Flat Extra", -1], ["Other Rank Extra", -1], ["Other Rank Flaw", -1], ["Other Flat Flaw", -1], ["Faster Action", 6], ["Slower Action", 6], ["Increased Duration", 3], ["Decreased Duration", 3], ["Increased Range", 4], ["Reduced Range", 4], ["Affects Insubstantial", 2], ["Triggered", -1], ["Diminished Range", 1]], 1);
    ModifierList.allModifiersType=convertToHash([["Accurate", "Flat"], ["Affects Corporeal", "Flat"], ["Affects Objects Only", "Free"], ["Affects Others Only", "Free"], ["Alternate Effect", "Flat"], ["Dynamic Alternate Effect", "Flat"], ["Alternate Resistance (Free)", "Free"], ["Dimensional", "Flat"], ["Existence Dependent", "Free"], ["Extended Range", "Flat"], ["Feature", "Flat"], ["Homing", "Flat"], ["Impervious", "Flat"], ["Increased Mass", "Flat"], ["Indirect", "Flat"], ["Insidious", "Flat"], ["Linked", "Free"], ["Penetrating", "Flat"], ["Precise", "Flat"], ["Reach", "Flat"], ["Reversible", "Flat"], ["Ricochet", "Flat"], ["Split", "Flat"], ["Subtle", "Flat"], ["Variable Descriptor", "Flat"], ["Activation", "Flat"], ["Check Required", "Flat"], ["Diminished Range", "Flat"], ["Fragile", "Flat"], ["Inaccurate", "Flat"], ["Noticeable", "Flat"], ["Quirk", "Flat"], ["Easily Removable", "Flat"], ["Removable", "Flat"], ["System Dependent", "Flat"], ["Other Flat Extra", "Flat"], ["Other Free Modifier", "Free"], ["Other Flat Flaw", "Flat"], ["Permanent", "Free"], ["Sustained", "Free"], ["Affects Insubstantial", "Flat"], ["Incurable", "Flat"], ["Sleep", "Free"], ["Triggered", "Flat"], ["Attack", "Rank"], ["Innate", "Rank"]], "Rank");
    ModifierList.allModifierCosts=convertToHash([["Affects Objects Only", 0], ["Affects Others Only", 0], ["Alternate Effect", -1], ["Dynamic Alternate Effect", -1], ["Alternate Resistance (Free)", 0], ["Existence Dependent", 0], ["Impervious", 2], ["Increased Mass", 3], ["Linked", 0], ["Penetrating", 2], ["Activation", -1], ["Ammunition", -1], ["Diminished Range", -1], ["Distracting", -1], ["Fades", -1], ["Feedback", -1], ["Fragile", -1], ["Grab-Based", -1], ["Inaccurate", -1], ["Limited", -1], ["Noticeable", -1], ["Permanent", 0], ["Quirk", -1], ["Easily Removable", -1], ["Removable", -1], ["Resistible", -1], ["Sense-Dependent", -1], ["Side Effect", -1], ["System Dependent", -2], ["Tiring", -1], ["Uncontrollable Entirely", -5], ["Uncontrollable Result", -1], ["Uncontrollable Target", -1], ["Unreliable", -1], ["Other Free Modifier", 0], ["Other Rank Flaw", -1], ["Other Flat Flaw", -1], ["Slower Action", -1], ["Reduced Range", -1], ["Decreased Duration", -1], ["Sustained", 0], ["Sleep", 0], ["Uncontrolled", -1], ["Attack", 1]], 1);
    ModifierList.allModifiersWithText=["Alternate Effect", "Dynamic Alternate Effect", "Alternate Resistance (Cost)", "Alternate Resistance (Free)", "Area", "Contagious", "Dimensional", "Extended Range", "Feature", "Homing", "Increased Mass", "Indirect", "Linked", "Reach", "Subtle", "Variable Descriptor", "Activation", "Ammunition", "Check Required", "Fragile", "Limited", "Noticeable", "Quirk", "Easily Removable", "Removable", "Resistible", "Sense-Dependent", "Side Effect", "Other Rank Extra", "Other Flat Extra", "Other Free Modifier", "Other Rank Flaw", "Other Flat Flaw", "Triggered"];
    ModifierList.allModifierDefaultText=["To What", "To What", "Name of Resistance", "Name of Resistance", "Shape", "Method of Spreading", "Which Dimensions", "Total Ranges", "Description", "Description or Method of targeting", "Total Mass", "Direction", "To What", "Total Attack Distance", "Description", "Category", "Action Required", "Usage Per time or reload", "What Check", "Total Toughness", "Description", "Description", "Description", "Type of item", "Type of item", "Name of Resistance", "Name of Sense", "Description", "Description", "Description", "Description", "Description", "Description", "Description"];
   //public:
    this.rankTotal=0;
    this.flatTotal=0;
    this.hasAttack=false;
   //private:
    var modifierRowParts=["<tr><td width='34%' style='text-align:right;'><select id='"+sectionName+"ModifierChoices", "' onChange='Main."+sectionName+"Section.selectModifier(\"", "\")'><option>Select One</option><option>Accurate</option><option>Affects Corporeal</option><option>Affects Objects Also</option><option>Affects Objects Only</option><option>Affects Others Also</option><option>Affects Others Only</option><option>Alternate Effect</option><option>Alternate Resistance (Cost)</option><option>Alternate Resistance (Free)</option><option>Area</option><option>Attack</option><option>Contagious</option><option>Dimensional</option><option>Existence Dependent</option><option>Extended Range</option><option>Faster Action</option><option>Feature</option><option>Homing</option><option>Impervious</option><option>Increased Duration</option><option>Increased Mass</option><option>Increased Range</option><option>Indirect</option><option>Innate</option><option>Insidious</option><option>Linked</option><option>Multiattack</option><option>Penetrating</option><option>Precise</option><option>Reach</option><option>Reversible</option><option>Ricochet</option><option>Secondary Effect</option><option>Selective</option><option>Split</option><option>Subtle</option><option>Sustained</option><option>Variable Descriptor</option><option>Activation</option><option>Ammunition</option><option>Check Required</option><option>Decreased Duration</option><option>Diminished Range</option><option>Distracting</option><option>Fades</option><option>Feedback</option><option>Fragile</option><option>Grab-Based</option><option>Inaccurate</option><option>Limited</option><option>Noticeable</option><option>Permanent</option><option>Quirk</option><option>Reduced Range</option><option>Easily Removable</option><option>Removable</option><option>Resistible</option><option>Sense-Dependent</option><option>Side Effect</option><option>Slower Action</option><option>System Dependent</option><option>Tiring</option><option>Uncontrollable Entirely</option><option>Uncontrollable Result</option><option>Uncontrollable Target</option><option>Unreliable</option><option>Other Flat Extra</option><option>Other Rank Extra</option><option>Other Free Modifier</option><option>Other Rank Flaw</option><option>Other Flat Flaw</option></select></td><td colspan='2' width='66%'><span id='"+sectionName+"ModifierRankHolder", "' style='display:none;'> Applications <span id='"+sectionName+"ModifierRankInputHolder", "'></span></span><span id='"+sectionName+"ModifierTextHolder", "' style='display:none;'> Text <input type='text' value='Text Here' id='"+sectionName+"ModifierText", "' size='40' onChange='Main."+sectionName+"Section.changeModifierText(\"", "\")' /></span><span id='"+sectionName+"ModifierRowTotalHolder", "' style='display:none;'> = <span id='"+sectionName+"ModifierRowTotal", "'>0</span></span></td></tr>"];
    //generate row is agnostic to the rowindex type so that "12.3" will work fine. sectionName can't change so the array is always correct
    var allAutoModifierNames=["Faster Action", "Selective", "Increased Duration", "Increased Range", "Decreased Duration", "Permanent", "Sustained", "Reduced Range", "Slower Action", "Easily Removable", "Removable", "Alternate Effect", "Dynamic Alternate Effect"];
    ModifierList.allAutoModifierCanCreate=["Selective", "Easily Removable", "Removable", "Alternate Effect", "Dynamic Alternate Effect"];
    var autoModifierNameToRowIndex=new Hash({}, -1);
    var unchangableRows=[];
    var sectionRowIndex=sectionRowIndexPassed;
    var rowArray = [new ModifierObjectAgnostic(sectionRowIndex+".0", sectionName)];
   this.changeRules = function(){
       if(Main==undefined) return;  //because it is in constructor
      if (Main.useOldRules)
      {
          ModifierList.allModifierNames=["Accurate", "Affects Corporeal", "Affects Insubstantial", "Affects Objects Also", "Affects Objects Only", "Affects Others Also", "Affects Others Only", "Alternate Effect", "Dynamic Alternate Effect", "Alternate Resistance (Cost)", "Alternate Resistance (Free)", "Area", "Attack", "Contagious", "Dimensional", "Extended Range", "Faster Action", "Feature", "Homing", "Impervious", "Increased Duration", "Increased Mass", "Increased Range", "Incurable", "Indirect", "Innate", "Insidious", "Linked", "Multiattack", "Penetrating", "Precise", "Reach", "Reversible", "Ricochet", "Secondary Effect", "Selective", "Sleep", "Split", "Subtle", "Sustained", "Triggered", "Variable Descriptor", "Activation", "Check Required", "Decreased Duration", "Diminished Range", "Distracting", "Fades", "Feedback", "Grab-Based", "Inaccurate", "Limited", "Noticeable", "Permanent", "Quirk", "Reduced Range", "Easily Removable", "Removable", "Resistible", "Sense-Dependent", "Side Effect", "Slower Action", "Tiring", "Uncontrolled", "Unreliable", "Other Flat Extra", "Other Rank Extra", "Other Free Modifier", "Other Rank Flaw", "Other Flat Flaw"];
          modifierRowParts=["<tr><td width='34%' style='text-align:right;'><select id='"+sectionName+"ModifierChoices", "' onChange='Main."+sectionName+"Section.selectModifier(\"", "\")'><option>Select One</option><option>Accurate</option><option>Affects Corporeal</option><option>Affects Insubstantial</option><option>Affects Objects Also</option><option>Affects Objects Only</option><option>Affects Others Also</option><option>Affects Others Only</option><option>Alternate Effect</option><option>Dynamic Alternate Effect</option><option>Alternate Resistance (Cost)</option><option>Alternate Resistance (Free)</option><option>Area</option><option>Attack</option><option>Contagious</option><option>Dimensional</option><option>Extended Range</option><option>Faster Action</option><option>Feature</option><option>Homing</option><option>Impervious</option><option>Increased Duration</option><option>Increased Mass</option><option>Increased Range</option><option>Incurable</option><option>Indirect</option><option>Innate</option><option>Insidious</option><option>Linked</option><option>Multiattack</option><option>Penetrating</option><option>Precise</option><option>Reach</option><option>Reversible</option><option>Ricochet</option><option>Secondary Effect</option><option>Selective</option><option>Sleep</option><option>Split</option><option>Subtle</option><option>Sustained</option><option>Triggered</option><option>Variable Descriptor</option><option>Activation</option><option>Check Required</option><option>Decreased Duration</option><option>Diminished Range</option><option>Distracting</option><option>Fades</option><option>Feedback</option><option>Grab-Based</option><option>Inaccurate</option><option>Limited</option><option>Noticeable</option><option>Permanent</option><option>Quirk</option><option>Reduced Range</option><option>Easily Removable</option><option>Removable</option><option>Resistible</option><option>Sense-Dependent</option><option>Side Effect</option><option>Slower Action</option><option>Tiring</option><option>Uncontrolled</option><option>Unreliable</option><option>Other Flat Extra</option><option>Other Rank Extra</option><option>Other Free Modifier</option><option>Other Rank Flaw</option><option>Other Flat Flaw</option></select></td><td colspan='2' width='66%'><span id='"+sectionName+"ModifierRankHolder", "' style='display:none;'> Applications <span id='"+sectionName+"ModifierRankInputHolder", "'></span></span><span id='"+sectionName+"ModifierTextHolder", "' style='display:none;'> Text <input type='text' value='Text Here' id='"+sectionName+"ModifierText", "' size='40' onChange='Main."+sectionName+"Section.changeModifierText(\"", "\")' /></span><span id='"+sectionName+"ModifierRowTotalHolder", "' style='display:none;'> = <span id='"+sectionName+"ModifierRowTotal", "'>0</span></span></td></tr>"];
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
          ModifierList.allModifierNames=["Accurate", "Affects Corporeal", "Affects Objects Also", "Affects Objects Only", "Affects Others Also", "Affects Others Only", "Alternate Effect", "Alternate Resistance (Cost)", "Alternate Resistance (Free)", "Area", "Attack", "Contagious", "Dimensional", "Existence Dependent", "Extended Range", "Faster Action", "Feature", "Homing", "Impervious", "Increased Duration", "Increased Mass", "Increased Range", "Indirect", "Innate", "Insidious", "Linked", "Multiattack", "Penetrating", "Precise", "Reach", "Reversible", "Ricochet", "Secondary Effect", "Selective", "Split", "Subtle", "Sustained", "Variable Descriptor", "Activation", "Ammunition", "Check Required", "Decreased Duration", "Diminished Range", "Distracting", "Fades", "Feedback", "Fragile", "Grab-Based", "Inaccurate", "Limited", "Noticeable", "Permanent", "Quirk", "Reduced Range", "Easily Removable", "Removable", "Resistible", "Sense-Dependent", "Side Effect", "Slower Action", "System Dependent", "Tiring", "Uncontrollable Entirely", "Uncontrollable Result", "Uncontrollable Target", "Unreliable", "Other Flat Extra", "Other Rank Extra", "Other Free Modifier", "Other Rank Flaw", "Other Flat Flaw"];
          modifierRowParts=["<tr><td width='34%' style='text-align:right;'><select id='"+sectionName+"ModifierChoices", "' onChange='Main."+sectionName+"Section.selectModifier(\"", "\")'><option>Select One</option><option>Accurate</option><option>Affects Corporeal</option><option>Affects Objects Also</option><option>Affects Objects Only</option><option>Affects Others Also</option><option>Affects Others Only</option><option>Alternate Effect</option><option>Alternate Resistance (Cost)</option><option>Alternate Resistance (Free)</option><option>Area</option><option>Attack</option><option>Contagious</option><option>Dimensional</option><option>Existence Dependent</option><option>Extended Range</option><option>Faster Action</option><option>Feature</option><option>Homing</option><option>Impervious</option><option>Increased Duration</option><option>Increased Mass</option><option>Increased Range</option><option>Indirect</option><option>Innate</option><option>Insidious</option><option>Linked</option><option>Multiattack</option><option>Penetrating</option><option>Precise</option><option>Reach</option><option>Reversible</option><option>Ricochet</option><option>Secondary Effect</option><option>Selective</option><option>Split</option><option>Subtle</option><option>Sustained</option><option>Variable Descriptor</option><option>Activation</option><option>Ammunition</option><option>Check Required</option><option>Decreased Duration</option><option>Diminished Range</option><option>Distracting</option><option>Fades</option><option>Feedback</option><option>Fragile</option><option>Grab-Based</option><option>Inaccurate</option><option>Limited</option><option>Noticeable</option><option>Permanent</option><option>Quirk</option><option>Reduced Range</option><option>Easily Removable</option><option>Removable</option><option>Resistible</option><option>Sense-Dependent</option><option>Side Effect</option><option>Slower Action</option><option>System Dependent</option><option>Tiring</option><option>Uncontrollable Entirely</option><option>Uncontrollable Result</option><option>Uncontrollable Target</option><option>Unreliable</option><option>Other Flat Extra</option><option>Other Rank Extra</option><option>Other Free Modifier</option><option>Other Rank Flaw</option><option>Other Flat Flaw</option></select></td><td colspan='2' width='66%'><span id='"+sectionName+"ModifierRankHolder", "' style='display:none;'> Applications <span id='"+sectionName+"ModifierRankInputHolder", "'></span></span><span id='"+sectionName+"ModifierTextHolder", "' style='display:none;'> Text <input type='text' value='Text Here' id='"+sectionName+"ModifierText", "' size='40' onChange='Main."+sectionName+"Section.changeModifierText(\"", "\")' /></span><span id='"+sectionName+"ModifierRowTotalHolder", "' style='display:none;'> = <span id='"+sectionName+"ModifierRowTotal", "'>0</span></span></td></tr>"];
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
   };
   //constructor:
    this.changeRules();  //needs this so that the new ones created are already up to date
   this.setSectionRowIndex = function(sectionRowIndexGiven){
       sectionRowIndex=sectionRowIndexGiven;
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setTotalIndex(sectionRowIndex+"."+i);}  //correct all indexing
   };
   this.autoAddRowRequest = function(rowName){
       Logger.log("autoAddRowRequest("+rowName+");");
      for(var i=0; i < rowArray.length; i++)
      {
          if(rowArray[i].name==rowName) return;  //if already exists do nothing (since can't be redundant)
      }
       this.createRowByName(rowName);
       Logger.log_same(" created");
       this.update();
   };
   this.autoRemoveRowRequestAttacks = function(){
       Logger.log("autoRemoveRowRequestAttacks();");
       this.autoRemoveRowRequest("Attack");  //if not found does nothing
       this.autoRemoveRowRequest("Affects Others Also");
       this.autoRemoveRowRequest("Affects Others Only");
       //this.update();  //not needed since it updates after each remove request
   };
   this.autoRemoveRowRequest = function(rowName){
       Logger.log("autoRemoveRowRequest("+rowName+");");
      for(var i=0; i < rowArray.length; i++)
      {
          if(rowArray[i].name==rowName){this.removeRow(i); Logger.log_same(" removed row "+i); break;}
      }
       //if not found do nothing
       this.update();
   };
   this.autoSetAction = function(actionIndexDifference){
       var fasterIndex=autoModifierNameToRowIndex.get("Faster Action");  //extra
       var slowerIndex=autoModifierNameToRowIndex.get("Slower Action");  //flaw
       var selectiveIndex=autoModifierNameToRowIndex.get("Selective");  //extra needed for triggered

       if(actionIndexDifference <= 0 && fasterIndex!= -1) this.removeRow(fasterIndex);  //there can't be any extras
       //0 may be both... no it isn't possible to get faster and slower at the same time
       else if(actionIndexDifference >= 0 && slowerIndex!= -1) this.removeRow(slowerIndex);  //there can't be any flaws
      if (actionIndexDifference > 0)  //if extra request
      {
         if (fasterIndex==-1)  //must add the extra
         {
             fasterIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Faster Action");
         }
          rowArray[fasterIndex].setRank(actionIndexDifference);
      }
      else if (actionIndexDifference < 0)  //if flaw request
      {
         if (slowerIndex==-1)  //must add the flaw
         {
             slowerIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Slower Action");
         }
          rowArray[slowerIndex].setRank(Math.abs(actionIndexDifference));  //since actionIndexDifference is negative
          //don't auto remove selective
      }
       //else //if (actionIndexDifference == 0)  //if request to remove action modifiers. already covered
      if(getOption(sectionName+"SelectAction"+sectionRowIndex, "text")=="Triggered" && selectiveIndex==-1)  //must add selective
          this.createRowByName("Selective");  //has only 1 rank
       //TODO: don't and can't add Selective if Triggered is the default action (feature and godhood) but that's a power quirk
       this.update();
   };
   this.autoSetRange = function(rangeIndexDifference){
       var increaseIndex=autoModifierNameToRowIndex.get("Increased Range");  //extra
       var decreaseIndex=autoModifierNameToRowIndex.get("Reduced Range");  //flaw

       if(rangeIndexDifference <= 0 && increaseIndex!= -1) this.removeRow(increaseIndex);  //there can't be any extras
       else if(rangeIndexDifference >= 0 && decreaseIndex!= -1) this.removeRow(decreaseIndex);  //there can't be any flaws
      if (rangeIndexDifference > 0)  //if extra request
      {
         if (increaseIndex==-1)  //must add the extra
         {
             increaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Increased Range");
         }
          rowArray[increaseIndex].setRank(rangeIndexDifference);
      }
      else if (rangeIndexDifference < 0)  //if flaw request
      {
         if (decreaseIndex==-1)  //must add the flaw
         {
             decreaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Reduced Range");
         }
          rowArray[decreaseIndex].setRank(Math.abs(rangeIndexDifference));  //since rangeIndexDifference is negative
      }
       //else //if (rangeIndexDifference == 0)  //if request to remove range modifiers. already covered
       this.update();
   };
   this.autoSetDuration = function(durationIndexDifference){
       Logger.log("autoSetDuration("+durationIndexDifference+");");
       var increaseIndex=autoModifierNameToRowIndex.get("Increased Duration");  //extra
       var decreaseIndex=autoModifierNameToRowIndex.get("Decreased Duration");  //flaw

       if(durationIndexDifference <= 0 && increaseIndex!= -1) this.removeRow(increaseIndex);  //there can't be any extras
       else if(durationIndexDifference >= 0 && decreaseIndex!= -1) this.removeRow(decreaseIndex);  //there can't be any flaws
      if (durationIndexDifference > 0)  //if extra request
      {
         if (increaseIndex==-1)  //must add the extra
         {
             increaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Increased Duration");
         }
          rowArray[increaseIndex].setRank(durationIndexDifference);  //update extra's rank
      }
      else if (durationIndexDifference < 0)  //if flaw request
      {
         if (decreaseIndex==-1)  //must add the flaw
         {
             decreaseIndex=rowArray.length-1;  //the last existing row
             this.createRowByName("Decreased Duration");
         }
          rowArray[decreaseIndex].setRank(Math.abs(durationIndexDifference));  //since durationIndexDifference is negative
      }
       this.update();
   };
   this.clearTotalChangers = function(){  //if has none then just updates
       var easyIndex=autoModifierNameToRowIndex.get("Easily Removable");
       var regIndex=autoModifierNameToRowIndex.get("Removable");

       if(easyIndex != -1 && regIndex != -1){this.removeRow(regIndex); regIndex=-1;}  //you can't have both (must remove that modifier even though it is logicly ignored)
       if(easyIndex != -1) rowArray[easyIndex].setRank(0);  //clear modifier's rank
       else if(regIndex != -1) rowArray[regIndex].setRank(0);

       var alternateIndex=autoModifierNameToRowIndex.get("Alternate Effect");
       var dynamicIndex=autoModifierNameToRowIndex.get("Dynamic Alternate Effect");  //only exists in old rules

       if(dynamicIndex != -1 && alternateIndex != -1){this.removeRow(alternateIndex); alternateIndex=-1;}
       if(dynamicIndex != -1) rowArray[dynamicIndex].setRank(0);  //clear modifier ranks
       else if(alternateIndex != -1) rowArray[alternateIndex].setRank(0);
          //only useOldRules can have Dynamic Alternate Effect

       this.update();
   };
   this.autoSetTotalChangers = function(rawRowTotal){  //if has none then just updates
       var easyIndex=autoModifierNameToRowIndex.get("Easily Removable");
       var regIndex=autoModifierNameToRowIndex.get("Removable");

       var changeBy=rawRowTotal/5;  //don't round yet
       if(easyIndex != -1 && regIndex != -1){this.removeRow(regIndex); regIndex=-1;}  //you can't have both (must remove that modifier even though it is logicly ignored)
       if(easyIndex != -1){changeBy*=2; rowArray[easyIndex].setRank(Math.floor(changeBy));}  //update modifier's rank
       else if(regIndex != -1) rowArray[regIndex].setRank(Math.floor(changeBy));  //round down  //if (regIndex != -1)
       else changeBy=0;
       rawRowTotal-=Math.floor(changeBy);  //number of ranks set to removable
          //update rawRowTotal for the Alternate Effect to use

       var alternateIndex=autoModifierNameToRowIndex.get("Alternate Effect");
       var dynamicIndex=autoModifierNameToRowIndex.get("Dynamic Alternate Effect");  //only exists in old rules

       if(dynamicIndex != -1 && alternateIndex != -1){this.removeRow(alternateIndex); alternateIndex=-1;}
       if(Main.useOldRules) rawRowTotal--;
       else rawRowTotal=Math.floor(rawRowTotal/2);
       if(dynamicIndex != -1) rowArray[dynamicIndex].setRank(rawRowTotal-1);  //another -1 because dynamic costs 2
       else if(alternateIndex != -1) rowArray[alternateIndex].setRank(rawRowTotal);  //rawRowTotal is correct for either rules  //if (alternateIndex != -1)
          //only useOldRules can have Dynamic Alternate Effect

       this.update();
   };
   this.clear = function(){
       rowArray = [new ModifierObjectAgnostic(sectionRowIndex+".0", sectionName)];
       this.update();
   };
   this.select = function(modifierRowIndex){
      if (getOption(sectionName+"SelectAction"+sectionRowIndex, "text")=="Triggered" && getOption(sectionName+"Choices"+sectionRowIndex, "text")!="A God I Am")
      //if action select exists and is triggered
      {
          var elementId=sectionName+"ModifierChoices"+sectionRowIndex+"."+autoModifierNameToRowIndex.get("Selective");
             //selective will have an index becuase changing action to triggered will create it
          if(getOption(elementId, "text")!="Selective"){this.setAll(); return;}  //if it was switched off then revert it
          //whole thing: if selective is required (due to triggered action) and it did exist but you switched it off, then switch it back on
      }
       if(unchangableRows.contains(parseInt(modifierRowIndex))) return;  //can't remove or change the row
       rowArray[modifierRowIndex].select();
       if(allAutoModifierNames.contains(rowArray[modifierRowIndex].name) && !ModifierList.allAutoModifierCanCreate.contains(rowArray[modifierRowIndex].name) &&
          getOption(sectionName+"Choices"+sectionRowIndex, "text")!="Feature") rowArray[modifierRowIndex].setSelectIndex(0);  //don't add it (but feature can add it)
       //if last row isn't blank add one
       if(rowArray[rowArray.length-1].getSelectIndex()!=0) rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));
       //so that update will correctly count the rows
       this.update();
   };
   this.changeRank = function(modifierRowIndex){
      if (allAutoModifierNames.contains(rowArray[modifierRowIndex].name))  //ModifierList.allAutoModifierCanCreate are span so that this isn't called (can't change them anyway)
      {
          document.getElementById(sectionName+"ModifierRank"+sectionRowIndex+"."+modifierRowIndex).value=rowArray[modifierRowIndex].getRank();  //revert your change
          return;  //can't change the rank since it is auto
      }
       rowArray[modifierRowIndex].changeRank();
       this.update();
   };
   this.changeText = function(modifierRowIndex){
       rowArray[modifierRowIndex].changeText();
       this.update();
   };
   this.update = function(){
       this.calculateValues();
       this.rankTotal=0;
       this.flatTotal=0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          this.rankTotal+=rowArray[i].rankTotal;  //one will be 0 (or both)
          this.flatTotal+=rowArray[i].flatTotal;
      }
   };
   this.calculateValues = function(){
       this.hasAttack=false;
       var namesSoFar=new Array();
       autoModifierNameToRowIndex.clear();
       unchangableRows=[];
       var fakeAttack=false;
       if(PowerListAgnostic.rangeHash.get(getOption(sectionName+"Choices"+sectionRowIndex, "text"))!="Personal"){fakeAttack=this.hasAttack=true;}  //can't have attacks
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          if(rowArray[i].getSelectIndex()==0){this.removeRow(i); i--; continue;}
          var modifierName = rowArray[i].getUniqueName();
          if(namesSoFar.contains(modifierName)){this.removeRow(i); i--; continue;}
         if (modifierName=="Attack" || modifierName=="Affects Others Also" || modifierName=="Affects Others Only")
         {
             if(this.hasAttack){this.removeRow(i); i--; continue;}  //redundant modifier
             this.hasAttack=true;
         }
         else if (modifierName=="Affects Corporeal" || modifierName=="Split" || modifierName=="Impervious")
         {
             var maxRank=parseInt(document.getElementById(sectionName+"Rank"+sectionRowIndex).value);
             if(modifierName=="Impervious") maxRank=Math.ceil(maxRank/2);
             if(modifierName=="Impervious" && Main.useOldRules){}  //doesn't have ranks so do nothing
             else if(rowArray[i].getRank() > maxRank) rowArray[i].setRank(maxRank);
         }
          namesSoFar.push(modifierName);
          modifierName=rowArray[i].name;  //remove the text
          if(allAutoModifierNames.contains(modifierName)) autoModifierNameToRowIndex.add(modifierName, i);
          if(allAutoModifierNames.contains(modifierName) && !ModifierList.allAutoModifierCanCreate.contains(modifierName)) unchangableRows.push(i);
      }
       if(fakeAttack) this.hasAttack=false;  //doesn't actually have attacks I was just using that to remove all of those rows
   };
   this.generate = function(){
       var allModifierRows="";
       if(getOption(sectionName+"Choices"+sectionRowIndex, "text")=="A God I Am")
          allModifierRows+="<tr><td width='34%' style='text-align:right;'>First Rank</td><td colspan='3' width='66%'> +145 Flat Points</td></tr>";
       else if(getOption(sectionName+"Choices"+sectionRowIndex, "text")=="Reality Warp")
          allModifierRows+="<tr><td width='34%' style='text-align:right;'>First Rank</td><td colspan='3' width='66%'> +75 Flat Points</td></tr>";
      for(var i=0; i < rowArray.length; i++)
          {allModifierRows+=generateRow(modifierRowParts, sectionRowIndex+"."+i);}
          //generate row is agnostic to the rowindex type so that "1.0" will work fine
      if (rowArray[rowArray.length-1].getSelectIndex()!=0)  //if last row isn't blank add one
      {
          allModifierRows+=generateRow(modifierRowParts, sectionRowIndex+"."+rowArray.length);
          rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));
      }
       return allModifierRows;
   };
   this.setAll = function(){
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
         {rowArray[i].setValues();}
       this.update();
   };
   this.removeRow = function(rowIndex){
       rowArray.splice(rowIndex, 1);  //remove from array
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setTotalIndex(sectionRowIndex+"."+i);}  //correct all indexing
       //this.generate();  //return value ignored, only called to make a final blank row
       //this.update();
   };
   this.createRowByName = function(rowName){
       var modifierIndex=ModifierList.allModifierNames.indexOf(rowName)+1;  //+1 to avoid default
       rowArray[rowArray.length-1].name=rowName;
       rowArray[rowArray.length-1].setSelectIndex(modifierIndex);  //set the last row (which is blank) to become the new modifier
       rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+rowArray.length, sectionName));  //add a new blank row
   };
   this.save = function(sectionRowString){
       if(rowArray.length==1) return " "+sectionRowString+" />\n";
       var fileString=sectionRowString+">\n";
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       return fileString;
   };
   this.load = function(xmlSection){
       rowArray = [new ModifierObjectAgnostic(sectionRowIndex+".0", sectionName)];
      for (var i=0, j=0; i < xmlSection.length; i++)
      {
          var indexToUse=ModifierList.allModifierNames.indexOf(xmlSection[i].getAttribute("name"));
          if(indexToUse == -1){alert("Load Error: "+xmlSection[i].getAttribute("name")+" is not a modifier name. Did you mean \"Other\" with text?"); continue;}  //not found
          rowArray[j].name=xmlSection[i].getAttribute("name");
          rowArray[j].setSelectIndex(indexToUse+1);  //+1 to avoid default
          rowArray[j].setRank(xmlSection[i].getAttribute("applications"));
          rowArray[j].setText(xmlSection[i].getAttribute("text"));
          rowArray.push(new ModifierObjectAgnostic(sectionRowIndex+"."+(j+1), sectionName));
          j++;  //the index must be correct if there is a load failure
      }
   };
   this.getUniqueName = function(){
       var nameArray = new Array();
      for(var i=0; i < rowArray.length; i++)
          {nameArray.push(rowArray[i].getUniqueName());}
       nameArray.sort(function(a,b){if(a > b) return 1; if(a < b) return -1; return 0;});  //must be sorted because order doesn't matter
       return nameArray;  //it will become a string next
   };
};
function ModifierObjectAgnostic(totalIndexPassed, sectionName){
   //public:
    this.rankTotal=0;  //one will always be 0 (or both)
    this.flatTotal=0;
    this.name="";
   //private:
    var totalIndex=totalIndexPassed;
    var selectIndex=0;
    var modifierType="Free";
    var costPerRank=0;
    var hasRank=false;
    var rank=0;
    var hasText=false;
    var text="";
   this.getRank = function(){return rank;};
   this.save = function(){
       var rowString="          <Modifier name=\""+this.name+"\" ";
       if(hasRank) rowString+="applications=\""+rank+"\" ";
       if(hasText) rowString+="text=\""+text+"\" ";
       rowString+="/>\n";
       return rowString;
   };
   this.setValues = function(){
       document.getElementById(sectionName+"ModifierChoices"+totalIndex).selectedIndex=selectIndex;
       //selectIndex==0 then all will turn off
      if (hasRank)
      {
          document.getElementById(sectionName+"ModifierRankHolder"+totalIndex).style.display="inline";
          if(ModifierList.allAutoModifierCanCreate.contains(this.name)) document.getElementById(sectionName+"ModifierRankInputHolder"+totalIndex).innerHTML=rank;
             //so that you can't change the rank. ignore selective since it doesn't have rank.
         else
         {
             document.getElementById(sectionName+"ModifierRankInputHolder"+totalIndex).innerHTML=generateRow(Main[sectionName+"Section"].modifierRankRowParts, totalIndex);
             if(document.getElementById(sectionName+"ModifierRank"+totalIndex)!=undefined)
             {
                document.getElementById(sectionName+"ModifierRank"+totalIndex).value=rank;
             }
                //will be undefined first time only
         }
      }
       else document.getElementById(sectionName+"ModifierRankHolder"+totalIndex).style.display="none";
       if(hasText){document.getElementById(sectionName+"ModifierTextHolder"+totalIndex).style.display="inline"; document.getElementById(sectionName+"ModifierText"+totalIndex).value=text;}
       else document.getElementById(sectionName+"ModifierTextHolder"+totalIndex).style.display="none";
       if(Math.abs(costPerRank) <= 1 || modifierType=="Free"){document.getElementById(sectionName+"ModifierRowTotalHolder"+totalIndex).style.display="none"; return;}  //doesn't need a row total
       document.getElementById(sectionName+"ModifierRowTotalHolder"+totalIndex).style.display="inline";
       if(modifierType=="Rank") document.getElementById(sectionName+"ModifierRowTotal"+totalIndex).innerHTML=this.rankTotal;
       else document.getElementById(sectionName+"ModifierRowTotal"+totalIndex).innerHTML=this.flatTotal;
   };
   this.setTotalIndex = function(indexGiven){totalIndex=indexGiven;};
   this.select = function(){
       this.name=getOption(sectionName+"ModifierChoices"+totalIndex, "text");
       this.setSelectIndex(document.getElementById(sectionName+"ModifierChoices"+totalIndex).selectedIndex);
       document.getElementById(sectionName+"ModifierChoices"+totalIndex).selectedIndex=selectIndex;
   };
   this.setSelectIndex = function(indexGiven){
       selectIndex=sanitizeNumber(indexGiven, 0, 0);
      if (selectIndex==0)
      {
          this.rankTotal=0;
          this.flatTotal=0;
          this.name="";
          modifierType="Free";
          costPerRank=0;
          hasRank=false;
          rank=0;
          hasText=false;
          text="";
          return;
      }
       modifierType=ModifierList.allModifiersType.get(this.name);
       costPerRank=ModifierList.allModifierCosts.get(this.name);
       hasRank=(ModifierList.allModifierMaxRanks.get(this.name)!=1);
       rank=1;
       hasText=ModifierList.allModifiersWithText.contains(this.name);
       if(hasText) text=ModifierList.allModifierDefaultText[ModifierList.allModifiersWithText.indexOf(this.name)];
       if(modifierType=="Rank") this.rankTotal=costPerRank;  //*(rank 1)
       else this.rankTotal=0;
       if(modifierType=="Flat") this.flatTotal=costPerRank;
       else this.flatTotal=0;
   };
   this.changeRank = function(){
       this.setRank(document.getElementById(sectionName+"ModifierRank"+totalIndex).value);
       document.getElementById(sectionName+"ModifierRank"+totalIndex).value=rank;
   };
   this.setRank = function(rankGiven){
       if(!hasRank) return;
       if(costPerRank < 0) rank=sanitizeNumber(rankGiven, 0, 1);  //a rank 0 flaw exists but is worthless
       else rank=sanitizeNumber(rankGiven, 1, 1);  //all extras must have at least 1 rank
       if(ModifierList.allModifierMaxRanks.get(this.name)!=-1 && rank > ModifierList.allModifierMaxRanks.get(this.name)) rank=ModifierList.allModifierMaxRanks.get(this.name);
       if(modifierType=="Rank") this.rankTotal=costPerRank*rank;
       else if(modifierType=="Flat") this.flatTotal=costPerRank*rank;
   };
   this.changeText = function(){
       this.setText(document.getElementById(sectionName+"ModifierText"+totalIndex).value);
       //document.getElementById(sectionName+"ModifierText"+totalIndex).value=text;  //always the same
   };
   this.setText = function(textGiven){
       if(!hasText) return;
       text=textGiven;
   };
   this.getSelectIndex = function(){return selectIndex;};
   this.getUniqueName = function(){
       if(hasText) return this.name+" ("+text+")";
       return this.name;
   };
};
