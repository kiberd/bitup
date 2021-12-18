import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    // position: fixed;
    align-items: center;
    // justify-content: center;
    height: 5vh;
    width: 100%;
    // top: 0px;
    // left: 0px;
    // z-index: 5;

    /* 색상 */
    background: black;
    color: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 0;
  // margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  text-align: center;
  text-decoration: none;
`;


function Header(props) {

    return (
        <Wrapper>

            {/* <Switch
                // checked={props.darkMode}
                // onChange={props.onToggleTheme}
                // name="checkedB"
                // color="primary"
            />  */}

            
            <StyledLink to="/">Dashboard</StyledLink>
            <StyledLink to="/mypage">MyPage</StyledLink>
            <StyledLink to="/news">CoinNews</StyledLink>



        </Wrapper>
    )
}


export default Header;