import styled, { css } from 'styled-components';
import { S_DEVICES_WIDTH } from 'config/utils/constant';

export const Card = {
	Wrapper: styled.div`
		position: relative;
		min-width: 100px;
		max-width: 300px;
		border-radius: 10px;
		margin: 5px;
		cursor: pointer;
		overflow: hidden;
		-webkit-box-shadow: 0px 0px 5px 0px rgba(0, 204, 255, 0.75);
		-moz-box-shadow: 0px 0px 5px 0px rgba(0, 204, 255, 0.75);
		box-shadow: 0px 0px 5px 0px rgba(0, 204, 255, 0.75);
		transition: all 0.25s;

		:hover {
			-webkit-box-shadow: 0px 0px 8px 0px rgba(0, 204, 255, 1);
			-moz-box-shadow: 0px 0px 8px 0px rgba(0, 204, 255, 1);
			box-shadow: 0px 0px 8px 0px rgba(0, 204, 255, 1);
			background: #e0f9ff;
			transition: all 0.25s;
		}

		@media (max-width: ${S_DEVICES_WIDTH}) {
			width: 100%;
		}
	`,
	InnerWrapper: styled.div`
		padding: 10px;
	`,
	InfoBox: styled.div`
		position: relative;
		width: 100%;
		top: 0px;
		left: 0px;
		display: flex;
		padding: 5px 15px;
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

		${({ status }) =>
			status &&
			css`
				background: rgb(255, 195, 195);
				background: linear-gradient(
					90deg,
					rgba(255, 195, 195, 1) 0%,
					rgba(255, 0, 0, 1) 100%
				);
				color: #fff;
			`}

		@media (max-width: ${S_DEVICES_WIDTH}) {
			padding-left: 40px;
		}
	`,
	Title: styled.div``,
	Delete: styled.div`
		position: absolute;
		color: red;
		top: 0px;
		right: 10px;
	`,
	Description: styled.div`
		color: gray;
		font-size: 8px;
	`,
};
