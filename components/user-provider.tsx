import { User as UserInterface } from "@/interfaces/user";
import { processResponse } from "@/lib/response-process";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface UserContextType {
  user: UserInterface;
  appLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: {
    _id: "",
    username: "",
    email: "",
    role: "",
    profile: {
      settings: {
        theme: "",
        language: "",
      },
      name: "",
      avatar: "",
      bio: "",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  appLoading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    role: "",
    profile: {
      settings: {
        theme: "",
        language: "",
      },
      name: "",
      avatar: "",
      bio: "",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [appLoading, setAppLoading] = useState(true);

  const fetchUserData = async () => {
    setAppLoading(true);
    const res = await fetch("/api/user/profile");
    const response = await processResponse(res, {
      success: false,
      error: false,
    });

    if (response.success) {
      setUser(response.data);
    } else {
      setUser({
        _id: "",
        username: "",
        email: "",
        role: "",
        profile: {
          settings: {
            theme: "",
            language: "",
          },
          name: "",
          avatar: "",
          bio: "",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    setAppLoading(false);
  };

  useEffect(() => {
    fetchUserData().then(() => {});
  }, []);

  return (
    <UserContext.Provider value={{ user, appLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
