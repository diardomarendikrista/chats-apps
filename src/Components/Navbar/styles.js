import styled from 'styled-components';
import { S_DEVICES_WIDTH } from 'config/utils/constant';

export const Wrapper = styled.div`
	/* border: solid 1px black; */
	box-shadow: 0px 4px 4px 0px gray;
	width: 95%;
	padding: 10px;
	/* border-radius: 10px; */
	margin: 15px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #0dcaf0;

	@media (max-width: ${S_DEVICES_WIDTH}) {
		margin-top: 8px;
		width: 95%;
	}
`;

export const Title = styled.div`
	font-size: 20px;
	font-weight: bold;

	@media (max-width: ${S_DEVICES_WIDTH}) {
		font-size: 18px;
	}
`;

export const ProfilePicture = styled.div`
	width: 35px;
	height: 35px;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 4px;
`;

export const ProfileName = styled.div`
	color: ${({ bgColor }) => (bgColor ? bgColor : '#000000')};
	font-weight: bold;
	display: flex;

	.dropmenu {
		margin-left: 4px;
		transform: scaleY(0.5);
	}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		max-width: 90px;
		max-height: 30px;
		overflow: hidden;
	}
`;

export const MenuWrapper = styled.div`
	position: relative;
`;

export const Menu = styled.div`
	width: 100%;
	min-width: 140px;
	background: #fff;
	position: absolute;
	margin-top: 10px;
	right: 0px;
	border: solid 1px lightgray;
	border-radius: 4px;
	cursor: pointer;
	overflow: hidden;
	z-index: 1000;

	.submenu {
		padding: 10px;
		:hover {
			background: #b0e3ff;
		}
	}
`;
