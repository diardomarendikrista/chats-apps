import styled, { css } from 'styled-components';
import { S_DEVICES_WIDTH, M_DEVICES_WIDTH } from 'config/utils/constant';

export const Wrapper = styled.div`
	position: relative;
	width: 95%;
`;

export const RightSection = styled.div`
	position: relative;
	width: 90%;
	padding: 20px 20px 60px 20px;
	box-shadow: 0px 0px 25px -4px gray;
	border-radius: 10px;

	@media (max-width: ${M_DEVICES_WIDTH}) {
		width: 87%;
	}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		width: 95%;
	}
`;

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
	height: 75vh;
	overflow: auto;
	margin-bottom: 10px;
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
