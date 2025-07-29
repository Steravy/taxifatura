import { resend } from "./resend";
import ReceiptEmailTemplate, { ReceiptEmailTemplateProps } from "./templates/email-receipt";
import ResetPasswordEmailTemplate from "./templates/reset-password";
import VerifyEmailTemplate from "./templates/verify-email";

const emailFrom = process.env.EMAIL_FROM!;

type SendEmailVerification = {
    name: string,
    to: string,
    url: string,
}

type PasswordResetEmail = {
    name: string,
    to: string,
    url: string,
}

type SendReceiptEmail = ReceiptEmailTemplateProps & { receiptIssuerMail: string };

export const sendReceiptEmail = async (receiptData: SendReceiptEmail) => {
    const { username, downloadLink, trip, vehicle, receiptIssuerMail } = receiptData;

    await resend.emails.send({
        from: emailFrom,
        to: receiptIssuerMail,
        subject: "Seu recibo digital está pronto!",
        react: ReceiptEmailTemplate({ username, downloadLink, trip, vehicle })
    });
}

export const sendVerificationEmail = async (emailVerificationData: SendEmailVerification) => {
    const { to, url, name } = emailVerificationData;

    await resend.emails.send({
        from: emailFrom,
        to,
        subject: "Verifique o seu endereço de e-mail",
        react: VerifyEmailTemplate({ userName: name, verifyEmailLink: url })
    });
};



export const sendPasswordResetEmail = async (passwordResetEmail: PasswordResetEmail) => {

    const { to, url, name } = passwordResetEmail;

    await resend.emails.send({
        from: emailFrom,
        to,
        subject: "Alterar palavra-passe",
        react: ResetPasswordEmailTemplate({ userName: name, resetPassWordEmailLink: url })
    });
};