"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import SkeletonLoader from "../common/SkeletonLoader";
import ErrorMessage from "../common/error-message";
import useNews from "../hooks/useNews";
import { Pagination } from "../ui/pagination";
import { SearchBar } from "../ui/Search";

const CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const NewsFeed = () => {
  const {
    articles,
    loading,
    error,
    page,
    totalResults,
    category,
    query,
    setPage,
    setCategory,
    setQuery,
    fetchNews,
  } = useNews();

  // State for debounce
  const [searchTerm, setSearchTerm] = useState(query);

  // Debounced search (delay fetchNews until user stops typing)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetchNews();
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update debounced term
    setQuery(e.target.value); // Keep query updated in state
  };

  return (
    <div className="space-y-6">
      {/* Loader */}
      {loading && <SkeletonLoader />}

      {/* Error Handling */}
      {error ? (
        <ErrorMessage message={error} onRetry={fetchNews} />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pl-6">
            <h1 className="text-2xl font-bold">
              {category
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} News`
                : "Top Headlines"}
            </h1>
            <SearchBar
              query={searchTerm}
              onSearchChange={handleSearchChange}
              onSearchSubmit={(e) => e.preventDefault()} // Prevent full form submission
              placeholder="Search news"
            />

            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border dark:border-gray-700 text-black dark:text-white">
                {CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* No Data Message */}
          {!loading && articles.length === 0 && (
            <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
              No news articles found.
            </div>
          )}

          {/* News Grid */}
          {articles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {articles.map((article, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {article.urlToImage && (
                      <Image
                        src={article.urlToImage}
                        alt={article.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-md"
                        unoptimized
                      />
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                      <Link href={article.url} target="_blank">
                        Read More
                      </Link>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {articles.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalResults / 10)}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewsFeed;
