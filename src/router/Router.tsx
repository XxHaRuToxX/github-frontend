import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ResponsiveAppBar } from '../components/Navbar';
import { SingleUser } from '../components/SIngleUser';
import { TableRepos } from '../components/TableRepos';

export const Router = () => {
    return (
        <BrowserRouter>
            <ResponsiveAppBar/>
            <Routes>
               <Route path='/' element={<Home/>} />
               <Route path='/single-user/:login' element={<SingleUser/>} />
               <Route path='/repositories/:login' element={<TableRepos/>} />
               <Route path="*" element={ <Home/> }
                />
            </Routes>
        </BrowserRouter>
    )
}
