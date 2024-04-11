import { useState } from "react";
import CategoryPills from "../components/CategoryPills";
import { categories, videos } from "../data/home";
import { PageHeader } from "../layouts/PageHeader";
import VideoGridItem from "../components/VideoGridItem";
import SideBar from "../layouts/SideBar";
import SideBarProvider from "../contexts/SideBarContext";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SideBarProvider>
      <div className="max-h-screem flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-l overflow-auto">
          <div>
            <SideBar />
          </div>
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SideBarProvider>
  );
};

export default HomePage;
