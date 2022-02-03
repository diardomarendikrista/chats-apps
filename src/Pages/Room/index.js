import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'Layout/layout';
import {
	Wrapper,
	RightSection,
	MessageWrapper,
	CardWrapper,
	ReplyBox,
	NoLogin,
	BtnLeftSection,
	LeftSection,
	NotFound,
	InfoBox,
	RightWrapper,
} from './styles';
import CardChat from 'Components/CardChat/CardChat';
import axios from 'axios/axios';
import CardNetizen from 'Components/CardNetizen';
import { ws } from 'socket/ws';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorNotFound from 'Components/Error/NotFound';

export default function Home() {
	const { netizen } = useSelector((state) => state.global);
	const { messages } = useSelector((state) => state.message);
	const { profile, isLogin, refetchUser } = useSelector((state) => state.user);
	const { room, lastRoom } = useSelector((state) => state.room);
	const [inputan, setInputan] = useState('');
	const [sidebar, setSidebar] = useState(false);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [notFound, setNotFound] = useState(false);
	const [localNetizen, setLocalNetizen] = useState([]);

	const { room_id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function scrollToBottom() {
		const messages = document.getElementById('messages');
		if (messages) {
			messages.scrollTo({ top: 999999999, behavior: 'smooth' });
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (inputan) {
				const headers = {
					access_token: localStorage.getItem('access_token'),
				};
				const saveData = {
					message: inputan,
				};

				await axios.post(`/messages/${room_id}`, saveData, {
					headers,
				});
				setInputan('');
			}
		} catch (error) {
			console.log(error?.response, 'error chat');
		}
	};

	const fetchMessage = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`/messages/${room_id}`);
			// console.log(data, 'MESSAGE');
			if (data) {
				dispatch({ type: 'message/setMessage', payload: data });
				scrollToBottom();
			}
		} catch (error) {
			if (error?.response?.data?.code === 404) {
				setNotFound(true);
			} else {
				console.log(error.response, 'ERROR FETCH MESSAGE');
			}
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
				dataUser.room_id = room_id;
				ws.emit('login', dataUser);
				dispatch({ type: 'profile/setProfile', payload: data.user });
			}
		} catch (error) {
			console.log(error, 'ERROR FETCH USER');
		} finally {
			setLoading(false);
		}
	};

	const fetchRoom = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`/rooms/${room_id}`);
			if (data) {
				dispatch({ type: 'room/setRoom', payload: data });
			}
		} catch (error) {
			console.log(error, 'ERROR FETCH ROOMS');
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
		if (!lastRoom || lastRoom !== room_id) {
			dispatch({ type: 'lastRoom/setLastRoom', payload: room_id });
			dispatch({ type: 'message/setMessage', payload: false });
			dispatch({ type: 'room/setRoom', payload: false });
		}

		fetchRoom();
		fetchMessage();

		ws.on(`newchat${room_id}`, newChatCallback);
		ws.on('newRoom', newChatCallback);
		ws.on('updateNetizen', updateNetizen);

		return () => {
			ws.off(`newchat${room_id}`, newChatCallback);
			ws.off('newRoom', newChatCallback);
			ws.off('updateNetizen', updateNetizen);
		};
		// eslint-disable-next-line
	}, []);

	const newChatCallback = () => {
		fetchMessage();
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

	// filter local netizen
	useEffect(() => {
		if (netizen) {
			const newLocalNetizen = netizen.filter((item) => {
				return item.room_id === room_id;
			});
			setLocalNetizen(newLocalNetizen);
		}
		// eslint-disable-next-line
	}, [netizen]);

	return (
		<Layout>
			<Wrapper className="m-auto d-flex justify-content-end">
				<BtnLeftSection onClick={() => setSidebar(!sidebar)}>
					<img
						src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png"
						alt="users"
						width={'100%'}
					/>
				</BtnLeftSection>
				<LeftSection sidebar={sidebar}>
					{localNetizen?.length > 0 &&
						localNetizen.map((item, i) => <CardNetizen key={i} data={item} />)}
				</LeftSection>
				<RightSection sidebar={sidebar}>
					{!notFound ? (
						<>
							<InfoBox>
								<div className="me-2 back">
									<span
										className="cursor-pointer text-danger"
										onClick={() => navigate(-1)}
									>
										&#8592;kembali
									</span>
								</div>
								<div className="back">|</div>
								<div className="ms-2">{room?.name ?? "....."}</div>
							</InfoBox>
							<RightWrapper>
								<MessageWrapper id="messages">
									{messages &&
										messages.map((chat) => (
											<CardWrapper key={chat.id} self={chat.self}>
												<CardChat data={chat} self={chat.self} />
											</CardWrapper>
										))}
								</MessageWrapper>
								{profile ? (
									<form onSubmit={(e) => handleSubmit(e)}>
										<ReplyBox>
											<input
												className="form-control me-2"
												type="text"
												value={inputan}
												onChange={(e) => setInputan(e.target.value)}
												disabled={loading}
											/>
											<button type="submit" className="btn btn-info" disabled={loading}>
												kirim
											</button>
										</ReplyBox>
									</form>
								) : (
									<NoLogin>Login untuk join chat</NoLogin>
								)}
							</RightWrapper>
						</>
					) : (
						<NotFound>
							<ErrorNotFound text="Ruang chat tidak ditemukan atau sudah dihapus" />
						</NotFound>
					)}
				</RightSection>
			</Wrapper>
		</Layout>
	);
}
