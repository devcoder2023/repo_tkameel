import * as moduleUserLog from './modules/moduleUserLog.js';

import { ProjectLive } from './modules/moduleProjectClass.js';

import Main from './modules/moduleMain.js';


let mainApp = new Main();
let myProject = null;


const COUNT_ROW = 5;
let NUMBER_PAGE = 1;



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
    document.getElementById('buttonPublish').addEventListener("click" , clickPublish );
    
}


function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_Project() {
    
    var codeProject = mainApp.getValCookie("codeproject");
    
    const pathDataLiveProject = mainApp.pathDomain + "api/readDataLiveProject.php";
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", codeProject );
    formData.append("countRow" , COUNT_ROW );
    
    mainApp.send("POST", pathDataLiveProject , headers , formData ).then( ( result ) => {
        
        myProject = new ProjectLive( result );
        
        return result;
        
    }).then( (result) => {
        
        fillShowData();
        calcProgress();
        
        fillProjectMember();
        fillProjectChat();
        fillProjectDirect();
        fillProjectSkills();
        
        setPermissionEdit( moduleUserLog.getUser().userCode === myProject.codeUser );
        
        mainApp.callNotification();
        
    } ).catch( (reject) => {
        
        // Mode Error
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if( codeError == 410 ) {
            
            const msg = "خطأ في التحقق من هوية المستخدم !";
            mainApp.codeWraning( msg , "login" );
            
        } else if( codeError == 420 ) {
            
            const msg = "خطأ في البيانات المرسلة ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else if( codeError == 430 ) {
            
            const msg = "خطأ هذا المشروع غير موجود ! ";
            mainApp.codeWraning( msg , "home" );
            
        } else if( codeError == 440 ) {
            
            const msg = "لست عضواً في هذا المشروع !";
            mainApp.codeWraning( msg , "home" );
            
        } else if( codeError == 442 ) {
            
            const msg = "لم يتم تنشيط عضويتك في هذا المشروع ! ";
            mainApp.codeWraning( msg , "home" );
            
            widgetErrorPermisionStatusUser( codeProject );
            
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





function setPermissionEdit( isMe  ) {
    
    let coverNameProject = document.getElementById("coverNameProject");
    
    if( isMe ) {
        
        let codeButtonManagment = `
            <div id="buttonManagment" class="divsvg">
                <svg class="svgfill">
                    <use xlink:href="#svgsetting"/>
                </svg>
            </div>
        `;
        coverNameProject.insertAdjacentHTML("beforeend", codeButtonManagment);
        
        document.getElementById('buttonManagment').addEventListener("click" , clickGoToProjectMy );
        
    } else {
        
        
    }
}





function fillShowData() {
    
    if( myProject ) {
        
        let urlImage = mainApp.checkUrlImageProject( myProject.imageProfile );
        
        let elImage = document.getElementById("imgProfileProject").src = urlImage;
        let elName = document.getElementById("txetNameProject").textContent = myProject.name;
        let elDesc = document.getElementById("textDescription").textContent = myProject.description;
        
    }
    
    
}

function calcProgress() {
    
    let [ countAllStatus , countWorkingStatus , countDoneStatus ] = myProject.getListCountStatus();
    
    let numProgress = ( 100/countAllStatus ) * countDoneStatus;
    
    let outterProgress = document.getElementById("outterProgress");
    outterProgress.style.width = `clamp(10px, ${numProgress}%, 100%)`;
    
}


function fillProjectMember() {
    
    let listMember = document.getElementById('listMember');
    listMember.innerHTML = "";
    
    let numberMember = document.getElementById("numberMember");
    numberMember.innerHTML = "";
    
    const myProjectMembers = myProject.getListProjectMember();
    numberMember.innerHTML = myProjectMembers.length;
    
    
    for(var i=0; i<myProjectMembers.length; i++) 
    {
        const code = myProjectMembers[i].code;
        const codeUser = myProjectMembers[i].codeUser;
        const codeProject = myProjectMembers[i].codeProject;
        const codeProjectSkill = myProjectMembers[i].codeProjectSkill;
        const message = myProjectMembers[i].message;
        
        const firstName = myProjectMembers[i].firstName;
        const lastName = myProjectMembers[i].lastName;
        const about = myProjectMembers[i].about;
        const imageProfile = myProjectMembers[i].imageProfile;
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        let nameSkill = (codeProjectSkill == null) ? "لم يتم التحديد" : myProjectMembers[i].nameSkill;
        
        let nameRow = "rowMember"+i;
        let nameIdMember = "idMember"+i; 
        
        let codeoption = `
            <li>
                
                <div id="${nameRow}" class="containerItem containerItemMember">
                    
                    <div id="containerSmall" class="containerSmall containerSmallMember">
                        
                        <div class="containerProfile">
                            <div class="containerProfileImage">
                                <img src="${urlImage}">
                            </div>
                            
                            <div class="containerProfileText">
                                <div class="containerTextName" data-id="${codeUser}">${firstName} ${lastName}</div>
                                <div class="containerTextAbout">${about}</div>
                            </div>
                        </div>
                        
                        <div class="containerBody member">
                            <div class="containerContent member">${nameSkill}</div>
                        </div>
                        
                        
                    </div>
                </div>
                
            </li>
        `;
    
        listMember.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameRow ).addEventListener("click", function(){
            
            mainApp.goToProfile( codeUser );
        });
    }
    
}

function fillProjectChat() {
    
    let listChat = document.getElementById('listChat');
    listChat.innerHTML = "";
    
    const myProjectPosts = myProject.getListPost();
    
    for(var i=0; i<myProjectPosts.length; i++) 
    {
        const code = myProjectPosts[i].code;
        const content = myProjectPosts[i].content;
        const datePost = myProjectPosts[i].datePost;
        const timePost = myProjectPosts[i].timePost;
        const codeUser = myProjectPosts[i].codeUser;
        const codeProject = myProjectPosts[i].codeProject;
        const codeSkill = myProjectPosts[i].codeSkill;
        
        const firstName = myProjectPosts[i].firstName;
        const lastName = myProjectPosts[i].lastName;
        const imageProfile = myProjectPosts[i].imageProfile;
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        let classChat = "";
        if( codeUser == moduleUserLog.getUser().userCode ) {
            classChat = "right";
        } else {
            classChat = "left";
        }
        
        let isManegerProject = ``;
        if(codeUser == myProject.codeUser ) {
            isManegerProject = `<div class="Administrator">المسؤول</div>`;
        }
        
        
        const codeDirect = `
            <li>
                <div class="coverChat ${classChat}">
                <div class="containerChat containerItemChat">
                    
                    <div class="containerProfile">
                        
                        <div class="containerProfileImage">
                            <img src="${urlImage}">
                        </div>
                        
                        <div class="containerProfileText chat">
                            <div class="containerTextName" data-id="${codeUser}">${firstName} ${lastName}</div>
                            ${isManegerProject}
                        </div>
                        
                        <div class="containerProfileTextAdmin">
                        </div>
                        
                    </div>
                    
                    <div class="containerBody">
                    ${content}
                    </div>
                    
                    </div>
                    
                </div>
            </li>
        `;
        
        listChat.insertAdjacentHTML("beforeend", codeDirect);
    }
    
    let codemore = `
        <div class="containerLoadMorePost">
        <div id="loadMorePost" class="loadMorePost">more post</div>
        </div>
    `;
    listChat.insertAdjacentHTML("beforeend", codemore);
    
    document.getElementById( "loadMorePost" ).addEventListener("click" , function() {
        
        NUMBER_PAGE += 1;
        
        loadMoreChats();
        
    });
    
    
    
}


function fillProjectDirect() {
    
    let listDirect = document.getElementById('listDirect');
    listDirect.innerHTML = "";
    
    const myProjectDirects = myProject.getListProjectDirect();

    
    for(var i=0; i<myProjectDirects.length; i++) 
    {
        const code = myProjectDirects[i].code;
        const content = myProjectDirects[i].content;
        
        
        let nameIdDirectEdit = "idDirectEdit"+i;
        let nameIdDirectRemove = "idDirectRemove"+i; 
        const codeDirect = `
            <li>
                <div class="containerDirect">
                    
                    <div class="containerBody">
                    ${content}
                    </div>
                    
                </div>
            </li>
        `;
        
        listDirect.insertAdjacentHTML("beforeend", codeDirect);
        
    }
}

function fillProjectSkills() {

    let listSkill = document.getElementById('listSkill');
    listSkill.innerHTML = "";
    
    const myProjectSkills = myProject.getListProjectSkill();
    
    for(let i=0; i<myProjectSkills.length; ++i)
    {
        const code = myProjectSkills[i].code;
        const codeSkill = myProjectSkills[i].codeSkill;
        const description = myProjectSkills[i].description;
        const codeStatusJoin = myProjectSkills[i].codeStatusJoin;
        
        let nameSkill = "";
        if( codeSkill == null ) {
            nameSkill = "أخرى" ;
        } else {
            nameSkill = myProjectSkills[i].nameSkill;
        }
        
        
        
        
        let nameRowSkill = "rowSkill"+i;
        let nameContainerSkillBig = "containerSkillBig"+i;
        let nameContainerButton = "containerButtonSkill"+i;
        let nameContainerBody = "containerBodySkill"+i;
        let nameButtonSkillMore = "buttonSkillMore"+i;
        
        
        let codeoption = `
        <li>
        <div id="${nameRowSkill}" class="containerItem containerItemSkill">
            
            <div id="containerSmall" class="containerSmall containerSmallSkill">
            
                <div id="${nameContainerBody}" class="containerBody">
                    <div class="containerContent" data-id="${codeSkill}">${nameSkill}</div>
                </div>
                
                <div id="${nameContainerButton}" class="containerButtons">
                    
                    <div id="${nameButtonSkillMore}" class="divsvg">
                        <svg class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>
                    
                </div>
            </div>
            
            <div id="${nameContainerSkillBig}" class="containerBig hide">
                
                <div class="containerBody">
                    <div class="containerContent">${description}</div>
                </div>
                
            </div>
            
        </div>
        </li>
        `;
        
        listSkill.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameContainerButton ).addEventListener("click" , function() {
            event.stopPropagation();
        });
        
        document.getElementById( nameButtonSkillMore ).addEventListener("click" , function() {
            clickSkillMore( nameContainerSkillBig );
        });
        
        document.getElementById( nameContainerBody ).addEventListener("click" , function () {
            event.stopPropagation();
            clickGoToProjectWork( code );
            
        });
        
        
        
    }
    
    
}




function clickPublish() {
    
    if( myProject ) {
        
        let content = document.getElementById('inputPublish').value;
        let validContent = document.getElementById("validContent");
        
        let [status,textError] = mainApp.validationInput( content , "text" );
        if( !status ) {
            validContent.textContent = textError;
            return;
        } else {
            validContent.textContent = "";
        }
        
        myProject.publishPost( content , moduleUserLog.getUser().userCode ).then( (result) => {
            
            document.getElementById('inputPublish').value = "";
            
            refreshPosts();
            
        }).then( (result) => {
            
            fillProjectChat();
            
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
                
                txt = "خطأ غير معروف, حاول مرة أخرى";
                mainApp.codeWraningNotification( txt , "error" );
                
            } else {
                txt = "خطأ غير معروف !";
                mainApp.codeWraningNotification( txt , "error" );
            }
            
        });
        
    } else {
        
    }

}

function refreshPosts() {
    
    myProject.refreshPosts().then( ( result ) => {
        
        myProject.fillListPost( result );
        
    }).then( (result) => {
        
        fillProjectChat();
        
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
            
        } else {
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
        }
        
    });
    
}




