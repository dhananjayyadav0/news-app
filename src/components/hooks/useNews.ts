"use client";
import { useState, useEffect, useCallback } from "react";
import { newsService, Article } from "@/services/newsApi";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

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

  // Update URL without reloading
  const updateUrl = (params: { [key: string]: string | number }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value));
      else newParams.delete(key);
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  // Fetch News Function
  const fetchNews = useCallback(
    async (searchQuery?: string) => {
      try {
        setLoading(true);
        setError(null);

        const currentPage = Number(searchParams.get("page")) || page;
        const selectedCategory = searchParams.get("category") || category;
        const searchQueryText = searchQuery || searchParams.get("q") || query;

        let response;
        if (searchQueryText) {
          response = await newsService.searchNews(
            searchQueryText,
            currentPage,
            10
          );
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
          setArticles([]);
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [searchParams]
  );

  // Debounced Search to prevent unnecessary API calls
  const debouncedFetchNews = useCallback(
    debounce((searchQuery) => fetchNews(searchQuery), 500),
    []
  );

  // Handle Category Change
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
    setQuery("");
    updateUrl({ category: newCategory, page: 1, q: "" });
    fetchNews();
  };

  // Handle Search Change
  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery);
    setCategory("");
    setPage(1);
    updateUrl({ q: newQuery, page: 1, category: "" });
    debouncedFetchNews(newQuery);
  };

  // Handle Page Change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl({ page: newPage });
    fetchNews();
  };

  // Fetch News on Dependency Change
  useEffect(() => {
    fetchNews();
  }, []);

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
    setQuery: handleSearchChange,
    fetchNews,
  };
};

export default useNews;
