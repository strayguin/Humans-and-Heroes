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
    var attackEffectRanks=new Hash({}, 0);

   //Single line function section
    this.getAttackEffectRanks=function(){return attackEffectRanks;};
    this.getProtectionRankTotal=function(){return protectionRankTotal;};
    this.getTotal=function(){return total;};
    this.isUsingGodhoodPowers=function(){return usingGodhoodPowers;};

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
          if(PowerData.godhoodNames.contains(powerEffect)) usingGodhoodPowers=true;
          else if(powerEffect === 'Protection' && rank > protectionRankTotal) protectionRankTotal = rank;
             //protection doesn't stack and may have more than 1
          if(rowArray[i].getName() != undefined) attackEffectRanks.add(rowArray[i].getSkillUsed(), i);
          total+=rowArray[i].getTotal();
      }
   };
   /**Removes all rows then updates*/
   this.clear=function()
   {
       rowArray=[];
       this.addRow();
       this.update();
   };
   /**Short hand version of Main.powerSection.getRow(0).getModifierList().getRow(0) is instead Main.powerSection.getModifierRowShort(0, 0)*/
   this.getModifierRowShort=function(powerRowIndex, modifierRowIndex)
   {
       if(powerRowIndex === powerRowIndex.length) return;
       return rowArray[powerRowIndex].getModifierList().getRow(modifierRowIndex);
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
       //the row array isn't cleared in case some have been auto set
       //Main.clear() is called at the start of Main.load()
      for (var i=0; i < xmlSection.length; i++)
      {
          var nameToLoad=xmlSection[i].getAttribute('effect');
          if(!PowerData.names.contains(nameToLoad) && !PowerData.godhoodNames.contains(nameToLoad))
             {alert('Load Error: '+nameToLoad+' is not a power name.'); continue;}  //not found
          if(PowerData.godhoodNames.contains(nameToLoad) && !Main.canUseGodHood())
             {alert('Load Error: '+nameToLoad+' is the power listed without transcendence (='+Main.getTranscendence()+')'); continue;}
          var rowPointer=rowArray.last();
          rowPointer.setPower(nameToLoad);  //must be done before all others
          if(xmlSection[i].hasAttribute('cost')) rowPointer.setBaseCost(xmlSection[i].getAttribute('cost'));
          rowPointer.setText(xmlSection[i].getAttribute('text'));
          rowPointer.setAction(xmlSection[i].getAttribute('action'));  //all sets take strings
          rowPointer.setRange(xmlSection[i].getAttribute('range'));
          rowPointer.setDuration(xmlSection[i].getAttribute('duration'));
          if(xmlSection[i].hasAttribute('name')) rowPointer.setName(xmlSection[i].getAttribute('name'));
          if(xmlSection[i].hasAttribute('skill')) rowPointer.setSkill(xmlSection[i].getAttribute('skill'));
          rowPointer.setRank(xmlSection[i].getAttribute('rank'));
          if(xmlSection[i].getElementsByTagName('Modifier').length > 0)
             rowPointer.getModifierList().load(xmlSection[i].getElementsByTagName('Modifier'));  //only load them if they exist
          this.addRow();
      }
       this.update();
   };
   /**Returns an xml string of this section's data*/
   this.save=function()
   {
       var capsSectionName = sectionName.substring(0, 1).toUpperCase() + sectionName.substring(1);
       //xml must have caps but everything else must be lower
       if(sectionName === 'power') capsSectionName+='s';
       if(rowArray.length === 1) return ' <'+capsSectionName+'></'+capsSectionName+'>\n';  //the only row is the empty one: ie there are no rows
       var fileString='<'+capsSectionName+'>\n';
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       fileString+='   </'+capsSectionName+'>\n';
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
    this.addRow=function(){rowArray.push(new PowerObjectAgnostic(this, rowArray.length, sectionName));};
   /**This creates the page's html (for the section)*/
   this.generate=function()
   {
       var allPowerRows='';
      for(var i=0; i < rowArray.length; i++)  //includes final blank row
          {allPowerRows+=rowArray[i].generate();}
       document.getElementById(sectionName+' section').innerHTML = allPowerRows;
       this.setAll();
   };
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
       Main.update();  //updates totals and power level
   };
   /**Removes the row from the array and updates the index of all others in the list.*/
   this.removeRow=function(rowIndexToRemove)
   {
       rowArray.remove(rowIndexToRemove);
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].setRowIndex(i);}  //correct all indexing
   };
   /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
   this.sanitizeRows=function()
   {
       var namesSoFar=[];
      for (var i=0; i < rowArray.length; i++)
      {
          if(rowArray[i].isBlank() && i < rowArray.length-1){this.removeRow(i); i--; continue;}  //remove blank row that isn't last
          else if(rowArray[i].isBlank()) continue;  //nothing to do

          var bigPowerName=rowArray[i].getUniqueName();  //this includes all modifiers since you may have the same power with different modifiers
          if(namesSoFar.contains(bigPowerName)){this.removeRow(i); i--; continue;}  //remove redundant row
          namesSoFar.push(bigPowerName);
      }
      if(rowArray.isEmpty() || !rowArray.last().isBlank())  //if last row isn't blank add one
          this.addRow();
   };
   /**This set the page's data. called only by generate*/
   this.setAll=function()
   {
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
         {rowArray[i].setValues();}
   };
   this.constructor=function()
   {
       this.addRow();
       this.generate();
   };
   //constructor:
    this.constructor();
}
