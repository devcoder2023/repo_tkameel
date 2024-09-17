import * as moduleUserLog from './modules/moduleUserLog.js';

import MyActivities from './modules/moduleMyActivitiesClass.js'

import Main from './modules/moduleMain.js';



let mainApp = new Main();
let myActivities = null;

const COUNT_ROW = 5;




window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});

export function initApp( data ) {
    
    init_User();
    
    init_Activities();
    
    
    document.getElementById('buttonMenu').addEventListener("click" , clickMenu );
    document.getElementById('buttonNotification').addEventListener("click" , clickMenuNotification );
    
    
    
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

function init_Activities() {
    
    const pathDataMyActivities = mainApp.pathDomain + "api/readDataMyActivities.php";
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("countRow", COUNT_ROW );
    
    mainApp.send("POST", pathDataMyActivities , headers , formData ).then( ( result ) => {
        
        myActivities = new MyActivities( result );
        
        return result;
        
    }).then( (result) => {
        
        fillShowData();
        
        fillProjectMy();
        fillProjectJoin();
        
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



function fillProjectMy() {
    
    let listProject = document.getElementById('containerListRowMy');
    listProject.innerHTML = "";
    
    const listProjects = myActivities.getListProjectMy();
    
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
    
    
    const listProjects = myActivities.getListProjectJoin();
    
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
    
    const listProjects = myActivities.getListProjectMy();
    
    if( listProjects.length > 0) {
        
        let widthCard = 300;
        widthCard = document.getElementsByClassName("cardProject")[0].offsetWidth + 20;
        
        const listProject = document.getElementById('containerListRowMy');
        listProject.scrollLeft += widthCard;
        
    } else {
        
    }
    
    

}
function clickNavMyLeft() {
    
    const listProjects = myActivities.getListProjectMy();
    
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
    
    const listProjects = myActivities.getListProjectJoin();
    
    if( listProjects.length > 0) {
        
        let widthCard = 300; 
        widthCard = document.getElementsByClassName("cardProject")[0].offsetWidth + 20;
        
        const listProject = document.getElementById('containerListRowJoin');
        listProject.scrollLeft += widthCard;
        
    } else {
        
    }
    
    

}
function clickNavJoinLeft() {
    
    const listProjects = myActivities.getListProjectJoin();
    
    if( listProjects.length > 0) {
        
        let widthCard = 300; 
        widthCard = document.getElementsByClassName("cardProject")[0].offsetWidth + 20;
        
        const listProject = document.getElementById('containerListRowJoin');
        listProject.scrollLeft -= widthCard;
    
    } else {
        
    }
}

function fillShowData() {
    
    let displayCountTaskWorking = document.getElementById("displayCountTaskWorking");
    
    displayCountTaskWorking.textContent = myActivities.getthisCountTaskWorking() //data["countTaskWorking"];
    
    
}


function clickGoToLiveProject() {
    
    mainApp.goToProjectLive( myProject.code );

}

function clickGoToProjectWork( codeProjectSkill ) {
    
    mainApp.goToProjectWork( myProject.code , codeProjectSkill )
    
}



