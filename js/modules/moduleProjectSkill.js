

export function getListSkill() {
    return listProjectSkill;
}


export function fillData( data ) {

    listProjectSkill = [];
    
    for( var i=0; i<data.length; i++) {
        let objProjectSkill = fillObjectProjectSkill( data[i] );
        listProjectSkill.push( objProjectSkill );
    }
    
}


/* ----- PROJECT SKILL ----- */
let listProjectSkill = [];

var objectProjectSkill= {
    id: 0,
    idProject: 0,
    idSkill: 0,
    description: "",
    nameSkill: ""
};
function fillObjectProjectSkill( data ) {
    let objProjectSkill = Object.create( objectProjectSkill );
    
    objProjectSkill.id = data["id"] ;
    objProjectSkill.idProject = data["idProject"] ;
    objProjectSkill.idSkill = data["idSkill"] ;
    objProjectSkill.description = data["description"] ;
    objProjectSkill.nameSkill = data["nameSkill"] ;
    
    return objProjectSkill;
}


