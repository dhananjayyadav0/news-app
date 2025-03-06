import axios from "axios";

const NEWS_API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://newsapi.org/v2";
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "54349ed1b4cd442b8605e82c16608a70";

// Add caching mechanism
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const newsService = {
  async getTopHeadlines(
    page = 1,
    pageSize = 10,
    category = ""
  ): Promise<NewsResponse> {
    const cacheKey = `headlines-${category}-${page}-${pageSize}`;

    // Check cache first
    if (
      cache[cacheKey] &&
      Date.now() - cache[cacheKey].timestamp < CACHE_DURATION
    ) {
      return cache[cacheKey].data;
    }

    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
        params: {
          country: "us",
          page,
          pageSize,
          category: category || undefined,
          apiKey: API_KEY,
        },
      });

      // Update cache
      cache[cacheKey] = {
        data: response.data,
        timestamp: Date.now(),
      };

      return response.data;
    } catch (error) {
      console.error("Error fetching top headlines:", error);
      throw error;
    }
  },

  async searchNews(
    query: string,
    page = 1,
    pageSize = 10
  ): Promise<NewsResponse> {
    const cacheKey = `search-${query}-${page}-${pageSize}`;

    // Check cache first
    if (
      cache[cacheKey] &&
      Date.now() - cache[cacheKey].timestamp < CACHE_DURATION
    ) {
      return cache[cacheKey].data;
    }

    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
        params: {
          q: query,
          page,
          pageSize,
          apiKey: API_KEY,
        },
      });

      // Update cache
      cache[cacheKey] = {
        data: response.data,
        timestamp: Date.now(),
      };

      return response.data;
    } catch (error) {
      console.error("Error searching news:", error);
      throw error;
    }
  },

  async getArticleById(url: string): Promise<Article | null> {
    const cacheKey = `article-${url}`;

    // Check cache first
    if (
      cache[cacheKey] &&
      Date.now() - cache[cacheKey].timestamp < CACHE_DURATION
    ) {
      return cache[cacheKey].data;
    }

    try {
      // Since News API doesn't have a get-by-id endpoint, we'll search for the exact article
      // by its URL or match it from our cached data
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      const path = urlObj.pathname;

      // First check existing cache for this article
      for (const key in cache) {
        if (key.startsWith("headlines") || key.startsWith("search")) {
          const cachedData = cache[key].data as NewsResponse;
          const foundArticle = cachedData.articles.find(
            (article) => article.url === url
          );
          if (foundArticle) {
            // Update article cache
            cache[cacheKey] = {
              data: foundArticle,
              timestamp: Date.now(),
            };
            return foundArticle;
          }
        }
      }

      // If not found in cache, search for it
      const response = await this.searchNews(domain, 1, 20);
      const foundArticle = response.articles.find(
        (article) => article.url === url
      );

      if (foundArticle) {
        // Update article cache
        cache[cacheKey] = {
          data: foundArticle,
          timestamp: Date.now(),
        };
        return foundArticle;
      }

      return null;
    } catch (error) {
      console.error("Error fetching article:", error);
      return null;
    }
  },
};
