/**This function is designed to sanitize numbers given by user input and to validate the number (if it is one).
More simply: it returns a valid integer based on the given input.
numberGiven: null safe converted into an integer if possible, if not possible defaultValue is returned
minimum: if numberGiven can be converted into an integer and it is less than minimum then the minimum is returned (pass in minimum of -Infinity to avoid this)
Note that the entire numberGiven is validated as a float then truncated meaning that '2z' is invalid but '-2.99' returns -2
*/
function sanitizeNumber(numberGiven, minimum, defaultValue)
{
    //Number.isFinite can't simplify this because I need to pass in a string and fail on trailing text
    var value = (numberGiven+'').trim();  //null safe. convert the type to string in case it is something that isn't number or string
    if(value === '' || !isFinite(value)) return defaultValue;  //empty string is checked because isFinite('') === true
       //isFinite(NaN) === false && isFinite(-Infinity) === false
    value = Math.trunc(Number.parseFloat(value));  //trailing text is caught by isFinite
    if(value < minimum) return minimum;  //make minimum -Infinity to skip this (no one skips this step)
    //there are only 2 places that have a maximum: modifier and advantage
       //vs 5/6 that don't: ability, power/ equipment, skill, defense, transcendence
       //and of the 2 that do only requires 1 line in the file so sanitizeNumber doesn't handle maximums
    return value;
}

/**This function converts an xml string (of a valid saved document) into a json object and returns it.
This is used when loading an xml since json is used internally*/
function xmlToJson(xmlString)
{
    var json = {Hero: {}, Abilities: {}, Powers: [], Equipment: [], Advantages: [], Skills: [], Defenses: {}};  //skeleton so I don't need to create these later
    var xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');  //reference: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
       //this will parse before going to the next line (ie not asynchronous)
    var thisRow, i;  //temp variables used throughout

    if(xmlDoc.getElementsByTagName('Document')[0].hasAttribute('ruleset')) json.ruleset = xmlDoc.getElementsByTagName('Document')[0].getAttribute('ruleset');
    if(xmlDoc.getElementsByTagName('Document')[0].hasAttribute('version')) json.version = xmlDoc.getElementsByTagName('Document')[0].getAttribute('version');
    json.Hero.name = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('name');
    if(xmlDoc.getElementsByTagName('Hero')[0].hasAttribute('transcendence')) json.Hero.transcendence = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('transcendence');
    json.Hero.image = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('image');
    var informationNode = xmlDoc.getElementsByTagName('Information')[0].childNodes;
    if(informationNode.length === 0) json.Information = '';  //if <Information></Information>
    else json.Information = informationNode[0].nodeValue;  //if <Information>Any text</Information>

   for (i=0; i < Data.Ability.names.length; i++)
   {
       json.Abilities[Data.Ability.names[i]] = xmlDoc.getElementsByTagName(Data.Ability.names[i])[0].getAttribute('value');
   }

    json.Powers = convertXmlPowersBothToJson(xmlDoc.getElementsByTagName('Powers')[0].getElementsByTagName('Row'));
    json.Equipment = convertXmlPowersBothToJson(xmlDoc.getElementsByTagName('Equipment')[0].getElementsByTagName('Row'));

    var xmlSection = xmlDoc.getElementsByTagName('Advantages')[0].getElementsByTagName('Row');
   for (i=0; i < xmlSection.length; i++)
   {
       thisRow = {};
       thisRow.name = xmlSection[i].getAttribute('name');
       if(xmlSection[i].hasAttribute('rank')) thisRow.rank = xmlSection[i].getAttribute('rank');
       if(xmlSection[i].hasAttribute('text')) thisRow.text = xmlSection[i].getAttribute('text');
       json.Advantages.push(thisRow);
   }

    xmlSection = xmlDoc.getElementsByTagName('Skills')[0].getElementsByTagName('Row');
   for (i=0; i < xmlSection.length; i++)
   {
       thisRow = {};
       thisRow.name = xmlSection[i].getAttribute('name');
       if(xmlSection[i].hasAttribute('subtype')) thisRow.subtype = xmlSection[i].getAttribute('subtype');
       thisRow.rank = xmlSection[i].getAttribute('rank');
       thisRow.ability = xmlSection[i].getAttribute('ability');
       json.Skills.push(thisRow);
   }

   for (i=0; i < Data.Defense.names.length-1; i++)  //-1 to avoid toughness
   {
       json.Defenses[Data.Defense.names[i]] = xmlDoc.getElementsByTagName(Data.Defense.names[i])[0].getAttribute('value');
   }

    return json;

   /**This function converts the xml section pointer into a json object and returns it. This function is nested so that it is private*/
   function convertXmlPowersBothToJson(xmlSection)
   {
       var thisSection = [];
      for (var i=0; i < xmlSection.length; i++)
      {
          var thisRow = {};
          thisRow.effect = xmlSection[i].getAttribute('effect');
          if(xmlSection[i].hasAttribute('cost')) thisRow.cost = xmlSection[i].getAttribute('cost');
          thisRow.text = xmlSection[i].getAttribute('text');
          thisRow.action = xmlSection[i].getAttribute('action');
          thisRow.range = xmlSection[i].getAttribute('range');
          thisRow.duration = xmlSection[i].getAttribute('duration');
          if(xmlSection[i].hasAttribute('name')) thisRow.name = xmlSection[i].getAttribute('name');
          if(xmlSection[i].hasAttribute('skill')) thisRow.skill = xmlSection[i].getAttribute('skill');
          thisRow.rank = xmlSection[i].getAttribute('rank');

          var xmlModifiers = xmlSection[i].getElementsByTagName('Modifier');
          thisRow.Modifiers = [];
         for (var j=0; j < xmlModifiers.length; j++)
         {
             var thisModifier={};
             thisModifier.name = xmlModifiers[j].getAttribute('name');
             if(xmlModifiers[j].hasAttribute('applications')) thisModifier.applications = xmlModifiers[j].getAttribute('applications');
             if(xmlModifiers[j].hasAttribute('text')) thisModifier.text = xmlModifiers[j].getAttribute('text');
             thisRow.Modifiers.push(thisModifier);
         }
          thisSection.push(thisRow);
      }
       return thisSection;
   }
}

