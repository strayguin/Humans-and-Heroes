/**Updates:
Main.updateInitiative();
Main.defenseSection.calculateValues();
Main.updateOffense();
*/
function AdvantageList()
{
   //private variable section:
    var equipmentRow=undefined, equipmentMaxTotal=0, usingGodhoodAdvantages=false, total=0, pettyRulesApply=true;
    var rankHash=new Hash({}, 0);
    var rowArray=[];

   //Single line function section
    this.hasGodhoodAdvantages=function(){return usingGodhoodAdvantages;};
    this.isUsingPettyRules=function(){return pettyRulesApply;};
    this.getEquipmentMaxTotal=function(){return equipmentMaxTotal;};
    this.getRankHash=function(){return rankHash;};
    this.getTotal=function(){return total;};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       this.sanitizeRows();
       rankHash.clear();
       usingGodhoodAdvantages=false;
       pettyRulesApply=true;
       total=0;
       equipmentRow=undefined;  //reset all these then recount them

      for (var i=0; i < rowArray.length-1; i++)  //last row is blank
      {
          var rowRank=rowArray[i].getRank();  //name is public but rank is not
          if(AdvantageData.godhoodNames.contains(rowArray[i].getName())) usingGodhoodAdvantages=true;
          //do not connected with else since Petty Rules are godhood
          if(rowArray[i].getName() === 'Your Petty Rules Don\'t Apply to Me') pettyRulesApply=false;
          //TODO: create an array for each advantage that needs to be stored in the hash
          rankHash.add(rowArray[i].getUniqueName(), rowRank);  //add instead of set these since hash is empty and there are no redundant rows (using unique name)
          if(rowArray[i].getName() === 'Equipment') equipmentRow=i;
          else total+=rowArray[i].getTotal();  //don't count equipment yet because its rank may change
      }
       this.calculateEquipmentRank();
   };
   /**Removes all rows then updates*/
   this.clear=function()
   {
       rowArray=[];  //reset rows
       this.addRow();
       this.update();  //reset all other variables
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
       //rowArray=[new AdvantageObject(0)];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      for (var i=0; i < xmlSection.length; i++)
      {
          var nameToLoad=xmlSection[i].getAttribute('name');
          if(!AdvantageData.names.contains(nameToLoad) && !AdvantageData.godhoodNames.contains(nameToLoad))
             {alert('Load Error: '+nameToLoad+' is not an advantage name.'); continue;}  //not found
          if(AdvantageData.godhoodNames.contains(nameToLoad) && !Main.canUseGodHood())
             {alert('Load Error: '+nameToLoad+' is the advantage listed without transcendence (='+Main.getTranscendence()+')'); continue;}
          rowArray.last().setAdvantage(nameToLoad);  //load in the data
          if(xmlSection[i].hasAttribute('rank')) rowArray.last().setRank(xmlSection[i].getAttribute('rank'));
          if(xmlSection[i].hasAttribute('text')) rowArray.last().setText(xmlSection[i].getAttribute('text'));
          this.addRow();
      }
       this.update();
   };
   /**Returns an xml string of this section's data*/
   this.save=function()
   {
       if(rowArray.length === 1) return ' <Advantages></Advantages>\n';  //only the blank row exists
       var fileString='<Advantages>\n';
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       fileString+='   </Advantages>\n';
       return fileString;
   };
   /**Does each step for an onChange*/
   this.update=function()
   {
       this.calculateValues();
       this.generate();  //physical reset
       this.notifyDependent();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
    /**Creates a new row at the end of the array*/
    this.addRow=function(){rowArray.push(new AdvantageObject(rowArray.length));};
   /**This calculates the required rank of the equipment advantage and adds or removes it accordingly*/
   this.calculateEquipmentRank=function()
   {
      if (equipmentRow == undefined)  //if there is no equipment advantage
      {
          if(Main.equipmentSection.getTotal() === 0){equipmentMaxTotal=0; return;}  //I don't need to add a row
          equipmentRow = rowArray.length-1;
          rowArray[equipmentRow].setAdvantage('Equipment');  //index is at last existing row (which was blank)
          this.addRow();  //add a new blank row
      }
       var newEquipmentRank = Math.ceil(Main.equipmentSection.getTotal()/5);
       equipmentMaxTotal = newEquipmentRank*5;  //rounded up to nearest 5
       if(newEquipmentRank === 0) this.removeRow(equipmentRow);  //don't need the row any more
      else
      {
          rowArray[equipmentRow].setRank(newEquipmentRank);
          total+=rowArray[equipmentRow].getTotal();
      };
   };
   /**This creates the page's html (for the section)*/
   this.generate=function()
   {
       var allAdvantageRows='';
      for(var i=0; i < rowArray.length; i++)  //last row is always blank
          {allAdvantageRows+=rowArray[i].generate();}
       document.getElementById('advantage section').innerHTML=allAdvantageRows;
       this.setAll();
   };
   /**Updates other sections which depend on advantage section*/
   this.notifyDependent=function()
   {
       Main.updateInitiative();
       Main.defenseSection.calculateValues();
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
       //TODO: several functions are exact duplicates. store them in a common functions section
       //example: this.sanitizeRows=function(){Commons.sanitizeRows(this, rowArray);};
       var namesSoFar=[];
      for (var i=0; i < rowArray.length; i++)  //last row might not be blank here
      {
          if(rowArray[i].isBlank() && i < rowArray.length-1){this.removeRow(i); i--; continue;}  //remove blank row that isn't last
          else if(rowArray[i].isBlank()) continue;  //nothing to do

          var uniqueName=rowArray[i].getUniqueName();  //this includes all modifiers since you may have the same power with different modifiers
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
}
