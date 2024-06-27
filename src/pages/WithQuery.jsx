import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const WithQuery = () => {
  // "useQuery": Used for fetching data from the server
  // "useMutation": Used for modifing something on the server

  const { isPending, error, data } = useQuery({
    // These two are the required properties of useQuery
    queryKey: ["posts"], // unique identifier for each query

    // Function that handles the fetching logic, fetches the data returning a promise
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      return data;
    },
    // stale(outdated) time takes in a time value in milliseconds
    staleTime: 10000, // 10 secs
    // staleTime --> 0 by default: decides whether it's neccessary to fetch the data again or whether the data that's sitting in the cache can be reused when we interact with the application tab like switching tabs
    // 0 value means as soon as we make the request and fetch something it will consider the data to be staled right away so there's no caching happening and we'll refetch the data all the time by default

    // "refetchOnWindowFocus" --> true by default: if the window is out of focus like even tab change, when we get back to the application window again and the query data is stale then it will automatically make a refetch call

    // "refetchOnMount" --> true by default: if the component unmounts for some reason, like when we move to a new page or conditional rendering of a component, once it remounts into the app there will be a refetch

    // "refetchOnReconnect" --> true by default: deals with inconsistent network so if for some reason network goes down and then comes back there will be a refetch
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
      <Link
        to="/withoutquery"
        className="bg-gray-300 block w-fit my-8 mx-auto text-center py-2 px-4 rounded hover:bg-gray-400 font-medium"
      >
        Go to without query
      </Link>

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

// Actions in React Query Devtools:

// 1. "Refetch": refetches the data by making the api call again
// 2. "Invalidate": works like refetch, invalidating the data present inside the cache like if something at the backend is changed
// 3. "Reset": allows to reset the entire state of all queries and mutations like a page reload
// 4. "Remove": removes the query from the cache
// 5. "Trigger Loading": simulate a loading state: shows the page if useQuery returned loading true/false
// 6. "Trigger Error": simulate an error state: shows the page if useQuery returned error true/false

// Actions in React Query Devtools:

// 1. "Fresh": the query data is not staled (outdated)
// 2. "Fetching": the query data is fetching
// 3. "Paused":
// 4. "Stale": the query data is staled (outdated)
// 5. "Inactive": the query is present somewhere in the application but it is not being used by any component that we have in the viewport rightnow.
