
import Main from './moduleMain.js';



let mainApp = new Main();


export function initApp() {
    
    
    document.getElementById('buttonSignup').addEventListener("click" , clickSignUp );
    document.getElementById('buttonVerify').addEventListener("click" , signUpVerifyCode );
    document.getElementById('buttonGoToLogin').addEventListener("click" , goToLogIn );
    document.getElementById('buttonGoToLogin1').addEventListener("click" , goToLogIn );
    
}

    
function clickSignUp() {
    
    const pathSignUp = mainApp.pathDomain + "api/account/signup.php";
    
    const container = document.querySelector('.wrappernewitems');
    
    
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repassword = document.getElementById('repassword');
    
    
    let validFName = document.getElementById("validFName");
    let validLName = document.getElementById("validLName");
    let validEmail = document.getElementById("validEmail");
    let validPassword = document.getElementById("validPassword");
    let validRePassword = document.getElementById("validRePassword");
    

    let [status,textError] = mainApp.validationInput( firstName.value , "shortstring" );
    if( !status ) {
        validFName.textContent = textError;
        return;
    } else {
        validFName.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( lastName.value , "shortstring" );
    if( !status ) {
        validLName.textContent = textError;
        return;
    } else {
        validLName.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( email.value , "email" );
    if( !status ) {
        validEmail.textContent = textError;
        return;
    } else {
        validEmail.textContent = "";
    }
    
    [status,textError] = mainApp.validationInput( password.value , "password" );
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
    formData.append("firstName", firstName.value );
    formData.append("lastName", lastName.value );
    formData.append("email", email.value );
    formData.append("password", password.value );
    
    mainApp.send( "POST" , pathSignUp , headers , formData ).then( (result) => {
        
        const warningtext = document.getElementById('warningtext');
        warningtext.style.display = "none";

        container.classList.add("secActive");
        
    }).catch( (reject) => {
    
        const data = reject["data"];
        const codeError = data["codeError"];
        const textError = data["textError"];
        
        
        let txt = "";
        if(codeError == 420) {
            txt = "الرجاء قم بلمئ كافة البيانات";
        } else if(codeError == 430) {
            txt = "هذا البريد مسجل سابقاً, إذا كنت تملك هذا البريد فقم بإستعادة كلمة المرور";
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

function signUpVerifyCode() {
    
    const pathSignUpVerifyCode = mainApp.pathDomain + "api/account/signupuserverifycode.php";
    
    const container = document.querySelector('.wrappernewitems');
    
    let validVerify = document.getElementById("validVerify");
    
    const email = document.getElementById('email');
    const verifyCode = document.getElementById('verifyCode');
    
    

    let [status,textError] = mainApp.validationInput( verifyCode.value , "number" );
    if( !status ) {
        validVerify.textContent = textError;
        return;
    } else {
        validVerify.textContent = "";
    }
    
    
    
    
    
    const headers = [];
    
    let formData = new FormData();
    formData.append("email", email.value );
    formData.append("verifyCode", verifyCode.value );
    
    mainApp.send( "POST" , pathSignUpVerifyCode , headers , formData ).then( (result) => {
        
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

function goToLogIn() {
    window.location.href=mainApp.pathDomain + "login";
}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
