

export default function Skill( data ) {
    
    this.id = data["id"];
    this.code = data["code"] ;
    this.name = data["name"];
    this.description = data["description"];
    this.codeCategory = data["codeCategory"];
    
}

export function SkillCategory( data ) {
    
    this.id = data["id"] ;
    this.code = data["code"] ;
    this.name = data["name"] ;
    this.description = data["description"] ;
    
}

export function SkillLevel( data ) {
    
    this.id = data["id"];
    this.code = data["code"] ;
    this.name = data["name"];
    this.description = data["description"];
    
}


// export function SkillStatus( data ) {
    
//     this.id = data["id"] ;
//     this.code = data["code"] ;
//     this.name = data["name"] ;
//     this.description = data["description"] ;
    
// }

// export const Status = {
//   Enable: 1,
//   NotEnable: 2
// };