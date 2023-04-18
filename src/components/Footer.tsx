import { StyledFooter } from "@/styles/styledComponents";

const Footer: React.FC = () => {

  return (
    <StyledFooter>
      <p>&copy; {new Date().getFullYear()} My Portfolio Site</p>
    </StyledFooter>
  );
};

export default Footer;
