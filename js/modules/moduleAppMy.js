import * as moduleUserLog from './moduleUserLog.js';

import Main from './moduleMain.js';

import Project, { ProjectFull , Category , Type , ProjectStatus , JoinStatus , TaskStatus , MemberStatus } from './moduleProject.js';
import Skill, { SkillCategory } from './moduleSkill.js';



let mainApp = new Main();
let myProject = null;



const pathCreateSkill = mainApp.pathDomain + "api/createProjectSkill.php";
const pathCreateTask = mainApp.pathDomain + "api/createProjectTask.php";
const pathUpdateMemberStatus = mainApp.pathDomain + "api/updateMemberStatus.php";
const pathUpdateMemberMark = mainApp.pathDomain + "api/updateMemberMark.php";
const pathUpdateTaskStatus = mainApp.pathDomain + "api/updateTaskStatus.php";
const pathUpdateProject = mainApp.pathDomain + "api/updateProjectData.php";
const pathUpdateProjectSkill = mainApp.pathDomain + "api/updateProjectSkillData.php";




export function initApp( data ) {
    
    init_User();
    
    init_Project();
    
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    document.getElementById('lightBox').addEventListener("click" , clickBoxOut );
    document.getElementById('lightBoxCard').addEventListener("click" , clickBox );
    document.getElementById('buttonGoToLive').addEventListener("click" , clickGoToLiveProject );
    document.getElementById('switchProjectStatus').addEventListener("click" , clickSwitchProjectStatus );
    
    document.getElementById('buttonDeleteProject').addEventListener("click" , clickDeleteProject );
    document.getElementById('buttonFinishProject').addEventListener("click" , clickFinishProject );
    
    document.getElementById('buttonEditName').addEventListener("click" , clickEditName );
    document.getElementById('buttonEditCategory').addEventListener("click" , clickEditCategory );
    document.getElementById('buttonEditType').addEventListener("click" , clickEditType );
    document.getElementById('buttonEditDescription').addEventListener("click" , clickEditDescription );
    document.getElementById('buttonEditGoals').addEventListener("click" , clickEditGoals );
    
    document.getElementById('btnAddSkill').addEventListener("click" , clickAddSkill );
    document.getElementById('btnAddDirect').addEventListener("click" , clickAddDirect );
    
    document.getElementById('buttonViewDirect').addEventListener("click" , viewSkillAndDirect );
    document.getElementById('buttonViewSkill').addEventListener("click" , viewSkillAndDirect );
    
    document.getElementById('buttonEvaluation').addEventListener("click" , clickEvaluationMembers );
    
    
    document.getElementById('selectTaskSkillAll').addEventListener("change" , fillterTasksAll);
    document.getElementById('selectTaskStatus').addEventListener("change" , fillterTasksAll);
    document.getElementById('selectTaskSkillFilter').addEventListener("change" , fillterTasksFilter);
    document.getElementById('selectTaskSkillDone').addEventListener("change" , fillterTasksDone);
    
    
    document.getElementById('selectMemberSkillAll').addEventListener("change" , fillterMemberAll);
    document.getElementById('selectMemberStatus').addEventListener("change" , fillterMemberAll);
    document.getElementById('selectMemberSkillFilter').addEventListener("change" , fillterMemberFilter);
    document.getElementById('selectMemberSkillDone').addEventListener("change" , fillterMemberDone);
    
    
}



function init_User() {
    
    moduleUserLog.init_User();
    
    mainApp.setMenu();
    
    mainApp.setupProfile( moduleUserLog.getUser().userCode , moduleUserLog.getUser().userImageProfile );
    
}

