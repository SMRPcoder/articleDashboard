import { Request, Response } from "express";
import Article, { IArticle } from "../models/Articles";


interface Count {
    [key: string]: number;
}

export const DashboardCount = async (req: Request, res: Response) => {
    try {
        // const count: number = await Article.countDocuments();
        const combinedCounts = await Article.aggregate([
            {
              $facet: {
                pestleCounts: [
                  {
                    $match: {
                      pestle: {
                        $in: [
                          "Industries",
                          "Environmental",
                          "Economic",
                          "Political",
                          "Technological",
                          "",
                          "Organization",
                          "Healthcare",
                          "Social",
                          "Lifestyles"
                        ]
                      }
                    }
                  },
                  {
                    $group: {
                      _id: "$pestle",
                      count: { $sum: 1 }
                    }
                  },
                  {
                    $replaceRoot: {
                      newRoot: {
                        $arrayToObject: [[{ k: "$_id", v: "$count" }]]
                      }
                    }
                  }
                ],
                sectorCounts: [
                  {
                    $match: {
                      sector: {
                        $in: [
                          "Manufacturing",
                          "Aerospace & defence",
                          "Energy",
                          "Automotive",
                          "Security",
                          "Government",
                          "Construction",
                          "Support services",
                          "Retail",
                          "Financial services",
                          "Food & agriculture",
                          "",
                          "Tourism & hospitality",
                          "Transport",
                          "Environment",
                          "Healthcare",
                          "Information Technology",
                          "Water",
                          "Media & entertainment"
                        ]
                      }
                    }
                  },
                  {
                    $group: {
                      _id: "$sector",
                      count: { $sum: 1 }
                    }
                  },
                  {
                    $replaceRoot: {
                      newRoot: {
                        $arrayToObject: [[{ k: "$_id", v: "$count" }]]
                      }
                    }
                  }
                ]
              }
            }
          ]);

        const LikesCountWithSector=await Article.aggregate<Count>([
            {
                $match: {
                    sector: {
                        $in: [
                            "Manufacturing",
                            "Aerospace & defence",
                            "Energy",
                            "Automotive",
                            "Security",
                            "Government",
                            "Construction",
                            "Support services",
                            "Retail",
                            "Financial services",
                            "Food & agriculture",
                            "",
                            "Tourism & hospitality",
                            "Transport",
                            "Environment",
                            "Healthcare",
                            "Information Technology",
                            "Water",
                            "Media & entertainment"
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$sector",
                    count: { $sum: "$likelihood" }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: [[{ k: "$_id", v: "$count" }]]
                    }
                }
            }
        ]);

        const LikesCountWithPestle=await Article.aggregate<Count>([
            {
                $match: {
                    pestle: {
                        $in: ["Industries", "Environmental", "Economic", "Political", "Technological", "", "Organization", "Healthcare", "Social", "Lifestyles"]
                    }
                }
            },
            {
                $group: {
                    _id: "$pestle",
                    count: { $sum: "$likelihood" }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: [[{ k: "$_id", v: "$count" }]]
                    }
                }
            }
            
        ]);

        const RelevenceWithSector=await Article.aggregate<Count>([
            {
                $match: {
                    sector: {
                        $in: [
                            "Manufacturing",
                            "Aerospace & defence",
                            "Energy",
                            "Automotive",
                            "Security",
                            "Government",
                            "Construction",
                            "Support services",
                            "Retail",
                            "Financial services",
                            "Food & agriculture",
                            "",
                            "Tourism & hospitality",
                            "Transport",
                            "Environment",
                            "Healthcare",
                            "Information Technology",
                            "Water",
                            "Media & entertainment"
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$sector",
                    count: { $sum: "$likelihood" }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: [[{ k: "$_id", v: "$count" }]]
                    }
                }
            }
        ]);

        const RelevenceWithPestle=await Article.aggregate<Count>([
            {
                $match: {
                    pestle: {
                        $in: ["Industries", "Environmental", "Economic", "Political", "Technological", "", "Organization", "Healthcare", "Social", "Lifestyles"]
                    }
                }
            },
            {
                $group: {
                    _id: "$pestle",
                    count: { $sum: "$likelihood" }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: [[{ k: "$_id", v: "$count" }]]
                    }
                }
            }
            
        ]);

        res.status(200).json({ pestlecount:combinedCounts[0].pestleCounts, sectorcount:combinedCounts[0].sectorCounts,LikesCountWithSector,LikesCountWithPestle,RelevenceWithPestle,RelevenceWithSector });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const EndYearFilter = (req: Request, res: Response) => {
    try {
        const { search } = req.body;
        const { page } = req.params;
        var limit: number = 9;
        var offset: number = 0;
        if (page && !isNaN(Number(page))) {
            offset = (Number(page) * limit) - limit;
        }
        Article.where({ end_year: search }).limit(limit).skip(offset).find().then(async (data) => {
            var count=await Article.where({ end_year: search }).countDocuments();
            res.status(200).json({ data,count, status: true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error Happend!!!", status: false });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const TopicFilter = (req: Request, res: Response) => {
    try {
        const { search }: { search: string } = req.body;
        const { page } = req.params;
        var limit: number = 9;
        var offset: number = 0;
        if (page && !isNaN(Number(page))) {
            offset = (Number(page) * limit) - limit;
        }
        const regex = new RegExp(search, "i");
        Article.where({ topic: { "$regex": regex } }).find().limit(limit).skip(offset).then(async data => {
            var count=await Article.where({ topic: { "$regex": regex } }).countDocuments();
            res.status(200).json({ data,count, status: true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error Happend!!!", status: false });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const SourceFilter = (req: Request, res: Response) => {
    try {
        const { search }: { search: string } = req.body;
        const { page } = req.params;
        var limit: number = 9;
        var offset: number = 0;
        if (page && !isNaN(Number(page))) {
            offset = (Number(page) * limit) - limit;
        }
        const regex = new RegExp(search, "i");
        Article.where({ source: { "$regex": regex } }).find().limit(limit).skip(offset).then(async data => {
            var count=await Article.where({ source: { "$regex": regex } }).countDocuments();
            res.status(200).json({ data,count, status: true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error Happend!!!", status: false });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const CountryFilter = (req: Request, res: Response) => {
    try {
        const { search }: { search: string } = req.body;
        const regex = new RegExp(search, "i");
        const { page } = req.params;
        var limit: number = 9;
        var offset: number = 0;
        if (page && !isNaN(Number(page))) {
            offset = (Number(page) * limit) - limit;
        }
        Article.where({ source: { "$regex": regex } }).find().limit(limit).skip(offset).then(async data => {
            var count=await Article.where({ source: { "$regex": regex } }).countDocuments();
            res.status(200).json({ data,count, status: true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error Happend!!!", status: false });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const SectorsList = (req: Request, res: Response) => {
    try {
        Article.aggregate([
            {
                $match: { sector: { $ne: "" } } // Exclude documents where region is an empty string
            },
            {
                $group: {
                    _id: null,
                    sectors: { $addToSet: "$sector" }
                }
            },
            {
                $project: {
                    _id: 0,
                    sectors: 1
                }
            }
        ]).then(data => {
            res.status(200).json({ data:data[0].sectors ,status:true});
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error!!!", status: false });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const PestleList = (req: Request, res: Response) => {
    try {

        Article.aggregate([
            {
                $match: { pestle: { $ne: "" } } // Exclude documents where region is an empty string
            },
            {
                $group: {
                    _id: null,
                    pestle: { $addToSet: "$pestle" }
                }
            },
            {
                $project: {
                    _id: 0,
                    pestle: 1
                }
            }
        ]).then(data => {
            res.status(200).json({ data:data[0].pestle ,status:true});
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error!!!", status: false });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const RegionList = (req: Request, res: Response) => {
    try {

        Article.aggregate([
            {
                $match: { region: { $ne: "" } } // Exclude documents where region is an empty string
            },
            {
                $group: {
                    _id: null,
                    region: { $addToSet: "$region" }
                }
            },
            {
                $project: {
                    _id: 0,
                    region: 1
                }
            }
        ]).then(data => {
            res.status(200).json({ data:data[0].region ,status:true});
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error!!!", status: false });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const SectorSearch = (req: Request, res: Response) => {
    try {
        const { search }:{search:string} = req.body;
        const { page } = req.params;
        var limit: number = 9;
        var offset: number = 0;
        if (page && !isNaN(Number(page))) {
            offset = (Number(page) * limit) - limit;
        }
        Article.where({ sector:search }).find().limit(limit).skip(offset).then(async (data) => {
            var count=await Article.where({ sector:search }).countDocuments();
            res.status(200).json({ data,count,status:true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error!!!", status: false });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const PestelSearch = (req: Request, res: Response) => {
    try {
        const { search }:{search:string} = req.body;
        const { page } = req.params;
        var limit: number = 9;
        var offset: number = 0;
        if (page && !isNaN(Number(page))) {
            offset = (Number(page) * limit) - limit;
        }
        Article.where({ pestel:search }).find().limit(limit).skip(offset).then(async (data:Array<IArticle>) => {
            var count=await Article.where({ pestel:search }).countDocuments();
            res.status(200).json({ data,count,status:true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error!!!", status: false });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const RegionSearch = (req: Request, res: Response) => {
    try {
        const { search }:{search:string} = req.body;
        const { page } = req.params;
        var limit: number = 9;
        var offset: number = 0;
        if (page && !isNaN(Number(page))) {
            offset = (Number(page) * limit) - limit;
        }
        Article.where({ region:search }).find().limit(limit).skip(offset).then(async(data:Array<IArticle>) => {
            var count=await Article.where({ region:search }).countDocuments();
            res.status(200).json({ data,count,status:true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error!!!", status: false });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const viewAll=(req: Request, res: Response) => {
    try {
        const {page}=req.params;
        var limit:number=9;
        var offset:number=0;
        if(page&&!isNaN(Number(page))){
            offset=(Number(page)*limit)-limit;
        }
        Article.find().limit(limit).skip(offset).then(async data => {
            var count=await Article.countDocuments();
            res.status(200).json({ data,count,status:true });
        }).catch(err => {
            console.log(err);
            res.status(417).json({ message: "Error!!!", status: false });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error", status: false });
    }
}