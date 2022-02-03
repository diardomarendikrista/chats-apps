import styled from 'styled-components';
import { S_DEVICES_WIDTH, M_DEVICES_WIDTH } from 'config/utils/constant';

export const Wrapper = styled.div`
	position: relative;
	width: 95%;
`;

export const RightSection = styled.div`
	position: relative;
	width: 100%;
	padding: 20px 20px 20px 20px;
	background-color: rgba(255, 255, 255, 0.65);
	box-shadow: 0px 4px 4px 0px gray;
	min-height: 85vh;
	/* border-radius: 0px 0px 5px 5px; */

	@media (max-width: ${M_DEVICES_WIDTH}) {
		width: 100%;
	}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		padding: 10px;
		width: 95%;
	}
`;

export const CardRoom = styled.div`
	border: solid 1px gray;
`;
