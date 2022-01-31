const initialState = {
	rooms: false,
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	if (type === 'rooms/setRooms') return { ...state, rooms: payload };
	return state;
}
