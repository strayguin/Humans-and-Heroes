function VersionObject(major, minor)
{
    this.major = major;
    this.minor = minor;
    this.toString=function(){return (this.major + '.' + this.minor);}
    this.clone=function(){return new VersionObject(this.major, this.minor);}

    /**return (this > other);
    The other parameter must be a VersionObject
    */
    this.isGreaterThan=function(other)
    {
        if(this.major > other.major) return true;
        if(this.major < other.major) return false;
        return (this.minor > other.minor);
    }
    //create functions only as needed
};
