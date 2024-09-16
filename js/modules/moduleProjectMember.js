

export function getListMember() {
    return listProjectMember;
}


export function fillData( data ) {

    listProjectMember = [];
   
    for( var i=0; i<data.length; i++) {
        let objProjectMember = fillObjectProjectMember( data[i] );
        listProjectMember.push( objProjectMember );
    }
    
}


/* ----- POST ----- */
let listProjectMember = [];

var objectProjectMember = {
    id: 0,
    idUser: 0,
    idProject: 0,
    idProjectSkill: 0,
    message: "",
    dateRequest: "",
    dateJoin: "",
    mark: 0,
    idStatusMember: 0,
    
    firstName: "",
    lastName: "",
    about: "",
    imageProfile: "",
    
    nameSkill: ""
};
function fillObjectProjectMember( data ) {
    let objProjectMember = Object.create( objectProjectMember );
    
    objProjectMember.id = data["id"] ;
    objProjectMember.idUser = data["idUser"] ;
    objProjectMember.idProject = data["idProject"] ;
    objProjectMember.idProjectSkill = data["idProjectSkill"] ;
    objProjectMember.message = data["message"] ;
    objProjectMember.dateRequest = data["dateRequest"] ;
    objProjectMember.dateJoin = data["dateJoin"] ;
    objProjectMember.mark = data["mark"] ;
    objProjectMember.idStatusMember = data["idStatusMember"] ;
    
    objProjectMember.firstName = data["firstName"] ;
    objProjectMember.lastName = data["lastName"] ;
    objProjectMember.about = data["about"] ;
    objProjectMember.imageProfile = data["imageProfile"] ;
    
    objProjectMember.nameSkill = data["nameSkill"] ;
    
    return objProjectMember;
}