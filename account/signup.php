
<!DOCTYPE html >
<html lang="en" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/styleaccount.css">
    <link rel="icon" href="./files/logo/icn_ar.png">
    <script defer type="module" src="./js/scriptsign.js"></script>
    <title>مستخدم جديد</title>
</head>
<body>
    
    <div class="wrapper">
        
        <div class="wrappernewitems">
            
            <div class="widget first">
                
                <div class="inner">
                    
                    <div class="divlogin">مستخدم جديد</div>
                    
                    <div class="containerwarning">
                        <p id="warningtext" class="containerwarningtext">
                            
                        </p>
                    </div>
                    
                    <div class="containerform">
                        <form action="" method="post" class="form">
                        
                            <input type="text" id="firstName" name="firstName" class="inputs linidemp" placeholder="الاسم اﻷول" required />
                            <span id="validFName" class="validation validFName"></span>

                            <input type="text" id="lastName" name="lastName" class="inputs linemail" placeholder="الاسم الأخير" required />
                            <span id="validLName" class="validation validLName"></span>

                            <input type="text" id="email" name="email" class="inputs linphone" placeholder="البريد الإلكتروني" required />
                            <span id="validEmail" class="validation validEmail"></span>

                            <input type="password" id="password" name="password" class="inputs linpassword" placeholder="ادخل كلمة المرور" required />
                            <span id="validPassword" class="validation validPassword"></span>

                            <input type="password" id="repassword" name="repassword" class="inputs linrepassword" placeholder="أعد إدخال كلمة المرور" required />
                            <span id="validRePassword" class="validation validRePassword"></span>
                        
                        </form>
                    </div>
                    
                    <div class="containerbuttons">
                        <div id="buttonSignup" class="buttons buttonsignup">
                            <span class="btnText">
                                تسجيل
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
                    
                    <div class="containerform">
                        <form action="" method="post" class="form">
                        
                            <input type="text" id="verifyCode" name="verifyCode" class="inputs linverifycode" placeholder="ادخل رمز التحقق" required />
                            <span id="validVerify" class="validation validVerify"></span>
                            
                        </form>
                    </div>
                    
                    <div class="containerwarning">
                        <div id="warningtextsecond" class="containerwarningtext">
                            
                        </div>
                    </div>
                    
                    <div class="containerbuttons">
                        <div id="buttonVerify" class="buttons">
                            <span class="btnText">
                                التحقق
                                </span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            <div class="widget third">
                
                <div class="inner">
                    
                    <div class="divlogin">تم إكمال التسجيل بنجاح</div>
                    
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
        

</body>



</html>

                