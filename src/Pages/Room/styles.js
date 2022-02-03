import styled, { css } from 'styled-components';
import { S_DEVICES_WIDTH, M_DEVICES_WIDTH } from 'config/utils/constant';

export const Wrapper = styled.div`
	position: relative;
	width: 95%;
`;

export const RightSection = styled.div`
	position: relative;
	width: 90%;
	padding: 0;
	/* background-color:rgba(255, 255, 255, 0.30); */
	box-shadow: 0px 4px 8px 0px gray;
	border-radius: 5px;
	overflow: hidden;

	@media (max-width: ${M_DEVICES_WIDTH}) {
		width: 87%;
	}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		width: 95%;
	}
`;

export const RightWrapper = styled.div`
	position: relative;
	padding: 0px 20px 60px 20px;
`

export const BtnLeftSection = styled.div`
	position: absolute;
	left: 10px;
	display: none;
	width: 40px;
	overflow: hidden;
	border-radius: 100%;

	@media (max-width: ${S_DEVICES_WIDTH}) {
		top: -5px;
		left: 0px;
		display: block;
		z-index: 2;
	}
`;

export const LeftSection = styled.div`
	position: absolute;
	left: 10px;
	height: 85vh;
	overflow: auto;
	width: 8%;
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		display: none;
	}

	${({ sidebar }) =>
		sidebar &&
		css`
			width: 8%;
		`}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		background-color: #cdceca;
		left: 0px;
		top: 40px;
		height: 70vh;
		z-index: 2;
		width: 0px;
		transition: all 0.2s;

		.title {
			display: block;
		}

		${({ sidebar }) =>
			sidebar &&
			css`
				width: 80px;
				border-radius: 10px;
				transition: all 0.2s;
			`}
	}
`;

export const MessageWrapper = styled.div`
	height: 70vh;
	overflow: auto;
	margin: 18px 0px 10px 0px;
`;

export const CardWrapper = styled.div`
	width: 100%;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;

	${({ self }) =>
		self &&
		css`
			align-items: end;
		`}
`;

export const InfoBox = styled.div`
	position: relative;
	width: 100%;
	top: 0px;
	left: 0px;
	display: flex;
	padding: 5px 20px;
	background: rgb(195, 234, 255);
	background: linear-gradient(
		90deg,
		rgba(195, 234, 255, 1) 0%,
		rgba(0, 164, 255, 1) 100%
	);
	overflow-x: hidden;
	height: 35px;

	.back {
		position: sticky;
		top: 0px;
	}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		padding-left: 40px;
	}
`;

export const ReplyBox = styled.div`
	position: absolute;
	width: 100%;
	padding-right: 50px;
	bottom: 20px;
	display: flex;
`;

export const NoLogin = styled.div`
	position: absolute;
	width: 100%;
	padding-right: 50px;
	bottom: 20px;
	display: flex;
	justify-content: center;
`;

export const NotFound = styled.div`
	height: 75vh;
`;
