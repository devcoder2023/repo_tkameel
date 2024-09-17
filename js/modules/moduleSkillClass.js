



export default class Skill {
    constructor( data ) {
        
        this.id = data["id"];
        this.code = data["code"] ;
        this.name = data["name"];
        this.description = data["description"];
        this.codeCategory = data["codeCategory"];
    }
    
}

export class SkillCategory {
    constructor( data ) {
        
        this.id = data["id"] ;
        this.code = data["code"] ;
        this.name = data["name"] ;
        this.description = data["description"] ;
    }
}

export class SkillLevel {
    constructor( data ) {
        
        this.id = data["id"];
        this.code = data["code"] ;
        this.name = data["name"];
        this.description = data["description"];
    }
}