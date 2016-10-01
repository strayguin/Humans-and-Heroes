/**Updates:
Main.updateOffense();
*/
function SkillList()
{
   //private variable section:
    var closeCombatMap = new MapDefault({}, 0);
    var rangedCombatMap = new MapDefault({}, 0);
    var maxSkillRanks = new MapDefault({}, 0);
    var rowArray=[];
    var total=0;

   //Single line function section
    this.getCloseCombatMap=function(){return closeCombatMap;};
    this.getMaxSkillRanks=function(){return maxSkillRanks;};
    this.getRangedCombatMap=function(){return rangedCombatMap;};
    this.getTotal=function(){return total;};

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
    this.generate=function(){CommonsLibrary.generate.call(this, rowArray, 'skill');};
    /**Removes the row from the array and updates the index of all others in the list.*/
    this.removeRow=function(rowIndex){CommonsLibrary.removeRow(rowArray, rowIndex);};
    /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
    this.sanitizeRows=function(){CommonsLibrary.sanitizeRows.call(this, rowArray);};
    /**This set the page's data. called only by generate*/
    this.setAll=function(){CommonsLibrary.setAll(rowArray);};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       this.sanitizeRows();
       closeCombatMap.clear();
       rangedCombatMap.clear();
       maxSkillRanks = Main.abilitySection.createAbilityMap();  //reset the map to the ability values
       total = 0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is blank
      {
          var abilityNameUsed = rowArray[i].getAbilityName();
          var abilityValue = Main.abilitySection.getByName(abilityNameUsed).getValue();  //non-zeroed for below
          var bonusValue;

          if(abilityValue === '--' && abilityNameUsed === 'Stamina' && Main.getActiveRuleset().major > 1) bonusValue = 'Always Pass';
          else if(abilityValue === '--') bonusValue = 'Always Fail';  //in ruleset 1.x having no stamina means always fails
          else bonusValue = rowArray[i].getRank() + abilityValue;
          rowArray[i].setTotalBonus(bonusValue);
          //neither -- affects power levels so it isn't added to max skill map
          if(abilityValue !== '--' && bonusValue > maxSkillRanks.get(abilityNameUsed)) maxSkillRanks.set(abilityNameUsed, bonusValue);

          if(rowArray[i].getName() === 'Close Combat') closeCombatMap.add(rowArray[i].getText(), bonusValue);  //add, there is no redundancy
          else if(rowArray[i].getName() === 'Ranged Combat') rangedCombatMap.add(rowArray[i].getText(), bonusValue);  //only use the subtype for the map

          total+=rowArray[i].getRank();
      }
       total/=2;  //do not round
       //no need to add Unarmed. either it was added above or is calculated by Main
   };
   /**Sets data from a json object given then updates*/
   this.load=function(jsonSection)
   {
       //rowArray=[new SkillObject(0)];
      for (var i=0; i < jsonSection.length; i++)
      {
         if (!Data.Skill.names.contains(jsonSection[i].name))
         {
             var errorEnding;
             if(1 === Main.getActiveRuleset().major) errorEnding = 'In M&M 3e no other skills exist.';
             else errorEnding = 'Did you mean "Other" with a subtype?';

             Main.messageUser('SkillList.load.notExist', 'Skill #' + (i+1) + ': ' +
                jsonSection[i].name + ' is not a basic skill name. ' + errorEnding);
             continue;
         }
          var rowPointer = rowArray.last();
          rowPointer.setSkill(jsonSection[i].name);
          if(undefined !== jsonSection[i].subtype) rowPointer.setText(jsonSection[i].subtype);
          rowPointer.setRank(jsonSection[i].rank);
          rowPointer.setAbility(jsonSection[i].ability);
          this.addRow();  //add new blank data row
      }
       this.update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
    /**Creates a new row at the end of the array*/
    this.addRow=function(){rowArray.push(new SkillObject(rowArray.length));};
   /**Updates other sections which depend on skill section*/
   this.notifyDependent=function()
   {
       Main.updateOffense();
   };
   //constructor:
    CommonsLibrary.initializeRows.call(this);
}
