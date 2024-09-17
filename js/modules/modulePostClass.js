



export default class Post {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.content = data["content"] ;
        this.datePost = data["datePost"] ;
        this.timePost = data["timePost"] ;
        this.codeUser = data["codeUser"] ;
        this.codeProject = data["codeProject"] ;
        this.codeProjectSkill = data["codeProjectSkill"] ;
        
        this.firstName = data["firstName"] ;
        this.lastName = data["lastName"] ;
        this.imageProfile = data["imageProfile"] ;
    }
    
}
