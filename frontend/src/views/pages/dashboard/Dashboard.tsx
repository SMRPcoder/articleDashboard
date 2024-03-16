import React, {  useEffect } from 'react'
import PieChart from '../../../components/charts/Piechart'
import BarChart, { ChartData } from '../../../components/charts/Barchart';
import Donut from '../../../components/charts/Donut';

import Polarchart from '../../../components/charts/Polarchart';
import Linechart from '../../../components/charts/Linechart';
import Radarchart from '../../../components/charts/Radarchart';
import Axios from '../../../configs/AxiosConfig/AxiosConfig';
import { AxiosResponse } from 'axios';
import { useSearchContext } from '../../../context/SearchContext';

export interface IChartData {
  labels: string[],
  values: number[]
}

interface ICountsData {
  [k: string]: number
}

interface IChartDecider{
  [k:string]:IChartData
}



export default function Dashboard() {

  // assinging states
  // const [pestleData, setPestleData] = useState<IChartData>({labels:[],values:[]});
  // const [sectorData, setSectorData] = useState<IChartData>({labels:[],values:[]});
  // const [likePestel, setLikePestel] = useState<IChartData>({labels:[],values:[]});
  // const [likeSector, setLikeSector] = useState<IChartData>({labels:[],values:[]});
  // const [relevencePestel, setRelevencePestel] = useState<IChartData>({labels:[],values:[]});
  // const [relevenceSector, setRelevenceSector] = useState<IChartData>({labels:[],values:[]});

  // using context
  const {chartData, 
    setChartData,
    setPestleData,
    setSectorData,
    setLikePestel,
    setLikeSector,
    setRelevencePestel,
    setRelevenceSector
  } = useSearchContext();

 

  useEffect(() => {

    Axios.get<AxiosResponse<any>>("/article").then((response: AxiosResponse<any>) => {
      new Promise((resolve, reject) => {
        try {
          let pestle: ICountsData[] = response.data.pestlecount as ICountsData[];
          let sector: ICountsData[] = response.data.sectorcount as ICountsData[];
          let like_pestel: ICountsData[] = response.data.LikesCountWithPestle as ICountsData[];
          let like_sector: ICountsData[] = response.data.LikesCountWithSector as ICountsData[];
          let relevence_pestel: ICountsData[] = response.data.RelevenceWithPestle as ICountsData[];
          let relevence_sector: ICountsData[] = response.data.RelevenceWithSector as ICountsData[];

          let chartdata: IChartData = { labels: [], values: [] };
          var Returndata:IChartDecider = {};
          
          // for pestle
          let labels:string[] = pestle.map((obj:ICountsData)=>Object.keys(obj)[0]===""?"none":Object.keys(obj)[0]);
          let values:number[] = pestle.map((obj:ICountsData)=>Object.values(obj)[0]);

          chartdata.labels=labels;
          chartdata.values=values;
          Returndata.pestle=JSON.parse(JSON.stringify(chartdata));

          // for sector
          labels= sector.map((obj:ICountsData)=>Object.keys(obj)[0]===""?"none":Object.keys(obj)[0]);
          values= sector.map((obj:ICountsData)=>Object.values(obj)[0]);

          chartdata.labels=labels;
          chartdata.values=values;
          Returndata.sector=JSON.parse(JSON.stringify(chartdata));

          // for likewise pestel
          labels= like_pestel.map((obj:ICountsData)=>Object.keys(obj)[0]===""?"none":Object.keys(obj)[0]);
          values= like_pestel.map((obj:ICountsData)=>Object.values(obj)[0]);

          chartdata.labels=labels;
          chartdata.values=values;
          Returndata.like_pestel=JSON.parse(JSON.stringify(chartdata));

          // for likewise sector
          labels= like_sector.map((obj:ICountsData)=>Object.keys(obj)[0]===""?"none":Object.keys(obj)[0]);
          values= like_sector.map((obj:ICountsData)=>Object.values(obj)[0]);

          chartdata.labels=labels;
          chartdata.values=values;
          Returndata.like_sector=JSON.parse(JSON.stringify(chartdata));

          // for relevence pestel
          labels= relevence_pestel.map((obj:ICountsData)=>Object.keys(obj)[0]===""?"none":Object.keys(obj)[0]);
          values= relevence_pestel.map((obj:ICountsData)=>Object.values(obj)[0]);

          chartdata.labels=labels;
          chartdata.values=values;
          Returndata.relevence_pestel=JSON.parse(JSON.stringify(chartdata));

          // for relevence sector
          labels= relevence_sector.map((obj:ICountsData)=>Object.keys(obj)[0]===""?"none":Object.keys(obj)[0]);
          values= relevence_sector.map((obj:ICountsData)=>Object.values(obj)[0]);

          chartdata.labels=labels;
          chartdata.values=values;
          Returndata.relevence_sector=JSON.parse(JSON.stringify(chartdata));

          resolve(Returndata);

        } catch (error) {
          reject(error);
        }

      }).then((data:any)=>{
        if(setPestleData)setPestleData(data.pestle as IChartData);
        if(setSectorData)setSectorData(data.sector as IChartData);
        if(setLikePestel)setLikePestel(data.like_pestel as IChartData);
        if(setLikeSector)setLikeSector(data.like_sector as IChartData);
        if(setRelevencePestel)setRelevencePestel(data.relevence_pestel as IChartData);
        if(setRelevenceSector)setRelevenceSector(data.relevence_sector as IChartData);

        if(setChartData)setChartData(data.pestle as IChartData);

      });

    });
    return ;

  }, []);






  return (
    <div>
      <div className="container">
        <div className='d-flex justify-content-center p-2 mt-5 mb-5'>
            {/* <select className='form-control form-select'  onChange={HandleChartChange}>
              <option value="pestle">Chart With Pestle</option>
              <option value="sector">Chart With Sector</option>
              <option value="likePestel">Likes Count With Pestle</option>
              <option value="likeSector">Likes Count With Sector</option>
              <option value="relevencePestel">Relevence With Pestel</option>
              <option value="relevenceSector">Relevence With Sector</option>

            </select>

            <select className='form-control form-select' name="" id="">
              <option value="pestle">Chart With Pestle</option>
              <option value="pestle">Chart With Sector</option>
              <option value="pestle">Likes Count With Pestle</option>
              <option value="pestle">Likes Count With Sector</option>
              <option value="pestle">Relevence With Sector</option>
              <option value="pestle">Relevence With Pestle</option>

            </select>
            <input className='form-control'/> */}

        </div>
        <div className="d-flex flex-column gap-5">
        <div className="row mb-3">
          <div className="col-sm-12 col-lg-6">
            <PieChart data={chartData as ChartData} />

          </div>
          <div className="col-sm-12 col-lg-6">
            <BarChart data={chartData as ChartData} />
          </div>
        
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-lg-6">
            <Donut data={chartData as ChartData} />
          </div>
          <div className="col-sm-12 col-lg-6">
            <Polarchart data={chartData as ChartData} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-lg-6">
            <Linechart data={chartData as ChartData} />
          </div>
          <div className="col-sm-12 col-lg-6">
            <Radarchart data={chartData as ChartData} />
          </div>
        </div>
        </div>
      </div>

    </div>
  )
}
