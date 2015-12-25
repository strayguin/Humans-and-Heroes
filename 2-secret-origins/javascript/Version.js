const VersionCompare = {};
/**return (left > right);
Both parameters must be objects with properties of major and minor (each being an integer)
*/
VersionCompare.isGreaterThan = function(left, right)
{
    if(left.major > right.major) return true;
    if(left.major < right.major) return false;
    return (left.minor > right.minor);
};
//create VersionCompare only as needed
