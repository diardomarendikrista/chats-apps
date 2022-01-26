export function imageErrorHandler(event) {
	event.target.src =
		'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg';
	return;
}

export const noImg =
	'https://admin.klob.id/asset_v3/assets/img/ensiklobedia/klob-no-image.jpg';

export const fileListToBase64 = (data) => {
	if (!data) return null;
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(data);
		reader.onload = () => {
			resolve(reader.result.split(',')[1] ?? null);
		};
		reader.onerror = (error) => reject(error);
	});
};

export const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// eslint-disable-next-line
export const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
