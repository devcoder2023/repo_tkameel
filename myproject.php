

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
    <link rel="stylesheet" href="../style/stylemyproject.css">
    <link rel="icon" href="./files/logo/icn_ar.png">
    <title>إدارة المشروع</title>
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
            
            <div class="widget widgetView">
                
                
                <div class="widgetHeader widgetViewHeader">
                    <h3>تفاصيل المشروع :</h3>
                    
                    <!--<div class="containerButtonAndSwitch">-->
                    <div class="containerButtonsWidgetHeader">
                        
                        <div class="containerVisitorProject">
                            <label>عدد الزيارات :</label>
                            <h3 id="visitorProject">
                                
                            </h3>
                        </div>
                        
                        <div class="containerSwitchStatusProject">
                            <label>طلب الإنضمام :</label>
                            <div id="switchProjectStatus" class="containerSwitch waitting" data-status="0">
                                <div id="buttonSwitch" class="buttonSwitch">
                                    ...
                                </div>
                            </div>
                            
                        </div>
                        
                        <div id="buttonGoToLive" class="buttons">
                         المساحة العامة
                        </div>
                        
                    </div>

                    
                </div>
                
                

                <div class="widgetBody widgetViewBody">
                    
                    <div class="containerDetailes">
                            
                        <div class="inner">
    
                            <div id="griddetailes" class="griddetailes">
    
                                <div class="card cardDetailsText">
                                    <div class="header">
                                        <label>اسم المشروع :</label>
                                        
                                        <!--<div id="buttonEditName" class="buttons icon elaveted hide">-->
                                            
                                            <div id="buttonEditName" class="divsvg elaveted hide">
                                                <svg class="svgfill hilight">
                                                    <use xlink:href="#svgedit"/>
                                                </svg>
                                            </div>
                                            
                                        <!--</div>-->
                                        
                                    </div>
                                    
                                    <div class="body">
                                        <h3 id="projectname"></h3>
                                    </div>
                                    
                                </div>
                                <div class="card cardDetailsText">
                                    <div class="header">
                                        <label>تصنيف المشروع :</label>
                                        
                                        <!--<div id="buttonEditCategory" class="buttons icon elaveted hide">-->
                                            
                                            <div id="buttonEditCategory" class="divsvg elaveted hide">
                                                <svg class="svgfill hilight">
                                                    <use xlink:href="#svgedit"/>
                                                </svg>
                                            </div>
                                        <!--</div>-->
                                    </div>
                                    
                                    <div class="body">
                                        <h3 id="projectcategory"></h3>
                                    </div>
                                    
                                </div>
                                <div class="card cardDetailsText">
                                        <div class="header">
                                        <label>نوع المشروع :</label>
                                        
                                        <!--<div id="buttonEditType" class="buttons icon elaveted hide">-->
                                            
                                            <div id="buttonEditType" class="divsvg elaveted hide">
                                                <svg class="svgfill hilight">
                                                    <use xlink:href="#svgedit"/>
                                                </svg>
                                            </div>
                                            
                                        <!--</div>-->
                                    </div>
                                    
                                    <div class="body">
                                        <h3 id="projecttype"></h3>
                                    </div>
                                    
                                </div>
                                
                                <div class="card cardDetailsImage">
                                    <div class="header">
                                        <img src="https://www.tkameel.com/web/files/images/boarding/boarding1.png">
                                    </div>
                                    <div class="body">
                                        
                                        <!--<div id="buttonEditDescription" class="buttons icon elaveted hide">-->
                                            
                                            <div id="buttonEditDescription" class="divsvg elaveted hide">
                                                <svg class="svgfill hilight hide">
                                                    <use xlink:href="#svgedit"/>
                                                </svg>
                                            </div>
                                        
                                        <!--</div>-->
                                        
                                        <p id="projectdescription">
                                            
                                        </p>
                                        
                                    </div>
                                </div>
                                <div class="card cardDetailsImage">
                                    <div class="header">
                                        <img src="https://www.tkameel.com/web/files/images/boarding/boarding2.png">
                                    </div>
                                    <div class="body">
                                        
                                        <!--<div id="buttonEditGoals" class="buttons icon elaveted hide">-->
                                            
                                            <div id="buttonEditGoals" class="divsvg elaveted hide">
                                                <svg class="svgfill hilight hide">
                                                    <use xlink:href="#svgedit"/>
                                                </svg>
                                            </div>
                                            
                                        <!--</div>-->
                                        
                                        <p id="projectgoals">
                                            
                                        </p>
                                        
                                    </div>
                                </div>
                                <!--<div class="card cardDetailsImage">-->
                                <!--    <div class="header">-->
                                <!--        <img src="https://www.tkameel.com/web/files/images/boarding/boarding3.png">-->
                                <!--    </div>-->
                                <!--    <div class="body">-->
                                        
                                <!--        <p id="prographSkills"></p>-->
                                        
                                <!--    </div>-->
                                <!--</div>-->
                                
                            </div>
                            
                        </div>
                        
                    </div>
            
                    <div class="containerSkills">
                        
                        <div id="cardSkill" class="card cardList cardDetailsList cardSkill">
                            <div class="header">
                                
                                <h3>المهارات المطلوبة :</h3>
                                
                                <div class="containerButtonsWidgetHeader">
                                    
                                    <div id="btnAddSkill" class="buttons btnAdd icon">
                                        <div id="" class="divsvg">
                                            <svg class="svgfill">
                                                <use xlink:href="#svgadd"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div id="buttonViewDirect" class="buttons neg free">
                                    التوجيهات
                                        <div id="" class="divsvg">
                                            <svg class="svgfill">
                                                <use xlink:href="#svgnavL"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="body">
                                
                                <div class="containerList">
                                    <ul id="listSkill" class="listItem listSkill">
                                        
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                        <div id="cardDirect" class="card cardList cardDirect hide">
                            
                            <div class="header">
                                
                                <h3> التوجيهات:</h3>
                                
                                <div class="containerButtonsWidgetHeader">
                                    
                                    <div id="btnAddDirect" class="buttons btnAdd icon">
                                        <div id="" class="divsvg">
                                            <svg class="svgfill">
                                                <use xlink:href="#svgdirect"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <!--<div id="buttonViewSkill" class="buttons neg">-->
                                    <!--المهارات-->
                                    <!--</div>-->
                                    
                                    <div id="buttonViewSkill" class="buttons neg free">
                                    المهارات
                                        <div id="" class="divsvg">
                                            <svg class="svgfill">
                                                <use xlink:href="#svgnavL"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                </div>
                                
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
                

            </div>
            
            <div class="widget widgetDashboard">
                
                <div class="widgetHeader widgetDashboardHeader">
                    
                    <h3>لوحة المعلومات :</h3>
                    
                </div>
                
                <div class="widgetBody widgetDashboardBody">
                    
                    <div class="card cardBoard cardBoardStatus">
                        
                        <div id="containerChartStatusPie" class="containerChart">
                            <div class="header">
                                    <h2>
                                        تقدم المهام
                                    </h2>
                                </div>
                            <div class="body">
                                <canvas id="canvasBoardStatusPie" width="200px" height="160px"></canvas>
                            </div>
                            <div class="footer">
                                <h6>
                                    
                                </h6>
                            </div>
                        </div>
                        
                        <div id="containerChartStatusColumn" class="containerChart hide">
                            <div class="header">
                                    <h2>
                                        تقدم المهام
                                    </h2>
                                </div>
                            <div class="body">
                                <canvas id="canvasBoardStatusColumn" width="200px" height="160px"></canvas>
                            </div>
                            <div class="footer">
                                <h6>
                                    A - B - C - D - E
                                </h6>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="card cardBoard cardBoardMembers">
                        
                        <div id="containerChartMemberPie" class="containerChart">
                            <div class="header">
                                    <h2>
                                        أنواع الأعضاء
                                    </h2>
                                </div>
                            <div class="body">
                                <canvas id="canvasBoardMembers" width="200px" height="160px"></canvas>
                            </div>
                            <div class="footer">
                                <h6>
                                    
                                </h6>
                            </div>
                        </div>
                        
                    </div>
                    
                    <!--<div class="card cardBoard cardBoardMembers2">-->
                        
                    <!--    <div id="containerChart" class="containerChart">-->
                    <!--        <div class="header">-->
                    <!--                <h2>-->
                    <!--                    أنواع الأعضاء-->
                    <!--                </h2>-->
                    <!--            </div>-->
                    <!--        <div class="body">-->
                    <!--            <canvas id="canvasBoardMembers2" width="200px" height="160px"></canvas>-->
                    <!--        </div>-->
                    <!--        <div class="footer">-->
                    <!--            <h6>-->
                    <!--                A - B - C - D - E-->
                    <!--            </h6>-->
                    <!--        </div>-->
                    <!--    </div>-->
                        
                    <!--</div>-->
                </div>
                
            </div>
            
            <div class="widget widgetMembers">
            
                <div class="widgetHeader widgetMembersHeader">
                    <h3>إدارة الطلبات والأعضاء :</h3>
                </div>
                
                
                <div class="widgetBody widgetMembersBody">
                
                    <div class="card cardList cardMemberRequest">
                        <div class="header">
                            <h3>الطلبات :</h3>
                            
                            <div class="containerButtonsWidgetHeader">
                                
                                
                                <div class="continerselect">
                                    <select id="selectMemberSkillAll" name="selectMember" class="selectbox selectSkill" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                <div class="continerselect">
                                    <select id="selectMemberStatus" name="selectMemberStatus" class="selectbox selectTaskStatus" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listMemberAll" class="listItem listMemberAll">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                
                    <div class="card cardList cardMemberFilter">
                        <div class="header">
                            <h3>المرشحين :</h3>
                            
                            <div class="containerButtonsWidgetHeader">
                                
                                
                                <div class="continerselect">
                                    <select id="selectMemberSkillFilter" name="selectMember" class="selectbox selectSkill" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listMemberFilter" class="listItem listMemberFilter ">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                
                    <div class="card cardList cardMemberAccepted">
                        <div class="header">
                            <h3>المقبولين :</h3>
                            
                            <div class="containerButtonsWidgetHeader">
                                
                            
                                <div id="buttonEvaluation" class="divsvg">
                                    <svg class="svgfill">
                                        <use xlink:href="#svgstarthalf"/>
                                    </svg>
                                </div>
                                
                                <div class="continerselect">
                                    <select id="selectMemberSkillDone" name="selectMember" class="selectbox selectSkill" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listMemberDone" class="listItem listMemberDone ">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                
                
                </div>
                    
                    
            </div>

            <div class="widget widgetTask">
                
                <div class="widgetHeader widgetTaskHeader">
                    <h3>إدارة المهام :</h3>
                    
                </div>
                
                <div class="widgetBody widgetTaskBody">
                    
                    <div class="card cardList cardDetailsList bodyTaskAll">
                        <div class="header">
                            <h3>الكل :</h3>
                            
                            <div class="containerButtonsWidgetHeader">
                                
                                
                                <div class="continerselect">
                                    <select id="selectTaskSkillAll" name="selectSkill" class="selectbox selectSkill" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                <div class="continerselect">
                                    <select id="selectTaskStatus" name="selectTaskStatus" class="selectbox selectTaskStatus" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listTaskAll" class="containerListTaskAll">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                    <div class="card cardList cardDetailsList bodyTaskFilter">
                        <div class="header">
                            <h3>بالإنتظار:</h3>
                            
                            <div class="containerButtonsWidgetHeader">
                                
                                
                                <div class="continerselect">
                                    <select id="selectTaskSkillFilter" name="selectSkill" class="selectbox selectSkill" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listTaskFilter" class="containerListTaskFilter">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                    <div class="card cardList cardDetailsList bodyTaskDone">
                        <div class="header">
                            <h3>المكتملة :</h3>
                            
                            <div class="containerButtonsWidgetHeader">
                                
                                
                                <div class="continerselect">
                                    <select id="selectTaskSkillDone" name="selectSkill" class="selectbox selectSkill" required>
                                        <option value="0">الكل</option>
                                    </select>
                                    <div class="divsvg">
                                        <svg id="divsvgdown" class="svgstroke">
                                            <use xlink:href="#svgdown"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div class="body">
                            
                            <div class="containerList">
                                <ul id="listTaskDone" class="containerListTaskDone">
                                    
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
            
            <div class="widget widgetBottom">
                
                
                <div class="widgetHeader widgetBottomHeader">
                    
                    <div class="containerButtonsWidgetHeader">
                        
                        <div id="buttonFinishProject" class="buttons finish">
                         إنتهاء المشروع
                        </div>
                        
                        <div id="buttonDeleteProject" class="buttons delete">
                         حذف المشروع
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
            <symbol viewBox="-8 -8 38 38" id="svgadd">
                <title>icon-remove</title>
                <path d="m 11.939207,20.325731 a 1.3010526,1.3010526 0 0 1 -2.6000684,8.93e-4 V 13.309743 H 2.3222574 a 1.3010526,1.3010526 0 1 1 8.932e-4,-2.600069 H 9.3400317 L 9.3382417,3.6945792 A 1.3010526,1.3010526 0 1 1 11.938314,3.693686 l 8.93e-4,7.015988 h 7.016882 a 1.3010526,1.3010526 0 0 1 -8.94e-4,2.600069 l -7.015988,-8.93e-4 z"></path>
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
        
        <svg display="none">
            <symbol viewBox="-8.5 -6 30 30" id="svgremove">
                <title>icon-remove</title>
                <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgdown">
                <title>icon-down</title>
                <path d="M7 10L12 15L17 10"></path>
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
            <symbol viewBox="-4 -4 30 30" id="svgaccepte">
                <title>icon-accepte2</title>
                <path d="M 651.88867 178.125 A 33.333333 33.333333 0 0 0 628.32031 187.89062 L 298.30664 517.83789 L 156.90039 376.43164 A 33.333333 33.333333 0 0 0 109.76562 376.43164 A 33.333333 33.333333 0 0 0 109.76562 423.56836 L 274.74023 588.54102 A 33.336667 33.336667 0 0 0 321.875 588.54102 L 675.45508 235.02539 A 33.333333 33.333333 0 0 0 675.45508 187.89062 A 33.333333 33.333333 0 0 0 651.88867 178.125 z " transform="scale(0.03)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-3 -3 30 30" id="svgignore">
                <title>icon-ignore-2</title>
                <path d="m 12,2.25 c -5.3758852,0 -9.75,4.3741148 -9.75,9.75 0,5.375922 4.3741188,9.75 9.75,9.75 5.375918,0 9.75,-4.374082 9.75,-9.75 0,-5.3758812 -4.374078,-9.75 -9.75,-9.75 z m 0,1.5 c 4.565268,0 8.25,3.6847711 8.25,8.25 0,4.565272 -3.684728,8.25 -8.25,8.25 C 7.4347711,20.25 3.75,16.565268 3.75,12 3.75,7.4347752 7.4347752,3.75 12,3.75 Z M 9,8.25 A 0.75,0.75 0 0 0 8.46875,8.46875 0.75,0.75 0 0 0 8.25,9 v 4 A 0.75,0.75 0 0 0 9,13.75 0.75,0.75 0 0 0 9.75,13 v -2.1875 l 4.71875,4.71875 a 0.75,0.75 0 0 0 1.0625,0 0.75,0.75 0 0 0 0,-1.0625 L 10.8125,9.75 H 13 A 0.75,0.75 0 0 0 13.75,9 0.75,0.75 0 0 0 13,8.25 Z"></path>
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
            <symbol viewBox="-16 -16 80 80" id="svgreturn">
                <title>icon-return</title>
                <path d="m 36.302242,6.4824219 6.998047,6.0000001 a -2.0002,2.0002 0 0 1 0.113282,2.931641 l -7.000001,6.999999 a -2,2 0 0 1 -2.828125,0 -2,2 0 0 1 0,-2.828125 l 5.47461,-5.474609 -5.361328,-4.5937499 A -2,2 0 0 1 33.48193,6.6992187 -2,2 0 0 1 36.302242,6.4824219 Z"/>
                <path d="m 41.999508,12 a -2,2 0 0 1 2,2 -2,2 0 0 1 -2,2 H 19.005367 C 13.211123,16 8.2331921,20.786442 8.0073211,26.578125 7.7684221,32.704044 12.874224,38 19.005367,38 h 16.996094 a -2,2 0 0 1 2,2 -2,2 0 0 1 -2,2 H 19.005367 C 10.589926,42 3.6831261,34.835141 4.0112271,26.421875 4.3219541,18.454371 11.033625,12 19.005367,12 Z"/>
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
            <symbol viewBox="0 0 32 32" id="svgstartlight">
                <title>icon-star</title>
                <path d="m 16.001536,5.5738882 c -0.387801,0 -0.723295,0.2307418 -0.873697,0.5632484 l -0.0022,0.00595 -2.171999,6.6847904 H 5.9245782 c -0.508713,0 -0.9216078,0.412825 -0.9216078,0.921537 0,0.305228 0.1489282,0.576572 0.3774803,0.743932 l 0.00294,0.0014 5.6865553,4.130944 -2.1719985,6.685507 c -0.028747,0.08552 -0.044974,0.183569 -0.044974,0.285312 0,0.508713 0.4128948,0.921608 0.9216077,0.921608 0.2034853,0 0.3915138,-0.06561 0.5441268,-0.177676 l -0.0029,0.0014 5.6872,-4.132377 5.686555,4.132377 c 0.149666,0.109852 0.337706,0.175454 0.541192,0.175454 0.509451,0 0.922252,-0.412873 0.922252,-0.922323 0,-0.101743 -0.01616,-0.199764 -0.04712,-0.291185 L 20.935321,18.626298 26.62338,14.49471 c 0.231502,-0.170265 0.379629,-0.440831 0.379629,-0.746796 0,-0.09858 -0.01549,-0.194317 -0.04433,-0.283165 h -0.0028 c -0.123905,-0.373036 -0.469709,-0.63692 -0.87668,-0.63692 H 19.049381 L 16.877383,6.1430805 C 16.724031,5.8046758 16.389338,5.5738871 16.001536,5.5738882 Z m 10.957102,7.8909228 h 1.47e-4 l -0.0022,-0.0065 c 7.25e-4,0.0022 0.0013,0.0044 0.0021,0.0065 z m -10.957102,-4.0526684 1.50183,4.6241524 c 0.124599,0.372321 0.469593,0.636296 0.876562,0.636296 h 4.862988 l -3.934792,2.856061 c -0.2315,0.170308 -0.379629,0.441619 -0.379629,0.747584 0,0.101005 0.01618,0.199048 0.04641,0.290469 l -0.0022,-0.0065 1.503334,4.623365 -3.934076,-2.858352 c -0.149665,-0.109853 -0.337632,-0.175456 -0.54112,-0.175456 -0.203484,0 -0.391513,0.06561 -0.544127,0.177676 l 0.003,-0.0015 -3.934003,2.858425 1.502546,-4.623437 c 0.02875,-0.08553 0.04569,-0.183571 0.04569,-0.285313 0,-0.305228 -0.148928,-0.575764 -0.377481,-0.74386 l -0.003,-0.0015 -3.9333588,-2.857635 h 4.8622718 7.88e-4 c 0.406969,0 0.751977,-0.263952 0.873626,-0.629635 l 0.0022,-0.0065 z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        <svg display="none">
            <symbol viewBox="0 0 32 32" id="svgstarthalf">
                <title>icon-star</title>
                <!--تم قلب الوجه باستخدام انكسكيب-->
                <path d="m 5.048448,13.452879 c 0.12386,-0.373056 0.469638,-0.636997 0.876608,-0.636997 h 7.029826 l 2.171984,-6.6847855 c 0.123861,-0.372319 0.468901,-0.63626 0.875871,-0.63626 0.101743,0 0.200536,0.016957 0.291957,0.047185 l -0.0066,-0.00221 c 0.277212,0.095845 0.489544,0.3148123 0.57433,0.5898123 l 0.0015,0.00664 0.01548,-0.00516 2.171984,6.6847852 h 7.02903 c 0.508713,0 0.921582,0.412869 0.921582,0.921582 0,0.305228 -0.148928,0.576541 -0.37748,0.743901 l -0.003,0.0015 -5.686528,4.130898 2.171984,6.685523 c 0.02875,0.08549 0.04497,0.183546 0.04497,0.285289 0,0.508713 -0.412869,0.921582 -0.921582,0.921582 -0.203485,0 -0.391488,-0.06562 -0.544102,-0.177681 l 0.0029,0.0015 -5.687265,-4.132373 -5.686528,4.132373 c -0.149665,0.109853 -0.337668,0.175469 -0.541153,0.175469 -0.50945,0 -0.922319,-0.412868 -0.922319,-0.922319 0,-0.101742 0.01622,-0.199799 0.04719,-0.29122 l -0.0022,0.0066 2.172721,-6.684048 L 5.38166,14.482829 C 5.15019,14.312531 5.002,14.041954 5.002,13.735989 c 0,-0.101005 0.01622,-0.199061 0.04645,-0.289745 l -0.0022,0.0066 z m 7.647654,4.063807 c 0.231501,0.170309 0.379692,0.441622 0.379692,0.747587 0,0.101006 -0.01622,0.199062 -0.04645,0.290483 l 0.0022,-0.0066 -1.503285,4.623391 3.934049,-2.858378 c 0.143029,-0.09953 0.32071,-0.158512 0.511662,-0.158512 0.01032,0 0.02064,0 0.03097,7.37e-4 h -0.0015 V 9.3993941 l -1.50181,4.6241289 c -0.124598,0.372319 -0.469638,0.63626 -0.876609,0.63626 H 8.762019 Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        <svg display="none">
            <symbol viewBox="0 0 32 32" id="svgstartdark">
                <title>icon-star</title>
                <path d="M 26.955815,13.464834 C 26.831954,13.091777 26.486177,12.827836 26.079206,12.827836 H 19.049381 L 16.877397,6.1430509 C 16.724046,5.8046461 16.389327,5.573882 16.001525,5.573882 c -0.387801,0 -0.723257,0.2307641 -0.873659,0.5632708 l -0.0022,0.0059 -2.171984,6.6847852 H 5.9245818 c -0.5087132,0 -0.9215818,0.412869 -0.9215818,0.921582 0,0.305228 0.1489276,0.576542 0.3774799,0.743901 l 0.00295,0.0015 5.6865281,4.130898 -2.1719839,6.685522 C 8.8692198,25.396737 8.853,25.494794 8.853,25.596536 c 0,0.508713 0.4128686,0.921582 0.9215818,0.921582 0.2034852,0 0.3914882,-0.06562 0.5441022,-0.177681 l -0.0029,0.0015 5.687265,-4.132373 5.686528,4.132373 c 0.149665,0.109852 0.337668,0.175469 0.541153,0.175469 0.50945,0 0.922319,-0.412869 0.922319,-0.922319 0,-0.101743 -0.01622,-0.199799 -0.04718,-0.29122 l 0.0022,0.0066 -2.172721,-6.684048 5.688002,-4.131635 c 0.23146,-0.170299 0.37965,-0.440875 0.37965,-0.74684 0,-0.101006 -0.01622,-0.199062 -0.04645,-0.289746 l 0.0022,0.0066 z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgadd">
                <title>icon-add</title>
                <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-8.5 -6 30 30" id="svgadd2">
                <title>icon-add2</title>
                <path d="m 7.021107,16.320541 a 1.03,1.03 0 0 1 -2.0583878,7.07e-4 l 0,-5.555031 -5.55503087,0 a 1.03,1.03 0 1 1 7.071e-4,-2.0583875 l 5.55503087,0 -0.00141,-5.5536166 a 1.03,1.03 0 1 1 2.0583878,-7.071e-4 l 7.071e-4,5.5543237 h 5.555031 a 1.03,1.03 0 0 1 -7.07e-4,2.0583875 L 7.021107,10.76551 Z"></path>
            </symbol>
        </svg>


        <svg display="none">
            <symbol viewBox="-4 -4 30 30" id="svgaccepte">
                <title>icon-accepte</title>
                <path d="M4 12L8.94975 16.9497L19.5572 6.34326" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>

