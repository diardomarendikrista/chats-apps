import { Card } from './styles';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import axios from 'axios/axios';

export default function CardChat({ data }) {
	const { profile } = useSelector((state) => state.user);
	const rawTime = new Date(data?.createdAt);
	const time = moment(rawTime).format('LT');

	const deleteMessage = (id, room_id) => {
		console.log(id);
		Swal.fire({
			title: 'Hapus chat',
			text: 'Yakin hapus chat ini?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Hapus',
			cancelButtonText: 'Batal',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const headers = {
					access_token: localStorage.getItem('access_token'),
				};
				const { data } = await axios.delete(
					`/messages/${id}?room_id=${room_id}`,
					{ headers }
				);
				if (data) {
					Swal.fire('Dihapus', 'chat berhasil dihapus', 'success');
				}
			}
		});
	};

	return (
		<div>
			<Card.Wrapper
				self={profile?.id === data?.User.id}
				bgColor={data?.User?.color}
			>
				<Card.Top>
					<div className="userName">
						<b>{data?.User?.name}</b>
					</div>
					{(profile?.id === data?.User.id ||
						profile?.role === 'admin' ||
						profile?.role === 'moderator') && (
						<Card.DelMessage
							onClick={() => deleteMessage(data?.id, data?.room_id)}
						>
							x
						</Card.DelMessage>
					)}
				</Card.Top>
				<Card.Mid>{data?.message}</Card.Mid>
				<Card.Bot>{time ?? ''}</Card.Bot>
			</Card.Wrapper>
		</div>
	);
}
