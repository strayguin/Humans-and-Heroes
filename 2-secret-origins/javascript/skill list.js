/**Updates:
Main.updateOffense();
*/
function SkillList()
{
   //private variable section:
    var closeCombatHash=new Hash({}, 0);
    var rangedCombatHash=new Hash({}, 0);
    var maxSkillRanks = new Hash({}, 0);
    var rowArray=[];
    var total=0;

   //Single line function section
    this.getCloseCombatHash=function(){return closeCombatHash;};
    this.getMaxSkillRanks=function(){return maxSkillRanks;};
    this.getRangedCombatHash=function(){return rangedCombatHash;};
    this.getTotal=function(){return total;};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       this.sanitizeRows();
       closeCombatHash.clear();
       rangedCombatHash.clear();
       maxSkillRanks = Main.abilitySection.createAbilityHash();  //reset the hash to the ability values
       total=0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is blank
      {
          var abilityNameUsed = rowArray[i].getAbilityName();
          var abilityValue = Main.abilitySection.getByName(abilityNameUsed).getValue();  //non-zeroed for below
          var bonusValue;

          if(abilityValue === '--' && abilityNameUsed === 'Stamina' && !Main.isOldRules()) bonusValue = 'Always Pass';
          else if(abilityValue === '--') bonusValue = 'Always Fail';  //in old rules having no stamina means always fails
          else bonusValue = rowArray[i].getRank() + abilityValue;
          rowArray[i].setTotalBonus(bonusValue);
          //neither -- affects power levels so it isn't added to max skill hash
          if(abilityValue !== '--' && bonusValue > maxSkillRanks.get(abilityNameUsed)) maxSkillRanks.set(abilityNameUsed, bonusValue);

          if(rowArray[i].getName() === 'Close Combat') closeCombatHash.add(rowArray[i].getText(), bonusValue);  //add, there is no redundancy
          else if(rowArray[i].getName() === 'Ranged Combat') rangedCombatHash.add(rowArray[i].getText(), bonusValue);  //only use the subtype for the hash

          total+=rowArray[i].getRank();
      }
       total/=2;  //do not round
      if (!closeCombatHash.containsKey('Unarmed'))  //need to add it since it should always have unarmed rank
      {
          //in this case ability is also total bonus since it has no ranks
          var abilityValue = Main.abilitySection.getByName('Fighting').getValue();
          if(abilityValue !== '--') closeCombatHash.add('Unarmed', abilityValue);  //don't add if --
      }
   };
   /**Removes all rows then updates*/
   this.clear=function()
   {
       rowArray=[];
       this.addRow();
       this.update();
   };
   /**This creates the page's html (for the section)*/
   this.generate=function()
   {
       var allSkillRows='';
      for(var i=0; i < rowArray.length; i++)  //the last row is always blank
         {allSkillRows+=rowArray[i].generate();}
       document.getElementById('skill section').innerHTML=allSkillRows;
       this.setAll();
   };
   /**Returns the row object or nothing if the index is out of range. in order to call each onChange*/
   this.getRow=function(rowIndex)
   {
       if(rowIndex >= rowArray.length) return;
       return rowArray[rowIndex];
   };
   /**Sets data from an xml object given then updates*/
   this.load=function(xmlSection)
   {
       //rowArray=[new SkillObject(0)];
      for (var i=0; i < xmlSection.length; i++)
      {
          if(!SkillData.names.contains(xmlSection[i].getAttribute('name')))
             {alert('Load Error: '+xmlSection[i].getAttribute('name')+' is not a basic skill name. Did you mean "Other" with a subtype?'); continue;}
          rowArray.last().setSkill(xmlSection[i].getAttribute('name'));
          if(xmlSection[i].hasAttribute('subtype')) rowArray.last().setText(xmlSection[i].getAttribute('subtype'));
          rowArray.last().setRank(xmlSection[i].getAttribute('rank'));
          rowArray.last().setAbility(xmlSection[i].getAttribute('ability'));
          this.addRow();  //add new blank data row
      }
       this.update();
   };
   /**Returns an xml string of this section's data*/
   this.save=function()
   {
       if(rowArray.length === 1) return ' <Skills></Skills>\n';  //only has the blank row
       var fileString='<Skills>\n';
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       fileString+='   </Skills>\n';
       return fileString;
   };
   /**Does each step for an onChange*/
   this.update=function()
   {
       this.calculateValues();
       this.generate();
       this.notifyDependent();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
    /**Creates a new row at the end of the array*/
    this.addRow=function(){rowArray.push(new SkillObject(rowArray.length));};
   /**Updates other sections which depend on skill section*/
   this.notifyDependent=function()
   {
       Main.updateOffense();
       Main.update();  //updates totals and power level
   };
   /**Removes the row from the array and updates the index of all others in the list.*/
   this.removeRow=function(rowIndex)
   {
       rowArray.remove(rowIndex);
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setRowIndex(i);}  //correct all indexing
   };
   /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
   this.sanitizeRows=function()
   {
       var namesSoFar=[];
      for (var i=0; i < rowArray.length; i++)  //last row might not be blank
      {
          if(rowArray[i].isBlank() && i < rowArray.length-1){this.removeRow(i); i--; continue;}  //remove blank row that isn't last
          else if(rowArray[i].isBlank()) continue;  //nothing to do

          var uniqueName=rowArray[i].getUniqueName();
          if(namesSoFar.contains(uniqueName)){this.removeRow(i); i--; continue;}  //remove redundant row
          namesSoFar.push(uniqueName);
      }
      if(rowArray.isEmpty() || !rowArray.last().isBlank())  //if last row isn't blank add one
          this.addRow();
   };
   /**This set the page's data. called only by generate*/
   this.setAll=function()
   {
      for(var i=0; i < rowArray.length-1; i++)  //the last row (being blank) is already set
         {rowArray[i].setValues();}
   };
   this.constructor=function()
   {
       this.addRow();
       this.generate();
   };
   //constructor:
    this.constructor();
};
