import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}<FaCalendarAlt/></p>
      </Link>
      <p className="postBody">
        {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
