

import Project from './moduleProjectClass.js';

import Main from './moduleMain.js';


let mainApp = new Main();


export default class MyActivities {
    constructor( data ) {
        
        this.fillDataMyActivities( data );
    }
    
    
    
    /*=============== FILL DATA MY ACTIVITIES ===============*/
    
    fillDataMyActivities( data ) {
        
        this.countTaskWorking = data["countTaskWorking"];
        
        this.fillProfileProjectMy( data );
        this.fillProfileProjectJoin( data );
    }
    
    fillProfileProjectMy( data ) {
        
        this.listProjectMy = [];
        
        let dataProject = ( data["project"] === undefined) ? [] : data["project"] ;
        
        for( var i=0; i<dataProject.length; i++) {
            this.listProjectMy.push( new Project( dataProject[i] ) );
        }
        
    }
    fillProfileProjectJoin( data ) {
        
        this.listProjectJoin = [];
        
        let dataProject = ( data["projectJoin"] === undefined) ? [] : data["projectJoin"] ;
        
        for( var i=0; i<dataProject.length; i++) {
            this.listProjectJoin.push( new Project( dataProject[i] ) );
        }
    }
    
    
    /*-------- GET LIST --------*/
    
    getListProjectMy() {
        return this.listProjectMy;
    }
    getListProjectJoin() {
        return this.listProjectJoin;
    }
    
    getthisCountTaskWorking() {
        return this.countTaskWorking;
    }
    
}