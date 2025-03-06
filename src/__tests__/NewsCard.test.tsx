import { render, screen } from "@testing-library/react";
import NewsCard from "../components/NewsCard";

test("renders news card with title and description", () => {
  const mockArticle = {
    title: "Test News",
    description: "Test description",
    source: { id: "1" },
  };
  render(<NewsCard article={mockArticle} />);

  expect(screen.getByText("Test News")).toBeInTheDocument();
  expect(screen.getByText("Test description")).toBeInTheDocument();
});
