/**Call List onChange
Select Advantage: select();
Rank: changeRank();
Text: changeText();
*/
function AdvantageObject(rowIndex)
{
   //private variable section:
    var name, maxRanks, costPerRank, hasRank, rank, hasText, text, total;

   //Basic getter section (all single line)
    this.doesHaveRank=function(){return hasRank;};
    this.doesHaveText=function(){return hasText;};
    this.getCostPerRank=function(){return costPerRank;};
    this.getMaxRanks=function(){return maxRanks;};
    this.getName=function(){return name;};
    this.getRank=function(){return rank;};
    this.getText=function(){return text;};
    this.getTotal=function(){return total;};

   //Single line function section
    this.setRowIndex=function(indexGiven){rowIndex=indexGiven;};
    this.isBlank=function(){return (name == undefined);};

   //Onchange section
   /**Onchange function for selecting an advantage*/
   this.select=function()
   {
       this.setAdvantage(SelectUtil.getTextById('advantageChoices'+rowIndex));
       Main.advantageSection.update();
       //TODO: see if I can capture focus to reset after generation
   };
   /**Onchange function for changing the rank*/
   this.changeRank=function()
   {
       this.setRank(document.getElementById('advantageRank'+rowIndex).value);
       Main.advantageSection.update();
   };
   /**Onchange function for changing the text*/
   this.changeText=function()
   {
       this.setText(document.getElementById('advantageText'+rowIndex).value);
       Main.advantageSection.update();
   };

   //Value setting section
   /**Populates data of the advantage by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setAdvantage=function(nameGiven)
   {
       //TODO: if same unique name then preserve all user data (such as a minion -> sidekick keep text and rank)
       if(!AdvantageData.names.contains(nameGiven)){this.constructor(); return;}  //reset values
       name = nameGiven;
       maxRanks = AdvantageData.maxRanks.get(name);
       hasRank = (maxRanks !== 1);  //if max ranks is 1 then there are no ranks
       rank = 1;
       costPerRank = AdvantageData.costPerRank.get(name);
       total = costPerRank;  //since it's rank 1
       hasText = AdvantageData.hashText.contains(name);
       if(hasText) text = AdvantageData.defaultText.get(name);
       else text = undefined;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       if(!hasRank) return;  //can only happen when loading
       rank=sanitizeNumber(rankGiven, 1, 1);
       if(rank > maxRanks) rank=maxRanks;
       total=costPerRank*rank;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;
       if(!hasText) return;  //can only happen when loading
       text = textGiven.trim();  //trimed in case it needs to match up with something else
   };

   //public function section
   /**This creates the page's html (for the row). called by advantage section only*/
   this.generate=function()
   {
       var htmlString='';
       if(name === 'Equipment') htmlString+='      <b>Equipment</b>\n';
      else
      {
          htmlString+='<select id="advantageChoices'+rowIndex+'" onChange="Main.advantageSection.getRow('+rowIndex+').select();">\n';
          htmlString+='    <option>Select One</option>\n';
         for (var i=0; i < AdvantageData.names.length; i++)
         {
             if(AdvantageData.names[i] !== 'Equipment')
                htmlString+='    <option>'+AdvantageData.names[i]+'</option>\n';
         }
         if (Main != undefined && (Main.advantageSection.hasGodhoodAdvantages() || Main.canUseGodHood()))
         //must check both hasGodhoodAdvantages and canUseGodHood since they are not yet in sync
            for (var i=0; i < AdvantageData.godhoodNames.length; i++)
            {
                htmlString+='    <option>'+AdvantageData.godhoodNames[i]+'</option>\n';
            }
          htmlString+='</select>\n';
      }
       if(this.isBlank()) return htmlString;  //done

       if(name === 'Equipment') htmlString+='      Cost <span id="advantageRankSpan'+rowIndex+'"></span>\n';
       else if(hasRank) htmlString+='Rank <input type="text" size="1" id="advantageRank'+rowIndex+'" onChange="Main.advantageSection.getRow('+rowIndex+').changeRank();" />\n';

       if(hasText) htmlString+='<input type="text" id="advantageText'+rowIndex+'" onChange="Main.advantageSection.getRow('+rowIndex+').changeText();" />\n';
       if(costPerRank !== 1) htmlString+='= <span id="advantageRowTotal'+rowIndex+'"></span>\n';
       htmlString+='<br />\n';
       return htmlString;
   };
   /**Get the name of the advantage appended with text to determine redundancy*/
   this.getUniqueName=function()
   {
       var nameToUse;
       if(name === 'Minion' || name === 'Sidekick') nameToUse='Helper';
       else nameToUse=name;

       if(hasText) return (nameToUse+': '+text);
       return nameToUse;
   };
   /**Returns an xml string of this row's data*/
   this.save=function()
   {
       var fileString = '       <Row name="'+name+'"';
       if(hasRank) fileString+=' rank="'+rank+'"';
       if(hasText) fileString+=' text="'+text+'"';
       fileString+=' />\n';
       return fileString;
   };
   /**This sets the page's data. called only by section generate*/
   this.setValues=function()
   {
       if(this.isBlank()) return;  //already set (to default)
       if(name !== 'Equipment') SelectUtil.setText(('advantageChoices'+rowIndex), name);

       //do not connect else with above because non-equipment might also have text
       if(name === 'Equipment') document.getElementById('advantageRankSpan'+rowIndex).innerHTML=rank;
       else if(hasRank) document.getElementById('advantageRank'+rowIndex).value=rank;

       if(hasText) document.getElementById('advantageText'+rowIndex).value=text;
       if(costPerRank !== 1) document.getElementById('advantageRowTotal'+rowIndex).innerHTML=total;
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this.constructor=function()
   {
       name=undefined;
       maxRanks=undefined;
       hasRank=undefined;
       rank=undefined;
       hasText=undefined;
       text=undefined;
       costPerRank=undefined;
       total=0;
   };
   //constructor:
    this.constructor();
}
