import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 p-6 border border-red-300 bg-red-100 text-red-600 rounded-lg">
      <AlertCircle className="w-10 h-10 text-red-500" />
      <p className="font-semibold">{message}</p>
      {onRetry && (
        <Button variant="destructive" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
