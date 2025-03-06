import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface AlertProps {
  variant?: "default" | "destructive";
  children: ReactNode;
}

export const Alert = ({ variant = "default", children }: AlertProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border p-4",
        variant === "destructive"
          ? "border-red-500 bg-red-100 text-red-700"
          : "border-gray-300 bg-gray-100 text-gray-700"
      )}
    >
      <AlertCircle className="h-5 w-5" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

interface AlertTitleProps {
  children: ReactNode;
}

export const AlertTitle = ({ children }: AlertTitleProps) => {
  return <h4 className="font-semibold">{children}</h4>;
};

interface AlertDescriptionProps {
  children: ReactNode;
}

export const AlertDescription = ({ children }: AlertDescriptionProps) => {
  return <p className="text-sm">{children}</p>;
};
