
import * as moduleUserLog from './moduleUserLog.js';

import Main from './moduleMain.js';

import Project, { ProjectFull , TaskStatus } from './moduleProject.js';
import Post, { PostList } from './modulePost.js';



let mainApp = new Main();
let myProject = null;
let myPostList = null;


const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";



const COUNT_ROW = 5;
let NUMBER_PAGE = 1;



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
        
        myProject = new ProjectFull( result );
        
        myPostList = new PostList();
        myPostList.fillListPost( result );
        
        mainApp.callNotification();
        
        return result;
        
    }).then( (result) => {
        
        fillListData( result );
        
        fillShowDataTeam();
        fillProjectCharts();
        fillProjectMember();
        fillProjectTask();
        fillProjectDirect();
        fillProjectChat();
        
        setPermissionEdit( moduleUserLog.getUser().userCode === myProject.codeUser );
        
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
    
    skillname.textContent = myProject.listSkills[0].nameSkill;
    skillcounttask.textContent = myProject.listTasks.length;
    skillcountmembers.textContent = myProject.listMembers.length;
    skilldescription.textContent = myProject.listSkills[0].description;
    
}

function fillProjectMember() {
    
    let listMemberTeam = document.getElementById('listMemberTeam');
    listMemberTeam.innerHTML = "";
    
    
    const myProjectMembers= myProject.listMembers;

    
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
    
    const myProjectTasks = myProject.listTasks;

    
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
            
            if( codeStatus == enumTaskStatus.New ) {
                classTask = "containerTaskAll";
            } else if( codeStatus == enumTaskStatus.Underway ) {
                classTask = "containerTaskAll";
                colorTaskStatus = "taskMe";
            } else if( codeStatus == enumTaskStatus.WaitingApproval ) {
                classTask = "containerTaskDone";
                colorTaskStatus = "taskWait";
            } else if( codeStatus == enumTaskStatus.WaitingModification ) {
                classTask = "containerTaskAll";
                colorTaskStatus = "taskReturn";
            } else if( codeStatus == enumTaskStatus.Delivered ) {
                classTask = "containerTaskDone";
                taskDone = "done";
            }
            
        } else {
            colorTaskStatus = "taskNotMe"
            if( codeStatus == enumTaskStatus.Delivered ) {
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
        
        if( codeStatus == enumTaskStatus.Delivered) {
            
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
    
    if( codeStatus == enumTaskStatus.New) {
        
        const codeItem = `
            
            <div id="${nameButtonTaskTake}" class="divsvg">
                <svg class="svgfill">
                    <use xlink:href="#svgtakein"/>
                </svg>
            </div>
            
        `;
        
        containerButtons.insertAdjacentHTML("beforeend", codeItem);
        
        
        document.getElementById( nameButtonTaskTake ).addEventListener("click", function(){
            clickTaskTake( code );
        });
        
    } else {
        
        if( codeUser === moduleUserLog.getUser().userCode ) {
            
            if( codeStatus == enumTaskStatus.Underway ) {
            
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
                    clickTaskCancel( code );
                });
                document.getElementById( nameButtonTaskDone ).addEventListener("click", function(){
                    clickTaskDone( code );
                });
                
            } else if( codeStatus == enumTaskStatus.WaitingApproval ) {
                
                
            } else if( codeStatus == enumTaskStatus.WaitingModification ) {
                
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
                    clickTaskCancel( code );
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
    
    const numTask = myProject.listTasks.length;
    
    let numTaskDone = 0;
    let numTaskWork = 0;
    for(let i=0; i< numTask; i++ ) {
        
        const codeStatus = myProject.listTasks[i].codeStatus  ;
        if( codeStatus == enumTaskStatus.Delivered ) {
            ++numTaskWork;
            ++numTaskDone;
        } else if( codeStatus == enumTaskStatus.Underway || codeStatus == enumTaskStatus.WaitingApproval || codeStatus == enumTaskStatus.WaitingModification ) {
            ++numTaskWork;
        }
    }
    
    
    drawChartStatus( numTask , numTaskWork , numTaskDone );
    
    
    /*------------*/
    
    
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
    
    const myProjectDirects = myProject.listDirects;

    
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
    
    const myProjectPosts = myPostList.getListPost();
    
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
    
    const pathCreatePost = mainApp.pathDomain + "api/createPost.php";
    
    var codeProjectSkill = mainApp.getValCookie("codeprojectskill");
    
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
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("codeUser", moduleUserLog.getUser().userCode );
        formData.append("codeProject", myProject.code );
        formData.append("codeProjectSkill", codeProjectSkill );
        formData.append("content", content );
        formData.append("within", "work");
        
        mainApp.publishPost( "work" , content , moduleUserLog.getUser().userCode , myProject.code , codeProjectSkill ).then( (result) => {
            
            document.getElementById('inputPublish').value = "";
            
            refreshPosts();
            
        }).then( (result) => {
            
        } ).catch( (reject) => {
            
        });
        
    } else {
        
    }

}

function refreshPosts() {
    
    const pathDataPost = mainApp.pathDomain + "api/readDataPosts.php";
    
    var codeProjectSkill = mainApp.getValCookie("codeprojectskill");
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    formData.append("within" , "work" );
    formData.append("codeProject", myProject.code );
    formData.append("codeProjectSkill", codeProjectSkill );
    
    mainApp.send("POST", pathDataPost , headers , formData ).then( ( result ) => {
        
        myPostList.fillListPost( result );
        
    }).then( (result) => {
        
        fillProjectChat();
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if(codeError == 410) {
            widgetErrorSession();
        } else if(codeError == 420) {
            widgetErrorDataPost();
        } else if(codeError == 430) {
            fillErrorFromData();
        } else {
            widgetErrorNon();
        }
        
        
    });
    
}

function loadMoreChats() {
    
    const pathDataMorePost = mainApp.pathDomain + "api/readDataPostPagination.php";
    
    var codeProjectSkill = mainApp.getValCookie("codeprojectskill");
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    formData.append("numberPage" , NUMBER_PAGE );
    formData.append("action" , "work" );
    formData.append("codeProject" , myProject.code );
    formData.append("codeProjectSkill" , codeProjectSkill );
    
    
    mainApp.send("POST", pathDataMorePost , headers , formData ).then( ( result ) => {
        
        myPostList.fillListPost( result );
        
    }).then( (result) => {
        
        fillMoreChat();
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        
        if(codeError == 410) {
            widgetErrorSession();
        } else if(codeError == 420) {
            widgetErrorDataPost();
        } else if(codeError == 430) {
            fillErrorFromData();
        } else {
            widgetErrorNon();
        }
        
    });
    
}

function fillMoreChat() {
    
    let listChat = document.getElementById('listChat');
    listChat.innerHTML = "";
    
    const myProjectPosts = myPostList.getListPost();
    
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







function createContainerItem( nameClass , smallStatus , containerSmallBody , containerSmallButton , containerBig , containerSmallHeader ) {
    
    let codeItem = `
        <li>
        <div class="containerItem ${nameClass}">
            
            <div id="containerSmall" class="containerSmall ${smallStatus}">
                
                ${containerSmallHeader}
                
                <div class="containerBody">
                    ${containerSmallBody}
                </div>
                
                <div class="containerButtons">
                    ${containerSmallButton}
                </div>
            </div>
            
            <div id="containerBig" class="containerBig hide">
                ${containerBig}
            </div>
            
        </div>
        </li>
    `;
    
    return codeItem;
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



function clickMemberMore( e ) {
    
    event.stopPropagation();
    
    var big = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("containerBig")[0];
    var big2 = document.getElementById("containerBig");
    
    if(big.classList.contains("hide"))
    {
        big.classList.remove("hide");
    }
    else
    {
        big.classList.add("hide");
    }
    
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
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeTask", codeTask );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("codeStatus", enumTaskStatus.Underway );
    
    mainApp.send( "POST", pathUpdateTaskStatus , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}
function clickTaskCancel( codeTask ) {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeTask", codeTask );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("codeStatus", enumTaskStatus.New );
    
    mainApp.send( "POST", pathUpdateTaskStatus , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}
function clickTaskDone( codeTask ) {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeTask", codeTask );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("codeStatus", enumTaskStatus.WaitingApproval );
    
    mainApp.send( "POST", pathUpdateTaskStatus , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

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
    
    const myProjectTasks = myProject.listTasks;

    
    for(var i=0; i<myProjectTasks.length; i++) 
    {
        const id = myProjectTasks[i].id;
        const code = myProjectTasks[i].code;
        const name = myProjectTasks[i].name;
        const codeStatus = myProjectTasks[i].codeStatus;
        const codeUser = myProjectTasks[i].codeUser;
        
        if( codeUser == moduleUserLog.getUser().userCode && codeStatus != enumTaskStatus.Delivered ) {
            countTaskMe = countTaskMe + 1;
        }
        
    }
    
    
    let txtLeave = ``;
    if(countTaskMe > 0) {
        txtLeave = `هل بالتأكيد تريد مغادرة المشروع؟ .</br>
        لديك ${countTaskMe} مهام لم يتم الإنتهاء منها`;
    } else {
        txtLeave = `هل بالتأكيد تريد مغادرة المشروع؟`;
    }
    
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
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
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("notification");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonProjectLeave").addEventListener("click", leavePoject );
    document.getElementById("buttonProjectCancel").addEventListener("click", cancel );
}

function leavePoject() {
    
    const pathLeaveProject = mainApp.pathDomain + "api/exitMember.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    
    mainApp.send( "POST", pathLeaveProject , headers, formData ).then( (result) => {
        
        window.location.href = this.pathDomain + "home";
     
    } ).catch( (reject) => {

        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            txt = "انتهت الجلسة,";
        } else if(codeError == 420) {
            txt = "الرجاء قم بلمئ كافة البيانات";
        } else if(codeError == 450) {
            let txt = "خطأ غير معروف, لم يتم تهيئة المهام وحذف العضو";
        } else if(codeError == 451) {
            let txt = "خطأ غير معروف, تم تهيئة المهام لكن لم يتم حذف العضو";
        } else {
            txt = "خطأ غير معروف !";
        }
        
        alert(txt);
    } );
    
}


function refreshListSkillsAndTasks() {
    
    const pathReadProjectSkillsTasks = mainApp.pathDomain + "api/readDataProjectWorkSkillsTasks.php";
    
    
    var codeProject = mainApp.getValCookie("codeproject");
    var codeProjectSkill = mainApp.getValCookie("codeprojectskill");
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeProjectSkill", codeProjectSkill );
    
    mainApp.send( "POST", pathReadProjectSkillsTasks , headers, formData ).then( (result) => {
        
        myProject.fillSkillsAndTasks( result );
        
        fillShowDataTeam();
        fillProjectTask();
        fillProjectMember();
        fillProjectDirect();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            txt = "انتهت الجلسة,";
        } else if(codeError == 420) {
            txt = "الرجاء قم بلمئ كافة البيانات";
        } else if(codeError == 450) {
            let txt = "خطأ غير معروف, حاول مرة أخرى";
        } else {
            txt = "خطأ غير معروف !";
        }
        
        alert(txt);
    } );
}





let listTaskStatus = [];
const enumTaskStatus = {};


function fillListData( data ) {
    
    listTaskStatus = [];
    
    const dataTaskStatus = ( data["taskStatus"] === undefined) ? [] : data["taskStatus"] ;
    
    for(var i=0; i<dataTaskStatus.length; i++) {
        listTaskStatus.push( new TaskStatus( dataTaskStatus[i] ) );
    }
    
    
    
    createEnumStatusTask();
}
function createEnumStatusTask() {
    
    for(let i=0; i<listTaskStatus.length; i++ ) {
        enumTaskStatus[listTaskStatus[i].description] = listTaskStatus[i].code;
    }
    
    enumTaskStatus.getName = function( indx ) {
        for(var i=0; i<listTaskStatus.length; i++) {
            if( listTaskStatus[i].code == indx ) {
                
                return listTaskStatus[i].name;
            }
        }
    };
    
}



















