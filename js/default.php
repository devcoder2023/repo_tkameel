<?php
    
    session_start();
    
    if( isset($_SESSION['timeout']) ) {
        
        if(time() > $_SESSION['timeout']) {
            header('Location:https://www.tkameel.com/web/login', TRUE, 301);
        } else {
            header('Location:https://www.tkameel.com/web/home', TRUE, 301);
        }
        
    } else {
        header('Location:https://www.tkameel.com/web/login', TRUE, 301);
    }
    
?>