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
    var modifierSection = new ModifierList(this, rowIndex, sectionName);
    var shouldValidateActivationInfo;  //used internally

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
   /**After this is called setAction, setRange, and setDuration will only check if the value exists.*/
   this.disableValidationForActivationInfo=function(){shouldValidateActivationInfo = false;};
   /**Returns the default action for this power or nothing if this row is blank.*/
   this.getDefaultAction=function()
   {
       if(this.isBlank()) return;
       return Data.Power.defaultAction.get(effect);
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   this.getDefaultDuration=function()
   {
       if(this.isBlank()) return;
       return Data.Power.defaultDuration.get(effect);
   };
   /**Returns the default range or nothing if this row is blank.*/
   this.getDefaultRange=function()
   {
       if(this.isBlank()) return;
       return Data.Power.defaultRange.get(effect);
   };
    /**Get the name of the power appended with text and modifiers to determine redundancy*/
    this.getUniqueName=function(){return effect+': '+text+'; '+modifierSection.getUniqueName();};  //text might be empty
    /**If true then getAutoTotal must be called*/
    this.hasAutoTotal=function(){return modifierSection.hasAutoTotal();};
    /**True if this row has no data*/
    this.isBlank=function(){return (effect === undefined);};
    this.setRowIndex=function(indexGiven){rowIndex=indexGiven; modifierSection.setSectionRowIndex(rowIndex);};

   //Onchange section
    /**Onchange function for selecting a power*/
    this.select=function(){CommonsLibrary.select.call(this, this.setPower, (sectionName+'Choices'+rowIndex), powerListParent);};
    /**Onchange function for changing the base cost (if possible)*/
    this.changeBaseCost=function(){CommonsLibrary.change.call(this, this.setBaseCost, (sectionName+'BaseCost'+rowIndex), powerListParent);};
       //won't be called if you can't set base cost
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText, (sectionName+'Text'+rowIndex), powerListParent);};
    /**Onchange function for changing the action*/
    this.selectAction=function(){CommonsLibrary.select.call(this, this.setAction, (sectionName+'SelectAction'+rowIndex), powerListParent);};
       //won't be called if SelectAction doesn't exists
    /**Onchange function for changing the range*/
    this.selectRange=function(){CommonsLibrary.select.call(this, this.setRange, (sectionName+'SelectRange'+rowIndex), powerListParent);};
    /**Onchange function for changing the duration*/
    this.selectDuration=function(){CommonsLibrary.select.call(this, this.setDuration, (sectionName+'SelectDuration'+rowIndex), powerListParent);};
    /**Onchange function for changing the user's name for the power*/
    this.changeName=function(){CommonsLibrary.change.call(this, this.setName, (sectionName+'Name'+rowIndex), powerListParent);};
    /**Onchange function for changing the skill name used for the power's attack*/
    this.changeSkill=function(){CommonsLibrary.change.call(this, this.setSkill, (sectionName+'Skill'+rowIndex), powerListParent);};
    /**Getter is used for onChange events and for other information gathering*/
    this.getModifierList=function(){return modifierSection;};  //listed here instead of getter section to match its document location
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, (sectionName+'Rank'+rowIndex), powerListParent);};

   //Value setting section
   /**Populates data of the power by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setPower=function(effectNameGiven)
   {
       modifierSection.clear();  //always clear them out on select
       if(!Data.Power.names.contains(effectNameGiven) && !Data.Power.godhoodNames.contains(effectNameGiven)){this.constructor(); return;}  //reset values
          //this is only reachable if you select the default value in the drop down

       effect = effectNameGiven;
       canSetBaseCost = Data.Power.hasInputBaseCost.contains(effect);
       baseCost = Data.Power.baseCost.get(effect);
       text = 'Descriptors and other text';
       action = Data.Power.defaultAction.get(effect);
       range = Data.Power.defaultRange.get(effect);
       duration = Data.Power.defaultDuration.get(effect);
       rank = 1;
      if (Data.Power.isAttack.contains(effect))
      {
          name = ((rowIndex+1) + ' ' + effect);
          if(powerListParent === Main.powerSection) name = 'Power ' + name;
          else name = 'Equipment ' + name;  //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness
          if(range === 'Perception') skillUsed = undefined;  //needs to be explicitly set because it might have been defined before
          else skillUsed = 'Skill used for attack';
      }
       else name = skillUsed = undefined;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setBaseCost=function(baseGiven)
   {
       if(!canSetBaseCost || this.isBlank()) return;  //only possible when loading bad data
       baseCost = sanitizeNumber(baseGiven, 1, Data.Power.baseCost.get(effect));  //unique defaults
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
       if(action === actionGiven) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.actions.contains(actionGiven))
      {
          //if not found (only possible when loading bad data)
          Main.messageUser(actionGiven + ' is not the name of an action.');
          return;
      }
       action = actionGiven;
       if(shouldValidateActivationInfo) this.validateAction();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRange=function(rangeGiven)
   {
       if(this.isBlank()) return;
       if(range === rangeGiven) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.ranges.contains(rangeGiven))
      {
          //if not found (only possible when loading bad data)
          Main.messageUser(rangeGiven + ' is not the name of a range.');
          return;
      }
       range = rangeGiven;
       if(shouldValidateActivationInfo) this.validateRange();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setDuration=function(durationGiven)
   {
       if(this.isBlank()) return;
       if(duration === durationGiven) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.durations.contains(durationGiven))
      {
          //if not found (only possible when loading bad data)
          Main.messageUser(durationGiven + ' is not the name of a duration.');
          return;
      }
       duration = durationGiven;
       if(shouldValidateActivationInfo) this.validateDuration();
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
       var htmlString = '', i;
       htmlString+='<select id="'+sectionName+'Choices'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').select();">\n';
       htmlString+='    <option>Select One</option>\n';
      for (i=0; i < Data.Power.names.length; i++)
      {
          htmlString+='    <option>'+Data.Power.names[i]+'</option>\n';
      }
      if (Main !== undefined && powerListParent !== Main.equipmentSection && (Main.powerSection.isUsingGodhoodPowers() || Main.canUseGodHood()))
      //equipment can't be god-like so I only need to check power section's switch
         //must check both hasGodhoodAdvantages and canUseGodHood since they are not yet in sync
         for (i=0; i < Data.Power.godhoodNames.length; i++)
         {
             htmlString+='    <option>'+Data.Power.godhoodNames[i]+'</option>\n';
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
         for (i=0; i < Data.Power.actions.length-1; i++)  //-1 to avoid 'None'
             {htmlString+='             <option>'+Data.Power.actions[i]+'</option>\n';}
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
      if (Data.Power.isAttack.contains(effect))
      {
          htmlString+='   <tr>\n';
          htmlString+='       <td width="34%" style="text-align:right;"></td>\n';
          htmlString+='      <td colspan="2" width="66%">\n';
          htmlString+=Data.SharedHtml.powerName(sectionName, rowIndex);
          if(range !== 'Perception') htmlString+=Data.SharedHtml.powerSkill(sectionName, rowIndex);
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
   /**Returns a json object of this row's data*/
   this.save=function()
   {
       var json={};
       json.effect=effect;
       if(canSetBaseCost) json.cost=baseCost;
       json.text=text;
       json.action=action;
       json.range=range;
       json.duration=duration;
       if(name !== undefined) json.name=name;
       if(skillUsed !== undefined) json.skill=skillUsed;  //if no name then there is also no skill but can have name without skill
       json.Modifiers=modifierSection.save();
       json.rank=rank;
       return json;
   };
   /**This sets the page's data. called only by section generate*/
   this.setValues=function()
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
       if(document.getElementById(sectionName+'Name'+rowIndex) !== null)  //might have been defined by power or modifier
          document.getElementById(sectionName+'Name'+rowIndex).value = name;
       if(document.getElementById(sectionName+'Skill'+rowIndex) !== null)
          document.getElementById(sectionName+'Skill'+rowIndex).value = skillUsed;
       document.getElementById(sectionName+'Rank'+rowIndex).value=rank;  //must come before modifiers
       modifierSection.setAll();

       var totalRankCost=baseCost+modifierSection.getRankTotal();
       if(totalRankCost > 0) document.getElementById(sectionName+'TotalCostPerRank'+rowIndex).innerHTML=totalRankCost;
       else document.getElementById(sectionName+'TotalCostPerRank'+rowIndex).innerHTML=' (1/'+(2-totalRankCost)+') ';  //awesome
       document.getElementById(sectionName+'FlatModifierCost'+rowIndex).innerHTML=modifierSection.getFlatTotal();
       document.getElementById(sectionName+'RowTotal'+rowIndex).innerHTML=total;
   };
   this.validateActivationInfo=function()
   {
       shouldValidateActivationInfo = true;

       var defaultRange = Data.Power.defaultRange.get(effect);
      if ('Personal' === range  && 'Personal' !== defaultRange)
      {
          //TODO: all errors can be improved with row # and error code
          Main.messageUser(effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
          range = defaultRange;  //can't change something to personal unless it started out as that (Feature's baseRange is Personal)
      }

       var defaultDuration = Data.Power.defaultDuration.get(effect);
      if ('Instant' === defaultDuration)
      {
         if ('Instant' !== duration)
         {
             Main.messageUser(effect + ' can\'t have ' + duration + ' duration. It can only be Instant.');
             duration = 'Instant';  //can't be changed (Feature's baseDuration is Permanent)
         }
      }
      else if ('Instant' === duration && 'Feature' !== effect)
      {
          //only Feature can change to Instant duration
          Main.messageUser(effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
          duration = defaultDuration;
      }
      else if ('Permanent' === duration && 'Personal' !== range)  //only personal range can have Permanent duration
      {
          if('Permanent' === defaultDuration) duration = 'Sustained';
          else duration = defaultDuration;
          //use default duration if possible. otherwise use Sustained
          //either way it will cost 0
          Main.messageUser(effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + range + '). Using duration of ' + duration + ' instead.');
      }

      if ('None' === action && 'Permanent' !== duration)  //only Permanent duration can have action None
      {
          action = Data.Power.defaultAction.get(effect);
          if('None' === action) action = 'Free';
          //use default action if possible. otherwise use Free
          //either way it will cost 0
          Main.messageUser(effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + duration + '). Using action of ' + action + ' instead.');
      }
      else if ('None' !== action && 'Permanent' === duration)
      {
          Main.messageUser(effect + ' can\'t have an action of ' + action + '. It can only be None because the duration is Permanent.');
          //Permanent duration can only have action None
          action = 'None';
      }

       //TODO: hand write (WET) onchange then DRY it out afterwards
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Validates action. It might make changes and create modifiers.*/
   this.validateAction=function()
   {
       var baseActionName = Data.Power.defaultAction.get(effect);
       if(baseActionName === 'None' && action !== 'None') baseActionName = 'Free';  //calculate distance from free
       var baseActionIndex = Data.Power.actions.indexOf(baseActionName);
       var newIndex = Data.Power.actions.indexOf(action);

       if(action === 'None') return;  //don't change modifiers
       if(action === 'Triggered') modifierSection.createByNameRank('Selective', 1);
          //new rules only. Triggered must also be selective so it auto adds but doesn't remove
       if(effect === 'Feature') return;  //Feature doesn't change any other modifiers

       //remove both if possible
       modifierSection.removeByName('Slower Action');
       modifierSection.removeByName('Faster Action');

       var actionDifference = (newIndex-baseActionIndex);
       if(actionDifference > 0) modifierSection.createByNameRank('Faster Action', actionDifference);
       else if(actionDifference < 0) modifierSection.createByNameRank('Slower Action', -actionDifference);
   };
   /**Validates duration. It might make changes and create modifiers.*/
   this.validateDuration=function()
   {
       var baseDurationName = Data.Power.defaultDuration.get(effect);
       if(effect !== 'Feature' && (duration === 'Instant' || baseDurationName === 'Instant')) return;
          //only Feature can set to and from instant. other attempts are only possible when loading bad data
       if(range !== 'Personal' && duration === 'Permanent') return;  //only personal range can have Permanent duration

      if (duration === 'Permanent' || duration === 'Permanent')  //if changing to or from Permanent
      {
          //then reset action
          if(baseDurationName === 'Permanent') this.setAction('Free');  //default action is None, Free is used when an action exists
          else this.setAction(Data.Power.defaultAction.get(effect));
          //action will be set to none later if duration is Permanent
      }
       //else do not set action

       var baseDurationIndex = Data.Power.durations.indexOf(baseDurationName);
       var newIndex = Data.Power.durations.indexOf(duration);
      if (effect !== 'Feature')  //Feature doesn't change modifiers
      {
          //remove both if possible
          modifierSection.removeByName('Increased Duration');
          modifierSection.removeByName('Decreased Duration');

          var durationDifference = (newIndex-baseDurationIndex);
          if(durationDifference > 0) modifierSection.createByNameRank('Increased Duration', durationDifference);
          else if(durationDifference < 0) modifierSection.createByNameRank('Decreased Duration', -durationDifference);
      }
       if(duration === 'Permanent') this.setAction('None');
   };
   /**Validates range. It might make changes and create modifiers.*/
   this.validateRange=function()
   {
       if(effect === 'Feature'){range = range; return;}  //Feature doesn't change modifiers and is always valid
       var baseRangeName = Data.Power.defaultRange.get(effect);
       if(range === 'Personal' && baseRangeName !== 'Personal') return;  //when loading bad data (Feature's baseRange is Personal)
       if(duration === 'Permanent' && range !== 'Personal') return;  //can only be Personal

       var baseRangeIndex = Data.Power.ranges.indexOf(baseRangeName);
       var newIndex = Data.Power.ranges.indexOf(range);
       if(baseRangeName === 'Personal') baseRangeIndex = Data.Power.ranges.indexOf('Close');  //calculate distance from close
       if(range === 'Personal') return;  //only possible when a modifier is removed
      if (name !== undefined)
      {
          if(range === 'Perception') skillUsed = undefined;
          else skillUsed = 'Skill used for attack';
      }

       //remove both if possible
       modifierSection.removeByName('Increased Range');
       modifierSection.removeByName('Reduced Range');

       var rangeDifference = (newIndex-baseRangeIndex);
       if(rangeDifference > 0) modifierSection.createByNameRank('Increased Range', rangeDifference);
       else if(rangeDifference < 0) modifierSection.createByNameRank('Reduced Range', -rangeDifference);
   };
   this.constructor=function()
   {
       effect = undefined;
       canSetBaseCost = undefined;
       baseCost = undefined;
       text = undefined;
       action = undefined;
       range = undefined;
       duration = undefined;
       name = undefined;
       skillUsed = undefined;
       rank = undefined;
       total = 0;
       shouldValidateActivationInfo = true;
   };
   //constructor:
    this.constructor();
}
