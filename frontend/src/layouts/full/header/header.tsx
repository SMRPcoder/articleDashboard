import React, { useState, useEffect, useRef } from "react";
import { useSearchContext } from "../../../context/SearchContext";
import CustomInput from "../../../components/InputFile.tsx/CustomInput";
import Axios from "../../../configs/AxiosConfig/AxiosConfig";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

interface HeaderProps { }



const Header: React.FC<HeaderProps> = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setChartData, chartDecider, setCardData, filterUrl, setFilterUrl, searchVal, setSearchVal } = useSearchContext();

  const [disableInput, setDisableInput] = useState<boolean>(true);
  const [InputType, setInputType] = useState<"text" | "number" | "select">("text");
  const [SelectData, setSelectData] = useState<string[] | null>(null);

  const navigator = useNavigate();

  const urldata: { [k: string]: { url: string, inputtype: "text" | "number" | "select" } } = {
    end_year: { url: "/article/endyear", inputtype: "number" },
    topic: { url: "/article/topic", inputtype: "text" },
    source: { url: "/article/source", inputtype: "text" },
    country: { url: "/article/country", inputtype: "text" },
    sector: { url: "/article/sector", inputtype: "select" },
    pestel: { url: "/article/pestel", inputtype: "select" },
    region: { url: "/article/region", inputtype: "select" }
  }
  // this is going to decide what the data is


  const toggleNavbar = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDashboard = (index: number) => {
    navigator("/user/dashboard")
  };

  const handleArticle = (index: number) => {
    navigator("/user/dataview")
  };

  useEffect(() => {
    console.log(window.location.pathname);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function HandleChartChange(event: React.ChangeEvent<HTMLSelectElement>) {

    let selectedval: string = event.target.value;
    if (setChartData && chartDecider) setChartData(chartDecider[selectedval]);
    if (window.location.pathname !== "/user/dashboard") {
      navigator("/user/dashboard");
    }
  }

  function HandleFilterSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value != "") {
      var url = urldata[event.target.value];

      if (url.inputtype === "select") {
        let ListUrls: { [k: string]: string } = { sector: "/article/sectorList", pestel: "/article/pestleList", region: "/article/regionList" };
        var listurl: string = ListUrls[event.target.value];
        Axios.get(listurl).then((data: AxiosResponse) => {
          if (data.data.status) {
            if (setFilterUrl) setFilterUrl(url.url);
            setDisableInput(false);
            setInputType(url.inputtype);
            setSelectData(data.data.data);
          } else {
            Notify.warning("Unexpected Error!!");
          }
        })
      } else {
        if (setFilterUrl) setFilterUrl(url.url);
        setDisableInput(false);
        setInputType(url.inputtype);
      }

    };
  }

  function HandleSearchValue(event: any) {
    var search = event.target.value;
    if (search && search != "") {
      if (setSearchVal) setSearchVal(search as string);
    }
  }

  function HandleCardsData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (filterUrl) {
      Axios.post(filterUrl, {
        search: searchVal
      }).then((response: AxiosResponse) => {
        console.log(response.data.data);
        if (setCardData) setCardData((response.data));
      })
    }

  }

  function HandleSignOut(){
    navigator("/auth/login")
  }

  return (
    <>
      <header
        className={`header ${isNavOpen ? "body-pd" : ""} my-3`}
        id="header"
      >
        <div className="container-fluid">
          <div className="card">
            <div className="card-body" style={{ padding: "0.5rem 1.5rem" }}>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <i className="bx bx-search fs-5 mx-2"></i>

                  {window.location.pathname === "/user/dashboard" ?
                    <select className="form-control form-select me-2 search_input m-2" onChange={HandleChartChange}>
                      <option value="pestle">Chart With Pestle</option>
                      <option value="sector">Chart With Sector</option>
                      <option value="likePestel">Likes Count With Pestle</option>
                      <option value="likeSector">Likes Count With Sector</option>
                      <option value="relevencePestel">Relevence With Pestel</option>
                      <option value="relevenceSector">Relevence With Sector</option>

                    </select>
                    : null
                  }


                  {window.location.pathname === "/user/dataview" ?
                    <form onSubmit={HandleCardsData} className="d-flex form">
                      <select id="filter_option" onChange={HandleFilterSelect} style={{ width: "200px" }} className="form-control form-select">
                        <option value="" >Select one</option>
                        <option value="end_year" >End Year</option>
                        <option value="topic" >Topic</option>
                        <option value="source" >Source</option>
                        <option value="country" >Country</option>
                        <option value="sector" >Sector</option>
                        <option value="pestel" >Pestel</option>
                        <option value="region" >Region</option>


                      </select>
                      <CustomInput onChange={HandleSearchValue} data={SelectData} disabled={disableInput} type={InputType} />
                      <button type="submit" className="btn btn-primary" ><i className="bx bx-search fs-5 mx-2"></i></button>
                    </form>
                    : null

                  }




                </div>

                <div
                  className="header_img"
                  onClick={toggleDropdown}
                  ref={dropdownRef}
                >
                  <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
                </div>

                {isOpen && (
                  <div className="dropdown-content">
                    <a className="user_menu_item">
                      <i className="bx bxs-user fs-5"></i>
                      <span>Users</span>
                    </a>
                    <a className="user_menu_item">
                      <i className="bx bx-log-in fs-5"></i>
                      <span>Logout</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`l-navbar ${isNavOpen ? "show" : ""}`} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo" onClick={toggleNavbar}>
              <i className="bx bx-menu nav_icon" id="header-toggle"></i>
              <span className="nav_name">Menu</span>
            </a>
            <div className="nav_list">
              <a
                href="#"
                className={`nav_link ${activeLink === 0 ? "active" : ""}`}
                onClick={() => handleDashboard(0)}
              >
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </a>
              <a
                href="#"
                className={`nav_link ${activeLink === 1 ? "active" : ""}`}
                onClick={() => handleArticle(1)}
              >
                <i className='bx bxs-book-content'></i>
                <span className="nav_name">Article</span>
              </a>

            </div>
          </div>
          <a onClick={HandleSignOut} href="#" className="nav_link">
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;