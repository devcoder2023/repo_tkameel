


export default function Notification( data ) {
    
    this.id = data["id"];
    this.code = data["code"];
    this.content = data["content"];
    this.datePost = data["datePost"];
    this.timePost = data["timePost"];
    
    this.codeStatus = data["codeStatus"] ;
    
    this.typeNotification = data["typeNotification"];
    this.codeUser = data["codeUser"] ;
    
    this.codeUserNoti = data["codeUserNoti"];
    this.firstName = data["firstName"];
    this.lastName = data["lastName"];
    this.imageProfilUser = data["imageProfileUser"];
    
    this.codeProject = data["codeProject"];
    this.nameProject = data["nameProject"];
    this.imageProfileProject = data["imageProfileProject"];
    this.codeProjectSkill = data["codeProjectSkill"];
    this.codeTask = data["codeTask"];
    this.nameTask = data["nameTask"];
    
    this.codeStatusApproveJoin = data["codeStatusApproveJoin"] ;
    this.codeStatusApproveTask = data["codeStatusApproveTask"] ;
    
}

export function NotificationList() {
    
    this.listNotification = [];
    this.lastIdNotification = 0;
    
    
    this.fillListNotification = function( data ) {
        
        this.listNotification = [];
        
        let dataNotificationFollow = ( data["notificationfollow"] === undefined) ? [] : data["notificationfollow"] ;
        let dataNotificationJoin = ( data["notificationjoin"] === undefined) ? [] : data["notificationjoin"] ;
        let dataNotificationJoinTo = ( data["notificationjointo"] === undefined) ? [] : data["notificationjointo"] ;
        let dataNotificationTask = ( data["notificationtask"] === undefined) ? [] : data["notificationtask"] ;
        
        
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
        for( var i=0; i<dataNotificationJoinTo.length; i++) {
            
            let objNotification = new Notification( dataNotificationJoinTo[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
            
        }
        for( var i=0; i<dataNotificationTask.length; i++) {
            
            let objNotification = new Notification( dataNotificationTask[i] );
            this.listNotification.push( objNotification );
            
            this.checkLastNotification( objNotification.id );
        }
        
    }
    
    this.checkLastNotification = function( m_ID ) {
        
        if( m_ID > this.lastIdNotification ) {
            
            this.lastIdNotification = m_ID; 
            
        }
        
    }
    
    this.addNotification = function( data ) {
        
        let objNotification = new Notification( data );
        this.listNotification.push( objNotification );
        
    }
    
    this.getListNotification = function() {
        return this.listNotification;
    }
    
    this.getLastIdNotification = function() {
        return this.lastIdNotification;
    }
    
    this.clearLastIdNotification = function() {
        this.lastIdNotification = 0;
    }
    
    
    
}




/*----------------------------*/

export function MemberStatus( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
}


export const Status = {
  Enable: 1,
  NotEnable: 2
};








