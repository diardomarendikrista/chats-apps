import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Title, ProfilePicture, ProfileName } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import ModalLogin from 'Components/ModalLogin';
import ModalRegister from 'Components/ModalRegister';
import ModalProfile from 'Components/ModalProfile';
import Swal from 'sweetalert2';
import { imageErrorHandler } from 'config/utils/globalFunction';
import { ws } from 'socket/ws';

export default function Navbar() {
	const { profile } = useSelector((state) => state.user);
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalRegister, setShowModalRegister] = useState(false);
	const [showModalProfile, setShowModalProfile] = useState(false);

	const dispatch = useDispatch();

	const logout = () => {
		Swal.fire({
			title: 'Logout',
			text: 'Yakin ingin logout?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Logout',
			cancelButtonText: 'Batal',
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.clear();
				dispatch({ type: 'profile/setProfile', payload: false });
				dispatch({ type: 'isLogin/setIsLogin', payload: false });
				Swal.fire('Logout', 'Kamu berhasil logout.', 'success');
				ws.emit('logout', '');
			}
		});
	};

	return (
		<>
			<Title>
				<div className="d-flex align-items-center">
					<Link to="/">
						<h3>PITIK CHAT</h3>
					</Link>
				</div>
				{profile ? (
					<div className="d-flex align-items-center">
						<div
							className="d-flex align-items-center cursor-pointer"
							onClick={() => setShowModalProfile(true)}
						>
							<ProfilePicture>
								<img
									src={
										profile?.profilePicture ??
										'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg'
									}
									alt={profile?.name}
									width={'100%'}
									onError={(e) => imageErrorHandler(e)}
								/>
							</ProfilePicture>
							<ProfileName className="me-2 fw-bold" bgColor={profile?.color}>
								{profile?.name}
							</ProfileName>
						</div>
						<button className="btn btn-danger" onClick={() => logout()}>
							logout
						</button>
					</div>
				) : (
					<div>
						<button
							className="btn btn-primary me-2"
							onClick={() => setShowModalLogin(true)}
						>
							Login
						</button>
						<button
							className="btn btn-warning"
							onClick={() => setShowModalRegister(true)}
						>
							Register
						</button>
					</div>
				)}
			</Title>

			<ModalLogin
				show={showModalLogin}
				onHide={() => setShowModalLogin(false)}
			/>
			<ModalRegister
				show={showModalRegister}
				onHide={() => setShowModalRegister(false)}
			/>
			<ModalProfile
				show={showModalProfile}
				onHide={() => setShowModalProfile(false)}
			/>
		</>
	);
}
