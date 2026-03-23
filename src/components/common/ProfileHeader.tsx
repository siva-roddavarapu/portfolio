"use client";

import { useUser } from "@/modules/user/hooks/useUser";

export const ProfileHeader = () => {
  const user = useUser();

  return (
    <div>
      <h1 className="text-xl font-bold text-text-primary">{user.name}</h1>

      <p className="text-text-secondary text-sm mt-2">{user.role}</p>
    </div>
  );
};
