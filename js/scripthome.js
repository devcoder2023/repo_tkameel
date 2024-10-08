
import * as moduleUserLog from './modules/moduleUserLog.js';

import Home from './modules/moduleHomeClass.js';

import Main from './modules/moduleMain.js';


let mainApp = new Main();
let myHome = null;
let myPostList = null;


const COUNT_ROW = 5;
let NUMBER_PAGE = 1;
let NUMBER_PAGE_NOTIFICATION = 1;







window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});



export function initApp( data ) {
    
    init_User();
    
    init_pageHome();
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    document.getElementById('buttonPublish').addEventListener("click" , clickPublish );
}


function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_pageHome() {
    
    const pathDataHome = mainApp.pathDomain + "api/readDataHome.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    
    mainApp.send("POST", pathDataHome , headers , formData ).then( ( result ) => {
    
        myHome = new Home( result );
        
    }).then( (result) => {
        
        fillFriend();
        fillSuggestions();
        
        fillPost();
        fillProject();
        
        mainApp.callNotification();
        
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
            
        } else {
            
            const msg = "خطأ غير معروف !";
            mainApp.codeWraning( msg , "home" );
            
        }
        
        
    });
}







function fillFriend() {
    
    let listFollower = document.getElementById('listFollower');
    listFollower.innerHTML = "";
    
    const myUsers = myHome.getListFriend();
    
    for(var i=0; i<myUsers.length; i++) 
    {
        const id = myUsers[i].id;
        const code = myUsers[i].code;
        const firstName = myUsers[i].firstName;
        const lastName = myUsers[i].lastName;
        const email = myUsers[i].email;
        const about = myUsers[i].about;
        const codeType = myUsers[i].codeType;
        const codeStatus = myUsers[i].codeStatus;
        const imageProfile = myUsers[i].imageProfile;
        
        const nameType = myUsers[i].nameType;
        const nameStatus = myUsers[i].nameStatus;
        
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        
        let nameIdSmall = "containerSmallFriend"+i;
        let nameIdMember = "idMember"+i; 
        
        let codeoption = `
            <li>
                
                <div class="containerItem containerItemUser">
                    
                    <div id="${nameIdSmall}" class="containerSmall containerSmallUser">
                        
                        <div class="containerProfile">
                            <div class="containerProfileImage">
                                <img src="${urlImage}">
                            </div>
                            
                            <div class="containerProfileText">
                                <div class="containerTextName" data-id="${id}">
                                    <span>${firstName} ${lastName}</span>
                                </div>
                                
                                
                                <div class="containerTextAbout">
                                    <span>${about}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </li>
        `;
        
        listFollower.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameIdSmall ).addEventListener("click" , function() {
            
            mainApp.goToProfile( code );
            
        });
        
    }
    
    
}
function fillSuggestions() {
    
    let containerList = document.getElementById('containerListSuggestions');
    let listSuggestions = document.getElementById('listSuggestions');
    listSuggestions.innerHTML = "";
    
    const myUsers = myHome.getListSuggestion();
    
    for(var i=0; i<myUsers.length; i++) 
    {
        const id = myUsers[i].id;
        const code = myUsers[i].code;
        const firstName = myUsers[i].firstName;
        const lastName = myUsers[i].lastName;
        const email = myUsers[i].email;
        const about = myUsers[i].about;
        const codeType = myUsers[i].codeType;
        const codeStatus = myUsers[i].codeStatus;
        const imageProfile = myUsers[i].imageProfile;
        
        const nameType = myUsers[i].nameType;
        const nameStatus = myUsers[i].nameStatus;
        
        
        let urlImage = mainApp.checkUrlImage( imageProfile );

        
        let nameIdSmall = "containerSmallSuggestions"+i;
        let nameIdMember = "idMember"+i; 
        
        let codeoption = `
            <li>
                
                <div class="containerItem containerItemUser containerItemUserSuggestions">
                    
                    <div id="${nameIdSmall}" class="containerSmall containerSmallUser">
                        
                        <div class="containerProfile">
                            <div class="containerProfileImage">
                                <img src="${urlImage}">
                            </div>
                            
                            <div class="containerProfileText">
                            
                                <div class="containerTextName" data-id="${id}">
                                    <span>${firstName} ${lastName}</span>
                                </div>
                                
                                <div class="containerTextAbout">
                                    <span>${about}</span>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                        <div class="containerButtons">
                            
                            <div id="${nameIdMember}" class="divsvg third">
                                <svg class="svgfill">
                                    <use xlink:href="#svgaddfriend"/>
                                </svg>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </li>
        `;
        
        listSuggestions.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameIdMember ).addEventListener("click" , function() {
            
            clickFollowUser( code ) ;
            
            event.stopPropagation();
            
        });
        document.getElementById( nameIdSmall ).addEventListener("click" , function() {
            
            mainApp.goToProfile( code );
            
        });
    }
    
    containerList.classList.remove("skeleton");
}


