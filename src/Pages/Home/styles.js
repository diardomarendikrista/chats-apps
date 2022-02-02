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
	box-shadow: 0px 0px 25px -4px gray;
	min-height: 85vh;
	border-radius: 10px;

	@media (max-width: ${M_DEVICES_WIDTH}) {
		width: 100%;
	}

	@media (max-width: ${S_DEVICES_WIDTH}) {
		width: 95%;
	}
`;

export const CardRoom = styled.div`
	border: solid 1px gray;
`