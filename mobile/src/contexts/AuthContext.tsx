import React, { useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

import { api } from '../services/api';

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

interface RequestPostUsersProps {
  data: {
    token: string;
  };
}

interface RequestGetUserInfoProps {
  data: {
    user: UserProps;
  };
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '867437635628-2143ppf0dvhcv51nakagv4m9c786cv2s.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse: RequestPostUsersProps = await api.post(
        '/users',
        {
          access_token,
        },
      );

      if (tokenResponse.data.token) {
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${tokenResponse.data.token}`;

        const userInfoResponse: RequestGetUserInfoProps =
          await api.get('/me');

        setUser(userInfoResponse.data.user);
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (
      response?.type === 'success' &&
      response.authentication?.accessToken
    ) {
      signInWithGoogle(response.authentication.accessToken).then(
        () => {},
        () => {},
      );
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
