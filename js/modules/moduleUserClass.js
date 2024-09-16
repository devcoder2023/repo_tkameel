

export default class User {
    constructor( data ) {
        
        this.id = data["id"];
        this.firstName = data["firstName"];
        this.lastName = data["lastName"];
        this.email = data["email"];
        this.password = data["password"];
        this.about = data["about"];
        this.idType = data["idType"];
        this.idStatus = data["idStatus"];
        this.verifyCode = data["verifyCode"];
        this.imageProfile = data["imageProfile"];
            
        this.nameType = data["nameType"];
        this.nameStatus = data["nameStatus"];
        
        this.isFriend = data["isFriend"];
    }
    
}


export class UserProfile extends User {
    constructor( data ) {
        let datau = ( data["user"] === undefined) ? [] : data["user"][0] ;
        
        super( datau );
        this.fillAllData( data );
    }
    
    listFriend = [];
    listFollow = [];
    listSuggestions = [];
    
    listContact = [];
    listCertificate = [];
    listExperience = [];
    listUserSkill = [];
    
    fillAllData( data ) {
        console.log("Start Fill Profile .. ");
        
        let dataFriends = ( data["userFriends"] === undefined) ? [] : data["userFriends"] ;
        let dataFollowers = ( data["userFollowers"] === undefined) ? [] : data["userFollowers"] ;
        let dataSuggestions = ( data["userSuggestions"] === undefined) ? [] : data["userSuggestions"] ;
        
        let dataContact = ( data["contact"] === undefined) ? [] : data["contact"] ;
        let dataCertificate = ( data["certificate"] === undefined) ? [] : data["certificate"] ;
        let dataExperience = ( data["experience"] === undefined) ? [] : data["experience"] ;
        let dataUserSkills = ( data["userSkills"] === undefined) ? [] : data["userSkills"] ;
        
        for(var i=0; i<dataFriends.length; i++) {
            this.listFriend.push( new User( dataFriends[i] ) );
        }
        for(var i=0; i<dataFollowers.length; i++) {
            this.listFollow.push( new User( dataFollowers[i] ) );
        }
        for(var i=0; i<dataSuggestions.length; i++) {
            this.listSuggestions.push( new User( dataSuggestions[i] ) );
        }
        
        
        for(var i=0; i<dataContact.length; i++) {
            this.listContact.push( new Contact( dataContact[i] ) );
        }
        for(var i=0; i<dataCertificate.length; i++) {
            this.listCertificate.push( new Certificate( dataCertificate[i] ) );
        }
        for(var i=0; i<dataExperience.length; i++) {
            this.listExperience.push( new Experience( dataExperience[i] ) );
        }
        for(var i=0; i<dataUserSkills.length; i++) {
            this.listUserSkill.push( new UserSkill( dataUserSkills[i] ) );
        }
        
        console.log("End Fill Profile .. ");
    }
    
    
    
    fillFriend( data ) {
        let dataFriends = ( data["userFriends"] === undefined) ? [] : data["userFriends"] ;
        
        for(var i=0; i<dataFriends.length; i++) {
            this.listFriend.push( new User( dataFriends[i] ) );
        }
    }
    fillFollow( data ) {
        let dataFollowers = ( data["userFollowers"] === undefined) ? [] : data["userFollowers"] ;
        
        for(var i=0; i<dataFollowers.length; i++) {
            this.listFollow.push( new User( dataFollowers[i] ) );
        }
    }
    fillSuggestion( data ) {
        let dataSuggestions = ( data["userSuggestions"] === undefined) ? [] : data["userSuggestions"] ;
        
        for(var i=0; i<dataSuggestions.length; i++) {
            this.listSuggestions.push( new User( dataSuggestions[i] ) );
        }
    }
    
    
    fillContact( data ) {
        let dataContact = ( data["contact"] === undefined) ? [] : data["contact"] ;
        
        for(var i=0; i<dataContact.length; i++) {
            this.listContact.push( new Contact( dataContact[i] ) );
        }
    }
    fillCertificate( data ) {
        let dataCertificate = ( data["certificate"] === undefined) ? [] : data["certificate"] ;
        
        for(var i=0; i<dataCertificate.length; i++) {
            this.listCertificate.push( new Certificate( dataCertificate[i] ) );
        }
    }
    fillExperience( data ) {
        let dataExperience = ( data["experience"] === undefined) ? [] : data["experience"] ;
        
        for(var i=0; i<dataExperience.length; i++) {
            this.listExperience.push( new Experience( dataExperience[i] ) );
        }
    }
    fillUserSkill( data ) {
        let dataUserSkills = ( data["userSkills"] === undefined) ? [] : data["userSkills"] ;
        
        for(var i=0; i<dataUserSkills.length; i++) {
            this.listUserSkill.push( new UserSkill( dataUserSkills[i] ) );
        }
    }
    
    
    
    
    get getListFriend() {
        return this.listFriend;
    }
    get getListFollow() {
        return this.listFollow;
    }
    get getListSuggestions() {
        return this.listSuggestions;
    }
    
    get getListContact() {
        return this.listContact;
    }
    get getListCertificate() {
        return this.listCertificate;
    }
    get getListExperience() {
        return this.listExperience;
    }
    get getListUserSkill() {
        return this.listUserSkill;
    }
    
}




/*----------------------------*/

class Contact {
    constructor( data ) {
        this.id = data["id"];
        this.account = data["account"];
        this.idType = data["idType"];
        this.idUser = data["idUser"];
        
        this.nameType = data["nameType"];
        this.iconType = data["iconType"];
    }
}

class Certificate {
    constructor( data ) {
        this.id = data["id"];
        this.name = data["name"];
        this.nameOrganization = data["nameOrganization"];
        this.dateExport = data["dateExport"];
        this.duration = data["duration"];
        this.idUser = data["idUser"];
    }
}

class Experience {
    constructor( data ) {
        this.id = data["id"];
        this.nameJob = data["nameJob"];
        this.nameOrganization = data["nameOrganization"];
        this.dateStart = data["dateStart"];
        this.dateEnd = data["dateEnd"];
        this.idUser = data["idUser"];
    }
}

class UserSkill {
    constructor( data ) {
        this.id = data["id"];
        this.idUser = data["idUser"];
        this.idSkill = data["idSkill"];
        this.idLevel = data["idLevel"];
        this.description = data["description"];
        
        this.nameSkill = data["nameSkill"];
    }
}



















































