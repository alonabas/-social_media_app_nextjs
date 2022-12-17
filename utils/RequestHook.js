import axios from 'axios';
import React from 'react';

import { SERVER_URL } from './constants';

const useRequest = ({
	defaultData = {}, query, variablesObj, params = {},
}) => {
	/**
	 * params: {
	 * 	disabled: false,
	 *  initiallyDisabled: false
	 * }
	 */
	const [data, setData] = React.useState(defaultData);
	const [isLoading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(undefined);
	const [reload, setReload] = React.useState(false);

	const initial = React.useRef(true);
	const refetch = () => setReload((prev) => !prev);
	React.useEffect(() => {
		if (params?.disabled) {
			return;
		}
		if (params?.initiallyDisabled && initial.current) {
			if (initial.current) {
				initial.current = false;
			}
			return;
		}
		const fetch = async () => {
			setLoading(true);
			try {
				const result = await axios.post(SERVER_URL, {
					query,
					variables: variablesObj,
				});
				setData(result?.data?.data);
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, [reload]);
	return {
		data, isLoading, error, refetch,
	};
};

export default useRequest;
