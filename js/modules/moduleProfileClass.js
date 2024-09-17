
import User from './moduleUserClass.js';
import Project from './moduleProjectClass.js';
import Skill , { SkillLevel } from './moduleSkillClass.js';

import Main from './moduleMain.js';


let mainApp = new Main();


export default class Profile extends User {
    constructor( data ) {
        
        let dataUser = ( data["user"] === undefined) ? [] : data["user"] ;
        
        super( dataUser[0] );
        this.fillDataProfile( data );
        this.fillDataBasic( data );
    }
    
    
    /*=============== ACTION PROFILE ===============*/
    
    followUser( follow , codeUser ) {
        
        const pathFollow = mainApp.pathDomain + "api/createFollowUser.php";
        
        let action = (follow) ? "follow" : "unfollow";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("action", action );
        formData.append("codeUser", codeUser );
        formData.append("codeUserFollow", this.code );
        
        return mainApp.send( "POST", pathFollow , headers, formData );
    }
    
    
    /*=============== UPDATE INFO ===============*/
    
    updateUsername( firstName , lastName ) {
        
        const pathUpdateAbout = mainApp.pathDomain + "api/updateUserAbout.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("action", "name" );
        formData.append("firstName", firstName );
        formData.append("lastName", lastName );
        
        return mainApp.send( "POST", pathUpdateAbout , headers, formData );
    }
    updateImage( codeUser , img , ) {
        
        const pathUpdateAbout = mainApp.pathDomain + "api/updateUserAbout.php";
        
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("action", "image" );
        formData.append("imageProfile", img );
        
        return mainApp.send( "POST", pathUpdateAbout , headers, formData );
    }
    updateAbout( about ) {
        
        const pathUpdateAbout = mainApp.pathDomain + "api/updateUserAbout.php";
        
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("action", "about" );
        formData.append("about", about );
        
        return mainApp.send( "POST", pathUpdateAbout , headers, formData );
    }
    
    
    
    /*=============== CONTACT ===============*/
    
    addContact( codeType , account ) {
        
        const pathCreateContact = mainApp.pathDomain + "api/createUserContact.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("codeType", codeType );
        formData.append("account", account );
        
        return mainApp.send( "POST", pathCreateContact , headers, formData );
    }
    
    updateContact( idContact , codeType , account ) {
        
        const pathUpdateContact = mainApp.pathDomain + "api/updateUserContact.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("id", idContact );
        formData.append("codeType", codeType );
        formData.append("account", account );
        
        return mainApp.send( "POST", pathUpdateContact , headers, formData );
    }
    
    removeContact( idContact ) {
        
        const pathDeleteContact = mainApp.pathDomain + "api/deleteUserContact.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("id", idContact );
        formData.append("codeUser", this.code );
        
        return mainApp.send( "POST", pathDeleteContact , headers, formData );
    }
    
    
    
    /*=============== CERTIFICATE ===============*/
    
    addCertificate( nameCertificate , nameOrganization , dateExport , duration ) {
        
        const pathCreateCertificate = mainApp.pathDomain + "api/createUserCertificate.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("nameCertificate", nameCertificate );
        formData.append("nameOrganization", nameOrganization );
        formData.append("dateExport", dateExport );
        formData.append("duration", duration );
        
        return mainApp.send( "POST", pathCreateCertificate , headers, formData );
    }
    
    updateCertificate( idCertificate , nameCertificate , nameOrganization , dateExport , duration ) {
        
        const pathUpdateCertificate = mainApp.pathDomain + "api/updateUserCertificate.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("id", idCertificate );
        formData.append("nameCertificate", nameCertificate );
        formData.append("nameOrganization", nameOrganization );
        formData.append("dateExport", dateExport );
        formData.append("duration", duration );
        
        return mainApp.send( "POST", pathUpdateCertificate , headers, formData );
    }
    
    removeCertificate( idCertificate ) {
        
        const pathDeleteCertificate = mainApp.pathDomain + "api/deleteUserCertificate.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("id", idCertificate );
        
        return mainApp.send( "POST", pathDeleteCertificate , headers, formData );
    }
    
    
    
    /*=============== EXPERIENCE ===============*/
    
    addExperience( nameJob , nameOrganization , dateStart , dateEnd ) {
        
        const pathCreateExperience = mainApp.pathDomain + "api/createUserExperience.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("nameJob", nameJob );
        formData.append("nameOrganization", nameOrganization );
        formData.append("dateStart", dateStart );
        formData.append("dateEnd", dateEnd );
        
        return mainApp.send( "POST", pathCreateExperience , headers, formData );
    }
    
