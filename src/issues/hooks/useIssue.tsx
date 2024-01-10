



import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Issue } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';

export const getIssueInfo = async (issueNumber : number) : Promise<Issue> => {
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
}

export const getIssueComments = async (issueNumber : number) : Promise<Issue[]> => {
    sleep(4);
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    return data;
}



export const useIssue = ( issueNumber : number ) => {

    const issueQuery = useQuery(
        {
            queryKey : ['issue', issueNumber],
            queryFn : ()=> getIssueInfo(issueNumber)
        }
    );

    const issueQueryComments = useQuery(
        {
            queryKey : ['issue', issueNumber, 'comments'],
            queryFn : ()=> getIssueComments(issueQuery.data?.number as number),
            enabled : issueQuery.data !== undefined
        }
    );
    return {issueQuery, issueQueryComments};
}
