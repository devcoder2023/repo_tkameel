

<?php
    
    session_start();
        
    if(time() > $_SESSION['timeout']) {
        echo "
        <html>
        <head>
            <link rel='stylesheet' href='../style/stylehome.css'>
        </head>
        <body>
        <div class='wrapper'>
        <div class='widget'>
        <div class='widgetWarning'>
            <p>
            خطأ في التحقق من هوية المستخدم !
            </p>
            <a href='https://www.tkameel.com/web/login'>
            <div class='buttons'>
            تسجيل الدخول
            </div>
            </a>
        </div>
        </div>
        </div>
        </body>
        </html>
        ";
        exit();
    }
    
    
    if( isset($_GET["codeproject"])) {
        setcookie("codeproject", $_GET["codeproject"]);
    } else {
        setcookie("codeproject", "", time() - 3600);
    }
    
    if( isset($_SESSION["id"]) )
    {
        $id = $_SESSION['id'] ;
        $code = $_SESSION['code'] ;
        $firstName = $_SESSION['firstName'] ;
        $lastName = $_SESSION['lastName'] ;
        $email = $_SESSION['email'] ;
        $about = $_SESSION['about'] ;
        $codeType = $_SESSION['codeType'] ;
        $codeStatus = $_SESSION['codeStatus'] ;
        $verifyCode = $_SESSION['verifyCode'] ;
        $imageProfile = $_SESSION['imageProfile'] ;
        
        $nameType = $_SESSION['nameType'] ;
        $nameStatus = $_SESSION['nameStatus'] ;
        
        setcookie("userid", $id);
        setcookie("userfirstname", $firstName);
        setcookie("userlastname", $lastName);
        setcookie("useremail", $email);
        setcookie("userabout", $about);
        setcookie("usercodetype", $codeType);
        setcookie("usercodestatus", $codeStatus);
        setcookie("userverifycode", $verifyCode);
        setcookie("userimageprofile", $imageProfile);
        
        setcookie("usernametype", $nameType);
        setcookie("usernamestatus", $nameStatus);
        
    }
    else
    {
        echo "Finish Session .. Not Permision Enter Page ";
        exit();
    }
    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/stylelive.css">
    <link rel="icon" href="../files/logo/icn_ar.png">
    <script defer type="module" src="../js/scriptlive.js"></script>
    <title>المساحة العامة</title>
