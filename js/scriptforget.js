import Main from './modules/moduleMain.js';


let mainApp = new Main();



window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});


export function initApp( data ) {
    
    
    document.getElementById('buttonForget').addEventListener("click" , clickSearch );
    document.getElementById('buttonVerify').addEventListener("click" , forgetVerifyCode );
    document.getElementById('buttonSave').addEventListener("click" , forgetNewPassword );
    document.getElementById('buttonGoToLogin').addEventListener("click" , goToLogIn );
    document.getElementById('buttonGoToLogin1').addEventListener("click" , goToLogIn );
    
    
}

function clickSearch() {
    
    const pathForgetPassword = mainApp.pathDomain + "api/account/forgetpassword.php";

    const container = document.querySelector('.wrappernewitems');
    
    const email = document.getElementById('email');
    let validEmail = document.getElementById("validEmail");
    
    
    let [status,textError] = mainApp.validationInput( email.value , "email" );
    if( !status ) {
        validEmail.textContent = textError;
        return;
    } else {
        validEmail.textContent = "";
    }
    
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("email", email.value );
    
    mainApp.send( "POST" , pathForgetPassword , headers , formData ).then( (result) => {
    
    
    const warningtext = document.getElementById('warningtext');
    warningtext.style.display = "none";
    
    container.classList.add("secActive");
    
    }).catch( (reject) => {
            
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["textError"];
        
        let txt = "";
        if(codeError == 420) {
            
            txt = "خطأالرجاء قم بلمئ كافة البيانات";
            
        } else if(codeError == 430) {
            
            txt = "هذا البريد غير مسجل";
            
        } else if(codeError == 440) {
            
            txt = "هذا المستخدم مقيد يمكنك التواصل مع فريق دعم الموقع";
            
        } else if(codeError == 450) {
            
            txt = "حدث خطأ غير معروف, حاول مرة أخرى !!";
            
        } else {
            
            txt = "خطأ غير معروف !";
            
        }
        
        txt = "رمز الخطأ "+codeError+" :\n"+txt;
        
        const warningtext = document.getElementById('warningtext');
        warningtext.innerText = txt;
        warningtext.style.display = "flex";
        
        
    });
    
}
            
            
function forgetVerifyCode() {
    
    const pathForgetPasswordVerifyCode = mainApp.pathDomain + "api/account/forgetpasswordverifycode.php";
    
    const container = document.querySelector('.wrappernewitems');
    
    
    const email = document.getElementById('email');
    const code = document.getElementById('verifyCode');
    let validVerify= document.getElementById("validVerify");
    
    
    let [status,textError] = mainApp.validationInput( code.value , "number" );
    if( !status ) {
        validVerify.textContent = textError;
        return;
    } else {
        validVerify.textContent = "";
    }
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("email", email.value );
    formData.append("verifyCode", code.value );
    
    mainApp.send( "POST" , pathForgetPasswordVerifyCode , headers , formData ).then( (result) => {
        
        const warningtext = document.getElementById('warningtextsecond');
        warningtext.style.display = "none";
        
        container.classList.remove("secActive");
        container.classList.add("thrdActive");
        
    }).catch( (reject) => {
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["textError"];
        
        let txt = "";
        if(codeError == 420) {
            
            txt = "الرجاء قم بلمئ كافة البيانات";
            
        } else if(codeError == 430) {
            
            txt = "هذا البريد غير مسجل ";
            
        } else if(codeError == 440) {
            
            txt = "هذا المستخدم مقيد يمكنك التواصل مع فريق دعم الموقع";
            
        } else if(codeError == 441) {
            
            txt = "خطأ في رمز التحقق !!";
            
        } else if(codeError == 450) {
            
            txt = "حدث خطأ حاول مرة أخرى !!";
            
        } else {
            
            txt = "خطأ غير معروف !";
            
        }
        
        txt = "رمز الخطأ "+codeError+" :\n"+txt;
        
        const warningtext = document.getElementById('warningtextsecond');
        
        warningtext.innerText = reject;
        warningtext.style.display = "flex";
    });
    
}
            
            
function forgetNewPassword() {
    
    const pathForgetPasswordNewPassword = mainApp.pathDomain + "api/account/forgetpasswordnewreset.php";
    
    const container = document.querySelector('.wrappernewitems');
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repassword = document.getElementById('repassword');
    
    let validEmail = document.getElementById("validEmail");
    let validPassword = document.getElementById("validPassword");
    let validRePassword = document.getElementById("validRePassword");
    
    
    let [status,textError] = mainApp.validationInput( password.value , "password" );
    if( !status ) {
        validPassword.textContent = textError;
        return;
    } else {
        validPassword.textContent = "";
    }
    
    if( password.value === repassword.value ) {
        
        [status,textError] = mainApp.validationInput( repassword.value , "password" );
        if( !status ) {
            validRePassword.textContent = textError;
            return;
        } else {
            validRePassword.textContent = "";
        }
        
    } else {
        validRePassword.textContent = "كلمات السر غير متطابقة";
        return;
    }
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("email", email.value );
    formData.append("password", password.value );
    
    mainApp.send( "POST" , pathForgetPasswordNewPassword , headers , formData ).then( (result) => {
        
        const warningtext = document.getElementById('warningtextsecond');
        warningtext.style.display = "none";
    
        container.classList.remove("thrdActive");
        container.classList.add("fourActive");
        
    }).catch( (reject) => {
        
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["textError"];
        
        let txt = "";
        if(codeError == 420) {
            txt = "الرجاء قم بلمئ كافة البيانات";
        } else if(codeError == 430) {
            txt = "هذا البريد غير مسجل ";
        } else if(codeError == 450) {
            txt = "حدث خطأ في إستعادة كلة المرور, حاول مرة أخرى !!";
        } else {
            txt = "خطأ غير معروف !";
        }
        
        txt = "رمز الخطأ "+codeError+" :\n"+txt;
        
        const warningtext = document.getElementById('warningtextsecond');
        
        warningtext.innerText = reject;
        warningtext.style.display = "flex";
    });
    
    
}


function goToLogIn() {
    window.location.href = mainApp.pathDomain + "login";
}







