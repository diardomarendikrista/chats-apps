import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Wrapper,
	Title,
	ProfilePicture,
	ProfileName,
	MenuWrapper,
	Menu,
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import ModalLogin from 'Components/ModalLogin';
import ModalRegister from 'Components/ModalRegister';
import ModalProfile from 'Components/ModalProfile';
import ModalAbout from 'Components/ModalAbout';
import Swal from 'sweetalert2';
import { imageErrorHandler } from 'config/utils/globalFunction';
import { ws } from 'socket/ws';
import Logo from 'assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faQuestionCircle, faPowerOff } from '@fortawesome/free-solid-svg-icons';

export default function NavigationBar() {
	const { profile } = useSelector((state) => state.user);
	const [menuHidden, setMenuHidden] = useState(true);
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalRegister, setShowModalRegister] = useState(false);
	const [showModalProfile, setShowModalProfile] = useState(false);
	const [showModalAbout, setShowModalAbout] = useState(false);

	const dispatch = useDispatch();

	React.useEffect(() => {
		window.onclick = function (event) {
			if (event.target.matches('.dropbtn')) {
				setMenuHidden(!menuHidden);
			} else {
				if (!menuHidden) {
					setMenuHidden(true);
				}
			}
		};
		// eslint-disable-next-line
	}, [window.onclick]);

	const logout = (e) => {
		e.preventDefault();
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
			<Wrapper>
				<div>
					<Link to="/" className="d-flex align-items-center">
						<img src={Logo} alt="logo" width="45px" className="me-1" />
						<Title>PITIK CHAT</Title>
					</Link>
				</div>
				{profile ? (
					<>
						<MenuWrapper>
							<div className="d-flex align-items-center cursor-pointer dropbtn">
								<ProfilePicture>
									<img
										src={
											profile?.profilePicture ??
											'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg'
										}
										alt={profile?.name}
										width={'100%'}
										onError={(e) => imageErrorHandler(e)}
										className="dropbtn"
									/>
								</ProfilePicture>
								<ProfileName className="dropbtn" bgColor={profile?.color}>
									{profile?.name}
									<span className="dropmenu dropbtn">&#9660;</span>
								</ProfileName>
							</div>
							{!menuHidden && (
								<Menu>
									<div
										className="submenu"
										onClick={() => setShowModalProfile(true)}
									>
										<FontAwesomeIcon icon={faUserCircle} className='text-primary' /> Ubah Profil
									</div>
									<div
										className="submenu"
										onClick={() => setShowModalAbout(true)}
									>
										<FontAwesomeIcon icon={faQuestionCircle} className='text-info' /> Tentang App
									</div>
									<div className="submenu" onClick={(e) => logout(e)}>
									<FontAwesomeIcon icon={faPowerOff} className='text-danger' /> logout
									</div>
								</Menu>
							)}
						</MenuWrapper>
					</>
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
			</Wrapper>

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
			<ModalAbout
				show={showModalAbout}
				onHide={() => setShowModalAbout(false)}
			/>
		</>
	);
}