    updateExperience( idExperience , nameJob , nameOrganization , dateStart , dateEnd ) {
        
        const pathUpdateExperience = mainApp.pathDomain + "api/updateUserExperience.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("id", idExperience );
        formData.append("nameJob", nameJob );
        formData.append("nameOrganization", nameOrganization );
        formData.append("dateStart", dateStart );
        formData.append("dateEnd", dateEnd );
        
        return mainApp.send( "POST", pathUpdateExperience , headers, formData );
    }
    
    removeExperience( idExperience ) {
        
        const pathDeleteExperience = mainApp.pathDomain + "api/deleteUserExperience.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("id", idExperience );
        
        return mainApp.send( "POST", pathDeleteExperience , headers, formData );
    }
    
    
    
    /*=============== USERSKILL ===============*/
    
    addUserSkill( codeSkill , codeLevel , description ) {
        
        const pathCreateSkill = mainApp.pathDomain + "api/createUserSkill.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("codeSkill", codeSkill );
        formData.append("codeLevel", codeLevel );
        formData.append("description", description );
        
        return mainApp.send( "POST", pathCreateSkill , headers, formData );
    }
    
    updateUserSkill( idUserSkill , codeSkill , codeLevel , description ) {
        
        const pathUpdateSkill = mainApp.pathDomain + "api/updateUserSkill.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("id", idUserSkill );
        formData.append("codeSkill", codeSkill );
        formData.append("codeLevel", codeLevel );
        formData.append("description", description );
        
        return mainApp.send( "POST", pathUpdateSkill , headers, formData );
    }
    
    removeUserSkill( idUserSkill ) {
        
        const pathDeleteSkill = mainApp.pathDomain + "api/deleteUserSkill.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", this.code );
        formData.append("id", idUserSkill );
        
