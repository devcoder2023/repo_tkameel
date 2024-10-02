import * as moduleUserLog from './modules/moduleUserLog.js';

import Main from './modules/moduleMain.js';


let mainApp = new Main();




window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});


export function initApp() {
    
    init_User();
    
    if(moduleUserLog.getUser()) {
        
        buildWidgetSupport();
        
    }
    
    
}


function init_User() {
    
    moduleUserLog.init_User();
    
}

function init_pageBrowseProject() {
    
}

function buildWidgetSupport() {
    
    const code = `
        <div class="widget widgetSupport">
            
            <div class="widgetHeader widgetHeaderSupport">
                <h1>الدعم والإقتراحات</h1>
            </div>
            
            
            <div class="widgetBody widgetBodySupport">
                
                <div class="containerSupport">
                    
                    <div class="textSupport">
                        لتقديم الدعم والإقتراحات 
                        </br>
                        نسعد بتواصلكم معنا من خلال مراسلتنا
                        </br>
                        
                    </div>
                    
                    <div class="boxSupport">
                        
                        <div class="containerPublish">
                            
                            <div class="boxMessage">
                                <textarea id="inputPublish" name="inputPublish" class="inputs area" placeholder="ماذا تود القول" requred></textarea>
                                <span id="validContent" class="validation validContent"></span>
                            </div>
                            
                            <div class="containerChoise">
                                <div id="buttonSelect1" class="choise">مشاكل تقنية</div>
                                <div id="buttonSelect2" class="choise select">آراء وإقتراحات</div>
                            </div>
                            
                            <div id="buttonPublish" class="buttons">إرسال</div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    `;
    
    
    let divmain = document.getElementById("divmain");
    
    divmain.insertAdjacentHTML("beforeend", code);
    
    document.getElementById('buttonPublish').addEventListener("click" , clickPublish );
    document.getElementById('buttonSelect1').addEventListener("click" , clickSelect1 );
    document.getElementById('buttonSelect2').addEventListener("click" , clickSelect2 );
    
    
}

function clickPublish() {
    
    let select1 = document.getElementById("buttonSelect1").classList.contains("select");
    let select2 = document.getElementById("buttonSelect2").classList.contains("select");
    let valSelect = (select1) ? 1 : 2 ;
    
    let content = document.getElementById("inputPublish").value;
    let validContent = document.getElementById("validContent");
    
    let [status,textError] = mainApp.validationInput( content , "text" );
    if( !status ) {
        validContent.textContent = textError;
        return;
    } else {
        validContent.textContent = "";
    }
    
    
    const pathCreateSupport = mainApp.pathDomain + "api/createSupport.php";
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("content" , content );
    formData.append("codeType" , valSelect );
    
    mainApp.send("POST", pathCreateSupport , headers , formData ).then( ( result ) => {
        
        document.getElementById("inputPublish").value = "";
        mainApp.codeWraningNotification( "نشكرك على مشاركتك, آراءكم محل إهتمامنا.", "success" );
        
    }).then( (result) => {
        
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            
            txt = "انتهت الجلسة.";
            mainApp.codeWraning( txt , "login" );
            
        } else if(codeError == 420) {
            
            txt = "خطأ, الرجاء قم بلمئ كافة البيانات";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        
    });
    
    
}

function clickSelect1() {
    
    let select1 = document.getElementById("buttonSelect1").classList.add("select");
    let select2 = document.getElementById("buttonSelect2").classList.remove("select");
    
}
function clickSelect2() {
    
    let select1 = document.getElementById("buttonSelect1").classList.remove("select");
    let select2 = document.getElementById("buttonSelect2").classList.add("select");
    
}




