import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UsersList';  
import UserPost from './components/UserPost';  
import './components/ui/styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className='header'>Blogs</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
