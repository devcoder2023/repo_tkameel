
import Notification , { NotificationList } from './moduleNotification.js';



export default function Main() {
    
    this.names = "AWER";
    this.charsRegExp = "( _-+*/%=:.,~[] )";
    this.maxSizeFileImage = "5000000"; /* is = 5 MG */
    this.pathDomain = "https://www.tkameel.com/web/";
    
    this. myNotificationList = null;
    this.durationNotification = 30000;
    
    
    
    this.follow = function( codeUser , codeFollow ) {
        
        return new Promise( (resolve, reject) => {
            
            const pathFollowUser = this.pathDomain + "api/createFollowUser.php";
            
            const headers = [];
            
            let formData = new FormData();
            formData.append("action", "follow" );
            formData.append("codeUser", codeUser );
            formData.append("codeUserFollow", codeFollow );
            
            
            this.send("POST", pathFollowUser , headers , formData ).then( ( result ) => {
                
                resolve(result);
            
            }).catch( (reject) => {
                
                reject(reject);
                
            });
            
        });
        
    };
    
    this.unfollow = function( codeUser , codeFollow ) {
        const pathFollowUser = this.pathDomain + "api/createFollowUser.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("action", "unfollow" );
        formData.append("codeUser", codeUser );
        formData.append("codeUserFollow", codeFollow );
        
        
        this.send("POST", pathFollowUser , headers , formData ).then( ( result ) => {
            
            resolve(result);
            
        }).catch( (reject) => {
            
            reject(reject);
            
        });
        
    };
    
    this.goToProfile = function( codeUser ) {
        
        window.location.href = this.pathDomain + "profile/"+codeUser;
        
    }
    
    this.goToProject = function( codeUser , codeProject , codeProjectUser ) {
        
        if( codeUser == codeProjectUser ) {
            window.location.href = this.pathDomain + "myproject/" + codeProject;
        } else {
            window.location.href = this.pathDomain + "project/" + codeProject;
        }
        
    }
    
    
    this.goToProjectMy = function( codeUser , codeProject , codeProjectUser ) {
        
        if( codeUser == codeProjectUser ) {
            window.location.href = this.pathDomain + "myproject/" + codeProject;
        }
        
    }
    
    this.goToProjectLive = function( idProject ) {
        
        window.location.href = this.pathDomain + "live/" + idProject;
        
    }
    
    this.goToProjectWork = function( codeProject , codeProjectSkill ) {
        
        window.location.href = this.pathDomain + "workproject/"+ codeProject +"/"+ codeProjectSkill ;
        
    }
    
    
    this.publishPost = function( within , content , codeUser , codeProject , codeProjectSkill ) {
        
        return new Promise( (resolve, reject) => {
            
            const pathCreatePost = this.pathDomain + "api/createPost.php";
            
            const headers = [];
            
            let formData = new FormData();
            formData.append("within", within);
            formData.append("content", content );
            formData.append("codeUser", codeUser );
            
            if(within === "live") {
                
                formData.append("codeProject", codeProject );
                
            } else if(within === "work") {
                
                formData.append("codeProject", codeProject );
                formData.append("codeProjectSkill", codeProjectSkill );
                
            }
            
            
            this.send("POST", pathCreatePost , headers , formData ).then( ( result ) => {
                
                resolve(result);
            
            }).catch( (reject) => {
                
                reject(reject);
                
            });
            
        });

    }

    this.send = function(method , path , headers , form=null) {
    return new Promise( (resolve, reject) => {
        
        const token = this.getValCookie("token");
        
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            
            
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                let respon = sefatyJSON( xhr.responseText );
                
                let _status = respon["status"];
    
                if(_status == 200)
                {
                    const data = respon["data"];
                    resolve( data );
                }
                else if(_status == 400)
                {
                    const data = respon["data"];
                    const textError = respon["error"];
                    let responError = { status: _status, data: data, message: textError };
                    reject( responError );
                }
                else
                {
                    const data = respon["error"];
                    let responError = { status: _status, message: data };
                    reject( responError );
                }
                
            }
            else if(xhr.readyState == 4 && xhr.status != 200)
            {
                reject(0);
            }
            else
            {
            }
            
        }
        
        xhr.open( method, path, true);
        xhr.setRequestHeader("Authorization" , token );
        
        for(var i=0; i<headers.length; i++) {
            
        }
        
        if(form == null)
        {
            xhr.send();
        }
        else
        {
            xhr.send(  form  );
        }
        
    });
    } ;
    
    
    
    /*================= VALID & WARNING =================*/
    
    this.getValCookie = function( cname ) {
        
        var reg = cname + '=([^;]+)' ;
        var cookie = document.cookie.match(new RegExp( reg ));
        if(cookie === null) 
        {
            return null;
        }
        else
        {
            return decodeURIComponent(cookie[1]);
        }
    }
    
    this.strps = function( str , type ) {
        /*[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\uFDF0-\uFDFD]*/
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const urlPattern = /(https?:\/\/)?(www.)?\w+.\w+/i;
        
        const strPattern = /^[a-zA-Z0-9\u0600-\u06FF\u0750-\u077f _]+$/i;
        // const textPattern = /^[a-zA-Z0-9\u0600-\u06FF ._:,?!()^@~|%÷*\/+-]+$/i;
        const textPattern = /^[a-zA-Z0-9\u0600-\u06FF ._:,?!()^@~|%÷*\/+-]+$/i;
        const passPattern = /^[a-zA-Z0-9 ._:,?!()^@~|%÷*\/+-]{8,20}$/i;
        
        const numberPattern = /^[0-9]+$/;
        const numberPattern2 = /^\d+$/;
        
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        const datePattern2 = /^\d{2}-\d{2}-\d{4}$/;
        
        const imagePattern = /^[a-zA-Z0-9\u0600-\u06FF ._-]+(.jpg|.jpeg|.gif|.png)/i;
        
        
        let s = false;
        
        if(type === "email") {
            s = emailPattern.test( str.trim() );
            
        } else if( type === "password" ) {
            s = passPattern.test( str.trim() );
            
        } else if( type === "url" ) {
            s = urlPattern.test( str.trim() );
            
        } else if( type === "string" || type === "shortstring" ) {
            s = strPattern.test( str.trim() );
            
        } else if( type === "text") {
            s = textPattern.test( str );
            
        } else if( type === "number") {
            s = numberPattern.test( str.trim() );
            
        } else if( type === "date") {
            
            s = datePattern.test( str.trim() );
            if( !s ) {
                s = datePattern2.test( str.trim() );
            }
            
        } else if( type === "image") {
            s = imagePattern.test( str );
            
        } else {
            
        }
        
        return s;
        
        
    }
    this.strpsLength = function( str , type ) {
        
        const minLengthShortString = 3;
        const maxLengthShortString = 15;
        
        const minLengthString = 5;
        const maxLengthString = 25;
        
        const minLengthText = 10;
        const maxLengthText = 150;
        
        const minLengthPass = 10;
        const maxLengthPass = 50;
        
        const minLengthDate = 10;
        
        
        let s = false;
        if( type === "string") {
            
            if( str.length < minLengthString || str.length > maxLengthString ) {
                s = false;
            } else {
                s = true;
            }
            
        } else if( type === "shortstring") {
            
            if( str.length < minLengthShortString || str.length > maxLengthShortString ) {
                s = false;
            } else {
                s = true;
            }
            
        } else if( type === "text" || type === "email") {
            
            if( str.length < minLengthText || str.length > maxLengthText ) {
                s = false;
            } else {
                s = true;
            }
            
        } else if( type === "password" ) {
            
            if( str.length < minLengthPass || str.length > maxLengthPass ) {
                s = false;
            } else {
                s = true;
            }
            
        } else if( type === "number" ) {
            
            s = true;
            
        } else if( type === "date" ) {
            
            if( str.length == minLengthDate ) {
                s = true;
            } else {
                s = false;
            }
            
        } else {
            
        }
        
        return s;
        
        
    }
    
    this.validationInput = function( str , type ) {
        
        let status = false;
        let textError = "";
        
        if( str === "") {
            textError = "*حقل مطلوب";
        } else if( !this.strpsLength( str , type) ) {
            
            if( type === "string") {
                textError = "أدخل عدد أحرف بين 5 و 25";
            } else if( type === "shortstring") {
                textError = "أدخل عدد أحرف بين 3 و 15";
            } else if( type === "password") {
                textError = "كلمة المرور يجب أن تكون أطول من 10 أحرف";
            } else {
                textError = "أدخل عدد أحرف بين 10 و 150";
            }
            
        } else if( !this.strps( str , type) ) {
            textError = "أدخل أحرف وأرقام و ("+ this.charsRegExp +") فقط" ;
        } else {
            status = true;
            textError = "";
        }
        
        return [ status , textError ];
        
        
    }
    
    this.checkUrlImage = function( img ) {
        
        let urlImage = this.pathDomain + "files/photoProfile/" + img;
        
        if( /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlImage) ) {
            
        } else {
            urlImage = this.pathDomain + "files/photoProfile/user_anonymous.png"; 
        }
        
        return urlImage;
    }
    this.checkUrlImageProject = function( img ) {
        
        let urlImage = this.pathDomain + "files/photoProject/" + img;
        
        if( /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlImage) ) {
            
        } else {
            urlImage = this.pathDomain + "files/photoProject/project_anonymous.png"; 
        }
        
        return urlImage;
    }
    this.checkUrlImage2 = function( url ) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    
    this.codeWraning = function( msg , page ) {
        
        let txtButton = "الصفحة الرئيسية";
        
        if( page == "login" ) {
            txtButton = "تسجيل الدخول";
        }
        
        var wrapper = document.getElementById("wrapper") ;
        
        let code = `
            <div class='widget'>
            <div class='widgetWarning'>
            
                <p>${msg}</p>
                
                <a href='${this.pathDomain}${page}'>
                    <div class='buttons'>${txtButton}</div>
                </a>
                
            </div>
            </div>
        `;
        
        wrapper.innerHTML = code ;
    }
    
    
    
    
    
    
    
    
    
    /*================= DOM & WID =================*/
    
    
    this.setupProfile = function( codeUser , imageProfile ) {
        
        let urlImage = this.checkUrlImage( imageProfile );
        
        var imgProfile = document.getElementById("userimgmenu");
        imgProfile.src = urlImage;
        
        var urlProfile = document.getElementById("urlProfile");
        urlProfile.href = this.pathDomain + "profile/" + codeUser;
        
        
        setInterval( () => {
            
            this.callNotification();
            
        }, this.durationNotification );
        
        
    }
    
    this.setMenu = function() {
        
        var buttonMenu = document.getElementById("buttonMenu") ;
        var menu = document.getElementById("menu") ;
        
        var buttonNotification = document.getElementById('buttonNotification');
        var menuNotification = document.getElementById("menuNotification") ;
        
        document.addEventListener( "click" , (e) => {
            
            if( !menu.contains( e.target ) && !buttonMenu.contains( e.target ) ) {
                menu.classList.add("hide");
            }
            
            if( !menuNotification.contains( e.target ) && !buttonNotification.contains( e.target ) ) {
                menuNotification.classList.add("hide");
            }
            
        });
        
    }
    
    this.clickMenu = function() {
        
        var menu = document.getElementById("menu") ;
        menu.classList.toggle("hide");
        
    }
    
    this.clickNotification = function() {
        
        var menuNotification = document.getElementById("menuNotification") ;
        menuNotification.classList.toggle("hide");
        
        this.updateStatusNotificationView();
    }
    
    this.updateStatusNotificationView = function() {
        
        const pathUpdateNotification = this.pathDomain + "api/updateNotificationStatus.php";
        
        const lastIdNotification = this.myNotificationList.getLastIdNotification();
        
        if( lastIdNotification <= 0 ) return;
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("lastIdNotification" , lastIdNotification );
        
        this.send("POST", pathUpdateNotification , headers , formData ).then( ( result ) => {
        
            var svgNotification = document.getElementById("divsvgnotification").getElementsByTagName("use")[0];
            svgNotification.setAttribute('href', '#svgnotification');
            
            this.myNotificationList.clearLastIdNotification();
            
        }).then( (result) => {
            
        } ).catch( (reject) => {
            
        });
        
    };
    
    this.callNotification = function() {
        
        
        const pathDataNotification = this.pathDomain + "api/readNotification.php";
        
        const headers = [];
        
        let formData = new FormData();
        formData.append("countRow" , 5 );
        formData.append("numberPage" , 1 );
        
        this.send("POST", pathDataNotification , headers , formData ).then( ( result ) => {
            
            if( this.myNotificationList == null ) {
                this.myNotificationList = new NotificationList();
            }
            
            this.myNotificationList.fillListNotification( result );
            
        }).then( (result) => {
            
            this.fillNotification();
            
            
        } ).catch( (reject) => {
            // Mode Error
            
            const data = reject["data"];
            const codeError = data["codeError"];
            const textError = data["message"];
            
            
            if(codeError == 410) {
            } else if(codeError == 420) {
            } else if(codeError == 430) {
            } else {
            }
            
            
        });
        
    }
    
    this.fillNotification = function() {
        
        var menuNotification = document.getElementById("menuNotification").getElementsByTagName("ul")[0] ;
        menuNotification.innerHTML = "";
        
        const listNotifications = this.myNotificationList.getListNotification();
        
        for( var i=0; i<listNotifications.length; i++) {
            
            var svgNotification = document.getElementById("divsvgnotification").getElementsByTagName("use")[0];
            svgNotification.setAttribute('href', '#svgnotificationOn');
            
            const code = listNotifications[i].code;
            const typeNotification = listNotifications[i].typeNotification;
            
            const codeUserNoti = listNotifications[i].codeUserNoti;
            const firstName = listNotifications[i].firstName;
            const lastName = listNotifications[i].lastName;
            
            const codeProject = listNotifications[i].codeProject;
            const nameProject = listNotifications[i].nameProject;
            const codeProjectSkill = listNotifications[i].codeProjectSkill;
            const codeTask = listNotifications[i].codeTask;
            const nameTask = listNotifications[i].nameTask;
            
            const codeStatusApproveJoin = ( listNotifications[i].codeStatusApproveJoin == 1 ) ? "قبول" : "رفض" ;
            const codeStatusApproveTask = ( listNotifications[i].codeStatusApproveTask == 1 ) ? "إعتماد" : "إعادة" ;
            
            let textNotification = "";
            let goToURL = "";
            
            if( typeNotification == "follow" ) {
                
                textNotification = `<p>قام المستخدم <b>${firstName} ${lastName}</b> بمتابعتك</p>`;
                goToURL = this.pathDomain + `profile/${codeUserNoti}`;
                
            } else if( typeNotification === "join" ) {
                
                textNotification = `<p>لديك طلب للإنضمام إلى المشروع <b>${nameProject}</b></p>`;
                goToURL = this.pathDomain + `myproject/${codeProject}`;
                
            } else if( typeNotification === "joinTo" ) {
                
                textNotification = `<p>تم <b>${codeStatusApproveJoin}</b> إنضمامك لمشروع <b>${nameProject}</b></p>`;
                goToURL = this.pathDomain + `live/${codeProject}`;
                
            } else if( typeNotification == "task" ) {
                
                textNotification = `<p>تم <b>${codeStatusApproveTask}</b> مهمتك <b>${nameTask}</b> في مشروع <b>${nameProject}</b></p>`;
                goToURL = this.pathDomain + `workproject/${codeProject}/${codeProjectSkill}`;
                
            }
            
            let codeoption = `
                <li>
                <a href="${goToURL}">
                    <div class="containerNoti">
                        ${textNotification}
                    </div>
                </a>
                </li>
            `;
            menuNotification.insertAdjacentHTML("beforeend", codeoption);
            
        }
    }
    
    
    
    
    
    /*================= ENUM =================*/
    
    
}


function sefatyJSON( data ) {
    try {
        let json = JSON.parse( data );
        return json;
    } catch(e) {
        return null;
    }
}



















