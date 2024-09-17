

<?php
    
    session_start();
        
    if(time() > $_SESSION['timeout']) {
        echo "
        <html>
        <head>
            <link rel='stylesheet' href='../../style/stylehome.css'>
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
    
    
    if( isset($_GET["codeprojectskill"])) {
        setcookie("codeprojectskill", $_GET["codeprojectskill"]);
        setcookie("codeproject", $_GET["codeproject"]);
    } else {
        setcookie("codeprojectskill", "", time() - 3600);
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
    <link rel="stylesheet" href="../../style/styleworkproject.css">
    <link rel="icon" href="../../files/logo/icn_ar.png">
    <script defer type="module" src="../../js/scriptworkproject.js"></script>
    <title>صفحة العضو</title>
</head>

<body>

    <header>
        
        <div class="divheader">
            
            <div class="divlogo" align="center">
                <img id="imagelogo" class="imagelogo" src="../../files/logo/logo_ar_light.png" />
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
                                    <img id="userimgmenu" src="../../files/photoProfile/user_anonymous.png">
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

        <main id="covermain" class="covermain">
                
            <article id="divmain" class="divmain">
                
                <div class="widget widgetView widgetViewTeam">
                    
                    <div class="widgetHeader widgetViewHeader widgetViewTeamHeader">
                        <h3>تفاصيل المهارة :</h3>
                        
                        <div id="containerButtonsWidgetHeaderView" class="containerButtonsWidgetHeader">
                            
                            <div id="buttonGoToLive" class="buttons">
                             المساحة العامة
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    
                    <div class="widgetBody widgetViewBody widgetViewTeamBody">
                        
                        <div class="containerDetailes containerDetailesTeam">
                                
                            <div class="inner">
                                
                                <div id="griddetailesteam" class="griddetailes">
                                    
                                    <div class="card cardDetailsText">
                                        <label>اسم المهارة :</label>
                                        <h3 id="skillname"></h3>
                                    </div>
                                    
                                    <div class="card cardDetailsText">
                                        <label>عدد المهام :</label>
                                        <h3 id="skillcounttasks"></h3>
                                    </div>
                                    
                                    <div class="card cardDetailsText">
                                        <label>عدد الأعضاء :</label>
                                        <h3 id="skillcountmembers"></h3>
                                    </div>
                                    
                                    <div class="card cardDetailsImage">
                                        <div class="header">
                                            <img src="../../files/images/boarding/boarding1.png">
                                        </div>
                                        <div class="body">
                                            <p id="skilldescription">
                                                
                                            </p>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    
                                    <div class="card cardBoard cardBoardStatus">
                                        <div id="containerChartStatusPie" class="containerChart">
                                            <div class="header">
                                                    <h2>
                                                        تقدم المهام
                                                    </h2>
                                                </div>
                                            <div class="body">
                                                <canvas id="canvasBoardStatus" width="200px" height="160px"></canvas>
                                            </div>
                                            <div class="footer">
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    
                    
                </div>
                
                <div class="widget widgetTasks">
                
                    <div class="widgetHeader widgetTasksHeader">
                        <h3>إدارة المهام :</h3>
                    </div>
                    
                    
                    <div class="widgetBody widgetTasksBody grid">
                    
                        <div class="card cardList cardTaskAll">
                            <div class="header">
                                <h3>الكل :</h3>
                            </div>
                            <div class="body">
                                
                                <div class="containerList">
                                    <ul id="listTaskAll" class="listItem listTaskAll">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                        <div class="card cardList cardTaskMe">
                            <div class="header">
                                <h3> مهامي:</h3>
                            </div>
                            <div class="body">
                                
                                <div class="containerList">
                                    <ul id="listTaskMe" class="listItem listTaskMe">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                        <div class="card cardList cardTaskDone">
                            <div class="header">
                                <h3>المكتملة :</h3>
                            </div>
                            <div class="body">
                                
                                <div class="containerList">
                                    <ul id="listTaskDone" class="listItem listTaskDone ">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                    
                    </div>
                        
                        
                </div>
                
                <div class="widget widgetMembers">
                
                    <div class="widgetHeader widgetMembersHeader">
                        <h3>الأعضاء :</h3>
                    </div>
                    
                    
                    <div class="widgetBody widgetMembersBody grid">
                    
                        <div class="card cardList cardMemberTeam">
                            <div class="header">
                                <h3> أعضاء الفريق:</h3>
                            </div>
                            <div class="body">
                                
                                <div class="containerList">
                                    <ul id="listMemberTeam" class="listItem listMemberTeam">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                    
                    
                    </div>
                        
                        
                </div>
                
                
            </article>
    
            <div id="containerFlat" class="containerFlat">
                
                <div id="widgetDivDirect" class="widgetDivDirect">
                    
                    <div class="card cardList cardDirectx">
                        
                        <div class="header">
                            <h3>التوجيهات:</h3>
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listDirect" class="listItem listDirect">
                                    
                                </ul>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <div id="buttonShowChat" class="buttons icon buttonShowChat">
                        
                        <div class="divsvg">
                            <svg class="svgfill">
                                <use xlink:href="#svgchat"/>
                            </svg>
                        </div>
                        
                    </div>
                    
                    
                </div>
                
                <div id="widgetDivChat" class="widgetDivChat">
                    
                    <div id="coverDivChat" class="coverDivChat">
                        <div class="card cardList cardChat">
                            
                            <div class="header">
                                <h3>المنشورات</h3>
                            </div>
                            <div class="body">
                                
                                <div class="containerList chatWorkTeam">
                                    <ul id="listChat" class="listItem listChat">
                                        
                                    </ul>
                                </div>
                                
                                <div class="coverPublish">
                                    
                                    <!--<div class="containerTap">-->
                                    <!--    <div class="buttonHeader buttonPublic"> عام </div>-->
                                    <!--    <div class="buttonHeader buttonMe"> منشورات المتابعين </div>-->
                                    <!--</div>-->
                                    
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
                    </div>
                    
                </div>
                
            </div>

        </main>
        
        <footer>
            <div class="containerFooter">
                
                <div class="container containerTop">
                        
                        <div class="divlogo" align="center">
                            <img id="imagelogo" class="imagelogo" src="../../files/logo/logo_ar_light.png" />
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
                                <img id="imagelogo" class="imagelogo" src="../../files/logo/logo_F_White.png" />
                            </div>
                        </a>
                        
                        <a href="https://x.com/prog2023">
                            <div class="footerImageX" align="center">
                                <img id="imagelogo" class="imagelogo" src="../../files/logo/logo_X_White.png" />
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
            <symbol viewBox="-6 -6 36 36" id="svgtakein">
                <title>icon-svgoutuser34</title>
                
                
                <g id="layer1">
                <g id="g4">
                    
                <g id="g3" transform="translate(-5)">
                <path d="M 20,12.75 H 9 C 8.80109,12.75 8.61032,12.671 8.46967,12.5303 8.32902,12.3897 8.25,12.1989 8.25,12 8.25,11.8011 8.32902,11.6103 8.46967,11.4697 8.61032,11.329 8.80109,11.25 9,11.25 h 11 c 0.1989,0 0.3897,0.079 0.5303,0.2197 0.1407,0.1406 0.2197,0.3314 0.2197,0.5303 0,0.1989 -0.079,0.3897 -0.2197,0.5303 C 20.3897,12.671 20.1989,12.75 20,12.75 Z"/> 
                </g>
                
                <g id="g2" transform="translate(-5)">
                <path d="m 16,16.7499 c -0.0985,5e-4 -0.1962,-0.0187 -0.2872,-0.0565 -0.091,-0.0378 -0.1736,-0.0934 -0.2428,-0.1635 -0.1404,-0.1406 -0.2193,-0.3312 -0.2193,-0.53 0,-0.1987 0.0789,-0.3894 0.2193,-0.53 l 3.47,-3.47 -3.47,-3.46999 C 15.3963,8.46125 15.3372,8.37845 15.2962,8.28645 15.2552,8.19445 15.2332,8.09513 15.2314,7.99443 15.2296,7.89373 15.2482,7.7937 15.2859,7.70031 15.3236,7.60692 15.3797,7.52209 15.451,7.45087 c 0.0712,-0.07122 0.156,-0.12736 0.2494,-0.16508 0.0934,-0.03772 0.1934,-0.05625 0.2941,-0.05447 0.1007,0.00177 0.2,0.02382 0.292,0.06481 0.092,0.04099 0.1748,0.10009 0.2435,0.17378 l 4,3.99999 c 0.1405,0.1406 0.2193,0.3313 0.2193,0.53 0,0.1988 -0.0788,0.3894 -0.2193,0.53 l -4,4 c -0.0692,0.0701 -0.1518,0.1257 -0.2428,0.1635 -0.091,0.0378 -0.1887,0.057 -0.2872,0.0565 z"/> 
                </g>
                
                <g id="g1" transform="matrix(-1,0,0,1,24,0)">
                <path d="M 9,20.7499 H 6 C 5.65324,20.7647 5.30697,20.7109 4.98101,20.5917 4.65505,20.4725 4.3558,20.2902 4.10038,20.0552 3.84495,19.8202 3.63837,19.5371 3.49246,19.2222 3.34654,18.9073 3.26415,18.5667 3.25,18.2199 V 5.77994 C 3.26415,5.43316 3.34654,5.09256 3.49246,4.77765 3.63837,4.46274 3.84495,4.17969 4.10038,3.9447 4.3558,3.70971 4.65505,3.52739 4.98101,3.40818 5.30697,3.28896 5.65324,3.23519 6,3.24994 h 3 c 0.19891,0 0.38968,0.07902 0.53033,0.21967 C 9.67098,3.61027 9.75,3.80103 9.75,3.99994 9.75,4.19886 9.67098,4.38962 9.53033,4.53027 9.38968,4.67093 9.19891,4.74994 9,4.74994 H 6 C 5.70307,4.72412 5.4076,4.81359 5.17487,4.99977 4.94213,5.18596 4.78999,5.45459 4.75,5.74994 V 18.2199 c 0.03999,0.2954 0.19213,0.564 0.42487,0.7502 C 5.4076,19.1563 5.70307,19.2458 6,19.2199 h 3 c 0.19891,0 0.38968,0.0791 0.53033,0.2197 0.14065,0.1407 0.21967,0.3314 0.21967,0.5303 0,0.199 -0.07902,0.3897 -0.21967,0.5304 C 9.38968,20.6409 9.19891,20.7199 9,20.7199 Z"/> 
                </g>
                
                </g>
                </g>
                
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-6 -6 36 36" id="svgtakeout">
                <title>icon-svgoutuser35</title>
                
                
                <g id="layer1">
                <g id="g4">
                    
                <g id="g3" transform="matrix(-1,0,0,1,24,0)">
                <path d="M 20,12.75 H 9 C 8.80109,12.75 8.61032,12.671 8.46967,12.5303 8.32902,12.3897 8.25,12.1989 8.25,12 8.25,11.8011 8.32902,11.6103 8.46967,11.4697 8.61032,11.329 8.80109,11.25 9,11.25 h 11 c 0.1989,0 0.3897,0.079 0.5303,0.2197 0.1407,0.1406 0.2197,0.3314 0.2197,0.5303 0,0.1989 -0.079,0.3897 -0.2197,0.5303 C 20.3897,12.671 20.1989,12.75 20,12.75 Z"/> 
                </g>
                
                <g id="g2" transform="matrix(-1,0,0,1,24,0)">
                <path d="m 16,16.7499 c -0.0985,5e-4 -0.1962,-0.0187 -0.2872,-0.0565 -0.091,-0.0378 -0.1736,-0.0934 -0.2428,-0.1635 -0.1404,-0.1406 -0.2193,-0.3312 -0.2193,-0.53 0,-0.1987 0.0789,-0.3894 0.2193,-0.53 l 3.47,-3.47 -3.47,-3.46999 C 15.3963,8.46125 15.3372,8.37845 15.2962,8.28645 15.2552,8.19445 15.2332,8.09513 15.2314,7.99443 15.2296,7.89373 15.2482,7.7937 15.2859,7.70031 15.3236,7.60692 15.3797,7.52209 15.451,7.45087 c 0.0712,-0.07122 0.156,-0.12736 0.2494,-0.16508 0.0934,-0.03772 0.1934,-0.05625 0.2941,-0.05447 0.1007,0.00177 0.2,0.02382 0.292,0.06481 0.092,0.04099 0.1748,0.10009 0.2435,0.17378 l 4,3.99999 c 0.1405,0.1406 0.2193,0.3313 0.2193,0.53 0,0.1988 -0.0788,0.3894 -0.2193,0.53 l -4,4 c -0.0692,0.0701 -0.1518,0.1257 -0.2428,0.1635 -0.091,0.0378 -0.1887,0.057 -0.2872,0.0565 z"/> 
                </g>
                
                <g id="g1" transform="matrix(-1,0,0,1,24,0)">
                <path d="M 9,20.7499 H 6 C 5.65324,20.7647 5.30697,20.7109 4.98101,20.5917 4.65505,20.4725 4.3558,20.2902 4.10038,20.0552 3.84495,19.8202 3.63837,19.5371 3.49246,19.2222 3.34654,18.9073 3.26415,18.5667 3.25,18.2199 V 5.77994 C 3.26415,5.43316 3.34654,5.09256 3.49246,4.77765 3.63837,4.46274 3.84495,4.17969 4.10038,3.9447 4.3558,3.70971 4.65505,3.52739 4.98101,3.40818 5.30697,3.28896 5.65324,3.23519 6,3.24994 h 3 c 0.19891,0 0.38968,0.07902 0.53033,0.21967 C 9.67098,3.61027 9.75,3.80103 9.75,3.99994 9.75,4.19886 9.67098,4.38962 9.53033,4.53027 9.38968,4.67093 9.19891,4.74994 9,4.74994 H 6 C 5.70307,4.72412 5.4076,4.81359 5.17487,4.99977 4.94213,5.18596 4.78999,5.45459 4.75,5.74994 V 18.2199 c 0.03999,0.2954 0.19213,0.564 0.42487,0.7502 C 5.4076,19.1563 5.70307,19.2458 6,19.2199 h 3 c 0.19891,0 0.38968,0.0791 0.53033,0.2197 0.14065,0.1407 0.21967,0.3314 0.21967,0.5303 0,0.199 -0.07902,0.3897 -0.21967,0.5304 C 9.38968,20.6409 9.19891,20.7199 9,20.7199 Z"/> 
                </g>
                
                </g>
                </g>
                
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-4 -4 30 30" id="svgaccepte">
                <title>icon-accepte2</title>
                <path d="M 651.88867 178.125 A 33.333333 33.333333 0 0 0 628.32031 187.89062 L 298.30664 517.83789 L 156.90039 376.43164 A 33.333333 33.333333 0 0 0 109.76562 376.43164 A 33.333333 33.333333 0 0 0 109.76562 423.56836 L 274.74023 588.54102 A 33.336667 33.336667 0 0 0 321.875 588.54102 L 675.45508 235.02539 A 33.333333 33.333333 0 0 0 675.45508 187.89062 A 33.333333 33.333333 0 0 0 651.88867 178.125 z " transform="scale(0.03)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-8 -8 40 40" id="svgexclamation">
                <title>icon-trash</title>
                <path d="m 11.099609,5.3007812 v 6.6796878 h 1.800782 V 5.3007812 Z"></path>
                <path d="m 5.3203125,0.58007812 c -2.5961212,0 -4.72070312,2.12458188 -4.72070313,4.72070308 v 9.5390628 c 10e-9,2.596121 2.12458193,4.720703 4.72070313,4.720703 H 8.7675781 L 12,22.792969 15.232422,19.560547 h 3.447265 c 2.596122,0 4.720704,-2.124582 4.720704,-4.720703 V 5.3007812 c 0,-2.5961212 -2.124582,-4.72070307 -4.720704,-4.72070308 z m 0,1.80078128 H 18.679687 c 1.623331,0 2.919922,1.2965918 2.919922,2.9199218 v 9.5390628 c 0,1.62333 -1.296591,2.919922 -2.919922,2.919922 H 14.486328 L 12,20.246094 9.5136719,17.759766 H 5.3203125 c -1.62333,0 -2.9199219,-1.296592 -2.9199219,-2.919922 V 5.3007812 c 0,-1.62333 1.2965919,-2.9199218 2.9199219,-2.9199218 z"></path>
                <path d="m 11.050781,12.990234 v 1.798829 h 1.898438 v -1.798829 z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgsend">
                <title>icon-send</title>
                <path d="M19.1168 12.1484C19.474 12.3581 19.9336 12.2384 20.1432 11.8811C20.3528 11.5238 20.2331 11.0643 19.8758 10.8547L19.1168 12.1484ZM6.94331 4.13656L6.55624 4.77902L6.56378 4.78344L6.94331 4.13656ZM5.92408 4.1598L5.50816 3.5357L5.50816 3.5357L5.92408 4.1598ZM5.51031 5.09156L4.76841 5.20151C4.77575 5.25101 4.78802 5.29965 4.80505 5.34671L5.51031 5.09156ZM7.12405 11.7567C7.26496 12.1462 7.69495 12.3477 8.08446 12.2068C8.47397 12.0659 8.67549 11.6359 8.53458 11.2464L7.12405 11.7567ZM19.8758 12.1484C20.2331 11.9388 20.3528 11.4793 20.1432 11.122C19.9336 10.7648 19.474 10.6451 19.1168 10.8547L19.8758 12.1484ZM6.94331 18.8666L6.56375 18.2196L6.55627 18.2241L6.94331 18.8666ZM5.92408 18.8433L5.50815 19.4674H5.50815L5.92408 18.8433ZM5.51031 17.9116L4.80505 17.6564C4.78802 17.7035 4.77575 17.7521 4.76841 17.8016L5.51031 17.9116ZM8.53458 11.7567C8.67549 11.3672 8.47397 10.9372 8.08446 10.7963C7.69495 10.6554 7.26496 10.8569 7.12405 11.2464L8.53458 11.7567ZM19.4963 12.2516C19.9105 12.2516 20.2463 11.9158 20.2463 11.5016C20.2463 11.0873 19.9105 10.7516 19.4963 10.7516V12.2516ZM7.82931 10.7516C7.4151 10.7516 7.07931 11.0873 7.07931 11.5016C7.07931 11.9158 7.4151 12.2516 7.82931 12.2516V10.7516ZM19.8758 10.8547L7.32284 3.48968L6.56378 4.78344L19.1168 12.1484L19.8758 10.8547ZM7.33035 3.49414C6.76609 3.15419 6.05633 3.17038 5.50816 3.5357L6.34 4.78391C6.40506 4.74055 6.4893 4.73863 6.55627 4.77898L7.33035 3.49414ZM5.50816 3.5357C4.95998 3.90102 4.67184 4.54987 4.76841 5.20151L6.25221 4.98161C6.24075 4.90427 6.27494 4.82727 6.34 4.78391L5.50816 3.5357ZM4.80505 5.34671L7.12405 11.7567L8.53458 11.2464L6.21558 4.83641L4.80505 5.34671ZM19.1168 10.8547L6.56378 18.2197L7.32284 19.5134L19.8758 12.1484L19.1168 10.8547ZM6.55627 18.2241C6.4893 18.2645 6.40506 18.2626 6.34 18.2192L5.50815 19.4674C6.05633 19.8327 6.76609 19.8489 7.33035 19.509L6.55627 18.2241ZM6.34 18.2192C6.27494 18.1759 6.24075 18.0988 6.25221 18.0215L4.76841 17.8016C4.67184 18.4532 4.95998 19.1021 5.50815 19.4674L6.34 18.2192ZM6.21558 18.1667L8.53458 11.7567L7.12405 11.2464L4.80505 17.6564L6.21558 18.1667ZM19.4963 10.7516H7.82931V12.2516H19.4963V10.7516Z" stroke="#000000" stroke-width="0.0" stroke-linecap="round" stroke-linejoin="round"/>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 1024 1024" id="svgchat">
                <title>icon-chat</title>
                <path d="M160 826.88 273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z" stroke="#000000" stroke-width="0.0" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M352 512h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm0-192h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z" stroke="#000000" stroke-width="0.0" stroke-linecap="round" stroke-linejoin="round"/>
            </symbol>
        </svg>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgadd">
                <title>icon-add</title>
                <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>

        <svg display="none">
            <symbol viewBox="-8.5 -6 30 30" id="svgremove">
                <title>icon-remove</title>
                <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"></path>
            </symbol>
        </svg>

        <svg display="none">
            <symbol viewBox="-4 -4 30 30" id="svgaccepte">
                <title>icon-accepte</title>
                <path d="M4 12L8.94975 16.9497L19.5572 6.34326" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-2 -2 28 28" id="svgacceptedouble">
                <title>icon-acceptedouble</title>
                <path d="M4 12.9L7.14286 16.5L15 7.5" stroke="#1C274C" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M20 7.5625L11.4283 16.5625L11 16" stroke="#1C274C" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        

        <svg display="none">
            <symbol viewBox="-10 -10 45 45" id="svgignore">
                <title>icon-ignore</title>
                <path d="M23,11a1,1,0,0,0-1,1,10.034,10.034,0,1,1-2.9-7.021A.862.862,0,0,1,19,5H16a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V1a1,1,0,0,0-2,0V3.065A11.994,11.994,0,1,0,24,12,1,1,0,0,0,23,11Z
M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z" stroke-width="0.5"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-3 -3 30 30" id="svgignore2">
                <title>icon-ignore-2</title>
                <path d="M13 9H9M9 9V13M9 9L15 15M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgoutuser">
                <title>icon-svgoutuser</title>
                <!--<path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H17C17.5523 21 18 20.5523 18 20C18 19.4477 17.5523 19 17 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H17C17.5523 5 18 4.55228 18 4C18 3.44772 17.5523 3 17 3H6ZM15.7071 7.29289C15.3166 6.90237 14.6834 6.90237 14.2929 7.29289C13.9024 7.68342 13.9024 8.31658 14.2929 8.70711L16.5858 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16.5858L14.2929 15.2929C13.9024 15.6834 13.9024 16.3166 14.2929 16.7071C14.6834 17.0976 15.3166 17.0976 15.7071 16.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L15.7071 7.29289Z" fill="#000000"></path>-->
                <path d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H17C17.5523 21 18 20.5523 18 20C18 19.4477 17.5523 19 17 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H17C17.5523 5 18 4.55228 18 4C18 3.44772 17.5523 3 17 3H6ZM15.7071 7.29289C15.3166 6.90237 14.6834 6.90237 14.2929 7.29289C13.9024 7.68342 13.9024 8.31658 14.2929 8.70711L16.5858 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16.5858L14.2929 15.2929C13.9024 15.6834 13.9024 16.3166 14.2929 16.7071C14.6834 17.0976 15.3166 17.0976 15.7071 16.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L15.7071 7.29289Z"></path>
            </symbol>
        </svg>
        
        
        <svg display="none">
            <symbol viewBox="-6 -6 36 36" id="svgoutuser4" stroke-width="0.5">
                <title>icon-svgoutuser4</title>
                                
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                
                <g id="SVGRepo_iconCarrier"> <path d="M9 20.7499H6C5.65324 20.7647 5.30697 20.7109 4.98101 20.5917C4.65505 20.4725 4.3558 20.2902 4.10038 20.0552C3.84495 19.8202 3.63837 19.5371 3.49246 19.2222C3.34654 18.9073 3.26415 18.5667 3.25 18.2199V5.77994C3.26415 5.43316 3.34654 5.09256 3.49246 4.77765C3.63837 4.46274 3.84495 4.17969 4.10038 3.9447C4.3558 3.70971 4.65505 3.52739 4.98101 3.40818C5.30697 3.28896 5.65324 3.23519 6 3.24994H9C9.19891 3.24994 9.38968 3.32896 9.53033 3.46961C9.67098 3.61027 9.75 3.80103 9.75 3.99994C9.75 4.19886 9.67098 4.38962 9.53033 4.53027C9.38968 4.67093 9.19891 4.74994 9 4.74994H6C5.70307 4.72412 5.4076 4.81359 5.17487 4.99977C4.94213 5.18596 4.78999 5.45459 4.75 5.74994V18.2199C4.78999 18.5153 4.94213 18.7839 5.17487 18.9701C5.4076 19.1563 5.70307 19.2458 6 19.2199H9C9.19891 19.2199 9.38968 19.299 9.53033 19.4396C9.67098 19.5803 9.75 19.771 9.75 19.9699C9.75 20.1689 9.67098 20.3596 9.53033 20.5003C9.38968 20.6409 9.19891 20.7199 9 20.7199V20.7499Z"/> <path d="M16 16.7499C15.9015 16.7504 15.8038 16.7312 15.7128 16.6934C15.6218 16.6556 15.5392 16.6 15.47 16.5299C15.3296 16.3893 15.2507 16.1987 15.2507 15.9999C15.2507 15.8012 15.3296 15.6105 15.47 15.4699L18.94 11.9999L15.47 8.52991C15.3963 8.46125 15.3372 8.37845 15.2962 8.28645C15.2552 8.19445 15.2332 8.09513 15.2314 7.99443C15.2296 7.89373 15.2482 7.7937 15.2859 7.70031C15.3236 7.60692 15.3797 7.52209 15.451 7.45087C15.5222 7.37965 15.607 7.32351 15.7004 7.28579C15.7938 7.24807 15.8938 7.22954 15.9945 7.23132C16.0952 7.23309 16.1945 7.25514 16.2865 7.29613C16.3785 7.33712 16.4613 7.39622 16.53 7.46991L20.53 11.4699C20.6705 11.6105 20.7493 11.8012 20.7493 11.9999C20.7493 12.1987 20.6705 12.3893 20.53 12.5299L16.53 16.5299C16.4608 16.6 16.3782 16.6556 16.2872 16.6934C16.1962 16.7312 16.0985 16.7504 16 16.7499Z"/> <path d="M20 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25H20C20.1989 11.25 20.3897 11.329 20.5303 11.4697C20.671 11.6103 20.75 11.8011 20.75 12C20.75 12.1989 20.671 12.3897 20.5303 12.5303C20.3897 12.671 20.1989 12.75 20 12.75Z"/> </g>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-5 -5 34 34" id="svgoutuser5" stroke-width="2.5">
                <title>icon-svgoutuser4</title>
                
                <path d="M14 4L18 4C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H14M3 12L15 12M3 12L7 8M3 12L7 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-5 -5 34 34" id="svginuser4" stroke-width="2.5">
                <title>icon-svgoutuser4</title>
                
                <path d="M15 4H18C19.1046 4 20 4.89543 20 6L20 18C20 19.1046 19.1046 20 18 20H15M11 16L15 12M15 12L11 8M15 12H3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </symbol>
        </svg>
        

        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgdown">
                <title>icon-down</title>
                <path d="M7 10L12 15L17 10"></path>
            </symbol>
        </svg>
        

        <svg display="none">
            <symbol viewBox="-14 -14 80 80" id="svgreturn">
                <title>icon-return</title>
                <!--<path d="M13 9H9M9 9V13M9 9L15 15M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>-->
                
                <path d="M12.9998 8L6 14L12.9998 21" stroke="#000000" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#000000" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-8 -8 40 40" id="svgexclamation">
                <title>icon-trash</title>
                <line class="cls-1" x1="12" y1="5.3" x2="12" y2="11.98"/>
                <path d="M18.68,1.48H5.32A3.82,3.82,0,0,0,1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H9.14L12,21.52l2.86-2.86h3.82a3.82,3.82,0,0,0,3.82-3.82V5.3A3.82,3.82,0,0,0,18.68,1.48Z" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
                <line class="cls-1" x1="11.05" y1="13.89" x2="12.95" y2="13.89"/>
            </symbol>
        </svg>

        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 24 24" id="svgsend">-->
        <!--        <title>icon-return</title>-->
        <!--        <path d="M19.1168 12.1484C19.474 12.3581 19.9336 12.2384 20.1432 11.8811C20.3528 11.5238 20.2331 11.0643 19.8758 10.8547L19.1168 12.1484ZM6.94331 4.13656L6.55624 4.77902L6.56378 4.78344L6.94331 4.13656ZM5.92408 4.1598L5.50816 3.5357L5.50816 3.5357L5.92408 4.1598ZM5.51031 5.09156L4.76841 5.20151C4.77575 5.25101 4.78802 5.29965 4.80505 5.34671L5.51031 5.09156ZM7.12405 11.7567C7.26496 12.1462 7.69495 12.3477 8.08446 12.2068C8.47397 12.0659 8.67549 11.6359 8.53458 11.2464L7.12405 11.7567ZM19.8758 12.1484C20.2331 11.9388 20.3528 11.4793 20.1432 11.122C19.9336 10.7648 19.474 10.6451 19.1168 10.8547L19.8758 12.1484ZM6.94331 18.8666L6.56375 18.2196L6.55627 18.2241L6.94331 18.8666ZM5.92408 18.8433L5.50815 19.4674H5.50815L5.92408 18.8433ZM5.51031 17.9116L4.80505 17.6564C4.78802 17.7035 4.77575 17.7521 4.76841 17.8016L5.51031 17.9116ZM8.53458 11.7567C8.67549 11.3672 8.47397 10.9372 8.08446 10.7963C7.69495 10.6554 7.26496 10.8569 7.12405 11.2464L8.53458 11.7567ZM19.4963 12.2516C19.9105 12.2516 20.2463 11.9158 20.2463 11.5016C20.2463 11.0873 19.9105 10.7516 19.4963 10.7516V12.2516ZM7.82931 10.7516C7.4151 10.7516 7.07931 11.0873 7.07931 11.5016C7.07931 11.9158 7.4151 12.2516 7.82931 12.2516V10.7516ZM19.8758 10.8547L7.32284 3.48968L6.56378 4.78344L19.1168 12.1484L19.8758 10.8547ZM7.33035 3.49414C6.76609 3.15419 6.05633 3.17038 5.50816 3.5357L6.34 4.78391C6.40506 4.74055 6.4893 4.73863 6.55627 4.77898L7.33035 3.49414ZM5.50816 3.5357C4.95998 3.90102 4.67184 4.54987 4.76841 5.20151L6.25221 4.98161C6.24075 4.90427 6.27494 4.82727 6.34 4.78391L5.50816 3.5357ZM4.80505 5.34671L7.12405 11.7567L8.53458 11.2464L6.21558 4.83641L4.80505 5.34671ZM19.1168 10.8547L6.56378 18.2197L7.32284 19.5134L19.8758 12.1484L19.1168 10.8547ZM6.55627 18.2241C6.4893 18.2645 6.40506 18.2626 6.34 18.2192L5.50815 19.4674C6.05633 19.8327 6.76609 19.8489 7.33035 19.509L6.55627 18.2241ZM6.34 18.2192C6.27494 18.1759 6.24075 18.0988 6.25221 18.0215L4.76841 17.8016C4.67184 18.4532 4.95998 19.1021 5.50815 19.4674L6.34 18.2192ZM6.21558 18.1667L8.53458 11.7567L7.12405 11.2464L4.80505 17.6564L6.21558 18.1667ZM19.4963 10.7516H7.82931V12.2516H19.4963V10.7516Z" stroke="#000000" stroke-width="0.0" stroke-linecap="round" stroke-linejoin="round"/>-->
        <!--    </symbol>-->
        <!--</svg>-->
    
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 1024 1024" id="svgchat">-->
        <!--        <title>icon-return</title>-->
        <!--        <path d="M160 826.88 273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z" stroke="#000000" stroke-width="0.0" stroke-linecap="round" stroke-linejoin="round"/>-->
        <!--        <path d="M352 512h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm0-192h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z" stroke="#000000" stroke-width="0.0" stroke-linecap="round" stroke-linejoin="round"/>-->
        <!--    </symbol>-->
        <!--</svg>-->
    
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgnotification" fill="none">
                <title>icon-notification</title>
                <path d="M6.31317 12.463C6.20006 9.29213 8.60976 6.6252 11.701 6.5C14.7923 6.6252 17.202 9.29213 17.0889 12.463C17.0889 13.78 18.4841 15.063 18.525 16.383C18.525 16.4017 18.525 16.4203 18.525 16.439C18.5552 17.2847 17.9124 17.9959 17.0879 18.029H13.9757C13.9786 18.677 13.7404 19.3018 13.3098 19.776C12.8957 20.2372 12.3123 20.4996 11.701 20.4996C11.0897 20.4996 10.5064 20.2372 10.0923 19.776C9.66161 19.3018 9.42346 18.677 9.42635 18.029H6.31317C5.48869 17.9959 4.84583 17.2847 4.87602 16.439C4.87602 16.4203 4.87602 16.4017 4.87602 16.383C4.91795 15.067 6.31317 13.781 6.31317 12.463Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 60 60" id="svgnotificationOn">
                <title>icon-notification</title>
                <!--<circle cx="11" cy="8" r="5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></circle>-->
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
            </symbol>
        </svg>
        
    </div>

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</body>
</html>
