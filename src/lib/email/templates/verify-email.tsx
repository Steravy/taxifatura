import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface VerifyEmailProps {
    userName: string,
    verifyEmailLink?: string;
}

export const VerifyEmailTemplate = ({
    userName,
    verifyEmailLink,
}: VerifyEmailProps) => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Verificar email da Candidocs</Preview>
                <Container style={container}>
                    <Img
                        src={`https://raw.githubusercontent.com/Steravy/cloud-provider/refs/heads/main/candidocs-email-logo.png`}
                        width="40"
                        height="33"
                        alt="Dropbox"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        style={image as any}
                    />
                    <Section>
                        <Text style={text}>Olá {userName},</Text>
                        <Text style={text}>
                            Obrigado por se registar no {" "} <Link href='http://candidocs.cv' className="text-blue-600 no-underline">
                                Candidocs
                            </Link>!
                            Por favor, verifique o seu endereço de e-mail para concluir o seu registo e proteger a sua conta.
                        </Text>
                        <Button style={button} href={verifyEmailLink}>
                            Verificar e-mail
                        </Button>
                        <Text style={text}>
                            Se não criou uma conta no {" "}
                            <Link href='http://candidocs.cv' className="text-blue-600 no-underline">
                                Candidocs
                            </Link>, pode ignorar e eliminar esta mensagem com segurança.
                        </Text>
                        <Text style={text}>
                            Para manter a sua conta segura, não reencaminhe este e-mail para ninguém.
                        </Text>
                        <Text style={text}>Desejamos sucesso na sua procura de emprego!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

VerifyEmailTemplate.PreviewProps = {
    userName: 'Stefan',
    resetPasswordLink: 'http://candidocs.cv',
} as VerifyEmailProps;

export default VerifyEmailTemplate;

const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
};

const text = {
    fontSize: '16px',
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
};

const button = {
    backgroundColor: '#0ea5e9',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '210px',
    padding: '14px 7px',
};

const image = {
    width: '45px',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '8px',
};
