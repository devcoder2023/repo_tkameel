import * as moduleUserLog from './moduleUserLog.js';

import Main from './moduleMain.js';

import User , { UserHome } from './moduleUserHome.js';
import Project , { ProjectFull , ProjectList } from './moduleProject.js';
import Post , { PostList } from './modulePost.js';



let mainApp = new Main();
let userHome = null;
let myProjectList = null;
let myPostList = null;


const COUNT_ROW = 5;
let NUMBER_PAGE = 1;
let NUMBER_PAGE_NOTIFICATION = 1;


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
    
        userHome = new UserHome( result );
        
        myProjectList = new ProjectList();
        myProjectList.fillListProject( result );
        
        myPostList = new PostList();
        myPostList.fillListPost( result );
        
        
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
    
    const myUsers = userHome.listFriend;
    
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
    
    const myUsers = userHome.listSuggestions;
    
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
    
    const myUsers = userHome.listFollow;
    
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
    
    const listPosts = myPostList.getListPost();
    
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
                            
                                <div class="containerTextName" data-id="${codeUser}">
                                    <span>${firstName} ${lastName}</span>
                                </div>
                                
                                <div class="containerTextDate">
                                    <span>${datePost}</span>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <div class="containerButtons">
                        
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgstroke hilight">
                                    <use xlink:href="#svgcomment"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgstroke hilight">
                                    <use xlink:href="#svgretweet"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostLike}" class="divsvg">
                                <svg class="svgstroke hilight">
                                    <use xlink:href="#svglike2"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdPostLike}" class="divsvg">
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
function fillProject() {
    
    
    let listProject = document.getElementById('listProject');
    listProject.innerHTML = "";
    
    const listProjects = myProjectList.getListProject();

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

function clickMenu() {
    
    mainApp.clickMenu();
    
}

function clickMenuNotification() {
    
    mainApp.clickNotification();
    
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
    
    
    
    mainApp.publishPost( "home" , content , moduleUserLog.getUser().userCode , 0 , 0 ).then( (result) => {
        
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
        } else if(codeError == 420) {
            txt = "الرجاء قم بلمئ كافة البيانات";
        } else if(codeError == 450) {
            let txt = "خطأ غير معروف, حاول مرة أخرى";
        } else {
            txt = "خطأ غير معروف !";
        }
        
        alert(txt);
        
    });
    
}


function loadMorePosts() {
    
    const pathDataMorePost = mainApp.pathDomain + "api/readDataPostPagination.php";
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    formData.append("numberPage" , NUMBER_PAGE );
    
    mainApp.send("POST", pathDataMorePost , headers , formData ).then( ( result ) => {
        
        myPostList.fillListPost( result );
        
    }).then( (result) => {
        
        
        fillMorePost();
        
        
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

function fillMorePost() {
    
    let listPost = document.getElementById('listPost');
    listPost.innerHTML = "";
    
    const listPosts = myPostList.getListPost();
    
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






function clickFollowUser( codeFollow ) {
    
    
    mainApp.follow( moduleUserLog.getUser().userCode , codeFollow ).then( (result) => {
        
        refreshFollower();
        
    }).catch( (reject) => {
        
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
    });
    
    
}

function refreshFollower() {
    
    const pathDataHomeFriend = mainApp.pathDomain + "api/readDataHomeFriend.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    
    mainApp.send("POST", pathDataHomeFriend , headers , formData ).then( ( result ) => {
        
        userHome.fillUsers( result );
        
    }).then( (result) => {
        
        fillFriend();
        fillSuggestions();
        
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

function refreshPosts() {
    
    const pathDataPost = mainApp.pathDomain + "api/readDataPosts.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow" , COUNT_ROW );
    formData.append("within" , "home" );
    
    mainApp.send("POST", pathDataPost , headers , formData ).then( ( result ) => {
        
        myPostList.fillListPost( result );
        
    }).then( (result) => {
        
        fillPost();
        
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

function refreshProject() {
    
}





























