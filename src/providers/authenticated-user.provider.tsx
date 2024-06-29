import { ReactNode, useState } from "react";
import { AuthenticatedUserContext } from "../contexts/authenticated-user.context";

export default function AuthenticatedUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <AuthenticatedUserContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
