/**Call List onChange
Select Power: select();
Base: changeBaseCost();
Text: changeText();
Action: selectAction();
Range: selectRange();
Duration: selectDuration();
Name: changeName();
Skill Used: changeSkill();
(see modifier file)
Rank: changeRank();
*/
function PowerObjectAgnostic(powerListParent, rowIndex, sectionName)
{
   //private variable section:
    var effect, canSetBaseCost, baseCost, text, action, range, duration, name, skillUsed, rank, total;
    var modifierSection=new ModifierList(this, rowIndex, sectionName);

   //Basic getter section (all single line)
    this.getAction=function(){return action;};
    this.getBaseCost=function(){return baseCost;};
    this.getDuration=function(){return duration;};
    /**Get the effect name of the power*/
    this.getEffect=function(){return effect;};
    /**Get the user's name for the power*/
    this.getName=function(){return name;};
    this.getRange=function(){return range;};
    this.getRank=function(){return rank;};
    this.getSkillUsed=function(){return skillUsed;};
    this.getText=function(){return text;};
    /**The total with respect to auto changes and raw total*/
    this.getTotal=function(){return total;};
    //for modifierSection see this.getModifierList in the onChange section
    this.isBaseCostSettable=function(){return canSetBaseCost;};
    this.getSection=function(){return powerListParent;};

   //Single line function section (ignoring isBlank check)
   /**Returns the default action for this power or nothing if this row is blank.*/
   this.getDefaultAction=function()
   {
       if(this.isBlank()) return;
       return PowerData.defaultAction.get(effect);
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   this.getDefaultDuration=function()
   {
       if(this.isBlank()) return;
       return PowerData.defaultDuration.get(effect);
   };
   /**Returns the default range or nothing if this row is blank.*/
   this.getDefaultRange=function()
   {
       if(this.isBlank()) return;
       return PowerData.defaultRange.get(effect);
   };
    /**Get the name of the power appended with text and modifiers to determine redundancy*/
    this.getUniqueName=function(){return effect+': '+text+'; '+modifierSection.getUniqueName();};  //text might be empty
    /**If true then getAutoTotal must be called*/
    this.hasAutoTotal=function(){return modifierSection.hasAutoTotal();};
    /**True if this row has no data*/
    this.isBlank=function(){return (effect == undefined);};
    this.setRowIndex=function(indexGiven){rowIndex=indexGiven; modifierSection.setSectionRowIndex(rowIndex);};

   //Onchange section
   /**Onchange function for selecting a power*/
   this.select=function()
   {
       this.setPower(SelectUtil.getTextById(sectionName+'Choices'+rowIndex));
       powerListParent.update();
   };
   /**Onchange function for changing the base cost (if possible)*/
   this.changeBaseCost=function()  //won't be called if you can't set base cost
   {
       this.setBaseCost(document.getElementById(sectionName+'BaseCost'+rowIndex).value);
       //document doesn't need to be reset because setAll will do that
       powerListParent.update();
   };
   /**Onchange function for changing the text*/
   this.changeText=function()
   {
       this.setText(document.getElementById(sectionName+'Text'+rowIndex).value);
       powerListParent.update();
   };
   /**Onchange function for changing the action*/
   this.selectAction=function()  //can only be called if SelectAction exists
   {
       this.setAction(SelectUtil.getTextById(sectionName+'SelectAction'+rowIndex));
       //document doesn't need to be reset because setAll will do that
       powerListParent.update();
   };
   /**Onchange function for changing the range*/
   this.selectRange=function()
   {
       this.setRange(SelectUtil.getTextById(sectionName+'SelectRange'+rowIndex));
       //document doesn't need to be reset because setAll will do that
       powerListParent.update();
   };
   /**Onchange function for changing the duration*/
   this.selectDuration=function()
   {
       this.setDuration(SelectUtil.getTextById(sectionName+'SelectDuration'+rowIndex));
       //document doesn't need to be reset because setAll will do that
       powerListParent.update();
   };
   /**Onchange function for changing the user's name for the power*/
   this.changeName=function()
   {
       this.setName(document.getElementById(sectionName+'Name'+rowIndex).value);
       powerListParent.update();
   };
   /**Onchange function for changing the skill name used for the power's attack*/
   this.changeSkill=function()
   {
       this.setSkill(document.getElementById(sectionName+'Skill'+rowIndex).value);
       powerListParent.update();
   };
    /**Getter is used for onChange events and for other information gathering*/
    this.getModifierList=function(){return modifierSection;};  //listed here instead of getter section to match its document location
   /**Onchange function for changing the rank*/
   this.changeRank=function()
   {
       this.setRank(document.getElementById(sectionName+'Rank'+rowIndex).value);
       //document doesn't need to be reset because setAll will do that
       powerListParent.update();
   };

   //Value setting section
   /**Populates data of the power by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setPower=function(effectNameGiven)
   {
       modifierSection.clear();  //always clear them out on select
       if(!PowerData.names.contains(effectNameGiven)){this.constructor(); return;}  //reset values

       effect = effectNameGiven;
       canSetBaseCost = PowerData.hasInputBaseCost.contains(effect);
       baseCost = PowerData.baseCost.get(effect);
       text = 'Descriptors and other text';
       action = PowerData.defaultAction.get(effect);
       range = PowerData.defaultRange.get(effect);
       duration = PowerData.defaultDuration.get(effect);
       rank = 1;
      if (PowerData.isAttack.contains(effect))
      {
          name = ((rowIndex+1) +' '+effect);
          if(range === 'Perception') skillUsed = undefined;
          else skillUsed = 'Skill used for attack';
      }
       else name = undefined;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setBaseCost=function(baseGiven)
   {
       if(!canSetBaseCost || this.isBlank()) return;  //only possible when loading bad data
       baseCost = sanitizeNumber(baseGiven, 1, PowerData.baseCost.get(effect));  //unique defaults
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;
       text = textGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setAction=function(actionGiven)
   {
       if(this.isBlank()) return;
       if(action === actionGiven) return;  //nothing has changed
       if(effect === 'Feature'){action = actionGiven; return;}  //Feature doesn't change modifiers and is always valid
       var baseActionName = PowerData.defaultAction.get(effect);
       if(baseActionName === 'None' && actionGiven !== 'None') baseActionName = 'Free';  //calculate distance from free
       var baseActionIndex = PowerData.actions.indexOf(baseActionName);
       var newIndex = PowerData.actions.indexOf(actionGiven);
       if(newIndex === -1){action = baseActionName; return;}  //if not found (only possible when loading bad data)
       if(actionGiven === 'None') return;  //don't change modifiers
       if(actionGiven === 'Triggered') modifierSection.createByNameRank('Selective', 1);
          //new rules only. Triggered must also be selective so it auto adds but doesn't remove

       //remove both if possible
       modifierSection.removeByName('Slower Action');
       modifierSection.removeByName('Faster Action');

       action = actionGiven;
       var actionDifference = (newIndex-baseActionIndex);
       if(actionDifference > 0) modifierSection.createByNameRank('Faster Action', actionDifference);
       else if(actionDifference < 0) modifierSection.createByNameRank('Slower Action', -actionDifference);
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRange=function(rangeGiven)
   {
       if(this.isBlank()) return;
       if(range === rangeGiven) return;  //nothing has changed (only possible when loading)
       if(effect === 'Feature'){range = rangeGiven; return;}  //Feature doesn't change modifiers and is always valid
       var baseRangeName = PowerData.defaultRange.get(effect);
       if(rangeGiven === 'Personal' && baseRangeName !== 'Personal') return;  //when loading bad data. only Feature can change duration to Personal
       if(duration === 'Permanent' && rangeGiven !== 'Personal') return;  //can only be Personal
       var baseRangeIndex = PowerData.ranges.indexOf(baseRangeName);
       var newIndex = PowerData.ranges.indexOf(rangeGiven);
       if(newIndex === -1){range = baseRangeName; return;}  //if not found (only possible when loading bad data)
       if(baseRangeName === 'Personal') baseRangeIndex = PowerData.ranges.indexOf('Close');  //calculate distance from close
       if(rangeGiven === 'Personal') return;  //only possible when a modifier is removed
      if (name != undefined)
      {
          if(rangeGiven === 'Perception') skillUsed = undefined;
          else skillUsed = 'Skill used for attack';
      }

       //remove both if possible
       modifierSection.removeByName('Increased Range');
       modifierSection.removeByName('Reduced Range');

       range = rangeGiven;
       var rangeDifference = (newIndex-baseRangeIndex);
       if(rangeDifference > 0) modifierSection.createByNameRank('Increased Range', rangeDifference);
       else if(rangeDifference < 0) modifierSection.createByNameRank('Reduced Range', -rangeDifference);
   };
   /**Used to set data independent of the document and without calling update*/
   this.setDuration=function(durationGiven)
   {
       if(this.isBlank()) return;
       if(duration === durationGiven) return;  //nothing has changed
       if(effect === 'Feature'){duration = durationGiven; return;}  //Feature doesn't change modifiers and is always valid
       var baseDurationName = PowerData.defaultDuration.get(effect);
       if(durationGiven === 'Instant' || baseDurationName === 'Instant') return;  //only possible when loading bad data
       if(range !== 'Personal' && durationGiven === 'Permanent') return;  //only personal range can have Permanent duration

       if(baseDurationName === 'Permanent') this.setAction('Free');  //reset action. will be set to none later if durationGiven is Permanent
       else if(durationGiven === 'Permanent') this.setAction(PowerData.defaultAction.get(effect));  //reset action (set to none later)
       //else do not set action

       var baseDurationIndex = PowerData.durations.indexOf(baseDurationName);
       var newIndex = PowerData.durations.indexOf(durationGiven);
       if(newIndex === -1){duration = baseDurationName; return;}  //if not found (only possible when loading bad data)

       //remove both if possible
       modifierSection.removeByName('Increased Duration');
       modifierSection.removeByName('Decreased Duration');

       duration = durationGiven;
       var durationDifference = (newIndex-baseDurationIndex);
       if(durationDifference > 0) modifierSection.createByNameRank('Increased Duration', durationDifference);
       else if(durationDifference < 0) modifierSection.createByNameRank('Decreased Duration', -durationDifference);

       if(durationGiven === 'Permanent') this.setAction('None');
   };
   /**Used to set data independent of the document and without calling update*/
   this.setName=function(nameGiven)
   {
       if(this.isBlank()) return;
       name = nameGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setSkill=function(skillGiven)
   {
       if(this.isBlank()) return;
       skillUsed = skillGiven;
   };
    //for modifierSection see this.getModifierList in the onChange section
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       rank = sanitizeNumber(rankGiven, 1, 1);
   };

   //public function section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       modifierSection.calculateValues();
       var costPerRank=baseCost + modifierSection.getRankTotal();
       if(costPerRank < 1) costPerRank=1/(2-costPerRank);
       total=Math.ceil(costPerRank*rank);  //round up
       var flatValue=modifierSection.getFlatTotal();
      if (flatValue < 0 && (total+flatValue) < 1)  //flat flaw more than (or equal to) the total cost is not allowed. so adjust the power rank
      {
          rank=(Math.abs(flatValue)/costPerRank);
          rank=Math.floor(rank)+1;  //must be higher than for this to work. don't use ceil so that if whole number will still be +1
          total=Math.ceil(costPerRank*rank);  //round up
      }
       total+=flatValue;  //might be negative
       if(effect === 'A God I Am') total+=145;  //for first ranks
       else if(effect === 'Reality Warp') total+=75;
       total=modifierSection.calculateGrandTotal(total);  //used to calculate all auto modifiers
   };
   /**This creates the page's html (for the row). called by power section only*/
   this.generate=function()
   {
       var htmlString='';
       htmlString+='<select id="'+sectionName+'Choices'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').select();">\n';
       htmlString+='    <option>Select One</option>\n';
      for (var i=0; i < PowerData.names.length; i++)
      {
          htmlString+='    <option>'+PowerData.names[i]+'</option>\n';
      }
      if (Main != undefined && powerListParent !== Main.equipmentSection && (Main.powerSection.isUsingGodhoodPowers() || Main.canUseGodHood()))
      //equipment can't be god-like so I only need to check power section's switch
         //must check both hasGodhoodAdvantages and canUseGodHood since they are not yet in sync
         for (var i=0; i < PowerData.godhoodNames.length; i++)
         {
             htmlString+='    <option>'+PowerData.godhoodNames[i]+'</option>\n';
         }
       htmlString+='</select>\n';
       if(this.isBlank()) return htmlString;  //done

       htmlString+='Base Cost per Rank:\n';
       if(canSetBaseCost) htmlString+='<input type="text" size="1" id="'+sectionName+'BaseCost'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeBaseCost();" />';
       else htmlString+='<span id="'+sectionName+'BaseCost'+rowIndex+'" style="display: inline-block; width: 50px; text-align: center;"></span>\n';
       htmlString+='<input type="text" size="90" id="'+sectionName+'Text'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeText();" />\n';
       htmlString+='<br />\n';
       htmlString+='<table width="100%">\n';
       htmlString+='   <tr>\n';

       htmlString+='      <td width="34%" style="text-align:right;">\n';
       htmlString+='          Action\n';
       //feature has the same action as the others
       if(action === 'None') htmlString+='          <span id="'+sectionName+'SelectAction'+rowIndex+'" style="display: inline-block; width: 85px; text-align: center;"></span>\n';
          //same as duration === 'Permanent'. although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
      else
      {
          htmlString+='         <select id="'+sectionName+'SelectAction'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectAction();">\n';
         for (var i=0; i < PowerData.actions.length-1; i++)  //-1 to avoid 'None'
             {htmlString+='             <option>'+PowerData.actions[i]+'</option>\n';}
          htmlString+='         </select>\n';
      }
       htmlString+='      </td>\n';

       htmlString+='      <td colspan="2" width="66%">\n';
       htmlString+='          Range\n';
       var sharedString='          <select id="'+sectionName+'SelectRange'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectRange();"><option>Close</option><option>Ranged</option><option>Perception</option>';
      if (effect === 'Feature')  //has unique drop downs
      {
          //always has selects
          htmlString+=sharedString+'<option>Personal</option></select>\n';
      }
      else
      {
          if(range === 'Personal') htmlString+='          <span id="'+sectionName+'SelectRange'+rowIndex+'" style="display: inline-block; width: 90px; text-align: center;"></span>\n';
          else htmlString+=sharedString+'</select>\n';
      }
       htmlString+='          Duration\n';
       sharedString='          <select id="'+sectionName+'SelectDuration'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectDuration();"><option>Concentration</option><option>Sustained</option><option>Continuous</option>';
      if (effect === 'Feature')  //has unique drop downs
          htmlString+=sharedString+'<option>Permanent</option><option>Instant</option></select>\n';  //always has selects
      else
      {
          if(range === 'Personal') sharedString+='<option>Permanent</option>';
          if(duration === 'Instant') htmlString+='          <span id="'+sectionName+'SelectDuration'+rowIndex+'" style="display: inline-block; width: 80px; text-align: center;"></span>\n';
          else htmlString+=sharedString+'</select>\n';
      }
       htmlString+='      </td>\n';
       htmlString+='   </tr>\n';
      if (PowerData.isAttack.contains(effect))
      {
          htmlString+='   <tr>\n';
          htmlString+='       <td width="34%" style="text-align:right;"></td>\n';
          htmlString+='      <td colspan="2" width="66%">\n';
          htmlString+=SharedHtmlData.powerName(sectionName, rowIndex);
          if(range !== 'Perception') htmlString+=SharedHtmlData.powerSkill(sectionName, rowIndex);
          htmlString+='      </td>\n';
          htmlString+='   </tr>\n';
      }

       htmlString+=modifierSection.generate();

       htmlString+='</table>\n';
       htmlString+='Ranks:\n';
       htmlString+='<input type="text" size="1" id="'+sectionName+'Rank'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeRank();" />\n';
       htmlString+='Total Cost Per Rank:\n';
       htmlString+='<span id="'+sectionName+'TotalCostPerRank'+rowIndex+'"></span>.\n';
       htmlString+='Total Flat Modifier Cost:\n';
       htmlString+='<span id="'+sectionName+'FlatModifierCost'+rowIndex+'"></span>\n';
       htmlString+='=\n';
       htmlString+='<span id="'+sectionName+'RowTotal'+rowIndex+'"></span>\n';
       htmlString+='<br /><br />\n\n';
       return htmlString;
   };
   /**Returns an xml string of this row's data*/
   this.save=function()
   {
       var fileString='      <Row effect="'+effect+'" ';
       if(canSetBaseCost) fileString+='cost="'+baseCost+'" ';
       fileString+='text="'+text+'" ';
       fileString+='action="'+action+'" ';
       fileString+='range="'+range+'" ';
       fileString+='duration="'+duration+'" ';
       if(name != undefined) fileString+='name="'+name+'" ';
       if(skillUsed != undefined) fileString+='skill="'+skillUsed+'" ';
       fileString+='rank="'+rank+'"';  //must be before modifiers
       fileString+=modifierSection.save();  //with self close if there are no modifiers
       if(modifierSection.getRow(0).isBlank()) fileString=' '+fileString;  //no modifiers
       else fileString+='      </Row>\n';
       return fileString;
   };
   /**This sets the page's data. called only by section generate*/
   this.setValues=function setValues()
   {
       if(this.isBlank()) return;  //already set (to default)
       SelectUtil.setText((sectionName+'Choices'+rowIndex), effect);
       if(canSetBaseCost) document.getElementById(sectionName+'BaseCost'+rowIndex).value = baseCost;
       else document.getElementById(sectionName+'BaseCost'+rowIndex).innerHTML = baseCost;
       document.getElementById(sectionName+'Text'+rowIndex).value=text;  //might be empty
       //feature has the same action as the others
       if(action === 'None') document.getElementById(sectionName+'SelectAction'+rowIndex).innerHTML = '<b>None</b>';
          //same as duration === 'Permanent'
       else SelectUtil.setText((sectionName+'SelectAction'+rowIndex), action);
      if (effect === 'Feature')  //has unique drop downs
      {
          //these 2 holders always have selects
          SelectUtil.setText((sectionName+'SelectRange'+rowIndex), range);
          SelectUtil.setText((sectionName+'SelectDuration'+rowIndex), duration);
      }
      else
      {
          if(range === 'Personal') document.getElementById(sectionName+'SelectRange'+rowIndex).innerHTML = '<b>Personal</b>';
          else SelectUtil.setText((sectionName+'SelectRange'+rowIndex), range);
          if(duration === 'Instant') document.getElementById(sectionName+'SelectDuration'+rowIndex).innerHTML = '<b>Instant</b>';
          else SelectUtil.setText((sectionName+'SelectDuration'+rowIndex), duration);
      }
       if(document.getElementById(sectionName+'Name'+rowIndex) != undefined)  //might have been defined by power or modifier
          document.getElementById(sectionName+'Name'+rowIndex).value = name;
       if(document.getElementById(sectionName+'Skill'+rowIndex) != undefined)
          document.getElementById(sectionName+'Skill'+rowIndex).value = skillUsed;
       document.getElementById(sectionName+'Rank'+rowIndex).value=rank;  //must come before modifiers
       modifierSection.setAll();

       var totalRankCost=baseCost+modifierSection.getRankTotal();
       if(totalRankCost > 0) document.getElementById(sectionName+'TotalCostPerRank'+rowIndex).innerHTML=totalRankCost;
       else document.getElementById(sectionName+'TotalCostPerRank'+rowIndex).innerHTML=' (1/'+(2-totalRankCost)+') ';  //awesome
       document.getElementById(sectionName+'FlatModifierCost'+rowIndex).innerHTML=modifierSection.getFlatTotal();
       document.getElementById(sectionName+'RowTotal'+rowIndex).innerHTML=total;
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this.constructor=function()
   {
       effect=undefined;
       canSetBaseCost=undefined;
       baseCost=undefined;
       text=undefined;
       action=undefined;
       range=undefined;
       duration=undefined;
       name=undefined;
       skillUsed=undefined;
       rank=undefined;
       total=0;
   };
   //constructor:
    this.constructor();
}
