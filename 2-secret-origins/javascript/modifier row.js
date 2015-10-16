/**Call List onChange
Select Modifier: select();
Rank: changeRank();
Text: changeText();
*/
function ModifierObject(modifierListParent, totalIndex, sectionName)
{
   //private variable section:
    var name, modifierType, costPerRank, hasRank, maxRank, rank, hasText, text, hasAutoTotal, rawTotal, autoTotal;

   //Basic getter section (all single line)
    /**If true then getAutoTotal must be called*/
    this.doesHaveAutoTotal=function(){return hasAutoTotal;};
    this.doesHaveRank=function(){return hasRank;};
    this.doesHaveText=function(){return hasText;};
    /**Should be used only for testing not point calculations*/
    this.getAutoTotal=function(){return autoTotal;};
    this.getCostPerRank=function(){return costPerRank;};
    this.getMaxRank=function(){return maxRank;};
    this.getModifierType=function(){return modifierType;};
    /**Get the name of the modifier*/
    this.getName=function(){return name;};
    this.getRank=function(){return rank;};
    /**This total will be either flat or rank (or 0). If hasAutoTotal then the total is 0.*/
    this.getRawTotal=function(){return rawTotal;};
    this.getText=function(){return text;};

   //Single line function section
    this.getPower=function(){return modifierListParent.getParent();};
    /**True if this row has no data*/
    this.isBlank=function(){return (name === undefined);};
    /**True if this modifier increases the total power cost in any way*/
    this.isExtra=function(){return (costPerRank > 0);};
    /**True if this modifier changes the total power cost but not cost per rank*/
    this.isFlat=function(){return (modifierType === 'Flat');};
    /**True if this modifier reduces the total power cost in any way*/
    this.isFlaw=function(){return (costPerRank < 0);};
    /**True if this modifier doesn't change any totals*/
    this.isFree=function(){return (modifierType === 'Free');};
    /**True if this modifier changes the cost per rank*/
    this.isRank=function(){return (modifierType === 'Rank');};
    this.setTotalIndex=function(indexGiven){totalIndex=indexGiven;};

   //Onchange section
    /**Onchange function for selecting a modifier*/
    this.select=function(){CommonsLibrary.select.call(this, this.setModifier, (sectionName+'ModifierChoices'+totalIndex), modifierListParent);};
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, (sectionName+'ModifierRank'+totalIndex), modifierListParent);};
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText, (sectionName+'ModifierText'+totalIndex), modifierListParent);};

   //Value setting section
   /**Populates data of the modifier by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setModifier=function(nameGiven)
   {
       if(!Data.Modifier.names.contains(nameGiven)){this.constructor(); return;}  //reset row
       if(name === 'Selective' && this.getPower().getAction() === 'Triggered') return;  //prevent removing this row

       name = nameGiven;
       modifierType = Data.Modifier.type.get(name);
       costPerRank = Data.Modifier.cost.get(name);
       maxRank = Data.Modifier.maxRank.get(name);
       hasRank = (maxRank !== 1);
       rank = 1;
       hasText = Data.Modifier.hasText.contains(name);
       if(hasText) text = Data.Modifier.defaultText.get(name);
       else text = undefined;
       hasAutoTotal = Data.Modifier.hasAutoTotal.contains(name);
       this.calculateTotal();

       if(name === 'Attack' || name === 'Affects Others Only' || name === 'Affects Others Also') this.getPower().setRange('Close');
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       //TODO: test that this allows setting auto
      //if (Data.Modifier.hasAutoRank.contains(name))  //ModifierList.allAutoModifierCanCreate are span so that this isn't called (can't change them anyway)
          //return;  //can't change the rank since it is auto
       if(!hasRank) return;  //can only happen when loading bad data
       if(name === 'Fragile') rank = sanitizeNumber(rankGiven, 0, 0);  //the only modifier than can have 0 ranks
       else rank = sanitizeNumber(rankGiven, 1, 1);  //all others must have at least 1 rank
       if(rank > maxRank) rank = maxRank;
       this.calculateTotal();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;
       if(!hasText) return;  //can only happen when loading bad data
       text=textGiven;
   };

   //Other public functions section
   /**A place that address all quirks in total cost. Will set the total to the correct number for raw total calculation.*/
   this.calculateTotal=function()
   {
       if(hasAutoTotal){rawTotal=0; return;}  //so that it will not affect the rawTotal
       rawTotal=costPerRank*rank;
       if((name === 'Decreased Duration' && this.getPower().getDefaultDuration() === 'Permanent') ||
          (name === 'Increased Duration' && this.getPower().getDuration() === 'Permanent')) rawTotal=costPerRank*(rank-2);
       if((name === 'Reduced Range' && this.getPower().getDefaultRange() === 'Perception') ||
          (name === 'Increased Range' && this.getPower().getRange() === 'Perception')) rawTotal=costPerRank*(rank+1);
   };
   /**This creates the page's html (for the row). called by modifier section only*/
   this.generate=function()
   {
       var powerRowIndex = Number(totalIndex.split('.')[0]);
       var modifierRowIndex = Number(totalIndex.split('.')[1]);
       var htmlString='';
       htmlString+='   <tr>\n';  //TODO: confirm
       htmlString+='      <td width="34%" style="text-align:right;">\n';
      if (this.getPower().getEffect() === 'Feature' || !Data.Modifier.actionRangeDuration.contains(name))
      {
          htmlString+='         <select id="'+sectionName+'ModifierChoices'+totalIndex+'" onChange="Main.'+sectionName+'Section.getRow('+powerRowIndex+').getModifierList().getRow('+modifierRowIndex+').select()">\n';
          htmlString+='             <option>Select One</option>\n';
         for (var i=0; i < Data.Modifier.names.length; i++)
         {
             if(this.getPower().getSection() === Main.equipmentSection &&
                (Data.Modifier.names[i] === 'Removable' || Data.Modifier.names[i] === 'Easily Removable')) continue;
                  //equipment has removable built in and can't have the modifiers
             if(this.getPower().getEffect() === 'Feature' || !Data.Modifier.actionRangeDuration.contains(Data.Modifier.names[i]))
                htmlString+='             <option>'+Data.Modifier.names[i]+'</option>\n';
         }
          htmlString+='         </select>\n';
      }
       else htmlString+='          <b><span id="'+sectionName+'ModifierName'+totalIndex+'"></span></b>\n';  //I know I could have the b tag with the id but I don't like that
       htmlString+='      </td>\n';
       htmlString+='      <td colspan="2" width="66%">\n';
      if (name === 'Attack')
      {
          htmlString+=Data.SharedHtml.powerName(sectionName, powerRowIndex);
          if(this.getPower().getRange() !== 'Perception') htmlString+=Data.SharedHtml.powerSkill(sectionName, powerRowIndex);
      }
      else if (!this.isBlank())  //do not add anything else except the closing table parts
      {
          //if hasAutoTotal then hasRank is false
         if (hasRank)
         {
             if(this.getPower().getEffect() !== 'Feature' && Data.Modifier.hasAutoRank.contains(name)) htmlString+='          Cost <span id="'+sectionName+'ModifierRankSpan'+totalIndex+'"></span>\n';
                //only Feature can change the ranks of these
            else
            {
                htmlString+='          Applications ';
                htmlString+='<input type="text" size="1" id="'+sectionName+'ModifierRank'+totalIndex+'" onChange="Main.'+sectionName+'Section.getRow('+powerRowIndex+').getModifierList().getRow('+modifierRowIndex+').changeRank()" />\n';
            }
         }
          if(hasText) htmlString+='          Text <input type="text" id="'+sectionName+'ModifierText'+totalIndex+'" size="40" onChange="Main.'+sectionName+'Section.getRow('+powerRowIndex+').getModifierList().getRow('+modifierRowIndex+').changeText()" />\n';
          if(hasAutoTotal || Math.abs(costPerRank) > 1 || rawTotal !== (costPerRank*rank)) htmlString+='          = <span id="'+sectionName+'ModifierRowTotal'+totalIndex+'"></span>\n';
          //auto total must see total (it doesn't show ranks), if costPerRank isn't 1 then show total to show how much its worth,
          //if total doesn't match then it has had some cost quirk so show the total
          //yes I know if hasAutoTotal then rawTotal !== (costPerRank*rank) but including hasAutoTotal is fast and more clear
      }
       htmlString+='      </td>\n';
       htmlString+='   </tr>\n';
       return htmlString;
   };
   /**Get the name of the modifier appended with text to determine redundancy*/
   this.getUniqueName=function(includeText)
   {
       var nameToUse;
       //all these are exclusive:
       if(name === 'Affects Others Also' || name === 'Affects Others Only') nameToUse='Affects Others';
       else if(name === 'Affects Objects Also' || name === 'Affects Objects Only') nameToUse='Affects Objects';
       else if(name === 'Alternate Resistance (Free)' || name === 'Alternate Resistance (Cost)') nameToUse='Alternate Resistance';
       else if(name === 'Easily Removable') nameToUse='Removable';
       else if(name === 'Dynamic Alternate Effect') nameToUse='Alternate Effect';
       else if(name === 'Inaccurate') nameToUse='Accurate';
       else if(name === 'Extended Range' || name === 'Diminished Range') nameToUse='Extended/Diminished Range';
       //TODO: is uncontrolable entirely a unique modifer?
       else nameToUse=name;
       //TODO: so I noticed that text should not be used most of the time for uniqueness (check required is only maybe)

       if(includeText && hasText) return (nameToUse+' ('+text+')');
       return nameToUse;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
       var json={};
       json.name=name;
       if(hasRank) json.applications=rank;
       if(hasText) json.text=text;
       return json;
   };
   /**Takes the power row raw total, sets the auto ranks, and returns the power row grand total.*/
   this.setAutoRank=function(powerRowRawTotal)
   {
       if(this.isBlank() || !hasAutoTotal) return powerRowRawTotal;

       if(name === 'Dynamic Alternate Effect'){autoTotal=2-powerRowRawTotal; return 2;}  //only exists in old rules
       if(name === 'Alternate Effect' && Main.isOldRules()){autoTotal=1-powerRowRawTotal; return 1;}
       //Alternate Effect in old rules forced the power to be worth a total of 1 (or 2 for Dynamic). the the flaw is all but 1

       //name can't be both alt and removable
       if(name === 'Alternate Effect') autoTotal=Math.floor(powerRowRawTotal/2);
       else if(name === 'Easily Removable') autoTotal=Math.floor(powerRowRawTotal/5);
       else if(name === 'Removable') autoTotal=Math.floor(powerRowRawTotal/5)*2;  //the *2 is outside of the floor intentionally

       return (powerRowRawTotal+autoTotal);  //autoTotal is always negative
   };
   /**This set the page's data. called only by section generate*/
   this.setValues=function()
   {
       if(this.isBlank()) return;  //already set (to default)
       if (document.getElementById(sectionName+'ModifierChoices'+totalIndex) !== null)
          SelectUtil.setText((sectionName+'ModifierChoices'+totalIndex), name);
       else document.getElementById(sectionName+'ModifierName'+totalIndex).innerHTML = name;
       if(document.getElementById(sectionName+'ModifierRankSpan'+totalIndex) !== null)
          document.getElementById(sectionName+'ModifierRankSpan'+totalIndex).innerHTML = rank;
       else if(hasRank) document.getElementById(sectionName+'ModifierRank'+totalIndex).value = rank;  //input
       if(hasText) document.getElementById(sectionName+'ModifierText'+totalIndex).value = text;
       if(document.getElementById(sectionName+'ModifierRowTotal'+totalIndex) !== null && hasAutoTotal)
          document.getElementById(sectionName+'ModifierRowTotal'+totalIndex).innerHTML = autoTotal;
       else if(document.getElementById(sectionName+'ModifierRowTotal'+totalIndex) !== null)
          document.getElementById(sectionName+'ModifierRowTotal'+totalIndex).innerHTML = rawTotal;
          //all hasAutoTotal are -1 but will still set this
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this.constructor=function()
   {
       name = undefined;
       modifierType = undefined;
       costPerRank = undefined;
       maxRank = undefined;
       hasRank = undefined;
       rank = undefined;
       hasText = undefined;
       text = undefined;
       hasAutoTotal = false;
       rawTotal = 0;
       autoTotal = undefined;
   };
   //constructor:
    this.constructor();
}
