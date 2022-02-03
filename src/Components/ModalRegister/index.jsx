import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Wrapper } from './styles';
import Swal from 'sweetalert2';

import axios from 'axios/axios';

export default function ModalRegister({ ...props }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [color, setColor] = useState('#000000');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (name && email && password) {
				if (password === passwordRepeat) {
					const saveData = {
						name,
						email,
						password,
						profilePicture: photoUrl,
						color: color ?? '#000000',
					};
					console.log(saveData);

					const { data } = await axios.post(`/register`, saveData);
					if (data) {
						Swal.fire(
							'Terdaftar!',
							`Kamu sudah terdaftar, silahkan masuk menggunakan email ${email}.`,
							'success'
						);

						setName('');
						setEmail('');
						setPassword('');
						setPhotoUrl('');
						props.onHide();
					}
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'password tidak sama, coba cek lagi!',
					});
				}
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Harap isi nama , email & password',
				});
			}
		} catch (error) {
			console.log(error?.response, 'ERROR LOGIN');
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
					<div className="d-flex flex-column align-items-center">
						<h2>Daftar</h2>
						<p>
							Daftarkan secara gratis dan mulai chat <strike>toxic</strike>{' '}
							anda!
						</p>
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="form-group mb-2">
							<label htmlFor="exampleInputEmail1">Nama</label>
							<input
								type="text"
								className="form-control"
								id="name"
								placeholder="contoh: subaidi"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="exampleInputEmail1">Alamat Email</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="contoh: darto@gmail.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<small id="emailHelp" className="form-text text-muted">
								Email anda aman dan tidak di publikasikan
							</small>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="exampleInputPassword1">Ulangi Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPasswordRepeat"
								placeholder="Ulangi Password"
								value={passwordRepeat}
								onChange={(e) => setPasswordRepeat(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="warna">Pilih Warna Kesukaan</label>
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
						<div className="form-group mb-2">
							<label htmlFor="exampleInputEmail1">URL Foto Profil (tidak wajib)</label>
							<input
								type="text"
								className="form-control"
								id="photo"
								placeholder="contoh: https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
								value={photoUrl}
								onChange={(e) => setPhotoUrl(e.target.value)}
							/>
						</div>
						<div className="d-flex justify-content-center mb-3 mt-3">
							<button type="submit" className="btn btn-warning me-2">
								Daftar
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
