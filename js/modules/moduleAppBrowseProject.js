import * as moduleUserLog from './moduleUserLog.js';

import Project , { ProjectList , Category , Type } from './moduleProject.js';
import Main from './moduleMain.js';


let mainApp = new Main();
let myProjectList = null;


const COUNTS_ROW = 10;
let countProject = 0;





export function initApp( data ) {
    
    init_User();
    
    init_pageBrowseProject();
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    document.getElementById('buttonSearch').addEventListener("click" , searchProjects );
    
    document.getElementById('selectFilter').addEventListener("change" , fillterProjects);
    document.getElementById('selectSort').addEventListener("change" , fillterProjects);
    document.getElementById('selectType').addEventListener("change" , fillterProjects);
    document.getElementById('selectCategory').addEventListener("change" , fillterProjects);
    
    document.getElementById('selectCount').addEventListener("change" , () => { buildPaginiation( countProject ); });
}


function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_pageBrowseProject() {
    
    const pathDataBrowse = mainApp.pathDomain + "api/readDataBrowseProject.php";
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNTS_ROW);
    
    mainApp.send("POST", pathDataBrowse , headers , formData ).then( ( result ) => {
        
        myProjectList = new ProjectList();
        myProjectList.fillListProject( result );
        
        return result;
        
    }).then( (result) => {
        
        countProject = result["countproject"];
        buildPaginiation( countProject );
        fillProjects();
        
        fillListData( result );
        
        mainApp.callNotification();
        
    } ).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            const msg = "خطأ في التحقق من هوية المستخدم !";
            mainApp.codeWraning( msg , "login" );
            
        } else if( codeError == 430 ) {
            
            const msg = "خطأ لا يوجد بيانات لعرضها ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else {
            
            const msg = "خطأ غير معروف !";
            mainApp.codeWraning( msg , "home" );
            
        }
        
    });
    
}


function clickMenu() {
    
    mainApp.clickMenu();
    
}

function clickMenuNotification() {
    
    mainApp.clickNotification();
    
}






function fillProjects() {
    
    let containerList = document.getElementById("containerList");
    containerList.innerHTML = "";
    
    
    const listProjects = myProjectList.getListProject();

    for(var i=0; i<listProjects.length; i++) {
            
            let code = listProjects[i].code;
            let codeUser = listProjects[i].codeUser;
            let name = listProjects[i].name;
            let nameCategory = listProjects[i].nameCategory;
            let description = listProjects[i].description;
            let imageProfile = listProjects[i].imageProfile;
            let totalView = listProjects[i].totalView;
            
            if( totalView == null ) {
                totalView = 0;
            }
            
            let urlImage = mainApp.checkUrlImageProject( imageProfile );
            
            
            
            let buttonShowProject = "buttonShowProject"+i;
            
            let cardProject = `
        
                <div class="card cardProject">
                    <div class="header">
                        <img src="${urlImage}">
                    </div>
                    <div class="body">
                        <div class="bodyheader">
                            <h3>${name}</h3>
                            <div class="bodyheadercat">
                                <h5>${nameCategory}</h5>
                            </div>
                        </div>
                        <div class="bodybody">
                            <p>${description}</p>
                        </div>
                    </div>
                    <div class="footer">
                    
                        <div class="views">
                            
                            <div class="viewscount">${totalView}</div>
                            
                            <div id="" class="divsvg small notButtton">
                                <svg class="svgfill">
                                    <use xlink:href="#svgviews"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div id="${buttonShowProject}" class="divsvg move">
                            <svg class="svgstroke">
                                <use xlink:href="#svgmoving"/>
                            </svg>
                        </div>
                        
                    </div>
                </div>
            `;
            
            
            containerList.insertAdjacentHTML("beforeend", cardProject);
            
            document.getElementById( buttonShowProject ).addEventListener("click" , function() {
                
                mainApp.goToProject( moduleUserLog.getUser().userCode , code , codeUser );
                
            });
            
    }
    
    
}

