const GET_SUBMISSIONS_URL = "https://leetcode.com/api/submissions/?offset=0&limit=20"
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"

export const getSubmissions = (leetcodeSession: string) {
    const response = await fetch(
        GET_SUBMISSIONS_URL,
        {
            method: "GET",
            headers: {
                "User-Agent": USER_AGENT,
                "Cookie": `LEETCODE_SESSION=${leetcodeSession}`
            }
        }
    )

    const result = await response.json()
    return result
}