import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { LogOutLayOut } from './pages/LogOutLayOut';
import { RegisterPage } from './pages/RegisterPage';
import { PostPage } from './pages/PostPage';
import { ListPostPage } from './pages/ListPostPage';
import { SelfInfomationPage } from './pages/SelfInformationPage';

function App() {
  return (
    <Routes >
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<LogOutLayOut />}>
        <Route path="/listpost/:currentPage" element={<ListPostPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/me" element={<SelfInfomationPage />} />
      </Route>
    </Routes>
    );
}

export default App;