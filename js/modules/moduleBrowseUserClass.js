
import User from './moduleUserClass.js';

import Main from './moduleMain.js';


let mainApp = new Main();


export default class BrowseUser {
    constructor( data ) {
        
        this.fillDataBrowse( data );
    }
    
    
    
    /*=============== ACTION BROWSE ===============*/
    
    searchUser( search , selectFilter , selectCount ) {
        
        const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseUser.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("textSearch" , search );
        formData.append("valueFilter" , selectFilter );
        formData.append("countRow" , selectCount );
        
        return mainApp.send( "POST", pathSearchBrowse , headers, formData );
        
    }
    
    fillterUsers( selectFilter , selectCount ) {
        
        const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseUser.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("valueFilter" , selectFilter );
        formData.append("countRow" , selectCount );
        
        return mainApp.send( "POST", pathSearchBrowse , headers, formData );
        
    }
    
    goToPaginiation( search , selectFilter , selectCount , numberPage ) {
        
        const pathDataBrowse = mainApp.pathDomain + "api/searchBrowseUser.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("valueFilter" , selectFilter );
        formData.append("countRow" , selectCount );
        formData.append("numberPage" , numberPage);
        if(search !== "") { 
            formData.append("textSearch" , search );
        }
        
        return mainApp.send( "POST", pathDataBrowse , headers, formData );
        
    }
    
    
    
    
    /*=============== FILL DATA BROWSE ===============*/
    
    fillDataBrowse( data ) {
        
        this.countUsers = data["countuser"];
        
        this.fillListUser( data );
    }
    
    fillListUser( data ) {
        
        this.listUser = [];
        
        let dataUser = ( data["user"] === undefined) ? [] : data["user"] ;
        
        for( var i=0; i<dataUser.length; i++) {
            this.listUser.push( new User( dataUser[i] ) );
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getCountUsers() {
        return this.countUsers;
    }
    
    getListUser() {
        return this.listUser;
    }
    
    
    
    /*=============== FILL DATA BASIC ===============*/
    
    
}










