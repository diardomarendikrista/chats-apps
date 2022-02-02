const initialState = {
	rooms: false,
	room: false,
	lastRoom: false,
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	if (type === 'rooms/setRooms') return { ...state, rooms: payload };
	if (type === 'room/setRoom') return { ...state, room: payload };
	if (type === 'lastRoom/setLastRoom') return { ...state, lastRoom: payload };
	return state;
}
