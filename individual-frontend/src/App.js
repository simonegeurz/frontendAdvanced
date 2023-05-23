import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./components/profile";
import {Routes, Route} from "react-router-dom";
import NotLoggedIn from "./components/feed/notLoggedIn";
import Feed from "./components/feed/feed";
import './App.css';
import Navbar from "./components/navbar/navbar";
import Footer from "./components/navbar/footer";

function App() {
  const { error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops {error.message}</div>;
  }
  return (
    <div >
    <Navbar />
    {isAuthenticated && (
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    )}
    {!isAuthenticated && (
      <>
        <Routes>
          <Route path="/" element={<NotLoggedIn />} />
        </Routes>
      </>
    )}
    <Footer />
  </div>
  );
}

export default App;
