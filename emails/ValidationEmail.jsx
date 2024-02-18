const React = require("react");
const {
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
} = require("@react-email/components");

require('dotenv').config();
const baseUrl = process.env.BASE_URL;

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
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
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

function ValidationEmail({ name, token }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`emails/go.jpg`}
            width="170"
            height="50"
            alt="go"
            style={logo}
          />
          <Text style={paragraph}>Bonjour {name},</Text>
          <Text style={paragraph}>
            Merci d'avoir créé un compte sur Coursemate ! Nous sommes ravis de vous accueillir dans notre communauté.<br />
            Avant de pouvoir profiter pleinement de votre compte, nous devons nous assurer de l'authenticité de votre adresse e-mail.<br /> 
            <br />
            Si vous n'avez pas créé de compte sur Coursemate, vous pouvez ignorer ce message.<br /> 
            Dans ce cas, veuillez noter que votre compte sera automatiquement supprimé dans un délai de 5 jours.<br />
            <br />
            Merci de faire partie de la famille Coursemate !<br />
            <br />
          </Text>
          <Section style={btnContainer}>
            <a style={button} href={`${baseUrl}/auth/account/email/validation?token=${token}`}>
              Activer mon compte
            </a>
          </Section>
          <Text style={paragraph}>
            Cordialement,
            <br />
            L'équipe Coursemate
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Copyright@Coursemate2024
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

module.exports = ValidationEmail;
