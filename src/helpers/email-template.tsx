import { Body, Button, Container, Head, Hr, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

 const EmailTemplate = ({ username, verifyCode, url }: { username: string; verifyCode: string; url: string; }) => (
  <Html>
      <Head />
      <Preview>
          The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body style={main}>
          <Container style={container}>
              
              {/* Embed SVG directly here */}
              <div style={logo}>
                <svg id="logo-79" className="gradient" width="100" height="70" viewBox="0 0 125 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="ccustom" d="M88.861 37.225c.759 0 1.208-.575 ..." fill="#E5708C"></path>
                  <path d="M118.481 2.149c0-1.183.959-2.143 2.142-2.143h1.429a2.142 ..." fill="url(#gradient_a1234)"></path>
                  <defs>
                    <linearGradient id="gradient_a1234" x1="0" y1="16" x2="119" y2="16" gradientUnits="userSpaceOnUse">
                      <stop className="ccompli1" stopColor="#64C2DB"></stop>
                      <stop className="ccompli2" offset=".307" stopColor="#7476ED"></stop>
                      <stop className="ccustom" offset=".604" stopColor="#C994DF"></stop>
                      <stop className="ccompli1" offset="1" stopColor="#E56F8C"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <Text style={paragraph}>Hi {username},</Text>
              <Text style={paragraph}>
                  Welcome to Ai Content Generator App, the content generation
                  platform that helps you uncover qualified content and faster.
              </Text>
              <Section style={{ color: "black", marginBottom: "20px", alignItems: "center", fontSize: "2rem", display: "flex", justifyContent: "center", fontWeight: "700", letterSpacing: "10px" }}>
                  {verifyCode}
              </Section>
              <Section style={btnContainer}>
                  <Button style={button} href={`${url}/verify/${verifyCode}`}>
                      Verify
                  </Button>
              </Section>
              <Text style={paragraph}>
                  Best,<br />
                  The Ai Content Generator Team
              </Text>
              <Hr style={hr} />
              <Text style={footer}>
                  Thank you for registering. Please use the following verification code to complete your registration
              </Text>
          </Container>
      </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "15px auto",
  textAlign: "center" as const,
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

export default EmailTemplate