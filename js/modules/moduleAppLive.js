import * as moduleUserLog from './moduleUserLog.js';

import Main from './moduleMain.js';

import Project, { ProjectFull , TaskStatus } from './moduleProject.js';
import Post, { PostList } from './modulePost.js';


let mainApp = new Main();
let myProject = null;
let myPostList = null;


const COUNT_ROW = 5;
let NUMBER_PAGE = 1;


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
    
    const pathDataLiveProject = mainApp.pathDomain + "api/readDataLiveProject.php";
    
    var codeProject = mainApp.getValCookie("codeproject");
    
        
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", codeProject );
    formData.append("countRow" , COUNT_ROW );
    
    mainApp.send("POST", pathDataLiveProject , headers , formData ).then( ( result ) => {
        
        myProject = new ProjectFull( result );
        
        myPostList = new PostList();
        myPostList.fillListPost( result );
        
        return result;
        
    }).then( (result) => {
        
        fillListData( result );
        
        fillShowData();
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
        
        let urlImage = mainApp.checkUrlImageProject( myProject["imageProfile"] );
        
        let elImage = document.getElementById("imgProfileProject").src = urlImage;
        let elName = document.getElementById("txetNameProject").textContent = myProject["name"];
        let elDesc = document.getElementById("textDescription").textContent = myProject["description"];
        
        calcProgress();
        
    }
    
    
}

function calcProgress() {
    
    const myProjectTasks = myProject.listTasks;
    const numTasks = myProjectTasks.length;
    
    let numTaskDone = 0;
    for(let i=0; i<numTasks; ++i) {
        
        if( myProjectTasks[i].codeStatus == enumTaskStatus.Delivered ) {
            numTaskDone += 1;
        }
        
    }
    
    let numProgress = ( 100/numTasks ) * numTaskDone + 10;
    
    let outterProgress = document.getElementById("outterProgress");
    outterProgress.style.width = `${numProgress}%`;
    
}

function fillProjectMember() {
    
    let listMember = document.getElementById('listMember');
    listMember.innerHTML = "";
    
    let numberMember = document.getElementById("numberMember");
    numberMember.innerHTML = "";
    
    const myProjectMembers = myProject.listMembers;
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
    
    const myProjectPosts = myPostList.getListPost();
    
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

function fillProjectSkills() {

    let listSkill = document.getElementById('listSkill');
    listSkill.innerHTML = "";
    
    const myProjectSkills = myProject.listSkills;
    

    
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
    
    const pathCreatePost = mainApp.pathDomain + "api/createPost.php";
    
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
        formData.append("content", content );
        
        mainApp.publishPost( "live" , content , moduleUserLog.getUser().userCode , myProject.code , 0 ).then( (result) => {
            
            document.getElementById('inputPublish').value = "";
            refreshPosts();
            
        }).then( (result) => {
            
            fillProjectChat();
            
        } ).catch( (reject) => {
            // Mode Error
        });
        
    } else {
        
    }

}




function loadMoreChats() {
    
    const pathDataMorePost = mainApp.pathDomain + "api/readDataPostPagination.php";
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    formData.append("numberPage" , NUMBER_PAGE );
    formData.append("action" , "live" );
    formData.append("codeProject" , myProject.code );
    
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

function refreshPosts() {
    
    const pathDataPost = mainApp.pathDomain + "api/readDataPosts.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    formData.append("within" , "live" );
    formData.append("codeProject", myProject.code );
    
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














