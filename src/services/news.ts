import Axios from "axios"

export interface NewsData {
    status: string
    totalResults: number
    articles: NewsArticle[]
}

export interface NewsArticle {
    source: string
    author?: string
    title: string
    description: string
    url: string
    urlToImage: string | null
    publishedAt: string
}

interface NewsAPIArticle {
    source: { id: string; name: string }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}

interface GoogleNewsArticle {
    title: string
    description: string
    url: string
    image: string | null
    publishedAt: string
    source: { name: string; url: string }
}

export const categories = {
    newsapi: [
        {
            name: "Business",
            value: "business",
        },
        {
            name: "Entertainment",
            value: "entertainment",
        },
        {
            name: "General",
            value: "general",
        },
        {
            name: "Health",
            value: "health",
        },
        {
            name: "Science",
            value: "science",
        },
        {
            name: "Sports",
            value: "sports",
        },
        {
            name: "Technology",
            value: "technology",
        },
    ],
    google: [
        {
            name: "Top",
            value: "top",
        },
        {
            name: "World",
            value: "world",
        },
        {
            name: "Nation",
            value: "nation",
        },
        {
            name: "Business",
            value: "business",
        },
        {
            name: "Technology",
            value: "technology",
        },
        {
            name: "Entertainment",
            value: "entertainment",
        },
        {
            name: "Sports",
            value: "sports",
        },
        {
            name: "Science",
            value: "science",
        },
        {
            name: "Health",
            value: "health",
        },
    ],
}

export default async function(
    filter: string,
    source: "google" | "newsapi"
): Promise<NewsArticle[]> {
    if (source === "google") {
        const token = "189141f3c10f8803535e9e8ab9814a68"
        let url: string
        if (filter === "top") {
            url = `https://gnews.io/api/v3/top-news?token=${token}`
        } else {
            url = `https://gnews.io/api/v3/topics/${filter}?token=${token}`
        }
        const res = await Axios.get(url)

        return (res.data.articles as GoogleNewsArticle[]).map((art) => ({
            title: art.title,
            description: art.description,
            url: art.url,
            urlToImage: art.image,
            source: art.source.name,
            publishedAt: art.publishedAt,
        }))
    } else {
        const token = "5a585a7efa414edf8b917c52684a89b2"
        const url = `https://proxy.paulgellai.dev/newsapi?category=${filter}`
        const res = await Axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return (res.data.articles as NewsAPIArticle[]).map((art) => ({
            title: art.title,
            description: art.description,
            url: art.url,
            urlToImage: art.urlToImage,
            source: art.source.name,
            publishedAt: art.publishedAt,
            author: art.author,
        }))
    }
}
