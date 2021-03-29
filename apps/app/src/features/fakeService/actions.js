import { getData } from '@gef-ui/middleware-api/facade';
import { showAndHide } from '@gef-ui/features/modalLoader/actions';

export const fakeServiceCall = () =>
	getData(
		showAndHide(
			{
				endpoint: ({ urls }) => urls.fakeService,
				actions: {
					onSuccess: [],
					onError: [],
				},
			},
			'Loading something'
		)
	);