function init_Project() {
    
    const pathDataMyProject = mainApp.pathDomain + "api/readDataMyProject.php";
    
    var codeProject = mainApp.getValCookie("codeproject");
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", codeProject );
    
    mainApp.send("POST", pathDataMyProject , headers , formData ).then( ( result ) => {
        
        myProject = new ProjectFull( result );
        
        return result;
        
    }).then( (result) => {
        
        fillListData( result );
        
        fillShowData();
        fillProjectSkills();
        fillProjectCharts();
        fillProjectMember();
        fillProjectTask();
        fillProjectDirect();
        
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
    
    
    
    let visitorProject = document.getElementById("visitorProject");
    
    let totalView = myProject.totalView;
    
    if( totalView == null ) {
        totalView = 0;
    }
    
    visitorProject.textContent = totalView;
    
    setSwitchStatusComponent( "switchProjectStatus" , myProject.codeStatusJoin );
    
    
    
    
    let gridShow = document.getElementById("griddetailes");
    
    let cards = gridShow.getElementsByClassName("card");
    
    for(var i=0; i<cards.length; ++i) {
        let elementCard = cards[i];
        
        elementCard.addEventListener('mouseover', () => {
            let btn = elementCard.getElementsByClassName("elaveted");
            if( btn.length > 0 ) { 
                
                btn = btn[0]; 
                btn.classList.remove("hide");
                
                let icn = btn.getElementsByTagName("svg")[0];
                icn.addEventListener('mouseover', () => {
                    icn.classList.remove("hilight");
                });
                icn.addEventListener('mouseout', () => {
                    icn.classList.add("hilight");
                });
                
            }
            
        });
        
        elementCard.addEventListener('mouseout', () => {
            let btn = elementCard.getElementsByClassName("elaveted");
            if( btn.length > 0 ) { 
                
                btn = btn[0]; 
                btn.classList.add("hide");
                
            }
            
        });
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
        
        let nameStatus ="...";
        let nameClassStatus = "";
        
        if( codeStatusJoin == enumJoinStatus.Enable ) {
            
            nameStatus = enumJoinStatus.getName( enumJoinStatus.Enable );
            nameClassStatus = "enable";
            
        } else {
            
            nameStatus = enumJoinStatus.getName( enumJoinStatus.NotEnable );
            nameClassStatus = "";
            
        }
        
        let nameSkill = "";
        if( codeSkill == null ) {
            nameSkill = "أخرى" ;
        } else {
            nameSkill = myProjectSkills[i].nameSkill;
        }
        
        let nameRowSkill = "rowSkill"+i;
        let nameContainerSkillSmall = "containerSkillSmall"+i;
        let nameContainerSkillBig = "containerSkillBig"+i;
        let nameContainerBody = "containerBodySkill"+i;
        let nameContainerButton = "containerButtonSkill"+i;
        let nameContainerButtonsEdit = "containerButtonSkillEdit"+i;
        let nameButtonSkillEdit = "buttonSkillEdit"+i;
        let nameButtonSkillAdd = "buttonSkillAdd"+i;
        let nameButtonSkillRemove = "buttonSkillRemove"+i;
        let nameButtonSkillMore = "buttonSkillMore"+i;
        let nameSwitchSkillStatus = "switchSkillStatus"+i;
        
        
        
        let codeoption = `
        <li>
        <div id="${nameRowSkill}" class="containerItem containerItemSkill">
            
            <div id="${nameContainerSkillSmall}" class="containerSmall containerSmallSkillMy">
            
                <div id="${nameContainerBody}" class="containerBody">
                    <div class="containerContent" data-id="${codeSkill}">${nameSkill}</div>
                </div>
                
                <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                
                    <div id="${nameSwitchSkillStatus}" class="containerSwitch ${nameClassStatus}" data-status="${codeStatusJoin}">
                        <div id="" class="buttonSwitch">
                            ${nameStatus}
                        </div>
                    </div>
                    
                    <div id="${nameButtonSkillEdit}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgedit"/>
                        </svg>
                    </div>
                    
                    <div id="${nameButtonSkillAdd}" class="divsvg" data-id="${codeSkill}">
                        <svg class="svgfill">
                            <use xlink:href="#svgadd"/>
                        </svg>
                    </div>
                    
                    <div id="${nameButtonSkillRemove}" class="divsvg" data-id="${codeSkill}">
                        <svg class="svgfill">
                            <use xlink:href="#svgremove"/>
                        </svg>
                    </div>
                    
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
        
        listSkill.insertAdjacentHTML("beforeend", codeoption);
        
        document.getElementById( nameContainerButton ).addEventListener("click" , function ( event ) {
            event.stopPropagation();
        });
        document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function ( event ) {
            event.stopPropagation();
        });
        document.getElementById( nameContainerBody ).addEventListener("click" , function () {
            clickGoToProjectWork( code );
        });
        
        document.getElementById( nameButtonSkillMore ).addEventListener("click" , function() {
            
            document.getElementById( nameContainerBody ).classList.toggle("hide");
            document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
            
            clickSkillMore( nameContainerSkillBig );
        });
        
        document.getElementById( nameButtonSkillEdit ).addEventListener("click", function(){
            clickEditSkill( code );
        });
            
        document.getElementById( nameButtonSkillAdd ).addEventListener("click" , function () {
            clickAddTask( code );
        });
        
        document.getElementById( nameButtonSkillRemove ).addEventListener("click" , function () {
            clickRemoveSkill( code );
        });
        
        document.getElementById( nameSwitchSkillStatus ).addEventListener("click" , function( event ) {
            clickSwitchSkillStatus( code , nameSwitchSkillStatus );
        } );
        
        
        
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
    
    
    drawChartStatusPie( numTask , numTaskWork , numTaskDone );
    
    
    
    
    
    const mapTask = new Map();
    
    for(let i=0; i< numTask; i++ ) {
        
        const codeProjectSkill = myProject.listTasks[i].codeProjectSkill  ;
        const codeStatus = myProject.listTasks[i].codeStatus  ;
        
        if( mapTask.get(codeProjectSkill) == undefined ) {
            
            let objectDashSkill = {
                nameSkill: "",
                totalTask: 1,
                totalWork: 0,
                totalDone: 0
            };
            
            if( codeStatus == enumTaskStatus.New ) {
                
            } else if( codeStatus == enumTaskStatus.Delivered ) {
             
                objectDashSkill.totalDone += 1;
             
            } else if( codeStatus == enumTaskStatus.Underway || codeStatus == enumTaskStatus.WaitingApproval || codeStatus == enumTaskStatus.WaitingModification ) {
             
                objectDashSkill.totalWork += 1;
             
            }
            
            mapTask.set( codeProjectSkill , objectDashSkill );
            
        } else {
            
            let objectDashSkill = mapTask.get(codeProjectSkill);
            
            objectDashSkill.totalTask = objectDashSkill.totalTask + 1;
            
            if( codeStatus == enumTaskStatus.New ) {
                
            } else if( codeStatus == enumTaskStatus.Delivered ) {
             
                objectDashSkill.totalDone += 1;
             
            } else if( codeStatus == enumTaskStatus.Underway || codeStatus == enumTaskStatus.WaitingApproval || codeStatus == enumTaskStatus.WaitingModification ) {
             
                objectDashSkill.totalWork += 1;
             
            }
            
        }
        
    }
    
    drawChartStatusColumn( mapTask.length , mapTask );
    
    
    /*------------*/
    
    const mapMembers = new Map();
    const totalMembers = myProject.listMembers.length;
    for(let i=0; i< totalMembers; i++ ) {
        
        const codeProjectSkill = myProject.listMembers[i].codeProjectSkill;
        
        
        if( mapMembers.get(codeProjectSkill) == undefined ) {
            
            mapMembers.set( codeProjectSkill , 1 );
            
        } else {
            
            let num = mapMembers.get(codeProjectSkill);
            mapMembers.set( codeProjectSkill , num+1 );
            
        }
        
    }
    
    
    drawChartMembers( totalMembers , mapMembers );
    
}

function fillProjectMember() {
    
    let listMemberAll = document.getElementById('listMemberAll');
    listMemberAll.innerHTML = "";
    
    let listMemberFilter = document.getElementById('listMemberFilter');
    listMemberFilter.innerHTML = "";
    
    let listMemberDone = document.getElementById('listMemberDone');
    listMemberDone.innerHTML = "";
    
    
    
    const myProjectMembers= myProject.listMembers;

    
    for(var i=0; i<myProjectMembers.length; i++) 
    {
        
        const code = myProjectMembers[i].code;
        const codeUser = myProjectMembers[i].codeUser;
        const codeProject = myProjectMembers[i].codeProject;
        const codeProjectSkill = myProjectMembers[i].codeProjectSkill;
        const message = myProjectMembers[i].message;
        const mark = myProjectMembers[i].mark;
        const codeStatus = myProjectMembers[i].codeStatus;
        
        const firstName = myProjectMembers[i].firstName;
        const lastName = myProjectMembers[i].lastName;
        const about = myProjectMembers[i].about;
        const imageProfile = myProjectMembers[i].imageProfile;
        
        let urlImage = mainApp.checkUrlImage( imageProfile );
        
        let nameSkill = (codeProjectSkill == null) ? "لم يتم التحديد" : myProjectMembers[i].nameSkill;
        
        
        
        
        
        let nameRowMember = "rowMember"+i;
        let nameContainerMemberSmall = "containerMemberSmall"+i;
        let nameContainerMemberBig = "containerMemberBig"+i;
        let nameContainerMemberProfile = "containerMemberProfile"+i; 
        let nameContainerBody = "containerBodyMember"+i;
        
        let nameContainerButtons = "containerButtonsMember"+i;
        let nameContainerButtonsEdit = "containerButtonsMemberEdit"+i;
        let nameContainerButtonsEvaluation = "containerButtonsMemberEvaluation"+i;
        
        let nameButtonStar = "buttonStart"+i;
        let nameButtonMemberAccept = "buttonMemberAccept"+i; 
        let nameButtonMemberReject = "buttonMemberReject"+i; 
        let nameButtonMemberIgnore = "buttonMemberIgnore"+i; 
        let nameButtonMemberMore = "buttonMemberMore"+i;

        
        if( codeStatus == enumMemberStatus.Candidate ) {
            
            let codeoption = `
            <li data-codeprojectskill="${codeProjectSkill}" data-memberstatus="${codeStatus}">
            <div id="${nameRowMember}" class="containerItem containerItemMember containerMemberFillter">
                
                <div id="${nameContainerMemberSmall}" class="containerSmall containerSmallMemberMy">
                    
                    <div id="${nameContainerMemberProfile}" class="containerProfile">
                        <div class="containerProfileImage">
                            <img src="${urlImage}">
                        </div>
                        
                        <div class="containerProfileText">
                            <div class="containerTextName" data-id="${codeUser}">${firstName} ${lastName}</div>
                            <div class="containerTextAbout">${about}</div>
                        </div>
                    </div>
                    
                    <div id="${nameContainerBody}" class="containerBody member">
                        <div class="containerContent member">${nameSkill}</div>
                    </div>
                    
                    <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                        
                        <div id="${nameButtonMemberAccept}" class="divsvg">
                            <svg class="svgfill">
                                <use xlink:href="#svgaccepte"/>
                            </svg>
                        </div>
                        
                        <div id="${nameButtonMemberIgnore}" class="divsvg">
                            <svg class="svgfill">
                                <use xlink:href="#svgignore"/>
                            </svg>
                        </div>
                            
                    </div>
                    
                    <div id="${nameContainerButtons}" class="containerButtons">
                        
                        <div id="${nameButtonMemberMore}" class="divsvg">
                            <svg class="svgstroke">
                                <use xlink:href="#svgdown"/>
                            </svg>
                        </div>
                        
                    </div>
                </div>
                
                <div id="${nameContainerMemberBig}" class="containerBig hide">
                    <div class="containerHeader">
                        <div class="containerContent">${nameSkill}</div>
                    </div>
                    <div class="containerBody">
                        <div class="containerContent">${message}</div>
                    </div>
                </div>
                
            </div>
            </li>
            `;
            
            
            listMemberFilter.insertAdjacentHTML("beforeend", codeoption);
            
            document.getElementById( nameContainerButtons ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            document.getElementById( nameContainerBody ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            
            document.getElementById( nameContainerMemberProfile ).addEventListener("click" , function() {
                mainApp.goToProfile( codeUser );
            });
            
            document.getElementById( nameButtonMemberMore ).addEventListener("click" , function() {
                
                document.getElementById( nameContainerMemberProfile ).classList.toggle("hide");
                document.getElementById( nameContainerBody ).classList.toggle("hide");
                document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
                
                clickMemberMore( nameContainerMemberBig ); 
            });
            
            document.getElementById( nameButtonMemberAccept ).addEventListener("click", function(){
                clickMemberFilterAccepted( code , codeUser );
            });
            document.getElementById( nameButtonMemberIgnore ).addEventListener("click", function(){
                clickMemberIgnore( code );
            });
            
            
        } else if( codeStatus == enumMemberStatus.Accepted ) {
            
            let codeoption = `
            <li data-codeprojectskill="${codeProjectSkill}" data-memberstatus="${codeStatus}">
            <div id="${nameRowMember}" class="containerItem containerItemMember containerMemberDone">
                
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
                    
                    <div id="${nameContainerBody}" class="containerBody member">
                        <div class="containerContent member">${nameSkill}</div>
                    </div>
                    
                    <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                    
                        <div id="${nameButtonMemberIgnore}" class="divsvg">
                            <svg class="svgfill">
                                <use xlink:href="#svgignore"/>
                            </svg>
                        </div>
                        
                    </div>
                    
                    <div id="${nameContainerButtons}" class="containerButtons">
                        
                        <div id="${nameButtonMemberMore}" class="divsvg">
                            <svg class="svgstroke">
                                <use xlink:href="#svgdown"/>
                            </svg>
                        </div>
                        
                    </div>
                    
                    <div id="${nameContainerButtonsEvaluation}" class="containerButtonsEvaluation hide">
                    
                    </div>
                    
                </div>
                
                <div id="${nameContainerMemberBig}" class="containerBig hide">
                    <div class="containerHeader">
                        <div class="containerContent">${nameSkill}</div>
                    </div>
                    <div class="containerBody">
                        <div class="containerContent">${message}</div>
                    </div>
                </div>
                
            </div>
            </li>
            `;
            
            listMemberDone.insertAdjacentHTML("beforeend", codeoption);
            
            creationStars( nameContainerButtonsEvaluation , code , nameButtonStar , mark );
            
            document.getElementById( nameContainerButtons ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            document.getElementById( nameContainerButtonsEvaluation ).addEventListener("click", function(){
                event.stopPropagation();
            });
            document.getElementById( nameContainerBody ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            
            document.getElementById( nameButtonMemberMore ).addEventListener("click" , function() {
                
                document.getElementById( nameContainerMemberProfile ).classList.toggle("hide");
                document.getElementById( nameContainerBody ).classList.toggle("hide");
                document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
                
                clickMemberMore( nameContainerMemberBig ); 
            });
            
            document.getElementById( nameContainerMemberSmall ).addEventListener("click" , function() {
                mainApp.goToProfile( codeUser );
            });
            
            document.getElementById( nameButtonMemberIgnore ).addEventListener("click", function(){
                clickMemberIgnore( code );
            });
            
            
        } else {
            
            if( codeStatus == enumMemberStatus.Leave ) {
                return;
            }
            
            let memberStatus = ( codeStatus == enumMemberStatus.New ) ? "" : ( codeStatus == enumMemberStatus.Rejected ) ? "reject" : "ignore" ;
            
            let codeoption = `
            <li data-codeprojectskill="${codeProjectSkill}" data-memberstatus="${codeStatus}">
            <div id="${nameRowMember}" class="containerItem containerItemMember containerMemberRequest">
                
                <div id="${nameContainerMemberSmall}" class="containerSmall containerSmallMember ${memberStatus}">
                    
                    <div id="${nameContainerMemberProfile}" class="containerProfile">
                        <div class="containerProfileImage">
                            <img src="${urlImage}">
                        </div>
                        
                        <div class="containerProfileText">
                            <div class="containerTextName" data-id="${codeUser}">${firstName} ${lastName}</div>
                            <div class="containerTextAbout">${about}</div>
                        </div>
                    </div>
                    
                    <div id="${nameContainerBody}" class="containerBody member">
                        <div class="containerContent member">${nameSkill}</div>
                    </div>
                    
                    <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                    
                        <div id="${nameButtonMemberAccept}" class="divsvg">
                            <svg class="svgfill">
                                <use xlink:href="#svgaccepte"/>
                            </svg>
                        </div>
                        
                        <div id="${nameButtonMemberReject}" class="divsvg">
                            <svg class="svgfill">
                                <use xlink:href="#svgremove"/>
                            </svg>
                        </div>
                        
                        <div id="${nameButtonMemberIgnore}" class="divsvg">
                            <svg class="svgfill">
                                <use xlink:href="#svgignore"/>
                            </svg>
                        </div>
                    
                    </div>
                    
                    <div id="${nameContainerButtons}" class="containerButtons">
                        
                        <div id="${nameButtonMemberMore}" class="divsvg">
                            <svg class="svgstroke">
                                <use xlink:href="#svgdown"/>
                            </svg>
                        </div>
                        
                    </div>
                </div>
                
                <div id="${nameContainerMemberBig}" class="containerBig hide">
                    <div class="containerHeader">
                        <div class="containerContent">${nameSkill}</div>
                    </div>
                    <div class="containerBody">
                        <div class="containerContent">${message}</div>
                    </div>
                </div>
                
            </div>
            </li>
            `;

            
            listMemberAll.insertAdjacentHTML("beforeend", codeoption);
            
            document.getElementById( nameContainerButtons ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            document.getElementById( nameContainerBody ).addEventListener("click" , function() {
                event.stopPropagation();
            });
            
            document.getElementById( nameContainerMemberProfile ).addEventListener("click" , function() {
                mainApp.goToProfile( codeUser );
            });
            
            document.getElementById( nameButtonMemberMore ).addEventListener("click" , function() {
                
                document.getElementById( nameContainerMemberProfile ).classList.toggle("hide");
                document.getElementById( nameContainerBody ).classList.toggle("hide");
                document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
                
                clickMemberMore( nameContainerMemberBig );
            });
            
            document.getElementById( nameButtonMemberAccept ).addEventListener("click", function() {
                clickMemberAccepted( code );
            });
            document.getElementById( nameButtonMemberReject ).addEventListener("click", function() {
                clickMemberRejected( code , codeUser );
            });
            document.getElementById( nameButtonMemberIgnore ).addEventListener("click", function() {
                clickMemberIgnore( code );
            });
            
            
            
            
        }
        
    }
}

function creationStars( elementItem , codeMember , nameButtonStar , num ) {
    let el = document.getElementById( elementItem );
    
    
    
    const buttonStart_1 = nameButtonStar+"_1";
    const buttonStart_2 = nameButtonStar+"_2";
    const buttonStart_3 = nameButtonStar+"_3";
    const buttonStart_4 = nameButtonStar+"_4";
    const buttonStart_5 = nameButtonStar+"_5";
    
    let aryStar = ["svgstartlight", "svgstartlight", "svgstartlight", "svgstartlight", "svgstartlight"];
    for(let i=0; i<aryStar.length; i++) {
        
        if( i < num ) {
            aryStar[i] = "svgstartdark";
        }
    }
    
    let codeStar =`
        <div id="${buttonStart_1}" class="divsvg">
            <svg class="svgfill">
                <use xlink:href="#${aryStar[0]}"/>
            </svg>
        </div>
        <div id="${buttonStart_2}" class="divsvg">
            <svg class="svgfill">
                <use xlink:href="#${aryStar[1]}"/>
            </svg>
        </div>
        <div id="${buttonStart_3}" class="divsvg">
            <svg class="svgfill">
                <use xlink:href="#${aryStar[2]}"/>
            </svg>
        </div>
        <div id="${buttonStart_4}" class="divsvg">
            <svg class="svgfill">
                <use xlink:href="#${aryStar[3]}"/>
            </svg>
        </div>
        <div id="${buttonStart_5}" class="divsvg">
            <svg class="svgfill">
                <use xlink:href="#${aryStar[4]}"/>
            </svg>
        </div>
        `;
        
        el.insertAdjacentHTML("beforeend", codeStar);
        
        document.getElementById( buttonStart_1 ).addEventListener("click", function(){
            event.stopPropagation();
            clickEvaluationMemberStar( codeMember , 1 );
        });
        document.getElementById( buttonStart_2 ).addEventListener("click", function(){
            event.stopPropagation();
            clickEvaluationMemberStar( codeMember , 2 );
        });
        document.getElementById( buttonStart_3 ).addEventListener("click", function(){
            event.stopPropagation();
            clickEvaluationMemberStar( codeMember , 3 );
        });
        document.getElementById( buttonStart_4 ).addEventListener("click", function(){
            event.stopPropagation();
            clickEvaluationMemberStar( codeMember , 4 );
        });
        document.getElementById( buttonStart_5 ).addEventListener("click", function(){
            event.stopPropagation();
            clickEvaluationMemberStar( codeMember , 5 );
        });
    
}

function fillProjectTask() {
    let listTaskAll = document.getElementById('listTaskAll');
    listTaskAll.innerHTML = "";
    
    let listTaskFilter = document.getElementById('listTaskFilter');
    listTaskFilter.innerHTML = "";
    
    let listTaskDone = document.getElementById('listTaskDone');
    listTaskDone.innerHTML = "";
    
    const myProjectTasks = myProject.listTasks;

    
    for(var i=0; i<myProjectTasks.length; i++) 
    {
        const code = myProjectTasks[i].code;
        const name = myProjectTasks[i].name;
        const description = myProjectTasks[i].description;
        const codeProjectSkill = myProjectTasks[i].codeProjectSkill;
        const codeUser = myProjectTasks[i].codeUser;
        
        const codeStatus = myProjectTasks[i].codeStatus;
        const note = myProjectTasks[i].note;
        
        
        
        let colorTaskStatus = "";
        let classTask = "";
        let taskDone = "";
        if( codeStatus == enumTaskStatus.New ) {
            classTask = "containerTaskAll";
        } else if( codeStatus == enumTaskStatus.Underway ) {
            classTask = "containerTaskAll";
            colorTaskStatus = "taskNotMe";
        } else if( codeStatus == enumTaskStatus.WaitingApproval ) {
            classTask = "containerTaskDone";
        } else if( codeStatus == enumTaskStatus.WaitingModification ) {
            classTask = "containerTaskAll";
            colorTaskStatus = "taskReturn";
        } else if( codeStatus == enumTaskStatus.Delivered ) {
            classTask = "containerTaskDone";
            taskDone = "done";
        }
        

        let nameRowSkill = "rowTask"+i;
        let nameContainerTaskSmall = "containerTaskSmall"+i;
        let nameContainerTaskBig = "containerTaskBig"+i;
        
        let nameContainerBody = "containerBodyTask"+i;
        let nameContainerButton = "containerButtonTask"+i;
        let nameContainerButtonsEdit = "containerButtonsTaskEdit"+i;
        
        let nameButtonTaskRemove = "buttonTaskRemove"+i; 
        let nameButtonTaskEdit = "buttonTaskEdit"+i; 
        let nameButtonTaskAccept = "buttonTaskAccept"+i; 
        let nameButtonTaskReturn = "buttonTaskReturn"+i; 
        let nameButtonTaskLeave = "buttonTaskLeave"+i;
        let nameButtonTaskExclamation = "buttonTaskExclamation"+i; 
        let nameButtonMoreTask = "buttonTaskMore"+i;
        
        let codeoption = `
        <li data-codeprojectskill="${codeProjectSkill}" data-taskstatus="${codeStatus}">
        <div id="${nameRowSkill}" class="containerItem containerItemTask ${classTask}">
            
            <div id="containerSmall" class="containerSmall containerSmallTask ${colorTaskStatus}">
                
                
                <div id="${nameContainerBody}" class="containerBody">
                    <div class="containerContent ${taskDone}">${name}</div>
                </div>
                
                <div id="${nameContainerButtonsEdit}" class="containerButtonsEdit hide">
                    
                </div>
                
                <div id="${nameContainerButton}" class="containerButtons">
                    
                    <div id="${nameButtonMoreTask}" class="divsvg">
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
            
            
        if( codeStatus == enumTaskStatus.Delivered ) {
            
            listTaskDone.insertAdjacentHTML("beforeend", codeoption);
        
        } else if( codeStatus == enumTaskStatus.WaitingApproval ) {
            
            listTaskFilter.insertAdjacentHTML("beforeend", codeoption);
            
        } else {
            
            listTaskAll.insertAdjacentHTML("beforeend", codeoption);
            
        }
        
        
        insertListButtons( i, nameContainerButtonsEdit, code, codeUser, codeStatus, note );
        
        document.getElementById( nameContainerButton ).addEventListener("click" , function ( event ) {
            event.stopPropagation();
        });
        document.getElementById( nameContainerButtonsEdit ).addEventListener("click" , function ( event ) {
            event.stopPropagation();
        });
        document.getElementById( nameContainerBody ).addEventListener("click" , function ( event ) {
            event.stopPropagation();
        });
        
        document.getElementById( nameButtonMoreTask ).addEventListener("click" , function() {
            
            document.getElementById( nameContainerBody ).classList.toggle("hide");
            document.getElementById( nameContainerButtonsEdit ).classList.toggle("hide");
            
            clickMoreTask( nameContainerTaskBig );
            
        });
        
        
        
        
    }
}


function insertListButtons( i, idElement, code, codeUser, codeStatus, note ) {
    
    let containerButtons = document.getElementById(idElement);

    let nameButtonTaskRemove = "buttonTaskRemove"+i; 
    let nameButtonTaskEdit = "buttonTaskEdit"+i; 
    let nameButtonTaskAccept = "buttonTaskAccept"+i; 
    let nameButtonTaskReturn = "buttonTaskReturn"+i; 
    let nameButtonTaskLeave = "buttonTaskLeave"+i;
    let nameButtonTaskExclamation = "buttonTaskExclamation"+i; 
    
        
    if( codeStatus == enumTaskStatus.New ) {
        
        const codeItem = `
            
                    <div id="${nameButtonTaskEdit}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgedit"/>
                        </svg>
                    </div>
                    
                    <div id="${nameButtonTaskRemove}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgremove"/>
                        </svg>
                    </div>
            
        `;
        
        containerButtons.insertAdjacentHTML("beforeend", codeItem);
        
        document.getElementById( nameButtonTaskEdit ).addEventListener("click", function(){
            clickEditTask( code );
        });
        document.getElementById( nameButtonTaskRemove ).addEventListener("click", function(){
            clickRemoveTask( code );
        });
        
        
    } else {
        
        
        if( codeStatus == enumTaskStatus.Underway ) {
        
            const codeItem = `
                    
                    <div id="${nameButtonTaskLeave}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgtakeout"/>
                        </svg>
                    </div>
                
            `;
            
            containerButtons.insertAdjacentHTML("beforeend", codeItem);
            
            document.getElementById( nameButtonTaskLeave ).addEventListener("click", function(){
                clickTaskLeave( code );
            });
            
        } else if( codeStatus == enumTaskStatus.WaitingApproval ) {
            
            
            const codeItem = `
            
                    <div id="${nameButtonTaskAccept}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgaccepte"/>
                        </svg>
                    </div>
                    
                    <div id="${nameButtonTaskReturn}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgreturn"/>
                        </svg>
                    </div>
                
            `;
            
            containerButtons.insertAdjacentHTML("beforeend", codeItem);
            
            document.getElementById( nameButtonTaskAccept ).addEventListener("click", function(){
                clickTaskAccepted( code , codeUser );
            });
            document.getElementById( nameButtonTaskReturn ).addEventListener("click", function(){
                clickTaskReturn( code , codeUser );
            });
            
            
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
                
            `;
            
            containerButtons.insertAdjacentHTML("beforeend", codeItem);
            
            
            document.getElementById( nameButtonTaskExclamation ).addEventListener("click", function(){
                clickTaskEditNote( code , note );
            });
            document.getElementById( nameButtonTaskLeave ).addEventListener("click", function(){
                clickTaskLeave( code );
            });
            
            
        } else if( codeStatus == enumTaskStatus.Delivered ) {
            
            const codeItem = `
                    
                    <div id="${nameButtonTaskReturn}" class="divsvg">
                        <svg class="svgfill">
                            <use xlink:href="#svgreturn"/>
                        </svg>
                    </div>
                
            `;
            
            containerButtons.insertAdjacentHTML("beforeend", codeItem);
            
            document.getElementById( nameButtonTaskReturn ).addEventListener("click", function(){
                clickTaskReturn( code , codeUser);
            });
            
            
        }
        
        
    }
}


function fillProjectDirect() {
    
    let listDirect = document.getElementById('listDirect');
    listDirect.innerHTML = "";
    
    const myProjectDirects = myProject.listDirects;

    
    for(var i=0; i<myProjectDirects.length; i++) 
    {
        const code = myProjectDirects[i].code;
        const content = myProjectDirects[i].content;
        const codeProjectSkill = myProjectDirects[i].codeProjectSkill;
        
        let directTo = "";
        let nameSkill = "-";
        
        if( codeProjectSkill == null ) {
            directTo = "عام";
        } else {
            
            let codeSkill = null;
            
            const myProjectSkills = myProject.listSkills;
            
            for( let i=0; i<myProjectSkills.length; i++ ) {
                
                if( myProjectSkills[i].code == codeProjectSkill ) {
                    codeSkill = myProjectSkills[i].codeSkill;
                    
                    for(let x=0; x<listSkill.length; x++ ) {
                        
                        if( listSkill[x].code == codeSkill ) {
                            
                            directTo = listSkill[x].name;
                            
                            break;
                        }
                    }
                    
                } else {
                    
                }
                
                
            }
            
            
            
        }
        
        
        let nameIdDirectEdit = "idDirectEdit"+i;
        let nameIdDirectRemove = "idDirectRemove"+i; 
        const codeDirect = `
            <li>
                <div class="containerDirect">
                
                    <div class="containerBody">
                    ${content}
                    </div>
                    
                    <div class="containerFooter">
                    
                        <div class="containerCode">
                            ${directTo}
                        </div>
                        
                        <div class="containerButtons">
                            
                            <div id="${nameIdDirectEdit}" class="divsvg">
                                <svg class="svgfill">
                                    <use xlink:href="#svgedit"/>
                                </svg>
                            </div>
                            
                            <div id="${nameIdDirectRemove}" class="divsvg">
                                <svg class="svgfill">
                                    <use xlink:href="#svgremove"/>
                                </svg>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </li>
        `;
        
        listDirect.insertAdjacentHTML("beforeend", codeDirect);
        
    
        document.getElementById( nameIdDirectEdit ).addEventListener("click", function(){
            clickEditDirect( code );
        });
        document.getElementById( nameIdDirectRemove ).addEventListener("click", function(){
            clickRemoveDirect( code );
        });
        
    }
}

function drawChartStatusPie( numTask , numTaskWork , numTaskDone ) {
    
    const canvasStatus = document.getElementById("canvasBoardStatusPie");
    const ctx = canvasStatus.getContext("2d");
    


    //nums
    const pointcenter = 50;
    const pointx = canvasStatus.width/2;
    const pointy = canvasStatus.height/2;
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

function drawChartStatusColumn( total , mapTask ) {
    
    const canvasStatus = document.getElementById("canvasBoardStatusColumn");
    const ctx = canvasStatus.getContext("2d");
    
}

function drawChartMembers( totalMembers , arrayMembers ) {
    
    //
    const canvasType = document.getElementById("canvasBoardMembers"); // canvasPermitStatus
    const ctx = canvasType.getContext("2d");
    
    //nums
    const pointcenter = 50;
    const pointx = canvasType.width/2;
    const pointy = canvasType.height/2;
    const red = 80 ;
    
    let drawStart = 0;
    let drawEnd = 180;
    
    let currentAngle = 0;
    
    // draw
    let i = 0;
    for(const [key, value] of arrayMembers) {
        
        
        
        let sumType = value / totalMembers;
        let startAngel = sumType * (2*Math.PI) ;
        let colors = "white";
        
        if(i==0)
        {
            colors = "#053B50";
        }
        else if(i==1)
        {
            colors = "#445069";
        }
        else if(i==2)
        {
            colors = "#5B9A8B";
        }
        else if(i==3)
        {
            colors = "#F7E987";
        }
        else if(i==4)
        {
            colors = "#64CCC5";
        }
        else if(i==5)
        {
            colors = "#821a63";
        }
        else
        {
            colors = "white";
        }
        
        
        // draw
        ctx.beginPath();
        
        ctx.arc(pointx, pointy, red, currentAngle, currentAngle+startAngel);
        currentAngle += startAngel;
        ctx.lineTo(pointx, pointy);
        
        ctx.fillStyle = colors;
        ctx.fill();
        
        i++;
    }
    
}



function clickEditImage() {
    
    
    let code = `
    <div class="divHeader">
        <h2>الصورة :</h2>
    </div>
    <div class="divBody">
    
        <div class="containerfiled">
        
            <div class="containerLabel">
                <label>ملف الصورة:</label>
            </div>
            
            <input type="file" id="fieldimage" class="inputs" name="imageProfile">
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
    
    document.getElementById('buttonSaveImage').addEventListener("click" , function() {
        
        if(document.getElementById('fieldimage').files.length != 1) {
            alert("الرجاء قم بإختيار ملف الصورة !");
            return;
        }
        
        const fileImage = document.getElementById('fieldimage').files[0];
        
        updateProject("image", fileImage) ;
    });
    document.getElementById('buttonCancel').addEventListener("click" , cancel );
    
}
function clickEditName() {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>تحديث اسم المشروع</h2>
        </div>
        <div class="divBody">
                            
            <div class="containerfiled input">

                <div class="containerLabel">
                    <label>اسم المشروع :</label>
                </div>
                
                <input id="nameProject" name="nameProject" class="inputs" value="${myProject.name}" placeholder="الاسم .." requred>
            </div>

        </div>
        <div class="divFooter">
            <div id="buttonUpdateName" class="buttons btnAdd">تحديث</div>
            <div id="buttonUpdateNameCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    
    document.getElementById("lightBoxCard").innerHTML = code;

    document.getElementById("buttonUpdateName").addEventListener("click" , function() {
        const name = document.getElementById("nameProject").value;
        
        let [status,textError] = mainApp.validationInput( name , "string" );
        if( !status ) {
            alert(textError);
            return;
        } else {
            
        }
        
        updateProject("name", name) ;
    });
    document.getElementById("buttonUpdateNameCancel").addEventListener("click", cancel );
}
function clickEditDescription() {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>تحديث وصف المشروع</h2>
        </div>
        <div class="divBody">
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>وصف المشروع :</label>
                </div>
                
                <textarea id="descriptionProject" name="descriptionProject" class="inputs area" value="${myProject.description}" placeholder="اضف وصف للمشروع .." requred>${myProject.description}</textarea>
            </div>

        </div>
        <div class="divFooter">
            <div id="buttonUpdateDescription" class="buttons btnAdd">تحديث</div>
            <div id="buttonUpdateDescriptionCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    
    document.getElementById("lightBoxCard").innerHTML = code;

    document.getElementById("buttonUpdateDescription").addEventListener("click" , function() {
        const description = document.getElementById("descriptionProject").value;
        
        let [status,textError] = mainApp.validationInput( description , "text" );
        if( !status ) {
            alert(textError);
            return;
        } else {
            
        }
        
        
        updateProject("description", description ) ;
    });
    document.getElementById("buttonUpdateDescriptionCancel").addEventListener("click", cancel );
}
function clickEditGoals() {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>تحديث أهداف المشروع</h2>
        </div>
        <div class="divBody">
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>أهداف المشروع :</label>
                </div>
                
                <textarea id="goalsProject" name="goalsProject" class="inputs area" value="${myProject.goals}" placeholder="اضف أهداف للمشروع .." requred>${myProject.goals}</textarea>
            </div>

        </div>
        <div class="divFooter">
            <div id="buttonUpdateGoals" class="buttons btnAdd">تحديث</div>
            <div id="buttonUpdateGoalsCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    
    document.getElementById("lightBoxCard").innerHTML = code;

    document.getElementById("buttonUpdateGoals").addEventListener("click" , function() {
        const goals = document.getElementById("goalsProject").value;
        
        let [status,textError] = mainApp.validationInput( goals , "text" );
        if( !status ) {
            alert(textError);
            return;
        } else {
            
        }
        
        
        updateProject("goals", goals) ;
    });
    document.getElementById("buttonUpdateGoalsCancel").addEventListener("click", cancel );
}
function clickEditCategory() {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>تحديث تصنيف المشروع</h2>
        </div>
        <div class="divBody">
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>حدد تصنيف المشروع :</label>
                </div>
                
                
                <div class="continerselect">
                    <select id="selectprojectcategory" name="projectcategory" class="selectbox selectSkill" required>
                        <option value="0">اختر التصنيف</option>
                    </select>
                    <div class="divsvg">
                        <svg id="divsvgdown" class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>

                </div>
                
            </div>

        </div>
        <div class="divFooter">
            <div id="buttonUpdateCategory" class="buttons btnAdd">تحديث</div>
            <div id="buttonUpdateCategoryCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    
    document.getElementById("lightBoxCard").innerHTML = code;

    document.getElementById("buttonUpdateCategory").addEventListener("click" , function() {
        const val = document.getElementById("selectprojectcategory").value;
        
        if( val == 0 ) {
            alert("اختر التصنيف");
            return;
        }
        
        updateProject("category", val) ;
    });
    document.getElementById("buttonUpdateCategoryCancel").addEventListener("click", cancel );
    
    fillSelectProjectCategory();
    
    document.getElementById("selectprojectcategory").value = myProject.codeCategory ;
    
}
function clickEditType() {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>تحديث نوع المشروع</h2>
        </div>
        <div class="divBody">
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>حدد نوع المشروع :</label>
                </div>
                
                
                <div class="continerselect">
                    <select id="selectprojecttype" name="projecttype" class="selectbox selectSkill" required>
                        <option value="0">اختر النوع</option>
                    </select>
                    <div class="divsvg">
                        <svg id="divsvgdown" class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>

                </div>
                
            </div>

        </div>
        <div class="divFooter">
            <div id="buttonUpdateType" class="buttons btnAdd">تحديث</div>
            <div id="buttonUpdateTypeCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    
    document.getElementById("lightBoxCard").innerHTML = code;

    document.getElementById("buttonUpdateType").addEventListener("click" , function() {
        const val = document.getElementById("selectprojecttype").value;
        
        if( val == 0 ) {
            alert("اختر النوع");
            return;
        }
        
        updateProject("type", val) ;
    });
    document.getElementById("buttonUpdateTypeCancel").addEventListener("click", cancel );
    
    fillSelectProjectType();
    
    document.getElementById("selectprojecttype").value = myProject.codeType ;
}

function updateProject( act , val) {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("action", act );
    formData.append("value", val );
    formData.append("codeProject", myProject.code );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    
    
    mainApp.send( "POST", pathUpdateProject , headers, formData ).then( (result) => {
        
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



function clickAddSkill() {
    
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
                    <label>تصنيف المهارة :</label>
                </div>
                
                
                <div class="continerselect">
                
                    <select id="selectskillcategory" name="skilluser" class="selectbox selectSkill" required>
                        <option value="0">اختر تصنيف المهارة</option>
                    </select>
                    
                    <div class="divsvg">
                        <svg id="divsvgdown" class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>

                </div>
                
            </div>
                
            <div class="containerfiled">
                
                <div class="containerLabel">
                    <label>المهارة :</label>
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

            </div>
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>اضف مزيداً من التفاصيل حول المهارة المطلوبة :</label>
                </div>
                
                <textarea id="descriptionSkill" name="descriptionSkill" class="inputs area" placeholder="تفاصيل حول المهارة .." requred></textarea>
                
            </div>
            </div>
            

        </div>
        <div class="divFooter">
            <div id="buttonAddSkill" class="buttons btnAdd">إضافة</div>
            <div id="buttonAddSkillCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    

    document.getElementById("buttonAddSkill").addEventListener("click" , function() {
        
        addSkill() ;
        
    });
    document.getElementById("buttonAddSkillCancel").addEventListener("click", cancel );
    
    fillSelectSkill();
    fillSelectSkillCategory();
    

    
}
function addSkill() {
    
    let codeSkill = document.getElementById("selectskill").value;
    let descriptionSkill = document.getElementById("descriptionSkill").value;
    
    
    
    let [status,textError] = mainApp.validationInput( descriptionSkill , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeSkill", codeSkill );
    formData.append("description", descriptionSkill );
    
    mainApp.send( "POST", pathCreateSkill, headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
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

function clickEditSkill( codeProjectSkill ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let codeSkill = 0;
    let description = "";
    
    myProject.listSkills.map( ( projectskill ) => {
            
            if(projectskill.code === codeProjectSkill) {
                
                codeSkill = projectskill.codeSkill
                description = projectskill.description;
                
            }
            
        });
        
    

    let code = `
        <div class="divHeader">
            <h2>تحديث المهارة</h2>
        </div>
        <div class="divBody">
            
            
            <div class="inner">
            <div class="containerfiled">
                
                <div class="containerLabel">
                    <label>اختر المهارة :</label>
                </div>
            
                <div class="continerselect">
    
                    <select id="selectskills" name="skilluser" class="selectbox" required>
                        <option value="0">اختر المهارة</option>
                    </select>

                    <div class="divsvg">
                        <svg id="divsvgdown" class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>
                    
                </div>
                
            </div>

            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>اضف مزيداً من التفاصيل حول المهارة :</label>
                </div>
                
                <textarea id="descriptionSkill" name="descriptionSkill" class="inputs area" placeholder="تفاصيل حول المهارة .." requred>${description}</textarea>
                
            </div>
            </div>

        </div>
        
        <div class="divFooter">
            <div id="buttonAddSkillUpdate" class="buttons btnUpdate"">تحديث</div>
            <div id="buttonAddSkillCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;

    document.getElementById("buttonAddSkillUpdate").addEventListener("click" , function() {
        
        editSkill( codeProjectSkill ) ;
        
    });
    document.getElementById("buttonAddSkillCancel").addEventListener("click", cancel );
        
    
    fillSelectSkills();
    
    let selectSkills = document.getElementById("selectskills");
    selectSkills.value = codeSkill;
    
    
}
function editSkill( codeProjectSkill ) {
    
    const pathUpdateSkill = mainApp.pathDomain + "api/updateProjectSkillData.php";
    
    const codeSkill = document.getElementById("selectskills").value;
    const description = document.getElementById("descriptionSkill").value;
    
    let [status,textError] = mainApp.validationInput( description , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeProjectSkill", codeProjectSkill );
    formData.append("action", "description" );
    formData.append("value", description );
    
    mainApp.send( "POST", pathUpdateSkill , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
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

function clickRemoveSkill( codeProjectSkill ) {
    
    const myProjectTasks = myProject.listTasks;

    let countTaskSkill = 0;
    
    for(var i=0; i<myProjectTasks.length; i++) 
    {
        const codeStatus = myProjectTasks[i].codeStatus;
        const _codeProjectSkill = myProjectTasks[i].codeProjectSkill;
        
        if( _codeProjectSkill == codeProjectSkill ) {
            countTaskSkill = countTaskSkill + 1;
        }
        
    }
    
    let txtRemove = `لديك عدد ${countTaskSkill} مهمة مرتبطة بهذه المهارة </br>
    هل بالتأكيد تريد حذف المهارة والمهام المرتبطة بها ؟
    `
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>حذف المهارة</h2>
        </div>
        <div class="divBody">
            
            ${txtRemove}
            
        </div>
        
        <div class="divFooter">
            <div id="buttonAddSkillRemove" class="buttons btnUpdate"">حذف</div>
            <div id="buttonAddSkillCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("notification");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonAddSkillRemove").addEventListener("click" , function() {
        
        removeSkill( codeProjectSkill ) ;
        
    });
    document.getElementById("buttonAddSkillCancel").addEventListener("click", cancel );
}
function removeSkill( codeProjectSkill ) {
    
    const pathDeleteSkill = mainApp.pathDomain + "api/deleteProjectSkill.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeProjectSkill", codeProjectSkill );
    
    mainApp.send( "POST", pathDeleteSkill , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
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
        } else if(codeError == 451) {
            let txt = "خطأ غير معروف, حاول مرة أخرى !!";
        } else {
            txt = "خطأ غير معروف !";
        }
        
        alert(txt);
    } );
}




function fillSelectSkills() {
    
    let selectSkills = document.getElementById("selectskills");
    selectSkills.innerHTML = `<option value='0'>-اختر المهارة-</option>`;
    
    
    for(var i=0; i<listSkill.length; i++) {

        const code = listSkill[i].code;
        const name = listSkill[i].name;

        let codeoption = `<option value="${code}">${name}</option>`;

        selectSkills.insertAdjacentHTML("beforeend", codeoption);
    }
    
    
}



function clickAddDirect() {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    

    let code = `
        <div class="divHeader">
            <h2>نشر تعميم</h2>
        </div>
        <div class="divBody">
            
            
            <div class="inner">
            <div class="containerfiled">

                <div class="containerLabel">
                    <label>تعميم إلى :</label>
                </div>
                
                
                <div class="continerselect">
                
                    <select id="selectDirect" class="selectbox" required>
                        <option value="0">اختر وجهة التعميم</option>
                    </select>
                    
                    <div class="divsvg">
                        <svg id="divsvgdown" class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>

                </div>
                
            </div>
            
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>التعميم :</label>
                </div>
                
                <textarea id="contentDirect" class="inputs area" placeholder="محتوى التعميم .." requred></textarea>
                
            </div>
            </div>
            

        </div>
        <div class="divFooter">
            <div id="buttonAddDirect" class="buttons btnAdd">نشر</div>
            <div id="buttonAddDirectCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    

    document.getElementById("buttonAddDirect").addEventListener("click" , function() {
        addDirect() ;
    });
    document.getElementById("buttonAddDirectCancel").addEventListener("click", cancel );
    
    fillSelectDirect();
    

    
}
function addDirect() {
    
    const pathCreateDirect= mainApp.pathDomain + "api/createDirect.php";
    
    let selectDirect = document.getElementById("selectDirect").value;
    let content = document.getElementById("contentDirect").value;
    
    
    
    let [status,textError] = mainApp.validationInput( content , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    if( selectDirect == "-1" ) {
        alert("الرجاء اختيار وجهة التوجيه");
        return;
    }
    
    
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("content", content );
    formData.append("codeProjectSkill", selectDirect );
    
    mainApp.send( "POST", pathCreateDirect, headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
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


function clickEditDirect( codeDirect ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let codeProjectSkill = 0;
    let content = "";
    let description = "";
    
    myProject.listDirects.map( (direct) => {
            if(direct.code === codeDirect)
            {
                
                codeProjectSkill = direct.codeProjectSkill
                content = direct.content;
                
            }

        });
        
    

    let codeDom = `
        <div class="divHeader">
            <h2>تحديث تعميم</h2>
        </div>
        <div class="divBody">
            
            
            <div class="inner">
            <div class="containerfiled">

                <div class="containerLabel">
                    <label>تعميم إلى :</label>
                </div>
                
                
                <div class="continerselect">
                
                    <select id="selectDirect" class="selectbox" required>
                        <option value="0">اختر نوع التعميم</option>
                    </select>
                    
                    <div class="divsvg">
                        <svg id="divsvgdown" class="svgstroke">
                            <use xlink:href="#svgdown"/>
                        </svg>
                    </div>

                </div>
                
            </div>
            
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>التعميم :</label>
                </div>
                
                <textarea id="contentDirect" class="inputs area" placeholder="محتوى التعميم .." requred>${content}</textarea>
                
            </div>
            </div>
            

        </div>
        <div class="divFooter">
            <div id="buttonUpdateDirect" class="buttons btnAdd">تحديث</div>
            <div id="buttonUpdateDirectCancel" class="buttons btnCancel neg">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = codeDom;
    

    document.getElementById("buttonUpdateDirect").addEventListener("click" , function() {
        editDirect( codeDirect ) ;
    });
    document.getElementById("buttonUpdateDirectCancel").addEventListener("click", cancel );
    
    fillSelectDirect();
    
    let selectDirect = document.getElementById("selectDirect");
    if( codeProjectSkill == null ) {
        selectDirect.value = 0;
    } else {
        selectDirect.value = codeProjectSkill;
    }
    
    
}
function editDirect( codeDirect ) {
    
    const pathUpdateDirect = mainApp.pathDomain + "api/updateProjectDirect.php";
    
    let selectDirect = document.getElementById("selectDirect").value;
    let content = document.getElementById("contentDirect").value;
    
    
    
    let [status,textError] = mainApp.validationInput( content , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    if( selectDirect == "-1" ) {
        alert("الرجاء اختيار وجهة التوجيه");
        return;
    }
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeDirect", codeDirect );
    formData.append("content", content );
    formData.append("codeProjectSkill", selectDirect );
    
    mainApp.send( "POST", pathUpdateDirect , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
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


function clickRemoveDirect( codeDirect ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>حذف التعميم</h2>
        </div>
        <div class="divBody">
            
            هل تريد بالتأكيد حذف التعميم ؟
            
        </div>
        
        <div class="divFooter">
            <div id="buttonAddDirectRemove" class="buttons btnUpdate"">حذف</div>
            <div id="buttonAddDirectCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonAddDirectRemove").addEventListener("click" , function() {
        removeDirect( codeDirect ) ;
    });
    document.getElementById("buttonAddDirectCancel").addEventListener("click", cancel );
}
function removeDirect( codeDirect ) {
    
    const pathDeleteDirect = mainApp.pathDomain + "api/deleteProjectDirect.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeDirect", codeDirect );
    
    mainApp.send( "POST", pathDeleteDirect , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
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
        } else if(codeError == 451) {
            let txt = "خطأ غير معروف, حاول مرة أخرى !!";
        } else {
            txt = "خطأ غير معروف !";
        }
        
        alert(txt);
    } );
}








function clickAddTask( codeProjectSkill ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    

    let code = `
        <div class="divHeader">
            <h2>إضافة مهام إلى المهارة</h2>
        </div>
        <div class="divBody">
            
            
            <div class="inner">
            <div class="containerfiled input">

                <div class="containerLabel">
                    <label>اسم المهمة :</label>
                </div>
                
                <input id="nameTask" name="descriptionSkill" class="inputs" placeholder="المهمة .." requred></input>
                
            </div>
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>اضف مزيداً من التفاصيل حول المهمة :</label>
                </div>
                
                <textarea id="descriptionTask" name="descriptionSkill" class="inputs area" placeholder="تفاصيل حول المهمة .." requred></textarea>
                
            </div>
            </div>

        </div>
        <div class="divFooter">
            <div id="buttonAddTaskAdd" class="buttons btnAdd"">إضافة</div>
            <div id="buttonAddTaskCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;

    document.getElementById("buttonAddTaskAdd").addEventListener("click" , function() {
        
        addTask( codeProjectSkill ) ;
        
    });
    
    document.getElementById("buttonAddTaskCancel").addEventListener("click", cancel );
    
}
function addTask( codeProjectSkill ) {
    
    const name = document.getElementById("nameTask").value;
    const description = document.getElementById("descriptionTask").value;
    
    let [status,textError] = mainApp.validationInput( name, "string" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    [status,textError] = mainApp.validationInput( description , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
        
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeProjectSkill", codeProjectSkill );
    formData.append("name", name );
    formData.append("description", description );
    
    mainApp.send( "POST", pathCreateTask , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
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


function clickEditTask( codeTask ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let codeSkill = 0;
    let name = "";
    let description = "";
    
    myProject.listTasks.map( (task) => {
            if(task.code === codeTask)
            {
                
                codeSkill = task.codeProjectSkill
                name = task.name;
                description = task.description;
                
            }

        });
        
    

    let code = `
        <div class="divHeader">
            <h2>تحديث مهام المهارة</h2>
        </div>
        <div class="divBody">
            
            
            <div class="inner">
            <div class="containerfiled input">

                <div class="containerLabel">
                    <label>اسم المهمة :</label>
                </div>
                
                <input id="nameTask" name="descriptionSkill" class="inputs" placeholder="المهمة .." value="${name}" requred>
                
            </div>
            
            <div class="containerfiled area">

                <div class="containerLabel">
                    <label>اضف مزيداً من التفاصيل حول المهمة :</label>
                </div>
                
                <textarea id="descriptionTask" name="descriptionSkill" class="inputs area" placeholder="تفاصيل حول المهمة .." requred>${description}</textarea>
                
            </div>
            </div>

        </div>
        <div class="divFooter">
            <div id="buttonAddTaskUpdate" class="buttons btnUpdate"">تحديث</div>
            <div id="buttonAddTaskCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;

    document.getElementById("buttonAddTaskUpdate").addEventListener("click" , function() {
        editTask( codeTask ) ;
    });
    document.getElementById("buttonAddTaskCancel").addEventListener("click", cancel );
    
}
function editTask( codeTask ) {
    
    const pathUpdateTask = mainApp.pathDomain + "api/updateProjectTaskData.php";
    
    const name = document.getElementById("nameTask").value;
    const description = document.getElementById("descriptionTask").value;
    
    let [status,textError] = mainApp.validationInput( name, "string" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    [status,textError] = mainApp.validationInput( description , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeTask", codeTask );
    formData.append("name", name );
    formData.append("description", description );
    
    mainApp.send( "POST", pathUpdateTask , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
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


function clickRemoveTask( codeTask ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>حذف المهمة</h2>
        </div>
        <div class="divBody">
            
            هل بالتأكيد تريد حذف المهمة ؟
            
        </div>
        
        <div class="divFooter">
            <div id="buttonAddTaskRemove" class="buttons btnUpdate"">حذف</div>
            <div id="buttonAddSkillCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("notification");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonAddTaskRemove").addEventListener("click" , function() {
        
        removeTask( codeTask );
        
    });
    
    document.getElementById("buttonAddSkillCancel").addEventListener("click", cancel );
    
}
function removeTask( codeTask ) {
    
    const pathDeleteTask = mainApp.pathDomain + "api/deleteProjectTask.php";
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeProjectTask", codeTask );
    
    mainApp.send( "POST", pathDeleteTask , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
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
        } else if(codeError == 451) {
            let txt = "خطأ غير معروف, حاول مرة أخرى !!";
        } else {
            txt = "خطأ غير معروف !";
        }
        
        alert(txt);
    } );
}









function clickMemberAccepted( codeMember ) {
    
    const headers = [];

    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeMember", codeMember );
    formData.append("codeStatus", enumMemberStatus.Candidate );
    
    mainApp.send( "POST", pathUpdateMemberStatus, headers, formData ).then( (result) => {
        
        refreshListMember();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}
function clickMemberRejected( codeMember , codeUser ) {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeUserMember", codeUser );
    formData.append("codeMember", codeMember );
    formData.append("codeStatus", enumMemberStatus.Rejected );
    
    mainApp.send( "POST", pathUpdateMemberStatus , headers, formData ).then( (result) => {
        
        refreshListMember();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}
function clickMemberIgnore( codeMember ) {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeMember", codeMember );
    formData.append("codeStatus", enumMemberStatus.Ignored );
    
    mainApp.send( "POST", pathUpdateMemberStatus, headers, formData ).then( (result) => {
        
        refreshListMember();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}

function clickMemberFilterAccepted( codeMember , codeUser ) {
    
    const headers = [];

    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeUserMember", codeUser );
    formData.append("codeMember", codeMember );
    formData.append("codeStatus", enumMemberStatus.Accepted );
    
    mainApp.send( "POST", pathUpdateMemberStatus, headers, formData ).then( (result) => {
        
        refreshListMember();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}


function clickMemberMore( idBig ) {
    
    var big = document.getElementById( idBig );
    big.classList.toggle("hide");
    
}

function clickTaskAccepted( codeTask , codeUser ) {
    
    const headers = [];

    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeUserTask", codeUser );
    formData.append("codeTask", codeTask );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("codeStatus", enumTaskStatus.Delivered );
    
    mainApp.send( "POST", pathUpdateTaskStatus , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}

function clickTaskReturn( codeTask , codeUser ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>إعادة المهمة</h2>
        </div>
        <div class="divBody">
            
            <div class="containerfiled area">
    
                <div class="containerLabel">
                    <label>الأسباب :</label>
                </div>
    
                <textarea id="inputNote" name="note" class="inputs area" placeholder="اذكر أسباب أعادة المهمة .." requred>
                </textarea>
                
            </div>
            
        </div>
        
        <div class="divFooter">
            <div id="buttonAddTaskReturn" class="buttons btnUpdate"">إعادة</div>
            <div id="buttonAddSkillCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonAddTaskReturn").addEventListener("click" , function() {
        
        taskReturn( codeTask , codeUser );
        
    });
    
    document.getElementById("buttonAddSkillCancel").addEventListener("click", cancel );
    
}
function taskReturn( codeTask , codeUser ) {
    
    let note = document.getElementById("inputNote").value;
    
    let [status,textError] = mainApp.validationInput( note , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeUserTask", codeUser );
    formData.append("codeTask", codeTask );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("codeStatus", enumTaskStatus.WaitingModification );
    formData.append("note", note );
    
    mainApp.send( "POST", pathUpdateTaskStatus , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}

function clickTaskEditNote( codeTask , note ) {
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>تحديث أسباب إعادة المهمة</h2>
        </div>
        <div class="divBody">
            
            <div class="containerfiled area">
    
                <div class="containerLabel">
                    <label>الأسباب :</label>
                </div>
    
                <textarea id="inputNote" name="note" class="inputs area" placeholder="اذكر أسباب أعادة المهمة .." requred>${note}</textarea>
                
            </div>
            
        </div>
        
        <div class="divFooter">
            <div id="buttonAddTaskNoteUpdate" class="buttons btnUpdate"">تحديث</div>
            <div id="buttonAddSkillCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonAddTaskNoteUpdate").addEventListener("click" , function() {
        
        noteUpdate( codeTask );
        
    });
    
    document.getElementById("buttonAddSkillCancel").addEventListener("click", cancel );
    
}
function noteUpdate( codeTask ) {
    
    let note = document.getElementById("inputNote").value;
    
    let [status,textError] = mainApp.validationInput( note , "text" );
    if( !status ) {
        alert(textError);
        return;
    } else {
        
    }
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeTask", codeTask );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("codeStatus", enumTaskStatus.WaitingModification );
    formData.append("note", note );
    
    mainApp.send( "POST", pathUpdateTaskStatus , headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}


function clickTaskLeave( codeTask ) {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeTask", codeTask );
    formData.append("codeUser", moduleUserLog.getUser().userCode );
    formData.append("codeStatus", enumTaskStatus.New );
    
    mainApp.send( "POST", pathUpdateTaskStatus, headers, formData ).then( (result) => {
        
        refreshListSkillsAndTasks();
        cancel();
        
    } ).then( (result) => {

    } ).catch( (reject) => {

    } );
    
}
function clickMoreTask( idBig ) {
    
    var big = document.getElementById( idBig );
    big.classList.toggle("hide");
    
}


function clickSwitchSkillStatus( codeProjectSkill , idElementSwitch ) {
    
    var elementSwitch = document.getElementById(idElementSwitch);
    
    setSwitchStatusComponent( idElementSwitch , -1 );
    
    
    
    const codeStatus = elementSwitch.getAttribute("data-status");
    
    let codeStatusNew = ( codeStatus == enumJoinStatus.Enable ) ? enumJoinStatus.NotEnable : enumJoinStatus.Enable;
    
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeProjectSkill", codeProjectSkill );
    formData.append("action", "status" );
    formData.append("value", codeStatusNew );
    
    
    mainApp.send( "POST",  pathUpdateProjectSkill , headers, formData ).then( (result) => {
        
        let nameStatusNew = "...";
        
        if( codeStatusNew == enumJoinStatus.Enable ) {
            setSwitchStatusComponent( idElementSwitch , enumJoinStatus.Enable );
        } else if( codeStatusNew == enumJoinStatus.NotEnable ) {
            setSwitchStatusComponent( idElementSwitch , enumJoinStatus.NotEnable );
        } else {
            setSwitchStatusComponent( idElementSwitch , -1 );
        }
        
        
        
    } ).then( (result) => {
        

    } ).catch( (reject) => {
        
        let nameStatusOld = "...";
        
        if( codeStatus == enumJoinStatus.Enable ) {
            setSwitchStatusComponent( idElementSwitch , enumJoinStatus.Enable );
        } else if( codeStatus == enumJoinStatus.NotEnable ) {
            setSwitchStatusComponent( idElementSwitch , enumJoinStatus.NotEnable );
        } else {
            setSwitchStatusComponent( idElementSwitch , -1 );
        }
        
        
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





function clickSkillMore( idBig ) {
    
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


function clickGoToLiveProject() {
    
    mainApp.goToProjectLive( myProject.code );

}

function clickGoToProjectWork( codeProjectSkill ) {
    
    mainApp.goToProjectWork( myProject.code , codeProjectSkill )
    
}

function clickSwitchProjectStatus() {

    setSwitchStatusComponent( "switchProjectStatus" , -1 );
    
    const codeProjectStatusJoin = myProject.codeStatusJoin ;
    
    let codeProjectStatusJoinNew = 0;
    if( codeProjectStatusJoin  == 1 ) {
        codeProjectStatusJoinNew = 2;
    } else {
        codeProjectStatusJoinNew = 1;
    }
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("action", "statusJoin" );
    formData.append("value", codeProjectStatusJoinNew );
    
    
    mainApp.send( "POST", pathUpdateProject , headers, formData ).then( (result) => {
        
        myProject.codeStatusJoin = codeProjectStatusJoinNew;
        
        setSwitchStatusComponent( "switchProjectStatus" , codeProjectStatusJoinNew );
        
    } ).then( (result) => {
        

    } ).catch( (reject) => {
        
        setSwitchStatusComponent( "switchProjectStatus" , codeProjectStatusJoin );
        
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

function setSwitchStatusComponent( idSwitch , codeStatus ) {
    
    var switchStatus = document.getElementById(idSwitch);
    var switchButton = switchStatus.getElementsByClassName("buttonSwitch")[0];
    
    if( codeStatus == enumJoinStatus.Enable ) {
        switchStatus.classList.remove("waitting");
        switchStatus.classList.add("enable");
        
        switchButton.textContent = "متاح";
    } else if( codeStatus == enumJoinStatus.NotEnable ){
        switchStatus.classList.remove("waitting");
        
        switchButton.textContent = "غير متاح";
    } else {
        
        switchStatus.classList.remove("enable");
        switchStatus.classList.add("waitting");
        
        switchButton.textContent = "...";
        
    }
}


function clickDeleteProject() {
    
    
    const myProjectTasks = myProject.listTasks;
    const myProjectMembers = myProject.listMembers;

    let countTaskMe = myProjectTasks.length;
    let countMemberMe = myProjectMembers.length;
    
    
    let txtLeave = `هل بالتأكيد تريد حذف المشروع؟`;
    
    if(countMemberMe > 0) {
        txtLeave += `</br> لديك ${countMemberMe} أعضاء`;
    }
    
    if(countTaskMe > 0) {
        txtLeave += `</br> لديك ${countTaskMe} مهام`;
    }
    
    
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>حذف المشروع</h2>
        </div>
        <div class="divBody">
            
            <div class="containerText">${txtLeave}</div>
            
        </div>
        
        <div class="divFooter">
            <div id="buttonProjectDelete" class="buttons btnLeave"">حذف</div>
            <div id="buttonProjectCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("notification");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonProjectDelete").addEventListener("click", deletePoject );
    document.getElementById("buttonProjectCancel").addEventListener("click", cancel );
    
}

function deletePoject() {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("action", "status" );
    formData.append("value", 5 );
    
    mainApp.send( "POST", pathUpdateProject , headers, formData ).then( (result) => {
        
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

function clickFinishProject() {
    
    const myProjectTasks = myProject.listTasks;
    const myProjectMembers = myProject.listMembers;

    let countTaskMe = 0;
    let countMemberMe = 0;
    let countMemberNotEvaluation = 0;
    
    for(var i=0; i<myProjectTasks.length; i++) 
    {
        const codeStatus = myProjectTasks[i].codeStatus;
        
        if( codeStatus != enumTaskStatus.Delivered ) {
            countTaskMe = countTaskMe + 1;
        }
        
    }
    
    for(var i=0; i<myProjectMembers.length; i++) 
    {
        const codeStatus = myProjectMembers[i].codeStatus;
        const mark = myProjectMembers[i].mark;
        
        if( codeStatus == enumMemberStatus.Accepted && mark == 0 ) {
            countMemberNotEvaluation = countMemberNotEvaluation + 1;
        }
        
    }
    
    
    let txtFinish = `هل بالتأكيد تريد إنتهاء المشروع؟`;
    
    if(countTaskMe > 0) {
        txtFinish += `</br> لديك ${countTaskMe} مهام لم تكتمل بعد !`;
    }
    
    if(countMemberNotEvaluation > 0) {
        txtFinish += `</br> لديك ${countMemberNotEvaluation} أعضاء لم تقم بتقييمهم بعد !`;
    }
    
    
    
    
    let box = document.getElementById("lightBox");
    box.classList.remove("close");
    
    let code = `
        <div class="divHeader">
            <h2>إنتهاء المشروع</h2>
        </div>
        <div class="divBody">
            
            <div class="containerText">${txtFinish}</div>
            
        </div>
        
        <div class="divFooter">
            <div id="buttonProjectFinish" class="buttons btnFinish"">إنتهاء</div>
            <div id="buttonProjectCancel" class="buttons btnCancel neg"">إلغاء</div>
        </div>
    `;
    
    
    let elementLightBox = document.getElementById("lightBoxCard");
    elementLightBox.classList.add("notification");
    elementLightBox.classList.add("grid");
    elementLightBox.innerHTML = code;
    
    document.getElementById("buttonProjectFinish").addEventListener("click", () => {
        if(countMemberNotEvaluation > 0) {
            let txtFinishError = "لا يمكنك إنهاء المشروع دون تقييم كافة أعضاء المشروع!";
            
            let code = `
                <div class="divHeader">
                    <h2>إنتهاء المشروع</h2>
                </div>
                <div class="divBody">
                    
                    <div class="containerText">${txtFinishError}</div>
                        
                </div>
                
                <div class="divFooter">
                    <div id="buttonProjectCancel" class="buttons btnCancel neg"">إلغاء</div>
                </div>
            `;
            elementLightBox.innerHTML = code;
            document.getElementById("buttonProjectCancel").addEventListener("click", cancel );
            
        } else {
            
            finishPoject();
            
        }
        
    } );
    document.getElementById("buttonProjectCancel").addEventListener("click", cancel );
    
}

function finishPoject() {
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("action", "status" );
    formData.append("value", 3 );
    
    
    mainApp.send( "POST", pathUpdateProject , headers, formData ).then( (result) => {
        
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

function clickEvaluationMembers() {
    
    let buttonEvaluation = document.getElementById('buttonEvaluation');
    buttonEvaluation.classList.toggle("star");
    
    let listContainerItemMember = listMemberDone.getElementsByClassName("containerItemMember");
    let listItemsEvaluation = listMemberDone.getElementsByClassName("containerButtonsEvaluation");
    
    for(let i=0; i<listContainerItemMember.length; i++ ) {
        listContainerItemMember[i].classList.toggle("evaluation");
    }
    
    
}


function clickEvaluationMemberStar( codeMember , numberStar ) {
    
    const headers = [];

    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    formData.append("codeMember", codeMember );
    formData.append("mark", numberStar );
    
    mainApp.send( "POST", pathUpdateMemberMark, headers, formData ).then( (result) => {
        
        refreshListMember();
        
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












let listProjectCategory = [];
let listProjectType = [];
let listProjectStatus = [];
let listJoinStatus = [];

let listSkill = [];
let listSkillCategory = [];
let listTaskStatus = [];
let listMemberStatus = [];

const enumJoinStatus = {};
const enumTaskStatus = {};
const enumMemberStatus = {};


function fillListData( data ) {
    
    listProjectCategory = [];
    listProjectType = [];
    listProjectStatus = [];
    listJoinStatus = [];
    
    listSkill = [];
    listSkillCategory = [];
    listTaskStatus = [];
    listMemberStatus = [];
    
    
    const dataProjectCategory = ( data["projectCategory"] === undefined) ? [] : data["projectCategory"] ;
    const dataProjectType = ( data["projectType"] === undefined) ? [] : data["projectType"] ;
    const dataProjectStatus = ( data["projectStatus"] === undefined) ? [] : data["projectStatus"] ;
    const dataJoinStatus = ( data["joinStatus"] === undefined) ? [] : data["joinStatus"] ;
    
    const dataSkill = ( data["skill"] === undefined) ? [] : data["skill"] ;
    const dataSkillCategory = ( data["skillCategory"] === undefined) ? [] : data["skillCategory"] ;
    const dataTaskStatus = ( data["taskStatus"] === undefined) ? [] : data["taskStatus"] ;
    const dataMemberStatus = ( data["memberStatus"] === undefined) ? [] : data["memberStatus"] ;
    
    
    for(var i=0; i<dataProjectCategory.length; i++) {
        listProjectCategory.push( new Category( dataProjectCategory[i] ) );
    }
    
    for(var i=0; i<dataProjectType.length; i++) {
        listProjectType.push( new Type( dataProjectType[i] ) );
    }
    
    for(var i=0; i<dataProjectStatus.length; i++) {
        listProjectStatus.push( new ProjectStatus( dataProjectStatus[i] ) );
    }
    
    for(var i=0; i<dataJoinStatus.length; i++) {
        listJoinStatus.push( new JoinStatus( dataJoinStatus[i] ) );
    }
    
    
    for(var i=0; i<dataSkill.length; i++) {
        listSkill.push( new Skill( dataSkill[i] ) );
    }
    
    for(var i=0; i<dataSkillCategory.length; i++) {
        listSkillCategory.push( new SkillCategory( dataSkillCategory[i] ) );
    }
    
    for(var i=0; i<dataTaskStatus.length; i++) {
        listTaskStatus.push( new TaskStatus( dataTaskStatus[i] ) );
    }
    
    for(var i=0; i<dataMemberStatus.length; i++) {
        listMemberStatus.push( new MemberStatus( dataMemberStatus[i] ) );
    }
    
    createEnumStatusJoin();
    createEnumStatusTask();
    createEnumStatusMember();
    
    
    fillSelectSkillForMemberAndTask();
    fillSelectTaskStatus();
    fillSelectMemberStatus();
    

}


function createEnumStatusJoin() {
    
    for(let i=0; i<listJoinStatus.length; i++ ) {
        enumJoinStatus[listJoinStatus[i].description] = listJoinStatus[i].code;
    }
    
    enumJoinStatus.getName = function( indx ) {
        for(var i=0; i<listJoinStatus.length; i++) {
            if( listJoinStatus[i].code == indx ) {
                
                return listJoinStatus[i].name;
            }
        }
    };
    
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
function createEnumStatusMember() {
    
    for(let i=0; i<listMemberStatus.length; i++ ) {
        enumMemberStatus[listMemberStatus[i].description] = listMemberStatus[i].code;
    }
    
    enumMemberStatus.getName = function( indx ) {
        for(var i=0; i<listMemberStatus.length; i++) {
            if( listMemberStatus[i].code == indx ) {
                
                return listMemberStatus[i].name;
            }
        }
    };
    
}


function fillSelectProjectCategory() {
    
    let selectProjectCategory = document.getElementById("selectprojectcategory");
    selectProjectCategory.innerHTML = "<option value='0'>-اختر تصنيف المشروع-</option>";
    

    for(var i=0; i<listProjectCategory.length; i++) 
    {
        const code = listProjectCategory[i].code;
        const name = listProjectCategory[i].name;
        
        let codeoptionselect = `<option value='${code}'>${name}</option>`;
        
        selectProjectCategory.insertAdjacentHTML("beforeend", codeoptionselect);
    }
    
    selectProjectCategory.addEventListener("change", (event) => {
        
        
    });
}
function fillSelectProjectType() {
    
    let selectProjecttype = document.getElementById("selectprojecttype");
    selectProjecttype.innerHTML = "<option value='0'>-اختر تصنيف المشروع-</option>";

    for(var i=0; i<listProjectType.length; i++) 
    {
        const code = listProjectType[i].code;
        const name = listProjectType[i].name;
        
        let codeoptionselect = `<option value='${code}'>${name}</option>`;
        
        selectProjecttype.insertAdjacentHTML("beforeend", codeoptionselect);
    }
    
    selectProjecttype.addEventListener("change", (event) => {
        
        
    });
}
function fillSelectSkill() {
    
    let codeSkillCategory = document.getElementById("selectskillcategory").value;
    
    let selectSkill = document.getElementById("selectskill");
    selectSkill.innerHTML = "<option value='0'>-اختر المهارة-</option>";
    

    if( codeSkillCategory == 0) {
        
        for(var i=0; i<listSkill.length; i++) 
        {
            const code = listSkill[i].code;
            const name = listSkill[i].name;
            
            let codeoptionselect = `<option value='${code}'>${name}</option>`;
            
            selectSkill.insertAdjacentHTML("beforeend", codeoptionselect);
        }
        
        let codeoptionselect = `<option value='-1'>-أخرى-</option>`;
        selectSkill.insertAdjacentHTML("beforeend", codeoptionselect);
        
    } else {
        
        for(var i=0; i<listSkill.length; i++) 
        {
            const code = listSkill[i].code;
            const name = listSkill[i].name;
            const codeCategory = listSkill[i].codeCategory;
            
            if( codeSkillCategory == codeCategory )
            {
                
                let codeoptionselect = `<option value='${code}'>${name}</option>`;
                
                selectSkill.insertAdjacentHTML("beforeend", codeoptionselect);
                
            }
            
        }
        
        let codeoptionselect = `<option value='-1'>-أخرى-</option>`;
        selectSkill.insertAdjacentHTML("beforeend", codeoptionselect);
        
    }
    
}
function fillSelectSkillCategory() {
    
    let selectSkillCategory = document.getElementById("selectskillcategory");
    selectSkillCategory.innerHTML = "<option value='0'>-اختر تصنيف المهارة-</option>";
    

    for(var i=0; i<listSkillCategory.length; i++) 
    {
        const code = listSkillCategory[i].code;
        const name = listSkillCategory[i].name;
        
        let codeoptionselect = `<option value='${code}'>${name}</option>`;
        
        selectSkillCategory.insertAdjacentHTML("beforeend", codeoptionselect);
    }
    
    selectSkillCategory.addEventListener("change", (event) => {
        
        fillSelectSkill();
        
    });
}

function fillSelectDirect() {
    
    let selectDirect = document.getElementById("selectDirect");
    selectDirect.innerHTML = "<option value='0'>عام</option>";
    
    
    const myProjectSkills = myProject.listSkills;

    for(let i=0; i<myProjectSkills.length; ++i)
    {
        
        const code = myProjectSkills[i].code;
        const codeSkill = myProjectSkills[i].codeSkill;
        
        
        let nameSkill = "";
        if( codeSkill == null ) {
            nameSkill = "أخرى" ;
        } else {
            nameSkill = myProjectSkills[i].nameSkill;
        }
        
        let codeoptionselect = `<option value='${code}'>${nameSkill}</option>`;
        
        selectDirect.insertAdjacentHTML("beforeend", codeoptionselect);
        
    }
    
}



function fillSelectSkillForMemberAndTask() {
        
    let selectSkillAll = document.getElementById('selectTaskSkillAll');
    selectSkillAll.innerHTML = "<option value='0'>الكل</option>";
    
    let selectSkillFilter = document.getElementById('selectTaskSkillFilter');
    selectSkillFilter.innerHTML = "<option value='0'>الكل</option>";
    
    let selectSkillDone = document.getElementById('selectTaskSkillDone');
    selectSkillDone.innerHTML = "<option value='0'>الكل</option>";
    
        
    let selectSkillMemberAll = document.getElementById('selectMemberSkillAll');
    selectSkillMemberAll.innerHTML = "<option value='0'>الكل</option>";
    
    let selectSkillMemberFilter = document.getElementById('selectMemberSkillFilter');
    selectSkillMemberFilter.innerHTML = "<option value='0'>الكل</option>";
    
    let selectSkillMemberDone = document.getElementById('selectMemberSkillDone');
    selectSkillMemberDone.innerHTML = "<option value='0'>الكل</option>";
    
    
    
    const myProjectSkills = myProject.listSkills;
    
    for(var i=0; i<myProjectSkills.length; i++)
    {
        const codeProjectSkill = myProjectSkills[i].code;
        const nameSkill = myProjectSkills[i].nameSkill;

        let codeoption = `<option value="${codeProjectSkill}">${nameSkill}</option>`;
        
        selectSkillAll.insertAdjacentHTML("beforeend", codeoption);
        selectSkillFilter.insertAdjacentHTML("beforeend", codeoption);
        selectSkillDone.insertAdjacentHTML("beforeend", codeoption);
        
        selectSkillMemberAll.insertAdjacentHTML("beforeend", codeoption);
        selectSkillMemberFilter.insertAdjacentHTML("beforeend", codeoption);
        selectSkillMemberDone.insertAdjacentHTML("beforeend", codeoption);

    }

}

function fillSelectTaskStatus() {
    
    let selectTaskStatus = document.getElementById('selectTaskStatus');
    selectTaskStatus.innerHTML = "<option value='0'>الكل</option>";
    
    for(var i=0; i<listTaskStatus.length; i++) {
        
        const code = listTaskStatus[i].code;
        const name= listTaskStatus[i].name;
        
        const codeoption = `
             "<option value='${code}'>${name}</option>";
        `;
        
        selectTaskStatus.insertAdjacentHTML("beforeend", codeoption);
    }
    
}
function fillSelectMemberStatus() {
    
    let selectMemberStatus = document.getElementById('selectMemberStatus');
    selectMemberStatus.innerHTML = "<option value='0'>الكل</option>";
    
    for(var i=0; i<listMemberStatus.length; i++) {
        
        const code = listMemberStatus[i].code;
        const name= listMemberStatus[i].name;
        
        const codeoption = `
             "<option value='${code}'>${name}</option>";
        `;
        
        selectMemberStatus.insertAdjacentHTML("beforeend", codeoption);
    }
    
}


function fillterTasksAll() {
    
    let listItems = document.getElementById('listTaskAll').querySelectorAll("li");
    
    
    let selectSkill = document.getElementById('selectTaskSkillAll').value;
    let selectTaskStatus = document.getElementById('selectTaskStatus').value;
    
    
    
    if( selectSkill == "0" && selectTaskStatus == "0") {
        
        listItems.forEach( function(item) {
            item.style.display = "flex";
        });
        
    } else {
        
        if( selectSkill == "0" && selectTaskStatus != "0") {
            
            listItems.forEach( function(item) {
                
                const codeStatus = item.getAttribute("data-taskstatus");
                
                if( selectTaskStatus != codeStatus ) {
                    
                    item.style.display = "none";
                    
                } else {
                    
                    item.style.display = "flex";
                    
                }
            });
            
        } else if( selectSkill != "0" && selectTaskStatus == "0") {
                
                listItems.forEach( function(item) {
                
                const codeProjectSkill = item.getAttribute("data-codeprojectskill");
                
                if( selectSkill != codeProjectSkill ) {
                    
                    item.style.display = "none";
                    
                } else {
                    
                    item.style.display = "flex";
                    
                }
            });
            
        } else {
            
            listItems.forEach( function(item) {
                
                const codeProjectSkill = item.getAttribute("data-codeprojectskill");
                const codeStatusTask = item.getAttribute("data-taskstatus");
                
                if( selectSkill != codeProjectSkill || selectTaskStatus != codeStatusTask ) {
                    
                    item.style.display = "none";
                    
                } else {
                    
                    item.style.display = "flex";
                    
                }
            });
        }


    }
    
}
function fillterTasksFilter() {
    
    let listItems = document.getElementById('listTaskFilter').querySelectorAll("li");
    
    let selectSkill = document.getElementById('selectTaskSkillFilter').value;
    
    
    if( selectSkill == "0" ) {
        
        listItems.forEach( function(item) {
            item.style.display = "flex";
        });
        
    } else {
        
        listItems.forEach( function(item) {
        
            const codeProjectSkill = item.getAttribute("data-codeprojectskill");
            
            if( selectSkill != codeProjectSkill ) {
                
                item.style.display = "none";
                
            } else {
                
                item.style.display = "flex";
                
            }
        });
    }
}
function fillterTasksDone() {
    
    let listItems = document.getElementById('listTaskDone').querySelectorAll("li");
    
    let selectSkill = document.getElementById('selectTaskSkillDone').value;
    
    
    if( selectSkill == "0" ) {
        
        listItems.forEach( function(item) {
            item.style.display = "flex";
        });
        
    } else {
        
        listItems.forEach( function(item) {
        
            const codeProjectSkill = item.getAttribute("data-codeprojectskill");
            
            if( selectSkill != codeProjectSkill ) {
                
                item.style.display = "none";
                
            } else {
                
                item.style.display = "flex";
                
            }
        });
    }
    
}

function fillterMemberAll() {
    
    let listItems = document.getElementById('listMemberAll').querySelectorAll("li");
    
    
    let selectSkill = document.getElementById('selectMemberSkillAll').value;
    let selectTaskStatus = document.getElementById('selectMemberStatus').value;
    
    
    if( selectSkill == "0" && selectTaskStatus == "0") {
        
        listItems.forEach( function(item) {
            item.style.display = "flex";
        });
        
    } else {
        
        if( selectSkill == "0" && selectTaskStatus != "0") {
            
            listItems.forEach( function(item) {
                
                const codeStatus = item.getAttribute("data-memberstatus");
                
                if( selectTaskStatus != codeStatus ) {
                    
                    item.style.display = "none";
                    
                } else {
                    
                    item.style.display = "flex";
                    
                }
            });
            
        } else if( selectSkill != "0" && selectTaskStatus == "0") {
                
                listItems.forEach( function(item) {
                
                const codeProjectSkill = item.getAttribute("data-codeprojectskill");
                
                if( selectSkill != codeProjectSkill ) {
                    
                    item.style.display = "none";
                    
                } else {
                    
                    item.style.display = "flex";
                    
                }
            });
            
        } else {
            
            listItems.forEach( function(item) {
                
                const codeProjectSkill = item.getAttribute("data-codeprojectskill");
                const codeStatusMember = item.getAttribute("data-memberstatus");
                
                if( selectSkill != codeProjectSkill || selectTaskStatus != codeStatusMember ) {
                    
                    item.style.display = "none";
                    
                } else {
                    
                    item.style.display = "flex";
                    
                }
            });
        }


    }
    
    
}
function fillterMemberFilter() {
    
    let listItems = document.getElementById('listMemberFilter').querySelectorAll("li");
    
    let selectSkill = document.getElementById('selectMemberSkillFilter').value;
    
    
    if( selectSkill == "0" ) {
        
        listItems.forEach( function(item) {
            item.style.display = "flex";
        });
        
    } else {
        
        listItems.forEach( function(item) {
        
            const codeProjectSkill = item.getAttribute("data-codeprojectskill");
            
            if( selectSkill != codeProjectSkill ) {
                
                item.style.display = "none";
                
            } else {
                
                item.style.display = "flex";
                
            }
        });
    }
}
function fillterMemberDone() {
    
    let listItems = document.getElementById('listMemberDone').querySelectorAll("li");
    
    let selectSkill = document.getElementById('selectMemberSkillDone').value;
    
    
    if( selectSkill == "0" ) {
        
        listItems.forEach( function(item) {
            item.style.display = "flex";
        });
        
    } else {
        
        listItems.forEach( function(item) {
        
            const codeProjectSkill = item.getAttribute("data-codeprojectskill");
            
            if( selectSkill != codeProjectSkill ) {
                
                item.style.display = "none";
                
            } else {
                
                item.style.display = "flex";
                
            }
        });
    }
    
}

function viewSkillAndDirect() {
    
    var cardSkill = document.getElementById("cardSkill") ;
    var cardDirect = document.getElementById("cardDirect") ;
    
    cardSkill.classList.toggle("hide");
    cardDirect.classList.toggle("hide");
}



function refreshListSkillsAndTasks() {
    
    const pathReadProjectSkillsTasks = mainApp.pathDomain + "api/readDataProjectMySkillsTasks.php";
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    
    mainApp.send( "POST", pathReadProjectSkillsTasks , headers, formData ).then( (result) => {
        
        myProject.fillSkillsAndTasks( result );
        
        fillProjectSkills();
        fillProjectTask();
        fillProjectMember();
        fillProjectCharts();
        fillProjectDirect();
        
        document.getElementById('buttonEvaluation').classList.remove("star");
        
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

function refreshListMember() {
    
    const pathReadProjectMember = mainApp.pathDomain + "api/readDataProjectMyMember.php";
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("codeProject", myProject.code );
    
    mainApp.send( "POST", pathReadProjectMember , headers, formData ).then( (result) => {
        
        myProject.fillMembers( result );
        
        fillProjectMember();
        fillProjectCharts();
        
        document.getElementById('buttonEvaluation').classList.remove("star");
        
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




















