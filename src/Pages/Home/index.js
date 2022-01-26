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
} from './styles';
import CardChat from 'Components/CardChat/CardChat';
import axios from 'axios/axios';
import CardNetizen from 'Components/CardNetizen';
import { ws } from 'socket/ws';

export default function Home() {
	const { netizen } = useSelector((state) => state.global);
	const { messages } = useSelector((state) => state.message);
	const { profile, isLogin, refetchUser } = useSelector((state) => state.user);
	const [inputan, setInputan] = useState('');
	const [sidebar, setSidebar] = useState(false);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	function scrollToBottom() {
		const messages = document.getElementById('messages');
		if (messages) {
			// messages.scrollTop = messages.scrollHeight;
			// messages.window.scrollIntoView({ behavior: 'smooth', block: 'end' });
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

				const { data } = await axios.post(`/messages`, saveData, { headers });
				console.log(data);
				setInputan('');
			}
		} catch (error) {
			console.log(error?.response, 'error chat');
		}
	};

	const fetchMessage = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`/messages`);
			// console.log(data, 'MESSAGE');
			if (data) {
				dispatch({ type: 'message/setMessage', payload: data });
				scrollToBottom();
			}
		} catch (error) {
			console.log(error, 'ERROR FETCH MESSAGE');
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

	const updateNetizen = (dataNetizen) => {
		dispatch({ type: 'netizen/setNetizen', payload: dataNetizen });
	};

	useEffect(() => {
		// check local storage
		if (localStorage.getItem('access_token')) {
			fetchUser();
		}
		//fetch message
		fetchMessage();
		// ws = io('http://localhost:4000');

		ws.on('newChat', newChatCallback);
		ws.on('updateNetizen', updateNetizen);

		return () => {
			ws.off('newChat', newChatCallback);
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

	return (
		<Layout>
			<Wrapper className="klob-max m-auto d-flex justify-content-end">
				<BtnLeftSection onClick={() => setSidebar(!sidebar)}>
					<img
						src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png"
						alt="users"
						width={'100%'}
					/>
				</BtnLeftSection>
				<LeftSection sidebar={sidebar}>
					{netizen?.length > 0 &&
						netizen.map((item, i) => <CardNetizen key={i} data={item} />)}
				</LeftSection>
				<RightSection sidebar={sidebar}>
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
								/>
								<button type="submit" className="btn btn-info">
									kirim
								</button>
							</ReplyBox>
						</form>
					) : (
						<NoLogin>Login untuk join chat</NoLogin>
					)}
				</RightSection>
			</Wrapper>
		</Layout>
	);
}
