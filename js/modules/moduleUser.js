

export default function User( data ) {
    
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
    
    this.isFriend = data["isFriend"];
    
}


export function UserList() {
    
    this.listUsers = [];
    
    this.fillListUser = function( data ) {
        
        this.listUsers = fillUser( data );
        
    }
    
    
    this.getListUser = function() {
        return this.listUsers;
    }
    
}



function fillUser( data ) {
    
    let list = [];
    
    let dataUser = ( data["user"] === undefined) ? [] : data["user"] ;
    
    for( var i=0; i<dataUser.length; i++) {
        
        let objUser = new User( dataUser[i] );
        list.push( objUser );
        
    }
    
    return list;
}


/*----------------------------*/
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













