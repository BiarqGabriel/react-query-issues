import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    // staleTime: 1000 * 60 * 10, // 10 minutos
    // initialData
    initialData: [],
    placeholderData: [{
        id:196858374,
        node_id:"MDU6TGFiZWwxOTY4NTgzNzQ=",
        url:"https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
        name:"CLA Signed",
        color:"e7e7e7",
        default:false,
    },
    {
        id:196858374,
        node_id:"MDU6TGFiZWwxOTY4NTgzNzQ=",
        url:"https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
        name:"CLA Signed",
        color:"e7e7e7",
        default:false,
    },],
  });

  return { labelsQuery };
};
