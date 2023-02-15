import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/main/Main";
import MessagesPage from "./pages/messages/Messages";
import ExplorePage from "./pages/explore/Explore";
import PersonalPage from "./pages/personal/Personal";

import RegisterPage from "./components/form/register/RegisterPage";
import LoginPage from "./components/form/login/LoginPage";

function App() {
    return (
        <div className="App overflow-hidden">
            <Routes>
                <>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/user" element={<PersonalPage />} />
                </>
                <>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LoginPage />} />
                </>
            </Routes>
        </div>
    );
}

export default App;
