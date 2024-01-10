import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/issue';

export const ListView = () => {

  const [selectedLabels, setselectedLabels] = useState<string[]>([])
  const [state, setstate] = useState<State>()


  const {issuesQuery} = useIssues({state, labels:selectedLabels});
  const onChangeLabel = (labelName: string) => {
    (selectedLabels.includes(labelName)) ?
    setselectedLabels(selectedLabels.filter((label) => label !== labelName))
    : setselectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading ? 
          (<LoadingIcon /> ) :  
          <IssueList 
            issues={issuesQuery.data || []}
            state={state}
            onStateChange={(state) => setstate(state)}
           />
          
        }
       
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabel = {selectedLabels} 
          onChange = {(labelName) => onChangeLabel(labelName)}
        />
      </div>
    </div>
  )
}
