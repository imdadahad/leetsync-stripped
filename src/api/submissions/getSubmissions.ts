import { RestSubmission } from "../../types/Submission"

const GET_SUBMISSIONS_URL = "https://leetcode.com/api/submissions/?offset=0&limit=20"
const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"

export const getSubmissions = async (leetcodeSession: string): Promise<RestSubmission[]> => {
    const headers = {
        "User-Agent": USER_AGENT,
        Cookie: `LEETCODE_SESSION=${leetcodeSession}`,
    }

    const response = await fetch(GET_SUBMISSIONS_URL, {
        method: "GET",
        headers,
    })

    console.log("Request headers: ", headers)

    const result = await response.json()
    return result.submissions_dump
}
