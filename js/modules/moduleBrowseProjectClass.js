
import Project , { ProjectCategory , ProjectType } from './moduleProjectClass.js';

import Main from './moduleMain.js';


let mainApp = new Main();


export default class BrowseProject {
    constructor( data ) {
        
        this.fillDataBasic( data );
        this.fillDataBrowse( data );
    }
    
    
    /*=============== ACTION BROWSE ===============*/
    
    searchProject( search , selectFilter , selectSort , selectType , selectCategory , selectCount ) {
        
        const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseProject.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("textSearch" , search );
        formData.append("valueFilter" , selectFilter );
        formData.append("valueSort" , selectSort );
        formData.append("valueType" , selectType );
        formData.append("valueCategory" , selectCategory );
        formData.append("countRow" , selectCount );
        
        return mainApp.send( "POST", pathSearchBrowse , headers, formData );
        
    }
    
    fillterProjects( selectFilter , selectSort , selectType , selectCategory , selectCount ) {
        
        const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseProject.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("valueFilter" , selectFilter );
        formData.append("valueSort" , selectSort );
        formData.append("valueType" , selectType );
        formData.append("valueCategory" , selectCategory );
        formData.append("countRow" , selectCount );
        
        return mainApp.send( "POST", pathSearchBrowse , headers, formData );
        
    }
    
    goToPaginiation( search , selectFilter , selectSort , selectType , selectCategory , selectCount , numberPage ) {
        
        const pathDataBrowse = mainApp.pathDomain + "api/searchBrowseProject.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("valueFilter" , selectFilter );
        formData.append("valueSort" , selectSort );
        formData.append("valueType" , selectType );
        formData.append("valueCategory" , selectCategory );
        formData.append("countRow" , selectCount );
        formData.append("numberPage" , numberPage);
        if(search !== "") { 
            formData.append("textSearch" , search );
        }
        return mainApp.send( "POST", pathDataBrowse , headers, formData );
        
    }
    
    
    
    
    /*=============== FILL DATA BROWSE ===============*/
    
    fillDataBrowse( data ) {
        
        this.countProjects = data["countproject"];
        
        this.fillListProject( data );
    }
    
    fillListProject( data ) {
        
        this.listProject = [];
        
        let dataProject = ( data["project"] === undefined) ? [] : data["project"] ;
        
        for( var i=0; i<dataProject.length; i++) {
            this.listProject.push( new Project( dataProject[i] ) );
        }
        
    }
    
    
    /*-------- GET LIST --------*/
    
    getCountProjects() {
        return this.countProjects;
    }
    
    getListProject() {
        return this.listProject;
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