function fillFollow() {
    
    let listFollower = document.getElementById('listFollower');
    listFollower.innerHTML = "";
    
    let listSuggestions = document.getElementById('listSuggestions');
    listSuggestions.innerHTML = "";
    
    const myUsers = myHome.getListFollow();
    
    for(var i=0; i<myUsers.length; i++) 
    {
        
        const id = myUsers[i].id;
        const code = myUsers[i].code;
        const firstName = myUsers[i].firstName;
        const lastName = myUsers[i].lastName;
        const email = myUsers[i].email;
        const about = myUsers[i].about;
        const idType = myUsers[i].idType;
        const idStatus = myUsers[i].idStatus;
        const imageProfile = myUsers[i].imageProfile;
        
        const nameType = myUsers[i].nameType;
        const nameStatus = myUsers[i].nameStatus;
        
        const isFriend = myUsers[i].isFriend;
        
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        let nameIdMember = "idMember"+i; 
        
        
        
        
        let codeoption = `
            <li>
                
                <div class="containerItem containerUser">
                    
                    <div id="containerSmall" class="containerSmall">
                        
                        <div class="containerProfile">
                            <div class="containerProfileImage">
                                <img src="${urlImage}">
                            </div>
                            
                            <div class="containerProfileText">
                                <div class="containerTextName" data-id="${id}">${firstName} ${lastName}</div>
                                <div class="containerTextAbout">${about}</div>
                            </div>
                        </div>
                        
                        
                        <div class="containerButtons">
                            
                            <div id="${nameIdMember}" class="divsvg">
                                <svg class="svgfill">
                                    <use xlink:href="#svgaccepte"/>
                                </svg>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </li>
        `;
        
        if( isFriend == true ) {
            listFollower.insertAdjacentHTML("beforeend", codeoption);
        } else {
            listSuggestions.insertAdjacentHTML("beforeend", codeoption);
        }
        
        
    }
        
}

