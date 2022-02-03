import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'Layout/layout';
import { Wrapper, RightSection } from './styles';
import axios from 'axios/axios';
import ModalNewRoom from 'Components/ModalNewRoom';
import CardRoom from 'Components/CardRoom';
import { ws } from 'socket/ws';

export default function Home() {
	// eslint-disable-next-line
	const { profile, isLogin, refetchUser } = useSelector((state) => state.user);
	const { rooms } = useSelector((state) => state.room);
	const { netizen } = useSelector((state) => state.global);
	const [showModalNewRoom, setShowModalNewRoom] = useState(false);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

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
				let dataUser = data.user;
				dataUser.room = '';
				ws.emit('login', dataUser);
				dispatch({ type: 'profile/setProfile', payload: data.user });
			}
		} catch (error) {
			console.log(error, 'ERROR FETCH USER');
		} finally {
			setLoading(false);
		}
	};
	
	const updateNetizen = (dataNetizen) => {
		dispatch({ type: 'netizen/setNetizen', payload: dataNetizen });
	};

	useEffect(() => {
		// check local storage
		if (localStorage.getItem('access_token')) {
			fetchUser();
		}
		//fetch message
		fetchRooms();

		ws.on('newRoom', newRoomCallback);
		ws.on('updateNetizen', updateNetizen);

		return () => {
			ws.off('newRoom', newRoomCallback);
			ws.off('updateNetizen', updateNetizen);
		};
		// eslint-disable-next-line
	}, []);

	const newRoomCallback = () => {
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
			<Wrapper className="m-auto d-flex justify-content-center">
				<RightSection>
					{profile && (
						<button
							className="btn btn-primary mb-2"
							onClick={() => setShowModalNewRoom(true)}
						>
							Ruang Baru
						</button>
					)}
					<div className="d-flex flex-wrap">
						{rooms?.length > 0 &&
							rooms.map((room, i) => <CardRoom key={i} room={room} netizen={netizen} />)}
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
