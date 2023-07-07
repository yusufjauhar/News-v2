import React, { useState, useEffect } from "react";
import { Navbar, Typography, Button, Input, CardHeader, IconButton } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("Trending");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=12&apikey=b99f56d9971a128f9a2fb42d555d12d1`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [query]);

  const handleSearch = () => {
    setQuery(input);
  };

  return (
    <div className="bg-white">
      <Navbar variant="gradient" color="blue-gray" className="mx-auto max-w-screen-xxl from-blue-gray-900 to-blue-gray-800 px-5 py-3 mt-4 mb-0">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography as="a" href="#" variant="h6" className="mr-4 ml-2 cursor-pointer py-1.5">
            Myportal
          </Typography>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              onChange={(event) => setInput(event.target.value)}
              type="search"
              color="white"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button size="sm" color="white" className="!absolute right-1 top-1 rounded" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </Navbar>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.map((article, index) => (
            <article key={index} className="flex max-w-xl flex-col items-start justify-between">
              <div className="group relative">
                <CardHeader floated={false} color="blue-gray" className="mb-4">
                  <img src={article.image} alt={article.title} />
                  <div className="to-bg-black- absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                  <IconButton size="sm" color="red" variant="text" className="!absolute top-4 right-4 rounded-full">
                    <HeartIcon className="h-6 w-6" />
                  </IconButton>
                </CardHeader>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={article.publishedAt} className="text-gray-500">
                    {article.publishedAt}
                  </time>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a>
                    <span className="absolute inset-0" />
                    {article.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.description}</p>
              </div>
              <button className="mt-2">
                <a
                  href={article.url}
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  See More
                </a>
              </button>
              <div className="relative flex items-center gap-x-4"></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
