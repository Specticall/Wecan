import { TMood } from "@/context/MoodContext";

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
  lastLogin: Date;
  mood: "Ecstatic" | "Happy" | "Neutral" | "Sad" | "Depressed" | "Unknown";
  name: string;
  password: string | null;
  streak: number;
  token: string;
  hasCreatedDiaryToday: boolean;
  point: TPoint;
  unannouncedExpiredTaskCount: number;
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
  status: "Completed" | "OnGoing";
  mood: TMood | "Unknown";
  createdAt: string;
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
  status: "OnGoing" | "Completed";
  mood: TMood | "Unknown";
};

export type TDeletionBatch = {
  count: number;
};