function fillPost() {
    
    let listPost = document.getElementById('listPost');
    listPost.innerHTML = "";
    
    const listPosts = myHome.getListPost();
    
    for(var i=0; i<listPosts.length; i++) 
    {
        const id = listPosts[i].id;
        const code = listPosts[i].code;
        const content = listPosts[i].content;
        const datePost = listPosts[i].datePost;
        const timePost = listPosts[i].timePost;
        const codeUser = listPosts[i].codeUser;
        const codeProject = listPosts[i].codeProject;
        const codeProjectSkill = listPosts[i].codeProjectSkill;
        
        const firstName = listPosts[i].firstName;
        const lastName = listPosts[i].lastName;
        const imageProfile = listPosts[i].imageProfile;
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        
        let nameIdPostContainer = "idPostContainer"+i;
        let nameIdPostComment = "idPostComment"+i;
        let nameIdPostShare = "idPostShare"+i;
        let nameIdPostLike = "idPostLike"+i;
        let nameIdPostOption = "idPostOption"+i
        
        let codeoption = `
            <li>
                <div id="${nameIdPostContainer}"class="containerItem containerItemPost">
                    <div class="containerSmall containerSmallPost">
                        
                        <div class="containerProfile">
                                
                            <div class="containerProfileImage">
                                <img src="${urlImage}">
                            </div>
                            
                            
                            <div class="containerProfileText">
                            
                                <div class="containerTextName" data-id="${codeUser}">
                                    <span>${firstName} ${lastName}</span>
                                </div>
                                
                                <div class="containerTextDate">
                                    <span>${datePost}</span>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <div class="containerButtons">
                        
                            <div id="${nameIdPostComment}" class="divsvg">
                                <svg class="svgstroke hilight">
                                    <use xlink:href="#svgcomment"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostShare}" class="divsvg">
                                <svg class="svgstroke hilight">
                                    <use xlink:href="#svgretweet"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgstroke hilight">
                                    <use xlink:href="#svglike2"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostOption}" class="divsvg">
                                <svg class="svgfull hilight">
                                    <use xlink:href="#svgoptions"/>
                                </svg>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="containerBig">
                        
                        <di class="contentPost">
                            <span>${content}</span>
                        </di>
                    </div>
                    
                </div>
            </li>
        `;
    
        listPost.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameIdPostComment ).addEventListener("click" , function() {
            
        });
        document.getElementById( nameIdPostShare ).addEventListener("click" , function() {
            
        });
        document.getElementById( nameIdPostLike ).addEventListener("click" , function() {
            
        });
        document.getElementById( nameIdPostOption ).addEventListener("click" , function() {
            
            event.stopPropagation();
            
            viewPostOption( nameIdPostContainer , code , codeUser );
            
        });
        
    }
    
    let codemore = `
        <div class="containerLoadMorePost">
            <div id="loadMorePost" class="loadMorePost">تحميل المزيد</div>
        </div>
    `;
    listPost.insertAdjacentHTML("beforeend", codemore);
    
    document.getElementById( "loadMorePost" ).addEventListener("click" , function() {
        
        NUMBER_PAGE += 1;
        
        loadMorePosts();
        
    });
    
}
function viewPostOption( nameIdPostContainer , codePost , codeUserPost ) {
    
    let containerPost = document.getElementById( nameIdPostContainer );
    
    let menuPostOption = document.getElementById( "menuPostOption" );
    
    if( document.contains(menuPostOption) ) {
        
        menuPostOption.remove();
        
        return;
    }
    
    let code = ``;
    
    if( moduleUserLog.getUser().userCode == codeUserPost ) {
        
        const code = `
            
            <div id="menuPostOption" class="menu">
                <div class="body bodyMenu">
                <ul>
                    
                    <li>
                        <div id="menuPostOptionEdit" class="itemMenu">تعديل</div>
                    </li>
    
                    <li>
                        <div id="menuPostOptionRemove" class="itemMenu itemMenuRemove">حذف</div>
                    </li>
                    
                </ul>
                </div>
            </div>
            
        `;
        
        containerPost.insertAdjacentHTML("beforeend", code);
        
        document.getElementById( "menuPostOptionEdit" ).addEventListener("click" , function() {
            
            
            
        });
        
        
        document.getElementById( "menuPostOptionRemove" ).addEventListener("click" , function() {
            
            removePost( codePost , codeUserPost );
            
        });
        
    } else {
        
        const code = `
            
            <div id="menuPostOption" class="menu">
                <div class="body bodyMenu">
                <ul>
                    
                    <li>
                        <div id="menuPostOptionReport" class="itemMenu">الإبلاغ</div>
                    </li>
                    
                </ul>
                </div>
            </div>
        
        `;
        
        containerPost.insertAdjacentHTML("beforeend", code);
        
        document.getElementById( "menuPostOptionReport" ).addEventListener("click" , function() {
            
            
            
        });
        
        
    }
    
}

function removePost( codePost , codeUserPost ) {
    
    myHome.removePost( codePost , codeUserPost ).then( (result) => {
        
        refreshPosts();
        
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
        
    });
    
}

function fillProject() {
    
    
    let listProject = document.getElementById('listProject');
    listProject.innerHTML = "";
    
    const listProjects = myHome.getListProject();

    for(var i=0; i<listProjects.length; i++) {
    
        const id = listProjects[i].id;
        const code = listProjects[i].code;
        const codeUser = listProjects[i].codeUser;
        const name = listProjects[i].name;
        const description = listProjects[i].description;
        const imageProfile = listProjects[i].imageProfile;
        let totalView = listProjects[i].totalView;
        
        const nameCategory = listProjects[i].nameCategory;
        const nameType = listProjects[i].nameType;
        
        
        let urlImage = mainApp.checkUrlImageProject( imageProfile );
        
        
        if( totalView == null ) {
            totalView = 0;
        }
        
        
        let buttonShowProject = "buttonShowProject"+i;
        
        let cardProject = `
            <li>
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
                    
                    <div id="${buttonShowProject}" class="divsvg third">
                        <svg class="svgstroke">
                            <use xlink:href="#svgmoving"/>
                        </svg>
                    </div>
                    
                </div>
            </div>
            </li>
        `;
        
        listProject.insertAdjacentHTML("beforeend", cardProject);
        
        document.getElementById( buttonShowProject ).addEventListener("click" , function() {
            
            mainApp.goToProject( moduleUserLog.getUser().userCode , code , codeUser );
            
        });
    }
    
}



