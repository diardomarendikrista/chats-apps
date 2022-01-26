import styled, { css } from 'styled-components';
import { S_DEVICES_WIDTH } from 'config/utils/constant';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;

	@media (max-width: ${S_DEVICES_WIDTH}) {
		width: 100%;
	}
`;

export const ImageWrapper = styled.div`
	background-color: #465efc;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-weight: bold;
	font-size: 20px;
	border-radius: 100%;
	overflow: hidden;
	margin: 5px;
	cursor: default;

	${({ bgColor }) =>
		bgColor &&
		css`
			background-color: ${({ bgColor }) ? bgColor : "#465efc"};
		`}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		width: 50px;
		height: 50px;
		overflow: hidden;
	}
`;
