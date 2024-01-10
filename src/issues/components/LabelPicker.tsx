import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { useLabels } from "../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";


interface Props {
  selectedLabel: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker = ({selectedLabel, onChange} : Props) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading ) return (<LoadingIcon/>);

  return (
  <>
      {labelsQuery.data?.map((label: Label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabel.includes(label.name) ? "label-active" : ""}`}
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          onClick={() => onChange(label.name)}
        >
          {`${label.name}`}
        </span>
      ))}
    </>
  );
};
