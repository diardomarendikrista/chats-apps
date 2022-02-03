import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from './styles';
import Swal from 'sweetalert2';

import axios from 'axios/axios';

export default function CardRoom({ room, netizen }) {
	const { profile } = useSelector((state) => state.user);

	const [localNetizen, setLocalNetizen] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleDeleteRoom = (e, id, name) => {
		e.stopPropagation();
		Swal.fire({
			title: `Yakin Hapus Ruangan ${name} ?`,
			text: 'Ruangan akan dihapus beserta SELURUH history chat didalamnya. Aksi ini tidak dapat dipulihkan kembali.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Hapus',
			cancelButtonText: 'Batal',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					setLoading(true);
					const headers = {
						access_token: localStorage.getItem('access_token'),
					};
					const { data } = await axios.delete(`/rooms/${id}`, { headers });

					if (data) {
						Swal.fire('Dihapus', 'chat berhasil dihapus', 'success');
					}
				} catch (error) {
					console.log(error, 'ERROR DEL ROOM');
				} finally {
					setLoading(false);
				}
			}
		});
	};

	// filter local netizen
	useEffect(() => {
		if (netizen) {
			const newLocalNetizen = netizen.filter((item) => {
				return item.room_id?.toString() === room?.id?.toString();
			});
			setLocalNetizen(newLocalNetizen);
		}
		// eslint-disable-next-line
	}, [netizen]);

	if (loading) return <div></div>;
	else
		return (
			<Card.Wrapper
				status={room.status}
				onClick={() => navigate(`/${room.id}`)}
			>
				<Card.InfoBox status={room.status}>
					{room.status ?? 'umum'}
				</Card.InfoBox>
				<Card.InnerWrapper>
					<div className="d-flex justify-content-between">
						<h3>{room.name}</h3>
						{(profile?.id === room?.User?.id || profile?.role === 'admin') && (
							<Card.Delete onClick={(e) => handleDeleteRoom(e, room.id, room.name)}>
								x
							</Card.Delete>
						)}
					</div>
					<Card.Description>{localNetizen?.length} online</Card.Description>
					<Card.Description>by: {room?.User?.name}</Card.Description>
				</Card.InnerWrapper>
			</Card.Wrapper>
		);
}
