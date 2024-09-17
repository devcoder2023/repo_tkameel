
<!DOCTYPE html >
<html lang="en" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/styleaccount.css">
    <link rel="icon" href="./files/logo/icn_ar.png">
    <script defer type="module" src="./js/scriptlogin.js"></script>
    <title>صفحة الدخول</title>
</head>
<body>
    
    <div class="wrapper">
        
        
        <div class="widget login">
            
            <div class="divlogin">تسجيل الدخول</div>
            
            <div class="containerwarning">
                <p id="warningtext" class="containerwarningtext">
                    
                </p>
            </div>
            
            <div class="containerform">
                <form action="" method="post" class="form">
                
                    <input type="text" id="email" name="email" class="inputs email" placeholder="ادخل البريد الإلكتروني" required />
                    <span id="validEmail" class="validation validEmail"></span>
    
                    <input type="password" id="password" name="password" class="inputs password" placeholder="ادخل كلمة المرور" required />
                    <span id="validPassword" class="validation validPassword"></span>
                    
                </form>
            </div>
            
            
            <div class="containerbuttons login">
                <div id="buttonLogin" class="buttons buttonlogin">
                    <span class="btnText">
                        دخول
                        </span>
                </div>
            </div>
            
            <div class="containerbuttons sign">
            
                <div id="buttonNew" class="buttons neg">
                    إنشاء حساب
                </div>
                
                <div id="buttonForget" class="buttons neg">
                        نسيت كلمة المرور
                </div>
            </div>
            
        </div>
    
        
    </div>
    

</body>



</html>
















