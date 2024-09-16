

<?php
    
    session_start();
    
    if(time() > $_SESSION['timeout']) {
        echo "
        <html>
        <head>
            <link rel='stylesheet' href='./style/stylehome.css'>
        </head>
        <body>
        <div class='wrapper'>
        <div class='widget'>
        <div class='widgetWarning'>
            <p>
            خطأ في التحقق من هوية المستخدم !!
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
    
    
    if( isset($_SESSION['id']) )
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
        setcookie("userverifycode", $verifyCode);
        setcookie("userimageprofile", $imageProfile);
        
        setcookie("usernametype", $nameType);
        setcookie("usernamestatus", $nameStatus);
        
    }
    else
    {
        echo "Finish Session .. Not Permision Enter Pagee " . $_SESSION['id'];
        echo "<a href='https://www.tkameel.com/web/login'>Go To Login Page</a>";
        exit();
    }
    
    /*
    $token = md5(uniqid(rand(), true));
    echo "TOKEN: ".$token;
    $_SESSION['token2'] = $token;
    */
    
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/stylehome.css">
    <link rel="icon" href="./files/logo/icn_ar.png">
    <title>الرئيسية</title>
</head>
<body>

    <header>
        
        <div class="divheader">
            
            <div class="divlogo" align="center">
                <img id="imagelogo" class="imagelogo" src="https://www.tkameel.com/web/files/logo/logo_ar_light.png" />
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
                                    <img id="userimgmenu" src="https://www.tkameel.com/web/files/photoProfile/user_anonymous.png">
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

        <article id="divmain" class="divmain">

                <div class="widget widgetColumn widgetUser">
                    
                    <div class="widgetBody widgetFollowerBody">
                        
                        <div class="card cardList cardFollower">
                            <div class="header">
                                <h3>الأصدقاء</h3>
                                
                                <div>
                                    <a class="navbrowseusers" href="https://www.tkameel.com/web/browseusers">إستعراض الكل</a>
                                </div>
                                
                            </div>
                            <div class="body">
                                
                                <div id="containerListFollower" class="containerList">
                                    <ul id="listFollower" class="">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="widgetBody widgetSuggestionsBody">
                        
                        
                        <div class="card cardList cardFollower">
                            <div class="header">
                                <h3>إقتراحات الصداقة</h3>
                            </div>
                            
                            <div class="body">
                                
                                <div id="containerListSuggestions" class="containerList">
                                    <ul id="listSuggestions">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                    
                    
                </div>

                <div class="widget widgetColumn widgetChat">
                    
                    <div class="widgetHeader widgetChatHeader">
                        
                        <div class="containerTap">
                            
                            <div class="buttonHeader buttonPublic">
                                <label>عام</label>
                            </div>
                            
                            <div class="buttonHeader buttonMe">
                                <label>منشورات المتابعين</label>
                            </div>
                            
                        </div>
                        
                        <div class="containerPublish">
                            <div class="boxMessage">
                                <textarea id="inputPublish" name="inputPublish" class="inputs area" placeholder="ماذا تود القول" requred></textarea>
                                <span id="validContent" class="validation validContent"></span>
                            </div>
                            <div id="buttonPublish" class="buttons">نشر</div>
                        </div>
                        
                    </div>
                    
                    <div class="widgetBody widgetChatBody">
                        
                        <div class="card cardList cardFollower">
                        <div class="containerList">
                            <ul id="listPost" class="listPost">
                                <!--<li>A</li>-->
                                <!--<li>B</li>-->
                                <!--<li>C</li>-->
                            </ul>
                        </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div class="widget widgetColumn widgetProject">
                    
                    <div class="widgetBody widgetProjectBody">
                    
                        <div class="card cardList cardFollower">
                            <div class="header">
                                <h3>مشاريع مقترحة</h3>
                            </div>
                            
                            <div class="body">
                                
                                <div class="containerList">
                                    <ul id="listProject">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                
        </article>
        
        <footer>
            <div class="containerFooter">
                
                <div class="container containerTop">
                        
                        <div class="divlogo" align="center">
                            <img id="imagelogo" class="imagelogo" src="https://www.tkameel.com/web/files/logo/logo_ar_light.png" />
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
                                <img id="imagelogo" class="imagelogo" src="https://www.tkameel.com/web/files/logo/logo_F_White.png" />
                            </div>
                        </a>
                        
                        <a href="https://x.com/prog2023">
                            <div class="footerImageX" align="center">
                                <img id="imagelogo" class="imagelogo" src="https://www.tkameel.com/web/files/logo/logo_X_White.png" />
                            </div>
                        </a>
                    
            
                        
                    </div>
                    
                </div>
            </div>
        </footer>
        
        
        <div id="lightBox" class="lightBox close" onclick="clickBoxOut()">
            <div id="lightBoxCard" class="lightBoxCard" onclick="clickBox( event )">
                
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
            <symbol viewBox="-4 -4 30 30" id="svgaddfriend">
                <title>icon-accepte</title>
                <path d="M 19,14.25 A 0.75,0.75 0 0 0 18.25,15 v 1.25 H 17 A 0.75,0.75 0 0 0 16.25,17 0.75,0.75 0 0 0 17,17.75 h 1.25 V 19 A 0.75,0.75 0 0 0 19,19.75 0.75,0.75 0 0 0 19.75,19 V 17.75 H 21 A 0.75,0.75 0 0 0 21.75,17 0.75,0.75 0 0 0 21,16.25 H 19.75 V 15 A 0.75,0.75 0 0 0 19,14.25 Z"></path>
                <path d="m 10,12.25 c -4.2713191,0 -7.75,3.478681 -7.75,7.75 0,0.957614 0.7923861,1.75 1.75,1.75 H 15 A 0.75,0.75 0 0 0 15.75,21 0.75,0.75 0 0 0 15,20.25 H 4 C 3.8530455,20.25 3.75,20.146955 3.75,20 3.75,16.53934 6.5393403,13.75 10,13.75 h 2 a 0.750075,0.750075 0 0 0 0.002,0 c 0.603767,-0.0017 1.204775,0.08473 1.783203,0.257813 A 0.75,0.75 0 0 0 14.71875,13.505859 0.75,0.75 0 0 0 14.214844,12.572266 C 13.49619,12.35722 12.750129,12.248119 12,12.25 Z"></path>
                <path d="M 11,2.25 C 7.8332446,2.25 5.25,4.8332485 5.25,8 c 0,3.166751 2.5832446,5.75 5.75,5.75 3.166755,0 5.75,-2.583249 5.75,-5.75 0,-3.1667515 -2.583245,-5.75 -5.75,-5.75 z m 0,1.5 c 2.356098,0 4.25,1.8939095 4.25,4.25 0,2.35609 -1.893902,4.25 -4.25,4.25 C 8.6439024,12.25 6.75,10.35609 6.75,8 6.75,5.6439095 8.6439024,3.75 11,3.75 Z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-16 -16 64 64" id="svgoptions">
                <title>icon-options</title>
                <path d="M12.15 28.012v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.788 1.762-3.2 3.506-3.319 1.95-0.137 3.6 0.975 4.137 2.787 0.069 0.238 0.119 0.488 0.181 0.731v0.85c-0.019 0.056-0.050 0.106-0.056 0.169-0.269 1.65-1.456 2.906-3.081 3.262-0.125 0.025-0.25 0.063-0.375 0.094h-0.85c-0.056-0.019-0.113-0.050-0.169-0.056-1.625-0.262-2.862-1.419-3.237-3.025-0.037-0.156-0.081-0.3-0.119-0.444zM20.038 3.988l-0 0.85c-0.019 0.069-0.050 0.131-0.056 0.2-0.281 1.8-1.775 3.206-3.538 3.319-1.944 0.125-3.588-1-4.119-2.819-0.069-0.231-0.119-0.469-0.175-0.7v-0.85c0.019-0.056 0.050-0.106 0.063-0.162 0.3-1.625 1.244-2.688 2.819-3.194 0.206-0.069 0.425-0.106 0.637-0.162h0.85c0.056 0.019 0.113 0.050 0.169 0.056 1.631 0.269 2.863 1.419 3.238 3.025 0.038 0.15 0.075 0.294 0.113 0.437zM20.037 15.575v0.85c-0.019 0.069-0.050 0.131-0.063 0.2-0.281 1.794-1.831 3.238-3.581 3.313-1.969 0.087-3.637-1.1-4.106-2.931-0.050-0.194-0.094-0.387-0.137-0.581v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.794 1.831-3.238 3.581-3.319 1.969-0.094 3.637 1.1 4.106 2.931 0.050 0.2 0.094 0.394 0.137 0.588z"></path>
            </symbol>
        </svg>
        
        
        <svg display="none">
            <symbol viewBox="-16 -16 64 64" id="svglike2">
                <title>icon-like2</title>
                <path d="M21.886 5.115c3.521 0 6.376 2.855 6.376 6.376 0 1.809-0.754 3.439-1.964 4.6l-10.297 10.349-10.484-10.536c-1.1-1.146-1.778-2.699-1.778-4.413 0-3.522 2.855-6.376 6.376-6.376 2.652 0 4.925 1.62 5.886 3.924 0.961-2.304 3.234-3.924 5.886-3.924zM21.886 4.049c-2.345 0-4.499 1.089-5.886 2.884-1.386-1.795-3.54-2.884-5.886-2.884-4.104 0-7.442 3.339-7.442 7.442 0 1.928 0.737 3.758 2.075 5.152l11.253 11.309 11.053-11.108c1.46-1.402 2.275-3.308 2.275-5.352 0-4.104-3.339-7.442-7.442-7.442v0z" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round" ></path>
            </symbol>
        </svg>
            
        <svg display="none">
            <symbol viewBox="-12 -12 48 48" id="svgcomment">
                <title>icon-remove</title>
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z" stroke-width="2.4" stroke-linecap="round"></path>
            </symbol>
        </svg>
    
        <svg display="none">
            <symbol viewBox="-12 -12 48 48" id="svgretweet">
                <title>icon-retweet</title>
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.144"/>
                
                <g id="SVGRepo_iconCarrier">
                
                <path id="primary" d="M14,6H4A1,1,0,0,0,3,7V17a1,1,0,0,0,1,1H6" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width:2.4;"/>
                
                <path id="primary-2" data-name="primary" d="M10,18H20a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H18" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width:2.4;"/>
                
                <polyline id="primary-3" data-name="primary" points="12 4 14 6 12 8" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width:2.4;"/>
                
                <polyline id="primary-4" data-name="primary" points="12 20 10 18 12 16" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width:2.4;"/>
                
                </g>
                
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
        
        
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    <script type="module" src="./js/scripthome.js"></script>
    
    
</body>
</html>