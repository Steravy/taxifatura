import * as z from "zod";

enum BetterAuthErrorCode {
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',
    EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED'
};

export const passwordSchema = z
    .string()
    .min(12, 'A senha deve ter no mínimo 12 caracteres')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial');

const signupFormSchema = z.object({
    name: z
        .string({ required_error: 'O nome é obrigatório.', invalid_type_error: 'O nome deve ser um texto.' })
        .min(1, 'O nome é obrigatório.')
        .min(8, 'O nome deve ter pelo menos 8 caracteres.'),

    email: z
        .string({ required_error: 'O email é obrigatório.', invalid_type_error: 'O email deve ser um texto.' })
        .email('O email deve ser válido.'),

    password: passwordSchema
});

type SignupFormSchema = z.infer<typeof signupFormSchema>;

const loginFormSchema = z.object({
    email: z
        .string({ required_error: 'O email é obrigatório.', invalid_type_error: 'O email deve ser um texto.' })
        .email('O email deve ser válido.'),

    password: z
        .string({ required_error: 'A palavra-passe é obrigatória.', invalid_type_error: 'A palavra-passe deve ser um texto.' })
        .min(8, 'A palavra-passe deve ter pelo menos 8 caracteres.')
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'As senhas não coincidem',
    });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const forgetPasswordSchema = z.object({
    email: z
        .string({ required_error: 'O email é obrigatório.', invalid_type_error: 'O email deve ser um texto.' })
        .email('O email deve ser válido.'),
});

type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export {
    signupFormSchema,
    type SignupFormSchema,
    loginFormSchema,
    type LoginFormSchema,
    resetPasswordSchema,
    type ResetPasswordSchema,
    forgetPasswordSchema,
    type ForgetPasswordSchema,
    BetterAuthErrorCode
};
