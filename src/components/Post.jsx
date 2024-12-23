import React from "react";
import { useEffect, useState } from "react";
import getPost, { deletePost } from "../api/postApi";
import Form from "./Form";

const Post = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdatedDataApi] = useState({});

  const getPostData = async () => {
    const res = await getPost();
    console.log(res?.data);
    setData(res?.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  // Function to delete post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => curPost.id !== id);
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }; // <-- Properly close the function here

  // Function to update post
  const handleUpdatePost = (curElem) => setUpdatedDataApi(curElem);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdatedDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdatePost(curElem)}>
                    Edit
                    </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Post;
