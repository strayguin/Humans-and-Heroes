const CommonsLibrary = {};
//row onchange section
/**Onchange function for selecting any select element*/
CommonsLibrary.select=function(setterPointer, elementId, updateThis)
{
    setterPointer.call(this, SelectUtil.getTextById(elementId));
    updateThis.update();
    //document doesn't need to be reset because setAll will do that later
    var element = document.getElementById(elementId);
    //I was using document.activeElement but it always pointed to the changed element anyway
    if(null !== element) element.focus();  //regain focus (so the user can use tab)
    //the only time it can be null is if something like Faster Action is inserted (powerModifierName0.0 instead of powerModifierChoices0.0)
    //in such cases there is no way to recover focus so it is lost
};
/**Onchange function for changing any input text field*/
CommonsLibrary.change=function(setterPointer, elementId, updateThis, shouldFocus)
{
    setterPointer.call(this, document.getElementById(elementId).value);
    updateThis.update();
    if(shouldFocus !== false) document.getElementById(elementId).focus();  //regain focus (so the user can use tab)
    //in this case using document.activeElement will point to body which is bad
};

//public use section
/**Removes all rows then updates*/
CommonsLibrary.clear=function(rowArray)
{
    rowArray.clear();  //reset rows
    this.addRow();
    this.update();  //reset all other variables
};
/**Returns the row object or nothing if the index is out of range. Used in order to call each onChange*/
CommonsLibrary.getRow=function(rowArray, rowIndex)
{
    if(rowIndex >= rowArray.length) return;
    return rowArray[rowIndex];
};
/**Returns an array of json objects for this section's data*/
CommonsLibrary.saveRows=function(rowArray)
{
    var json = [];
   for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
   {
       json.push(rowArray[i].save());
   }
    return json;  //might still be empty
};
/**Does each step for an onChange for all sections*/
CommonsLibrary.update=function()
{
    this.calculateValues();
    if(this.generate !== undefined) this.generate();  //physical reset
    this.notifyDependent();
    Main.update();  //updates totals and power level
};

//private use section
/**This creates the page's html (for the section)*/
CommonsLibrary.generate=function(rowArray, sectionName)
{
    var allSectionRows='';
   for(var i=0; i < rowArray.length; i++)  //last row is always blank
       {allSectionRows+=rowArray[i].generate();}
    document.getElementById(sectionName+' section').innerHTML=allSectionRows;
    this.setAll();
};
/**Removes the row from the array and updates the index of all others in the list.*/
CommonsLibrary.removeRow=function(rowArray, rowIndex)
{
    rowArray.remove(rowIndex);
   for(var i=0; i < rowArray.length; i++)
      {rowArray[i].setRowIndex(i);}  //correct all indexing
};
/**Section level validation. The common version only removes blank and redundant rows and adds a final blank row*/
CommonsLibrary.sanitizeRows=function(rowArray)
{
    var namesSoFar=[];
   for (var i=0; i < rowArray.length; i++)  //last row might not be blank here
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
CommonsLibrary.setAll=function(rowArray)
{
   for(var i=0; i < rowArray.length-1; i++)  //the last row (being blank) is already set
      {rowArray[i].setValues();}
};
/**Called by the constructor of each section that uses rows. It initializes the rows: addRow then generate.*/
CommonsLibrary.initializeRows=function()
{
    this.addRow();
    this.generate();
};
Object.freeze(CommonsLibrary);
