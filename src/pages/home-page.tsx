import NewsFeed from "@/components/news/news-feed";
import React, { Suspense } from "react";

function HomeSection() {
  return (
    <div>
      <Suspense fallback={<div>Loading news...</div>}>
        <NewsFeed />
      </Suspense>
    </div>
  );
}

export default HomeSection;
