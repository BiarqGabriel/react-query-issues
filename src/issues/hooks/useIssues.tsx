import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../interfaces";
import { sleep } from "../../helpers/sleep";
import { State } from "../interfaces/issue";

interface Props {
    state ?: State;
    labels : string[];
}


const getIssues = async (labels : String[] , state? : State) :Promise<Issue[]>=> {
    await sleep(2)

    const params = new URLSearchParams();
    if ( state ) params.append('state', state || 'all');
    if ( labels.length > 0 ) params.append('labels', labels.join(','));
    params.append('page', '1');
    params.append('per_page', '10');
    const {data} = await githubApi.get<Issue[]>('/issues', {params});
    return data;

}
export const useIssues = ({state, labels} : Props) => {
    const issuesQuery = useQuery({
        queryKey:['issues', {state, labels}],
        queryFn:() => getIssues(labels ,state),
    })
     

    return{ issuesQuery }
};
