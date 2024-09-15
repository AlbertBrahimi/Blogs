import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UsersList';  
import UserPost from './components/UserPost';  

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Users</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
