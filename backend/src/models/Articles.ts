import { Schema,model,Types,Document } from "mongoose";

export interface IArticle{
    end_year: number,
    intensity: string,
    sector: string,
    topic: string,
    insight: string,
    url: string,
    region: string,
    start_year: string,
    impact: string,
    added: string,
    published: string,
    country: string,
    relevance: number,
    pestle: string,
    source: string,
    title: string,
    likelihood: string
}

interface IArticleSchema extends IArticle,Document{}


const ArticleSchema:Schema=new Schema<IArticleSchema>({
    end_year: {
        type:Schema.Types.Number
    },
    intensity: {
        type:Schema.Types.String
    },
    sector: {
        type:Schema.Types.String
    },
    topic: {
        type:Schema.Types.String
    },
    insight: {
        type:Schema.Types.String
    },
    url: {
        type:Schema.Types.String
    },
    region: {
        type:Schema.Types.String
    },
    start_year: {
        type:Schema.Types.String
    },
    impact: {
        type:Schema.Types.String
    },
    added: {
        type:Schema.Types.String
    },
    published: {
        type:Schema.Types.String
    },
    country: {
        type:Schema.Types.String
    },
    relevance: {
        type:Schema.Types.Number
    },
    pestle: {
        type:Schema.Types.String
    },
    source: {
        type:Schema.Types.String
    },
    title: {
        type:Schema.Types.String
    },
    likelihood: {
        type:Schema.Types.String
    },
});

ArticleSchema.index({sector:1});

const Article=model<IArticleSchema>("Article",ArticleSchema);

export default Article;