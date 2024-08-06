import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function IfEmpty(str){
    if(str==null||str.trim==""){
        return false
    }
    return true;
}