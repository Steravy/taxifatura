import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo() {

  return (
    <div className={cn("flex items-center space-x-2")}>
      <div className={cn(
        "bg-gradient-to-r from-blue-600 to-cyan-600 rounded-md flex items-center justify-center size-8")}>
        <FileText className={cn("text-white size-5")} />
      </div>
      <span className={cn(
        "font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-xl")}>
        TaxiFatura
      </span>
    </div>
  );
}