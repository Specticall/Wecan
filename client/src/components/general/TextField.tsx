import clsx from "clsx";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type TDetailedClassName = {
  container?: string;
  input?: string;
};

type TTextFieldProps = {
  errorMessage?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  onErrorClassName?: TDetailedClassName;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type TTextFieldContextValues = {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

/*
We're using context to notify the parent `<TextField/>` component whenever a child contains an error component.
*/
const TextFieldContext = createContext<TTextFieldContextValues | null>(null);

/**
 * Text Field Component with built in label and error display
 *
 * @description Error State occurs when a `<TextFieldError/>` is present with string as its children. The first children will be placed BEFORE the input element while the second and beyond will be AFTER the input element. In most use cases, we would use `<TextFieldLabel/>` as the first element then a conditional `<TextFieldError/>` as the second.
 *
 * @param onErrorClassName className applied to `<input/>` whenever an error occurs
 * @param containerClassName className applied to the container `<div/>` of the component
 *
 * @example
 * // Usage with react-hook-form
 * <TextField
    {...register("username", { required: "Field can't be empty" })}
    placeholder="Jack Marteen"
    containerClassName="mt-6"
   >
     <TextFieldLabel>Name</TextFieldLabel>
     <TextFieldError>{errors.username?.message}</TextFieldError>
   </TextField> 
 */
export const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  function (
    { className, children, onErrorClassName, containerClassName, ...props },
    ref
  ) {
    // Error State
    const [isError, setIsError] = useState(false);

    /*
    Whenever a react children elements contains more than element, it becomes an array and whenever it's not it will be returned as a plain object. The following code mitigates this and will always return an array of children no matter the length.   
    */
    const childrenArray = useMemo(
      () => (Array.isArray(children) ? children : [children]),
      [children]
    );

    return (
      <TextFieldContext.Provider value={{ setIsError }}>
        <div
          className={twMerge(
            containerClassName,
            isError && onErrorClassName?.container
          )}
        >
          {/* The following code (and the one at the bottom) revolving childrenArray make sure that the first children element will always be placed BEFORE the `<input/>` element. This is because labels are usually placed on top while error messages and warnings and placed below */}
          {childrenArray[0]}
          <input
            {...props}
            ref={ref}
            className={twMerge(
              clsx(
                "outline-slate-400 outline-[1px] rounded-md px-4 py-3 w-full outline-none focus:outline-2 focus:outline-slate-600 text-[0.875rem] mt-3",
                isError && "outline-2 outline-red-500",
                className
              ),
              clsx(isError && onErrorClassName?.input)
            )}
            style={{ transition: "outline 25ms" }}
          />
          {childrenArray.slice(1)}
        </div>
      </TextFieldContext.Provider>
    );
  }
);

export function TextFieldLabel({
  children,
  ...props
}: {
  children: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props}>{children}</label>;
}

export function TextFieldError({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLParagraphElement>) {
  const { setIsError } = useTextField();

  /*
  This effect is used to notify the parent component whether an error has been shown or hidden.
  */
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

// Utility function used to access the context.
function useTextField() {
  const context = useContext(TextFieldContext);
  if (!context)
    throw new Error(
      "Something wen't wrong with the accordiong component! (TextField Context is undefined)"
    );
  return context;
}
