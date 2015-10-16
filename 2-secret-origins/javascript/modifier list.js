function ModifierList(powerRowParent, sectionRowIndex, sectionName)
{
   //private variable section:
    var autoModifierNameToRowIndex = new MapDefault({}, undefined);
    var rowArray = [];
    var rankTotal, flatTotal;  //undefined by default

   //Single line function section
    /**This total will be the sum of all flat modifiers*/
    this.getFlatTotal=function(){return flatTotal;};  //TODO: make sure these are not called before they are defined
    /**This total will be the sum of all rank modifiers*/
    this.getRankTotal=function(){return rankTotal;};
    this.getParent=function(){return powerRowParent;};

   //public common section
    /**Removes all rows then updates*/
    this.clear=function(){CommonsLibrary.clear.call(this, rowArray);};
    /**Returns the row object or nothing if the index is out of range. Used in order to call each onChange*/
    this.getRow=function(rowIndex){return CommonsLibrary.getRow(rowArray, rowIndex);};
    /**Returns an array of json objects for this section's data*/
    this.save=function(){return CommonsLibrary.saveRows(rowArray);};
    //don't use CommonsLibrary.update.call(this); because update is very different

   //'private' commons section. Although all public none of these should be called from outside of this object
    //don't use CommonsLibrary.generate.call(this, rowArray, 'modifier'); because this isn't a section and the generate must return a string
    //don't use CommonsLibrary.removeRow(rowArray, rowIndex); because the way index is updated is different
    //don't use CommonsLibrary.sanitizeRows.call(this, rowArray); because getUniqueName takes a boolean
    /**This set the page's data. called only by power row generate*/
    this.setAll=function(){CommonsLibrary.setAll(rowArray);};

   //public functions section
   /**Takes raw total of the power row, sets the auto ranks, and returns the power row grand total.*/
   this.calculateGrandTotal=function(powerRowRawTotal)
   {
       if(autoModifierNameToRowIndex.get('Dynamic Alternate Effect') !== undefined)
          powerRowRawTotal=rowArray[autoModifierNameToRowIndex.get('Dynamic Alternate Effect')].setAutoRank(powerRowRawTotal);
       else if(autoModifierNameToRowIndex.get('Alternate Effect') !== undefined)
          powerRowRawTotal=rowArray[autoModifierNameToRowIndex.get('Alternate Effect')].setAutoRank(powerRowRawTotal);

       //removable is applied secondly after alt effect
       if(autoModifierNameToRowIndex.get('Easily Removable') !== undefined)
          powerRowRawTotal=rowArray[autoModifierNameToRowIndex.get('Easily Removable')].setAutoRank(powerRowRawTotal);
       else if(autoModifierNameToRowIndex.get('Removable') !== undefined)
          powerRowRawTotal=rowArray[autoModifierNameToRowIndex.get('Removable')].setAutoRank(powerRowRawTotal);

       return powerRowRawTotal;
   };
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       this.sanitizeRows();
       autoModifierNameToRowIndex.clear();
       rankTotal=0; flatTotal=0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          if(Data.Modifier.hasAutoTotal.contains(rowArray[i].getName())) autoModifierNameToRowIndex.add(rowArray[i].getName(), i);
          if(rowArray[i].isRank()) rankTotal+=rowArray[i].getRawTotal();
          else flatTotal+=rowArray[i].getRawTotal();  //could be flat or free. if free the total will be 0
      }
   };
   /**This will set a row (by name) to the rank given. If the row doesn't exist it will be created*/
   this.createByNameRank=function(rowName, rowRank)
   {
       var rowIndex=this.findRowByName(rowName);
      if (rowIndex === undefined)
      {
          rowIndex=rowArray.length-1;  //becomes the last row if doesn't exist yet
          rowArray[rowIndex].setModifier(rowName);  //set the last row (which is blank) to become the new modifier
          this.addRow();
          //add a new blank row so that this method can be called twice in a row
      }
       rowArray[rowIndex].setRank(rowRank);
   };
   /**This will search each row for the name given and return the row's array index or undefined if not found.
   Note that this should only be called with modifiers that don't have text.*/
   this.findRowByName=function(rowName)
   {
      for(var i=0; i < rowArray.length-1; i++)  //last row is always blank
         {if(rowArray[i].getName() === rowName) return i;}  //found it
      //else return undefined
   };
   /**This returns the page's html (for the section) as a string. called by power row object only*/
   this.generate=function()
   {
       var allModifierRows='';
      for(var i=0; i < rowArray.length; i++)  //last row is always blank but needs to be generated
          {allModifierRows+=rowArray[i].generate();}
       return allModifierRows;
   };
   /**Return the unique name of the section. In this case it returns a sorted array of modifier unique names*/
   this.getUniqueName=function()
   {
       var nameArray=[];
      for(var i=0; i < rowArray.length-1; i++)
          {nameArray.push(rowArray[i].getUniqueName(true));}
       nameArray.sort();  //must be sorted because order doesn't matter when considering uniqueness
       //note that the rows are not sorted only this name array
       //the sort order is by ascii but that doesn't matter as long as the same sort is used each time
       return nameArray;
   };
   /**True if any modifier in the list doesHaveAutoTotal*/
   this.hasAutoTotal=function()
   {
      for(var i=0; i < rowArray.length-1; i++)
          {if(rowArray[i].doesHaveAutoTotal()) return true;}
       return false;
   };
   /**Sets data from a json object given then updates. The row array is not cleared by this function*/
   this.load=function(jsonSection)
   {
       if(powerRowParent.isBlank()) return;
       //the row array isn't cleared in case some have been auto set
       //Main.clear() is called at the start of Main.load()
      for (var i=0; i < jsonSection.length; i++)
      {
          var newName=jsonSection[i].name;
          if(!Data.Modifier.names.contains(newName))
             {Main.messageUser('Load Error: '+newName+' is not a modifier name. Did you mean "Other" with text?'); continue;}  //not found
          rowArray.last().setModifier(newName);
          if(jsonSection[i].applications !== undefined) rowArray.last().setRank(jsonSection[i].applications);
          if(jsonSection[i].text !== undefined) rowArray.last().setText(jsonSection[i].text);
          this.addRow();
      }
      //doesn't call update. Power must do that
   };
   /**This will remove a row of the given name. Note that this should only be called with modifiers that don't have text.*/
   this.removeByName=function(rowName)
   {
       var rowIndex=this.findRowByName(rowName);
       if(rowIndex !== undefined) this.removeRow(rowIndex);
   };
   /**Needs to be updated for document reasons. This will update all dependant indexing*/
   this.setSectionRowIndex=function(sectionRowIndexGiven)
   {
       sectionRowIndex=sectionRowIndexGiven;
      for(var i=0; i < rowArray.length; i++)  //even blank row
         {rowArray[i].setTotalIndex(sectionRowIndex+'.'+i);}  //correct all indexing
   };
   /**Does each step for an onChange*/
   this.update=function()
   {
       this.calculateValues();  //TODO: test
       powerRowParent.getSection().update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
    /**Creates a new row at the end of the array*/
    this.addRow=function(){rowArray.push(new ModifierObject(this, (sectionRowIndex+'.'+rowArray.length), sectionName));};
   /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
   this.sanitizeRows=function()
   {
       //don't call CommonsLibrary.sanitizeRows.call(this, rowArray); because getUniqueName takes a boolean
       var namesSoFar=[];
       var canHaveAttack=true;
       if(powerRowParent.getDefaultRange() !== 'Personal') canHaveAttack=false;
      for (var i=0; i < rowArray.length; i++)  //last row might not be blank
      {
          if(rowArray[i].isBlank() && i < rowArray.length-1){this.removeRow(i); i--; continue;}  //remove blank row that isn't last
          else if(rowArray[i].isBlank()) continue;  //do nothing if last row is blank

          if(this.getParent().getSection() === Main.equipmentSection &&
             (rowArray[i].getName() === 'Removable' || rowArray[i].getName() === 'Easily Removable')){this.removeRow(i); i--; continue;}
          //equipment has removable built in and can't have the modifiers

          var modifierName=rowArray[i].getUniqueName(false);
          if(namesSoFar.contains(modifierName)){this.removeRow(i); i--; continue;}  //redundant modifier
         if (modifierName === 'Attack' || modifierName === 'Affects Others')  //Affects Others Also and Affects Others Only return same name
         {
             if(!canHaveAttack){this.removeRow(i); i--; continue;}  //redundant or invalid modifier
             canHaveAttack=false;
         }
          namesSoFar.push(modifierName);
      }
       if(rowArray.isEmpty() || !rowArray.last().isBlank())
          this.addRow();  //if last row isn't blank add one
   };
   /**Removes the row from the array and updates the index of all others in the list.*/
   this.removeRow=function(rowIndexToRemove)
   {
       rowArray.remove(rowIndexToRemove);
       this.setSectionRowIndex(sectionRowIndex);  //used to correct all indexing
   };
   //constructor:
    this.addRow();
    //don't use CommonsLibrary.initializeRows because the constructor doesn't need to call generate (which would do nothing)
}
