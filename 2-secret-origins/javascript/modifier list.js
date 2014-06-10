function ModifierList(powerRowParent, sectionRowIndex, sectionName)
{
   //private variable section:
    var autoModifierNameToRowIndex=new Hash({}, undefined);
    var rowArray=[];
    var rankTotal, flatTotal;  //undefined by default

   //Single line function section
    /**This total will be the sum of all flat modifiers*/
    this.getFlatTotal=function(){return flatTotal;};  //TODO: make sure these are not called before they are defined
    /**This total will be the sum of all rank modifiers*/
    this.getRankTotal=function(){return rankTotal;};
    this.getParent=function(){return powerRowParent;};

   //public functions section
   /**Takes raw total of the power row, sets the auto ranks, and returns the power row grand total.*/
   this.calculateGrandTotal=function(powerRowRawTotal)
   {
       if(autoModifierNameToRowIndex.get('Dynamic Alternate Effect') != undefined)
          powerRowRawTotal=rowArray[autoModifierNameToRowIndex.get('Dynamic Alternate Effect')].setAutoRank(powerRowRawTotal);
       else if(autoModifierNameToRowIndex.get('Alternate Effect') != undefined)
          powerRowRawTotal=rowArray[autoModifierNameToRowIndex.get('Alternate Effect')].setAutoRank(powerRowRawTotal);

       //removable is applied secondly after alt effect
       if(autoModifierNameToRowIndex.get('Easily Removable') != undefined)
          powerRowRawTotal=rowArray[autoModifierNameToRowIndex.get('Easily Removable')].setAutoRank(powerRowRawTotal);
       else if(autoModifierNameToRowIndex.get('Removable') != undefined)
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
          if(ModifierData.hasAutoTotal.contains(rowArray[i].getName())) autoModifierNameToRowIndex.add(rowArray[i].getName(), i);
          if(rowArray[i].isRank()) rankTotal+=rowArray[i].getRawTotal();
          else flatTotal+=rowArray[i].getRawTotal();  //could be flat or free. if free the total will be 0
      }
   };
   /**Removes all rows then updates*/
   this.clear=function()
   {
       rowArray=[];
       this.addRow();
       this.update();
   };
   /**This will set a row (by name) to the rank given. If the row doesn't exist it will be created*/
   this.createByNameRank=function(rowName, rowRank)
   {
       var rowIndex=this.findRowByName(rowName);
      if (rowIndex == undefined)
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
   /**Returns the row object or nothing if the index is out of range. in order to call each onChange*/
   this.getRow=function(rowIndex)
   {
       if(rowIndex >= rowArray.length) return;
       return rowArray[rowIndex];
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
   /**Sets data from an xml object given then updates. The row array is not cleared by this function*/
   this.load=function(xmlSection)
   {
       if(powerRowParent.isBlank()) return;
       //the row array isn't cleared in case some have been auto set
       //Main.clear() is called at the start of Main.load()
      for (var i=0; i < xmlSection.length; i++)
      {
          var newName=xmlSection[i].getAttribute('name');
          if(!ModifierData.names.contains(newName))
             {alert('Load Error: '+newName+' is not a modifier name. Did you mean "Other" with text?'); continue;}  //not found
          rowArray.last().setModifier(newName);
          if(xmlSection[i].hasAttribute('applications')) rowArray.last().setRank(xmlSection[i].getAttribute('applications'));
          if(xmlSection[i].hasAttribute('text')) rowArray.last().setText(xmlSection[i].getAttribute('text'));
          this.addRow();
      }
      //doesn't call update. Power must do that
   };
   /**This will remove a row of the given name. Note that this should only be called with modifiers that don't have text.*/
   this.removeByName=function(rowName)
   {
       var rowIndex=this.findRowByName(rowName);
       if(rowIndex != undefined) this.removeRow(rowIndex);
   };
   /**Returns an xml string of this section's data*/
   this.save=function()
   {
       if(rowArray.length === 1) return ' />\n';  //self closing because it is empty
       var fileString='>\n';
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
          {fileString+=rowArray[i].save();}
       return fileString;
   };
   /**This set the page's data. called only by power row generate*/
   this.setAll=function()
   {
      for(var i=0; i < rowArray.length-1; i++)  //the last row is always blank
         {rowArray[i].setValues();}
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
   this.constructor=function()
   {
       this.addRow();
   };
   //constructor:
    this.constructor();
};
