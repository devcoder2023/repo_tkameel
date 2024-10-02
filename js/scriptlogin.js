import Main from './modules/moduleMain.js';



let mainApp = new Main();



window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});



export function initApp() {
    
    
    document.getElementById('buttonLogin').addEventListener("click" , clickLogin );
    document.getElementById('buttonNew').addEventListener("click" , goToSignUp );
    document.getElementById('buttonForget').addEventListener("click" , goToForgetPassword );
    
}

async function clickLogin() {
    
    const pathLogin = mainApp.pathDomain + "api/account/login.php";
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let validEmail = document.getElementById("validEmail");
    let validPassword = document.getElementById("validPassword");

    let [status,textError] = mainApp.validationInput( email.value , "email" );
    if( !status ) {
        validEmail.textContent = textError;
        return;
    } else {
        validEmail.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( password.value , "password" );
    if( !status ) {
        validPassword.textContent = "كلمة المرور غير صحيحة"; 
        return;
    } else {
        validPassword.textContent = "";
    }
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("email", email.value );
    formData.append("password", password.value );
    
    mainApp.send( "POST" , pathLogin , headers , formData ).then( (result) => {
        
        
        const warningtext = document.getElementById('warningtext');
        warningtext.style.display = "none";
        
        
        document.cookie = "token="+result;
        
        window.location.href = mainApp.pathDomain + "home";
        
        
        
        
        
        }).catch( (reject) => {
                
            const data = reject["data"];
            const codeError = data["codeError"];
            const textError = data["textError"];
            
            let txt = "";
            if(codeError == 420) {
                txt = "الرجاء قم بلمئ كافة البيانات";
            } else if(codeError == 430) {
                txt = "خطأ في معلومات الدخول تأكد من معلومات البريد وكلمة المرور";
            } else if(codeError == 440) {
                txt = "لم يتم تفعيل عضويتك بعد";
            } else {
                txt = "خطأ غير معروف !";
            }
            
            txt = "رمز الخطأ "+codeError+" :\n"+txt;
            
            const warningtext = document.getElementById('warningtext');
            warningtext.innerText = txt;
            warningtext.style.display = "flex";
            
        });
        
}
            
            
function goToSignUp() {
    window.location.href=mainApp.pathDomain + "signup";
}
            
            
function goToForgetPassword() {
    window.location.href=mainApp.pathDomain + "forget";
}
