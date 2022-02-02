import { Wrapper } from './styles';
import { useNavigate } from 'react-router-dom';

export default function ErrorNotFound({ text }) {
	const navigate = useNavigate();

	return (
		<Wrapper>
			{text ?? 'Halaman Tidak Ditemukan / Sudah Dihapus'}
			<div className="d-flex justify-content-center mt-3">
				<button
					className="btn btn-outline-secondary"
					onClick={() => navigate(`/`)}
				>
					Kembali
				</button>
			</div>
		</Wrapper>
	);
}
