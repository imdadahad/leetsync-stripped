import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Heading,
    Input,
    InputGroup,
    Text,
    Toast,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsGithub } from "react-icons/bs"
import { SiLeetcode } from "react-icons/si"
import { useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import { GithubHandler } from "../handlers"
import { Footer } from "./Footer"

const StartOnboarding = ({ nextStep }: { nextStep: () => void}) => {
    return (
        <VStack w="100%" h="100%" align="center" justify={"center"}>
            <Logo />
            <VStack w="100%">
                <Heading size="lg">Welcome 👋</Heading>
                <Text color="GrayText" fontSize={"sm"} w="90%" textAlign={"center"}>
                    LeetSync is a Chrome extension that syncs your submissions to GitHub. Setup now.
                </Text>
            </VStack>

            <VStack w="100%" py={4}>
                <Button size="md" colorScheme={"green"} w="95%" onClick={() => nextStep()}>
                    Complete Setup
                </Button>
                <Text fontSize={"xs"} color="gray.400">
                    This will take less than 2 minutes
                </Text>
            </VStack>
            <Footer />
        </VStack>
    )
}
const AuthorizeWithGithub = ({ nextStep }: { nextStep: () => void}) => {
    const [accessToken, setAccessToken] = useState<string>("")
    const handleClicked = () => {
        if (!accessToken.trim()) {
            Toast({
                title: 'Error',
                description: 'GitHub token is required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
        chrome.storage.sync.set({ github_leetsync_token: accessToken }, () => {
            nextStep();
        });
    };

    return (
        <VStack w="100%">
            <VStack pb={4}>
                <Heading size="md">Authorize with GitHub</Heading>
                <Text color="GrayText" fontSize={"sm"} w="95%" textAlign={"center"}>
                    Before we can push code to your selected repository, we need access to your
                    GitHub account. Create a GitHub token scoped to a repository and paste it below.
                    <br />
                </Text>
                <InputGroup size="sm">
                    <Input
                        placeholder="GitHub Token"
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                    />
                </InputGroup>
            </VStack>
            <Button
                colorScheme={"blackAlpha"}
                bg="blackAlpha.800"
                w="95%"
                leftIcon={<BsGithub />}
                color="whiteAlpha.900"
                border={"1px solid"}
                borderColor={"gray.200"}
                _hover={{ bg: "blackAlpha.700" }}
                onClick={handleClicked}
            >
                Save
            </Button>
        </VStack>
    )
}
const AuthorizeWithLeetCode = ({ nextStep }: { nextStep: () => void}) => {
    const [leetcodeSession, setLeetcodeSession] = useState<string | null>(null)

    const handleClicked = () => {
        const authUrl = `https://leetcode.com/accounts/login/`
        chrome.storage.sync.set({ pipe_leethub: true }, () => {
            chrome.tabs.create({ url: authUrl, active: true }, function (x) {
                chrome.tabs.getCurrent(function (tab) {
                    if (!tab?.id) return
                    chrome.tabs.remove(tab?.id, () => {
                        // tab removed
                    })
                })
            })
        })
    }
    useEffect(() => {
        if (leetcodeSession && leetcodeSession.length > 0) {
            nextStep()
        }
    }, [leetcodeSession])

    useEffect(() => {
        chrome.storage.sync.get(["leetcode_session"], (result) => {
            if (result.leetcode_session) {
                setLeetcodeSession(result.leetcode_session)
            }
        })
    }, [])

    return (
        <VStack w="100%">
            <VStack>
                <Heading size="md">Authorize LeetCode</Heading>
                <Text color="GrayText" fontSize={"sm"} w="90%" textAlign={"center"}>
                    To sync your submissions on LeetCode, we need access to your account first.
                </Text>
            </VStack>

            <Button
                colorScheme={"yellow"}
                w="100%"
                onClick={handleClicked}
                leftIcon={<SiLeetcode />}
            >
                Login with LeetCode
            </Button>
        </VStack>
    )
}
const SelectRepositoryStep = ({ nextStep }: { nextStep: () => void}) => {
    const [repositoryURL, setRepositoryURL] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleLinkRepo = async () => {
        if (!repositoryURL) return setError("Repository URL is required")

        const repoName = repositoryURL.split("/").pop()
        const username = repositoryURL.split("/").slice(-2)[0]
        console.log(`username: ${username}`)
        console.log(`repoName: ${repoName}`)
        if (!repoName || !username) {
            return setError("Invalid repository URL")
        }

        setLoading(true)
        const github = new GithubHandler()

        chrome.storage.sync.set({
            github_username: username,
            github_leetsync_repo: repoName
        }, () => {
            console.log("Repository Linked Successfully")
            navigate(0)
        })

        const isFound = await github.checkIfRepoExists(`${username}/${repoName}`)
        setLoading(false)
        if (!isFound) {
            return setError("Repository not found")
        }
        chrome.storage.sync.set({ github_leetsync_repo: repoName }, () => {
            console.log("Repository Linked Successfully")
            navigate(0)
        })
    }

    return (
        <VStack w="100%">
            <VStack>
                <Heading size="md">Link a Repository</Heading>
                <Text color="GrayText" fontSize={"sm"} w="90%" textAlign={"center"}>
                    One last step, we need to know which repository you want to push your code to 🤓
                </Text>
            </VStack>

            {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
            <FormControl isRequired isInvalid={!!error}>
                <InputGroup size="sm">
                    <Input
                        placeholder="Repository URL"
                        value={repositoryURL}
                        onChange={(e) => {
                            setRepositoryURL(e.target.value)
                        }}
                    />
                </InputGroup>
                {!error ? (
                    <FormHelperText fontSize={"xs"}>
                        Paste the repository URL to push your submissions to.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage fontSize={"xs"}>{error}</FormErrorMessage>
                )}
            </FormControl>
            <Button
                colorScheme={"gray"}
                w="100%"
                onClick={handleLinkRepo}
                isLoading={loading}
                isDisabled={loading || !repositoryURL}
                size="sm"
            >
                Link Repository
            </Button>
            <small>You can change this later.</small>
        </VStack>
    )
}


export { StartOnboarding, AuthorizeWithGithub, AuthorizeWithLeetCode, SelectRepositoryStep }