function fillMorePost() {
    
    let listPost = document.getElementById('listPost');
    listPost.innerHTML = "";
    
    const listPosts = myHome.getListPost();
    
    for(var i=0; i<listPosts.length; i++) 
    {
        const id = listPosts[i].id;
        const code = listPosts[i].code;
        const content = listPosts[i].content;
        const datePost = listPosts[i].datePost;
        const timePost = listPosts[i].timePost;
        const codeUser = listPosts[i].codeUser;
        const codeProject = listPosts[i].codeProject;
        const codeProjectSkill = listPosts[i].codeProjectSkill;
        
        const firstName = listPosts[i].firstName;
        const lastName = listPosts[i].lastName;
        const imageProfile = listPosts[i].imageProfile;
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        
        let nameIdPostLike = "idPostLike"+i; 
        
        let codeoption = `
            <li>
                <div class="containerItem containerItemPost">
                    <div class="containerSmall containerSmallPost">
                        
                        <div class="containerProfile">
                                
                            <div class="containerProfileImage">
                                <img src="${urlImage}">
                            </div>
                            
                            
                            <div class="containerProfileText">
                                <div class="containerTextName" data-id="${codeUser}">${firstName} ${lastName}</div>
                                <div class="containerTextDate">${datePost}</div>
                            </div>
                            
                        </div>
                        
                        <div class="containerButtons">
                        
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgstroke">
                                    <use xlink:href="#svgcomment"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgstroke">
                                    <use xlink:href="#svgretweet"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgstroke">
                                    <use xlink:href="#svglike2"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgfull">
                                    <use xlink:href="#svgoptions"/>
                                </svg>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="containerBig">
                        
                        <di class="contentPost">${content}</di>
                    </div>
                    
                </div>
            </li>
        `;
    
        listPost.insertAdjacentHTML("beforeend", codeoption);
        
    }
    
    let codemore = `
        <div class="containerLoadMorePost">
            <div id="loadMorePost" class="loadMorePost">تحميل المزيد</div>
        </div>
    `;
    listPost.insertAdjacentHTML("beforeend", codemore);
    
    document.getElementById( "loadMorePost" ).addEventListener("click" , function() {
        
        NUMBER_PAGE += 1;
        
        loadMorePosts();
        
    });
    
    
}


function clickMenu() {
    
    mainApp.clickMenu();
    
}

function clickMenuNotification() {
    
    mainApp.clickNotification();
    
}






function clickFollowUser( codeFollow ) {
    
    
    myHome.followUser( moduleUserLog.getUser().userCode , codeFollow ).then( (result) => {
        
        
        refreshFollower();
        mainApp.codeWraningNotification( "تم متابعة المستخدم", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى  ";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else if(codeError == 451) {
            
            txt = "خطأ, أنت تتابع هذا المستخدم بالفعل !";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else if(codeError == 452) {
            
            txt = "خطأ, أنت لا تتابع هذا المستخدم !";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
    });
    
    
}

function refreshFollower() {
    
    myHome.refreshFollower().then( ( result ) => {
        
        myHome.fillUsers( result );
        
    }).then( (result) => {
        
        fillFriend();
        fillSuggestions();
        
    } ).catch( (reject) => {
        
        // Mode Error
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["message"];
        
        let txt = "";
        if(codeError == 410) {
            
            txt = "انتهت الجلسة,";
            mainApp.codeWraning( txt , "login" );
            
        } else {
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
        }
        
        
    });
}


function clickPublish() {

    let content = document.getElementById("inputPublish").value;
    let validContent = document.getElementById("validContent");
    
    let [status,textError] = mainApp.validationInput( content , "text" );
    if( !status ) {
        validContent.textContent = textError;
        return;
    } else {
        validContent.textContent = "";
    }
    
    
    
    myHome.publishPost( content , moduleUserLog.getUser().userCode ).then( (result) => {
        
        document.getElementById("inputPublish").value = "";
        
        refreshPosts();
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
        }
        
        // alert(txt);
        
    });
    
}


function refreshPosts() {
    
    myHome.refreshPosts().then( ( result ) => {
        
        myHome.fillListPost( result );
        
    }).then( (result) => {
        
        fillPost();
        
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


function loadMorePosts() {
    
    myHome.loadMorePosts( NUMBER_PAGE ).then( ( result ) => {
        
        myHome.fillListPost( result );
        
    }).then( (result) => {
        
        fillMorePost();
        
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
function refreshProject() {
    
}

