import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";

import Header from "components/Header";

import { PageWrapper } from "lib/style_layout";

// const MainLayoutRoot = styled.div`
//     ${({ theme }) => {
//         return css`
//             background-color: ${theme.colors.bg};
//             display: flex;
//             width: 100%;
//             height: 100%;
//             overflow: hidden;
//             justify-content: center;
//             flex-direction:column;
//         `;
//     }}
// `;

const MainLayoutRoot = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;
	justify-content: center;
	flex-direction: column;
`;

const MainLayoutWrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	min-height: 65vh;
`;

const MainLayout = () => (
	<MainLayoutRoot>
		<Header />
		<MainLayoutWrapper>
			<PageWrapper>
				<Outlet />
			</PageWrapper>
		</MainLayoutWrapper>
	</MainLayoutRoot>
);

export default MainLayout;
