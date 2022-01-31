import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Wrapper } from './styles';
import Swal from 'sweetalert2';

import axios from 'axios/axios';

export default function ModalDefault({ ...props }) {
	const [name, setName] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (name) {
				const saveData = {
					name,
				};
				setName('');

				const headers = {
					access_token: localStorage.getItem('access_token'),
				};
				const { data } = await axios.post(`/rooms`, saveData, { headers });

				Swal.fire('Berhasil', `Ruangan ${name} berhasil dibuat`, 'success');

				props.onHide();
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Harap isi nama ruangan',
				});
			}
		} catch (error) {
			console.log(error?.response, 'ERROR CREATE ROOM');
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${error?.response?.data?.detail?.message}`,
			});
		}
	};

	return (
		<Modal {...props} size="lg" centered backdrop="static">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<Wrapper>
					<div className="d-flex flex-column align-items-center mb-3">
						<h2>Ruangan Chat Baru</h2>
						Membuat ruang chat baru
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="form-group">
							<label htmlFor="name">Nama Ruangan</label>
							<input
								type="text"
								className="form-control"
								id="name"
								placeholder="Contoh: Ruangan Satu"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="d-flex justify-content-center mb-3 mt-3">
							<button type="submit" className="btn btn-primary me-2">
								Buat Ruangan Baru
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
