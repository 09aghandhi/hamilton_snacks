import { Component } from 'solid-js';
import { styled } from 'solid-styled-components';

const StyledFooter = styled('footer')`
  background: var(--background-lighter);
  text-align: center;
  padding: 0.2rem 0;
  opacity: 0.8;
  a {
    color: var(--primary);
    font-weight: bold;
    text-decoration: none;
    margin: 0 2px;
    padding: 0 2px;
    border-radius: 3px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: var(--foreground);
      background: var(--primary-darker);
    }
  }
`;


const Footer: Component = () => {

  const footerContent = {
    appName: 'Snack Champion',
    appUrl: '/about',
    githubUrl: 'https://github.com/09aghandhi/hamilton_snacks',
    developer: 'Alicia Sykes / Atul Ghandhi',
    developerUrl: 'https://atul.uk',
    licenseDate: new Date().getFullYear(),
  };

  return (
    <StyledFooter>
      <a href={footerContent.appUrl}>{footerContent.appName}</a> is
      <a href={footerContent.developerUrl}>{footerContent.developer}</a> {footerContent.licenseDate} |
      Source code available on <a href={footerContent.githubUrl}>GitHub</a>.
    </StyledFooter>
  );
};

export default Footer;
