import { ElementType, ReactNode, Children, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  Library,
  Repeat,
  Clapperboard,
  ChevronDown,
  ChevronUp,
  History,
  PlaySquare,
  Clock,
  ListVideo,
  Flame,
  ShoppingBag,
  Music2,
  Radio,
  Newspaper,
  Lightbulb,
  Podcast,
  Trophy,
  Film,
  Gamepad2,
  Shirt,
} from "lucide-react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { subscriptions, playlists } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

const SmallSideBarItem = ({ Icon, title, url }: SmallSideBarItemProps) => {
  return (
    <Link
      to={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </Link>
  );
};

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

const LargeSideBarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
};

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

const LargeSideBarItem = ({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) => {
  return (
    <Link
      to={url}
      className={twMerge(
        isActive
          ? "font-bold bg-neutral-100 hover:bg-secondary"
          : buttonStyles({
              variant: "ghost",
            }),
        "w-full flex items-center rounded-lg gap-4 p-3"
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  );
};

type LargeSideBarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

const SideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  const location = useLocation(); // Get the current location

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        }
        ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSideBarSection visibleItemCount={1}>
          <LargeSideBarItem
            isActive={location.pathname === "/"} // Set active if URL matches
            IconOrImgUrl={Home}
            title="Home"
            url="/"
          />
          <LargeSideBarItem
            isActive={location.pathname === "/subscriptions"}
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem
            isActive={location.pathname === "/library"}
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSideBarItem
            isActive={location.pathname === "/history"}
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSideBarItem
            isActive={location.pathname === "/your-videos"}
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSideBarItem
            isActive={location.pathname === "/playlist?list=WL"}
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSideBarItem
              key={playlist.id}
              title={playlist.name}
              IconOrImgUrl={ListVideo}
              url={`/playlist?list=${playlist.id}`}
              isActive={location.pathname === `/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSideBarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
              isActive={location.pathname === `/@${subscription.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
          <LargeSideBarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
            isActive={location.pathname === "/trending"}
          />
          <LargeSideBarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
            isActive={location.pathname === "/shopping"}
          />
          <LargeSideBarItem
            IconOrImgUrl={Music2}
            title="Music"
            url="/music"
            isActive={location.pathname === "/music"}
          />
          <LargeSideBarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
            isActive={location.pathname === "/movies-tv"}
          />
          <LargeSideBarItem
            IconOrImgUrl={Radio}
            title="Live"
            url="/live"
            isActive={location.pathname === "/live"}
          />
          <LargeSideBarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
            isActive={location.pathname === "/gaming"}
          />
          <LargeSideBarItem
            IconOrImgUrl={Newspaper}
            title="News"
            url="/news"
            isActive={location.pathname === "/news"}
          />
          <LargeSideBarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
            isActive={location.pathname === "/learning"}
          />
          <LargeSideBarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
            isActive={location.pathname === "/podcasts"}
          />
        </LargeSideBarSection>
      </aside>
    </>
  );
};

export default SideBar;
