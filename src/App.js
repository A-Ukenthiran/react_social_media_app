import { Route, Routes } from "react-router-dom";
import About from "./About/About";
import "./App.css";
import Missing from "./Error_page/Missing";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Nav from "./Header/Nav";
import Home from "./Home/Home";
import PostPage from "./Home/PostPage";
import NewPost from "./new_post/NewPost";
import EditPost from "./edit_post/EditPost";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title={"cloneBook"} />
        <Nav />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="post">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>

          <Route path="edit/:id" element={<EditPost />} />

          <Route path="about" element={<About />} />

          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
