import * as moduleUserLog from './modules/moduleUserLog.js';

import BrowseProject from './modules/moduleBrowseProjectClass.js'

import Main from './modules/moduleMain.js';


let mainApp = new Main();
let browseProject = null;


const COUNTS_ROW = 10;



window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});


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
    
    document.getElementById('selectCount').addEventListener("change" , () => { buildPaginiation(); });
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
        
        browseProject = new BrowseProject( result );
        
        return result;
        
    }).then( (result) => {
        
        fillProjects();
        
        buildPaginiation();
        
        fillSelectType();
        fillSelectCategory();
        
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
    
    
    const listProjects = browseProject.getListProject();
    
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

function buildPaginiation() {
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    var selectCount = document.getElementById("selectCount").value;
    
    const pages = Math.ceil( browseProject.getCountProjects()/selectCount );
    
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
    
    var search = document.getElementById("inputSearch").value;
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectSort = document.getElementById("selectSort").value;
    var selectType = document.getElementById("selectType").value;
    var selectCategory = document.getElementById("selectCategory").value;
    var selectCount = document.getElementById("selectCount").value;
    
    
    if(search !== "") {
        
        let [status,textError] = mainApp.validationInput( search , "string" );
        if( !status ) {
            alert(textError);
            return;
        }
        
    }
    
    
    browseProject.goToPaginiation( search , selectFilter , selectSort , selectType , selectCategory , selectCount , (numberPage-1) ).then( ( result ) => {
        
        browseProject.fillListProject( result );
        
        return result;
        
    }).then( (result) => {
        
        fillProjects();
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            
            txt = "انتهت الجلسة,";
            mainApp.codeWraning( txt , "login" );
            
        } else if(codeError == 430) {
            
            txt = "خطأ, لا يوجد بيانات مطابقة";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
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
    
    
    const listProjects = browseProject.getListProject();

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
    
    
    browseProject.searchProject( search , selectFilter , selectSort , selectType , selectCategory , selectCount ).then( ( result ) => {
        
        browseProject.fillDataBrowse( result );
        
        return result;
        
    }).then( (result) => {
        
        fillProjects();
        
        buildPaginiation();
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            
            txt = "انتهت الجلسة,";
            mainApp.codeWraning( txt , "login" );
            
        } else if(codeError == 430) {
            
            txt = "خطأ, لا يوجد بيانات مطابقة";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
    });
    
    
    
}

function fillterProjects() {
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectSort = document.getElementById("selectSort").value;
    var selectType = document.getElementById("selectType").value;
    var selectCategory = document.getElementById("selectCategory").value;
    var selectCount = document.getElementById("selectCount").value;
    
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    
    browseProject.fillterProjects( selectFilter , selectSort , selectType , selectCategory , selectCount ).then( ( result ) => {
        
        browseProject.fillDataBrowse( result );
        
        return result;
        
    }).then( (result) => {
        
        fillProjects();
        
        buildPaginiation();
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            
            txt = "انتهت الجلسة,";
            mainApp.codeWraning( txt , "login" );
            
        } else if(codeError == 430) {
            
            txt = "خطأ, لا يوجد بيانات مطابقة";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
    });
    
    
}



function fillSelectType() {
        
    let containerListType = document.getElementById('selectType');
    containerListType.innerHTML = "<option value='0'>الكل</option>";
    
    let listProjectType = browseProject.getListProjectType();
    
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

    let listProjectCategory = browseProject.getListProjectCategory();
    
    for(var i=0; i<listProjectCategory.length; i++)
    {
        const code = listProjectCategory[i].code;
        const name = listProjectCategory[i].name;

        let codeoption = `<option value="${code}"> ${name}</option>`;
        
        containerListCategory.insertAdjacentHTML("beforeend", codeoption);
        
    }

}





