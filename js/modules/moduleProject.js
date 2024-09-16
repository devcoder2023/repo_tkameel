import * as moduleProjectSkill from './moduleProjectSkill.js';
import * as moduleProjectTask from './moduleProjectTask.js';
import * as moduleProjectMember from './moduleProjectMember.js';


export default function Project( data ) {
    
    this.id = data["id"];
    this.code = data["code"];
    this.name = data["name"];
    this.idCategory = data["idCategory"];
    this.idType = data["idType"]
    this.codeCategory = data["codeCategory"];
    this.codeType = data["codeType"]
    this.description = data["description"];
    this.goals = data["goals"];
    this.dateCreate = data["dateCreate"];
    this.dateExpiry = data["dateExpiry"];
    this.idUser = data["idUser"];
    this.codeUser = data["codeUser"] ;
    this.idStatus = data["idStatus"];
    this.codeStatus = data["codeStatus"] ;
    this.codeStatusJoin = data["codeStatusJoin"] ;
    this.imageProfile = data["imageProfile"];
    
    this.nameType = data["nameType"];
    this.nameCategory = data["nameCategory"];
    this.totalView = data["totalView"];
    
    
    
}


export function ProjectFull( data ) {
    
    let dataProject = ( data["project"] === undefined) ? [] : data["project"] ;
    let dataProjectSkill = ( data["projectSkill"] === undefined) ? [] : data["projectSkill"] ;
    let dataProjectTask = ( data["projectTask"] === undefined) ? [] : data["projectTask"] ;
    let dataProjectMember = ( data["projectMember"] === undefined) ? [] : data["projectMember"] ;
    let dataProjectDirect = ( data["projectDirect"] === undefined) ? [] : data["projectDirect"] ;
    
    
    let myProject = null;
    if( dataProject.length > 0) {
        myProject = new Project( dataProject[0] );
    } else {
        return null;
    }
    
    myProject.listSkills = [];
    myProject.listTasks = [];
    myProject.listMembers = [];
    myProject.listDirects = [];
    
    
    
    for( var i=0; i<dataProjectSkill.length; i++) {
        let skill = new Skill( dataProjectSkill[i] );
        myProject.listSkills.push( skill );
    }
    
    for( var i=0; i<dataProjectTask.length; i++) {
        let task = new Task( dataProjectTask[i] );
        myProject.listTasks.push( task );
    }
    
    for( var i=0; i<dataProjectMember.length; i++) {
        let member = new Member( dataProjectMember[i] );
        myProject.listMembers.push( member );
    }
    
    for( var i=0; i<dataProjectDirect.length; i++) {
        let direct = new ProjectDirect( dataProjectDirect[i] );
        myProject.listDirects.push( direct );
    }
    
    myProject.fillSkillsAndTasks = function( data ) {
        
        let dataProjectSkill = ( data["projectSkill"] === undefined) ? [] : data["projectSkill"] ;
        let dataProjectTask = ( data["projectTask"] === undefined) ? [] : data["projectTask"] ;
        let dataProjectMember = ( data["projectMember"] === undefined) ? [] : data["projectMember"] ;
        let dataProjectDirect = ( data["projectDirect"] === undefined) ? [] : data["projectDirect"] ;
        
        myProject.listSkills = [];
        myProject.listTasks = [];
        myProject.listMembers = [];
        myProject.listDirects = [];
        
        for( var i=0; i<dataProjectSkill.length; i++) {
            let skill = new Skill( dataProjectSkill[i] );
            myProject.listSkills.push( skill );
        }
        
        for( var i=0; i<dataProjectTask.length; i++) {
            let task = new Task( dataProjectTask[i] );
            myProject.listTasks.push( task );
        }
        
        for( var i=0; i<dataProjectMember.length; i++) {
            let member = new Member( dataProjectMember[i] );
            myProject.listMembers.push( member );
        }
        
        for( var i=0; i<dataProjectDirect.length; i++) {
            let direct = new ProjectDirect( dataProjectDirect[i] );
            myProject.listDirects.push( direct );
        }
    
    
    }
    
    myProject.fillMembers = function( data ) {
        
        let dataProjectMember = ( data["projectMember"] === undefined) ? [] : data["projectMember"] ;
        
        myProject.listMembers = [];
        
        for( var i=0; i<dataProjectMember.length; i++) {
            let member = new Member( dataProjectMember[i] );
            myProject.listMembers.push( member );
        }
        
    }
    
    
    
    return myProject;
}

export function ProjectList() {
    
    
    this.listProject = [];
    
    
    this.fillListProject = function( data ) {
        
        this.listProject = [];
        let dataProject = ( data["project"] === undefined) ? [] : data["project"] ;
        
        
        for( var i=0; i<dataProject.length; i++) {
            
            let objProject = new Project( dataProject[i] );
            this.listProject.push( objProject );
            
        }
        
    }
    
    this.addProject = function( data ) {
    
        let objProject = new Project( data );
        this.listProject.push( objProject );
        
    }
    
    this.getListProject = function() {
        return this.listProject;
    }
    
    
    
}





/*----------------------------*/


export function Category( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
    
}

export function Type( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
    this.color = data["color"] ;
    
}

export function ProjectStatus( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
}

export function JoinStatus( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
}


function Skill( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.codeProject = data["codeProject"] ;
    this.codeSkill = data["codeSkill"] ;
    this.description = data["description"] ;
    this.codeStatusJoin = data["codeStatusJoin"] ;
    this.nameSkill = data["nameSkill"] ;
    
}


function Task( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
    this.codeProject = data["codeProject"] ;
    this.codeProjectSkill = data["codeProjectSkill"] ;
    this.codeStatus = data["codeStatus"] ;
    this.codeUser = data["codeUser"] ;
    this.note = data["note"] ;
    
}

function Member( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.codeUser = data["codeUser"] ;
    this.codeProject = data["codeProject"] ;
    this.codeProjectSkill = data["codeProjectSkill"] ;
    this.message = data["message"] ;
    this.dateRequest = data["dateRequest"] ;
    this.dateJoin = data["dateJoin"] ;
    this.mark = data["mark"] ;
    this.codeStatus = data["codeStatus"] ;
    
    
    
    this.firstName = data["firstName"] ;
    this.lastName = data["lastName"] ;
    this.about = data["about"] ;
    this.imageProfile = data["imageProfile"] ;
    
    this.nameSkill = data["nameSkill"] ;
    
}

export function TaskStatus( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
}
export function MemberStatus( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
}

function ProjectDirect( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.content = data["content"] ;
    this.dateDirect = data["dateDirect"] ;
    this.codeProject = data["codeProject"] ;
    this.codeProjectSkill = data["codeProjectSkill"] ;
    this.codeUser = data["codeUser"] ;
}









