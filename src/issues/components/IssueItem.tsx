import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue } from '../interfaces';
import { FC } from 'react';
import { State } from '../interfaces/issue';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';

interface Props {
    issue : Issue;
}

export const IssueItem : FC<Props> = ({ issue }) => {

    const navigate = useNavigate(); 
    const queryClient = useQueryClient();

    const onMouseEnter = () => {
       queryClient.prefetchQuery({
            queryKey : ['issue', issue.number],
            queryFn : ()=> getIssueInfo(issue.number)
       });
       queryClient.prefetchQuery({
            queryKey : ['issue', issue.number, 'comments'],
            queryFn : ()=> getIssueComments(issue.number)
       });
    }

    return (
        <div className="card mb-2 issue"
            onClick={() => navigate(`/issues/issue/${ issue.number }`)}
            onMouseEnter={onMouseEnter}>
            <div className="card-body d-flex align-items-center">
                
                {
                    issue.state === State.Open
                    ? <FiInfo size={30} color="red" />
                    :
                    <FiCheckCircle size={30} color="green" />

                }
                {/* <FiCheckCircle size={30} color="green" /> */}

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo"># { issue.number } Opened 2 days ago by <span className='fw-bold'>{issue.user.login}</span></span>
                    <div>
                        {
                            issue.labels.map((label, index) => (
                                <span key={index} className="badge rounded-pill m-1" style={{backgroundColor:  `#${label.color}`, color: 'black'}}>{label.name}</span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