function buildPaginiation( countProjects ) {
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    var selectCount = document.getElementById("selectCount").value;
    
    const pages = Math.ceil( countProjects/selectCount );
    
    for(var i=0; i<pages; i++) {
        
        const numberPage = i+1;
        const nameItem = "itemPaginiation"+i;
        const code =`<div id='${nameItem}' class='itemPaginiation'>${numberPage}</div>`;
        
        widgetFooter.insertAdjacentHTML("beforeend", code);
        
        document.getElementById( nameItem ).addEventListener("click" , function() {
            
            goToPaginiation( numberPage );
            
        });
        
    }
    
    
    
    
    
    
}

function goToPaginiation( numberPage ) {
    
    
    const pathDataBrowse = mainApp.pathDomain + "api/searchBrowseProject.php";
    
    var search = document.getElementById("inputSearch").value;
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectSort = document.getElementById("selectSort").value;
    var selectType = document.getElementById("selectType").value;
    var selectCategory = document.getElementById("selectCategory").value;
    var selectCount = document.getElementById("selectCount").value;
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("valueFilter" , selectFilter );
    formData.append("valueSort" , selectSort );
    formData.append("valueType" , selectType );
    formData.append("valueCategory" , selectCategory );
    formData.append("countRow" , selectCount );
    formData.append("numberPage" , numberPage-1);
    
    if(search !== "") {
        
        let [status,textError] = mainApp.validationInput( search , "string" );
        if( !status ) {
            alert(textError);
            return;
        } else {
            formData.append("textSearch" , search );
        }
        
    }
    
    
    mainApp.send("POST", pathDataBrowse , headers , formData ).then( ( result ) => {
        
        myProjectList.fillListProject( result );
        
        return result;
        
    }).then( (result) => {
        
        fillProjects();
        
        
    } ).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            const msg = "خطأ في التحقق من هوية المستخدم !";
            mainApp.codeWraning( msg , "login" );
            
        } else if( codeError == 430 ) {
            
            const msg = "خطأ لا يوجد بيانات لعرضها ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else {
            
            const msg = "خطأ غير معروف !";
            mainApp.codeWraning( msg , "home" );
            
        }
        
    });
    
}



function searchProjectsLocal() {
    
    var search = document.getElementById("inputSearch").value;
    
    
    if(search !== "" ) {
        
        let [status,textError] = mainApp.validationInput( search , "string" );
        if( !status ) {
            alert(textError);
            return;
        } else {
            
        }
        
    }
    
    
    let containerList = document.getElementById("containerList");
    containerList.innerHTML = "";
    
    
    const listProjects = myProjectList.getListProject();

    for(var i=0; i<listProjects.length; i++) {
            
            let code = listProjects[i].code;
            let codeUser = listProjects[i].codeUser;
            let name = listProjects[i].name;
            let nameCategory = listProjects[i].nameCategory;
            let description = listProjects[i].description;
            let imageProfile = listProjects[i].imageProfile;
            
            
            if( name.includes(search) ) {
                
                let urlImage = mainApp.checkUrlImageProject( imageProfile );
                
                
                let buttonShowProject = "buttonShowProject"+i;
                
                let cardProject = `
            
                    <div class="card cardProject">
                        <div class="header">
                            <img src="${urlImage}">
                        </div>
                        <div class="body">
                            <div class="bodyheader">
                                <h3>${name}</h3>
                                <div class="bodyheadercat">
                                    <h5>${nameCategory}</h5>
                                </div>
                            </div>
                            <div class="bodybody">
                                <p>${description}</p>
                            </div>
                        </div>
                        <div class="footer">
                            <div id="${buttonShowProject}" class="buttons btnShow">عرض المشروع</div>
                        </div>
                    </div>
                `;
                
                containerList.insertAdjacentHTML("beforeend", cardProject);
                
                document.getElementById( buttonShowProject ).addEventListener("click" , function() {
                    
                    mainApp.goToProject( moduleUserLog.getUser().userCode , code , codeUser );
                    
                });
                
            } else {
                
            }
            
            
            
            
            
            
    }
    
}
function searchProjects() {
    
    const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseProject.php";
    
    var search = document.getElementById("inputSearch").value;
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectSort = document.getElementById("selectSort").value;
    var selectType = document.getElementById("selectType").value;
    var selectCategory = document.getElementById("selectCategory").value;
    var selectCount = document.getElementById("selectCount").value;
    
    

    if(search !== "" ) {
        
        let [status,textError] = mainApp.validationInput( search , "string" );
        if( !status ) {
            alert(textError);
            return;
        } else {
            
        }
        
    }
    
    
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("textSearch" , search );
    formData.append("valueFilter" , selectFilter );
    formData.append("valueSort" , selectSort );
    formData.append("valueType" , selectType );
    formData.append("valueCategory" , selectCategory );
    formData.append("countRow" , selectCount );
    
    
    mainApp.send("POST", pathSearchBrowse , headers , formData ).then( ( result ) => {
        
        myProjectList.fillListProject( result );
        
        return result;
        
    }).then( (result) => {
        
        buildPaginiation( result["countproject"] );
        fillProjects();
        
    } ).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            const msg = "خطأ في التحقق من هوية المستخدم !";
            mainApp.codeWraning( msg , "login" );
            
        } else if( codeError == 430 ) {
            
            const msg = "خطأ لا يوجد بيانات لعرضها ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else {
            
            const msg = "خطأ غير معروف !";
            mainApp.codeWraning( msg , "home" );
            
        }
        
    });
    
    
    
}

