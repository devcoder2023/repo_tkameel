
export default class User {
    constructor( data ) {
        
        this.id = data["id"];
        this.code = data["code"];
        this.firstName = data["firstName"];
        this.lastName = data["lastName"];
        this.email = data["email"];
        this.password = data["password"];
        this.about = data["about"];
        this.dateCreate = data["dateCreate"];
        this.codeType = data["codeType"];
        this.codeStatus = data["codeStatus"];
        this.verifyCode = data["verifyCode"];
        this.imageProfile = data["imageProfile"];
            
        this.nameType = data["nameType"];
        this.nameStatus = data["nameStatus"];
        
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



















































