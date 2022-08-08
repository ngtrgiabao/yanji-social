import { Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Homepage from "./components/main/Main";
import MessagesPage from "./components/pages/messages/Messages";
import ExplorePage from "./components/pages/explore/Explore";
import PersonalPage from "./components/pages/personal/Personal";

function App() {
    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/user" element={<PersonalPage />} />
            </Routes>
        </div>
    );
}

export default App;
