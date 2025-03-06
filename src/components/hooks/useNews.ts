"use client";
import { useState, useEffect, useCallback } from "react";
import { newsService, Article } from "@/services/newsApi";
import { useRouter, useSearchParams } from "next/navigation";

const useNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams() || new URLSearchParams();

  // Memoize the fetchNews function
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const currentPage = Number(searchParams.get("page")) || page;
      const selectedCategory = searchParams.get("category") || category;
      const searchQuery = searchParams.get("q") || query;

      let response;
      if (searchQuery) {
        response = await newsService.searchNews(searchQuery, currentPage, 10);
      } else {
        response = await newsService.getTopHeadlines(
          currentPage,
          10,
          selectedCategory
        );
      }

      if (response.articles) {
        setArticles(response.articles);
        setTotalResults(response.totalResults);
      } else {
        setError("No articles found.");
      }
    } catch (error) {
      console.error("Failed to fetch news", error);
      setError("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Update URL without reloading
  const updateUrl = (params: { [key: string]: string | number }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value));
      else newParams.delete(key);
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  // Handle Category Change
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
    setQuery("");
    updateUrl({ category: newCategory, page: 1, q: "" });
  };

  // Handle Search
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCategory("");
    setPage(1);
    updateUrl({ q: newQuery, page: 1, category: "" });
  };

  // Handle Page Change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl({ page: newPage });
  };

  // Fetch News on Dependency Change
  useEffect(() => {
    fetchNews();
  }, [searchParams, fetchNews]);

  return {
    articles,
    loading,
    error,
    page,
    totalResults,
    category,
    query,
    setPage: handlePageChange,
    setCategory: handleCategoryChange,
    setQuery: handleSearch,
    fetchNews,
  };
};

export default useNews;
