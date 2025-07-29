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

interface ResetPasswordEmailProps {
    userName: string,
    resetPassWordEmailLink?: string;
}

export const ResetPasswordEmailTemplate = ({
    userName,
    resetPassWordEmailLink,
}: ResetPasswordEmailProps) => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Recuperar palavra-passe da Candidocs</Preview>
                <Container style={container}>
                    <Img
                        src={`https://raw.githubusercontent.com/Steravy/cloud-provider/refs/heads/main/candidocs-email-logo.png`}
                        width="40"
                        height="33"
                        alt="Dropbox"
                        style={image as any}
                    />
                    <Section>
                        <Text style={text}>Olá {userName},</Text>
                        <Text style={text}>
                            Alguém solicitou recentemente a alteração da palavra-passe da sua conta {" "}
                            <Link href='http://candidocs.cv' className="text-blue-600 no-underline">
                                Candidocs
                            </Link>.
                            Se foi você, pode definir uma nova palavra-passe aqui:
                        </Text>
                        <Button style={button} href={resetPassWordEmailLink}>
                            Alterar palavra-passe
                        </Button>
                        <Text style={text}>
                            Se não pretende alterar a sua palavra-passe ou não fez este pedido, basta ignorar e apagar esta mensagem.
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

ResetPasswordEmailTemplate.PreviewProps = {
    userName: 'Stefan',
    resetPasswordLink: 'http://candidocs.cv',
} as ResetPasswordEmailProps;

export default ResetPasswordEmailTemplate;

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