function fillterProjects() {
    
    const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseProject.php";
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectSort = document.getElementById("selectSort").value;
    var selectType = document.getElementById("selectType").value;
    var selectCategory = document.getElementById("selectCategory").value;
    var selectCount = document.getElementById("selectCount").value;
    
    
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("valueFilter" , selectFilter );
    formData.append("valueSort" , selectSort );
    formData.append("valueType" , selectType );
    formData.append("valueCategory" , selectCategory );
    formData.append("countRow" , selectCount );
    
    
    mainApp.send("POST", pathSearchBrowse , headers , formData ).then( ( result ) => {
        
        myProjectList.fillListProject( result );
        
        return result;
        
    }).then( (result) => {
        
        buildPaginiation( result["countproject"] );
        fillProjects();
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            const msg = "خطأ في التحقق من هوية المستخدم !";
            mainApp.codeWraning( msg , "login" );
            
        } else if( codeError == 430 ) {
            
            const msg = "خطأ لا يوجد بيانات لعرضها ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else {
            
            const msg = "خطأ غير معروف !";
            mainApp.codeWraning( msg , "home" );
            
        }
        
    });
    
    
}


let listProjectCategory = [];
let listProjectType = [];

function fillListData( data ) {

    listProjectCategory = [];
    listProjectType = [];
    
    
    let dataProjectCategory = ( data["projectCategory"] === undefined) ? [] : data["projectCategory"] ;
    let dataProjectType = ( data["projectType"] === undefined) ? [] : data["projectType"] ;


    for(var i=0; i<dataProjectCategory.length; i++) {
        
        listProjectCategory.push( new Category(dataProjectCategory[i]) );
        
    }
    
    for(var i=0; i<dataProjectType.length; i++) {
        
        listProjectType.push( new Type(dataProjectType[i]) );
        
    }
    
    fillSelectType();
    fillSelectCategory();
    
}



function fillSelectType() {
        
    let containerListType = document.getElementById('selectType');
    containerListType.innerHTML = "<option value='0'>الكل</option>";

    for(var i=0; i<listProjectType.length; i++)
    {
        const code = listProjectType[i].code;
        const name = listProjectType[i].name;

        let codeoption = `<option value="${code}"> ${name}</option>`;
        
        containerListType.insertAdjacentHTML("beforeend", codeoption);

    }

}
function fillSelectCategory() {
    
    let containerListCategory = document.getElementById('selectCategory');
    containerListCategory.innerHTML = "<option value='0'>الكل</option>";

    for(var i=0; i<listProjectCategory.length; i++)
    {
        const code = listProjectCategory[i].code;
        const name = listProjectCategory[i].name;

        let codeoption = `<option value="${code}"> ${name}</option>`;
        
        containerListCategory.insertAdjacentHTML("beforeend", codeoption);
        
    }

}






















































