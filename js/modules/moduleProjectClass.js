
import Skill, { SkillCategory } from './moduleSkillClass.js';

import Post from './modulePostClass.js';

import Main from './moduleMain.js';


let mainApp = new Main();


export default class Project {
    constructor( data ) {
        
        this.id = data["id"];
        this.code = data["code"];
        this.name = data["name"];
        this.codeCategory = data["codeCategory"];
        this.codeType = data["codeType"]
        this.description = data["description"];
        this.goals = data["goals"];
        this.dateCreate = data["dateCreate"];
        this.dateExpiry = data["dateExpiry"];
        this.codeUser = data["codeUser"] ;
        this.codeStatus = data["codeStatus"] ;
        this.codeStatusJoin = data["codeStatusJoin"] ;
        this.imageProfile = data["imageProfile"];
        
        this.nameType = data["nameType"];
        this.nameCategory = data["nameCategory"];
        this.totalView = data["totalView"];
        
    }
    
}


export class ProjectFull extends Project {
    constructor( data ) {
        
        let dataproject = ( data["project"] === undefined) ? [] : data["project"][0] ;
        
        super( dataproject );
        
        this.fillAllData( data );
    }
    
    
    
    /*=============== ACTION REFRESH ===============*/
    
    refreshAllData() {
        
        const pathReadProjectSkillsTasks = mainApp.pathDomain + "api/readDataProjectMySkillsAndAll.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        
        return mainApp.send( "POST", pathReadProjectSkillsTasks , headers, formData );
    }
    
    refreshDataTask() {
        
        const pathReadProjectTask = mainApp.pathDomain + "api/readDataProjectMyTask.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        
        return mainApp.send( "POST", pathReadProjectTask , headers, formData );
    }
    refreshDataMember() {
        
        const pathReadProjectMember = mainApp.pathDomain + "api/readDataProjectMyMember.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        
        return mainApp.send( "POST", pathReadProjectMember , headers, formData );
    }
    refreshDataDirect() {
        
        const pathReadProjectDirect = mainApp.pathDomain + "api/readDataProjectMyDirect.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        
        return mainApp.send( "POST", pathReadProjectDirect , headers, formData );
    }
    
    
    
    
    /*=============== FILL DATA PROJECT ===============*/
    
    fillAllData( data ) {
        
        this.fillProjectSkill( data );
        this.fillProjectTask( data );
        this.fillProjectMember( data );
        this.fillProjectDirect( data );
    }
    
    fillProjectSkill( data ) {
        
        this.listProjectSkills = [];
        
        let dataProjectSkill = ( data["projectSkill"] === undefined) ? [] : data["projectSkill"] ;
        
        for( var i=0; i<dataProjectSkill.length; i++) {
            let skill = new ProjectSkill( dataProjectSkill[i] );
            this.listProjectSkills.push( skill );
        }
    }
    fillProjectTask( data ) {
        
        this.listProjectTasks = [];
        
        let dataProjectTask = ( data["projectTask"] === undefined) ? [] : data["projectTask"] ;
        
        for( var i=0; i<dataProjectTask.length; i++) {
            let task = new Task( dataProjectTask[i] );
            this.listProjectTasks.push( task );
        }
    }
    fillProjectMember( data ) {
        
        this.listProjectMembers = [];
        
        let dataProjectMember = ( data["projectMember"] === undefined) ? [] : data["projectMember"] ;
        
        for( var i=0; i<dataProjectMember.length; i++) {
            let member = new Member( dataProjectMember[i] );
            this.listProjectMembers.push( member );
        }
    }
    fillProjectDirect( data ) {
        
        this.listProjectDirects = [];
        
        let dataProjectDirect = ( data["projectDirect"] === undefined) ? [] : data["projectDirect"] ;
        
        for( var i=0; i<dataProjectDirect.length; i++) {
            let direct = new ProjectDirect( dataProjectDirect[i] );
            this.listProjectDirects.push( direct );
        }
    }
    
    
    /*-------- GET LIST --------*/
    
    getListProjectSkill() {
        return this.listProjectSkills;
    }
    getListProjectTask() {
        return this.listProjectTasks;
    }
    getListProjectMember() {
        return this.listProjectMembers;
    }
    getListProjectDirect() {
        return this.listProjectDirects;
    }
    
    
    
    
}

