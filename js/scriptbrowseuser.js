import * as moduleUserLog from './modules/moduleUserLog.js';

import BrowseUser from './modules/moduleBrowseUserClass.js'

import Main from './modules/moduleMain.js';


let mainApp = new Main();
let browseUser = null;


const COUNTS_ROW = 10;



window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});

export function initApp( data ) {
    
    init_User();
    
    init_pageBrowseUser();
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    document.getElementById('buttonSearch').addEventListener("click" , searchUsers );
    
    document.getElementById('selectFilter').addEventListener("change" , fillterUsers);
    
    document.getElementById('selectCount').addEventListener("change" , () => { buildPaginiation(); });
}


function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_pageBrowseUser() {
    
    const pathDataBrowse = mainApp.pathDomain + "api/readDataBrowseUser.php";
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNTS_ROW);
    
    mainApp.send("POST", pathDataBrowse , headers , formData ).then( ( result ) => {
        
        browseUser = new BrowseUser( result );
        
        return result;
        
    }).then( (result) => {
        
        fillUsers();
        
        buildPaginiation( browseUser.getCountUsers() );
        
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





function fillUsers() {
    
    let containerList = document.getElementById("containerList");
    containerList.innerHTML = "";
    
    
    const listUsers = browseUser.getListUser();

    for(var i=0; i<listUsers.length; i++) {
            
            let code = listUsers[i].code;
            let firstName = listUsers[i].firstName;
            let lastName = listUsers[i].lastName;
            let email = listUsers[i].email;
            let about = listUsers[i].about;
            let imageProfile = listUsers[i].imageProfile;
            
            let nameType = listUsers[i].nameType;
            let nameStatus = listUsers[i].nameStatus;
            
            
            let urlImage = mainApp.checkUrlImage( imageProfile );
            
            
            
            let nameSmallUser = "containerSmallUser"+i;
            let nameMember = "nameMember"+i; 
            
            let codeUser = `
            
                <div class="containerItem containerItemUser">
                    
                    <div id="${nameSmallUser}" class="containerSmall containerSmallUser">
                        
                        <div class="containerProfile">
                            <div class="containerProfileImage">
                                <img src="${urlImage}">
                            </div>
                            
                            <div class="containerProfileText">
                                <div class="containerTextName" data-id="${code}">${firstName} ${lastName}</div>
                                <div class="containerTextAbout">${about}</div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                
            `;
            
            containerList.insertAdjacentHTML("beforeend", codeUser);
            
            document.getElementById( nameSmallUser ).addEventListener("click" , function() {
                
                mainApp.goToProfile( code );
                
            });
            
    }
    
}

function buildPaginiation() {
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    var selectCount = document.getElementById("selectCount").value;
    
    const pages = Math.ceil( browseUser.getCountUsers()/selectCount );
    
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
    var selectCount = document.getElementById("selectCount").value;
    
    
    if(search !== "" ) {
        
        let [status,textError] = mainApp.validationInput( search , "string" );
        if( !status ) {
            alert(textError);
            return;
        }
        
    }
    
    
    
    browseUser.goToPaginiation( search , selectFilter , selectCount , (numberPage-1) ).then( ( result ) => {
        
        browseUser.fillListUser( result );
        
        return result;
        
    }).then( (result) => {
        
        fillUsers();
        
        
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



function searchUsers() {
    
    const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseUser.php";
    
    var search = document.getElementById("inputSearch").value;
    
    var selectFilter = document.getElementById("selectFilter").value;
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
    
    
    
    browseUser.searchUser( search , selectFilter , selectCount ).then( ( result ) => {
        
        browseUser.fillDataBrowse( result );
        
        return result;
        
    }).then( (result) => {
        
        fillUsers();
        
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

function fillterUsers() {
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectCount = document.getElementById("selectCount").value;
    
    
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    
    browseUser.fillterUsers( selectFilter , selectCount ).then( ( result ) => {
        
        browseUser.fillDataBrowse( result );
        
        return result;
        
    }).then( (result) => {
        
        fillUsers();
        
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

