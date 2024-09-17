
import User from './moduleUserClass.js';
import Project from './moduleProjectClass.js';
import Post from './modulePostClass.js';

import Main from './moduleMain.js';


let mainApp = new Main();



export default class Home {
    constructor( data ) {
        this.COUNT_ROW = 5;
        this.fillDataHome( data );
    }
    
    
    /*=============== ACTION FOLLOW ===============*/
    
    followUser( codeUser , codeUserFollow ) {
        
        const pathFollow = mainApp.pathDomain + "api/createFollowUser.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("action", "follow" );
        formData.append("codeUser", codeUser );
        formData.append("codeUserFollow", codeUserFollow );
        
        return mainApp.send( "POST", pathFollow , headers, formData );
    }
    
    refreshFollower() {
        
        const pathDataHomeFriend = mainApp.pathDomain + "api/readDataHomeFriend.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , this.COUNT_ROW );
        
        return mainApp.send("POST", pathDataHomeFriend , headers , formData );
    }
    
    
    
    /*=============== ACTION POST ===============*/
    
    publishPost( content , codeUser ) {
        
        return mainApp.publishPost( "home" , content , codeUser , 0 , 0 );
        
    }
    
    refreshPosts() {
        
        const pathDataPost = mainApp.pathDomain + "api/readDataPosts.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , this.COUNT_ROW );
        formData.append("within" , "home" );
        
        return mainApp.send("POST", pathDataPost , headers , formData );
    }
    
    loadMorePosts( numPage ) {
        
        const pathDataMorePost = mainApp.pathDomain + "api/readDataPostPagination.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , this.COUNT_ROW );
        formData.append("numberPage" , numPage );
        
        return mainApp.send("POST", pathDataMorePost , headers , formData );
    }
    
    
    
    /*=============== FILL DATA PROFILE ===============*/
    
    fillDataHome( data ) {
        
        this.fillListFriends( data );
        this.fillListFollows( data );
        this.fillListSuggestions( data );
        
        this.fillListPost( data );
        
        this.fillListProject( data );
    }
    
    fillUsers( data ) {
        
        this.fillListFriends( data );
        this.fillListFollows( data );
        this.fillListSuggestions( data );
    }
    
    
    fillListFriends( data ) {
        
        this.listFriend = [];
        
        let dataFriends = ( data["userFriends"] === undefined) ? [] : data["userFriends"] ;
        
        for(var i=0; i<dataFriends.length; i++) {
            this.listFriend.push( new User( dataFriends[i] ) );
        }
        
    }
    fillListFollows( data ) {
        
        this.listFollow = [];
        
        let dataFollowers = ( data["userFollowers"] === undefined) ? [] : data["userFollowers"] ;
        
        for(var i=0; i<dataFollowers.length; i++) {
            this.listFollow.push( new User( dataFollowers[i] ) );
        }
        
    }
    fillListSuggestions( data ) {
        
        this.listSuggestions = [];
        
        let dataSuggestions = ( data["userSuggestions"] === undefined) ? [] : data["userSuggestions"] ;
        
        for(var i=0; i<dataSuggestions.length; i++) {
            this.listSuggestions.push( new User( dataSuggestions[i] ) );
        }
        
    }
    
    fillListPost( data ) {
        
        this.listPost = [];
        
        let dataPost = ( data["post"] === undefined) ? [] : data["post"] ;
        
        for( var i=0; i<dataPost.length; i++) {
            this.listPost.push( new Post( dataPost[i] ) );
        }
        
    }
    
    fillListProject( data ) {
        
        this.listProject = [];
        
        let dataProject = ( data["project"] === undefined) ? [] : data["project"] ;
        
        for( var i=0; i<dataProject.length; i++) {
            this.listProject.push( new Project( dataProject[i] ) );
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListFriend() {
        return this.listFriend;
    }
    getListFollow() {
        return this.listFollow;
    }
    getListSuggestion() {
        return this.listSuggestions;
    }
    
    getListPost() {
        return this.listPost;
    }
    
    getListProject() {
        return this.listProject;
    }
    
}















