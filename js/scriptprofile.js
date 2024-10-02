import * as moduleUserLog from './modules/moduleUserLog.js';

import Profile from './modules/moduleProfileClass.js';

import Main from './modules/moduleMain.js';

let mainApp = new Main();
var myProfile = null ;



const COUNT_ROW = 5;
let NUMBER_PAGE = 1;



window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});


export function initApp( data ) {
    
    init_User();
    
    init_Profile();
    
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    document.getElementById('lightBox').addEventListener("click" , clickBoxOut );
    document.getElementById('lightBoxCard').addEventListener("click" , clickBox );
    
    document.getElementById('navMyRight').addEventListener("click" , clickNavMyRight );
    document.getElementById('navMyLeft').addEventListener("click" , clickNavMyLeft );
    
    document.getElementById('navJoinRight').addEventListener("click" , clickNavJoinRight );
    document.getElementById('navJoinLeft').addEventListener("click" , clickNavJoinLeft );
    
    initNavMy();
    initNavJoin();
    
}

function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_Profile() {
    
    
    const pathDataProfile = mainApp.pathDomain + "api/readDataProfile.php";
    
    var codeuserprofile = mainApp.getValCookie("codeuserprofile");
    
    
    const headers = [];

    let formData = new FormData();
    formData.append("codeUserProfile", codeuserprofile);
    formData.append("countRow" , COUNT_ROW );
    
    
    mainApp.send("POST", pathDataProfile, headers, formData ).then( (result) => {
        
        const isFriend = result["isFriend"];
        
        
        
        if(1) {
            
            myProfile = new Profile( result );
            
        } else {
            notion( result );
        }
        
        
    }).then( (result) => {
        
        fillProfileName();
        fillProfileAbout();
        
        fillProfileContact();
        
        fillProfileCertificate();
        fillProfileExperience();
        fillProfileUserSkill();
        
        fillProjectMy();
        fillProjectJoin();
        
        fillEvaluation();
        
        
        
        setPermissionEdit( (moduleUserLog.getUser().userCode == myProfile.code) );
        
        mainApp.callNotification();
        
        
    }).catch( (reject) => {
        
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
    
    let containerName = document.getElementById("containerName");
    let containerButtonEditName = document.getElementById("containerButtonEditName");
    let containerButtonEditAbout = document.getElementById("containerButtonEditAbout");
    
    let containerButtonEditContact = document.getElementById("containerButtonEditContact");
    let containerButtonEditCertificate = document.getElementById("containerButtonEditCertificate");
    let containerButtonEditExperience = document.getElementById("containerButtonEditExperience");
    let containerButtonEditSkill = document.getElementById("containerButtonEditSkill");

    containerButtonEditName.innerHTML = "";    
    containerButtonEditAbout.innerHTML = "";
    
    containerButtonEditContact.innerHTML = "";
    containerButtonEditCertificate.innerHTML = "";
    containerButtonEditExperience.innerHTML = "";
    containerButtonEditSkill.innerHTML = "";
    
    if( isMe ) {
        
        let codeButtonName = `
            <div id="buttonEditName" class="divsvg hide">
                <svg id="divsvgedit" class="svgfill">
                    <use xlink:href="#svgedit"/>
                </svg>
            </div>
        `;
        containerButtonEditName.insertAdjacentHTML("beforeend", codeButtonName);
        
        document.getElementById('buttonEditName').addEventListener("click" , clickWidgetOpenBoxName );
        document.getElementById('carduserimg').addEventListener("click" , clickWidgetOpenBoxImage );
        
        
        
        
        let codeButtonAbout = `
            <div id="buttonEditAbout" class="divsvg hide">
                <svg id="divsvgedit" class="svgfill">
                    <use xlink:href="#svgedit"/>
                </svg>
            </div>
        `;
        containerButtonEditAbout.insertAdjacentHTML("beforeend", codeButtonAbout);
        
        document.getElementById('buttonEditAbout').addEventListener("click" , clickWidgetOpenBoxAbout );
        
        
        let codeButtonsContact = `
            <div id="btnAddContact" class="divsvg">
                <svg class="svgfill">
                    <use xlink:href="#svgadd"/>
                </svg>
            </div>
        `;
        containerButtonEditContact.insertAdjacentHTML("beforeend", codeButtonsContact);
        
        document.getElementById('btnAddContact').addEventListener("click" , function() { clickWidgetOpenBoxContact(); } );
        
        
        
        
        let codeButtonsCertificate = `
            <div id="btnAddCertificate" class="divsvg">
                <svg class="svgfill">
                    <use xlink:href="#svgadd"/>
                </svg>
            </div>
        `;
        containerButtonEditCertificate.insertAdjacentHTML("beforeend", codeButtonsCertificate);
        
        document.getElementById('btnAddCertificate').addEventListener("click" , function() { clickWidgetOpenBoxCertificate(); } );
        
        
        let codeButtonsExperience = `
            <div id="btnAddExperience" class="divsvg">
                <svg class="svgfill">
                    <use xlink:href="#svgadd"/>
                </svg>
            </div>
        `;
        containerButtonEditExperience.insertAdjacentHTML("beforeend", codeButtonsExperience);
        
        document.getElementById('btnAddExperience').addEventListener("click" , function() { clickWidgetOpenBoxExperience(); } );
        
        
        
        let codeButtonsSkill = `
            <div id="btnAddSkill" class="divsvg">
                <svg class="svgfill">
                    <use xlink:href="#svgadd"/>
                </svg>
            </div>
        `;
        containerButtonEditSkill.insertAdjacentHTML("beforeend", codeButtonsSkill);
        
        document.getElementById('btnAddSkill').addEventListener("click" , function() { clickWidgetOpenBoxSkill(); } );
        
    } else {
        
        setButtonFollow();
        
        
    }
}

function setButtonFollow() {
    
    var containerButtonFollow = document.getElementById("containerButtonFollow");
    containerButtonFollow.innerHTML = "";
    
    if( myProfile.isFriend() ) {
        
        let codebutton = `
            <div id="buttonUnFollow" class="buttons buttonUnFollow">
                إلغاء المتابعه
            </div>
        `;
        
        containerButtonFollow.insertAdjacentHTML("beforeend", codebutton);
        
        document.getElementById('buttonUnFollow').addEventListener("click" , function() {
            followUser( false );
        } );
        
    } else {
            
        let codebutton = `
            <div id="buttonFollow" class="buttons buttonFollow">
                طلب صداقة
            </div>
        `;
        
        containerButtonFollow.insertAdjacentHTML("beforeend", codebutton);
        
        document.getElementById('buttonFollow').addEventListener("click" , function() {
            followUser( true );
        } );
        
    }
    
}

function controlHover( idCover , idElement ) {
    
    let cover = document.getElementById( idCover );
    
    cover.addEventListener('mouseover', () => {
        
        let btn = document.getElementById( idElement );
        btn.classList.remove("hide");
        
        
        let elSvg = btn.getElementsByTagName("svg")[0];
        
        elSvg.addEventListener('mouseover', () => {
            elSvg.classList.remove("hilight");
        });
        elSvg.addEventListener('mouseout', () => {
            elSvg.classList.add("hilight");
        });
        
    });
    
    cover.addEventListener('mouseout', () => {
        
        let btn = document.getElementById( idElement );
        btn.classList.add("hide");
        
    });
    
}


function fillProfileName() {
    
    let urlImage = mainApp.checkUrlImage( myProfile.imageProfile );
    
    let profileImage = document.getElementById("carduserimg");
    profileImage.src = urlImage ;
    
    let profileName = document.getElementById("cardusername");
    
    
    profileName.textContent = myProfile.firstName+" "+myProfile.lastName;
    
    if(moduleUserLog.getUser().userCode == myProfile.code) {
        
        controlHover( "containerName" , "buttonEditName" );
        
    }
    
    
}
function fillProfileAbout() {
    let prographAbout = document.getElementById("prographAbout");
    
    if( myProfile )
    {
        prographAbout.textContent = myProfile.about;
    }
    else
    {
        prographAbout.textContent = "-";
    }
    
    if(moduleUserLog.getUser().userCode == myProfile.code) {
        
        controlHover( "cardAbout" , "buttonEditAbout" );
        
    }
    
}

function fillProfileContact() {

    let containerContact = document.getElementById("listContact");
    containerContact.innerHTML = "";
    
    const myListContact = myProfile.getListContact();

    if( myListContact.length > 0 )
    {

        for(var i=0; i<myListContact.length; i++)
        {
            let cardContact = buildCardContact( myListContact[i] , i , containerContact , (moduleUserLog.getUser().userCode == myProfile.code) );
        }

    }
    else
    {

        let cardEmpty = `

            <div class="cardEmpty">
            
                <div class="body">
                    لا يوجد محتوى
                </div>
                
            </div>
        `;
        
        containerContact.insertAdjacentHTML("beforeend", cardEmpty);
    }

}
function fillProfileCertificate() {

    let containerCertificate = document.getElementById("listCertificate");
    containerCertificate.innerHTML = "";

    const myListCertificate = myProfile.getListCertificate();
    
    if( myListCertificate.length > 0)
    {

        for(var i=0; i<myListCertificate.length; i++)
        {
            let cardCertificate = buildCardCertificate( myListCertificate[i] , i , containerCertificate , (moduleUserLog.getUser().userCode == myProfile.code) );
        }

    }
    else
    {

        let cardEmpty = `

            <div class="cardEmpty">
            
                <div class="body">
                    لا يوجد محتوى
                </div>
                
            </div>
        `;
        
        containerCertificate.insertAdjacentHTML("beforeend", cardEmpty);
    }

}
function fillProfileExperience() {

    let containerExperience = document.getElementById("listExperience"); //listCertificate
    containerExperience.innerHTML = "";

    const myListExperience = myProfile.getListExperience();
    
    if( myListExperience.length > 0)
    {

        for(var i=0; i<myListExperience.length; i++)
        {
            let cardExperience = buildCardExperience( myListExperience[i] , i , containerExperience , (moduleUserLog.getUser().userCode == myProfile.code) );
        }

    }
    else
    {

        let cardEmpty = `

            <div class="cardEmpty">
            
                <div class="body">
                    لا يوجد محتوى
                </div>
                
            </div>
        `;
        
        containerExperience.insertAdjacentHTML("beforeend", cardEmpty);
    }

}
function fillProfileUserSkill() {

    let containerSkill = document.getElementById("listSkill");
    containerSkill.innerHTML = "";

    const myListUserSkills = myProfile.getListUserSkill();
    
    if( myListUserSkills.length > 0)
    {
        
        for(var i=0; i<myListUserSkills.length; i++)
        {
            let cardSkill = buildCardSkill( myListUserSkills[i] , i , containerSkill , (moduleUserLog.getUser().userCode == myProfile.code) );
        }

    }
    else
    {

        let cardEmpty = `

            <div class="cardEmpty">
            
                <div class="body">
                    لا يوجد محتوى
                </div>
                
            </div>
        `;
        
        containerSkill.insertAdjacentHTML("beforeend", cardEmpty);
    }

}


function fillProjectMy() {

    let listProject = document.getElementById('containerListRowMy');
    listProject.innerHTML = "";
    
    const listProjects = myProfile.getListProjectMy();
    
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
        
        
        let buttonShowProject = "buttonShowProjectMy"+i;
        
        let cardProject = `
        
            <div class="card cardProject">
                <div class="header">
                    <img src="${urlImage}" draggable="false">
                </div>
                <div class="body">
                    <div class="bodyheader">
                        <h3>${name} xx 2</h3>
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
            
        `;
        
        listProject.insertAdjacentHTML("beforeend", cardProject);
        
        document.getElementById( buttonShowProject ).addEventListener("click" , function() {
            
            mainApp.goToProject( moduleUserLog.getUser().userCode , code , codeUser );
            
        });
    }
    
    if(listProjects.length > 0) {
        
    } else {
        
        let cardEmpty = `

            <div class="cardEmpty">
            
                <div class="body">
                    لا يوجد محتوى
                </div>
                
            </div>
        `;
        
        listProject.insertAdjacentHTML("beforeend", cardEmpty);
    }
    
}

function fillProjectJoin() {
    
    let listProject = document.getElementById('containerListRowJoin');
    listProject.innerHTML = "";
    
    const listProjects = myProfile.getListProjectJoin();
    
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
        
        
        let buttonShowProject = "buttonShowProjectJoin"+i;
        
        let cardProject = `
        
            <div class="card cardProject">
                <div class="header">
                    <img src="${urlImage}">
                </div>
                <div class="body">
                    <div class="bodyheader">
                        <h3>${name} xx 2</h3>
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
            
        `;
        
        listProject.insertAdjacentHTML("beforeend", cardProject);
        
        document.getElementById( buttonShowProject ).addEventListener("click" , function() {
            
            mainApp.goToProject( moduleUserLog.getUser().userCode , code , codeUser );
            
        });
    }
    
    if(listProjects.length > 0) {
        
    } else {
        
        let cardEmpty = `

            <div class="cardEmpty">
            
                <div class="body">
                    لا يوجد محتوى
                </div>
                
            </div>
        `;
        
        listProject.insertAdjacentHTML("beforeend", cardEmpty);
    }
    
}


