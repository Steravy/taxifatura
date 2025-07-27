"use client";

import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"

import { FileText, Loader2 } from "lucide-react"
import { cn, getAuthErrorMessage } from "../../lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { authClient } from "../../lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupFormSchema, SignupFormSchema } from "./schemas";


export function SignUpForm() {

    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<SignupFormSchema>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }

    })

    const onSubmit = async (values: SignupFormSchema) => {
        try {
            console.log(values);

            const { email, name, password } = values;

            await authClient.signUp.email({
                email, // user email address
                password, // user password -> min 8 characters by default
                name, // user display name
                // callbackURL: "/resume-builder" // A URL to redirect to after the user verifies their email (optional)
            }, {
                onRequest: () => {
                    //show loading
                    setIsSigningUp(true);
                },
                onSuccess: () => {
                    setIsSigningUp(false);
                    // router.push('/complete-profile');
                    router.push('/dashboard');
                    //redirect to the dashboard or sign in page
                },
                onError: (ctx) => {
                    // display the error message
                    setIsSigningUp(false);
                    const message = getAuthErrorMessage(ctx.error)
                    toast.error(message)
                },
            });

        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Ocorreu um erro. Tente novamente mais tarde.");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6")}>
            <div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Link
                            href="/"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="sr-only">TaxiFatura</span>
                        </Link>
                        <h1 className="text-xl font-bold">Bem-vindo a TaxiFatura</h1>
                        <p className="text-sm text-muted-foreground">Crie a sua conta para usar os nossos serviços.</p>
                        <div className="text-center text-xs text-muted-foreground">
                            Já tem uma conta?{" "}
                            <Link href="/login" className="underline underline-offset-4">
                                Entrar.
                            </Link>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Jane Doe"
                                                type="text"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="info@candidocs.cv"
                                                type="email"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="******"
                                                type="password"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isSigningUp}
                                className="text-white"
                                type="submit"
                            >
                                <span className="flex items-center justify-center gap-1">
                                    {isSigningUp && <Loader2 size={16} className="animate-spin mr-2" />}
                                    <span className="flex items-center justify-center gap-1">
                                        <span>{isSigningUp ? "Criando conta" : "Criar conta"}</span>
                                    </span>
                                </span>

                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                Ao clicar em continuar, concorda com os nossos <a href="#" className="underline">Termos de Serviço</a>{" "}
                e <a href="#" className="underline">Política de Privacidade.</a>.
            </div> */}
        </div>
    )
}