        return mainApp.send( "POST", pathDeleteSkill , headers, formData );
    }
    
    
    
    /*=============== FILL DATA PROFILE ===============*/
    
    fillDataProfile( data ) {
        
        this.checkIsFriend( data );
        
        this.fillProfileFriends( data );
        this.fillProfileFollows( data );
        this.fillProfileSuggestions( data );
        
        this.fillProfileContact( data );
        this.fillProfileCertificate( data );
        this.fillProfileExperience( data );
        this.fillProfileUserSkill( data );
        
        this.fillProfileProjectMy( data );
        this.fillProfileProjectJoin( data );
        
        this.clacEvaluation( data );
        
    }
    
    checkIsFriend( data ) {
        this._isFriend = data["isFriend"];
    }
    toggleIsFriend() {
        this._isFriend = !(this._isFriend);
    }
    
    fillProfileFriends( data ) {
        
        this.listFriend = [];
        
        let dataFriends = ( data["userFriends"] === undefined) ? [] : data["userFriends"] ;
        
        for(var i=0; i<dataFriends.length; i++) {
            this.listFriend.push( new User( dataFriends[i] ) );
        }
        
    }
    fillProfileFollows( data ) {
        
        this.listFollow = [];
        
        let dataFollowers = ( data["userFollowers"] === undefined) ? [] : data["userFollowers"] ;
        
        for(var i=0; i<dataFollowers.length; i++) {
            this.listFollow.push( new User( dataFollowers[i] ) );
        }
        
    }
    fillProfileSuggestions( data ) {
        
        this.listSuggestions = [];
        
        let dataSuggestions = ( data["userSuggestions"] === undefined) ? [] : data["userSuggestions"] ;
        
        for(var i=0; i<dataSuggestions.length; i++) {
            this.listSuggestions.push( new User( dataSuggestions[i] ) );
        }
        
    }
    
    fillProfileContact( data ) {
        
        this.listContact = [];
        
        let dataContact = ( data["contact"] === undefined) ? [] : data["contact"] ;
        
        for(var i=0; i<dataContact.length; i++) {
            this.listContact.push( new Contact( dataContact[i] ) );
        }
        
    }
    fillProfileCertificate( data ) {
        
        this.listCertificate = [];
        
        let dataCertificate = ( data["certificate"] === undefined) ? [] : data["certificate"] ;
        
        for(var i=0; i<dataCertificate.length; i++) {
            this.listCertificate.push( new Certificate( dataCertificate[i] ) );
        }
        
    }
    fillProfileExperience( data ) {
        
        this.listExperience = [];
        
        let dataExperience = ( data["experience"] === undefined) ? [] : data["experience"] ;
        
        for(var i=0; i<dataExperience.length; i++) {
            this.listExperience.push( new Experience( dataExperience[i] ) );
        }
        
    }
    fillProfileUserSkill( data ) {
        
        this.listUserSkill = [];
        
        let dataUserSkills = ( data["userSkills"] === undefined) ? [] : data["userSkills"] ;
        
        for(var i=0; i<dataUserSkills.length; i++) {
            this.listUserSkill.push( new UserSkill( dataUserSkills[i] ) );
        }
        
    }
    
    fillProfileProjectMy( data ) {
        
        this.listProjectMy = [];
        
        let dataProject = ( data["project"] === undefined) ? [] : data["project"] ;
        
        for( var i=0; i<dataProject.length; i++) {
            this.listProjectMy.push( new Project( dataProject[i] ) );
        }
        
    }
    fillProfileProjectJoin( data ) {
        
        this.listProjectJoin = [];
        
        let dataProject = ( data["projectJoin"] === undefined) ? [] : data["projectJoin"] ;
        
        for( var i=0; i<dataProject.length; i++) {
            this.listProjectJoin.push( new Project( dataProject[i] ) );
        }
    }
    
    clacEvaluation( data ) {
        
        this.countProject = data["countProject"];
        this.countProjectShare = data["countProjectShare"];
        const countProjectShareMark = data["countProjectShareMark"];
        this.medMark = (countProjectShareMark) ? countProjectShareMark / this.countProjectShare : 0;
        
    }
    
    
    /*-------- GET LIST --------*/
    
    isFriend() {
        return this._isFriend;
    }
    getListFriend() {
        return this.listFriend;
    }
    getListFollow() {
        return this.listFollow;
    }
    getListSuggestion() {
        return this.listSuggestions;
    }
    
    getListContact() {
        return this.listContact;
    }
    getListCertificate() {
        return this.listCertificate;
    }
    getListExperience() {
        return this.listExperience;
    }
    getListUserSkill() {
        return this.listUserSkill;
    }
    
    getListProjectMy() {
        return this.listProjectMy;
    }
    getListProjectJoin() {
        return this.listProjectJoin;
    }
    
    getCountProject() {
        return this.countProject;
    }
    getCountProjectShare() {
        return this.countProjectShare;
    }
    getEvaluation() {
        return this.medMark;
    }
    
    
    /*=============== FILL DATA BASIC ===============*/
    
    fillDataBasic( data ) {
        
        this.listContactType = [];
        this.listSkill = [];
        this.listSkillLevel = [];
        
        
        const dataContactType = ( data["contactType"] === undefined) ? [] : data["contactType"] ;
        
        const dataSkill = ( data["skill"] === undefined) ? [] : data["skill"] ;
        const dataSkillLevel = ( data["skilllevel"] === undefined) ? [] : data["skilllevel"] ;
        
        
        for(var i=0; i<dataContactType.length; i++) {
            this.listContactType.push( new ContactType( dataContactType[i] ) );
        }
        
        for(var i=0; i<dataSkill.length; i++) {
            this.listSkill.push( new Skill( dataSkill[i] ) );
        }
        
        for(var i=0; i<dataSkillLevel.length; i++) {
            this.listSkillLevel.push( new SkillLevel( dataSkillLevel[i] ) );
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListSkill() {
        return this.listSkill;
    }
    getListSkillLevel() {
        return this.listSkillLevel;
    }
    getListContactType() {
        return this.listContactType;
    }
    
    
    
}




/*----------------------------*/

class Contact {
    constructor( data ) {
        this.id = data["id"];
        this.codeType = data["codeType"];
        this.account = data["account"];
        this.codeUser = data["codeUser"];
        
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
        this.codeUser = data["codeUser"];
    }
}

class Experience {
    constructor( data ) {
        this.id = data["id"];
        this.nameJob = data["nameJob"];
        this.nameOrganization = data["nameOrganization"];
        this.dateStart = data["dateStart"];
        this.dateEnd = data["dateEnd"];
        this.codeUser = data["codeUser"];
    }
}

class UserSkill {
    constructor( data ) {
        this.id = data["id"];
        this.codeUser = data["codeUser"];
        this.codeSkill = data["codeSkill"];
        this.codeLevel = data["codeLevel"];
        this.description = data["description"];
        
        this.nameSkill = data["nameSkill"];
    }
}

class ContactType {
    constructor( data ) {
        this.id = data["id"];
        this.code = data["code"];
        this.name = data["name"];
        this.icon = data["icon"];
    }
}














