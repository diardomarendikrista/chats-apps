import styled from 'styled-components';
import { S_DEVICES_WIDTH } from 'config/utils/constant';

export const Title = styled.div`
	/* border-bottom: solid 1px black; */
	box-shadow: 0px 0px 25px -4px gray;
	width: 95%;
	padding: 10px;
	border-radius: 10px;
	margin: 15px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: ${S_DEVICES_WIDTH}) {
		width: 95%;
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
`;
