

export function getListTask() {
    return listProjectTask;
}


export function fillData( data ) {

    listProjectTask = [];
    
    for( var i=0; i<data.length; i++) {
        let objProjectTask = fillObjectProjectTask( data[i] );
        listProjectTask.push( objProjectTask );
    }
    
}


/* ----- PROJECT TASK ----- */
let listProjectTask = [];

var objectProjectTask= {
    id: 0,
    name: "",
    description: "",
    idProject: 0,
    idProjectSkill: 0,
    idTaskStatus: 0,
    idUser: 0,
};
function fillObjectProjectTask( data ) {
    let objProjectTask = Object.create( objectProjectTask );
    
    objProjectTask.id = data["id"] ;
    objProjectTask.name = data["name"] ;
    objProjectTask.description = data["description"] ;
    objProjectTask.idProject = data["idProject"] ;
    objProjectTask.idProjectSkill = data["idProjectSkill"] ;
    objProjectTask.idTaskStatus = data["idTaskStatus"] ;
    objProjectTask.idUser = data["idUser"] ;
    
    return objProjectTask;
}