/**This function converts a json object (of valid internal data) into an xml string and returns it
This is used to save as an xml since json is used internally*/
function jsonToXml(jsonDoc)
{
    var i;  //loop variable used throughout
    var xmlString='<?xml version="1.0" encoding="UTF-8"?>\n\n<Document ruleset="'+jsonDoc.ruleset+'" version="'+jsonDoc.version+'">\n';
    xmlString+='    <Hero name="'+jsonDoc.Hero.name+'"';
    if(jsonDoc.Hero.transcendence !== undefined) xmlString+=' transcendence="'+jsonDoc.Hero.transcendence+'"';
    xmlString+=' image="'+jsonDoc.Hero.image+'" />\n';
    xmlString+='    <Information>'+jsonDoc.Information+'</Information>\n';

    xmlString+='   <Abilities>\n';  //always has this spacing because it is never empty
   for (i=0; i < Data.Ability.names.length; i++)
   {
       xmlString+='       <'+Data.Ability.names[i]+' value="'+jsonDoc.Abilities[Data.Ability.names[i]]+'" />\n';
   }
    xmlString+='   </Abilities>\n';

    xmlString+='   '+convertJsonPowersBothToXml(jsonDoc.Powers, 'Powers');
    xmlString+='   '+convertJsonPowersBothToXml(jsonDoc.Equipment, 'Equipment');

    xmlString+='   ';
    if(jsonDoc.Advantages.isEmpty()) xmlString+=' <Advantages></Advantages>\n';
   else
   {
       xmlString+='<Advantages>\n';
      for (i=0; i < jsonDoc.Advantages.length; i++)
      {
          var thisRow = jsonDoc.Advantages[i];
          xmlString+='       <Row name="'+thisRow.name+'"';
          if(thisRow.rank !== undefined) xmlString+=' rank="'+thisRow.rank+'"';
          if(thisRow.text !== undefined) xmlString+=' text="'+thisRow.text+'"';
          xmlString+=' />\n';
      }
       xmlString+='   </Advantages>\n';
   }

    xmlString+='   ';
    if(jsonDoc.Skills.isEmpty()) xmlString+=' <Skills></Skills>\n';
   else
   {
       xmlString+='<Skills>\n';
      for (i=0; i < jsonDoc.Skills.length; i++)
      {
          var skillRow = jsonDoc.Skills[i];
          xmlString+='       <Row name="'+skillRow.name+'"';
          if(skillRow.subtype !== undefined) xmlString+=' subtype="'+skillRow.subtype+'"';
          xmlString+=' rank="'+skillRow.rank+'"';
          xmlString+=' ability="'+skillRow.ability+'"';
          xmlString+=' />\n';
      }
       xmlString+='   </Skills>\n';
   }

    xmlString+='   <Defenses>\n';  //also never empty
   for (i=0; i < Data.Defense.names.length-1; i++)  //-1 to avoid toughness
   {
       xmlString+='       <'+Data.Defense.names[i]+' value="'+jsonDoc.Defenses[Data.Defense.names[i]]+'" />\n';
   }
    xmlString+='   </Defenses>\n';

    xmlString+='</Document>\n';
    return xmlString;

   /**This function converts the json section into an xml string and returns it. The name of the section is also required in order to create the tags.
   This function is nested so that it is private*/
   function convertJsonPowersBothToXml(jsonSection, sectionXmlName)
   {
       if(jsonSection.isEmpty()) return ' <'+sectionXmlName+'></'+sectionXmlName+'>\n';
       var fileString = '<'+sectionXmlName+'>\n';
      for (var i=0; i < jsonSection.length; i++)
      {
          if(jsonSection[i].Modifiers.isEmpty()) fileString+=' ';
          fileString+='      <Row effect="'+jsonSection[i].effect+'" ';
          if(jsonSection[i].cost !== undefined) fileString+='cost="'+jsonSection[i].cost+'" ';
          fileString+='text="'+jsonSection[i].text+'" ';
          fileString+='action="'+jsonSection[i].action+'" ';
          fileString+='range="'+jsonSection[i].range+'" ';
          fileString+='duration="'+jsonSection[i].duration+'" ';
          if(jsonSection[i].name !== undefined) fileString+='name="'+jsonSection[i].name+'" ';
          if(jsonSection[i].skill !== undefined) fileString+='skill="'+jsonSection[i].skill+'" ';
          fileString+='rank="'+jsonSection[i].rank+'"';  //must be before modifiers

          if(jsonSection[i].Modifiers.isEmpty()){fileString+=' />\n'; continue;}  //self closing because it is empty
          fileString+='>\n';

         for (var j=0; j < jsonSection[i].Modifiers.length; j++)
         {
             var thisModifier=jsonSection[i].Modifiers[j];
             fileString+='          <Modifier name="'+thisModifier.name+'" ';
             if(thisModifier.applications !== undefined) fileString+='applications="'+thisModifier.applications+'" ';
             if(thisModifier.text !== undefined) fileString+='text="'+thisModifier.text+'" ';
             fileString+='/>\n';
         }

          fileString+='      </Row>\n';
      }
       fileString+='   </'+sectionXmlName+'>\n';
       return fileString;
   }
}
