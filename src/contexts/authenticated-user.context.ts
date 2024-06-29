import { Dispatch, SetStateAction, createContext } from "react";

export interface IAuthenticatedUserContext {
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
}

export const AuthenticatedUserContext = createContext<
  IAuthenticatedUserContext | undefined
>(undefined);
