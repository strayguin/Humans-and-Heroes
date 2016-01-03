const SelectUtil={};
/**Returns true if the element id given is of a select tag DOM element*/
SelectUtil.isSelect=function(elementId)  //this is used by many other SelectUtils
{
    var element=document.getElementById(elementId);
    if(element === null) return false;
    return (element.tagName.toLowerCase() === 'select');
};
/**Given the id of the select, this returns the text of the selected option*/
SelectUtil.getTextById=function(optionID)  //only called by CommonsLibrary (and therefore invincible)
{
    if(!SelectUtil.isSelect(optionID)) return;  //this line is why you shouldn't just document.getElementById(id).value
    return document.getElementById(optionID).value;  //above checked if exists
};
/**Given the id of the select, this returns true if any of its options have text that matches the parameter (false otherwise).
Will return undefined if the id is not a select element or if the text is not a string*/
SelectUtil.containsText=function(optionID, textToFind)  //never called but will be used to test generate. can't move into auto test due to object freeze
{
    if(!SelectUtil.isSelect(optionID) || typeof(textToFind) !== 'string') return undefined;  //bad test
    var element = document.getElementById(optionID);
   for (var i=0; i < element.options.length; i++)
   {
       if(element.options[i].text === textToFind) return true;
   }
    return false;
};
/**This searches each option text of the select id given for the text given, when found the select is set to that index*/
SelectUtil.setText=function(optionID, textToSet)  //called in each row.setAll
{
    if(!SelectUtil.isSelect(optionID)) return;
    var element = document.getElementById(optionID);
   for (var i=0; i < element.options.length; i++)
   {
       if(element.options[i].text === textToSet){element.selectedIndex = i; return;}
       //onChange doesn't auto trigger when set like this
   }
};
/**Simply calls SelectUtil.setText then onchange() for that element*/
SelectUtil.changeText=function(optionID, textToSet)  //only called for testing but is here because of freeze
{
    if(!SelectUtil.isSelect(optionID)) return;
    var element = document.getElementById(optionID);
    var oldIndex = element.selectedIndex;  //DOM existence was confirmed by isSelect
    SelectUtil.setText(optionID, textToSet);
    if(element.selectedIndex !== oldIndex) element.onchange();
};
Object.freeze(SelectUtil);
