import * as moduleUserLog from './moduleUserLog.js';

import User , { UserList } from './moduleUser.js';

import Main from './moduleMain.js';


let mainApp = new Main();
let myUserList = null;


const COUNTS_ROW = 10;
let countUser = 0;






export function initApp( data ) {
    
    init_User();
    
    init_pageBrowseUser();
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    document.getElementById('buttonSearch').addEventListener("click" , searchUsers );
    
    document.getElementById('selectFilter').addEventListener("change" , fillterUsers);
    
    document.getElementById('selectCount').addEventListener("change" , () => { buildPaginiation( countUser ); });
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
        
        myUserList = new UserList();
        myUserList.fillListUser( result );
        
        return result;
        
    }).then( (result) => {
        
        countUser = result["countuser"];
        buildPaginiation( countUser );
        fillUsers();
        
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
    
    
    const listUsers = myUserList.getListUser();

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

function buildPaginiation( countUsers ) {
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    var selectCount = document.getElementById("selectCount").value;
    
    const pages = Math.ceil( countUsers/selectCount );
    
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
    
    const pathDataBrowse = mainApp.pathDomain + "api/searchBrowseUser.php";
    
    var search = document.getElementById("inputSearch").value;
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectCount = document.getElementById("selectCount").value;
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("valueFilter" , selectFilter );
    formData.append("countRow" , selectCount );
    formData.append("numberPage" , numberPage-1);
    
    if(search !== "" ) {
        
        let [status,textError] = mainApp.validationInput( search , "string" );
        if( !status ) {
            alert(textError);
            return;
        } else {
            formData.append("textSearch" , search );
        }
        
    }
    
    
    
    mainApp.send("POST", pathDataBrowse , headers , formData ).then( ( result ) => {
        
        myUserList.fillListUser( result );
        
        return result;
        
    }).then( (result) => {
        
        fillUsers();
        
        
    } ).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            widgetErrorSession();
            
        } else if( codeError == 430 ) {
            
            widgetErrorDataEmpty();
            
        } else {
            widgetErrorNon();
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
    
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("textSearch" , search );
    formData.append("valueFilter" , selectFilter );
    formData.append("countRow" , selectCount );
    
    
    mainApp.send("POST", pathSearchBrowse , headers , formData ).then( ( result ) => {
        
        myUserList.fillListUser( result );
        
        return result;
        
    }).then( (result) => {
        
        buildPaginiation( result["countuser"] );
        fillUsers();
        
    } ).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            widgetErrorSession();
            
        } else if( codeError == 430 ) {
            
            widgetErrorDataEmpty();
            
        } else {
            widgetErrorNon();
        }
        
    });
    
    
    
}

function fillterUsers() {
    
    const pathSearchBrowse = mainApp.pathDomain + "api/searchBrowseUser.php";
    
    var selectFilter = document.getElementById("selectFilter").value;
    var selectCount = document.getElementById("selectCount").value;
    
    
    
    let widgetFooter = document.getElementById("widgetFooter");
    widgetFooter.innerHTML = "";
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("valueFilter" , selectFilter );
    formData.append("countRow" , selectCount );
    
    
    mainApp.send("POST", pathSearchBrowse , headers , formData ).then( ( result ) => {
        
        myUserList.fillListUser( result );
        
        return result;
        
    }).then( (result) => {
        
        buildPaginiation( result["countuser"] );
        fillUsers();
        
    } ).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            widgetErrorSession();
            
        } else if( codeError == 430 ) {
            
            widgetErrorDataEmpty();
            
        } else {
            widgetErrorNon();
        }
        
    });
    
    
}
























































