import { createContext } from 'react';
import { useQueries } from 'a/hooks/useQueries';
import Cookies from 'js-cookie';

export const UserContext = createContext({});

export function UserContextProvider({ children, ...props }) {
  const { data: userData } = useQueries({
    preUrlFix: 'https://pace-cf78acafe7b2.nevacloud.io/api/user/me',
    headers: { Authorization: `Bearer ${Cookies.get('user_token')}` },
  });

  return (
    <UserContext.Provider value={userData?.data || null} {...props}>
      {children}
    </UserContext.Provider>
  );
}
