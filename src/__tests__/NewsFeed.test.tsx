// import { render, screen, fireEvent } from "@testing-library/react";
// import NewsFeed from "@/components/news/news-feed";
// import useNews from "@/components/hooks/useNews";
// import { describe, it, expect, jest, beforeEach } from "@jest/globals";
// import "@testing-library/jest-dom";

// // Mock the useNews hook
// jest.mock("@/components/hooks/useNews", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     articles: [
//       {
//         title: "Test News",
//         description: "This is a test news description",
//         url: "https://example.com",
//         urlToImage: "https://via.placeholder.com/400",
//         publishedAt: "2024-07-29T12:00:00Z",
//       },
//     ],
//     loading: false,
//     error: null,
//     page: 1,
//     totalResults: 10,
//     category: "general",
//     query: "",
//     setPage: jest.fn(),
//     setCategory: jest.fn(),
//     setQuery: jest.fn(),
//     fetchNews: jest.fn(),
//   })),
// }));

// describe("NewsFeed Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders news articles correctly", () => {
//     render(<NewsFeed />);
//     expect(screen.getByText("Test News")).toBeInTheDocument();
//     expect(
//       screen.getByText("This is a test news description")
//     ).toBeInTheDocument();
//   });

//   it("calls fetchNews when search is submitted", () => {
//     render(<NewsFeed />);
//     const searchInput = screen.getByPlaceholderText("Search news");
//     fireEvent.change(searchInput, { target: { value: "React" } });
//     fireEvent.submit(searchInput.closest("form")!);

//     expect(useNews().fetchNews).toHaveBeenCalled();
//   });
// });
