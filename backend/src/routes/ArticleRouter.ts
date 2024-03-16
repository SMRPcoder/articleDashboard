import { Router } from "express";
import { SectorsList,PestleList, DashboardCount, EndYearFilter, TopicFilter, SourceFilter, CountryFilter, viewAll, SectorSearch, PestelSearch, RegionSearch, RegionList } from "../controller/ArticleController";


const ArticleRoutes=Router();

ArticleRoutes.get("/",DashboardCount);
// filters
ArticleRoutes.post("/endyear/:page?",EndYearFilter);
ArticleRoutes.post("/topic/:page?",TopicFilter);
ArticleRoutes.post("/source/:page?",SourceFilter);
ArticleRoutes.post("/country/:page?",CountryFilter);
ArticleRoutes.post("/sector/:page?",SectorSearch);
ArticleRoutes.post("/pestle/:page?",PestelSearch);
ArticleRoutes.post("/region/:page?",RegionSearch);

// lists
ArticleRoutes.get("/regionList",RegionList);
ArticleRoutes.get("/sectorList",SectorsList);
ArticleRoutes.get("/pestleList",PestleList);

// viewall
ArticleRoutes.get("/viewAll/:page?",viewAll);



export default ArticleRoutes;