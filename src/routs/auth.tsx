import {Routes,Route} from 'react-router-dom'

import SigIn from '../pages/sigIn'
import SigOut from '../pages/sigOut'

import Home from '../pages/home'
import { Private } from './private'
export function Auth(){
    return(
        <Routes>
            <Route path='/' element={<SigIn/>}/>
            <Route path='/SigOut' element={<SigOut/>}/>

            <Route path='/Home' element={<Private><Home/></Private>}/>
        </Routes>
    )
}