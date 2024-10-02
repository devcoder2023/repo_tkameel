

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
    
    
    if( isset($_GET["codeuserprofile"])) {
        setcookie("codeuserprofile", $_GET["codeuserprofile"]);
    } else {
        setcookie("codeuserprofile", "", time() - 3600);
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
        setcookie("usercode", $code);
        setcookie("userfirstname", $firstName);
        setcookie("userlastname", $lastName);
        setcookie("useremail", $email);
        setcookie("userabout", $about);
        setcookie("usercodetype", $codeType);
        setcookie("usercodestatus", $codeStatus);
        // setcookie("userverifycode", $verifyCode);
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
    <link rel="stylesheet" href="../style/styleprofile.css">
    <link rel="icon" href="../files/logo/icn_ar.png">
    <script defer type="module" src="../js/scriptprofile.js"></script>
    <title>الملف الشخصي</title>
</head>
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
        
        <main ids="divmain" class="divmain">
            
            <div class="widget widgetOne">
                
                <div id="widgetOneHeader" class="widgetHeader widgetOneHeader">
                    <h3>معلومات عامة :</h3>
                    
                    <div id="containerButtonFollow" class="containerButtonFollow">
                        
                    </div>
                    
                </div>
                
                <div class="widgetBody widgetOneBody">
                    <!--<div class="inner">-->
                        
                        <div id="cardName" class="card cardName">
                            
                            <div class="body">
                                
                                <div class="userImage">
                                    <div class="containerImage">
                                        <img id="carduserimg" src="../files/photoProfile/user_anonymous.png">
                                    </div>
                                </div>
                                
                                <div id="containerName" class="containerName">
                                    <h3 id="cardusername">
                                        
                                    </h3>
                                    <div id="containerButtonEditName" class="containerButtonsHeader">
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <div id="cardAbout" class="card cardAbout">
                            
                            <div class="header">
                                <h3>عنّي : </h3>
                                <div id="containerButtonEditAbout" class="containerButtonsHeader">
                                    
                                </div>
                                
                            </div>
                            
                            <div class="body">
                                <p id="prographAbout" class="prographAbout">
                                    
                                </p>
                            </div>
                            
                        </div>
        
                        <div id="cardCount" class="card cardCount">
                            
                            <div class="header">
                                <h3>المشاريع والمشاركات</h3>
                            </div>
                            
                            <div id="displayCountProject" class="body displaynumber">
                                
                            </div>
                            
                        </div>
                        
                        <div id="cardMark" class="card cardMark">
                            
                            <div class="header">
                                <h3>التقييم</h3>
                            </div>
                            
                            <div id="displayMark" class="body displaynumber">
                                
                            </div>
                            
                        </div>
                        
                        <div id="cardContact" class="card cardOne cardContact cardList">
                    
                            <div class="header">
                                <h3>قنوات التواصل</h3>
                                <div id="containerButtonEditContact" class="containerButtonsHeader">
                                    
                                </div>
                            </div>
                            
                            <div id="containerContact" class="body">
                                
                                <div class="containerList">
                                    <ul id="listContact" class="listItem listCertificate">

                                        
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    
                    <!--</div>-->
                </div>
                
            </div>

            <div class="widget widgetTow">

                <div class="widgetHeader widgetTowHeader">
                    <h3>المؤهلات :</h3>
                </div>

                <div class="widgetBody widgetTowBody grid">
                    <!--<div class="inner">-->
                        
                        <div id="cardCertificate" class=" card cardList cardCertificate">
                            
                            <div class="header">
                                <h3>الشهادات</h3>
                                <div id="containerButtonEditCertificate" class="containerButtonsHeader">
                                    
                                </div>
                            </div>

                            <div id="containerCertificates" class="body">
                                
                                <div class="containerList">
                                    <ul id="listCertificate" class="listItem listCertificate">
                                        
                                    </ul>
                                </div>


                            </div>

                        </div>

                        <div id="cardExperience" class="card cardList cardCourse">
                            
                            <div class="header">
                                <h3>الخبرات</h3>
                                <div id="containerButtonEditExperience" class="containerButtonsHeader">
                                    
                                </div>
                            </div>
                            
                            <div id="containerExperience" class="body">

                                <div class="containerList">
                                    <ul id="listExperience" class="listItem listExperience">
                                        
                                    </ul>
                                </div>
                                

                            </div>

                        </div>

                        <div id="cardSkill" class="card cardList">
                            
                            <div class="header">
                                <h3>المهارات</h3>
                                <div id="containerButtonEditSkill" class="containerButtonsHeader">
                                    
                                </div>
                            </div>
                            
                            <div id="containerSkill" class="body">
                            
                                <div class="containerList">
                                    <ul id="listSkill" class="listItem listSkill">
                                        
                                    </ul>
                                </div>


                            </div>

                        </div>

                    <!--</div>-->
                </div>

            </div>
            
            <div class="widget widgetThree">
                
                <div class="widgetHeader widgetThreeHeader">
                    <h3> الأنشطة الحالية :</h3>
                </div>
                
                <div class="widgetBody widgetThreeBody">
                    
                    <div id="cardProjectMy" class="card cardList cardProjectMy">
                        <div class="header">
                            <h3>مشاريعي :</h3>
                        </div>
                        
                        <div class="body">
                            <div id="navMyRight" class="navigation">
                                
                                <div class="divsvg circle">
                                    <svg class="svgfill">
                                        <use xlink:href="#svgnavR"/>
                                    </svg>
                                </div>
                                
                            </div>
                            
                            <div id="containerListRowMy" class="containerListRow">
                                
                            </div>
                            
                            <div id="navMyLeft" class="navigation">
                                
                                <div class="divsvg circle">
                                    <svg class="svgfill">
                                        <use xlink:href="#svgnavL"/>
                                    </svg>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div id="cardProjectJoin" class="card cardList cardProjectJoin">
                        <div class="header">
                            <h3>المشاريع التي شارك بها :</h3>
                        </div>
                        <div class="body">
                            <div id="navJoinRight" class="navigation">
                                
                                <div class="divsvg circle">
                                    <svg class="svgfill">
                                        <use xlink:href="#svgnavR"/>
                                    </svg>
                                </div>
                                
                            </div>
                            
                            <div id="containerListRowJoin" class="containerListRow">
                                
                            </div>
                            
                            <div id="navJoinLeft" class="navigation">
                                
                                <div class="divsvg circle">
                                    <svg class="svgfill">
                                        <use xlink:href="#svgnavL"/>
                                    </svg>
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
            <symbol viewBox="-8 -8 38 38" id="svgadd">
                <title>icon-remove</title>
                <path d="m 11.939207,20.325731 a 1.3010526,1.3010526 0 0 1 -2.6000684,8.93e-4 V 13.309743 H 2.3222574 a 1.3010526,1.3010526 0 1 1 8.932e-4,-2.600069 H 9.3400317 L 9.3382417,3.6945792 A 1.3010526,1.3010526 0 1 1 11.938314,3.693686 l 8.93e-4,7.015988 h 7.016882 a 1.3010526,1.3010526 0 0 1 -8.94e-4,2.600069 l -7.015988,-8.93e-4 z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-8.5 -6 30 30" id="svgremove">
                <title>icon-remove</title>
                <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"></path>
            </symbol>
        </svg>

        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgedit">
                <title>icon-edit</title>
                <path d="m 17.671875,3.3183594 c -0.410738,0 -0.822909,0.1549165 -1.132813,0.4648437 L 15.125,5.1972656 8.2109375,12.111328 C 7.8480295,12.474249 7.6006558,12.938192 7.5,13.441406 l -0.5878906,2.941406 a 0.60006002,0.60006002 0 0 0 0.7050781,0.705079 L 10.558594,16.5 c 0.503221,-0.100722 0.96715,-0.34801 1.330078,-0.710937 l 6.914062,-6.9160161 1.414063,-1.4140625 c 0.619787,-0.6198189 0.619787,-1.6418999 0,-2.2617188 L 18.802734,3.7832031 C 18.492831,3.4732759 18.082613,3.3183594 17.671875,3.3183594 Z m -0.283203,1.3125 c 0.161192,-0.1612048 0.405214,-0.1612048 0.566406,0 l 1.414063,1.4140625 c 0.161212,0.1612203 0.161212,0.4051859 0,0.5664062 L 18.378906,7.6015625 16.398437,5.6210937 Z M 15.550781,6.46875 17.53125,8.4492188 11.039063,14.941406 c -0.195472,0.195472 -0.443666,0.328535 -0.714844,0.382813 l -2.0605471,0.412109 0.4121094,-2.060547 c 0.054204,-0.270985 0.187341,-0.519365 0.3828125,-0.714843 z" ></path>
                <path d="M 5,19.400391 A 0.60000002,0.60000002 0 0 0 4.4003906,20 0.60000002,0.60000002 0 0 0 5,20.599609 H 19 A 0.60000002,0.60000002 0 0 0 19.599609,20 0.60000002,0.60000002 0 0 0 19,19.400391 Z"></path>
            </symbol>
        </svg>
        
        
        
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgwebsite">
                <title>icon-website2</title>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgemail">
                <title>icon-email</title>
                <path d="M 3.8945313,6.2578125 A 0.75,0.75 0 0 0 3.4003906,6.5507812 0.75,0.75 0 0 0 3.5507813,7.5996094 L 9.75,12.25 c 1.330679,0.997978 3.169321,0.997978 4.5,0 l 6.199219,-4.6503906 a 0.75,0.75 0 0 0 0.15039,-1.0488282 0.75,0.75 0 0 0 -1.048828,-0.1503906 l -6.201172,4.6503904 c -0.802718,0.602021 -1.8965,0.602021 -2.699218,0 L 4.4492187,6.4003906 A 0.75,0.75 0 0 0 3.8945313,6.2578125 Z"></path>
                <path d="M 5,4.25 C 3.4894744,4.25 2.25,5.4894744 2.25,7 v 10 c 0,1.510526 1.2394744,2.75 2.75,2.75 h 14 c 1.510526,0 2.75,-1.239474 2.75,-2.75 V 7 C 21.75,5.4894744 20.510526,4.25 19,4.25 Z m 0,1.5 h 14 c 0.705472,0 1.25,0.5445278 1.25,1.25 v 10 c 0,0.705472 -0.544528,1.25 -1.25,1.25 H 5 C 4.2945278,18.25 3.75,17.705472 3.75,17 V 7 C 3.75,6.2945278 4.2945278,5.75 5,5.75 Z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgphone">
                <title>icon-phone</title>
                <path d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V3C15 3.55228 14.5523 4 14 4H10C9.44772 4 9 3.55228 9 3V2Z" ></path>
                <path d="M 9,18.75 A 0.75,0.75 0 0 0 8.25,19.5 0.75,0.75 0 0 0 9,20.25 h 6 A 0.75,0.75 0 0 0 15.75,19.5 0.75,0.75 0 0 0 15,18.75 Z" ></path>
                <path d="M 7.5,1 C 6.1279743,1 5,2.1279743 5,3.5 v 17 C 5,21.872026 6.1279743,23 7.5,23 h 9 C 17.872026,23 19,21.872026 19,20.5 V 3.5 C 19,2.1279743 17.872026,1 16.5,1 Z m 0,1.5 h 9 c 0.566972,0 1,0.4330276 1,1 v 17 c 0,0.566972 -0.433028,1 -1,1 h -9 c -0.5669724,0 -1,-0.433028 -1,-1 v -17 c 0,-0.5669724 0.4330276,-1 1,-1 z"/>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svglink">
                <title>icon-link</title>
                <path d="M14.5454 9.95475C14.2525 9.66186 13.7776 9.66188 13.4847 9.95478C13.1919 10.2477 13.1919 10.7226 13.4848 11.0154L14.5454 9.95475ZM14.0151 15.0291L13.4848 14.4987L13.4848 14.4988L14.0151 15.0291ZM10.9851 18.0591L11.5154 18.5894L10.9851 18.0591ZM6.44109 13.5151L6.97142 14.0454H6.97142L6.44109 13.5151ZM8.48642 12.5304C8.77932 12.2375 8.77932 11.7627 8.48642 11.4698C8.19353 11.1769 7.71866 11.1769 7.42576 11.4698L8.48642 12.5304ZM10.4548 14.0454C10.7477 14.3383 11.2226 14.3383 11.5154 14.0454C11.8083 13.7525 11.8083 13.2776 11.5154 12.9847L10.4548 14.0454ZM10.9851 8.97109L11.5154 9.50144L11.5154 9.50142L10.9851 8.97109ZM14.0151 5.94109L14.5454 6.47142L14.0151 5.94109ZM18.5591 5.94109L18.0288 6.47142V6.47142L18.5591 5.94109ZM18.5591 10.4851L19.0894 11.0154L18.5591 10.4851ZM16.5138 11.4698C16.2209 11.7627 16.2209 12.2375 16.5138 12.5304C16.8067 12.8233 17.2815 12.8233 17.5744 12.5304L16.5138 11.4698ZM13.4848 11.0154C13.9467 11.4773 14.2062 12.1038 14.2062 12.7571H15.7062C15.7062 11.706 15.2887 10.698 14.5454 9.95475L13.4848 11.0154ZM14.2062 12.7571C14.2062 13.4103 13.9467 14.0368 13.4848 14.4987L14.5454 15.5594C15.2887 14.8162 15.7062 13.8082 15.7062 12.7571H14.2062ZM13.4848 14.4988L10.4548 17.5288L11.5154 18.5894L14.5454 15.5594L13.4848 14.4988ZM10.4548 17.5288C9.49287 18.4907 7.93332 18.4907 6.97142 17.5288L5.91076 18.5894C7.45845 20.1371 9.96774 20.1371 11.5154 18.5894L10.4548 17.5288ZM6.97142 17.5288C6.00953 16.5669 6.00953 15.0073 6.97142 14.0454L5.91076 12.9848C4.36308 14.5324 4.36308 17.0417 5.91076 18.5894L6.97142 17.5288ZM6.97142 14.0454L8.48642 12.5304L7.42576 11.4698L5.91076 12.9848L6.97142 14.0454ZM11.5154 12.9847C11.0535 12.5228 10.794 11.8963 10.794 11.2431H9.29396C9.29396 12.2942 9.71152 13.3022 10.4548 14.0454L11.5154 12.9847ZM10.794 11.2431C10.794 10.5898 11.0535 9.96335 11.5154 9.50144L10.4548 8.44075C9.71152 9.18396 9.29396 10.192 9.29396 11.2431H10.794ZM11.5154 9.50142L14.5454 6.47142L13.4848 5.41076L10.4548 8.44076L11.5154 9.50142ZM14.5454 6.47142C15.5073 5.50953 17.0669 5.50953 18.0288 6.47142L19.0894 5.41076C17.5417 3.86308 15.0324 3.86308 13.4848 5.41076L14.5454 6.47142ZM18.0288 6.47142C18.9907 7.43332 18.9907 8.99287 18.0288 9.95476L19.0894 11.0154C20.6371 9.46774 20.6371 6.95845 19.0894 5.41076L18.0288 6.47142ZM18.0288 9.95476L16.5138 11.4698L17.5744 12.5304L19.0894 11.0154L18.0288 9.95476Z" fill="#000000"></path>
            </symbol>
        </svg>
        
        
        
        
        
        <svg display="none">
            <symbol viewBox="-8 -8 40 40" id="svgviews">
                <title>icon-views</title>
                <path d="M12,21c-5,0-8.8-2.8-11.8-8.5L0,12l0.2-0.5C3.2,5.8,7,3,12,3s8.8,2.8,11.8,8.5L24,12l-0.2,0.5C20.8,18.2,17,21,12,21z
                M2.3,12c2.5,4.7,5.7,7,9.7,7s7.2-2.3,9.7-7C19.2,7.3,16,5,12,5S4.8,7.3,2.3,12z"></path>
                <path d="M12,17c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S14.8,17,12,17z M12,9c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S13.7,9,12,9z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgmoving">
                <title>icon-moving</title>
                <path d="M4 12H20M4 12L8 8M4 12L8 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        
        
        <svg display="none">
            <symbol viewBox="-4 -4 32 32" id="svgnavR">
                <title>icon-moving</title>
                <path d="m 6.9482977,2.0019531 a -1,1 0 0 1 0.720703,0.2539063 L 17.670954,11.259766 a -1.0001,1.0001 0 0 1 0,1.486328 L 7.6690007,21.748047 a -1,1 0 0 1 -1.41211,-0.07422 -1,1 0 0 1 0.07422,-1.412109 L 15.504938,12.003906 6.3311097,3.7441406 a -1,1 0 0 1 -0.07422,-1.4140625 -1,1 0 0 1 0.691408,-0.328125 z"></path>
                
            </symbol>
        </svg>
        <svg display="none">
            <symbol viewBox="-4 -4 32 32" id="svgnavL">
                <title>icon-moving</title>
                <path d="M 17.052734,2.0019531 A 1,1 0 0 0 16.332031,2.2558594 L 6.3300781,11.259766 a 1.0001,1.0001 0 0 0 0,1.486328 l 10.0019529,9.001953 a 1,1 0 0 0 1.41211,-0.07422 1,1 0 0 0 -0.07422,-1.412109 L 8.4960938,12.003906 17.669922,3.7441406 a 1,1 0 0 0 0.07422,-1.4140625 1,1 0 0 0 -0.691407,-0.328125 z"></path>
                
            </symbol>
        </svg>
        
        
        
        
        
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</body>
</html>





