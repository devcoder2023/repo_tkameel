
<!DOCTYPE html >
<html lang="en" dir="rtl">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
        <link rel="stylesheet" href="./style/styleaccount.css">
        <link rel="icon" href="./files/logo/icn_ar.png">
        <title>إستعادة كلمة المرور</title>
    </head>
    <body>
    
    <div class="wrapper">
        
        
        <div class="wrappernewitems wrapperforget">
            
            <div class="widget first">
                
                <div class="inner">
                    
                    <div class="divlogin">إستعادة كلمة المرور</div>
                    
                    <div class="containerwarning">
                        <div id="warningtext" class="containerwarningtext">
                            
                        </div>
                    </div>
                    
                    <div class="containerform">
                        <form action="" method="post" class="form">
                        
                            <input type="text" id="email" name="email" class="inputs linemail" placeholder="ادخل البريد الإلكتروني" required />
                            <span id="validEmail" class="validation validEmail"></span>
                            
                        </form>
                    </div>
                    
                    <div class="containerbuttons">
                        <div id="buttonForget" class="buttons buttonforget">
                            <span class="btnText">
                                البحث
                            </span>
                        </div>
                    </div>
                    
                    <div class="containerbuttons sign">
                        
                        <div id="buttonGoToLogin1" class="buttons neg">
                                تسجيل الدخول
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            
            <div class="widget second">
                
                <div class="inner">
                    
                    <div class="divlogin">التحقق</div>
                    
                    <div class="containerwarning">
                        <div id="warningtextsecond" class="containerwarningtext">
                            
                        </div>
                    </div>
                    
                    <div class="containerform">
                        <form action="" method="post" class="form">
                        
                            <input type="text" id="verifyCode" name="verifyCode" class="inputs linverifycode" placeholder="ادخل رمز التحقق" required />
                            <span id="validVerify" class="validation validVerify"></span>
                            
                        </form>
                    </div>
                    
                    <div class="containerbuttons">
                        <div id="buttonVerify" class="buttons buttonlogin">
                            <span class="btnText">
                                التحقق
                                </span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            <div class="widget third">
                
                <div class="inner">
                    
                    <div class="divlogin">كلمة المرور الجديدة</div>
                    
                    <div class="containerwarning">
                        <div id="warningtextthird" class="containerwarningtext">
                            
                        </div>
                    </div>
                    
                    <div class="containerform">
                        <form action="" method="post" class="form">
                        
                            <input type="password" id="password" name="password" class="inputs linpassword" placeholder="ادخل كلمة السر الجديدة" required />
                            <span id="validPassword" class="validation validPassword"></span>

                            <input type="password" id="repassword" name="repassword" class="inputs linrepassword" placeholder="أعد إدخال كلمة السر" required />
                            <span id="validRePassword" class="validation validRePassword"></span>
                            
                        </form>
                    </div>
                    
                    <div class="containerbuttons">
                        <div id="buttonSave" class="buttons buttonlogin">
                            <span class="btnText">
                                حفظ
                                </span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            <div class="widget fourth">
                
                <div class="inner">
                    
                    <div class="divlogin">تم إستعادة كلمة المرور</div>
                    
                    <div class="containerbuttons">
                        <div id="buttonGoToLogin" class="buttons buttonlogin">
                            <span class="btnText">
                                صفحة الدخول
                                </span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        
    </div>
        
        <script type="module" src="./js/scriptforget.js"></script>

    </body>



</html>

                