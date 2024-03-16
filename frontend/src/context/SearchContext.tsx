import React, { ReactNode, createContext, useContext, useState } from 'react';
import { IChartData } from '../views/pages/dashboard/Dashboard';

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

interface IcardData{
    data:IArticle[],
    count:number,
    status:boolean
}

interface SearchValue{
    setChartData?:React.Dispatch<React.SetStateAction<IChartData>>;
    chartData?:IChartData;
    setCardData?:React.Dispatch<React.SetStateAction<IcardData>>;
    cardData?:IcardData;
    setPestleData?:React.Dispatch<React.SetStateAction<IChartData>>;
    // pestleData?:IChartData;
    setSectorData?:React.Dispatch<React.SetStateAction<IChartData>>;
    // sectorData?:IChartData;
    setLikePestel?:React.Dispatch<React.SetStateAction<IChartData>>;
    // likePestel?:IChartData;
    setLikeSector?:React.Dispatch<React.SetStateAction<IChartData>>;
    // likeSector?:IChartData;
    setRelevencePestel?:React.Dispatch<React.SetStateAction<IChartData>>;
    // relevencePestel?:IChartData;
    setRelevenceSector?:React.Dispatch<React.SetStateAction<IChartData>>;
    // relevenceSector?:IChartData;
    chartDecider?:{[k:string]:IChartData};
    filterUrl?:string;
    setFilterUrl?:React.Dispatch<React.SetStateAction<string>>;
    searchVal?:string;
    setSearchVal?:React.Dispatch<React.SetStateAction<string>>;
    isAuth?:boolean;
    setIsAuth?:React.Dispatch<React.SetStateAction<boolean>>;
}



// Create a new context with an initial value
const SearchContext = createContext<SearchValue>({});

// Create a custom hook to easily access the context
export const useSearchContext = () => useContext(SearchContext);

// Create a provider component to wrap your application and provide the context value
export const SearchProvider: React.FC<{children:ReactNode}> = ({ children }) => {
    const [chartData,setChartData]=useState<IChartData>({labels:[],values:[]});
    const [cardData,setCardData]=useState<IcardData>({} as IcardData);

    const [pestleData, setPestleData] = useState<IChartData>({labels:[],values:[]});
    const [sectorData, setSectorData] = useState<IChartData>({labels:[],values:[]});
    const [likePestel, setLikePestel] = useState<IChartData>({labels:[],values:[]});
    const [likeSector, setLikeSector] = useState<IChartData>({labels:[],values:[]});
    const [relevencePestel, setRelevencePestel] = useState<IChartData>({labels:[],values:[]});
    const [relevenceSector, setRelevenceSector] = useState<IChartData>({labels:[],values:[]});
    const [filterUrl,setFilterUrl]=useState<string>("/article/endyear");
    const [searchVal,setSearchVal]=useState<string>("");
    const [isAuth,setIsAuth]=useState<boolean>(false);


    const chartDecider:{[k:string]:IChartData}={
        pestle:pestleData,
        sector:sectorData,
        likePestel,
        likeSector,
        relevencePestel,
        relevenceSector
      };

    const contextValue:SearchValue={
        setChartData,
        chartData,
        setCardData,
        cardData,
        setPestleData,
        setSectorData,
        setLikePestel,
        setLikeSector,
        setRelevencePestel,
        setRelevenceSector,
        chartDecider,
        setFilterUrl,
        filterUrl,
        setSearchVal,
        searchVal,
        isAuth,
        setIsAuth
    }


  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};