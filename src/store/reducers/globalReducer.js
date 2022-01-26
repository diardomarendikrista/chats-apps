const initialState = {
	loadingGlobal: false,
	netizen: [],
};

export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	if (type === 'netizen/setNetizen') return { ...state, netizen: payload };
	if (type === 'loadingGlobal/setLoadingGlobal')
		return { ...state, loadingGlobal: payload };
	return state;
}