export class ProjectManager extends ProjectFull {
    constructor( data ) {
        super( data );
        
        this.limitCountSkills = 5;
        this.limitCountTasks = 10;
        this.limitCountMembers = 10;
        
        this.fillDataBasic( data );
        this.fillDataManager( data );
    }
    
    
    
    /*=============== ACTION PROJECT ===============*/
    
    updateDataProject( codeUser , action , value ) {
        
        const pathUpdateProject = mainApp.pathDomain + "api/updateProjectData.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("action", action );
        formData.append("value", value );
        formData.append("codeUser", codeUser );
    
        return mainApp.send( "POST", pathUpdateProject , headers, formData );
    }
    
    deleteProject() {
        
        const pathUpdateProject = mainApp.pathDomain + "api/updateProjectData.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("action", "status" );
        formData.append("value", 5 );
        
        return mainApp.send( "POST", pathUpdateProject , headers, formData );
    }
    
    finishProject( form ) {
        
        const pathUpdateProject = mainApp.pathDomain + "api/updateProjectData.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("action", "status" );
        formData.append("value", 3 );
    
        return mainApp.send( "POST", pathUpdateProject , headers, formData );
    }
    
    /*=============== ACTION STATUS ===============*/
    
    updateStatusProjectJoin( codeProjectStatusJoin ) {
        
        const pathUpdateProject = mainApp.pathDomain + "api/updateProjectData.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("action", "statusJoin" );
        formData.append("value", codeProjectStatusJoin );
        
        return mainApp.send( "POST", pathUpdateProject , headers, formData );
    }
    
    updateStatusSkillJoin( codeProjectSkill , codeStatusNew ) {
        
        const pathUpdateProjectSkill = mainApp.pathDomain + "api/updateProjectSkillData.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeProjectSkill", codeProjectSkill );
        formData.append("action", "status" );
        formData.append("value", codeStatusNew );
        
