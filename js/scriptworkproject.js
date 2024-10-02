import * as moduleUserLog from './modules/moduleUserLog.js';

import { ProjectTeam } from './modules/moduleProjectClass.js';

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
    document.getElementById('buttonGoToLive').addEventListener("click" , clickGoToLiveProject );
    
    document.getElementById('buttonPublish').addEventListener("click" , clickPublish );
    
    document.getElementById('widgetDivChat').addEventListener("click" , clickWidgetDivChat );
    document.getElementById('coverDivChat').addEventListener("click" , clickCoverDivChat );
    document.getElementById('buttonShowChat').addEventListener("click" , showWidgetChat );
    
    
}


function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_Project() {
    
    var codeProject = mainApp.getValCookie("codeproject");
    var codeProjectSkill = mainApp.getValCookie("codeprojectskill");
    
    const pathDataWorkProject = mainApp.pathDomain + "api/readDataWorkProject.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", codeProject );
    formData.append("codeProjectSkill", codeProjectSkill );
    formData.append("countRow" , COUNT_ROW );
    
    mainApp.send("POST", pathDataWorkProject , headers , formData ).then( ( result ) => {
        
        myProject = new ProjectTeam( result );
        
        return result;
        
    }).then( (result) => {
        
        fillShowDataTeam();
        fillProjectCharts();
        
        fillProjectMember();
        fillProjectTask();
        fillProjectDirect();
        fillProjectChat();
        
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
            
        } else if( codeError == 441 ) {
            
            const msg = "لست عضواً في فريق المهارة !";
            mainApp.codeWraning( msg , "home" );
            
        } else if( codeError == 442 ) {
            
            const msg = "لم يتم تنشيط عضويتك في هذا المشروع ! ";
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



function setPermissionEdit( isMe  ) {
    
    let containerButtonHeaderView = document.getElementById("containerButtonsWidgetHeaderView");
    
    if( !isMe ) {
        
        let codeButtonLeave = `
            <div id="buttonLeave" class="buttons leave">
             الخروج من المشروع
            </div>
        `;
        
        containerButtonHeaderView.insertAdjacentHTML("afterbegin", codeButtonLeave);
        
        document.getElementById('buttonLeave').addEventListener("click" , clickLeaveProject );
        
    } else {
        
        
    }
}





function fillShowDataTeam() {
    
    let skillname = document.getElementById("skillname");
    let skillcounttask = document.getElementById("skillcounttasks");
    let skillcountmembers = document.getElementById("skillcountmembers");
    let skilldescription = document.getElementById("skilldescription");
    
    let codeSkill = myProject.getListProjectSkill()[0].codeSkill;
    let nameSkill = myProject.getListProjectSkill()[0].nameSkill;
    
    if( codeSkill == null ) {
        nameSkill = "أخرى";
    } else {
        nameSkill = myProject.getListProjectSkill()[0].nameSkill;
    }
    
    skillname.textContent = nameSkill;
    skilldescription.textContent = myProject.getListProjectSkill()[0].description;
    skillcounttask.textContent = myProject.getListProjectTask().length;
    skillcountmembers.textContent = myProject.getListProjectMember().length;
    
}

function fillProjectMember() {
    
    let listMemberTeam = document.getElementById('listMemberTeam');
    listMemberTeam.innerHTML = "";
    
    
    const myProjectMembers= myProject.getListProjectMember();
    
    for(var i=0; i<myProjectMembers.length; i++) 
    {
        const code = myProjectMembers[i].code;
        const codeUser = myProjectMembers[i].codeUser;
        const codeProject = myProjectMembers[i].codeProject;
        const codeProjectSkill = myProjectMembers[i].codeProjectSkill;
        const message = myProjectMembers[i].message;
        const codeStatus = myProjectMembers[i].codeStatus;
        
        const firstName = myProjectMembers[i].firstName;
        const lastName = myProjectMembers[i].lastName;
        const about = myProjectMembers[i].about;
        const imageProfile = myProjectMembers[i].imageProfile;
        
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        
        let nameSkill = (codeProjectSkill == null) ? "لم يتم التحديد" : myProjectMembers[i].nameSkill;
        
        
        
        let nameRowMember = "rowMember"+i;
        let nameContainerMemberSmall = "containerMemberSmall"+i;
        let nameContainerMemberProfile = "containerMemberProfile"+i; 
        let nameContainerMemberBody = "containerBodyMember"+i;
        
        
        let codeoption = `
        <li>
        <div id="${nameRowMember}" class="containerItem containerItemMember containerItemMemberTeam">
            
            <div id="${nameContainerMemberSmall}" class="containerSmall containerSmallMember">
                
                <div id="${nameContainerMemberProfile}" class="containerProfile">
                    <div class="containerProfileImage">
                        <img src="${urlImage}">
                    </div>
                    
                    <div class="containerProfileText">
                        <div class="containerTextName" data-id="${codeUser}">${firstName} ${lastName}</div>
                        <div class="containerTextAbout">${about}</div>
                    </div>
                </div>
                
                <div id="${nameContainerMemberBody}" class="containerBody member">
                    <div class="containerContent member">${nameSkill}</div>
                </div>
                
                
            </div>
            
        </div>
        </li>
        `;
        
        listMemberTeam.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameContainerMemberBody ).addEventListener("click", function() {
            event.stopPropagation();
        });
        document.getElementById( nameContainerMemberProfile ).addEventListener("click", function() {
            mainApp.goToProfile( codeUser );
        });
            
        
    }
}

function fillProjectTask() {
    
    let listTaskAll = document.getElementById('listTaskAll');
    listTaskAll.innerHTML = "";
    
    let listTaskMe = document.getElementById('listTaskMe');
    listTaskMe.innerHTML = "";
    
    let listTaskDone = document.getElementById('listTaskDone');
    listTaskDone.innerHTML = "";
    
    
    const myProjectTasks = myProject.getListProjectTask();
    
    for(var i=0; i<myProjectTasks.length; i++) 
    {
        const id = myProjectTasks[i].id;
        const code = myProjectTasks[i].code;
        let name = myProjectTasks[i].name;
        const description = myProjectTasks[i].description;
        const codeProjectSkill = myProjectTasks[i].codeProjectSkill;
        const codeUser = myProjectTasks[i].codeUser;
        const note = myProjectTasks[i].note;
        
        const codeStatus = myProjectTasks[i].codeStatus;
        
        
        
        let colorTaskStatus = "";
        let classTask = "";
        let taskDone = "";
        
        if( codeUser === moduleUserLog.getUser().userCode || codeUser === null) { 
            
            if( codeStatus == myProject.getEnumStatusTask().New ) {
                classTask = "containerTaskAll";
            } else if( codeStatus == myProject.getEnumStatusTask().Underway ) {
                classTask = "containerTaskAll";
                colorTaskStatus = "taskMe";
            } else if( codeStatus == myProject.getEnumStatusTask().WaitingApproval ) {
                classTask = "containerTaskDone";
                colorTaskStatus = "taskWait";
            } else if( codeStatus == myProject.getEnumStatusTask().WaitingModification ) {
                classTask = "containerTaskAll";
                colorTaskStatus = "taskReturn";
            } else if( codeStatus == myProject.getEnumStatusTask().Delivered ) {
                classTask = "containerTaskDone";
                taskDone = "done";
            }
            
        } else {
            colorTaskStatus = "taskNotMe"
            if( codeStatus == myProject.getEnumStatusTask().Delivered ) {
                taskDone = "done";
            }
        }
        
        
        
        let nameRowTask = "rowTask"+i;
        let nameContainerTaskSmall = "containerTaskSmall"+i;
        let nameContainerTaskBig = "containerTaskBig"+i;
        let nameContainerBody = "containerBodyTask"+i;
        
        let nameContainerButton = "containerButtonTask"+i;
        let nameContainerButtonsEdit = "containerButtonsTaskEdit"+i;
        
        let nameButtonTaskMore = "buttonTaskMore"+i;
        
        

        let codeoption = `
        <li>
        <div id="${nameRowTask}" class="containerItem containerItemTask ${classTask}">
            
            <div id="${nameContainerTaskSmall}" class="containerSmall containerSmallTask ${colorTaskStatus}">
                
                
                <div id="${nameContainerBody}" class="containerBody">
                    <div class="containerContent ${taskDone}">${name}</div>
                </div>
                
                <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">

                    
                </div>
                
                <div id="${nameContainerButton}" class="containerButtons">
                    
                    <div id="${nameButtonTaskMore}" class="divsvg">
                        <svg class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>
                    
                </div>
                
            </div>
            
            <div id="${nameContainerTaskBig}" class="containerBig hide">
            
                <div class="containerHeader">
                    <div class="containerContent">${name}</div>
                </div>
                
                <div class="containerBody">
                    <div class="containerContent">${description}</div>
                </div>
                
            </div>
            
        </div>
        </li>
        `;
        
        if( codeStatus == myProject.getEnumStatusTask().Delivered) {
            
            listTaskDone.insertAdjacentHTML("beforeend", codeoption);
            
        } else {
            
            if( codeUser === moduleUserLog.getUser().userCode ) {
                listTaskMe.insertAdjacentHTML("beforeend", codeoption);
            } else {
                listTaskAll.insertAdjacentHTML("beforeend", codeoption);
            }
            
        }
        
        insertListButtons( i, nameContainerButtonsEdit, code, codeUser, codeStatus, note );
        
        document.getElementById( nameButtonTaskMore ).addEventListener("click" , function() { 
            
            event.stopPropagation();
            
            document.getElementById( nameContainerBody ).classList.toggle("hide");
            document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
            
            clickTaskMore( nameContainerTaskBig ); 
            
        });
        
        
        
    }
}

function insertListButtons( i, idElement, code, codeUser, codeStatus, note ) {
    
    let containerButtons = document.getElementById(idElement);
    
    let nameButtonTaskExclamation = "buttonTaskExclamation"+i; 
    let nameButtonTaskTake = "buttonTaskTake"+i; 
    let nameButtonTaskLeave = "buttonTaskLeave"+i; 
    let nameButtonTaskDone = "buttonTaskDone"+i; 
    
    if( codeStatus == myProject.getEnumStatusTask().New) {
        
        const codeItem = `
            
            <div id="${nameButtonTaskTake}" class="divsvg">
                <svg class="svgfill">
                    <use xlink:href="#svgtakein"/>
                </svg>
            </div>
            
        `;
        
        containerButtons.insertAdjacentHTML("beforeend", codeItem);
        
        
        document.getElementById( nameButtonTaskTake ).addEventListener("click", function() {
            
            clickTaskTake( code );
            
        });
        
    } else {
        
        if( codeUser === moduleUserLog.getUser().userCode ) {
            
            if( codeStatus == myProject.getEnumStatusTask().Underway ) {
            
                const codeItem = `
                    
                    <div id="${nameButtonTaskLeave}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgtakeout"/>
                        </svg>
                    </div>
                    
                    <div id="${nameButtonTaskDone}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgaccepte"/>
                        </svg>
                    </div>
                    
                `;
                
                containerButtons.insertAdjacentHTML("beforeend", codeItem);
                
                
                document.getElementById( nameButtonTaskLeave ).addEventListener("click", function(){
                    clickTaskLeave( code );
                });
                document.getElementById( nameButtonTaskDone ).addEventListener("click", function(){
                    clickTaskDone( code );
                });
                
            } else if( codeStatus == myProject.getEnumStatusTask().WaitingApproval ) {
                
                
            } else if( codeStatus == myProject.getEnumStatusTask().WaitingModification ) {
                
                const codeItem = `
                    
                    <div id="${nameButtonTaskExclamation}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgexclamation"/>
                        </svg>
                    </div>
                    
                    <div id="${nameButtonTaskLeave}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgtakeout"/>
                        </svg>
                    </div>
                    
                    <div id="${nameButtonTaskDone}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgaccepte"/>
                        </svg>
                    </div>
                    
                `;
                
                containerButtons.insertAdjacentHTML("beforeend", codeItem);
                
                
                document.getElementById( nameButtonTaskExclamation ).addEventListener("click", function(){
                    clickTaskShowNote( code , note );
                });
                document.getElementById( nameButtonTaskLeave ).addEventListener("click", function(){
                    clickTaskLeave( code );
                });
                document.getElementById( nameButtonTaskDone ).addEventListener("click", function(){
                    clickTaskDone( code );
                });
                
                
            } else {
                
            }
            
        } else {
            
        }
        
    }
}


function fillProjectCharts() {
    
    let [ countAllStatus , countWorkingStatus , countDoneStatus ] = myProject.getListCountStatus();
    
    drawChartStatus( countAllStatus , countWorkingStatus , countDoneStatus );
    
    
    
}


function drawChartStatus( numTask , numTaskWork , numTaskDone ) {
    
    const canvasType = document.getElementById("canvasBoardStatus");
    const ctx = canvasType.getContext("2d");
    


    //nums
    const pointcenter = 50;
    const pointx = canvasType.width/2;
    const pointy = canvasType.height/2;
    const red = 75 ;
    
    let midWork = (numTaskWork/numTask) * 2;
    let midDone = (numTaskDone/numTask) * 2;
    
    let drawStart = 0;
    let drawEndWork = midWork*Math.PI;
    let drawEndDone = midDone*Math.PI;
    let currentAngle = 0;
    

    // draw
    
    // Inner
    ctx.beginPath();
    ctx.arc(pointx, pointy, red, 0, 2*Math.PI);
    
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#DDE6ED";
    ctx.stroke();
    
    // Outter 1 Work
    ctx.beginPath();
    ctx.arc(pointx, pointy, red, drawStart, drawEndWork );
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#8babba";
    ctx.stroke();
    
    // Outter 2 Done
    ctx.beginPath();
    ctx.arc(pointx, pointy, red, drawStart, drawEndDone );
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#435B66";
    ctx.stroke();
    
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



function clickPublish() {
    
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
                <div class="containerChat containerItemChat">
                    
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





function clickSkillMore( e ) {
    
    var big = document.getElementById( idBig );
    big.classList.toggle("hide");
    
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

function clickWidgetDivChat() {
    
    let box = document.getElementById("widgetDivChat");
    box.classList.add("close");
    
}
function clickCoverDivChat( event ) {
    
    event.stopPropagation();
    
}

function showWidgetChat() {
    
    let box = document.getElementById("widgetDivChat");
    box.classList.remove("close");
    
}


function clickTaskShowNote( codeTask , note ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>أسباب إعادة المهمة</h2>
        </div>
        <div class="divBody">
            
            <div class="containerText">${note}</div>
            
        </div>
        
        <div class="divFooter">
            <div id="buttonAddSkillCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("notification");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonAddSkillCancel").addEventListener("click", cancel );
}

function clickTaskTake( codeTask ) {
    
    myProject.takeTask( codeTask ).then( (result) => {
        
        refreshListTask();
        
        cancel();
        mainApp.codeWraningNotification( "تم إستلام المهمة.", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else if(codeError == 451) {
            
            txt = "خطأ, هذه المهمة غير متاحة";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
    } );
    
}
function clickTaskLeave( codeTask ) {
    
    myProject.leaveTask( codeTask ).then( (result) => {
        
        refreshListTask();
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else if(codeError == 451) {
            
            txt = "خطأ, هذه المهمة تم إنجازها";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
    } );
    
}
function clickTaskDone( codeTask ) {
    
    myProject.doneTask( codeTask ).then( (result) => {
        
        refreshListTask();
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
    } );
    
}
function clickTaskMore( idBig ) {
    
    var big = document.getElementById( idBig );
    big.classList.toggle("hide");
    
}


function viewSkillAndDirect() {
    
    var cardSkill = document.getElementById("cardSkill") ;
    var cardDirect = document.getElementById("cardDirect") ;
    
    cardSkill.classList.toggle("hide");
    cardDirect.classList.toggle("hide");
}


function clickGoToLiveProject() {
    
    mainApp.goToProjectLive( myProject.code );
}

function clickLeaveProject() {
    
    
    let countTaskMe = 0; 
    let countTaskMeDone = 0; 
    
    const myProjectTasks = myProject.getListTask();

    
    for(var i=0; i<myProjectTasks.length; i++) 
    {
        const id = myProjectTasks[i].id;
        const code = myProjectTasks[i].code;
        const name = myProjectTasks[i].name;
        const codeStatus = myProjectTasks[i].codeStatus;
        const codeUser = myProjectTasks[i].codeUser;
        
        if( codeUser == moduleUserLog.getUser().userCode ) {
            
            countTaskMe = countTaskMe + 1;
            
            if(codeStatus == myProject.getEnumStatusTask().Delivered) {
                countTaskMeDone = countTaskMeDone + 1;
            }
        }
        
    }
    
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>مغادرة المشروع</h2>
        </div>
        <div class="divBody">
            
            <div class="containerText">هل بالتأكيد تريد مغادرة المشروع؟</div>
            
        </div>
        
        <div class="divFooter">
            <div id="buttonProjectLeave" class="buttons btnLeave"">مغادرة</div>
            <div id="buttonProjectCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("notification");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonProjectLeave").addEventListener("click", function() {
        if( countTaskMe > 0 ) {
            
            let txtLeave = `لديك ${countTaskMe} مهام لم يتم الإنتهاء منها</br>
            هل بالتأكيد تريد مغادرة المشروع؟
            `;
            
            if(countTaskMeDone > 0) {
                
                txtLeave = `لديك ${countTaskMe} مهام</br>
                منها ${countTaskMeDone} مهام تم إنجازها.</br>
                هل بالتأكيد تريد مغادرة المشروع؟ 
                `;
                
            }
            
            let code = `
                <div class="divHeader">
                    <h2>مغادرة المشروع</h2>
                </div>
                <div class="divBody">
                    
                    <div class="containerText">${txtLeave}</div>
                    
                </div>
                
                <div class="divFooter">
                    <div id="buttonProjectLeave" class="buttons btnLeave"">مغادرة</div>
                    <div id="buttonProjectCancel" class="buttons btnCancel neg"">إلغاء</div>
                </div>
            `;
            
            elementLightBox.innerHTML = code;
            
            document.getElementById("buttonProjectLeave").addEventListener("click", function() {
                
                leaveProject();
                
            } );
            
            document.getElementById("buttonProjectCancel").addEventListener("click", cancel );
            
        } else {
            
            leaveProject();
            
        }
        
        
    } );
    
    document.getElementById("buttonProjectCancel").addEventListener("click", cancel );
}

function leaveProject() {
    
    myProject.leaveProject().then( (result) => {
        
        window.location.href = this.pathDomain + "home";
     
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
            
        } else if(codeError == 451) {
            
            txt = "خطأ غير معروف, حاول مرة أخرى !";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    } );
    
}


function refreshListTask() {
    
    myProject.refreshDataTask().then( (result) => {
        
        myProject.fillProjectTask( result );
        myProject.fillDataTeamDashboardTask( result );
        
    } ).then( (result) => {
        
        fillShowDataTeam();
        fillProjectTask();
        fillProjectCharts();
        
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
        
        // alert(txt);
        
    } );
}




