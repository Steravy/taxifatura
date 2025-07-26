import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
    return (
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                            <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            TaxiFatura
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link href="/demo">
                            <Button variant="outline" className="bg-transparent text-sm md:text-base">
                                Ver Demonstração
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-sm md:text-base px-4 md:px-6">
                                Começar Agora
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;