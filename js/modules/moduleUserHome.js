
import User from './moduleUser.js';

export default User;


export function UserHome( data ) {
    
    this.listFriend = [];
    this.listFollow = [];
    this.listSuggestions = [];
    
    
    let dataFriends = ( data["userFriends"] === undefined) ? [] : data["userFriends"] ;
    let dataFollowers = ( data["userFollowers"] === undefined) ? [] : data["userFollowers"] ;
    let dataSuggestions = ( data["userSuggestions"] === undefined) ? [] : data["userSuggestions"] ;
    
    
    for(var i=0; i<dataFriends.length; i++) {
        this.listFriend.push( new User( dataFriends[i] ) );
    }
    for(var i=0; i<dataFollowers.length; i++) {
        this.listFollow.push( new User( dataFollowers[i] ) );
    }
    for(var i=0; i<dataSuggestions.length; i++) {
        this.listSuggestions.push( new User( dataSuggestions[i] ) );
    }
    
    this.addFriend = function( user ) {
        this.listFriend.push( new User( user ) );
    }
    
    this.fillUsers = function( data ) {
        
        this.listFriend = [];
        this.listFollow = [];
        this.listSuggestions = [];
        
        let dataFriends = ( data["userFriends"] === undefined) ? [] : data["userFriends"] ;
        let dataFollowers = ( data["userFollowers"] === undefined) ? [] : data["userFollowers"] ;
        let dataSuggestions = ( data["userSuggestions"] === undefined) ? [] : data["userSuggestions"] ;
        
        
        for(var i=0; i<dataFriends.length; i++) {
            this.listFriend.push( new User( dataFriends[i] ) );
        }
        for(var i=0; i<dataFollowers.length; i++) {
            this.listFollow.push( new User( dataFollowers[i] ) );
        }
        for(var i=0; i<dataSuggestions.length; i++) {
            this.listSuggestions.push( new User( dataSuggestions[i] ) );
        }
        
    }
    
}









