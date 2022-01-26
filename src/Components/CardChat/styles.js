import styled, { css } from 'styled-components';

export const Card = {
	Wrapper: styled.div`
		display: inline-block;
		padding: 5px 20px;
		background-color: #f0f1f5;
		border-radius: 20px;

		.userName {
			color: ${({ bgColor }) => (bgColor ? bgColor : '#465efc')};
		}

		${({ self }) =>
			self &&
			css`
				background-color: #465efc;
				color: #fff;
				float: right;

				.userName {
					color: #fff;
				}
			`}
	`,
	Top: styled.div`
		display: flex;
		justify-content: space-between;
	`,
	Mid: styled.div``,
	Bot: styled.div`
		display: flex;
		justify-content: end;
		font-size: 12px;
		color: lightgray;
	`,
	DelMessage: styled.div`
		margin-left: 8px;
		color: red;
		font-size: 14px;
		cursor: pointer;
	`,
};
