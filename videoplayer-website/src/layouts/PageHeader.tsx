import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from "lucide-react";
import LuLuTube from "../assets/images/LuLuTube.png";
import { Button } from "../components/Button";
import { useSideBarContext } from "../contexts/SideBarContext";

export const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button
            onClick={() => setShowFullWidthSearch(true)}
            className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
            variant="default"
          >
            <Search />
          </Button>
        </div>

        <Button
          type="button"
          variant="default"
          size="icon"
          className="flex-shrink-0"
        >
          <Mic />
        </Button>
      </form>

      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          className="md:hidden"
          variant="ghost"
          size="icon"
        >
          <Search />
        </Button>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </div>
    </div>
  );
};

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export const PageHeaderFirstSection = ({
  hidden = false,
}: PageHeaderFirstSectionProps) => {
  const { toggle } = useSideBarContext();
  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <button>
        <Link to="/">
          <img src={LuLuTube} alt="Logo" className="h-10 w-auto" />
        </Link>
      </button>
    </div>
  );
};