<!--        <svg display="none">-->
<!--            <symbol viewBox="-10 -10 45 45" id="svgignore">-->
<!--                <title>icon-ignore</title>-->
<!--                <path d="M23,11a1,1,0,0,0-1,1,10.034,10.034,0,1,1-2.9-7.021A.862.862,0,0,1,19,5H16a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V1a1,1,0,0,0-2,0V3.065A11.994,11.994,0,1,0,24,12,1,1,0,0,0,23,11Z-->
<!--M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z" stroke-width="0.5"></path>-->
<!--            </symbol>-->
<!--        </svg>-->
        
        <svg display="none">
            <symbol viewBox="-3 -3 30 30" id="svgignore2">
                <title>icon-ignore-2</title>
                <path d="M13 9H9M9 9V13M9 9L15 15M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>

        
        <svg display="none">
            <symbol viewBox="-3 -3 30 30" id="svgoutuser">
                <title>icon-svgoutuser</title>
                <!--<path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H17C17.5523 21 18 20.5523 18 20C18 19.4477 17.5523 19 17 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H17C17.5523 5 18 4.55228 18 4C18 3.44772 17.5523 3 17 3H6ZM15.7071 7.29289C15.3166 6.90237 14.6834 6.90237 14.2929 7.29289C13.9024 7.68342 13.9024 8.31658 14.2929 8.70711L16.5858 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16.5858L14.2929 15.2929C13.9024 15.6834 13.9024 16.3166 14.2929 16.7071C14.6834 17.0976 15.3166 17.0976 15.7071 16.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L15.7071 7.29289Z" fill="#000000"></path>-->
                <path d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H17C17.5523 21 18 20.5523 18 20C18 19.4477 17.5523 19 17 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H17C17.5523 5 18 4.55228 18 4C18 3.44772 17.5523 3 17 3H6ZM15.7071 7.29289C15.3166 6.90237 14.6834 6.90237 14.2929 7.29289C13.9024 7.68342 13.9024 8.31658 14.2929 8.70711L16.5858 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16.5858L14.2929 15.2929C13.9024 15.6834 13.9024 16.3166 14.2929 16.7071C14.6834 17.0976 15.3166 17.0976 15.7071 16.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L15.7071 7.29289Z"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-5 -5 34 34" id="svgoutuser2">
                <title>icon-svgoutuser2</title>
                <path d="M9 20.7499H6C5.65324 20.7647 5.30697 20.7109 4.98101 20.5917C4.65505 20.4725 4.3558 20.2902 4.10038 20.0552C3.84495 19.8202 3.63837 19.5371 3.49246 19.2222C3.34654 18.9073 3.26415 18.5667 3.25 18.2199V5.77994C3.26415 5.43316 3.34654 5.09256 3.49246 4.77765C3.63837 4.46274 3.84495 4.17969 4.10038 3.9447C4.3558 3.70971 4.65505 3.52739 4.98101 3.40818C5.30697 3.28896 5.65324 3.23519 6 3.24994H9C9.19891 3.24994 9.38968 3.32896 9.53033 3.46961C9.67098 3.61027 9.75 3.80103 9.75 3.99994C9.75 4.19886 9.67098 4.38962 9.53033 4.53027C9.38968 4.67093 9.19891 4.74994 9 4.74994H6C5.70307 4.72412 5.4076 4.81359 5.17487 4.99977C4.94213 5.18596 4.78999 5.45459 4.75 5.74994V18.2199C4.78999 18.5153 4.94213 18.7839 5.17487 18.9701C5.4076 19.1563 5.70307 19.2458 6 19.2199H9C9.19891 19.2199 9.38968 19.299 9.53033 19.4396C9.67098 19.5803 9.75 19.771 9.75 19.9699C9.75 20.1689 9.67098 20.3596 9.53033 20.5003C9.38968 20.6409 9.19891 20.7199 9 20.7199V20.7499Z"/>
                <path d="M16 16.7499C15.9015 16.7504 15.8038 16.7312 15.7128 16.6934C15.6218 16.6556 15.5392 16.6 15.47 16.5299C15.3296 16.3893 15.2507 16.1987 15.2507 15.9999C15.2507 15.8012 15.3296 15.6105 15.47 15.4699L18.94 11.9999L15.47 8.52991C15.3963 8.46125 15.3372 8.37845 15.2962 8.28645C15.2552 8.19445 15.2332 8.09513 15.2314 7.99443C15.2296 7.89373 15.2482 7.7937 15.2859 7.70031C15.3236 7.60692 15.3797 7.52209 15.451 7.45087C15.5222 7.37965 15.607 7.32351 15.7004 7.28579C15.7938 7.24807 15.8938 7.22954 15.9945 7.23132C16.0952 7.23309 16.1945 7.25514 16.2865 7.29613C16.3785 7.33712 16.4613 7.39622 16.53 7.46991L20.53 11.4699C20.6705 11.6105 20.7493 11.8012 20.7493 11.9999C20.7493 12.1987 20.6705 12.3893 20.53 12.5299L16.53 16.5299C16.4608 16.6 16.3782 16.6556 16.2872 16.6934C16.1962 16.7312 16.0985 16.7504 16 16.7499Z"/>
                <path d="M20 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25H20C20.1989 11.25 20.3897 11.329 20.5303 11.4697C20.671 11.6103 20.75 11.8011 20.75 12C20.75 12.1989 20.671 12.3897 20.5303 12.5303C20.3897 12.671 20.1989 12.75 20 12.75Z"/>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-6 -6 36 36" id="svgoutuser3">
                <title>icon-svgoutuser3</title>
                
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                
                <g id="SVGRepo_iconCarrier"> <path d="M9 20.7499H6C5.65324 20.7647 5.30697 20.7109 4.98101 20.5917C4.65505 20.4725 4.3558 20.2902 4.10038 20.0552C3.84495 19.8202 3.63837 19.5371 3.49246 19.2222C3.34654 18.9073 3.26415 18.5667 3.25 18.2199V5.77994C3.26415 5.43316 3.34654 5.09256 3.49246 4.77765C3.63837 4.46274 3.84495 4.17969 4.10038 3.9447C4.3558 3.70971 4.65505 3.52739 4.98101 3.40818C5.30697 3.28896 5.65324 3.23519 6 3.24994H9C9.19891 3.24994 9.38968 3.32896 9.53033 3.46961C9.67098 3.61027 9.75 3.80103 9.75 3.99994C9.75 4.19886 9.67098 4.38962 9.53033 4.53027C9.38968 4.67093 9.19891 4.74994 9 4.74994H6C5.70307 4.72412 5.4076 4.81359 5.17487 4.99977C4.94213 5.18596 4.78999 5.45459 4.75 5.74994V18.2199C4.78999 18.5153 4.94213 18.7839 5.17487 18.9701C5.4076 19.1563 5.70307 19.2458 6 19.2199H9C9.19891 19.2199 9.38968 19.299 9.53033 19.4396C9.67098 19.5803 9.75 19.771 9.75 19.9699C9.75 20.1689 9.67098 20.3596 9.53033 20.5003C9.38968 20.6409 9.19891 20.7199 9 20.7199V20.7499Z"/> <path d="M16 16.7499C15.9015 16.7504 15.8038 16.7312 15.7128 16.6934C15.6218 16.6556 15.5392 16.6 15.47 16.5299C15.3296 16.3893 15.2507 16.1987 15.2507 15.9999C15.2507 15.8012 15.3296 15.6105 15.47 15.4699L18.94 11.9999L15.47 8.52991C15.3963 8.46125 15.3372 8.37845 15.2962 8.28645C15.2552 8.19445 15.2332 8.09513 15.2314 7.99443C15.2296 7.89373 15.2482 7.7937 15.2859 7.70031C15.3236 7.60692 15.3797 7.52209 15.451 7.45087C15.5222 7.37965 15.607 7.32351 15.7004 7.28579C15.7938 7.24807 15.8938 7.22954 15.9945 7.23132C16.0952 7.23309 16.1945 7.25514 16.2865 7.29613C16.3785 7.33712 16.4613 7.39622 16.53 7.46991L20.53 11.4699C20.6705 11.6105 20.7493 11.8012 20.7493 11.9999C20.7493 12.1987 20.6705 12.3893 20.53 12.5299L16.53 16.5299C16.4608 16.6 16.3782 16.6556 16.2872 16.6934C16.1962 16.7312 16.0985 16.7504 16 16.7499Z"/> <path d="M20 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25H20C20.1989 11.25 20.3897 11.329 20.5303 11.4697C20.671 11.6103 20.75 11.8011 20.75 12C20.75 12.1989 20.671 12.3897 20.5303 12.5303C20.3897 12.671 20.1989 12.75 20 12.75Z"/> </g>
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
        

        <!--<svg display="none">-->
        <!--    <symbol viewBox="-14 -14 80 80" id="svgreturn">-->
        <!--        <title>icon-return</title>-->
                <!--<path d="M13 9H9M9 9V13M9 9L15 15M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>-->
                
        <!--        <path d="M12.9998 8L6 14L12.9998 21" stroke="#000000" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>-->
        <!--        <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#000000" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        
        <svg display="none">
            <symbol viewBox="-8 -8 40 40" id="svgtrash">
                <title>icon-trash</title>
                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        <!--<svg display="none">-->
        <!--    <symbol viewBox="-8 -8 40 40" id="svgexclamation">-->
        <!--        <title>icon-trash</title>-->
        <!--        <line class="cls-1" x1="12" y1="5.3" x2="12" y2="11.98"/>-->
        <!--        <path d="M18.68,1.48H5.32A3.82,3.82,0,0,0,1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H9.14L12,21.52l2.86-2.86h3.82a3.82,3.82,0,0,0,3.82-3.82V5.3A3.82,3.82,0,0,0,18.68,1.48Z" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--        <line class="cls-1" x1="11.05" y1="13.89" x2="12.95" y2="13.89"/>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        <svg display="none">
            <symbol viewBox="-3 -3 30 30" id="svgignore5">
                <title>icon-ignore-2</title>
                <path d="M15 10.5V15M15 15H10.5M15 15L9.00019 8.99994M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-3 -3 30 30" id="svgdirect">
                <title>icon-ignore-2</title>
                <path d="M12.1657 2.14424C12.8728 2.50021 13 3.27314 13 3.7446V20.2561C13 20.7286 12.8717 21.4998 12.1656 21.8554C11.416 22.2331 10.7175 21.8081 10.3623 21.4891L4.95001 16.6248H3.00001C1.89544 16.6248 1.00001 15.7293 1.00001 14.6248L1 9.43717C1 8.3326 1.89543 7.43717 3 7.43717H4.94661L10.3623 2.51158C10.7163 2.19354 11.4151 1.76635 12.1657 2.14424ZM11 4.63507L6.00618 9.17696C5.82209 9.34439 5.58219 9.43717 5.33334 9.43717H3L3.00001 14.6248H5.33334C5.58015 14.6248 5.81823 14.716 6.00179 14.881L11 19.3731V4.63507Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
                
                <path d="M16.0368 4.73124C16.1852 4.19927 16.7368 3.88837 17.2688 4.03681C20.6116 4.9696 23 8.22106 23 12C23 15.779 20.6116 19.0304 17.2688 19.9632C16.7368 20.1117 16.1852 19.8007 16.0368 19.2688C15.8884 18.7368 16.1993 18.1852 16.7312 18.0368C19.1391 17.3649 21 14.9567 21 12C21 9.04332 19.1391 6.63512 16.7312 5.96321C16.1993 5.81477 15.8884 5.2632 16.0368 4.73124Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
                
                <path d="M16.2865 8.04192C15.7573 7.88372 15.2001 8.18443 15.0419 8.71357C14.8837 9.24271 15.1844 9.79992 15.7136 9.95812C16.3702 10.1544 17 10.9209 17 12C17 13.0791 16.3702 13.8456 15.7136 14.0419C15.1844 14.2001 14.8837 14.7573 15.0419 15.2865C15.2001 15.8156 15.7573 16.1163 16.2865 15.9581C17.9301 15.4667 19 13.8076 19 12C19 10.1924 17.9301 8.53333 16.2865 8.04192Z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        
        
        <svg display="none">
            <symbol viewBox="0 0 24 24" id="svgmoving">
                <title>icon-moving</title>
                <path d="M4 12H20M4 12L8 8M4 12L8 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-4 -4 32 32" id="svgnavigation">
                <title>icon-moving</title>
                
                <!--<path d="M4 12H20M4 12L8 8M4 12L8 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
                <line class="c" x1="8.62" x2="15.38" y1="12" y2="5.5" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line class="c" x1="8.62" x2="15.38" y1="12" y2="18.5" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                
            </symbol>
        </svg>
        
        <svg display="none">
            <symbol viewBox="-4 -4 32 32" id="svgnavigationR" transform="matrix(-1,0,0,1,24,0)">
                <title>icon-moving</title>
                
                <!--<path d="M4 12H20M4 12L8 8M4 12L8 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
                <line class="c" x1="8.62" x2="15.38" y1="12" y2="5.5" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line class="c" x1="8.62" x2="15.38" y1="12" y2="18.5" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                
            </symbol>
        </svg>
        
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 32 32" id="svgstartdark">-->
        <!--        <title>icon-star</title>-->
        <!--        <path d="M30.859 12.545c-0.168-0.506-0.637-0.864-1.189-0.864h-9.535l-2.946-9.067c-0.208-0.459-0.662-0.772-1.188-0.772s-0.981 0.313-1.185 0.764l-0.003 0.008-2.946 9.067h-9.534c-0.69 0-1.25 0.56-1.25 1.25 0 0.414 0.202 0.782 0.512 1.009l0.004 0.002 7.713 5.603-2.946 9.068c-0.039 0.116-0.061 0.249-0.061 0.387 0 0.69 0.56 1.25 1.25 1.25 0.276 0 0.531-0.089 0.738-0.241l-0.004 0.002 7.714-5.605 7.713 5.605c0.203 0.149 0.458 0.238 0.734 0.238 0.691 0 1.251-0.56 1.251-1.251 0-0.138-0.022-0.271-0.064-0.395l0.003 0.009-2.947-9.066 7.715-5.604c0.314-0.231 0.515-0.598 0.515-1.013 0-0.137-0.022-0.27-0.063-0.393l0.003 0.009z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 32 32" id="svgstartdark_0">-->
        <!--        <title>icon-star</title>-->
        <!--        <path d="M 26.955815,13.464834 C 26.831954,13.091777 26.486177,12.827836 26.079206,12.827836 H 19.049381 L 16.877397,6.1430509 C 16.724046,5.8046461 16.389327,5.573882 16.001525,5.573882 c -0.387801,0 -0.723257,0.2307641 -0.873659,0.5632708 l -0.0022,0.0059 -2.171984,6.6847852 H 5.9245818 c -0.5087132,0 -0.9215818,0.412869 -0.9215818,0.921582 0,0.305228 0.1489276,0.576542 0.3774799,0.743901 l 0.00295,0.0015 5.6865281,4.130898 -2.1719839,6.685522 C 8.8692198,25.396737 8.853,25.494794 8.853,25.596536 c 0,0.508713 0.4128686,0.921582 0.9215818,0.921582 0.2034852,0 0.3914882,-0.06562 0.5441022,-0.177681 l -0.0029,0.0015 5.687265,-4.132373 5.686528,4.132373 c 0.149665,0.109852 0.337668,0.175469 0.541153,0.175469 0.50945,0 0.922319,-0.412869 0.922319,-0.922319 0,-0.101743 -0.01622,-0.199799 -0.04718,-0.29122 l 0.0022,0.0066 -2.172721,-6.684048 5.688002,-4.131635 c 0.23146,-0.170299 0.37965,-0.440875 0.37965,-0.74684 0,-0.101006 -0.01622,-0.199062 -0.04645,-0.289746 l 0.0022,0.0066 z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 32 32" id="svgstartlight">-->
        <!--        <title>icon-star</title>-->
        <!--        <path d="M30.859 12.545c-0.168-0.506-0.637-0.864-1.189-0.864h-9.535l-2.946-9.067c-0.208-0.459-0.662-0.772-1.188-0.772s-0.981 0.313-1.185 0.764l-0.003 0.008-2.946 9.067h-9.534c-0.69 0-1.25 0.56-1.25 1.25 0 0.414 0.202 0.782 0.512 1.009l0.004 0.002 7.713 5.603-2.946 9.068c-0.039 0.116-0.061 0.249-0.061 0.387 0 0.69 0.56 1.25 1.25 1.25 0.276 0 0.531-0.089 0.738-0.241l-0.004 0.002 7.714-5.605 7.713 5.605c0.203 0.149 0.458 0.238 0.734 0.238 0.691 0 1.251-0.56 1.251-1.251 0-0.138-0.022-0.271-0.064-0.395l0.003 0.009-2.947-9.066 7.715-5.604c0.314-0.231 0.515-0.598 0.515-1.013 0-0.137-0.022-0.27-0.063-0.393l0.003 0.009zM20.486 18.057c-0.314 0.231-0.515 0.599-0.515 1.014 0 0.137 0.022 0.27 0.063 0.394l-0.003-0.009 2.039 6.271-5.336-3.877c-0.203-0.149-0.458-0.238-0.734-0.238s-0.531 0.089-0.738 0.241l0.004-0.002-5.336 3.877 2.038-6.271c0.039-0.116 0.062-0.249 0.062-0.387 0-0.414-0.202-0.781-0.512-1.009l-0.004-0.002-5.335-3.876h6.595c0 0 0 0 0.001 0 0.552 0 1.020-0.358 1.185-0.854l0.003-0.009 2.038-6.272 2.037 6.272c0.169 0.505 0.637 0.863 1.189 0.863h6.596z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 32 32" id="svgstartlight_0">-->
        <!--        <title>icon-star</title>-->
        <!--        <path d="m 16.001536,5.5738882 c -0.387801,0 -0.723295,0.2307418 -0.873697,0.5632484 l -0.0022,0.00595 -2.171999,6.6847904 H 5.9245782 c -0.508713,0 -0.9216078,0.412825 -0.9216078,0.921537 0,0.305228 0.1489282,0.576572 0.3774803,0.743932 l 0.00294,0.0014 5.6865553,4.130944 -2.1719985,6.685507 c -0.028747,0.08552 -0.044974,0.183569 -0.044974,0.285312 0,0.508713 0.4128948,0.921608 0.9216077,0.921608 0.2034853,0 0.3915138,-0.06561 0.5441268,-0.177676 l -0.0029,0.0014 5.6872,-4.132377 5.686555,4.132377 c 0.149666,0.109852 0.337706,0.175454 0.541192,0.175454 0.509451,0 0.922252,-0.412873 0.922252,-0.922323 0,-0.101743 -0.01616,-0.199764 -0.04712,-0.291185 L 20.935321,18.626298 26.62338,14.49471 c 0.231502,-0.170265 0.379629,-0.440831 0.379629,-0.746796 0,-0.09858 -0.01549,-0.194317 -0.04433,-0.283165 h -0.0028 c -0.123905,-0.373036 -0.469709,-0.63692 -0.87668,-0.63692 H 19.049381 L 16.877383,6.1430805 C 16.724031,5.8046758 16.389338,5.5738871 16.001536,5.5738882 Z m 10.957102,7.8909228 h 1.47e-4 l -0.0022,-0.0065 c 7.25e-4,0.0022 0.0013,0.0044 0.0021,0.0065 z m -10.957102,-4.0526684 1.50183,4.6241524 c 0.124599,0.372321 0.469593,0.636296 0.876562,0.636296 h 4.862988 l -3.934792,2.856061 c -0.2315,0.170308 -0.379629,0.441619 -0.379629,0.747584 0,0.101005 0.01618,0.199048 0.04641,0.290469 l -0.0022,-0.0065 1.503334,4.623365 -3.934076,-2.858352 c -0.149665,-0.109853 -0.337632,-0.175456 -0.54112,-0.175456 -0.203484,0 -0.391513,0.06561 -0.544127,0.177676 l 0.003,-0.0015 -3.934003,2.858425 1.502546,-4.623437 c 0.02875,-0.08553 0.04569,-0.183571 0.04569,-0.285313 0,-0.305228 -0.148928,-0.575764 -0.377481,-0.74386 l -0.003,-0.0015 -3.9333588,-2.857635 h 4.8622718 7.88e-4 c 0.406969,0 0.751977,-0.263952 0.873626,-0.629635 l 0.0022,-0.0065 z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 32 32" id="svgstarthalf2">-->
        <!--        <title>icon-star</title>-->
        <!--        <path d="M30.859 12.545c-0.168-0.506-0.637-0.864-1.189-0.864h-9.535l-2.946-9.067c-0.168-0.505-0.636-0.863-1.188-0.863-0.138 0-0.272 0.023-0.396 0.064l0.009-0.003c-0.376 0.13-0.664 0.427-0.779 0.8l-0.002 0.009-0.021-0.007-2.946 9.067h-9.534c-0.69 0-1.25 0.56-1.25 1.25 0 0.414 0.202 0.782 0.512 1.009l0.004 0.002 7.713 5.603-2.946 9.068c-0.039 0.116-0.061 0.249-0.061 0.387 0 0.69 0.56 1.25 1.25 1.25 0.276 0 0.531-0.089 0.738-0.241l-0.004 0.002 7.714-5.605 7.713 5.605c0.203 0.149 0.458 0.238 0.734 0.238 0.691 0 1.251-0.56 1.251-1.251 0-0.138-0.022-0.271-0.064-0.395l0.003 0.009-2.947-9.066 7.715-5.604c0.314-0.231 0.515-0.598 0.515-1.013 0-0.137-0.022-0.27-0.063-0.393l0.003 0.009zM20.486 18.057c-0.314 0.231-0.515 0.599-0.515 1.014 0 0.137 0.022 0.27 0.063 0.394l-0.003-0.009 2.039 6.271-5.336-3.877c-0.194-0.135-0.435-0.215-0.694-0.215-0.014 0-0.028 0-0.042 0.001l0.002-0v-14.589l2.037 6.272c0.169 0.505 0.637 0.863 1.189 0.863h6.596z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 32 32" id="svgstarthalf">-->
        <!--        <title>icon-star</title>-->
                <!--تم قلب الوجه باستخدام انكسكيب-->
        <!--        <path d="m 1.145,12.545 c 0.168,-0.506 0.637,-0.864 1.189,-0.864 h 9.535 l 2.946,-9.067 c 0.168,-0.505 0.636,-0.863 1.188,-0.863 0.138,0 0.272,0.023 0.396,0.064 L 16.39,1.812 c 0.376,0.13 0.664,0.427 0.779,0.8 l 0.002,0.009 0.021,-0.007 2.946,9.067 h 9.534 c 0.69,0 1.25,0.56 1.25,1.25 0,0.414 -0.202,0.782 -0.512,1.009 l -0.004,0.002 -7.713,5.603 2.946,9.068 c 0.039,0.116 0.061,0.249 0.061,0.387 0,0.69 -0.56,1.25 -1.25,1.25 -0.276,0 -0.531,-0.089 -0.738,-0.241 l 0.004,0.002 -7.714,-5.605 -7.713,5.605 c -0.203,0.149 -0.458,0.238 -0.734,0.238 -0.691,0 -1.251,-0.56 -1.251,-1.251 0,-0.138 0.022,-0.271 0.064,-0.395 L 6.365,28.612 9.312,19.546 1.597,13.942 C 1.283,13.711 1.082,13.344 1.082,12.929 c 0,-0.137 0.022,-0.27 0.063,-0.393 l -0.003,0.009 z m 10.373,5.512 c 0.314,0.231 0.515,0.599 0.515,1.014 0,0.137 -0.022,0.27 -0.063,0.394 l 0.003,-0.009 -2.039,6.271 5.336,-3.877 c 0.194,-0.135 0.435,-0.215 0.694,-0.215 0.014,0 0.028,0 0.042,10e-4 H 16.004 V 7.047 l -2.037,6.272 c -0.169,0.505 -0.637,0.863 -1.189,0.863 H 6.182 Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        <!--<svg display="none">-->
        <!--    <symbol viewBox="0 0 32 32" id="svgstarthalf_0">-->
        <!--        <title>icon-star</title>-->
                <!--تم قلب الوجه باستخدام انكسكيب-->
        <!--        <path d="m 5.048448,13.452879 c 0.12386,-0.373056 0.469638,-0.636997 0.876608,-0.636997 h 7.029826 l 2.171984,-6.6847855 c 0.123861,-0.372319 0.468901,-0.63626 0.875871,-0.63626 0.101743,0 0.200536,0.016957 0.291957,0.047185 l -0.0066,-0.00221 c 0.277212,0.095845 0.489544,0.3148123 0.57433,0.5898123 l 0.0015,0.00664 0.01548,-0.00516 2.171984,6.6847852 h 7.02903 c 0.508713,0 0.921582,0.412869 0.921582,0.921582 0,0.305228 -0.148928,0.576541 -0.37748,0.743901 l -0.003,0.0015 -5.686528,4.130898 2.171984,6.685523 c 0.02875,0.08549 0.04497,0.183546 0.04497,0.285289 0,0.508713 -0.412869,0.921582 -0.921582,0.921582 -0.203485,0 -0.391488,-0.06562 -0.544102,-0.177681 l 0.0029,0.0015 -5.687265,-4.132373 -5.686528,4.132373 c -0.149665,0.109853 -0.337668,0.175469 -0.541153,0.175469 -0.50945,0 -0.922319,-0.412868 -0.922319,-0.922319 0,-0.101742 0.01622,-0.199799 0.04719,-0.29122 l -0.0022,0.0066 2.172721,-6.684048 L 5.38166,14.482829 C 5.15019,14.312531 5.002,14.041954 5.002,13.735989 c 0,-0.101005 0.01622,-0.199061 0.04645,-0.289745 l -0.0022,0.0066 z m 7.647654,4.063807 c 0.231501,0.170309 0.379692,0.441622 0.379692,0.747587 0,0.101006 -0.01622,0.199062 -0.04645,0.290483 l 0.0022,-0.0066 -1.503285,4.623391 3.934049,-2.858378 c 0.143029,-0.09953 0.32071,-0.158512 0.511662,-0.158512 0.01032,0 0.02064,0 0.03097,7.37e-4 h -0.0015 V 9.3993941 l -1.50181,4.6241289 c -0.124598,0.372319 -0.469638,0.63626 -0.876609,0.63626 H 8.762019 Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--    </symbol>-->
        <!--</svg>-->
        
        
        
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <script type="module" src="../js/scriptmyproject.js"></script>
    <!--<script type="module" src="../js/scriptmyproject.js"></script>-->
    <!--<script src="../js/scriptmyproject.js"></script>-->
    
</body>
</html>