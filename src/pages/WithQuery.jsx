import { useQuery } from "@tanstack/react-query";
import React from "react";

const WithQuery = () => {
  const { isPending, error, data } = useQuery({
    // These two are the required properties
    queryKey: ["posts"], // unique identifier for each query

    // Function that handles the fetching logic, fetches the data returning a promise
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      return data;
    },
  });

  // "isPending" is used to check if the async operation is still in progress and more are "isError", "isFetching", "isSuccess"
  if (isPending) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Loading...
      </h1>
    );
  }

  // "error" returns the error object, null if no error
  if (error) {
    return (
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Error: {error.message}
      </h1>
    );
  }

  // "data" property gives us the actual data once the fetch operation is complete
  return (
    <div className="m-4 max-w-[600px] w-4/5 mx-auto">
      <h1 className="text-3xl text-center my-8 font-bold text-gray-400">
        Posts Data
      </h1>
      {data &&
        data.map((post) => {
          return (
            <div
              key={post.id}
              className="p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-200"
            >
              <h2 className="font-bold text-lg mb-2 text-gray-400">
                {post.title}
              </h2>
              <p className="text-gray-400">{post.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default WithQuery;
