
import User from './moduleUser.js';

export default User;


export function UserProfile( data ) {
    
    let datau = ( data["user"] === undefined) ? [] : data["user"] ;
    
    let myUser = null;
    if( datau.length > 0 ) {
        myUser = new User( datau[0] );
    }else{
        return null;
    }
    
    
    myUser.listFriend = [];
    myUser.listFollow = [];
    myUser.listSuggestions = [];
    
    myUser.listContact = [];
    myUser.listCertificate = [];
    myUser.listExperience = [];
    myUser.listUserSkill = [];
    
    
    

    let dataFriends = ( data["userFriends"] === undefined) ? [] : data["userFriends"] ;
    let dataFollowers = ( data["userFollowers"] === undefined) ? [] : data["userFollowers"] ;
    let dataSuggestions = ( data["userSuggestions"] === undefined) ? [] : data["userSuggestions"] ;
    
    let dataContact = ( data["contact"] === undefined) ? [] : data["contact"] ;
    let dataCertificate = ( data["certificate"] === undefined) ? [] : data["certificate"] ;
    let dataExperience = ( data["experience"] === undefined) ? [] : data["experience"] ;
    let dataUserSkills = ( data["userSkills"] === undefined) ? [] : data["userSkills"] ;
    
    
    for(var i=0; i<dataFriends.length; i++) {
        myUser.listFriend.push( new User( dataFriends[i] ) );
    }
    for(var i=0; i<dataFollowers.length; i++) {
        myUser.listFollow.push( new User( dataFollowers[i] ) );
    }
    for(var i=0; i<dataSuggestions.length; i++) {
        myUser.listSuggestions.push( new User( dataSuggestions[i] ) );
    }
    
    
    for(var i=0; i<dataContact.length; i++) {
        myUser.listContact.push( new Contact( dataContact[i] ) );
    }
    for(var i=0; i<dataCertificate.length; i++) {
        myUser.listCertificate.push( new Certificate( dataCertificate[i] ) );
    }
    for(var i=0; i<dataExperience.length; i++) {
        myUser.listExperience.push( new Experience( dataExperience[i] ) );
    }
    for(var i=0; i<dataUserSkills.length; i++) {
        myUser.listUserSkill.push( new UserSkill( dataUserSkills[i] ) );
    }
    
    
    
    
    
    
    
    
    
    
    myUser.fillContact = function( data ) {
        
        let dataContact = ( data["contact"] === undefined) ? [] : data["contact"] ;
        
        myUser.listContact = [];
        
        for(var i=0; i<dataContact.length; i++) {
            myUser.listContact.push( new Contact( dataContact[i] ) );
        }
        
    }
    
    
    myUser.fillCertificate = function( data ) {
        
        let dataCertificate = ( data["certificate"] === undefined) ? [] : data["certificate"] ;
        
        myUser.listCertificate = [];
        
        for(var i=0; i<dataCertificate.length; i++) {
            myUser.listCertificate.push( new Certificate( dataCertificate[i] ) );
        }
        
    }
    
    
    myUser.fillExperience = function( data ) {
        
        let dataExperience = ( data["experience"] === undefined) ? [] : data["experience"] ;
        
        myUser.listExperience = [];
        
        for(var i=0; i<dataExperience.length; i++) {
            myUser.listExperience.push( new Experience( dataExperience[i] ) );
        }
        
    }
    
    
    myUser.fillUserSkills = function( data ) {
        
        let dataUserSkills = ( data["userSkills"] === undefined) ? [] : data["userSkills"] ;
        
        myUser.listUserSkill = [];
        
        for(var i=0; i<dataUserSkills.length; i++) {
            myUser.listUserSkill.push( new UserSkill( dataUserSkills[i] ) );
        }
        
    }
    
    
    return myUser;
    
    
}




/*----------------------------*/


function Contact( data ) {

    this.id = data["id"];
    this.codeType = data["codeType"];
    this.account = data["account"];
    this.codeUser = data["codeUser"];
    
    this.nameType = data["nameType"];
    this.iconType = data["iconType"];
    
}

function Certificate( data ) {

    this.id = data["id"];
    this.name = data["name"];
    this.nameOrganization = data["nameOrganization"];
    this.dateExport = data["dateExport"];
    this.duration = data["duration"];
    this.codeUser = data["codeUser"];

}

function Experience( data ) {

    this.id = data["id"];
    this.nameJob = data["nameJob"];
    this.nameOrganization = data["nameOrganization"];
    this.dateStart = data["dateStart"];
    this.dateEnd = data["dateEnd"];
    this.codeUser = data["codeUser"];

}

function UserSkill( data  ) {

    this.id = data["id"];
    this.codeUser = data["codeUser"];
    this.codeSkill = data["codeSkill"];
    this.codeLevel = data["codeLevel"];
    this.description = data["description"];
    
    this.nameSkill = data["nameSkill"];
}


export function ContactType( data ) {
    
    this.id = data["id"];
    this.code = data["code"];
    this.name = data["name"];
    this.icon = data["icon"];
    
}