function fillEvaluation() {
    
    const countProject = myProfile.getCountProject();
    const countProjectShare = myProfile.getCountProjectShare();
    const medMark = myProfile.getEvaluation();
    
    
    
    let displayCountProject = document.getElementById("displayCountProject");
    displayCountProject.textContent =  countProjectShare +"/"+ countProject;
    
    let displayMark = document.getElementById("displayMark");
    displayMark.textContent =  medMark+"/5";
    
}



/*_____________________*/

function buildCardContact( item , i , el , isMe ) {
    
    const id = item.id;
    const account = item.account;
    const codeType = item.codeType;
    
    const nameType = item.nameType;
    const iconType = "svg"+item.iconType;
    
    const description = "X";
    
    
    let nameRowContact = "nameRowContact"+i;
    let nameContainerBody = "containerBodyContact"+i;
    let nameContainerButtons = "containerButtonsContact"+i;
    let nameContainerButtonsEdit = "containerButtonsContactEdit"+i;
    let nameButtonEditContact = "buttonEditContact"+i;
    let nameButtonRemoveContact = "buttonRemoveContact"+i;
    let nameButtonMore = "buttonMoreContact"+i;
    let nameContainerBigContact = "containerBigContact"+i;
    
    let codeoption = `
    <li>
    <div id="${nameRowContact}" class="containerItem containerItemContact">
        
        <div id="containerSmall" class="containerSmall containerSmallContact">
            
            <div id="${nameContainerBody}" class="containerBody">
                
                <div class="containerIcon">
                        
                    <div class="divsvg notButtton">
                        <svg class="svgfill">
                            <use xlink:href="#${iconType}"/>
                        </svg>
                    </div>
                    
                </div>
                
                <div class="containerContent" data-id="${id}">${account}</div>
                
            </div>
            
            <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                
            </div>
            
            <div id="${nameContainerButtons}" class="containerButtons">
                
                <div id="${nameButtonMore}" class="divsvg">
                    <svg class="svgstroke">
                        <use xlink:href="#svgdown"/>
                    </svg>
                </div>
                
            </div>
            
        </div>
        
        <div id="${nameContainerBigContact}" class="containerBig hide">
            
            <div class="containerHeader">
                <div class="containerContent">${account}</div>
            </div>
            
        </div>
        
    </div>
    </li>
    `;
    
    const codebuttons = `
        
            <div id="${nameButtonEditContact}" class="divsvg" data-id="${id}">
                <svg class="svgfill">
                    <use xlink:href="#svgedit"/>
                </svg>
            </div>
            
            <div id="${nameButtonRemoveContact}" class="divsvg" data-id="${id}">
                <svg class="svgfill">
                    <use xlink:href="#svgremove"/>
                </svg>
            </div>
    `;

    el.insertAdjacentHTML("beforeend", codeoption);
    
    document.getElementById( nameContainerButtons ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    
    document.getElementById( nameButtonMore ).addEventListener("click" , function() {
        
        event.stopPropagation();
        
        document.getElementById( nameContainerBody ).classList.toggle("hide");
        document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
        
        clickSkillMore( nameContainerBigContact );
        
    });
    
    
    
    if( isMe ) {
        let containerBtn = document.getElementById( nameContainerButtonsEdit );
        
        containerBtn.insertAdjacentHTML("afterbegin", codebuttons);
        
        document.getElementById( nameButtonEditContact ).addEventListener("click" , function() {
            clickWidgetOpenBoxContact( id ) ;
        });
        document.getElementById( nameButtonRemoveContact ).addEventListener("click" , function(){ 
            clickRemoveContact( id );
        });
        
    }
    
    return codeoption;
    
}
function buildCardCertificate( item , i , el , isMe ) {

    const id = item.id;
    const name = item.name;
    const nameOrganization = item.nameOrganization;
    const dateExport = item.dateExport;
    const duration = item.duration;
    const codeUser = item.codeUser;
    
    
    let nameRowCertificate = "nameRowCertificate"+i;
    let nameContainerBody = "containerBodyCertificate"+i;
    let nameContainerButtons = "nameContainerButtonsCertificate"+i;
    let nameContainerButtonsEdit = "containerButtonsCertificateEdit"+i;
    let nameButtonEditCertificate = "buttonEditCertificate"+i;
    let nameButtonRemoveCertificate = "buttonRemoveCertificate"+i;
    let nameButtonMore = "buttonMoreCertificate"+i;
    let nameContainerBigCertificate = "containerBigCertificate"+i;
    
    let codeoption = `
    <li>
    <div id="${nameRowCertificate}" class="containerItem containerItemCertificate">
        
        <div id="containerSmall" class="containerSmall containerSmallCertificate">
        
            <div id="${nameContainerBody}" class="containerBody">
                <div class="containerContent" data-id="${id}">${name}</div>
            </div>
            
                
            <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                
            </div>
            
            <div id="${nameContainerButtons}" class="containerButtons">
                
                <div id="${nameButtonMore}" class="divsvg">
                    <svg class="svgstroke">
                        <use xlink:href="#svgdown"/>
                    </svg>
                </div>
                
            </div>
        </div>
        
        <div id="${nameContainerBigCertificate}" class="containerBig hide">
            
            <div class="containerHeader">
                <div class="containerContent">${name}</div>
            </div>
            
            <div class="containerBody">
                <div class="containerContent">${nameOrganization}</div>
            </div>
            
        </div>
        
    </div>
    </li>
    `;
    
    const codebuttons = `
            
            <div id="${nameButtonEditCertificate}" class="divsvg" data-id="${id}">
                <svg class="svgfill">
                    <use xlink:href="#svgedit"/>
                </svg>
            </div>
            
            <div id="${nameButtonRemoveCertificate}" class="divsvg" data-id="${id}">
                <svg class="svgfill">
                    <use xlink:href="#svgremove"/>
                </svg>
            </div>
    `;
    

    el.insertAdjacentHTML("beforeend", codeoption);
    
    document.getElementById( nameContainerButtons ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    
    document.getElementById( nameButtonMore ).addEventListener("click" , function() {
        
        event.stopPropagation();
        
        document.getElementById( nameContainerBody ).classList.toggle("hide");
        document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
        
        clickSkillMore( nameContainerBigCertificate );
        
    });
    
    
    if( isMe ) {
        let containerBtn = document.getElementById( nameContainerButtonsEdit );
        
        containerBtn.insertAdjacentHTML("afterbegin", codebuttons);
            
        document.getElementById( nameButtonEditCertificate ).addEventListener("click" , function() {
            clickWidgetOpenBoxCertificate( id );
        });
        document.getElementById( nameButtonRemoveCertificate ).addEventListener("click" , function() {
            clickRemoveCertificate( id ); 
        });
        
    }
    
    return codeoption;
}
function buildCardExperience( item , i , el , isMe ) {

    const id = item.id;
    const nameJob = item.nameJob;
    const nameOrganization = item.nameOrganization;
    const dateStart = item.dateStart;
    const dateEnd = item.dateEnd;
    const codeUser = item.codeUser;
    
    
    let nameRowExperience = "nameRowExperience"+i;
    let nameContainerBody = "containerBodyExperience"+i;
    let nameContainerButtons = "containerButtonsExperience"+i;
    let nameContainerButtonsEdit = "containerButtonsExperienceEdit"+i;
    let nameButtonEditExperience = "buttonEditExperience"+i;
    let nameButtonRemoveExperience = "buttonRemoveExperience"+i;
    let nameButtonMore = "buttonMoreExperience"+i;
    let nameContainerBigExperience = "containerBigExperience"+i;
    
    let codeoption = `
    <li>
    <div id="${nameRowExperience}" class="containerItem containerItemExperience">
        
        <div id="containerSmall" class="containerSmall containerSmallExperience">
        
            <div id="${nameContainerBody}" class="containerBody">
                <div class="containerContent" data-id="${id}">${nameJob}</div>
            </div>
            
            <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                
            </div>
                
            <div id="${nameContainerButtons}" class="containerButtons">
                
                <div id="${nameButtonMore}" class="divsvg">
                    <svg class="svgstroke">
                        <use xlink:href="#svgdown"/>
                    </svg>
                </div>
                
            </div>
        </div>
        
        <div id="${nameContainerBigExperience}" class="containerBig hide">
            
            <div class="containerHeader">
                <div class="containerContent">${nameJob}</div>
            </div>
            
            <div class="containerBody">
                <div class="containerContent">${nameOrganization}</div>
            </div>
            
        </div>
        
    </div>
    </li>
    `;
    
    const codebuttons = `

            <div id="${nameButtonEditExperience}" class="divsvg" data-id="${id}">
                <svg class="svgfill">
                    <use xlink:href="#svgedit"/>
                </svg>
            </div>
            
            <div id="${nameButtonRemoveExperience}" class="divsvg" data-id="${id}">
                <svg class="svgfill">
                    <use xlink:href="#svgremove"/>
                </svg>
            </div>
    `;
    

    el.insertAdjacentHTML("beforeend", codeoption);
    
    document.getElementById( nameContainerButtons ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    
    document.getElementById( nameButtonMore ).addEventListener("click" , function() {
        
        event.stopPropagation();
        
        document.getElementById( nameContainerBody ).classList.toggle("hide");
        document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
        
        clickSkillMore( nameContainerBigExperience );
        
    });
    
    
    if( isMe ) {
        let containerBtn = document.getElementById( nameContainerButtonsEdit );
        
        containerBtn.insertAdjacentHTML("afterbegin", codebuttons);
        
        document.getElementById( nameButtonEditExperience ).addEventListener("click" , function() {
            clickWidgetOpenBoxExperience( id );
        });
        document.getElementById( nameButtonRemoveExperience ).addEventListener("click" , function() {
            clickRemoveExperience( id ); 
        });
        
    }
    
    
    return codeoption;
}
function buildCardSkill( item , i , el , isMe ) {
    
    const id = item.id;
    const codeUser = item.codeUser;
    const codeSkill = item.codeSkill;
    const description = item.description;
    
    let nameSkill = "-"
    
    if( codeSkill == null ) {
        nameSkill = "أخرى - " + description ;
    } else {
        nameSkill = item.nameSkill;
    }


    let nameRowSkill = "nameRowSkill"+i;
    let nameContainerBody = "containerBodySkill"+i;
    let nameContainerButtons = "containerButtonsSkill"+i;
    let nameContainerButtonsEdit = "containerButtonsExperienceSkillEdit"+i;
    let nameButtonEditSkill = "buttonEditSkill"+i;
    let nameButtonRemoveSkill = "buttonRemoveSkill"+i;
    let nameButtonMore = "buttonMoreSkill"+i;
    let nameListSkillTask = "listSkillTask"+i;
    let nameContainerBigSkill = "containerBigSkill"+i;
    
    let codeoption = `
    <li>
    <div id="${nameRowSkill}" class="containerItem containerItemSkill">
        
        <div id="containerSmall" class="containerSmall containerSmallSkill">
        
            <div id="${nameContainerBody}" class="containerBody">
                <div class="containerContent" data-id="${codeSkill}">${nameSkill}</div>
            </div>
            
            <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                
            </div>
            
            <div id="${nameContainerButtons}" class="containerButtons">
                
                <div id="${nameButtonMore}" class="divsvg">
                    <svg class="svgstroke">
                        <use xlink:href="#svgdown"/>
                    </svg>
                </div>
                
            </div>
        </div>
        
        <div id="${nameContainerBigSkill}" class="containerBig hide">
            
            <div class="containerHeader">
                <div class="containerContent">${nameSkill}</div>
            </div>
            
            <div class="containerBody">
                <div class="containerContent">${description}</div>
            </div>
            
        </div>
        
    </div>
    </li>
    `;
    
    const codebuttons = `
        
            <div id="${nameButtonEditSkill}" class="divsvg" data-id="${codeSkill}">
                <svg class="svgfill">
                    <use xlink:href="#svgedit"/>
                </svg>
            </div>
            
            <div id="${nameButtonRemoveSkill}" class="divsvg" data-id="${codeSkill}">
                <svg class="svgfill">
                    <use xlink:href="#svgremove"/>
                </svg>
            </div>
    `;
    

    el.insertAdjacentHTML("beforeend", codeoption);
    
    document.getElementById( nameContainerButtons ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function() {
        event.stopPropagation();
    });
    
    document.getElementById( nameButtonMore ).addEventListener("click" , function() {
        
        event.stopPropagation();
        
        document.getElementById( nameContainerBody ).classList.toggle("hide");
        document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
        
        clickSkillMore( nameContainerBigSkill );
        
    });
    
    
    if( isMe ) {
        let containerBtn = document.getElementById( nameContainerButtonsEdit );
        
        containerBtn.insertAdjacentHTML("afterbegin", codebuttons);
            
        document.getElementById( nameButtonEditSkill ).addEventListener("click" , function() {
            clickWidgetOpenBoxSkill( id );
        });
        document.getElementById( nameButtonRemoveSkill ).addEventListener("click" , function() {
            clickRemoveSkill( id ); 
        });
        
    }
    
    
    return codeoption;
}




function followUser( follow ) {
    
    
    myProfile.followUser( follow , moduleUserLog.getUser().userCode ).then( (result) => {
        
        myProfile.toggleIsFriend();
        setButtonFollow();
        
        mainApp.codeWraningNotification( "تم متابعة المستخدم", "success" );
        
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
        
    } );
    
}

function clickSkillMore( idBig ) {
    
    var big = document.getElementById( idBig );
    big.classList.toggle("hide");
    
}












function notion( data ) {
    
    let divs = document.getElementsByClassName("divmain")[0];
    
    divs.innerHTML = `
        <div class="notion">
            هذا المستخدم ليس صديق لك وش اللقافه  :> !!
        </div>
    `;
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











































function clickWidgetOpenBoxImage() {
    
    
    
    let code = `
    <div class="divHeader">
        <h2>صورة الملف الشخصي :</h2>
    </div>
    <div class="divBody">
    
        <div class="containerfiled">
        
            <div class="containerLabel">
                <label>ملف الصورة:</label>
            </div>
            
            <input type="file" id="fieldimage" class="inputs file" name="imageProfile">
            <span id="validImage" class="validation validImage"></span>
        </div>

    </div>
    <div class="divFooter">
        <div id="buttonSaveImage" class="buttons btnSave">حفظ</div>
        <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
    </div>
    `;
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById('buttonSaveImage').addEventListener("click" , clickEditImage );
    document.getElementById('buttonCancel').addEventListener("click" , cancel );
    
}

function clickEditImage() {
    

    let validImage = document.getElementById("validImage");
    
    const fileImage = document.getElementById('fieldimage').files;
    
    if( fileImage.length > 0 ) {
        
        let nameImage = fileImage[0].name;
        let sizeImage = fileImage[0].size;
        
        if( !mainApp.strps( nameImage , "image") ) {
            validImage.textContent = "نوع الملف غير مدعوم";
        } else {
            
            if( sizeImage > mainApp.maxSizeFileImage ) {
                validImage.textContent = "حجم الملف أكبر من الحجم المسموح 5 MB";
                return;
            } else {
                validImage.textContent = "";
            }
            
        }
        
    } else {
        validImage.textContent = "لم يتم إختيار صورة !";
    }
    
    
    myProfile.updateImage( moduleUserLog.getUser().userCode , fileImage[0] ).then( (result) => {
        
        let img = result[1];
        let urlImage = mainApp.checkUrlImage( img );
        
        myProfile.imageProfile = img;
        
        let profileImage = document.getElementById("carduserimg");
        profileImage.src = urlImage ;
        
        cancel();
        mainApp.codeWraningNotification( "تم تحديث صورة الملف الشخصي", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}

function clickWidgetOpenBoxName() {
    
    var containerName = document.getElementById("cardusername");
    let name = containerName.textContent;
    
    
    let fname = myProfile.firstName;
    let lname = myProfile.lastName;
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");

    let code = `
    <div class="divHeader">
        <h2>الاسم :</h2>
    </div>
    <div class="divBody">
        
        <div class="inner">
        <div class="containerfiled">

            <div class="containerLabel">
                <label>الاسم الأول :</label>
            </div>

            <input type="text" id="inputFirstName" class="inputs" placeholder="الاسم الأول" value="${fname}">
            <span id="validNamef" class="validation validName"></span>
            
        </div>
            
        <div class="containerfiled">

            <div class="containerLabel">
                <label>الاسم الثاني :</label>
            </div>

            <input type="text" id="inputLastName" class="inputs" placeholder="الاسم الثاني" value="${lname}">
            <span id="validNamel" class="validation validName"></span>
        </div>
        </div>

    </div>
    <div class="divFooter">
        <div id="buttonSaveName" class="buttons btnSave">حفظ</div>
        <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
    </div>
    `;
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById('buttonSaveName').addEventListener("click" , clickEditName );
    document.getElementById('buttonCancel').addEventListener("click" , cancel );
    
}

function clickEditName() {
    
    var containerName = document.getElementById("cardusername");
    
    const firstName = document.getElementById("inputFirstName").value.trim();
    const lastName = document.getElementById("inputLastName").value.trim();
    
    let validNamef = document.getElementById("validNamef");
    let validNamel = document.getElementById("validNamel");

    let [status,textError] = mainApp.validationInput( firstName , "shortstring" );
    if( !status ) {
        validNamef.textContent = textError;
        return;
    } else {
        validNamef.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( lastName , "shortstring" );
    if( !status ) {
        validNamel.textContent = textError;
        return;
    } else {
        validNamel.textContent = "";
    }
    
    
    myProfile.updateUsername( firstName , lastName ).then( (result) => {
        
        
        myProfile.firstName = firstName;
        myProfile.lastName = lastName; 
        containerName.textContent = firstName+" "+lastName;
        
        cancel();
        mainApp.codeWraningNotification( "تم اسم المستخدم", "success" );
        
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}


function clickWidgetOpenBoxAbout() {
    
    var prographAbout = document.getElementById("prographAbout");
    let about = prographAbout.textContent;
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");

    let code = `
    <div class="divHeader">
        <h2>عنّي :</h2>
    </div>
    <div class="divBody">
        
        <div class="containerfiled area">

            <div class="containerLabel">
                <label>عني :</label>
            </div>

            <textarea id="inputAbout" name="about" class="inputs area" placeholder="عنّي.." requred>${about}</textarea>
            <span id="validAbout" class="validation validAbout"></span>
            
        </div>

    </div>
    <div class="divFooter">
        <div id="buttonSaveAbout" class="buttons btnSave">حفظ</div>
        <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
    </div>
    `;
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById('buttonSaveAbout').addEventListener("click" , clickEditAbout );
    document.getElementById('buttonCancel').addEventListener("click" , cancel );
    
}

function clickEditAbout() {
    
    const about = document.getElementById("inputAbout").value;
    var prographAbout = document.getElementById("prographAbout");
    
    let validAbout = document.getElementById("validAbout");

    let [status,textError] = mainApp.validationInput( about , "text" );
    if( !status ) {
        validAbout.textContent = textError;
        return;
    } else {
        validAbout.textContent = "";
    }
    
    
    myProfile.updateAbout( about ).then( (result) => {
        
        prographAbout.textContent = about;
        
        cancel();
        mainApp.codeWraningNotification( "تم تحديث الملف الشخصي", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}


function clickWidgetOpenBoxContact( idContact = null ) {
    
    let txtBtnSave = `<div id="buttonSaveContact" class="buttons btnSave">حفظ</div>`;
    
    let id = 0;
    let account = "";
    let codeType = 0;
    
    if( idContact != null)
    {
        txtBtnSave = `<div id="buttonEditContact" class="buttons btnSave">تحديث</div>`;
        
        
        myProfile.listContact.map( (con) => {
            if(con.id === idContact)
            {
                account = con.account;
                codeType = con.codeType;
            }

        });
        
    }
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");

    let code = `
    <div class="divHeader">
        <h2>قنوات التواصل</h2>
    </div>
    <div class="divBody">
        
        <div class="inner">
        <div class="containerfiled">

            <div class="containerLabel">
                <label>اختر نوع التواصل :</label>
            </div>
            
            <div class="continerselect">

                <select id="selectcontacttype" name="skilluser" class="selectbox selectcontacttype" required>
                    <option value="0">اختر نوع التواصل</option>
                </select>

                <div class="divsvg">
                    <svg id="divsvgdown" class="svgstroke">
                        <use xlink:href="#svgdown"/>
                    </svg>
                </div>

            </div>
            <span id="validType" class="validation validType"></span>

        </div>

        <div class="containerfiled">

            <div class="containerLabel">
                <label>حساب التواصل :</label>
            </div>

            <input type="text" id="inputContact" class="inputs" placeholder="حساب التواصل" value="${account}">
            <span id="validAccount" class="validation validAccount"></span>
        </div>
        </div>
        

    </div>
    <div class="divFooter">
        ${txtBtnSave}
        <div id="bottunCancel" class="buttons btnCancel neg">إلغاء</div>
    </div>
    `;
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("bottunCancel").addEventListener("click", cancel );
    
    if( idContact != null)
    {
        document.getElementById("buttonEditContact").addEventListener("click", function() {
            clickEditContact(idContact);
        } );
    }
    else
    {
        document.getElementById("buttonSaveContact").addEventListener("click", clickAddContact );
    }
    
    
    
    fillProfileSelectContactType();
    
    let selectContactType = document.getElementById("selectcontacttype");
    selectContactType.value = codeType;
    
}

function clickAddContact() {
    
    let codeType = document.getElementById("selectcontacttype").value ;
    let account = document.getElementById("inputContact").value ;
    
    let validType = document.getElementById("validType");
    let validAccount = document.getElementById("validAccount");
    
    
    if( codeType == 0 ) {
        validType.textContent = "الرجاء اختيار النوع";
        return;
    } else {
        validType.textContent = "";
    }
    
    const [status,textError] = mainApp.validationInput( account , "text" );
    if( !status ) {
        validAccount.textContent = textError;
        return;
    } else {
        validAccount.textContent = "";
    }
    
    
    
    myProfile.addContact( codeType , account ).then( (result) => {
        
        myProfile.fillProfileContact( result );
        fillProfileContact();
        
        cancel();
        mainApp.codeWraningNotification( "تم إضافة قناة الإتصال", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}
function clickEditContact( idContact ) {
    
    let codeType = document.getElementById("selectcontacttype").value ;
    let account = document.getElementById("inputContact").value ;
    
    
    let validType = document.getElementById("validType");
    let validAccount = document.getElementById("validAccount");
    
    
    if( codeType == 0 ) {
        validType.textContent = "الرجاء اختيار النوع";
        return;
    } else {
        validType.textContent = "";
    }
    
    const [status,textError] = mainApp.validationInput( account , "text" );
    if( !status ) {
        validAccount.textContent = textError;
        return;
    } else {
        validAccount.textContent = "";
    }
    
    
    
    myProfile.updateContact( idContact , codeType , account ).then( (result) => {
        
        myProfile.fillProfileContact( result );
        fillProfileContact();
        
        cancel();
        mainApp.codeWraningNotification( "تم تحديث قناة الإتصال", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}
function clickRemoveContact( idContact ) {
    
    myProfile.removeContact( idContact ).then( (result) => {
        
        myProfile.fillProfileContact( result );
        fillProfileContact();
        
        cancel();
        mainApp.codeWraningNotification( "تم حذف قناة الإتصال", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
    
}



function clickWidgetOpenBoxCertificate( idCertificate ) {
    
    let txtBtnSave = `<div id="buttonSaveCertificate" class="buttons btnSave">حفظ</div>`;
    
    let id = 0;
    let name = "";
    let nameOrganization = "";
    let dateExport = "";
    let duration = "";
    let codeUser = "";
    
    if( idCertificate != null)
    {
        txtBtnSave = `<div id="buttonEditCertificate" class="buttons btnSave">تحديث</div>`;
        
        myProfile.listCertificate.map( (cer) => {
            if(cer.id === idCertificate)
            {
                name = cer.name;
                nameOrganization = cer.nameOrganization;
                dateExport = cer.dateExport;
                duration = cer.duration;
            }

        });
    }
    
    
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");

    let code = `
    <div class="divHeader">
        <h2>إضافة شهادة</h2>
    </div>
    <div class="divBody">
        
        <div class="inner">
        <div class="containerfiled">

            <div class="containerLabel">
                <label>اسم الشهادة :</label>
            </div>

            <input type="text" id="nameCertificate" class="inputs" placeholder="اسم الشهادة" value="${name}" >
            <span id="validNameCertificate" class="validation validNameCertificate"></span>
        </div>

        <div class="containerfiled">

            <div class="containerLabel">
                <label>اسم المؤسسة :</label>
            </div>

            <input type="text" id="nameOrganization" class="inputs" placeholder="اسم المؤسسة" value="${nameOrganization}">
            <span id="validNameOrganization" class="validation validNameOrganization"></span>

        </div>

        <div class="containerfiled">

            <div class="containerLabel">
                <label>تاريخ إصدارها :</label>
            </div>

            <input type="text" id="dateExport" class="inputs" placeholder="تاريخ الإصدار" value="${dateExport}">
            <span id="validDateExport" class="validation validDateExport"></span>
        </div>
        
        <div class="containerfiled">

            <div class="containerLabel">
                <label>مدة الدورة :</label>
            </div>

            <input type="text" id="duration" class="inputs" placeholder="مدة الدورة" value="${duration}">
            <span id="validDuration" class="validation validDuration"></span>
        </div>
        </div>
        

    </div>
    <div class="divFooter">
        ${txtBtnSave}
        <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
    </div>
    `;
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    
    document.getElementById("buttonCancel").addEventListener("click", cancel);
    
    if( idCertificate != null ) {
        document.getElementById("buttonEditCertificate").addEventListener("click", function() { clickEditCertificate(idCertificate);
        });
    } else {
        document.getElementById("buttonSaveCertificate").addEventListener("click", clickAddCertificate);
    }
    
    
    
}

function clickAddCertificate() {

    let nameCertificate = document.getElementById("nameCertificate").value;
    let nameOrganization = document.getElementById("nameOrganization").value;
    let dateExport = document.getElementById("dateExport").value;
    let duration = document.getElementById("duration").value;
    
    let validNameCertificate = document.getElementById("validNameCertificate");
    let validNameOrganization = document.getElementById("validNameOrganization");
    let validDateExport = document.getElementById("validDateExport");
    let validDuration = document.getElementById("validDuration");
    
    
    let [status,textError] = mainApp.validationInput( nameCertificate , "string" );
    if( !status ) {
        validNameCertificate.textContent = textError;
        return;
    } else {
        validNameCertificate.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( nameOrganization , "string" );
    if( !status ) {
        validNameOrganization.textContent = textError;
        return;
    } else {
        validNameOrganization.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( dateExport , "date" );
    if( !status ) {
        validDateExport.textContent = textError;
        return;
    } else {
        validDateExport.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( duration , "string" );
    if( !status ) {
        validDuration.textContent = textError;
        return;
    } else {
        validDuration.textContent = "";
    }
    
    
    myProfile.addCertificate( nameCertificate , nameOrganization , dateExport, duration ).then( (result) => {
        
        myProfile.fillProfileCertificate( result );
        fillProfileCertificate();
        
        cancel();
        mainApp.codeWraningNotification( "تم إضافة الشهادة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
    
}
function clickEditCertificate( idCertificate ) {
    
    let nameCertificate = document.getElementById("nameCertificate").value;
    let nameOrganization = document.getElementById("nameOrganization").value;
    let dateExport = document.getElementById("dateExport").value;
    let duration = document.getElementById("duration").value;
    
    let validNameCertificate = document.getElementById("validNameCertificate");
    let validNameOrganization = document.getElementById("validNameOrganization");
    let validDateExport = document.getElementById("validDateExport");
    let validDuration = document.getElementById("validDuration");
    
    
    let [status,textError] = mainApp.validationInput( nameCertificate , "text" );
    if( !status ) {
        validNameCertificate.textContent = textError;
        return;
    } else {
        validNameCertificate.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( nameOrganization , "text" );
    if( !status ) {
        validNameOrganization.textContent = textError;
        return;
    } else {
        validNameOrganization.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( dateExport , "text" );
    if( !status ) {
        validDateExport.textContent = textError;
        return;
    } else {
        validDateExport.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( duration , "string" );
    if( !status ) {
        validDuration.textContent = textError;
        return;
    } else {
        validDuration.textContent = "";
    }
    

    myProfile.updateCertificate( idCertificate , nameCertificate , nameOrganization , dateExport, duration ).then( (result) => {
        
        myProfile.fillProfileCertificate( result );
        fillProfileCertificate();
        
        cancel();
        mainApp.codeWraningNotification( "تم تحديث الشهادة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
    
}
function clickRemoveCertificate( idCertificate ) {

    myProfile.removeCertificate( idCertificate ).then( (result) => {
        
        myProfile.fillProfileCertificate( result );
        fillProfileCertificate();
        
        cancel();
        mainApp.codeWraningNotification( "تم حذف الشهادة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
    
}



function clickWidgetOpenBoxExperience( idExperience = null ) {
    
    let txtBtnSave = `<div id="buttonSaveExperience" class="buttons btnSave">حفظ</div>`;
    
    let id = 0;
    let nameJob = "";
    let nameOrganization = "";
    let dateStart = "";
    let dateEnd = "";
    let codeUser = "";
    
    if( idExperience != null)
    {
        txtBtnSave = `<div id="buttonEditExperience" class="buttons btnSave"">تحديث</div>`;
        
        
        myProfile.listExperience.map( (exp) => {
            if(exp.id === idExperience)
            {
                nameJob = exp.nameJob;
                nameOrganization = exp.nameOrganization;
                dateStart = exp.dateStart;
                dateEnd = exp.dateEnd;
            }

        });
        
    }
    
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");

    let code = `
    <div class="divHeader">
        <h2>إضافة خبرة</h2>
    </div>
    <div class="divBody">
        
        <div class="inner">
        <div class="containerfiled">

            <div class="containerLabel">
                <label>المسمى الوظيفي :</label>
            </div>
            <input type="text" id="nameJob" class="inputs" placeholder="المسمى الوظيفي" value="${nameJob}">
            <span id="validNameJob" class="validation validNameJob"></span>
        </div>

        <div class="containerfiled">

            <div class="containerLabel">
                <label>اسم المؤسسة :</label>
            </div>

            <input type="text" id="nameOrganization" class="inputs" placeholder="اسم المؤسسة" value="${nameOrganization}">
            <span id="validNameOrganization" class="validation validNameOrganization"></span>
        </div>

        <div class="containerfiled">

            <div class="containerLabel">
                <label>من تاريخ :</label>
            </div>

            <input type="text" id="dateStart" class="inputs" placeholder="تاريخ البداية :" value="${dateStart}">
            <span id="validDateStart" class="validation validDateStart"></span>
        </div>

        <div class="containerfiled">

            <div class="containerLabel">
                <label>إلى تاريخ :</label>
            </div>

            <input type="text" id="dateEnd" class="inputs" placeholder="تاريخ المغادرة" value="${dateEnd}">
            <span id="validDateEnd" class="validation validDateEnd"></span>
        </div>
        </div>
        

    </div>
    <div class="divFooter">
        ${txtBtnSave}
        <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
    </div>
    `;
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    if( idExperience != null ) {
        document.getElementById("buttonEditExperience").addEventListener("click", function() { 
            clickEditExperience(idExperience);
        });
    } else {
        document.getElementById("buttonSaveExperience").addEventListener("click", clickAddExperience);
    }
    
    document.getElementById("buttonCancel").addEventListener("click", cancel);
}

function clickAddExperience() {
    
    let nameJob = document.getElementById("nameJob").value;
    let nameOrganization = document.getElementById("nameOrganization").value;
    let dateStart = document.getElementById("dateStart").value;
    let dateEnd = document.getElementById("dateEnd").value;
    
    let validNameJob = document.getElementById("validNameJob");
    let validNameOrganization = document.getElementById("validNameOrganization");
    let validDateStart = document.getElementById("validDateStart");
    let validDateEnd = document.getElementById("validDateEnd");
    
    
    let [status,textError] = mainApp.validationInput( nameJob , "string" );
    if( !status ) {
        validNameJob.textContent = textError;
        return;
    } else {
        validNameJob.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( nameOrganization , "string" );
    if( !status ) {
        validNameOrganization.textContent = textError;
        return;
    } else {
        validNameOrganization.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( dateStart , "date" );
    if( !status ) {
        validDateStart.textContent = textError;
        return;
    } else {
        validDateStart.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( dateEnd , "date" );
    if( !status ) {
        validDateEnd.textContent = textError;
        return;
    } else {
        validDateEnd.textContent = "";
    }
    

    myProfile.addExperience( nameJob , nameOrganization , dateStart, dateEnd ).then( (result) => {
        
        myProfile.fillProfileExperience( result );
        fillProfileExperience();
        
        cancel();
        mainApp.codeWraningNotification( "تم إضافة الخبرة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}
function clickEditExperience( idExperience ) {
    
    let nameJob = document.getElementById("nameJob").value;
    let nameOrganization = document.getElementById("nameOrganization").value;
    let dateStart = document.getElementById("dateStart").value;
    let dateEnd = document.getElementById("dateEnd").value;
    
    let validNameJob = document.getElementById("validNameJob");
    let validNameOrganization = document.getElementById("validNameOrganization");
    let validDateStart = document.getElementById("validDateStart");
    let validDateEnd = document.getElementById("validDateEnd");
    
    
    let [status,textError] = mainApp.validationInput( nameJob , "string" );
    if( !status ) {
        validNameJob.textContent = textError;
        return;
    } else {
        validNameJob.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( nameOrganization , "string" );
    if( !status ) {
        validNameOrganization.textContent = textError;
        return;
    } else {
        validNameOrganization.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( dateStart , "date" );
    if( !status ) {
        validDateStart.textContent = textError;
        return;
    } else {
        validDateStart.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( dateEnd , "date" );
    if( !status ) {
        validDateEnd.textContent = textError;
        return;
    } else {
        validDateEnd.textContent = "";
    }
    

    myProfile.updateExperience( idExperience , nameJob , nameOrganization , dateStart, dateEnd ).then( (result) => {
        
        myProfile.fillProfileExperience( result );
        fillProfileExperience();
        
        cancel();
        mainApp.codeWraningNotification( "تم تحديث الخبرة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
    

}
function clickRemoveExperience( idExperience  ) {

    myProfile.removeExperience( idExperience ).then( (result) => {
        
        myProfile.fillProfileExperience( result );
        fillProfileExperience();
        
        cancel();
        mainApp.codeWraningNotification( "تم حذف الخبرة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}



function clickWidgetOpenBoxSkill( idUserSkill = null ) {

    let txtBtnSave = `<div id="buttonSaveSkill" class="buttons btnSave">حفظ</div>`;
    
    let id = 0;
    let name = "";
    
    let codeUser = "";
    let codeSkill = "";
    let codeLevel = 0;
    let description = "";
    
    if( idUserSkill != null )
    {
        txtBtnSave = `<div id="buttonEditSkill" class="buttons btnSave">تحديث</div>`;
        
        
        myProfile.listUserSkill.map( (skill) => {
            if(skill.id === idUserSkill)
            {
                codeUser = skill.codeUser;
                codeSkill = skill.codeSkill;
                codeLevel = skill.codeLevel;
                description = skill.description
            }

        });
        
    }
    
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");

    let code = `
    <div class="divHeader">
        <h2>إضافة مهارة</h2>
    </div>
    <div class="divBody">
    
        <div class="inner">
        <div class="containerfiled">

            <div class="containerLabel">
                <label>اختر المهارة :</label>
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
            <span id="validSkill" class="validation validSkill"></span>
            
            
            
        </div>
        
        <div class="containerfiled">
        
            <div class="containerLabel">
                <label>مستوى الإجادة :</label>
            </div>
            
            <div class="continerselect">

                <select id="selectskilllevel" name="skillleveluser" class="selectbox selectSkill" required>
                    <option value="0">مستوى الإجادة</option>
                </select>

                <div class="divsvg">
                    <svg id="divsvgdown" class="svgstroke">
                        <use xlink:href="#svgdown"/>
                    </svg>
                </div>

            </div>
            <span id="validSkillLevel" class="validation validSkillLevel"></span>
            
            

        </div>

        <div class="containerfiled containerfileddescription">

            <div class="containerLabel">
                <label>وصف المهارة :</label>
            </div>

            <input type="text" id="inputDescription" class="inputs" placeholder="وصف المهارة" value="${description}">
            <span id="validDescription" class="validation validDescription"></span>
        </div>
        </div>
        

    </div>
    <div class="divFooter">
        ${txtBtnSave}
        <div id="buttonCancel" class="buttons btnCancel neg">إلغاء</div>
    </div>
    `;
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    if( idUserSkill != null ) {
        document.getElementById("buttonEditSkill").addEventListener("click", function() { 
            clickEditSkill(idUserSkill);
        });
    } else {
        document.getElementById("buttonSaveSkill").addEventListener("click", clickAddSkill);
    }
    
    document.getElementById("buttonCancel").addEventListener("click", cancel);
    
    fillProfileSelectSkill();

    if( idUserSkill != null )
    {
        
        document.getElementById('selectskill').value = codeSkill;
        document.getElementById("selectskilllevel").value = codeLevel;
        
    }
}

function clickAddSkill() {
    
    let codeSkill = document.getElementById("selectskill").value ;
    let codeLevel = document.getElementById("selectskilllevel").value ;
    let description = document.getElementById("inputDescription").value ;
    
    let validSkill = document.getElementById("validSkill");
    let validSkillLevel = document.getElementById("validSkillLevel");
    let validDescription = document.getElementById("validDescription");
    
    if( codeSkill == 0 ) {
        validSkill.textContent = "الرجاء اختيار المهارة المطلوبة";
        return;
    } else {
        validSkill.textContent = "";
    }
    
    if( codeLevel == 0 ) {
        validSkillLevel.textContent = "الرجاء اختيار مستوى المهارة";
        return;
    } else {
        validSkillLevel.textContent = "";
    }
    
    
    let [status,textError] = mainApp.validationInput( description , "text" );
    if( !status ) {
        validDescription.textContent = textError;
        return;
    } else {
        validDescription.textContent = "";
    }
    
    
    myProfile.addUserSkill( codeSkill , codeLevel , description ).then( (result) => {
        
        myProfile.fillProfileUserSkill( result );
        fillProfileUserSkill();
        
        cancel();
        mainApp.codeWraningNotification( "تم إضافة المهارة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}
function clickEditSkill( idUserSkill ) {
    
    let codeSkill = document.getElementById("selectskill").value ;
    let codeLevel = document.getElementById("selectskilllevel").value ;
    let description = document.getElementById("inputDescription").value ;
    
    let validSkill = document.getElementById("validSkill");
    let validSkillLevel = document.getElementById("validSkillLevel");
    let validDescription = document.getElementById("validDescription");
    
    if( codeSkill == 0 ) {
        validSkill.textContent = "الرجاء اختيار المهارة المطلوبة";
        return;
    } else {
        validSkill.textContent = "";
    }
    
    if( codeLevel == 0 ) {
        validSkillLevel.textContent = "الرجاء اختيار مستوى المهارة";
        return;
    } else {
        validSkillLevel.textContent = "";
    }
    
    
    let [status,textError] = mainApp.validationInput( description , "text" );
    if( !status ) {
        validDescription.textContent = textError;
        return;
    } else {
        validDescription.textContent = "";
    }
    

    myProfile.updateUserSkill( idUserSkill , codeSkill , codeLevel , description ).then( (result) => {
        
        myProfile.fillProfileUserSkill( result );
        fillProfileUserSkill();
        
        cancel();
        mainApp.codeWraningNotification( "تم تحديث المهارة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
    

}
function clickRemoveSkill( idUserSkill ) {

    myProfile.removeUserSkill( idUserSkill ).then( (result) => {
        
        myProfile.fillProfileUserSkill( result );
        fillProfileUserSkill();
        
        cancel();
        mainApp.codeWraningNotification( "تم حذف المهارة", "success" );
        
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
            
            txt = "خطأ غير معروف, حاول مرة أخرى !!";
            mainApp.codeWraningNotification( txt , "error" );
            
        } else {
            
            txt = "خطأ غير معروف !";
            mainApp.codeWraningNotification( txt , "error" );
            
        }
        
        // alert(txt);
        
    });
}







function fillProfileSelectContactType() {
    
    let selectContactType = document.getElementById("selectcontacttype");
    selectContactType.innerHTML = `<option value='0'>-اختر نوع التواصل-</option>`;
    
    let listContactType = myProfile.getListContactType();
    
    for(var i=0; i<listContactType.length; i++) {

        const code = listContactType[i]["code"];
        const name = listContactType[i].name;

        let codeoption = `<option value="${code}">${name}</option>`;

        selectContactType.insertAdjacentHTML("beforeend", codeoption);
    }
    
    
    
    selectContactType.addEventListener("change", (event) => {

        for(var i=0; i<listContactType.length; i++) {
            
            if(listContactType[i].code == event.target.value )
            {
                let valueContact = document.getElementById("inputContact");
                
                const name = listContactType[i].name;
                valueContact.setAttribute('placeholder', "أدخل "+name);
                
            }

        }
    });
}
function fillProfileSelectSkill() {
    
    let selectSkill = document.getElementById('selectskill');
    let selectSkillLevel = document.getElementById('selectskilllevel');
    
    selectSkill.innerHTML = `<option value='0' >-اختر المهارة-</option>"`;
    selectSkillLevel.innerHTML = `<option value='0' >-اختر الإجادة-</option>"`;
    
    let listSkill = myProfile.getListSkill();
    let listSkillLevel = myProfile.getListSkillLevel();
    
    for(var i=0; i<listSkill.length; i++) 
    {
        
        const id = listSkill[i]["id"];
        const code = listSkill[i]["code"];
        const name = listSkill[i].name;

        let codeoption = `<option value="${code}">${name}</option>`;
        
        selectSkill.insertAdjacentHTML("beforeend", codeoption);
        
    }
    
    for(var i=0; i<listSkillLevel.length; i++) 
    {
        
        const code = listSkillLevel[i]["code"];
        const name = listSkillLevel[i].name;

        let codeoption = `<option value="${code}">${name}</option>`;
        
        selectSkillLevel.insertAdjacentHTML("beforeend", codeoption);
        
    }

    let codeoption = `<option value="-1">أخرى</option>`;
        
    selectSkill.insertAdjacentHTML("beforeend", codeoption);



}













function initNavMy() {
    
    const listProject = document.getElementById('containerListRowMy');
    
    
    let isDrag = false;
    let valDrag = 0;
    let startDrag = 0;
    let startScroll = 0;
    
    const dragStart = (e) => {
        isDrag = true;
        startDrag = e.pageX;
        startScroll = listProject.scrollLeft;
        listProject.classList.add("dragging");
    }
    const dragEnd = () => {
        isDrag = false;
        listProject.classList.remove("dragging");
    }
    
    const dragging = (e) => {
        
        if(!isDrag) return;
        
        listProject.scrollLeft = startScroll - ( e.pageX - startDrag );
    }
    
    listProject.addEventListener("mousedown", dragStart );
    listProject.addEventListener('mouseup', dragEnd )
    listProject.addEventListener("mousemove", dragging );
}
function clickNavMyRight() {
    
    const listProjects = myProfile.getListProjectMy();
    
    if( listProjects.length > 0) {
        
        let widthCard = 300;
        widthCard = document.getElementsByClassName("cardProject")[0].offsetWidth + 20;
        
        const listProject = document.getElementById('containerListRowMy');
        listProject.scrollLeft += widthCard;
        
    } else {
        
    }
    
    

}
function clickNavMyLeft() {
    
    const listProjects = myProfile.getListProjectMy();
    
    if( listProjects.length > 0) {
        
        let widthCard = 300;
        widthCard = document.getElementsByClassName("cardProject")[0].offsetWidth + 20;
        
        const listProject = document.getElementById('containerListRowMy');
        listProject.scrollLeft -= widthCard;
    
    } else {
        
    }
}





function initNavJoin() {
    
    const listProject = document.getElementById('containerListRowJoin');
    
    
    let isDrag = false;
    let valDrag = 0;
    let startDrag = 0;
    let startScroll = 0;
    
    const dragStart = (e) => {
        isDrag = true;
        startDrag = e.pageX;
        startScroll = listProject.scrollLeft;
        listProject.classList.add("dragging");
    }
    const dragEnd = () => {
        isDrag = false;
        listProject.classList.remove("dragging");
    }
    
    const dragging = (e) => {
        
        if(!isDrag) return;
        
        listProject.scrollLeft = startScroll - ( e.pageX - startDrag );
    }
    
    listProject.addEventListener("mousedown", dragStart );
    listProject.addEventListener('mouseup', dragEnd )
    listProject.addEventListener("mousemove", dragging );
}
function clickNavJoinRight() {
    
    const listProjects = myProfile.getListProjectJoin();
    
    if( listProjects.length > 0) {
        
        let widthCard = 300; 
        widthCard = document.getElementsByClassName("cardProject")[0].offsetWidth + 20;
        
        const listProject = document.getElementById('containerListRowJoin');
        listProject.scrollLeft += widthCard;
        
    } else {
        
    }
    
    

}
function clickNavJoinLeft() {
    
    const listProjects = myProfile.getListProjectJoin();
    
    if( listProjects.length > 0) {
        
        let widthCard = 300; 
        widthCard = document.getElementsByClassName("cardProject")[0].offsetWidth + 20;
        
        const listProject = document.getElementById('containerListRowJoin');
        listProject.scrollLeft -= widthCard;
    
    } else {
        
    }
}
