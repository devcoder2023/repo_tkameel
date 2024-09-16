

export default function User( data ) {
    
    this.id = data["id"];
    this.code = data["code"];
    this.firstName = data["firstName"];
    this.lastName = data["lastName"];
    this.email = data["email"];
    this.password = data["password"];
    this.about = data["about"];
    this.idType = data["idType"];
    this.idStatus = data["idStatus"];
    this.codeType = data["codeType"];
    this.codeStatus = data["codeStatus"];
    this.verifyCode = data["verifyCode"];
    this.imageProfile = data["imageProfile"];
        
    this.nameType = data["nameType"];
    this.nameStatus = data["nameStatus"];
    
    this.isFriend = data["isFriend"];
    
}


export function UserList() {
    
    
    this.listUser = [];
    
    
    this.fillListUser = function( data ) {
        
        this.listUser = [];
        let dataUser = ( data["user"] === undefined) ? [] : data["user"] ;
        
        
        for( var i=0; i<dataUser.length; i++) {
            
            let objUser = new User( dataUser[i] );
            this.listUser.push( objUser );
            
        }
        
    }
    
    
    this.getListUser = function() {
        return this.listUser;
    }
    
}

export function UserType( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
    
}



export function UserStatus( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
}













