import {Navigate, Route, Routes} from 'react-router';
import './App.css';
import {Header} from './App/Layouts/Header/Header';
import {Home} from './App/Layouts/Home/Home';
import {NavBar} from './App/Layouts/NavBar/NavBar';
import {Users} from './App/Layouts/Followers-Users/Users';
import {Followers} from "./App/Layouts/Followers-Users/Followers";
import {Accounting} from "./App/Layouts/Accouting/Accounting";
import {History} from "./App/Layouts/History/History";
import {Settings} from "./App/Layouts/Settings";
import {Profile} from "./App/Layouts/Profile/Profile";
import {AppLoader} from "./App/Hoc/appLoader";
import {ProtectedRoute} from "./App/Common/ProtectedRouter";
import {Logout} from "./App/Layouts/Profile/Logout";
import {UsersLoader} from "./App/Hoc/usersLoader";
import {CreateCard} from "./App/Layouts/CreateCard/CreateCard";
import {MyCreditCardInfo} from "./App/Layouts/Profile/MyCreditCardInfo";
import {Translate} from "./App/Layouts/Transact/Translate";
import {Completed} from "./App/Common/Completed";
import {UpdateProfile} from "./App/Layouts/Profile/UpdateProfile";
import {Notice} from "./App/Layouts/Notice/Notice";

function App() {
    return (
        <div className='d-flex' style={{
            backgroundColor: '#EEF3FF'
        }}>
            <AppLoader>
                <NavBar/>
                <div className={"rounded-4"} style={{width: '100%'}}>
                    <UsersLoader>
                        <Header/>
                    </UsersLoader>
                    <div style={{padding: '10px', marginBottom: '50px'}}>
                        <Routes>
                            <Route element={<ProtectedRoute/>}>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/home' element={<Home/>}/>
                                <Route path='/completed' element={<Completed/>}/>
                                <Route path='/users' element={<Users/>}/>
                                <Route path='/followers' element={<Followers/>}/>
                                <Route path='/accounting' element={<Accounting/>}/>
                                <Route path='/history' element={<History/>}/>
                                <Route path='/settings' element={<Settings/>}/>
                                <Route path='/notice' element={<Notice/>}/>
                                <Route path='/logout' element={<Logout/>}/>
                                <Route path='/translate/:cardId' element={<Translate/>}/>
                                <Route path='/createCard' element={<CreateCard/>}/>
                                <Route path='/profile/:cardId' element={<MyCreditCardInfo/>}/>
                                <Route path='/profile/:cardId/:edit' element={<UpdateProfile/>}/>
                            </Route>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path="*" element={<Navigate to={"/"}/>}/>
                        </Routes>
                    </div>
                </div>
            </AppLoader>
        </div>
    );
}

export default App;
