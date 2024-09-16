<?php

    session_start();
    if(session_destroy()) {
        
        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach($cookies as $cookie) {
                // echo $cookie . "</br>" ;
                
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', time()-100);
                setcookie($name, '', time()-100, '/');
                setcookie($name, '', time()-100, '/web');
                
                // echo ">". $_COOKIE[$name] . "</br>" ;
            }
        }
        
        header('Location:https://www.tkameel.com/web/login', TRUE, 301);
    }
    

?>