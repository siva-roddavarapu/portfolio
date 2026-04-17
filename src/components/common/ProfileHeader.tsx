// src/components/common/ProfileHeader.tsx
"use client";

import { usePortfolio } from "@/modules/user/hooks/usePortfolio";
import { SplitName } from "../sections/hero/components/SplitName";

export const ProfileHeader = () => {
  const { firstName, lastName, role } = usePortfolio();

  return (
    <div>
      <h1 className="text-xl font-bold text-text-primary">
        {<SplitName text={firstName} scrambleSpeed={150}/>} <span className="text-text-secondary font-medium">{<SplitName text={lastName} scrambleSpeed={150}/>}</span>
      </h1>
      <p className="text-text-secondary text-sm mt-2"> {<SplitName text={role} scrambleSpeed={100}/>}</p>
    </div>
  );
};