        return mainApp.send( "POST", pathUpdateProjectSkill , headers, formData );
    }
    
    
    
    
    
    
    /*=============== SKILL ===============*/
    
    addSkill( codeSkill , description ) {
        
        const pathCreateSkill = mainApp.pathDomain + "api/createProjectSkill.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeSkill", codeSkill );
        formData.append("description", description );
        
        return mainApp.send( "POST", pathCreateSkill , headers, formData );
        
    }
    
    editSkill( codeProjectSkill , description ) {
        
        const pathUpdateSkill = mainApp.pathDomain + "api/updateProjectSkillData.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeProjectSkill", codeProjectSkill );
        formData.append("action", "description" );
        formData.append("value", description );
        
        return mainApp.send( "POST", pathUpdateSkill , headers, formData );
    }
    
    removeSkill( codeProjectSkill ) {
        
        const pathDeleteSkill = mainApp.pathDomain + "api/deleteProjectSkill.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeProjectSkill", codeProjectSkill );
        
        return mainApp.send( "POST", pathDeleteSkill , headers, formData );
    }
    
    
    /*=============== TASK ===============*/
    addTask( codeProjectSkill , name , description ) {
        
        const pathCreateTask = mainApp.pathDomain + "api/createProjectTask.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeProjectSkill", codeProjectSkill );
        formData.append("name", name );
        formData.append("description", description );
        
        return mainApp.send( "POST", pathCreateTask , headers, formData );
        
    }
    
    editTask( codeTask , name , description ) {
        
        const pathUpdateTask = mainApp.pathDomain + "api/updateProjectTaskData.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("name", name );
        formData.append("description", description );
        
        return mainApp.send( "POST", pathUpdateTask , headers, formData );
        
    }
    
    removeTask( codeTask ) {
        
        const pathDeleteTask = mainApp.pathDomain + "api/deleteProjectTask.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeProjectTask", codeTask );
        
        return mainApp.send( "POST", pathDeleteTask , headers, formData );
        
    }
    
    
    /*=============== DIRECT ===============*/
    
    addDirect( content , codeProjectSkill ) {
        
        const pathCreateDirect= mainApp.pathDomain + "api/createProjectDirect.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("content", content );
        formData.append("codeProjectSkill", codeProjectSkill );
        
        return mainApp.send( "POST", pathCreateDirect , headers, formData );
    }
    
    editDirect( codeDirect , content , codeProjectSkill ) {
        
        const pathUpdateDirect = mainApp.pathDomain + "api/updateProjectDirect.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeDirect", codeDirect );
        formData.append("content", content );
        formData.append("codeProjectSkill", codeProjectSkill );
        
        return mainApp.send( "POST", pathUpdateDirect , headers, formData );
    }
    
    removeDirect( codeDirect ) {
        
        const pathDeleteDirect = mainApp.pathDomain + "api/deleteProjectDirect.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeDirect", codeDirect );
        
        return mainApp.send( "POST", pathDeleteDirect , headers, formData );
    }
    
    
    /*=============== ACTION MEMBER ===============*/
    
    acceptMember( codeMember ) {
        
        const pathUpdateMemberStatus = mainApp.pathDomain + "api/updateMemberStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeMember", codeMember );
        formData.append("codeStatus", this.getEnumStatusMember().Candidate );
        
        return mainApp.send( "POST", pathUpdateMemberStatus , headers, formData );
    }
    
    rejectMember( codeMember , codeUser ) {
        
        const pathUpdateMemberStatus = mainApp.pathDomain + "api/updateMemberStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeUserMember", codeUser );
        formData.append("codeMember", codeMember );
        formData.append("codeStatus", this.getEnumStatusMember().Rejected );
        
        return mainApp.send( "POST", pathUpdateMemberStatus , headers, formData );
    }
    
    ignoreMember( codeMember ) {
        
        const pathUpdateMemberStatus = mainApp.pathDomain + "api/updateMemberStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeMember", codeMember );
        formData.append("codeStatus", this.getEnumStatusMember().Ignored );
        
        return mainApp.send( "POST", pathUpdateMemberStatus , headers, formData );
    }
    
    acceptMemberFilter( codeMember , codeUser ) {
        
        const pathUpdateMemberStatus = mainApp.pathDomain + "api/updateMemberStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeUserMember", codeUser );
        formData.append("codeMember", codeMember );
        formData.append("codeStatus", this.getEnumStatusMember().Accepted );
        
        return mainApp.send( "POST", pathUpdateMemberStatus , headers, formData );
    }
    
    terminateMember( codeMember , codeUser ) {
        
        const pathUpdateMemberStatus = mainApp.pathDomain + "api/updateMemberStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeUserMember", codeUser );
        formData.append("codeMember", codeMember );
        formData.append("codeStatus", this.getEnumStatusMember().Terminate );
        
        return mainApp.send( "POST", pathUpdateMemberStatus , headers, formData );
    }
    
    
    evaluationMember( codeUser , codeMember , numberStar ) {
        
        const pathUpdateMemberMark = mainApp.pathDomain + "api/updateMemberMark.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeMember", codeMember );
        formData.append("codeUserMember", codeUser );
        formData.append("mark", numberStar );
        
        return mainApp.send( "POST", pathUpdateMemberMark , headers, formData );
    }
    
    
    
    /*=============== ACTION TASK ===============*/
    
    acceptTask( codeTask , codeUserTask ) {
        
        const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("codeUserTask", codeUserTask );
        formData.append("codeStatus", this.getEnumStatusTask().Delivered );
        
        return mainApp.send( "POST", pathUpdateTaskStatus , headers, formData );
    }
    
    leaveTask( codeTask , codeUserTask ) {
        
        const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("codeUserTask", codeUserTask );
        formData.append("codeStatus", this.getEnumStatusTask().New );
        
        return mainApp.send( "POST", pathUpdateTaskStatus , headers, formData );
    }
    
    returnTask( codeTask , codeUserTask , note ) {
        
        const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("codeUserTask", codeUserTask );
        formData.append("codeStatus", this.getEnumStatusTask().WaitingModification );
        formData.append("note", note );
        
        return mainApp.send( "POST", pathUpdateTaskStatus , headers, formData );
    }
    
    updateNoteTask( codeTask , codeUserTask , note ) {
        
        const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("codeStatus", this.getEnumStatusTask().WaitingModification );
        formData.append("note", note );
        
        return mainApp.send( "POST", pathUpdateTaskStatus , headers, formData );
    }
    
    
    
    
    /*=============== FILL DATA MANAGER ===============*/
    
    fillDataManager( data ) {
        
        this.fillDataManagerDashboard( data );
    }
    
    fillDataManagerDashboard( data ) {
        
        this.fillCountStatusTask( data );
        this.fillCountMemberSkill( data );
        this.fillCountMemberSkillJoin( data );
        this.fillCountMemberAndTaskForSkill( data );
    }
    
    fillDataManagerDashboardMember( data ) {
        
        this.fillCountMemberSkillJoin( data );
        this.fillCountMemberAndTaskForSkill( data );
    }
    
    fillDataManagerDashboardTask( data ) {
        
        this.fillCountStatusTask( data );
        this.fillCountMemberAndTaskForSkill( data );
    }
    
    
    fillCountStatusTask( data ) {
        
        this.countAllStatus = 0;
        this.countWorkingStatus = 0;
        this.countDoneStatus = 0;
        
        let objCountTaskStatus = data["countTaskStatus"];
        
        objCountTaskStatus.forEach( (item) => {
            
            this.countAllStatus += item.countTask;
            
            if( item.codeStatus == this.getEnumStatusTask().Delivered ) {
                
                this.countDoneStatus += item.countTask;
                this.countWorkingStatus += item.countTask;
                
            } else if( item.codeStatus == this.getEnumStatusTask().Underway || item.codeStatus == this.getEnumStatusTask().WaitingApproval || item.codeStatus == this.getEnumStatusTask().WaitingModification ) {
                
                this.countWorkingStatus += item.countTask;
                
            } else {
                
            }
            
        });
        
    }
    fillCountMemberSkill( data ) {
        
        let objCountMemberSkill = data["countMemberSkill"];
        
        this.mapMembers = new Map();
        this.totalMembers = 0;
        
        objCountMemberSkill.forEach( (item) => {
            
            this.totalMembers += item.countMember;
            
            this.mapMembers.set( item.codeProjectSkill , item.countMember );
            
        });
        
    }
    fillCountMemberSkillJoin( data ) {
        
        let objCountMemberSkillJoin = data["countMemberSkillJoin"];
        
        this.mapMembersJoin = new Map();
        this.totalMembersJoin = 0;
        
        objCountMemberSkillJoin.forEach( (item) => {
            
            this.totalMembersJoin += item.countMember;
            
            this.mapMembersJoin.set( item.codeProjectSkill , item.countMember );
            
        });
        
    }
    fillCountMemberAndTaskForSkill( data ) {
        
        this.listInfoSkill = [];
        
        let objCountInfoSkill = data["countInfoSkill"];
        
        objCountInfoSkill.forEach( (item) => {
            
            this.listInfoSkill.push( item );
            
            const codeProjectSkill = item.code;
            
            // Task
            for( let j=0; j<this.listProjectSkills.length; j++) {
                
                const _codeProjectSkill = this.listProjectSkills[j].code;
                
                if( codeProjectSkill == _codeProjectSkill ) {
                    
                    this.listProjectSkills[j].countTask = item.countTask ;
                    break;
                    
                }
                
            }
            
            // Member
            for( let j=0; j<this.listProjectSkills.length; j++) {
                
                const _codeProjectSkill = this.listProjectSkills[j].code;
                
                if( codeProjectSkill == _codeProjectSkill ) {
                    
                    this.listProjectSkills[j].countMember = item.countMember ;
                    break;
                    
                }
                
            }
            
        });
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListCountStatus() {
        return [ this.countAllStatus , this.countWorkingStatus , this.countDoneStatus ];
    }
    getListCountMember() {
        return [ this.totalMembers , this.mapMembers ];
    }
    getListCountMemberJoin() {
        return [ this.totalMembersJoin , this.mapMembersJoin ];
    }
    getListCountInfoSkill() {
        return this.listInfoSkill;
    }
    
    
    
    
    /*=============== FILL DATA BASIC ===============*/
    
    fillDataBasic( data ) {
        
        this.listProjectCategory = [];
        this.listProjectType = [];
        this.listProjectStatus = [];
        this.listJoinStatus = [];
        
        this.listSkill = [];
        this.listSkillCategory = [];
        this.listTaskStatus = [];
        this.listMemberStatus = [];
        
        this.enumStatusJoin = {};
        this.enumStatusTask = {};
        this.enumStatusMember = {};
        
        const dataProjectCategory = ( data["projectCategory"] === undefined) ? [] : data["projectCategory"] ;
        const dataProjectType = ( data["projectType"] === undefined) ? [] : data["projectType"] ;
        const dataProjectStatus = ( data["projectStatus"] === undefined) ? [] : data["projectStatus"] ;
        const dataJoinStatus = ( data["joinStatus"] === undefined) ? [] : data["joinStatus"] ;
        
        const dataSkill = ( data["skill"] === undefined) ? [] : data["skill"] ;
        const dataSkillCategory = ( data["skillCategory"] === undefined) ? [] : data["skillCategory"] ;
        const dataTaskStatus = ( data["taskStatus"] === undefined) ? [] : data["taskStatus"] ;
        const dataMemberStatus = ( data["memberStatus"] === undefined) ? [] : data["memberStatus"] ;
        
        
        for(var i=0; i<dataProjectCategory.length; i++) {
            this.listProjectCategory.push( new ProjectCategory( dataProjectCategory[i] ) );
        }
        
        for(var i=0; i<dataProjectType.length; i++) {
            this.listProjectType.push( new ProjectType( dataProjectType[i] ) );
        }
        
        for(var i=0; i<dataProjectStatus.length; i++) {
            this.listProjectStatus.push( new ProjectStatus( dataProjectStatus[i] ) );
        }
        
        for(var i=0; i<dataJoinStatus.length; i++) {
            this.listJoinStatus.push( new JoinStatus( dataJoinStatus[i] ) );
            this.enumStatusJoin[ this.listJoinStatus[this.listJoinStatus.length-1].description ] = this.listJoinStatus[this.listJoinStatus.length-1].code;
        }
        
        
        for(var i=0; i<dataSkill.length; i++) {
            this.listSkill.push( new Skill( dataSkill[i] ) );
        }
        
        
        for(var i=0; i<dataSkillCategory.length; i++) {
            this.listSkillCategory.push( new SkillCategory( dataSkillCategory[i] ) );
        }
        
        for(var i=0; i<dataTaskStatus.length; i++) {
            this.listTaskStatus.push( new TaskStatus( dataTaskStatus[i] ) );
            this.enumStatusTask[ this.listTaskStatus[this.listTaskStatus.length-1].description ] = this.listTaskStatus[this.listTaskStatus.length-1].code;
        }
        
        for(var i=0; i<dataMemberStatus.length; i++) {
            this.listMemberStatus.push( new MemberStatus( dataMemberStatus[i] ) );
            this.enumStatusMember[ this.listMemberStatus[this.listMemberStatus.length-1].description ] = this.listMemberStatus[this.listMemberStatus.length-1].code;
        }
        
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListProjectCategory() {
        return this.listProjectCategory;
    }
    getListProjectType() {
        return this.listProjectType;
    }
    getListProjectStatus() {
        return this.listProjectStatus;
    }
    getListProjectJoinStatus() {
        return this.listJoinStatus;
    }
    
    getListSkill() {
        return this.listSkill;
    }
    getListSkillCategory() {
        return this.listSkillCategory;
    }
    getListTaskStatus() {
        return this.listTaskStatus;
    }
    getListMemberStatus() {
        return this.listMemberStatus;
    }
    
    
    /*-------- GET LIST ENUM --------*/
    
    getEnumStatusJoin() {
        return this.enumStatusJoin;
    }
    getEnumStatusTask() {
        return this.enumStatusTask;
    }
    getEnumStatusMember() {
        return this.enumStatusMember;
    }
    
    getNameEnumStatusJoin( indx ) {
        
        for(var i=0; i<this.listJoinStatus.length; i++) {
            if( this.listJoinStatus[i].code == indx ) {
                return this.listJoinStatus[i].name;
            }
        }
        return null;
    }
    getNameEnumStatusTask( indx ) {
        
        for(var i=0; i<this.listTaskStatus.length; i++) {
            if( this.listTaskStatus[i].code == indx ) {
                return this.listTaskStatus[i].name;
            }
        }
        return null;
    }
    getNameEnumStatusMember( indx ) {
        
        for(var i=0; i<this.listMemberStatus.length; i++) {
            if( this.listMemberStatus[i].code == indx ) {
                return this.listMemberStatus[i].name;
            }
        }
        return null;
    }
    
    /*-------- GET NAME --------*/
    
    getNameGategory( codeCategory ) {
        for(var i=0; i<this.getListProjectCategory().length; ++i) {
            
            const codeCat = this.getListProjectCategory()[0].code;
            if( codeCat == codeCategory ) {
                return this.getListProjectCategory()[0].name;
            }
        }
        
        return null;
    }
    getNameType( codeType ) {
        for(var i=0; i<this.getListProjectType().length; ++i) {
            
            const codeTyp = this.getListProjectType()[0].code;
            if( codeTyp == codeType ) {
                return this.getListProjectType()[0].name;
            }
        }
        
        return null;
    }
    
    
    
}

export class ProjectTeam extends ProjectFull {
    constructor( data ) {
        super( data );
        
        this.COUNT_ROW = 5;
        
        this.fillDataBasic( data );
        this.fillDataTeam( data );
    }
    
    
    
    /*=============== ACTION PROJECT ===============*/
    
    leaveProject() {
        
        const pathLeaveProject = mainApp.pathDomain + "api/exitMember.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeUserProject", this.codeUser );
        
        return mainApp.send( "POST", pathLeaveProject , headers, formData );
    }
    
    
    
    /*=============== ACTION TASK ===============*/
    
    takeTask( codeTask ) {
        
        const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("codeUserProject", this.codeUser );
        formData.append("codeStatus", this.getEnumStatusTask().Underway );
        
        return mainApp.send( "POST", pathUpdateTaskStatus , headers, formData );
    }
    
    leaveTask( codeTask ) {
        
        const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("codeUserProject", this.codeUser );
        formData.append("codeStatus", this.getEnumStatusTask().New );
        
        return mainApp.send( "POST", pathUpdateTaskStatus , headers, formData );
    }
    
    doneTask( codeTask ) {
        
        const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeTask", codeTask );
        formData.append("codeUserProject", this.codeUser );
        formData.append("codeStatus", this.getEnumStatusTask().WaitingApproval );
        
        return mainApp.send( "POST", pathUpdateTaskStatus , headers, formData );
    }
    
    
    
    
    /*=============== ACTION POST ===============*/
    
    publishPost( content , codeUser ) {
        
        return mainApp.publishPost( "work" , content , codeUser , this.code , this.listProjectSkills[0].code );
        
    }
    
    refreshPosts() {
        
        const pathDataPost = mainApp.pathDomain + "api/readDataPosts.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , this.COUNT_ROW );
        formData.append("within" , "work" );
        formData.append("codeProject", this.code );
        formData.append("codeProjectSkill", this.listProjectSkills[0].code );
        
        return mainApp.send("POST", pathDataPost , headers , formData );
    }
    
    loadMorePosts( numPage ) {
        
        const pathDataMorePost = mainApp.pathDomain + "api/readDataPostPagination.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , this.COUNT_ROW );
        formData.append("within" , "work" );
        formData.append("codeProject" , this.code );
        formData.append("codeProjectSkill" , this.listProjectSkills[0].code );
        formData.append("numberPage" , numPage );
        
        return mainApp.send("POST", pathDataMorePost , headers , formData );
    }
    
    
    
    
    /*=============== ACTION REFRESH ===============*/
    
    refreshDataTask() {
        
        const pathReadProjectSkillsTasks = mainApp.pathDomain + "api/readDataProjectWorkTask.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeProjectSkill", this.listProjectSkills[0].code );
        
        return mainApp.send("POST", pathReadProjectSkillsTasks , headers , formData );
    }
    
    
    
    /*=============== FILL DATA TEAM ===============*/
    
    fillDataTeam( data ) {
        
        this.fillDataTeamDashboardTask( data );
        this.fillListPost( data );
    }
    
    fillDataTeamDashboardTask( data ) {
        
        this.fillCountStatusTask( data );
    }
    
    
    fillCountStatusTask( data ) {
        
        this.countAllStatus = 0;
        this.countWorkingStatus = 0;
        this.countDoneStatus = 0;
        
        let objCountTaskStatus = data["countTaskStatus"];
        
        objCountTaskStatus.forEach( (item) => {
            
            this.countAllStatus += item.countTask;
            
            if( item.codeStatus == this.getEnumStatusTask().Delivered ) {
                
                this.countDoneStatus += item.countTask;
                this.countWorkingStatus += item.countTask;
                
            } else if( item.codeStatus == this.getEnumStatusTask().Underway || item.codeStatus == this.getEnumStatusTask().WaitingApproval || item.codeStatus == this.getEnumStatusTask().WaitingModification ) {
                
                this.countWorkingStatus += item.countTask;
                
            } else {
                
            }
            
        });
        
    }
    
    fillListPost( data ) {
        
        this.listPost = [];
        
        let dataPost = ( data["post"] === undefined) ? [] : data["post"] ;
        
        for( var i=0; i<dataPost.length; i++) {
            this.listPost.push( new Post( dataPost[i] ) );
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListCountStatus() {
        return [ this.countAllStatus , this.countWorkingStatus , this.countDoneStatus ];
    }
    
    getListPost() {
        return this.listPost;
    }
    
    
    
    
    /*=============== FILL DATA BASIC ===============*/
    
    fillDataBasic( data ) {
        
        this.listTaskStatus = [];
        this.enumStatusTask = {};
        
        const dataTaskStatus = ( data["taskStatus"] === undefined) ? [] : data["taskStatus"] ;
        
        for(var i=0; i<dataTaskStatus.length; i++) {
            this.listTaskStatus.push( new TaskStatus( dataTaskStatus[i] ) );
            this.enumStatusTask[ this.listTaskStatus[this.listTaskStatus.length-1].description ] = this.listTaskStatus[this.listTaskStatus.length-1].code;
        }
        
    }
    
    getListTaskStatus() {
        return this.listTaskStatus;
    }
    getEnumStatusTask() {
        return this.enumStatusTask;
    }
    getNameEnumStatusTask( indx ) {
        
        for(var i=0; i<this.listTaskStatus.length; i++) {
            if( this.listTaskStatus[i].code == indx ) {
                return this.listTaskStatus[i].name;
            }
        }
        return null;
    }
    
    
    
}

export class ProjectLive extends ProjectFull {
    constructor( data ) {
        super( data );
        
        this.COUNT_ROW = 5;
        
        this.fillDataBasic( data );
        this.fillDataLive( data );
    }
    
    
    /*=============== ACTION PROJECT ===============*/
    
    leaveProject() {
        
        const pathLeaveProject = mainApp.pathDomain + "api/exitMember.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        
        return mainApp.send( "POST", pathLeaveProject , headers, formData );
    }
    
    
    
    
    /*=============== ACTION POST ===============*/
    
    publishPost( content , codeUser ) {
        
        return mainApp.publishPost( "live" , content , codeUser , this.code , 0 );
        
    }
    
    refreshPosts() {
        
        const pathDataPost = mainApp.pathDomain + "api/readDataPosts.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , this.COUNT_ROW );
        formData.append("within" , "live" );
        formData.append("codeProject", this.code );
        
        return mainApp.send("POST", pathDataPost , headers , formData );
    }
    
    loadMorePosts( numPage ) {
        
        const pathDataMorePost = mainApp.pathDomain + "api/readDataPostPagination.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , this.COUNT_ROW );
        formData.append("within" , "live" );
        formData.append("codeProject" , this.code );
        formData.append("numberPage" , numPage );
        
        return mainApp.send("POST", pathDataMorePost , headers , formData );
    }
    
    
    
    
    /*=============== FILL DATA LIVE ===============*/
    
    fillDataLive( data ) {
        
        this.fillDataLiveDashboardTask( data );
        this.fillListPost( data );
    }
    
    fillDataLiveDashboardTask( data ) {
        
        this.fillCountStatusTask( data );
    }
    
    
    fillCountStatusTask( data ) {
        
        this.countAllStatus = 0;
        this.countWorkingStatus = 0;
        this.countDoneStatus = 0;
        
        let objCountTaskStatus = data["countTaskStatus"];
        
        objCountTaskStatus.forEach( (item) => {
            
            this.countAllStatus += item.countTask;
            
            if( item.codeStatus == this.getEnumStatusTask().Delivered ) {
                
                this.countDoneStatus += item.countTask;
                this.countWorkingStatus += item.countTask;
                
            } else if( item.codeStatus == this.getEnumStatusTask().Underway || item.codeStatus == this.getEnumStatusTask().WaitingApproval || item.codeStatus == this.getEnumStatusTask().WaitingModification ) {
                
                this.countWorkingStatus += item.countTask;
                
            } else {
                
            }
            
        });
        
    }
    
    fillListPost( data ) {
        
        this.listPost = [];
        
        let dataPost = ( data["post"] === undefined) ? [] : data["post"] ;
        
        for( var i=0; i<dataPost.length; i++) {
            this.listPost.push( new Post( dataPost[i] ) );
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListCountStatus() {
        return [ this.countAllStatus , this.countWorkingStatus , this.countDoneStatus ];
    }
    
    getListPost() {
        return this.listPost;
    }
    
    
    
    /*=============== FILL DATA BASIC ===============*/
    
    fillDataBasic( data ) {
        
        this.listTaskStatus = [];
        this.enumStatusTask = {};
        
        const dataTaskStatus = ( data["taskStatus"] === undefined) ? [] : data["taskStatus"] ;
        
        for(var i=0; i<dataTaskStatus.length; i++) {
            this.listTaskStatus.push( new TaskStatus( dataTaskStatus[i] ) );
            this.enumStatusTask[ this.listTaskStatus[this.listTaskStatus.length-1].description ] = this.listTaskStatus[this.listTaskStatus.length-1].code;
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListTaskStatus() {
        return this.listTaskStatus;
    }
    getEnumStatusTask() {
        return this.enumStatusTask;
    }
    getNameEnumStatusTask( indx ) {
        
        for(var i=0; i<this.listTaskStatus.length; i++) {
            if( this.listTaskStatus[i].code == indx ) {
                return this.listTaskStatus[i].name;
            }
        }
        return null;
    }
    
    
    
}

export class ProjectShow extends ProjectFull {
    constructor( data ) {
        super( data );
        
        this.fillDataBasic( data );
        this.fillDataShow( data );
    }
    
    
    /*=============== ACTION PROJECT ===============*/
    
    requestJoin( codeProjectSkill , content ) {
        
        const pathJoinMemberSkill = mainApp.pathDomain + "api/createJoinMember.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeProject", this.code );
        formData.append("codeUserProject", this.codeUser );
        formData.append("message", content );
        formData.append("codeProjectSkill", codeProjectSkill );
        
        return mainApp.send( "POST", pathJoinMemberSkill , headers, formData );
    }
    
    
    
    
    /*=============== FILL DATA SHOW ===============*/
    
    fillDataShow( data ) {
        
        this.setIsMember( data );
    }
    
    setIsMember( data ) {
        this._isMember = data["project"][0]["isMember"];
    }
    
    isMember() {
        return this._isMember;
    }
    
    
    
    /*=============== FILL DATA BASIC ===============*/
    
    fillDataBasic( data ) {
        
        this.listJoinStatus = [];
        this.enumJoinStatus = {};
        
        const dataJoinStatus = ( data["joinStatus"] === undefined) ? [] : data["joinStatus"] ;
        
        
        for(var i=0; i<dataJoinStatus.length; i++) {
            this.listJoinStatus.push( new JoinStatus( dataJoinStatus[i] ) );
            this.enumJoinStatus[ this.listJoinStatus[this.listJoinStatus.length-1].description ] = this.listJoinStatus[this.listJoinStatus.length-1].code;
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListJoinStatus() {
        return this.listJoinStatus;
    }
    getEnumStatusJoin() {
        return this.enumJoinStatus;
    }
    getNameEnumStatusJoin( indx ) {
        
        for(var i=0; i<this.listJoinStatus.length; i++) {
            if( this.listJoinStatus[i].code == indx ) {
                return this.listJoinStatus[i].name;
            }
        }
        return null;
    }
    
    
    
    
}



/*----------------------------*/


export class ProjectCategory {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.name = data["name"] ;
        this.description = data["description"] ;
    }
}

export class ProjectType {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.name = data["name"] ;
        this.description = data["description"] ;
        this.color = data["color"] ;
    }
}

export class ProjectStatus {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.name = data["name"] ;
        this.description = data["description"] ;
    }
}

export class JoinStatus {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.name = data["name"] ;
        this.description = data["description"] ;
    }
}


export class ProjectSkill {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.codeProject = data["codeProject"] ;
        this.codeSkill = data["codeSkill"] ;
        this.description = data["description"] ;
        this.codeStatusJoin = data["codeStatusJoin"] ;
        this.nameSkill = data["nameSkill"] ;
        
        this.countTask = 0;
        this.countMember = 0;
    }
}


export class Task {
    constructor( data ) {
        
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
}

export class Member {
    constructor( data ) {
        
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
}

export class TaskStatus {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.name = data["name"] ;
        this.description = data["description"] ;
    }
}

export class MemberStatus {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.name = data["name"] ;
        this.description = data["description"] ;
    }
}

export class ProjectDirect {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.content = data["content"] ;
        this.dateDirect = data["dateDirect"] ;
        this.codeProject = data["codeProject"] ;
        this.codeProjectSkill = data["codeProjectSkill"] ;
        this.codeUser = data["codeUser"] ;
        this.nameSkill = data["nameSkill"];
    }
}























