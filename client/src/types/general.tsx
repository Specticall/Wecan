import { TMood } from "@/context/MoodContext";

export type TStatus = "OnGoing" | "Completed";

//eslint-disable-next-line
export type ExtractCVAVariants<T extends (...args: any) => unknown> =
  NonNullable<NonNullable<Parameters<T>[0]>["variant"]>;

export type TGoogleLoginResponse = {
  credential: string;
  select_by: string;
  clientId: string;
};

export type TUserData = {
  email: string;
  id: string;
  pictureURL?: string;
  password: string | null;
  token: string;
  lastLogin: Date;
  mood: "Ecstatic" | "Happy" | "Neutral" | "Sad" | "Depressed" | "Unknown";
  name: string;
  selectedBackgroundURL: string;

  diaryStreak: number;

  // DEPRECATED
  streak: number;

  // Flags
  hasOnGoingGoal: boolean;
  hasOnboarded: boolean;
  hasSetMoodToday: boolean;
};

export type TPoint = {
  earnedOverall: number;

  earnedToday: number;
  targetToday: number;

  userId: string;
  id: string;
};

export type TUserLoginResponse = {
  token: string;
  userData: TUserData;
  status: "success" | "error";
};

export type TServerSucessResponse<T> = {
  status: "success" | "fail";
  data: T;
};

export type TGeneratedTask = {
  id: string;
  points: number;
  title: string;
  description: string;
  mood: TMood | "Unknown";
};

export type TUserTask = {
  id: string;
  userId: string;
  points: number;
  title: string;
  description: string;
  status: TStatus;
  mood: TMood | "Unknown";
  createdAt: string;
  completedAt?: string;
};

export type TTask = {
  id: string;
  title: string;
  points: number;
  description: string;
};

export type TTaskRequest = {
  description: string;
  points: number;
  title: string;
  status: TStatus;
  mood: TMood | "Unknown";
};

export type TDeletionBatch = {
  count: number;
};

export type TGoal = {
  id: string;
  target: number;
  earned: number;
  createdAt: string;
  status: "OnGoing" | "Completed";
  userId: string;
  taskCompleted: number;
  completionPercent: number;
  difficulty: "Easy" | "Medium" | "Hard";
  backgroundRewardId?: string;
  hasClaimedReward: boolean;
};

export type THistory = {
  id: string;
  date: string;
  status: TStatus;
  pointsEarned: number;
  taskCompleted: number;
  mood: TMood | "Unknown";
  completionPercent: number;
};

export type TBackground = {
  name: string;
  URL: string;
  id: string;
  tier: 1 | 2 | 3;
};

// Junction table between background and user background
export type TUserBackground = {
  id: string;
  userId: string;
  backgroundId: string;
};
