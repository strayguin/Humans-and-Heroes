(function(){
/**This is used to make links and upc.png be an absolute path on both localhost and skyspiral7.github.io */
var absolutePrefix = window.location.href.replace(/(\/Humans(?:%20| |-)(?:%26|&|and)(?:%20| |-)Heroes(?:-gh-pages)?)\/?.*?$/, '$1/');
/**This is used to determine which link in the sidebar is my current page or a parent of current*/
var currentPage = window.location.href.substring(absolutePrefix.length);

currentPage = currentPage.replace(/\?.*$/, '').replace(/#.*$/, '');  //ignore query parameters and anchor
if (!currentPage.endsWith('.html'))
{
   if(!currentPage.endsWith('/')) currentPage+='/';
   currentPage+='index.html';
}

var navigationJson = [
   {
      "name":"The Basics",
      "link":"the-basics/index.html",
      "children":[
         {
            "name":"Conditions",
            "link":"the-basics/conditions.html"
         },
         {
            "name":"Ranks and Measures",
            "link":"the-basics/ranks-and-measures.html"
         }
      ]
   },
   {
      "name":"Secret Origins",
      "link":"secret-origins/index.html",
      "children":[
         {
            "name":"Battlesuit",
            "link":"secret-origins/battlesuit.html"
         },
         {
            "name":"Construct",
            "link":"secret-origins/construct.html"
         },
         {
            "name":"Crime Fighter",
            "link":"secret-origins/crime-fighter.html"
         },
         {
            "name":"Energy Controller",
            "link":"secret-origins/energy-controller.html"
         },
         {
            "name":"Gadgeteer",
            "link":"secret-origins/gadgeteer.html"
         },
         {
            "name":"Martial Artist",
            "link":"secret-origins/martial-artist.html"
         },
         {
            "name":"Mimic",
            "link":"secret-origins/mimic.html"
         },
         {
            "name":"Mystic",
            "link":"secret-origins/mystic.html"
         },
         {
            "name":"Paragon",
            "link":"secret-origins/paragon.html"
         },
         {
            "name":"Powerhouse",
            "link":"secret-origins/powerhouse.html"
         },
         {
            "name":"Psychic",
            "link":"secret-origins/psychic.html"
         },
         {
            "name":"Shapeshifter",
            "link":"secret-origins/shapeshifter.html"
         },
         {
            "name":"Speedster",
            "link":"secret-origins/speedster.html"
         },
         {
            "name":"Warrior",
            "link":"secret-origins/warrior.html"
         },
         {
            "name":"Weapon Master",
            "link":"secret-origins/weapon-master.html"
         },
         {
            "name":"Make Your Own",
            "link":"secret-origins/point-counter.html"
         }
      ]
   },
   {
      "name":"Abilities",
      "link":"abilities.html"
   },
   {
      "name":"Skills",
      "link":"skills.html"
   },
   {
      "name":"Advantages",
      "link":"advantages.html"
   },
   {
      "name":"Powers",
      "link":"powers/index.html",
      "children":[
         {
            "name":"Effects",
            "link":"powers/effects/index.html",
            "children":[
               {
                  "name":"Affliction",
                  "link":"powers/effects/affliction-attack.html"
               },
               {
                  "name":"Attain Knowledge",
                  "link":"powers/effects/attain-knowledge-general.html"
               },
               {
                  "name":"Communication",
                  "link":"powers/effects/communication-sensory.html"
               },
               {
                  "name":"Comprehend",
                  "link":"powers/effects/comprehend-sensory.html"
               },
               {
                  "name":"Concealment",
                  "link":"powers/effects/concealment-sensory.html"
               },
               {
                  "name":"Create",
                  "link":"powers/effects/create-control.html"
               },
               {
                  "name":"Damage",
                  "link":"powers/effects/damage-attack.html"
               },
               {
                  "name":"Enhanced Trait",
                  "link":"powers/effects/enhanced-trait-general.html"
               },
               {
                  "name":"Environment",
                  "link":"powers/effects/environment-control.html"
               },
               {
                  "name":"Feature",
                  "link":"powers/effects/feature-general.html"
               },
               {
                  "name":"Flight",
                  "link":"powers/effects/flight-movement.html"
               },
               {
                  "name":"Growth",
                  "link":"powers/effects/growth-general.html"
               },
               {
                  "name":"Healing",
                  "link":"powers/effects/healing-general.html"
               },
               {
                  "name":"Illusion",
                  "link":"powers/effects/illusion-control.html"
               },
               {
                  "name":"Immortality",
                  "link":"powers/effects/immortality-defense.html"
               },
               {
                  "name":"Immunity",
                  "link":"powers/effects/immunity-defense.html"
               },
               {
                  "name":"Insubstantial",
                  "link":"powers/effects/insubstantial-general.html"
               },
               {
                  "name":"Leaping",
                  "link":"powers/effects/leaping-movement.html"
               },
               {
                  "name":"Luck Control",
                  "link":"powers/effects/luck-control-control.html"
               },
               {
                  "name":"Mental Transform",
                  "link":"powers/effects/mental-transform-attack.html"
               },
               {
                  "name":"Mind Reading",
                  "link":"powers/effects/mind-reading-sensory.html"
               },
               {
                  "name":"Mind Switch",
                  "link":"powers/effects/mind-switch-attack.html"
               },
               {
                  "name":"Morph",
                  "link":"powers/effects/morph-general.html"
               },
               {
                  "name":"Move Object",
                  "link":"powers/effects/move-object-control.html"
               },
               {
                  "name":"Movement",
                  "link":"powers/effects/movement-movement.html"
               },
               {
                  "name":"Nullify",
                  "link":"powers/effects/nullify-attack.html"
               },
               {
                  "name":"Permeate",
                  "link":"powers/effects/permeate-movement.html"
               },
               {
                  "name":"Phantom Ranks",
                  "link":"powers/effects/phantom-ranks-general.html"
               },
               {
                  "name":"Protection",
                  "link":"powers/effects/protection-defense.html"
               },
               {
                  "name":"Quickness",
                  "link":"powers/effects/quickness-general.html"
               },
               {
                  "name":"Regeneration",
                  "link":"powers/effects/regeneration-defense.html"
               },
               {
                  "name":"Remote Sensing",
                  "link":"powers/effects/remote-sensing-sensory.html"
               },
               {
                  "name":"Resistance",
                  "link":"powers/effects/resistance-defense.html"
               },
               {
                  "name":"Senses",
                  "link":"powers/effects/senses-sensory.html"
               },
               {
                  "name":"Shrinking",
                  "link":"powers/effects/shrinking-general.html"
               },
               {
                  "name":"Summon Minion",
                  "link":"powers/effects/summon-minion-control.html"
               },
               {
                  "name":"Summon Object",
                  "link":"powers/effects/summon-object-control.html"
               },
               {
                  "name":"Teleport",
                  "link":"powers/effects/teleport-movement.html"
               },
               {
                  "name":"Transform",
                  "link":"powers/effects/transform-control.html"
               },
               {
                  "name":"Variable",
                  "link":"powers/effects/variable-general.html"
               },
               {
                  "name":"Weaken",
                  "link":"powers/effects/weaken-attack.html"
               }
            ]
         },
         {
            "name":"Descriptors",
            "link":"powers/descriptors.html"
         },
         {
            "name":"Modifiers",
            "link":"powers/modifiers/index.html",
            "children":[
               {
                  "name":"Extras",
                  "link":"powers/modifiers/extras.html"
               },
               {
                  "name":"Flaws",
                  "link":"powers/modifiers/flaws.html"
               }
            ]
         }
      ]
   },
   {
      "name":"Gadgets &amp; Gear",
      "link":"gadgets-gear/index.html",
      "children":[
         {
            "name":"Constructs",
            "link":"gadgets-gear/constructs/index.html",
            "children":[
               {
                  "name":"Giant Robot",
                  "link":"gadgets-gear/constructs/giant-robot.html"
               },
               {
                  "name":"Robot",
                  "link":"gadgets-gear/constructs/robot.html"
               },
               {
                  "name":"Zombie",
                  "link":"gadgets-gear/constructs/zombie.html"
               }
            ]
         },
         {
            "name":"Headquarters",
            "link":"gadgets-gear/headquarters.html"
         },
         {
            "name":"Vehicles",
            "link":"gadgets-gear/vehicles.html"
         }
      ]
   },
   {
      "name":"Action &amp; Adventure",
      "link":"action-adventure.html"
   },
   {
      "name":"Gamemastering",
      "link":"gamemastering.html"
   },
   {
      "name":"Meta",
      "link":"meta/index.html",
      "children":[
         {
            "name":"Author Commentary",
            "link":"meta/author-commentary.html"
         },
         {
            "name":"Change Explanation",
            "link":"meta/change-explanation.html"
         },
         {
            "name":"Known Issues",
            "link":"meta/known-issues.html"
         },
         {
            "name":"Survey",
            "link":"meta/survey.html"
         },
         {
            "name":"Versioning",
            "link":"meta/versioning.html"
         }
      ]
   },
   {
      "name":"Supplementary Rules",
      "link":"supplementary-rules.html"
   },
   {
      "name":"Examples",
      "link":"examples.html"
   },
   {
      "name":"Glossary of Terms",
      "link":"glossary-of-terms.html"
   },
   {
      "name":"Open Game License",
      "link":"open-game-license.html"
   }
];

var expandIndex = 0;
var output = '';

output+='<div class="sites-embed">\n';
output+='<div class="sites-embed-content sites-sidebar-nav"><ul>\n';

function sideBarCreation(entry, depth)
{
   var isParent = (undefined !== entry.children);

   output+='<li';
   if (isParent || 0 === depth)
   {
      output+=' class="';
      if(0 === depth) output+='topLevel';
      if(0 === expandIndex) output+=' nav-first';
      if (isParent)
      {
         if(0 === depth) output+=' ';
         output+='parent';
         var containingFolderOfLink = entry.link.replace(/\/[^\/]*?$/, '/');
         if(depth > 0 && !currentPage.startsWith(containingFolderOfLink)) output+=' closed';
         output+='" id="expand' + expandIndex;
      }
      output+='"';
   }
   output+='>\n';

   output+='<div ';
   if(entry.link === currentPage) output+='class="current-bg" ';
   output+='style="padding-left: ';

   var padding = 19;
   if(isParent) padding = 0;
   padding += (19 * depth);
   output+=''+ padding;

   output+='px;">\n';
   if(isParent) output+='<div class="expander" onClick="return toggleMe(\'expand' + expandIndex + '\');"></div>\n';
   if(entry.link === currentPage) output+=entry.name + '\n';
   else output+='<a href="' + absolutePrefix + entry.link + '">' + entry.name + '</a>\n';
   output+='</div>\n';

   if (isParent)
   {
      ++expandIndex;
      output+='<ul>\n';
      for (var i = 0; i < entry.children.length; ++i)
      {
         sideBarCreation(entry.children[i], (depth+1));
      }
      output+='</ul>\n';
   }
   output+='</li>\n';
}
for (var i = 0; i < navigationJson.length; ++i)
{
   sideBarCreation(navigationJson[i], 0);
}

output+='</ul></div>\n';
output+='</div>\n';
output+='\n';
output+='<div class="sites-embed"><hr/><div class="sites-embed-content sites-embed-content-sidebar-textbox"><div class="stamp-top">\n';
output+='D20PFSRD<br />\n';
output+='COMICS<br />\n';
output+='GROUP\n';
output+='</div>\n';
output+='<div class="stamp-middle">\n';
output+='35&cent;\n';
output+='</div>\n';
output+='<div class="stamp-bottom" title="Send me an email!">\n';
output+='<a href="mailto:rworcest@g.emporia.edu" style="color:#990000;text-decoration:none">CONTACT ME</a>\n';
output+='</div></div></div>\n';
output+='<div class="sites-embed">\n';
output+='<h4 class="sites-embed-title">External Links</h4>\n';
output+='<div class="sites-embed-content sites-embed-content-sidebar-textbox">\n';
output+='<a href="http://www.greenronin.com/">Green Ronin</a><br />\n';
output+='<a href="http://mutantsandmasterminds.com/">Mutants &amp; Masterminds.com</a><br />\n';
output+='<a href="http://www.atomicthinktank.com/index.php">Mutants &amp; Masterminds Forum</a><br />\n';
output+='<a href="http://mmconversions.wikidot.com/">Hero Conversions</a><br />\n';
output+='<a href="http://wolflair.com/index.php?context=hero_lab">Hero Lab</a><br />\n';
output+='<a href="http://grfiles.game-host.org/3e_files/MnM3_charsheet_color.pdf">Character Sheet</a><br />\n';
output+='<a href="http://www.atomicthinktank.com/viewtopic.php?f=1&t=37265">Character Generator</a><br />\n';
output+='<a href="http://www.atomicthinktank.com/viewtopic.php?f=1&t=41685">Condition Cards</a><br />\n';
output+='<a href="http://stornart.com/">Hero Art by Storn Cook</a><br />\n';
output+='<a href="http://opengameart.org/">Open Game Art</a><br />\n';
output+='<a href="http://www.d20herosrd.com/">d20 Hero SRD (M&amp;M SRD)</a>\n';
output+='</div></div>\n';
output+='<hr/>\n';
output+='<div class="sites-embed-content-sidebar-textbox">\n';
output+='<img src="' + absolutePrefix + 'images/upc.png" class="generated-class-68" />\n';
output+='</div>\n';
output+='\n';

document.write(output);
})();

function toggleMe(elementId)
{
    var elementFound = document.getElementById(elementId);
    if(null === elementFound) return true;

    if(elementFound.className.endsWith(' closed')) elementFound.className = elementFound.className.replace(' closed', '');
    else elementFound.className += ' closed';
    return true;
}
