import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const Hero = () => {
    return (
        <section className="py-12 md:py-24 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center">
                    <Badge variant="secondary" className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium">
                        🚖 Especialmente para Taxistas de Cabo Verde
                    </Badge>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Profissionalize
                        </span>
                        <br />o Seu Negócio de Táxi
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto">
                        Emita faturas e recibos profissionais em segundos. Ganhe a confiança dos clientes, aumente os seus
                        rendimentos e faça crescer o seu negócio.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                        <Link href="/dashboard">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                            >
                                Começar Gratuitamente
                                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-transparent"
                            >
                                Ver Demonstração
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;