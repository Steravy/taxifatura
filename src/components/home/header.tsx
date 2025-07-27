import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Logo } from "../ui/logo";
import { cn } from "@/lib/utils";

const Header = () => {
    return (
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <Logo />
                    <div className="flex items-center space-x-3">
                        <Link href="/demo" className={buttonVariants({ variant: "link" })}>
                            Ver Demonstração
                        </Link>
                        <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
                            Começar Agora
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;