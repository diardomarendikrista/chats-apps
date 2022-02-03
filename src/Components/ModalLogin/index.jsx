import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Wrapper } from './styles';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import axios from 'axios/axios';

export default function ModalLogin({ ...props }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (email && password) {
				const saveData = {
					email,
					password,
				};
				setEmail('');
				setPassword('');

				const { data } = await axios.post(`/login`, saveData);
				localStorage.setItem('access_token', data.access_token);

				dispatch({ type: 'isLogin/setIsLogin', payload: true });
				Swal.fire('Login', 'Kamu berhasil login.', 'success');
				
				props.onHide();
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Harap isi user & password',
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
					<div className="d-flex flex-column align-items-center mb-3">
						<h2>Masuk</h2>
						Masuk menggunakan akun anda
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Alamat Email</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<small id="emailHelp" className="form-text text-muted">
								Email anda aman dan tidak di publikasikan
							</small>
						</div>
						<div className="form-group mb-4">
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
						<div className="d-flex justify-content-center mb-3">
							<button type="submit" className="btn btn-primary me-2">
								Login
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
