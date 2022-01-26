import { Wrapper, ImageWrapper } from './styles';

export default function CardNetizen({ data }) {
	const twoLetter = (name) => {
		let nama = name.split(' ');
		if (nama.length > 1) {
			return `${nama[0][0]}${nama[nama.length - 1][0]}`;
		} else {
			return name[0];
		}
	};

	return (
		<Wrapper>
			<ImageWrapper bgColor={data.color}>
				{data?.profilePicture ? (
					<img src={data.profilePicture} alt={data.name} width="100%" />
				) : (
					<div>{twoLetter(data?.name)}</div>
				)}
			</ImageWrapper>
		</Wrapper>
	);
}
