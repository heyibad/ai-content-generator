import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

export const KoalaWelcomeEmail = ({
    username ="ibad",
    verifyCode="087655",
    url
}: {
    username: string;
    verifyCode: string;
    url: string;
}) => (
    <Html>
        <Head />
        <Preview>
            The sales intelligence platform that helps you uncover qualified
            leads.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`/logo.svg`}
                    width="100"
                    height="70"
                    alt="Koala"
                    style={logo}
                />
                <Text style={paragraph}>Hi {username},</Text>
                <Text style={paragraph}>
                    Welcome to Ai Content Generator App, the content generation
                    platform that helps you uncover qualified content and
                    faster.
                </Text>
                <Section style={{color:"black",marginBottom:"20px",alignItems:"center", fontSize:"2rem", display:"flex", justifyContent:"center", fontWeight:"700", letterSpacing:"10px"}}>
                    {verifyCode}

                </Section>
                <Section style={btnContainer}>
                    <Button style={button} href={`${url}/${verifyCode}`}>
                        Verify
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The Ai Content Generator Team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    Thank you for registering. Please use the following
                    verification code to complete your registration
                </Text>
            </Container>
        </Body>
    </Html>
);


export default KoalaWelcomeEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "15px auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#4a4a4a",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
