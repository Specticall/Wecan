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
