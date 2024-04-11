import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

type SideBarProviderProps = {
  children: ReactNode;
};

type SideBarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SideBarContext = createContext<SideBarContextType | null>(null);

export const useSideBarContext = () => {
  const value = useContext(SideBarContext);
  if (value === null) throw Error("Cannot use outside of SideBarProvider");
  return value;
};

const SideBarProvider = ({ children }: SideBarProviderProps) => {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  const isScreenSmall = () => {
    return window.innerWidth < 1024;
  };

  const toggle = () => {
    isScreenSmall()
      ? setIsSmallOpen(!isSmallOpen)
      : setIsLargeOpen(!isLargeOpen);
  };

  const close = () => {
    setIsLargeOpen(false);
    setIsSmallOpen(false);
  };

  return (
    <SideBarContext.Provider
      value={{ isLargeOpen, isSmallOpen, toggle, close }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
