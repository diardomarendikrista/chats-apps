import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'Layout/layout';
import { Wrapper, RightSection, CardRoom } from './styles';
import axios from 'axios/axios';
import ModalNewRoom from 'Components/ModalNewRoom';
import { ws } from 'socket/ws';

export default function Home() {
	// eslint-disable-next-line
	const { profile, isLogin, refetchUser } = useSelector((state) => state.user);
	const { rooms } = useSelector((state) => state.room);
	const [showModalNewRoom, setShowModalNewRoom] = useState(false);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handleDeleteRoom = async (id) => {
		try {
			setLoading(true);
			console.log(id, 'ROOM ID');
			const headers = {
				access_token: localStorage.getItem('access_token'),
			};
			const { data } = await axios.delete(`/rooms/${id}`, { headers });
			console.log(data, 'DATA');
		} catch (error) {
			console.log(error, 'ERROR DEL ROOM');
		} finally {
			setLoading(false);
		}
	};

	const fetchRooms = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`/rooms`);
			if (data) {
				dispatch({ type: 'rooms/setRooms', payload: data });
			}
		} catch (error) {
			console.log(error, 'ERROR FETCH ROOMS');
		} finally {
			setLoading(false);
		}
	};

	const fetchUser = async () => {
		try {
			setLoading(true);
			const headers = {
				access_token: localStorage.getItem('access_token'),
			};
			const { data } = await axios.get('/user', { headers });
			if (data) {
				ws.emit('login', data.user);
				dispatch({ type: 'profile/setProfile', payload: data.user });
			}
		} catch (error) {
			console.log(error, 'ERROR FETCH USER');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// check local storage
		if (localStorage.getItem('access_token')) {
			fetchUser();
		}
		//fetch message
		fetchRooms();

		ws.on('newRoom', newRoomCallback);

		return () => {
			ws.off('newRoom', newRoomCallback);
		};
		// eslint-disable-next-line
	}, []);

	const newRoomCallback = () => {
		console.log('ter trigger??');
		fetchRooms();
	};

	// check login status
	useEffect(() => {
		if (isLogin && localStorage.getItem('access_token')) {
			fetchUser();
		}
		// eslint-disable-next-line
	}, [isLogin]);

	// check refetch user
	useEffect(() => {
		if (refetchUser) {
			fetchUser();
			dispatch({ type: 'refetchUser/setRefetchUser', payload: false });
		}
		// eslint-disable-next-line
	}, [refetchUser]);

	return (
		<Layout>
			<Wrapper className="klob-max m-auto d-flex justify-content-center">
				<RightSection>
					<button
						className="btn btn-primary"
						onClick={() => setShowModalNewRoom(true)}
					>
						Ruang Baru
					</button>
					<div>
						{rooms?.length > 0 &&
							rooms.map((room, i) => (
								<CardRoom key={i}>
									{room.name}{' '}
									<span
										className="text-danger cursor-pointer"
										onClick={() => handleDeleteRoom(room.id)}
									>
										[delete]
									</span>
								</CardRoom>
							))}
					</div>
				</RightSection>
			</Wrapper>

			<ModalNewRoom
				show={showModalNewRoom}
				onHide={() => setShowModalNewRoom(false)}
			/>
		</Layout>
	);
}
