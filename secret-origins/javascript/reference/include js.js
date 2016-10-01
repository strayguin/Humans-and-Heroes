/*var numberLoaded=0;
function done()
{
    numberLoaded++;
    if(numberLoaded === jsFileNamesUsed.length) allDone();
};*/
//document write is not a problem since this is ran only once
//the other way is too hacky. allDone defines main etc
function includeJsFile(jsName)
{
    document.write('<script type="text/javascript1.3" src="javascript/'+jsName+'.js"></script>'); return;

    var newTag = document.createElement('script');
    var newAtt = document.createAttribute('type');
    newAtt.nodeValue = 'text/javascript1.3';
    newTag.setAttributeNode(newAtt);

    newAtt = document.createAttribute('src');
    newAtt.nodeValue = 'javascript/'+jsName+'.js';
    newTag.setAttributeNode(newAtt);
    newTag.onload = done;

    //document.body.insertBefore(newTag, document.body.lastElementChild);  //before the last element (the final script tag)
    document.body.insertBefore(newTag);  //at the end (after the main script since the final one doesn't exist yet)
}
