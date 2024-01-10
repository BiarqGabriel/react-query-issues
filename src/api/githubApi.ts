import axios from "axios";

export const githubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : 'Bearer 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'
    },
    
});