import * as moduleUserLog from './modules/moduleUserLog.js';

import { ProjectShow } from './modules/moduleProjectClass.js';

import Main from './modules/moduleMain.js';


let mainApp = new Main();
let myProject = null;





const pathJoinMemberSkill = mainApp.pathDomain + "api/createJoinMemberSkill.php";



window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});



export function initApp( data ) {
    
    init_User();
    
    init_Project();
    
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    document.getElementById('lightBox').addEventListener("click" , clickBoxOut );
    document.getElementById('lightBoxCard').addEventListener("click" , clickBox );
    
}


function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}
function init_Project() {
    
    const pathDataShow = mainApp.pathDomain + "api/readDataShow.php";
    
    var codeProject = mainApp.getValCookie("codeproject");
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", codeProject );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    
    mainApp.send("POST", pathDataShow , headers , formData ).then( ( result ) => {
        
        myProject = new ProjectShow( result );
        
        return result;
        
    }).then( (result) => {
        
        fillShowData();
        fillProjectSkills();
        
        mainApp.callNotification();
        
    }).then( (result) => {
        
        const isM = myProject.isMember();
        callIsMember( isM );
        
    } ).catch( (reject) => {
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if(codeError == 410) {
            
            const msg = "خطأ في التحقق من هوية المستخدم !";
            mainApp.codeWraning( msg , "login" );
            
        } else if(codeError == 420) {
            
            const msg = "خطأ في البيانات المرسلة ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else if(codeError == 430) {
            
            const msg = "خطأ لا يوجد بيانات لعرضها ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else if(codeError == 440) {
            
            const msg = "هذا المشروع متاح للأعضاء فقط</br>لست عضواً في هذا المشروع !";
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






function fillShowData() {
    
    let projectname = document.getElementById("projectname");
    let projectcategory = document.getElementById("projectcategory");
    let projecttype = document.getElementById("projecttype");
    let projectdescription = document.getElementById("projectdescription");
    let projectgoals = document.getElementById("projectgoals");
    
    projectname.textContent = myProject.name;
    projectcategory.textContent = myProject.nameCategory;
    projecttype.textContent = myProject.nameType;
    projectdescription.textContent = myProject.description;
    projectgoals.textContent = myProject.goals;
    
}

function fillProjectSkills() {

    let listSkill = document.getElementById('listSkill');
    listSkill.innerHTML = "";
    
    const myProjectSkills = myProject.getListProjectSkill();

    
    for(let i=0; i<myProjectSkills.length; ++i)
    {
        
        const id = myProjectSkills[i].id;
        const codeSkill = myProjectSkills[i].codeSkill;
        const description = myProjectSkills[i].description;
        const codeStatusJoin = myProjectSkills[i].codeStatusJoin;
        
        let name = "";
        let nameStatus = "";
        let classStatus = "";
        if( codeSkill == null ) {
            name = "أخرى" ;
        } else {
            name = myProjectSkills[i].nameSkill;
        }
        if( codeStatusJoin == myProject.getEnumStatusJoin().Enable ) {
            nameStatus = "متاح" ;
            classStatus = "";
        } else {
            nameStatus = "غير متاح";
            classStatus = "disable";
        }
        
        
        
        let nameContainerSkillBig = "containerSkillBig"+i;
        let nameButtonSkillMore = "buttonSkillMore"+i;
        let nameListSkillTask = "listSkillTask"+i;
        
        
        let codeoption = `
        <li>
        <div class="containerItem containerItemSkill">
            
            <div id="containerSmall" class="containerSmall containerSmallSkill">
            
                <div class="containerBody">
                    <div class="containerContent" data-id="${codeSkill}" onclick="clickItem( this )">${name}</div>
                </div>
                
                <div class="containerButtons">
                    
                    <div class="nameStatus ${classStatus}">
                        ${nameStatus}
                    </div>
                    
        
                    <div id="${nameButtonSkillMore}" class="divsvg"">
                        <svg class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>
                    
                </div>
            </div>
            
            <div id="${nameContainerSkillBig}" class="containerBig hide">
                <div class="containerHeader">
                    <div class="containerContent">${description}</div>
                </div>
            </div>
            
        </div>
        </li>
        `;
        
        listSkill.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameButtonSkillMore ).addEventListener("click" , function () {
            event.stopPropagation();
            
            clickSkillMore( nameContainerSkillBig );
            
        });
        
        
    }
    
    
    
}



function clickJoin() {
    
    if( myProject.getListProjectMember().length > 0 ) {
            
        let box = document.getElementById("lightBox");
        box.classList.remove("close");
        
        let msg = "لديك عدد ("+ myProject.getListProjectMember().length +") طلبات سابقة بإنتظار الموافقة" ;
        let code = `
            <div class="divHeader">
                <h2>طلب إنضمام</h2>
            </div>
            <div class="divBody">
                ${msg}
            </div>
            
            
            <div class="divFooter">
                <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
            </div>
            
        `;
        
        var elementLightBox = document.getElementById("lightBoxCard");
        elementLightBox.classList.add("notification");
        elementLightBox.innerHTML = code;
        document.getElementById( "buttonCancel" ).addEventListener("click" , cancel , false);
        
        return;
    } else {
        
        
        let box = document.getElementById("lightBox");
        box.classList.remove("close");
    
        let code = `
            <div class="divHeader">
                <h2>طلب إنضمام</h2>
            </div>
            <div id="divBodyJoin" class="divBody">
                
                <div class="containerfiled">
    
                    <div class="containerLabel">
                        <label>حدد المهارة التي ترغب في شغلها :</label>
                    </div>

                    
                    <div class="continerselect">
                        <select id="selectskill" name="skilluser" class="selectbox selectSkill" required>
                            <option value="0">اختر المهارة</option>
                        </select>
                        <div class="divsvg">
                            <svg id="divsvgdown" class="svgstroke">
                                <use xlink:href="#svgdown"/>
                            </svg>
                        </div>
    
                    </div>
                    <span id="validProjectSkill" class="validation validProjectSkill"></span>
    
                </div>
                <div class="containerfiled area">
    
                    <div class="containerLabel">
                        <label>ماذا تود القول لمدير المشروع :</label>
                    </div>
                    
                    <textarea id="messageJoin" name="messageJoin" class="inputs area" placeholder="ماذا تود القول" requred></textarea>
                    <span id="validMessage" class="validation validMessage"></span>
                </div>
                
    
            </div>
            <div class="divFooter">
                <div id="buttonRequest" class="buttons btnSend disable">إرسال الطلب</div>
                <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
            </div>
        `;
        
        
        let elementLightBox = document.getElementById("lightBoxCard");
        elementLightBox.classList.add("grid");
        elementLightBox.innerHTML = code;
        
    
        document.getElementById( "buttonRequest" ).addEventListener("click" , function() {
                requestJoin();
        } , false);
        document.getElementById( "buttonCancel" ).addEventListener("click" , cancel , false);
        
        fillJoinSkills();
        
    }
    
    
}

function fillJoinSkills() {
    let skillsoption = document.getElementById("selectskill");
    selectskill.innerHTML = "";
    
    const codeoptionFirst = `
            <option value="0">
                <div class="optionskill">
                    - اختر المهارة -
                </div>
            </option>`;
    skillsoption.insertAdjacentHTML("beforeend", codeoptionFirst);
    
    
    const myProjectSkills = myProject.getListProjectSkill();
    
    for(var i=0; i<myProjectSkills.length; i++)
    {
        let codeProjectSkill = myProjectSkills[i].code;
        let codeSkill = myProjectSkills[i].codeSkill;
        let nameSkill = myProjectSkills[i].nameSkill;
        let description = myProjectSkills[i].description;
        let codeStatusJoin = myProjectSkills[i].codeStatusJoin;
        
        if( codeStatusJoin != myProject.getEnumStatusJoin().Enable ) {
            // break ;
        } else {
            
            
            if( codeSkill == null ) {
                
                let subs = description.substr(0, 10);
                nameSkill = "أخرى-"+subs ;
            } else {
                nameSkill = myProjectSkills[i].nameSkill;
            }
            
            let codeoption = `
                <option value="${codeProjectSkill}">
                    <div class="optionskill">
                        ${nameSkill}
                    </div>
                </option>
            `;
            skillsoption.insertAdjacentHTML("beforeend", codeoption);
            
        }
        
    }
    
    const codeoptionLast = `
            <option value="-1">
                <div class="optionskill">
                    -اخرى-
                </div>
            </option>`;
    skillsoption.insertAdjacentHTML("beforeend", codeoptionLast);
    
    
    skillsoption.addEventListener("change", (e) => {
        
        const val = e.target.value;
        
        let button = document.getElementById( "buttonRequest" );
        
        if( val == 0 ) {
            button.classList.add("disable");
        } else {
            button.classList.remove("disable");
        }
        
        
    });
    
    
}

function requestJoin() {
    
    
    let codeProjectSkill = document.getElementById("selectskill").value;
    let messageJoin = document.getElementById("messageJoin").value;
    let validProjectSkill = document.getElementById("validProjectSkill");
    let validMessage = document.getElementById("validMessage");
    
    
    if( codeProjectSkill == 0 ) {
        validProjectSkill.textContent = "الرجاء اختيار المهارة المطلوبة";
        return;
    } else {
        validProjectSkill.textContent = "";
    }
    
    const [status,textError] = mainApp.validationInput( messageJoin , "text" );
    if( !status ) {
        validMessage.textContent = textError;
        return;
    } else {
        validMessage.textContent = "";
    }
    
    
    
    if( codeProjectSkill == -1) {
        
        if( messageJoin === "" ) {
            validMessage.textContent = "إلرجاء قم بملئ بعض التفاصيل لطلب الإنضمام";
            return;
        }
    }
    
    
    
    myProject.requestJoin( codeProjectSkill , messageJoin ).then( (result) => {
        
        myProject.fillProjectMember( result );
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {
        
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
            
        } else if(codeError == 451) {
            
            let txt = "خطأ, لديك طلبات مسبقة على هذا المشروع يرجي إنتظار الرد !";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        
    } );

}

function onNotification( state , msg ) {
    
    let idSVG = "";
    let modeSVG = "svgfill";
    
    if( state == "success") {
        idSVG = "notificatiosuccess";
    } else if( state == "warning") {
        idSVG = "notificatiowarning";
        modeSVG = "svgstroke"
    } else if( state == "error") {
        idSVG = "notificatioerror2";
    } else {
        return;
    }
    
    let code = `
    
        <div id="processnotification" class="processnotification ${state}">
            
            <div class="divsvg"">
                <svg class="${modeSVG}">
                    <use xlink:href="#${idSVG}"/>
                </svg>
            </div>
            
            <div class="textNotification">
                <p>${msg}</p>
            </div>
        </div>
    
    `;
    
    var wrapper = document.getElementById("wrapper");
    wrapper.insertAdjacentHTML("beforeend", code);
    
    setTimeout( () => {
        var processnotification = document.getElementById("processnotification");
        processnotification.remove();
        
    }, 3000)
    
}



function cancel() {
    
    let box = document.getElementById("lightBox");
    box.classList.add("close");
    
}
function clickBoxOut() {
    
    let box = document.getElementById("lightBox");
    box.classList.add("close");
}
function clickBox( event ) {
    
    event.stopPropagation();
}



function callIsMember( isMember ) {
    
    let widgetViewHeader = document.getElementById("widgetViewHeader");
    let containerButtonsWidgetHeader = document.getElementById("containerButtonsWidgetHeader");
    
    if( isMember ) {
        
        let codebottunlive = `<div id="buttonGoToLive" class="buttons">المساحة العامة</div>`;
        
        containerButtonsWidgetHeader.insertAdjacentHTML("beforeend", codebottunlive);
        
        document.getElementById( "buttonGoToLive" ).addEventListener("click" , clickGoToLiveProject);
        
    } else {
        
        let codebottunjoin = `<div id="buttonJoin" class="buttons btnJoin">طلب الإنضمام</div>`;
        
        containerButtonsWidgetHeader.insertAdjacentHTML("beforeend", codebottunjoin);
        
        document.getElementById( "buttonJoin" ).addEventListener("click" , clickJoin);
    }
    
}

function clickSkillMore( idBig ) {
    
    var big = document.getElementById( idBig );
    big.classList.toggle("hide");
    
}


function clickGoToLiveProject() {
    
    mainApp.goToProjectLive( myProject.code );

}











