

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
    
    
    if( isset($_SESSION["id"]) )
    {
        $id = $_SESSION['id'] ;
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
    <link rel="stylesheet" href="style/stylenew.css">
    <link rel="icon" href="./files/logo/icn_ar.png">
    <title>إنشاء مشروع</title>
</head>
<body>

    <header>

        <div class="divheader">
            
            <div class="divlogo" align="center">
                <img id="imagelogo" class="imagelogo" src="./files/logo/logo_ar_light.png" />
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
                                    <img id="userimgmenu" src="./files/photoProfile/user_anonymous.png">
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

        
    <div id="wrapper" class="wrapper wrappernew">

        <main id="divmain" class="divmain">
            
            <div class="widget widgetNew">

                <div class="widgetHeader widgetNewHeader">
                    <h3>بيانات المشروع :</h3>
                </div>

                <div class="widgetBody widgetNewBody">
                    <div class="inner">

                        <div class="containerfiled containerfiledname">

                            <label>اسم المشروع :</label>
                            <input type="text" id="inputName" class="inputs" placeholder="الاسم" maxlength="25">
                            <span id="validName" class="validation validName"></span>
                            
                        </div>

                        <div class="containerfiled containerfiledcategory">

                            <label>التصنيف :</label>
                            <!-- <input type="text" class="inputs" placeholder="تصنيف المشروع"> -->
                            <div class="continerselect">
                                <select id="selectcategory" name="categoryproject" class="selectbox selectCategory" required>
                                    <option value="0">اختر التصنيف</option>
                                </select>
                                <div class="divsvg">
                                    <svg id="divsvgdown" class="svgstroke">
                                        <use xlink:href="#svgdown"/>
                                    </svg>
                                </div>
                            </div>
                            <span id="validCategory" class="validation validCategory"></span>
                            
                        </div>

                        <div class="containerfiled containerfiledtype">

                            <label>نوعه :</label>
                            <!-- <input type="text" class="inputs" placeholder="نوع المشروع"> -->
                            <div class="continerselect">
                                <select id="selecttype" name="typeproject" class="selectbox selectType" required>
                                    <option value="0">اختر نوع المشروع</option>
                                </select>
                                <div class="divsvg">
                                    <svg id="divsvgdown" class="svgstroke">
                                        <use xlink:href="#svgdown"/>
                                    </svg>
                                </div>
                            </div>
                            <span id="validType" class="validation validType"></span>

                        </div>

                        <div class="containerfiled containerfileddescription">

                            <label>الوصف :</label>
                            <!--<input type="text" id="inputDescription" class="inputs" placeholder="وصف مختصر للمشروع" maxlength="150">-->
                            <textarea id="inputDescription" class="inputs area" placeholder="وصف مختصر للمشروع" requred></textarea>
                            <span id="validDescription" class="validation validDescription"></span>
                            
                        </div>
                        
                        <div class="containerfiled containerfiledgoals">

                            <label>الأهداف :</label>
                            <!--<input type="text" id="inputGoals" class="inputs" placeholder="أهداف المشروع" maxlength="150">-->
                            <textarea id="inputGoals" class="inputs area" placeholder="أهداف المشروع" requred></textarea>
                            <span id="validGoals" class="validation validGoals"></span>
                            
                        </div>
            
                        <div class="containerfiled containerfiledimage">
                            <label>ملف الصورة:</label>
                            
                            <div class="containerinputimg">
                                <input type="file" id="fieldimage" class="inputs file" name="imageProfile">
                                
                                <div class="divsvg">
                                    <svg id="divsvgfileimage" class="svgfill svglight">
                                        <use xlink:href="#svgfileimage"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <span id="validImage" class="validation validImage"></span>
                        </div>

                    </div>
                </div>

                <div class="conrainerNewButton">
                    
                    <div id="buttonCreate" class="buttons btnCreate">إنشاء</div>

                </div>

            </div>
            
        </main>
        
        <footer>
            <div class="containerFooter">
                
                <div class="container containerTop">
                        
                        <div class="divlogo" align="center">
                            <img id="imagelogo" class="imagelogo" src="./files/logo/logo_ar_light.png" />
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
                                <img id="imagelogo" class="imagelogo" src="./files/logo/logo_F_White.png" />
                            </div>
                        </a>
                        
                        <a href="https://x.com/devcoder2023">
                            <div class="footerImageX" align="center">
                                <img id="imagelogo" class="imagelogo" src="./files/logo/logo_X_White.png" />
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
            <symbol viewBox="-4 -4 32 32" id="svgfileimage">
                <title>icon-img</title>
                <path d="M21 3H3C1.35 3 0 4.35 0 6v12c0 1.55 1.19 2.83 2.7 2.98.1.01.2.02.3.02h18c.1 0 .2 0 .29-.02.03 0 .06-.01.09-.01C22.86 20.78 24 19.52 24 18V6c0-1.65-1.35-3-3-3zm1 13.53l-2.21-4.42c-.25-.5-.69-.87-1.22-1.03-.19-.05-.38-.08-.57-.08-.35 0-.7.09-1.01.27l-6.41 3.74-2.46-1.67C7.78 13.11 7.39 13 7 13c-.52 0-1.03.2-1.41.59L2 17.18V6c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v10.53z"></path>
                <path d="m 13,10 a 2,2 0 0 1 -2,2 2,2 0 0 1 -2,-2 2,2 0 0 1 2,-2 2,2 0 0 1 2,2 z"></path>
            </symbol>
        </svg>
        
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <script type="module" src="./js/scriptnew.js"></script>
</body>
</html>
