import { useNavigate } from '@solidjs/router';
import { styled } from 'solid-styled-components';
import supabase from '../services/supabaseClient';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';

const SnackBot = styled('img')`
  position: absolute;
  bottom: 0;
  right: 1rem;
  transition: all 0.2s ease-in-out;
  width: 100px;
  z-index: 2;
  &:hover {
    transform: scale(1.1) translateY(-0.5rem) translateX(-0.25rem) rotate(-1deg);
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    console.log("signInWithGoogle function called");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error("Error during Google sign-in:", error.message);
      alert(error.message);
      return;
    }

    console.log("Google sign-in successful, checking session");

    // Wait for the session to be initialized
    let session = null;
    for (let i = 0; i < 5; i++) {
      console.log(`Attempt ${i + 1} to retrieve session`);
      const { data } = await supabase.auth.getSession();
      session = data.session;
      if (session) break;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before trying again
    }

    if (!session || !session.user) {
      console.error("No session or user found after sign-in");
      alert('User session could not be retrieved. Please try again.');
      return;
    }

    const user = session.user;
    console.log("User email:", user.email);

    const allowedDomain = 'and.digital';

    if (user.email && user.email.endsWith(`@${allowedDomain}`)) {
      console.log("Email domain is allowed, navigating to home page");
      navigate('/');
    } else {
      console.warn("Email domain is not allowed, signing out user");
      await supabase.auth.signOut();
      alert('You must use an email ending in @and.digital to sign in.');
    }
  };

  const styles = `
    .intro {
      font-family: 'PoppinsBold', sans-serif;
      font-size: 2rem;
      margin: 0;
    }
    .line-2 {
      font-size: 1.5rem;
    }
    .what {
      margin: 0.5rem 0;
      font-style: italic;
      font-size: 0.8rem;
      opacity: 0.8;
    }
    .login-wrapper {
      max-width: 800px;
      margin: 2rem auto;
      text-align: center;
      flex: 1;
    }
  `;

  return (
      <>
        <style>{styles}</style>
        <div class="login-wrapper">
          <Card>
            <p class="intro">Ready for a Snack?</p>
            <p class="intro line-2">A quick login and you're on the snack attack track!</p>
            <p class="what">Securely authenticate with your company SSO in order to put in snack requests</p>
            <Button onClick={signInWithGoogle} size="large">Let's Go!</Button>
            <SnackBot width="180" src="/snack-champ-bot.png" title="Hello World 👋" />
          </Card>
        </div>
      </>
  );
};

export default LoginPage;
