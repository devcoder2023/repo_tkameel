

export default class Notification {
    constructor( data ) {
        
        this.id = data["id"];
        this.code = data["code"];
        this.content = data["content"];
        this.datePost = data["datePost"];
        this.timePost = data["timePost"];
        
        this.codeStatus = data["codeStatus"] ;
        this.codeType = data["codeType"];
        this.codeUser = data["codeUser"] ;
        
        this.codeUserNoti = data["codeUserNoti"];
        this.firstName = data["firstName"];
        this.lastName = data["lastName"];
        this.imageProfilUser = data["imageProfileUser"];
        
        this.codeProject = data["codeProject"];
        this.nameProject = data["nameProject"];
        this.imageProfileProject = data["imageProfileProject"];
        
        this.codeTask = data["codeTask"];
        this.nameTask = data["nameTask"];
        this.codeProjectSkill = data["codeProjectSkill"];
        
        this.codeStatusApproveJoin = data["codeStatusApproveJoin"] ;
        this.codeStatusApproveTask = data["codeStatusApproveTask"] ;
        
    }
}

export class NotificationList {
    
    fillListNotification( data ) {
        
        this.listNotification = [];
        this.lastIdNotification = 0;
        
        let dataNotificationFollow = ( data["notificationfollow"] === undefined) ? [] : data["notificationfollow"] ;
        let dataNotificationJoin = ( data["notificationjoin"] === undefined) ? [] : data["notificationjoin"] ;
        
        let dataNotificationAcceptMember = ( data["notificationacceptmember"] === undefined) ? [] : data["notificationacceptmember"] ;
        let dataNotificationRejectMember = ( data["notificationrejectmember"] === undefined) ? [] : data["notificationrejectmember"] ;
        let dataNotificationLeaveMember = ( data["notificationleavemember"] === undefined) ? [] : data["notificationleavemember"] ;
        let dataNotificationTerminateMember = ( data["notificationterminatemember"] === undefined) ? [] : data["notificationterminatemember"] ;
        let dataNotificationEvaluationMember = ( data["notificationevaluationmember"] === undefined) ? [] : data["notificationevaluationmember"] ;
        
        let dataNotificationTakeTask = ( data["notificationtaketask"] === undefined) ? [] : data["notificationtaketask"] ;
        let dataNotificationLeaveTask = ( data["notificationleavetask"] === undefined) ? [] : data["notificationleavetask"] ;
        let dataNotificationDoneTask = ( data["notificationdonetask"] === undefined) ? [] : data["notificationdonetask"] ;
        
        let dataNotificationAcceptTask = ( data["notificationaccepttask"] === undefined) ? [] : data["notificationaccepttask"] ;
        let dataNotificationReturnTask = ( data["notificationreturntask"] === undefined) ? [] : data["notificationreturntask"] ;
        let dataNotificationTerminateTask = ( data["notificationterminatetask"] === undefined) ? [] : data["notificationterminatetask"] ;
        
        let dataNotificationFinishProject = ( data["notificationfinishproject"] === undefined) ? [] : data["notificationfinishproject"] ;
        let dataNotificationCancelProject = ( data["notificationcancelproject"] === undefined) ? [] : data["notificationcancelproject"] ;
        
        
        for( var i=0; i<dataNotificationFollow.length; i++) {
            
            let objNotification = new Notification( dataNotificationFollow[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
            
        }
        for( var i=0; i<dataNotificationJoin.length; i++) {
            
            let objNotification = new Notification( dataNotificationJoin[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
            
        }
        
        
        for( var i=0; i<dataNotificationAcceptMember.length; i++) {
            
            let objNotification = new Notification( dataNotificationAcceptMember[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
            
        }
        for( var i=0; i<dataNotificationRejectMember.length; i++) {
            
            let objNotification = new Notification( dataNotificationRejectMember[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        for( var i=0; i<dataNotificationLeaveMember.length; i++) {
            
            let objNotification = new Notification( dataNotificationLeaveMember[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
            
        }
        for( var i=0; i<dataNotificationTerminateMember.length; i++) {
            
            let objNotification = new Notification( dataNotificationTerminateMember[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        for( var i=0; i<dataNotificationEvaluationMember.length; i++) {
            
            let objNotification = new Notification( dataNotificationEvaluationMember[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        
        
        for( var i=0; i<dataNotificationAcceptTask.length; i++) {
            
            let objNotification = new Notification( dataNotificationAcceptTask[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
            
        }
        for( var i=0; i<dataNotificationReturnTask.length; i++) {
            
            let objNotification = new Notification( dataNotificationReturnTask[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        for( var i=0; i<dataNotificationTerminateTask.length; i++) {
            
            let objNotification = new Notification( dataNotificationTerminateTask[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        
        
        for( var i=0; i<dataNotificationTakeTask.length; i++) {
            
            let objNotification = new Notification( dataNotificationTakeTask[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
            
        }
        for( var i=0; i<dataNotificationLeaveTask.length; i++) {
            
            let objNotification = new Notification( dataNotificationLeaveTask[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        for( var i=0; i<dataNotificationDoneTask.length; i++) {
            
            let objNotification = new Notification( dataNotificationDoneTask[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        
        
        for( var i=0; i<dataNotificationFinishProject.length; i++) {
            
            let objNotification = new Notification( dataNotificationFinishProject[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        for( var i=0; i<dataNotificationCancelProject.length; i++) {
            
            let objNotification = new Notification( dataNotificationCancelProject[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        
        
    }
    
    checkLastNotification( m_ID ) {
        
        if( m_ID > this.lastIdNotification ) {
            
            this.lastIdNotification = m_ID; 
            
        }
        
    }
    
    
    getListNotification() {
        return this.listNotification;
    }
    
    getLastIdNotification() {
        return this.lastIdNotification;
    }
    
    clearLastIdNotification() {
        this.lastIdNotification = 0;
    }
    
}







