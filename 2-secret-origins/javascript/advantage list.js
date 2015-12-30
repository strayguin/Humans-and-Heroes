/**Updates:
Main.updateInitiative();
Main.updateOffense();
Main.defenseSection.calculateValues();
*/
function AdvantageList()
{
   //private variable section:
    var equipmentMaxTotal=0, usingGodhoodAdvantages=false, total=0, pettyRulesApply=true;
    var rankMap=new MapDefault({}, 0);
    var rowArray=[];

   //Single line function section
    this.hasGodhoodAdvantages=function(){return usingGodhoodAdvantages;};  //TODO: do I ever care about hasGodhoodAdvantages?
    /**Returns false if the advantage "Your Petty Rules Don't Apply to Me" exists and true otherwise*/
    this.isUsingPettyRules=function(){return pettyRulesApply;};
    this.getEquipmentMaxTotal=function(){return equipmentMaxTotal;};
    this.getRankMap=function(){return rankMap;};
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
    this.generate=function(){CommonsLibrary.generate.call(this, rowArray, 'advantage');};
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
       rankMap.clear();
       usingGodhoodAdvantages = false;
       pettyRulesApply = true;
       total = 0;  //reset all these then recount them
       this.calculateEquipmentRank();  //changes the rank and adds/ removes the row. therefore must be before the total is counted

      for (var i=0; i < rowArray.length-1; i++)  //last row is blank
      {
          var advantageName = rowArray[i].getName();
          if(Data.Advantage.godhoodNames.contains(advantageName)) usingGodhoodAdvantages = true;
          //do not connected with else since Petty Rules are godhood
          if(advantageName === 'Your Petty Rules Don\'t Apply to Me') pettyRulesApply = false;
             //this needs to be tracked because it changes minimum possible power level
          if(Data.Advantage.mapThese.contains(advantageName)) rankMap.add(rowArray[i].getUniqueName(), rowArray[i].getRank());
             //add instead of set these since map is empty and there are no redundant rows (using unique name)
          total+=rowArray[i].getTotal();
      }
   };
   /**Sets data from a json object given then updates.*/
   this.load=function(jsonSection)
   {
       //rowArray=[new AdvantageObject(0)];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      for (var i=0; i < jsonSection.length; i++)
      {
          var nameToLoad = jsonSection[i].name;
          if(!Data.Advantage.names.contains(nameToLoad) && !Data.Advantage.godhoodNames.contains(nameToLoad))
             {Main.messageUser('Load Error: '+nameToLoad+' is not an advantage name.'); continue;}  //not found
          if(Data.Advantage.godhoodNames.contains(nameToLoad) && !Main.canUseGodHood())
             {Main.messageUser('Load Error: '+nameToLoad+' is the advantage listed without transcendence (='+Main.getTranscendence()+')'); continue;}
          var rowPointer = rowArray.last();
          rowPointer.setAdvantage(nameToLoad);  //load in the data
          if(jsonSection[i].rank !== undefined) rowPointer.setRank(jsonSection[i].rank);
          if(jsonSection[i].text !== undefined) rowPointer.setText(jsonSection[i].text);
          this.addRow();
      }
       this.update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
    /**Creates a new row at the end of the array*/
    this.addRow=function(){rowArray.push(new AdvantageObject(rowArray.length));};
   /**This calculates the required rank of the equipment advantage and adds or removes the advantage row accordingly*/
   this.calculateEquipmentRank=function()
   {
       var equipmentRow;
      for (var i=0; i < rowArray.length-1; i++)  //last row is blank
      {
          if(rowArray[i].getName() === 'Equipment'){equipmentRow = i; break;}
      }
      if (equipmentRow === undefined)  //if there is no equipment advantage
      {
          if(Main.equipmentSection.getTotal() === 0){equipmentMaxTotal=0; return;}  //I don't need to add a row
          equipmentRow = rowArray.length-1;  //index is at last existing row (which was blank)
          rowArray[equipmentRow].setAdvantage('Equipment');
          this.addRow();  //add a new blank row
      }
       var newEquipmentRank = Math.ceil(Main.equipmentSection.getTotal()/5);
       equipmentMaxTotal = newEquipmentRank*5;  //rounded up to nearest 5
       if(newEquipmentRank === 0) this.removeRow(equipmentRow);  //don't need the row any more
       else rowArray[equipmentRow].setRank(newEquipmentRank);
   };
   /**Updates other sections which depend on advantage section*/
   this.notifyDependent=function()
   {
       Main.updateInitiative();
       Main.updateOffense();  //some old advantages might affect this so it needs to be updated
       Main.defenseSection.calculateValues();
   };
   //constructor:
    CommonsLibrary.initializeRows.call(this);
}
