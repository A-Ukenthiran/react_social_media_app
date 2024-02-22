import { createContext } from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../api/posts_api";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("social_media_app")));
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();
  // const { data, fetchError, isLoading } = useAxiosFetch(
  //   "http://localhost:3500/posts"
  // );

  // useEffect(() => {
  //   setPosts(data);
  // }, [data]);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      //saving datas in server
      // const response = await api.post("/posts", newPost);
      // const allPosts = [...posts, response.data];
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      setAndSaveItems(allPosts)
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      // const response = await api.put(`/posts/${id}`, updatedPost);
      // const postsList = posts.map((post) => (post.id === id ? { ...response.data } : post))
      const postsList = posts.map((post) => (post.id === id ? updatedPost : post))
      setPosts(postsList);
      setAndSaveItems(postsList)
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      //await api.delete(`posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      setAndSaveItems(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  //saving datas in local storage
  const setAndSaveItems = (newItems) =>
  {
      setPosts(newItems);
      localStorage.setItem("social_media_app", JSON.stringify(newItems))
  }

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        //fetchError,
        //isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        handleDelete,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
