import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';

export interface ReceiptEmailTemplateProps {
    username: string;
    downloadLink: string;
    trip: string;
    vehicle: string | null;
}

const baseUrl = process.env.BETTER_AUTH_URL
    ? process.env.BETTER_AUTH_URL.trim()
    : `https://taxifatura.cv`;

export const ReceiptEmailTemplate = ({
    username,
    downloadLink,
    trip,
    vehicle
}: ReceiptEmailTemplateProps) => (
    <Html>
        <Head />
        <Body style={main}>
            <Preview>
                FaxiFatura - O seu recibo digital esta pronto!
            </Preview>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/logo.png`}
                    width="32"
                    height="32"
                    alt="Github"
                />

                <Text style={title}>
                    <strong>{username}</strong>, o seu recibo digital está pronto!
                </Text>

                <Section style={section}>
                    <Text style={text}>
                        Olá <strong>{username}</strong>!
                    </Text>
                    <Text style={text}>
                        Clique no botão abaixo para baixar o seu recibo digital da viagem:
                        <br />
                        Trajecto: <strong>{trip}</strong>
                        {
                            vehicle && (<>
                                <br />
                                Veículo: <strong>{vehicle}</strong>
                            </>)
                        }
                    </Text>

                    <br />

                    <Link href={downloadLink} style={button}>Baixe aqui</Link>
                </Section>
                {/* <Text style={links}>
                    <Link style={link}>Your security audit log</Link> ・{' '}
                    <Link style={link}>Contact support</Link>
                </Text> */}

                <Text style={footer}>
                    TaxiFatura é um serviço de emissão de recibos digitais para viagens de táxi em Cabo Verde.
                    Se você não solicitou este recibo, por favor ignore.
                </Text>
            </Container>
        </Body>
    </Html>
);

ReceiptEmailTemplate.PreviewProps = {
    username: 'Stefan Vitoria',
} as ReceiptEmailTemplateProps;

export default ReceiptEmailTemplate;

const main = {
    backgroundColor: '#ffffff',
    color: '#24292e',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px 0 48px',
};

const title = {
    fontSize: '24px',
    lineHeight: 1.25,
};

const section = {
    padding: '24px',
    border: 'solid 1px #dedede',
    borderRadius: '5px',
    textAlign: 'center' as const,
};

const text = {
    margin: '0 0 10px 0',
    textAlign: 'left' as const,
};

const button = {
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    lineHeight: 1.5,
    borderRadius: '0.5em',
    padding: '12px 24px',
};

// const links = {
//     textAlign: 'center' as const,
// };

// const link = {
//     color: '#0366d6',
//     fontSize: '12px',
// };

const footer = {
    color: '#6a737d',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '60px',
};
