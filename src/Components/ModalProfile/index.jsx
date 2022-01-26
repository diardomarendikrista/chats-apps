import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Wrapper } from './styles';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios/axios';
import { ws } from 'socket/ws';

export default function ModalProfile({ ...props }) {
	const { profile } = useSelector((state) => state.user);
	const [name, setName] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [color, setColor] = useState('#000000');

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (name) {
				const headers = {
					access_token: localStorage.getItem('access_token'),
				};
				const saveData = {
					name,
					profilePicture: photoUrl,
					color: color ?? '#000000',
				};
				const { data } = await axios.put(`/user/${profile.id}`, saveData, {
					headers,
				});
				if (data?.data) {
					// console.log(data, 'HASIL');
					dispatch({ type: 'refetchUser/setRefetchUser', payload: true });
					ws.emit('updateUser', data.data);
					Swal.fire({
						icon: 'success',
						title: 'Berhasil',
						text: 'Data profil berhasil diubah',
					});
				}
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Nama wajib diisi',
				});
			}
		} catch (error) {
			console.log(error?.response, 'ERROR');
		}
	};

	useEffect(() => {
		if (profile) {
			setName(profile.name ?? "");
			setPhotoUrl(profile.profilePicture ?? "");
			setColor(profile.color ?? '#000000');
		}
	}, [profile, props.show]);

	return (
		<Modal {...props} size="lg" centered backdrop="static">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<Wrapper>
					<div className="d-flex flex-column align-items-center mb-3">
						<h2>Ubah Profil</h2>
						Ubah data profil anda
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="form-group mb-2">
							<label htmlFor="name">Nama</label>
							<input
								type="text"
								className="form-control"
								id="name"
								aria-describedby="emailHelp"
								placeholder="Ketik nama"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="photo">Photo URL</label>
							<input
								type="text"
								className="form-control"
								id="photo"
								aria-describedby="emailHelp"
								placeholder="Contoh: https://photo.com/fotoku.jpg"
								value={photoUrl}
								onChange={(e) => setPhotoUrl(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="warna">Pilih Warna</label>
							<input
								type="color"
								className="form-control w-25"
								id="warna"
								aria-describedby="emailHelp"
								placeholder="Ketik warna"
								value={color}
								onChange={(e) => setColor(e.target.value)}
							/>
						</div>
						<div className="d-flex justify-content-center mt-3 mb-3">
							<button type="submit" className="btn btn-primary me-2">
								Ubah
							</button>
							<Button
								className="btn-secondary ps-3 pe-3"
								onClick={props.onHide}
							>
								Batal
							</Button>
						</div>
					</form>
				</Wrapper>
			</Modal.Body>
		</Modal>
	);
}
