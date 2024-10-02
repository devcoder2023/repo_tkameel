import * as moduleUserLog from './modules/moduleUserLog.js';

import NewProject from './modules/moduleNewProjectClass.js';

import Main from './modules/moduleMain.js';





let mainApp = new Main();
var newProject = null;

const minLengthName = 5;
const minLengthText = 10;
const maxLengthName = 25;
const maxLengthText = 150;





window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});


export function initApp( data ) {
    
    init_User();
    
    init_pageNew();
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    document.getElementById('buttonCreate').addEventListener("click" , clickCreateProject );
}

function validitionName() {
    
    let validName = document.getElementById("validName");
    let num = document.getElementById("inputName").value.length;
    validName.textContent = num;
}

function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_pageNew() {
    
    const pathDataNew = mainApp.pathDomain + "api/readDataNew.php";
    
    const headers = [];
    
    let formData = new FormData();
    
    mainApp.send("POST", pathDataNew , headers , formData ).then( ( result ) => {
        
        newProject = new NewProject( result );
    
    }).then( (result) => {
        
        fillNewSelectCategory();
        fillNewSelectType();
        
        mainApp.callNotification();
        
    }).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            const msg = "خطأ في التحقق من هوية المستخدم !";
            mainApp.codeWraning( msg , "login" );
            
        } else if( codeError == 430 ) {
            
            const msg = "خطأ هذا المشروع غير موجود ! ";
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






function clickCreateProject() {
    
    
    
    let validName = document.getElementById("validName");
    let validCategory = document.getElementById("validCategory");
    let validType = document.getElementById("validType");
    let validDescription = document.getElementById("validDescription");
    let validGoals = document.getElementById("validGoals");
    let validImage = document.getElementById("validImage");
    
    
    const pathCreateProject = mainApp.pathDomain + "api/createProject.php";
    
    const name = document.getElementById('inputName').value;
    const codeCategory = document.getElementById('selectcategory').value;
    const codeType = document.getElementById('selecttype').value;
    const description = document.getElementById('inputDescription').value;
    const goals = document.getElementById('inputGoals').value;
    const fileImage = document.getElementById('fieldimage').files;
    
    
    
    
    let [status,textError] = mainApp.validationInput( name , "string" );
    if( !status ) {
        validName.textContent = textError;
        return;
    } else {
        validName.textContent = "";
    }
    
    if( codeCategory == 0 ) {
        validCategory.textContent = "الرجاء اختيار التصنيف";
        return;
    } else {
        validCategory.textContent = "";
    }
    
    if( codeType == 0 ) {
        validType.textContent = "الرجاء اختيار النوع";
        return;
    } else {
        validType.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( description , "text" );
    if( !status ) {
        validDescription.textContent = textError;
        return;
    } else {
        validDescription.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( goals , "text" );
    if( !status ) {
        validGoals.textContent = textError;
        return;
    } else {
        validGoals.textContent = "";
    }
    
    
    
    
    
    
    if( fileImage.length > 0 ) {
        
        
        let nameImage = fileImage[0].name;
        let sizeImage = fileImage[0].size;
        
        if( !mainApp.strps( nameImage , "image") ) {
            validImage.textContent = "نوع الملف غير مدعوم";
        } else {
            
            if( sizeImage > mainApp.maxSizeFileImage ) {
                validImage.textContent = "حجم الملف أكبر من الحجم المسموح 5 MB";
            } else {
                validImage.textContent = "";
            }
            
        }
        
    } else {
        validImage.textContent = "No IMG";
    }
    
    


    const headers = [];
    
    let formData = new FormData();
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("name", name );
    formData.append("codeCategory", codeCategory );
    formData.append("codeType", codeType );
    formData.append("description", description );
    formData.append("goals", goals );
    formData.append("imageProfile", fileImage[0] );
    


    newProject.createProject( moduleUserLog.getUser().userCode , name , codeCategory , codeType , description , goals , fileImage[0] ).then( ( result ) => {
        
        const codeProject = result["code"] ;
        
        goToProjectMy( codeProject );
        
        
    }).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            
            txt = "انتهت الجلسة,";
            mainApp.codeWraning( txt , "login" );
            
        } else if(codeError == 420) {
            
            txt = "خطأ, الرجاء قم بلمئ كافة البيانات";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else if(codeError == 450) {
            
            let txt = "خطأ غير معروف, حاول مرة أخرى";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
    });
    
    
}

function goToProjectMy( codeProject ) {
    
    window.location.href = mainApp.pathDomain + "myproject/" + codeProject;
    
}






function fillNewSelectCategory() {
    
    let containerListCategory = document.getElementById('selectcategory');
    containerListCategory.innerHTML = "<option value='0'>-اختر التصنيف-</option>";
    
    let listProjectCategory = newProject.getListProjectCategory();
    
    for(var i=0; i<listProjectCategory.length; i++)
    {
        const code = listProjectCategory[i].code;
        const name = listProjectCategory[i].name;
        
        let codeoption = `<option value="${code}"> ${name}</option>`;
        
        containerListCategory.insertAdjacentHTML("beforeend", codeoption);
        
    }

}
function fillNewSelectType() {
        
    let containerListType = document.getElementById('selecttype');
    containerListType.innerHTML = "<option value='0'>-اختر نوع المشروع-</option>";

    let listProjectType = newProject.getListProjectType();
    
    for(var i=0; i<listProjectType.length; i++)
    {
        const code = listProjectType[i].code;
        const name = listProjectType[i].name;

        let codeoption = `<option value="${code}"> ${name}</option>`;
        
        containerListType.insertAdjacentHTML("beforeend", codeoption);

    }

}

