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

interface NewsCatcherArticle {
    title: string
    author: string
    published_date: string
    link: string
    excerpt: string
    summary: string
    media: string
    rights: string
    clean_url: string
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
    newscatcher: [
        { name: "News", value: "news" },
        { name: "Sport", value: "sport" },
        { name: "Tech", value: "tech" },
        { name: "World", value: "world" },
        { name: "Finance", value: "finance" },
        { name: "Politics", value: "politics" },
        { name: "Business", value: "business" },
        { name: "Economics", value: "economics" },
        { name: "Entertainment", value: "entertainment" },
        { name: "Beauty", value: "beauty" },
        { name: "Travel", value: "travel" },
        { name: "Music", value: "music" },
        { name: "Food", value: "food" },
        { name: "Science", value: "science" },
        { name: "Gaming", value: "gaming" },
        { name: "Energy", value: "energy" },
    ],
}

export default async function(
    filter: string,
    source: "google" | "newsapi" | "newscatcher"
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
    } else if (source === "newscatcher") {
        const token = "9hJrtXF8Xl7aeJJsIX_OLsxrfy8Xfp367ZAzOAXDNhA"
        const res = await Axios.get(
            "https://api.newscatcherapi.com/v2/latest_headlines",
            {
                headers: {
                    "x-api-key": token,
                },
                params: {
                    countries: "US",
                    topic: filter,
                },
            }
        )
        return (res.data.articles as NewsCatcherArticle[]).map((art) => ({
            title: art.title,
            description: art.summary,
            url: art.link,
            urlToImage: art.media,
            source: art.clean_url,
            publishedAt: art.published_date,
            author: art.author,
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
