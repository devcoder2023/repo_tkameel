
import { ProjectCategory , ProjectType } from './moduleProjectClass.js';

import Main from './moduleMain.js';


let mainApp = new Main();


export default class NewProject {
    constructor( data ) {
        
        this.fillDataBasic( data );
    }
    
    
    /*=============== ACTION NEW ===============*/
    
    createProject( codeUser , name , codeCategory , codeType , description , goals , img ) {
        
        const pathCreateProject = mainApp.pathDomain + "api/createProject.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", codeUser );
        formData.append("name", name );
        formData.append("codeCategory", codeCategory );
        formData.append("codeType", codeType );
        formData.append("description", description );
        formData.append("goals", goals );
        formData.append("imageProfile", img );
        
        return mainApp.send( "POST", pathCreateProject , headers, formData );
        
    }
    
    /*=============== FILL DATA BASIC ===============*/
    
    fillDataBasic( data ) {
        
        this.listProjectCategory = [];
        this.listProjectType = [];
        
        
        let dataProjectCategory = ( data["projectCategory"] === undefined) ? [] : data["projectCategory"] ;
        let dataProjectType = ( data["projectType"] === undefined) ? [] : data["projectType"] ;
        
        
        for(var i=0; i<dataProjectCategory.length; i++) {
            this.listProjectCategory.push( new ProjectCategory( dataProjectCategory[i] ) );
        }
        
        for(var i=0; i<dataProjectType.length; i++) {
            this.listProjectType.push( new ProjectType( dataProjectType[i] ) );
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getListProjectCategory() {
        return this.listProjectCategory;
    }
    
    getListProjectType() {
        return this.listProjectType;
    }
}