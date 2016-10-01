/**Updates:
modifiers
if (equipment)
{
    Main.advantageSection.calculateValues();
    Main.advantageSection.generate();
}
Main.updateOffense();
Main.defenseSection.calculateValues();
*/
/**Use (this === Main.equipmentSection) instead of checking the sectionName. but sectionName is still needed and passed for document reasons*/
function PowerListAgnostic(sectionName)
{
   //private variable section:
    var total=0, protectionRankTotal=0, usingGodhoodPowers=false;
    var rowArray=[];
    var attackEffectRanks=new MapDefault({}, 0);

   //Single line function section
    this.getAttackEffectRanks=function(){return attackEffectRanks;};
    this.getProtectionRankTotal=function(){return protectionRankTotal;};
    this.getTotal=function(){return total;};
    this.isUsingGodhoodPowers=function(){return usingGodhoodPowers;};

   //public common section
    /**Removes all rows then updates*/
    this.clear=function(){CommonsLibrary.clear.call(this, rowArray);};
    /**Returns the row object or nothing if the index is out of range. Used in order to call each onChange*/
    this.getRow=function(rowIndex){return CommonsLibrary.getRow(rowArray, rowIndex);};
    /**Returns an array of json objects for this section's data*/
    this.save=function(){return CommonsLibrary.saveRows(rowArray);};
    /**Does each step for an onChange*/
    this.update=function(){CommonsLibrary.update.call(this);};

   //'private' commons section. Although all public none of these should be called from outside of this object
    /**This creates the page's html (for the section)*/
    this.generate=function(){CommonsLibrary.generate.call(this, rowArray, sectionName);};
    /**Removes the row from the array and updates the index of all others in the list.*/
    this.removeRow=function(rowIndex){CommonsLibrary.removeRow(rowArray, rowIndex);};
    /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
    this.sanitizeRows=function(){CommonsLibrary.sanitizeRows.call(this, rowArray);};
       //getUniqueName includes all modifiers since you may have the same power with different modifiers
    /**This set the page's data. called only by generate*/
    this.setAll=function(){CommonsLibrary.setAll(rowArray);};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       this.sanitizeRows();
       attackEffectRanks.clear();
       protectionRankTotal=0;
       usingGodhoodPowers=false;
       total=0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          rowArray[i].calculateValues();  //will calculate rank and total
          var powerEffect = rowArray[i].getEffect();
          var rank = rowArray[i].getRank();
          if(Data.Power.godhoodNames.contains(powerEffect)) usingGodhoodPowers=true;
          else if(powerEffect === 'Protection' && rank > protectionRankTotal) protectionRankTotal = rank;
             //protection doesn't stack and may have more than 1
          if(rowArray[i].getName() !== undefined) attackEffectRanks.add(rowArray[i].getSkillUsed(), i);
          total+=rowArray[i].getTotal();
      }
   };
   /**Short hand version of Main.powerSection.getRow(0).getModifierList().getRow(0) is instead Main.powerSection.getModifierRowShort(0, 0)*/
   this.getModifierRowShort=function(powerRowIndex, modifierRowIndex)
   {
       if(powerRowIndex >= powerRowIndex.length) return;  //range checking of modifierRowIndex will be handled in getRow
       return rowArray[powerRowIndex].getModifierList().getRow(modifierRowIndex);
   };
   /**Sets data from a json object given then updates*/
   this.load=function(jsonSection)
   {
       //the row array isn't cleared in case some have been auto set
       //Main.clear() is called at the start of Main.load()
      for (var i=0; i < jsonSection.length; i++)
      {
          var nameToLoad = jsonSection[i].effect;
          if(!Data.Power.names.contains(nameToLoad) && !Data.Power.godhoodNames.contains(nameToLoad))
             {Main.messageUser('PowerListAgnostic.load.notExist', sectionName.toTitleCase() + ' #' + (i+1) + ': ' +
              nameToLoad + ' is not a power name.'); continue;}
          if(Data.Power.godhoodNames.contains(nameToLoad) && !Main.canUseGodHood())
             {Main.messageUser('PowerListAgnostic.load.godhood', sectionName.toTitleCase() + ' #' + (i+1) + ': ' +
              nameToLoad + ' is not allowed because transcendence is ' + Main.getTranscendence() + '.'); continue;}
          var rowPointer = rowArray.last();
          rowPointer.setPower(nameToLoad);  //must be done first
          if(undefined !== jsonSection[i].cost) rowPointer.setBaseCost(jsonSection[i].cost);
          rowPointer.setText(jsonSection[i].text);  //they all have text because descriptors
          rowPointer.disableValidationForActivationInfo();
          //blindly set activation info then validate
          rowPointer.setAction(jsonSection[i].action);  //all sets take strings
          rowPointer.setRange(jsonSection[i].range);
          rowPointer.setDuration(jsonSection[i].duration);
          rowPointer.validateActivationInfo();  //also creates all faster action etc
          //TODO: setName and setSkill should check if allowed
          if(undefined !== jsonSection[i].name) rowPointer.setName(jsonSection[i].name);
          if(undefined !== jsonSection[i].skill) rowPointer.setSkill(jsonSection[i].skill);
          //skill requires name however perception range has name without skill
          rowPointer.setRank(jsonSection[i].rank);
          rowPointer.getModifierList().load(jsonSection[i].Modifiers);  //load modifiers
          this.addRow();
      }
       this.update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
    /**Creates a new row at the end of the array*/
    this.addRow=function(){rowArray.push(new PowerObjectAgnostic(this, rowArray.length, sectionName));};
   /**Updates other sections which depend on power section*/
   this.notifyDependent=function()
   {
      if (this === Main.equipmentSection)
      {
          Main.advantageSection.calculateValues();  //in case of too low or too high equipment advantage rank
          Main.advantageSection.generate();  //in case a new equipment row needs to be added (or removed)
          //do not call advantageSection.update. It isn't needed: equipment doesn't affect defense and the rest is covered below
      }
       Main.updateOffense();
       Main.defenseSection.calculateValues();
   };
   //constructor:
    CommonsLibrary.initializeRows.call(this);
}
