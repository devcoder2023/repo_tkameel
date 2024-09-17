import * as moduleUserLog from './modules/moduleUserLog.js';

import Main from './modules/moduleMain.js';


let mainApp = new Main();



const COUNTS_ROW = 10;



window.addEventListener("DOMContentLoaded", function () { 
    
    initApp();
    
});

export function initApp() {
    
}


function init_User() {
    
    moduleUserLog.init_User();
    
}