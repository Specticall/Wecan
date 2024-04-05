import clsx from "clsx";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { twMerge } from "tailwind-merge";

type TDetailedClassName = {
  container?: string;
  input?: string;
};

type TPasswordFieldProps = {
  errorMessage?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  onErrorClassName?: TDetailedClassName;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type TPasswordContextValues = {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordContext = createContext<TPasswordContextValues | null>(null);

export const PasswordField = forwardRef<HTMLInputElement, TPasswordFieldProps>(
  function (
    { className, children, onErrorClassName, containerClassName, ...props },
    ref
  ) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [isError, setIsError] = useState(false);
    const childrenArray = useMemo(
      () => (Array.isArray(children) ? children : [children]),
      [children]
    );

    return (
      <PasswordContext.Provider value={{ setIsError }}>
        <div
          className={twMerge(
            containerClassName,
            isError && onErrorClassName?.container
          )}
        >
          {childrenArray[0]}
          <div className="relative mt-3">
            <input
              {...props}
              ref={ref}
              type={passwordShown ? "text" : "password"}
              className={twMerge(
                clsx(
                  "outline-slate-400 outline-[1px] rounded-md px-4 py-3 w-full outline-none focus:outline-2 focus:outline-slate-600 text-[0.875rem]",
                  isError && "outline-2 outline-red-500",
                  className
                ),
                clsx(isError && onErrorClassName?.input)
              )}
              style={{ transition: "outline 25ms" }}
            />
            <div
              onClick={() => setPasswordShown((cur) => !cur)}
              className="absolute right-[1rem] top-[50%] translate-y-[-50%] [&>*]:w-[1.25rem] [&>*]:cursor-pointer [&>*]:hover:opacity-50 [&>*]:transition-all [&>*]:duration-200"
            >
              {passwordShown ? <HiddenIcon /> : <ShownIcon />}
            </div>
          </div>
          {childrenArray.slice(1)}
        </div>
      </PasswordContext.Provider>
    );
  }
);

export function PasswordFieldLabel({
  children,
  ...props
}: {
  children: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props}>{children}</label>;
}

export function PasswordFieldError({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLParagraphElement>) {
  const { setIsError } = usePassword();

  useEffect(() => {
    if (children && typeof children !== "string")
      throw new Error(
        "Password Field Error must only have string as its children!"
      );
    setIsError(children ? (children as string).length > 0 : false);
  }, [children, setIsError]);

  return (
    <p
      {...props}
      className={twMerge(
        "mt-2 text-red-500 text-end text-[0.75rem]",
        className
      )}
    >
      {children}
    </p>
  );
}

function ShownIcon({ color = "rgba(55, 55, 55, 1)" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path>
    </svg>
  );
}

function HiddenIcon({ color = "rgba(55, 55, 55, 1)" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path>
      <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
    </svg>
  );
}

function usePassword() {
  const context = useContext(PasswordContext);
  if (!context)
    throw new Error(
      "Something wen't wrong with the accordiong component! (Password Context is undefined)"
    );
  return context;
}
