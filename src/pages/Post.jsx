import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { isPending, data, error } = useQuery({
    // try not to manually create and add these query keys at least when the application is huge it will be error prune and makes difficult to change the query keys in future
    queryKey: ["posts", id, { hello: " world!" }],

    // we can access the queryKey inside the queryFn like this:
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isPending) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Loading...
      </h1>
    );
  }
  if (error) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Error: {error.message}
      </h1>
    );
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="p-4 border-gray-400 border-4 rounded-lg w-4/5 max-w-[500px]">
        <h2 className="font-bold text-lg mb-2 text-gray-400">{data.title}</h2>
        <p className="text-gray-400">{data.body}</p>
      </div>
    </div>
  );
};

export default Post;