</head>
<!--<body onload="initMyProject()">-->
<body>

    <header>
        
        <div class="divheader">
            
            <div class="divlogo" align="center">
                <img id="imagelogo" class="imagelogo" src="../files/logo/logo_ar_light.png" />
            </div>
            
            <nav id="navbar" class="navbar">
                <ul>
                    <li>
                        <a href="https://www.tkameel.com/web/home" >الرئيسية</a>
                    </li>
                    <li>
                        <a href="https://www.tkameel.com/web/browseprojects" >المشاريع</a>
                    </li>
                    <li>
                        <a href="https://www.tkameel.com/web/about" >عن</a>
                    </li>
                </ul>
            </nav>
            
        </div>
        
        <div class="divheaderbuttons">
            
            <div id="buttonNotification" class="divsvg buttonNotification">
                
                <svg id="divsvgnotification" class="svgfill">
                    <use xlink:href="#svgnotification"/>
                </svg>
                
            </div>
            
            <div id="buttonMenu" class="divsvg buttonMenu">
                
                <svg id="divsvgmenu" class="svgfill">
                    <use xlink:href="#svgmenu"/>
                </svg>
                
            </div>
            
            <div id="menu" class="menu hide">
                <div class="body bodyMenu">
                <ul>
                    
                    <li>
                        <div class="divprofilemenu">
                            
                            <div class="userImage">
                                <div class="containerImage">
                                    <img id="userimgmenu" src="../files/photoProfile/user_anonymous.png">
                                </div>
                            </div>
                            
                            <h2 id="usernamemenu"></h2>
                        </div>
                    </li>
                    
                    <li><a href="https://www.tkameel.com/web/home">الرئيسية</a></li>
                    <li><a id="urlProfile" href="">الملف الشخصي</a></li>
                    <li><a href="https://www.tkameel.com/web/new">جديد</a></li>
                    <li><a href="https://www.tkameel.com/web/logout">خروج</a></li>
                    
                </ul>
                </div>
            </div>
            
            <div id="menuNotification" class="menu menuNotification hide">
                <div class="headerNotification">التنبيهات</div>
                <div class="body bodyNotification">
                    <ul>
                        
                    </ul>
                </div>
            </div>
            
        </div>
        
        
    </header>


    <div id="wrapper" class="wrapper">

        <main id="divmain" class="divmain">
            
            <div class="widget widgetInformation">
                
                <div class="widgetHeader widgetInformationHeader">
                    
                    <div class="coverImageProject">
                        <img id="imgProfileProject" class="img imgprofile" src= "../files/photoProject/project_anonymous.png" alt="Mountains"/>
                        <div id="coverNameProject" class="coverNameProject">
                            <h3 id="txetNameProject" class="txetNameProject">
                                
                            </h3>
                        </div>
                    </div>
                    
                    <div class="coverInfoProject">
                        <p id="textDescription" class="textDescription"></p>
                    </div>
                    
                    <div id="containerProgress" class="containerProgress">
                        <!--<h5>مستوى التقدم في المشروع</h5>-->
                        <p>مستوى التقدم في المشروع:</p>
                        <div id="innerProgress" class="innerProgress">
                            <div id="outterProgress" class="outterProgress"></div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="widgetBody widgetInformationBody">
                    
                    <!--<div class="containerInformationMember">-->
                        
                    <!--    <div id="containerNumber" class="containerNumber">-->
                    <!--        <h3>عدد الأعضاء </h3><h3 id="numberMember">17</h3>-->
                    <!--    </div>-->
                        
                    <!--    <div class="containerList">-->
                    <!--        <ul id="listMember" class="listMember">-->
                                
                    <!--        </ul>-->
                    <!--    </div>-->
                        
                    <!--</div>-->
                    
                    <div class="card cardList cardMember">
                        <div class="header">
                            <h3>عدد الأعضاء </h3><h3 id="numberMember">17</h3>
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listMember" class="listMember">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>

                    
                </div>
                
            </div>
            
            <div class="widget widgetChat">
                
                <!--<div class="widgetHeader widgetChatHeader">-->
                    
                    <!--<div class="containerTap">-->
                    <!--    <div class="buttonHeader buttonPublic"> عام </div>-->
                    <!--    <div class="buttonHeader buttonMe"> منشورات المتابعين </div>-->
                    <!--</div>-->
                    
                <!--    <div class="containerPublish">-->
                <!--        <div class="boxMessage">-->
                <!--            <textarea id="inputPublish" name="inputPublish" class="inputs area" placeholder="ماذا تود القول" requred></textarea>-->
                <!--                <span id="validContent" class="validation validContent"></span>-->
                <!--        </div>-->
                <!--        <div id="buttonPublish" class="buttons">نشر</div>-->
                <!--    </div>-->
                    
                <!--</div>-->
                
                <div class="widgetBody widgetChatBody">
                
                    <div class="card cardList">
                        
                        <div class="containerList chatLiveTeam">
                            <ul id="listChat" class="listItem listChat">
                                
                            </ul>
                        </div>
                        
                    </div>
                    
                </div>
                
                <div class="widgetFooter widgetFooterChat">
                    
                    <div class="coverPublish">
                        <div class="containerPublish">
                
                            <div class="boxMessage">
                                <textarea id="inputPublish" name="inputPublish" class="inputs area" placeholder="ماذا تود القول" requred></textarea>
                                <span id="validContent" class="validation validContent"></span>
                            </div>
                            
                            <div id="buttonPublish" class="buttons icon">
                                
                                <div class="divsvg">
                                    <svg class="svgfill">
                                        <use xlink:href="#svgsend"/>
                                    </svg>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            
            <div class="widget widgetSkill">
                
                <!--<div class="widgetHeader widgetSkillHeader">-->
                <!--    <h3>المهارات :</h3>-->
                <!--</div>-->
                
                <div class="widgetBody widgetSkillBody">
                    
                    <div class="card cardList cardSkill">
                        <div class="header">
                            <h3>المهارات</h3>
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listSkill" class="listSkill">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            <div class="widget widgetDirect">
                <!--<div class="widgetHeader widgetDirectHeader">-->
                <!--    <h3>التوجيهات :</h3>-->
                <!--</div>-->
                
                <div class="widgetBody widgetDirectBody">
                    
                    <div class="card cardList cardDirect">
                        <div class="header">
                            <h3>التوجيهات</h3>
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listDirect" class="listDirect">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            
        </main>
        
        <footer>
            <div class="containerFooter">
                
                <div class="container containerTop">
                        
                        <div class="divlogo" align="center">
                            <img id="imagelogo" class="imagelogo" src="../files/logo/logo_ar_light.png" />
                        </div>
                        
                </div>
                
                <div class="container containerRight">
                    <div class="covera">
                        <a href="https://www.tkameel.com/web/home">الرئيسية</a>
                    </div>
                    
                </div>
                
                <div class="container containerCenter">
                    <div class="covera">
                        <a href="https://www.tkameel.com/web/browseprojects">المشاريع</a>
                    </div>
                </div>
                
                <div class="container containerLeft">
                    <div class="covera">
                        <a href="https://www.tkameel.com/web/about">عن</a>
                    </div>
                    <div class="covera">
                        <a href="https://www.tkameel.com/web/guide">الإرشادات</a>
                    </div>
                </div>
                
                <div class="container containerBottom">
                    
                    <div class="footerBy">
                        
                        <label class="labelBy">أُنشئ بواسطة </label>
                        <div class="textBy">Coder | مبرمج</div>
                        
                    </div>
                        
                    <div class="footerSocial">
                        
                        <a href="">
                            <div class="footerImageX" align="center">
                                <img id="imagelogo" class="imagelogo" src="../files/logo/logo_F_White.png" />
                            </div>
                        </a>
                        
                        <a href="https://x.com/devcoder2023">
                            <div class="footerImageX" align="center">
                                <img id="imagelogo" class="imagelogo" src="../files/logo/logo_X_White.png" />
                            </div>
                        </a>
                    
            
                        
                    </div>
                    
                </div>
            </div>
        </footer>
        
        
        <div id="lightBox" class="lightBox close">
            <div id="lightBoxCard" class="lightBoxCard">
                
            </div>
        </div>
        
        
    </div>




    <div style="display: none;">

        <svg display="none">
            <symbol viewBox="0 0 20.4 20.4" id="svgmenu">
                <title>icon-menu2</title>
                <path d="M 19,4 A 1,1 0 0 1 18,5 H 2 A 1,1 0 0 1 2,3 h 16 a 1,1 0 0 1 1,1 z m 0,6 a 1,1 0 0 1 -1,1 H 2 A 1,1 0 1 1 2,9 h 16 a 1,1 0 0 1 1,1 z m -1,7 a 1,1 0 1 0 0,-2 H 2 a 1,1 0 1 0 0,2 z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgnotification">
                <title>icon-notification2</title>
                <path d="M 11.669922,5.75 C 8.1641229,5.8919903 5.4372807,8.9251449 5.5644531,12.490234 L 5.5625,12.462891 c 0,0.394352 -0.2588058,0.953613 -0.6113281,1.601562 -0.3525224,0.647949 -0.7950694,1.380049 -0.8242188,2.294922 a 0.750075,0.750075 0 0 0 0,0.02344 v 0.0293 c -0.044267,1.240031 0.9171234,2.317441 2.15625,2.367188 a 0.750075,0.750075 0 0 0 0.029297,0 h 2.6523438 c 0.1309413,0.529339 0.1995594,1.089188 0.5703125,1.498047 C 10.088686,20.893832 10.875248,21.25 11.701172,21.25 c 0.824996,0 1.61059,-0.355448 2.164062,-0.970703 0.371591,-0.409216 0.441117,-0.969835 0.572266,-1.5 h 2.650391 a 0.750075,0.750075 0 0 0 0.0293,0 c 1.239139,-0.04975 2.202484,-1.127188 2.158204,-2.367188 v -0.0293 a 0.750075,0.750075 0 0 0 0,-0.02344 C 19.246998,15.443032 18.803692,14.710317 18.451172,14.0625 18.098651,13.414683 17.839844,12.856546 17.839844,12.462891 l -0.002,0.02734 C 17.965052,8.925146 15.23632,5.8919896 11.730469,5.75 a 0.750075,0.750075 0 0 0 -0.06055,0 z m 0.03125,1.5078125 c 2.660677,0.1261568 4.737297,2.4126754 4.638672,5.1777345 a 0.750075,0.750075 0 0 0 0,0.02734 c 0,0.923343 0.437665,1.665427 0.792968,2.318359 0.355304,0.652932 0.630071,1.221344 0.642579,1.625 v 0.0332 a 0.750075,0.750075 0 0 0 0,0.02539 c 0.01612,0.451398 -0.306937,0.797999 -0.716797,0.814453 h -3.082031 a 0.750075,0.750075 0 0 0 -0.75,0.753906 c 0.0021,0.462051 -0.16993,0.904903 -0.472657,1.238281 a 0.750075,0.750075 0 0 0 -0.002,0.0039 C 12.477324,19.581257 12.097847,19.75 11.701172,19.75 c -0.396675,0 -0.776112,-0.168699 -1.050781,-0.474609 a 0.750075,0.750075 0 0 0 -0.002,-0.0039 C 10.345677,18.938138 10.17372,18.4953 10.175781,18.033203 A 0.750075,0.750075 0 0 0 9.4257813,17.279297 H 6.34375 C 5.9339183,17.262844 5.608887,16.916211 5.625,16.464844 a 0.750075,0.750075 0 0 0 0.00195,-0.02539 v -0.03906 C 5.6415307,15.999494 5.9152161,15.432494 6.2695312,14.78125 6.6251007,14.1277 7.0625,13.386537 7.0625,12.462891 a 0.750075,0.750075 0 0 0 0,-0.02734 C 6.963842,9.669818 9.0396304,7.3829466 11.701172,7.2578125 Z"></path>
                <path d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z"></path>
            </symbol>
        </svg>
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgnotificationOn">
                <title>icon-notification2</title>
                <path d="M 11.669922,5.75 C 8.1641229,5.8919903 5.4372807,8.9251449 5.5644531,12.490234 L 5.5625,12.462891 c 0,0.394352 -0.2588058,0.953613 -0.6113281,1.601562 -0.3525224,0.647949 -0.7950694,1.380049 -0.8242188,2.294922 a 0.750075,0.750075 0 0 0 0,0.02344 v 0.0293 c -0.044267,1.240031 0.9171234,2.317441 2.15625,2.367188 a 0.750075,0.750075 0 0 0 0.029297,0 h 2.6523438 c 0.1309413,0.529339 0.1995594,1.089188 0.5703125,1.498047 C 10.088686,20.893832 10.875248,21.25 11.701172,21.25 c 0.824996,0 1.61059,-0.355448 2.164062,-0.970703 0.371591,-0.409216 0.441117,-0.969835 0.572266,-1.5 h 2.650391 a 0.750075,0.750075 0 0 0 0.0293,0 c 1.239139,-0.04975 2.202484,-1.127188 2.158204,-2.367188 v -0.0293 a 0.750075,0.750075 0 0 0 0,-0.02344 C 19.246998,15.443032 18.803692,14.710317 18.451172,14.0625 18.098651,13.414683 17.839844,12.856546 17.839844,12.462891 l -0.002,0.02734 C 17.965052,8.925146 15.23632,5.8919896 11.730469,5.75 a 0.750075,0.750075 0 0 0 -0.06055,0 z m 0.03125,1.5078125 c 2.660677,0.1261568 4.737297,2.4126754 4.638672,5.1777345 a 0.750075,0.750075 0 0 0 0,0.02734 c 0,0.923343 0.437665,1.665427 0.792968,2.318359 0.355304,0.652932 0.630071,1.221344 0.642579,1.625 v 0.0332 a 0.750075,0.750075 0 0 0 0,0.02539 c 0.01612,0.451398 -0.306937,0.797999 -0.716797,0.814453 h -3.082031 a 0.750075,0.750075 0 0 0 -0.75,0.753906 c 0.0021,0.462051 -0.16993,0.904903 -0.472657,1.238281 a 0.750075,0.750075 0 0 0 -0.002,0.0039 C 12.477324,19.581257 12.097847,19.75 11.701172,19.75 c -0.396675,0 -0.776112,-0.168699 -1.050781,-0.474609 a 0.750075,0.750075 0 0 0 -0.002,-0.0039 C 10.345677,18.938138 10.17372,18.4953 10.175781,18.033203 A 0.750075,0.750075 0 0 0 9.4257813,17.279297 H 6.34375 C 5.9339183,17.262844 5.608887,16.916211 5.625,16.464844 a 0.750075,0.750075 0 0 0 0.00195,-0.02539 v -0.03906 C 5.6415307,15.999494 5.9152161,15.432494 6.2695312,14.78125 6.6251007,14.1277 7.0625,13.386537 7.0625,12.462891 a 0.750075,0.750075 0 0 0 0,-0.02734 C 6.963842,9.669818 9.0396304,7.3829466 11.701172,7.2578125 Z"></path>
                <path d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z"></path>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#ff0000" transform="translate(2,2), scale(0.4)"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgdown">
                <title>icon-down</title>
                <path d="M7 10L12 15L17 10"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 1024 1024" id="svgsetting">
                <title>icon-setting</title>
                <path d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgsend">
                <title>icon-send</title>
                <path d="M19.1168 12.1484C19.474 12.3581 19.9336 12.2384 20.1432 11.8811C20.3528 11.5238 20.2331 11.0643 19.8758 10.8547L19.1168 12.1484ZM6.94331 4.13656L6.55624 4.77902L6.56378 4.78344L6.94331 4.13656ZM5.92408 4.1598L5.50816 3.5357L5.50816 3.5357L5.92408 4.1598ZM5.51031 5.09156L4.76841 5.20151C4.77575 5.25101 4.78802 5.29965 4.80505 5.34671L5.51031 5.09156ZM7.12405 11.7567C7.26496 12.1462 7.69495 12.3477 8.08446 12.2068C8.47397 12.0659 8.67549 11.6359 8.53458 11.2464L7.12405 11.7567ZM19.8758 12.1484C20.2331 11.9388 20.3528 11.4793 20.1432 11.122C19.9336 10.7648 19.474 10.6451 19.1168 10.8547L19.8758 12.1484ZM6.94331 18.8666L6.56375 18.2196L6.55627 18.2241L6.94331 18.8666ZM5.92408 18.8433L5.50815 19.4674H5.50815L5.92408 18.8433ZM5.51031 17.9116L4.80505 17.6564C4.78802 17.7035 4.77575 17.7521 4.76841 17.8016L5.51031 17.9116ZM8.53458 11.7567C8.67549 11.3672 8.47397 10.9372 8.08446 10.7963C7.69495 10.6554 7.26496 10.8569 7.12405 11.2464L8.53458 11.7567ZM19.4963 12.2516C19.9105 12.2516 20.2463 11.9158 20.2463 11.5016C20.2463 11.0873 19.9105 10.7516 19.4963 10.7516V12.2516ZM7.82931 10.7516C7.4151 10.7516 7.07931 11.0873 7.07931 11.5016C7.07931 11.9158 7.4151 12.2516 7.82931 12.2516V10.7516ZM19.8758 10.8547L7.32284 3.48968L6.56378 4.78344L19.1168 12.1484L19.8758 10.8547ZM7.33035 3.49414C6.76609 3.15419 6.05633 3.17038 5.50816 3.5357L6.34 4.78391C6.40506 4.74055 6.4893 4.73863 6.55627 4.77898L7.33035 3.49414ZM5.50816 3.5357C4.95998 3.90102 4.67184 4.54987 4.76841 5.20151L6.25221 4.98161C6.24075 4.90427 6.27494 4.82727 6.34 4.78391L5.50816 3.5357ZM4.80505 5.34671L7.12405 11.7567L8.53458 11.2464L6.21558 4.83641L4.80505 5.34671ZM19.1168 10.8547L6.56378 18.2197L7.32284 19.5134L19.8758 12.1484L19.1168 10.8547ZM6.55627 18.2241C6.4893 18.2645 6.40506 18.2626 6.34 18.2192L5.50815 19.4674C6.05633 19.8327 6.76609 19.8489 7.33035 19.509L6.55627 18.2241ZM6.34 18.2192C6.27494 18.1759 6.24075 18.0988 6.25221 18.0215L4.76841 17.8016C4.67184 18.4532 4.95998 19.1021 5.50815 19.4674L6.34 18.2192ZM6.21558 18.1667L8.53458 11.7567L7.12405 11.2464L4.80505 17.6564L6.21558 18.1667ZM19.4963 10.7516H7.82931V12.2516H19.4963V10.7516Z" stroke="#000000" stroke-width="0.0" stroke-linecap="round" stroke-linejoin="round"/>
            </symbol>
        </svg>
        
        
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</body>
</html>
