function toggleMe(elementId) {
    var elementFound = document.getElementById(elementId);
    if(elementFound === null) return true;

    var classNameFound = '' + elementFound.className;
    if(classNameFound.indexOf('closed') !== -1) elementFound.className = classNameFound.replace('closed', '');
    else elementFound.className += 'closed';
    //this is why the classes in the side bar have a trailing space
    return true;
}
