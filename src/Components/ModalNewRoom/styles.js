import styled from "styled-components";
import { S_DEVICES_WIDTH } from "config/utils/constant";

export const Wrapper = styled.div`
  width: 100%;

	@media (max-width: ${S_DEVICES_WIDTH}) {
		width: 95%;
	}
`;