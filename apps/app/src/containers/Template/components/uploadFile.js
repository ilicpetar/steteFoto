import React, { useState } from 'react';
import { identity } from 'ramda';
import { useDispatch } from 'react-redux';
// import { actions } from '@gef-ui-docs/storybook-utils/apiMiddleware';
import Button from '@gef-ui/components/atoms/Button';
import FileInputComponent from '@gef-ui/components/atoms/FileInput/FileInputV2';
import FileInput from '@gef-ui/form/components/FileInput';
import useFormData from '@gef-ui/form/hooks/state/useFormData';
import { getMultipartFormData } from '@gef-ui/form/utils/multipart';
import { isRequired } from '@gef-ui/form/validations/validationFunctions/common';
import { acceptedExtension, maxFileSize } from '@gef-ui/form/validations/validationFunctions/fileUpload';
import { postData } from '@gef-ui/middleware-api/auth/oauth2/facade';
import { getBaseWithPostfix } from '@gef-ui/redux-common/selectors/urls';
// import { formProviderDecorator } from '../helpers';


export const basic = () => <FileInput fieldName="example" />;


basic.decorators = [

	formProviderDecorator({

		formDescriptorFn: () => ({

			example: {

				deepPath: ['example'],

				validations: [isRequired()],

			},

		}),

	}),

];


export const withValidations = () => <FileInput fieldName="example1" />;


withValidations.decorators = [

	formProviderDecorator({

		formDescriptorFn: () => ({

			example1: {

				deepPath: ['example'],

				validations: [maxFileSize({ maxSize: 1000000 }), acceptedExtension({ extension: /(\.|\/)(jpg)$/ })],

			},

		}),

	}),

];


const uploadDescriptor = () => ({

	example2: {

		deepPath: ['example2'],

	},

});


export const uploadForm = () => {

	const StoryComponent = () => {

		const dispatch = useDispatch();

		const [response, setResponse] = useState({ body: undefined });

		const formData = useFormData(identity);

		return (

			<>

				<FileInput fieldName="example2" />

				<Button

					type="submit"

					label="Submit"

					primary

					onClick={() => {

						dispatch(

							postData({

								// headers are automatically resolved by fetch itself. Fetch also adds boundaries to content-type.

								endpoint: getBaseWithPostfix('/upload'),

								body: getMultipartFormData(formData, uploadDescriptor, ['example2']),

								actionName: `submit`,

								actions,

							})

						).then(setResponse);

					}}

				/>

				{response.body && (

					<div>

						<h3>Response:</h3>

						{response.body}

					</div>

				)}

			</>

		);

	};

	return <StoryComponent />;

};


uploadForm.decorators = [

	formProviderDecorator(

		{

			formDescriptorFn: uploadDescriptor,

		},

		'file-input'

	),

];


export default {

	title: 'Form/Field/FileInput',

	component: FileInput,

	subcomponents: { FileInputComponent },

};