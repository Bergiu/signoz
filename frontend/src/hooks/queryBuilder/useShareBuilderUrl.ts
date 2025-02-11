import useUrlQuery from 'hooks/useUrlQuery';
import { useEffect } from 'react';
import { Query } from 'types/api/queryBuilder/queryBuilderData';

import { useGetCompositeQueryParam } from './useGetCompositeQueryParam';
import { useQueryBuilder } from './useQueryBuilder';

type UseShareBuilderUrlParams = { defaultValue: Query };

export const useShareBuilderUrl = ({
	defaultValue,
}: UseShareBuilderUrlParams): void => {
	const { redirectWithQueryBuilderData, resetStagedQuery } = useQueryBuilder();
	const urlQuery = useUrlQuery();

	const compositeQuery = useGetCompositeQueryParam();

	useEffect(() => {
		if (!compositeQuery) {
			redirectWithQueryBuilderData(defaultValue);
		}
	}, [defaultValue, urlQuery, redirectWithQueryBuilderData, compositeQuery]);

	useEffect(
		() => (): void => {
			resetStagedQuery();
		},
		[resetStagedQuery],
	);
};
