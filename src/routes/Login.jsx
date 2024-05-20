import styled from "styled-components"
import kakaoImage from "../assets/kakao_login.png";

const LoginBox = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  font-family: 'Bagel Fat One', cursive;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddf3fe;
  margin: 20px;
  padding: 50px 50px 200px 50px;
  border-radius: 15px;
`;

const Title = styled.div`
  font-size: 40px;
  color: #052133;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items:center;
`;
const SubTitle = styled.div`
  font-size: 16px;
  color: darkgray;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
`;

function Login() {
  const handleLogin = () => {
    // window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <LoginBox>  
      <LoginContainer>
      <Title>뽀송길</Title>
      <SubTitle>뽀송길에 오신걸 환영해요!</SubTitle>
      <img style={{cursor: "pointer" }}src={ kakaoImage } onClick={ handleLogin }></img>
    </LoginContainer>
    </LoginBox>
  );
}

export default Login