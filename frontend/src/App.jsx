import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/LoginPage';
import { PostPage } from './pages/PostPage';
import { ViewPostPage } from './pages/ViewPostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listpost/:currentPage" element={<ViewPostPage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
    );
}

export default App;