function loadMoreChats() {
    
    myProject.loadMorePosts( NUMBER_PAGE ).then( ( result ) => {
        
        myProject.fillListPost( result );
        
    }).then( (result) => {
        
        fillMoreChat();
        
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
            
        } else {
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
        }
        
    });
    
}

function fillMoreChat() {
    
    let listChat = document.getElementById('listChat');
    listChat.innerHTML = "";
    
    const myProjectPosts = myProject.getListPost();
    
    for(var i=0; i<myProjectPosts.length; i++) 
    {
        const code = myProjectPosts[i].code;
        const content = myProjectPosts[i].content;
        const datePost = myProjectPosts[i].datePost;
        const timePost = myProjectPosts[i].timePost;
        const codeUser = myProjectPosts[i].codeUser;
        const codeProject = myProjectPosts[i].codeProject;
        const codeSkill = myProjectPosts[i].codeSkill;
        
        const firstName = myProjectPosts[i].firstName;
        const lastName = myProjectPosts[i].lastName;
        const imageProfile = myProjectPosts[i].imageProfile;
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        let classChat = "";
        if( codeUser == moduleUserLog.getUser().userCode ) {
            classChat = "right";
        } else {
            classChat = "left";
        }
        
        
        const codeDirect = `
            <li>
                <div class="coverChat ${classChat}">
                <div class="containerChat">
                    
                    <div class="containerProfile">
                        
                        <div class="containerProfileImage">
                            <img src="${urlImage}">
                        </div>
                        
                        <div class="containerProfileText">
                            <div class="containerTextName" data-id="${codeUser}">${firstName} ${lastName}</div>
                        </div>
                        
                    </div>
                    
                    <div class="containerBody">
                    ${content}
                    </div>
                    
                    </div>
                    
                </div>
            </li>
        `;
        
        listChat.insertAdjacentHTML("beforeend", codeDirect);
    }
    
    let codemore = `
        <div class="containerLoadMorePost">
        <div id="loadMorePost" class="loadMorePost">more post</div>
        </div>
    `;
    listChat.insertAdjacentHTML("beforeend", codemore);
    
    document.getElementById( "loadMorePost" ).addEventListener("click" , function() {
        
        NUMBER_PAGE += 1;
        
        loadMoreChats();
        
    });
    
    
    
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


function clickSkillMore( idBig ) {
    
    var big = document.getElementById( idBig );
    big.classList.toggle("hide");
    
}




function clickGoToProjectWork( codeProjectSkill ) {
    
    mainApp.goToProjectWork( myProject.code , codeProjectSkill );
    
}


function clickGoToProjectMy() {
    
    mainApp.goToProjectMy( moduleUserLog.getUser().userCode, myProject.code, myProject.codeUser );
    
}










