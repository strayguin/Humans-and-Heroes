/**Updates:
Main.updateInitiative();
Main.updateOffense();
Main.defenseSection.calculateValues();
*/
function AdvantageList()
{
    var returnObject={};
   //private variable section:
    var equipmentMaxTotal=0, usingGodhoodAdvantages=false, total=0, pettyRulesApply=true;
    var rankHash=new Hash({}, 0);
    var rowArray=[];

   //Single line function section
    returnObject.hasGodhoodAdvantages=function(){return usingGodhoodAdvantages;};
    returnObject.isUsingPettyRules=function(){return pettyRulesApply;};
    returnObject.getEquipmentMaxTotal=function(){return equipmentMaxTotal;};
    returnObject.getRankHash=function(){return rankHash;};
    returnObject.getTotal=function(){return total;};

   //public common section
    /**Removes all rows then updates*/
    returnObject.clear=function(){CommonsLibrary.clear.call(returnObject, rowArray);};
    /**Returns the row object or nothing if the index is out of range. Used in order to call each onChange*/
    returnObject.getRow=function(rowIndex){return CommonsLibrary.getRow(rowArray, rowIndex);};
    /**Does each step for an onChange*/
    returnObject.update=function(){CommonsLibrary.update.call(returnObject);};

   //'private' commons section. Although all public none of these should be called from outside of this object
    /**This creates the page's html (for the section)*/
    returnObject.generate=function(){CommonsLibrary.generate.call(returnObject, rowArray, 'advantage');};
    /**Removes the row from the array and updates the index of all others in the list.*/
    returnObject.removeRow=function(rowIndex){CommonsLibrary.removeRow(rowArray, rowIndex);};
    /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
    function sanitizeRows(){CommonsLibrary.sanitizeRows.call(returnObject, rowArray);};
    /**This set the page's data. called only by generate*/
    returnObject.setAll=function(){CommonsLibrary.setAll(rowArray);};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   returnObject.calculateValues=function()
   {
       sanitizeRows();
       rankHash.clear();
       usingGodhoodAdvantages=false;
       pettyRulesApply=true;
       total=0;  //reset all these then recount them
       returnObject.calculateEquipmentRank();  //changes the rank and adds/ removes the row. therefore must be before the total is counted

      for (var i=0; i < rowArray.length-1; i++)  //last row is blank
      {
          var rowRank=rowArray[i].getRank();  //name is public but rank is not
          if(AdvantageData.godhoodNames.contains(rowArray[i].getName())) usingGodhoodAdvantages=true;
          //do not connected with else since Petty Rules are godhood
          if(rowArray[i].getName() === 'Your Petty Rules Don\'t Apply to Me') pettyRulesApply=false;
          if(AdvantageData.hashThese.contains(rowArray[i].getName())) rankHash.add(rowArray[i].getUniqueName(), rowRank);
             //add instead of set these since hash is empty and there are no redundant rows (using unique name)
          total+=rowArray[i].getTotal();
      }
   };
   /**Sets data from an xml object given then updates*/
   returnObject.load=function(xmlSection)
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
          returnObject.addRow();
      }
       returnObject.update();
   };
   /**Returns an xml string of this section's data*/
   returnObject.save=function()
   {
       if(rowArray.length === 1) return ' <Advantages></Advantages>\n';  //only the blank row exists
       var fileString='<Advantages>\n';
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       fileString+='   </Advantages>\n';
       return fileString;
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
    /**Creates a new row at the end of the array*/
    returnObject.addRow=function(){rowArray.push(new AdvantageObject(rowArray.length));};
   /**This calculates the required rank of the equipment advantage and adds or removes the advantage row accordingly*/
   returnObject.calculateEquipmentRank=function()
   {
       var equipmentRow=undefined;
      for (var i=0; i < rowArray.length-1; i++)  //last row is blank
      {
          if(rowArray[i].getName() === 'Equipment'){equipmentRow=i; break;}
      }
      if (equipmentRow === undefined)  //if there is no equipment advantage
      {
          if(Main.equipmentSection.getTotal() === 0){equipmentMaxTotal=0; return;}  //I don't need to add a row
          equipmentRow = rowArray.length-1;  //index is at last existing row (which was blank)
          rowArray[equipmentRow].setAdvantage('Equipment');
          returnObject.addRow();  //add a new blank row
      }
       var newEquipmentRank = Math.ceil(Main.equipmentSection.getTotal()/5);
       equipmentMaxTotal = newEquipmentRank*5;  //rounded up to nearest 5
       if(newEquipmentRank === 0) returnObject.removeRow(equipmentRow);  //don't need the row any more
       else rowArray[equipmentRow].setRank(newEquipmentRank);
   };
   /**Updates other sections which depend on advantage section*/
   returnObject.notifyDependent=function()
   {
       Main.updateInitiative();
       Main.updateOffense();  //some old advantages might affect this so it needs to be updated
       Main.defenseSection.calculateValues();
   };
   //constructor:
    CommonsLibrary.initializeRows.call(returnObject);
    return returnObject;
}
