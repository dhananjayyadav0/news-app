"use client";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(); // Fetch news when searching
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pl-6">
        <h1 className="text-2xl font-bold">
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} News`
            : "Top Headlines"}
        </h1>
        <SearchBar
          query={query}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
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

      {/* Loader & Error Handling */}
      {loading && <SkeletonLoader />}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={fetchNews} // Remove the arguments
        />
      )}

      {/* News Grid */}
      {!loading && !error && articles.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {articles.map((article, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
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
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalResults / 10)}
        onPageChange={setPage}
      />
    </div>
  );
};

export default NewsFeed;
