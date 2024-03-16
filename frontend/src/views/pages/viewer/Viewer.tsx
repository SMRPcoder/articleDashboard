import React, { useEffect } from 'react'
import { IArticle, useSearchContext } from '../../../context/SearchContext'
import ReactPaginate from 'react-paginate';
import Axios from '../../../configs/AxiosConfig/AxiosConfig';
import { AxiosResponse } from 'axios';
import { Notify } from 'notiflix';

function Viewer() {
    const { cardData,filterUrl,searchVal,setCardData,setFilterUrl } = useSearchContext();

    const handlePageClick = (event: any) => {
        console.log(event.selected);
        if(filterUrl){
            if(searchVal){
                Axios.post(`${filterUrl}/${(event.selected)as number+1}`,{
                    search:searchVal
                  }).then((response:AxiosResponse)=>{
                    if(response.data.status){
                        if(setCardData)setCardData((response.data));
                    }else{
                        Notify.warning("Unexpected Error!!!");
                    }
                  })
            }else{
                Axios.get(`/article/viewAll/${(event.selected)as number+1}`).then((response:AxiosResponse)=>{
                    if(response.data.status){
                        if(setCardData)setCardData(response.data);
                    }else{
                        Notify.warning("Unexpected Error!!!");
                    }
                   
                  })
            }
            
        }
        
    };

    useEffect(()=>{
        Axios.get("/article/viewAll").then((response:AxiosResponse)=>{
            if(response.data.status){
                if(setCardData)setCardData(response.data);
                if(setFilterUrl)setFilterUrl("/article/viewAll");
            }else{
                Notify.warning("Unexpected Error!!!");
            }
           
          })

    },[])


    return (
        <div style={{ marginTop: "15vh" }}>
            <div className='d-flex flex-row flex-wrap gap-5 mt-5'>
                {cardData?.data?.map((article: IArticle,index:number) => {
                    return (
                        <div key={index} className="card" style={{ width: "22rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{article.topic.toUpperCase()}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{article.sector}</h6>
                                <p className="card-text">{article.title}</p>
                                <a target='_blank' href={article.url} rel="noreferrer" className="card-link">View Article/Pdf <i className='bx bx-link-external'></i></a>
                                <a href='#' style={{color:"inherit",textDecoration:"none"}} className='card-link'><i className='bx bx-like'></i>{article.likelihood}</a>
                            </div>
                        </div>
                    )
                })}
                


            </div>
            {cardData?.data?.length ? 
                <div className='d-flex justify-content-center mt-3' >
                    <div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={'Next →'}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(cardData.count/9)}
                    previousLabel={'← Previous'}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    // previousClassName='btn btn-secondary pagination_pre'
                    // nextClassName='btn btn-secondary pagination_next'
                    // renderOnZeroPageCount={null}
                />
                </div>
                </div>
                 : null}
        </div>
    )
}

export default Viewer