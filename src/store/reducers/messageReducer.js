const initialState = {
	messages: false,
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	if (type === 'message/setMessage') return { ...state, messages: payload };
	return state;
}
