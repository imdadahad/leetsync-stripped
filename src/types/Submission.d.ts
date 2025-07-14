import { Question } from "./Question"

export class Distribution {
    lang: string
    distribution: [string, number]
}

export class Submission {
    runtime: number
    runtimeDisplay: string
    runtimePercentile: number
    runtimeDistribution: Distribution
    memory: number
    memoryDisplay: string
    memoryPercentile: number
    memoryDistribution: Distribution
    code: string
    timestamp: number
    statusCode: number
    lang: {
        name: string
        verboseName: string
    }
    question: Question
    notes?: string
    topicTags?: { tagId: string; slug: string; name: string }[]
    runtimeError?: string
    compileError?: string
    lastTestcase?: string
    user: {
        username: string
        profile: {
            realName: string
            userAvatar: string
        }
    }
}

export type RestSubmission = {
    code: string
    compare_result: string
    flag_type: number
    frontend_id: number
    has_notes: boolean
    id: number
    is_pending: string
    lang: string
    lang_name: string
    memory: string
    question_id: number
    runtime: string
    status: number
    status_display: string
    time: string
    timestamp: number
    title: string
    title_slug: string
    url: string
}
