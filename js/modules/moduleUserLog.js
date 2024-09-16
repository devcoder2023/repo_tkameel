
import User from './moduleUser.js';

export default User;


export function getUser() {
    return _objUser;
}

export function init_User() {
    
    var userid = getValCookie("userid");
    var usercode = getValCookie("usercode");
    var userfirstname = getValCookie("userfirstname");
    var userlastname = getValCookie("userlastname");
    var useremail = getValCookie("useremail");
    var userabout = getValCookie("userabout");
    var usercodetype = getValCookie("usercodetype");
    var usercodestatus = getValCookie("usercodestatus");
    var userimageprofile = getValCookie("userimageprofile");
    
    var usernametype = getValCookie("usernametype");
    var usernamestatus = getValCookie("usernamestatus");
    
    
    
    if( userid ) {
        
        _objUser = Object.create(objectUser);
        _objUser.userId = userid;
        _objUser.userCode = usercode;
        _objUser.userFirstName = userfirstname;
        _objUser.userLastName = userlastname;
        _objUser.userEmail = useremail;
        _objUser.userAbout = userabout;
        _objUser.userCodeType = usercodetype;
        _objUser.userCodeStatus = usercodestatus;
        _objUser.userImageProfile = userimageprofile;
        
    }
    
    
}


let _objUser = null;

let objectUser = {
    userId: 0,
    userCode: "",
    userFirstName: 0,
    userLastName: "",
    userEmail: "",
    userAbout: "",
    userCodeType: 0,
    userCodeStatus: 0,
    userVerifyCode: "",
    userImageProfile: "",
    
    userNameType: "",
    userNameStatus: "",
    
}
function getValCookie( cname ) {
    
    var reg = cname + '=([^;]+)' ;
    var cookie = document.cookie.match(new RegExp( reg ));
    if(cookie === null) 
    {
        return null;
    }
    else
    {
        return decodeURIComponent(cookie[1]);
    }
    
}

