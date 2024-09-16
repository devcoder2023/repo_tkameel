


export default function Post( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.content = data["content"] ;
    this.datePost = data["datePost"] ;
    this.timePost = data["timePost"] ;
    this.idUser = data["idUser"] ;
    this.idProject = data["idProject"] ;
    this.idSkill = data["idSkill"] ;
    this.codeUser = data["codeUser"] ;
    this.codeProject = data["codeProject"] ;
    this.codeProjectSkill = data["codeProjectSkill"] ;
    
    this.firstName = data["firstName"] ;
    this.lastName = data["lastName"] ;
    this.imageProfile = data["imageProfile"] ;
    
}

export function PostList() {
    
    
    this.listPost = [];
    
    
    this.fillListPost = function( data ) {
        
        this.listPost = [];
        
        let dataPost = ( data["post"] === undefined) ? [] : data["post"] ;
        
        
        for( var i=0; i<dataPost.length; i++) {
            let objPost = new Post( dataPost[i] );
            this.listPost.push( objPost );
        }
        
    }
    
    this.addPost = function( data ) {
    
        let objPost = new Post( data );
        this.listPost.push( objPost );
        
    }
    
    this.getListPost = function() {
        return this.listPost;
    }
    
    
    
}



