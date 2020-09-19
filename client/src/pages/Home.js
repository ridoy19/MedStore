import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import Axios from 'axios';
import DisplayProducts from '../components/DisplayProducts';
import Button from '../components/Button';
import { dosageImage } from '../helpers/dosageImage';
import Cart from './Cart';
import Input from '../components/Input';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const limits = [50, 100, 300, 500, 1000];

    // Pagination and Limit
    const [limit, setLimit] = useState(50);
    const [skip, setSkip] = useState(1);

    const [userFilters, setUserFilters] = useState({
        filters: {
            dosage: '',
            company: ''
        }
    })
    
    // Get Items Per Page
    const handleChangeItemPerPage = (event) => {
        setLimit(event.target.value);
    }

    const fetchProducts = async () => {
        setLoading(true);
        const res = await Axios.get(`/api/v1/products?page=${skip}&paginate=${limit}`);
        //console.log(res)
        setProducts(res.data.data);
        setLoading(false);
    }
    
    // const [dosageType, setDosageType] = useState([]);
    // const [selectedDosage, setSelectedDosage] = useState('Aerosol Inhalation')
    // const fetchProductByDosageType = async () => {
    //     setLoading(true);
    //     const res = await Axios.get('/api/v1/products/list/by/dosage-type');
    //     //console.log(res);
    //     setDosageType(res.data.data);
    //     setLoading(false);
    // }

    // const handleGetSelectedDosage = (event) => {
    //     setSelectedDosage(event.target.value)
    // }

    // const [company, setCompany] = useState([]);
    // const [selectedCompany, setSelectedCompany] = useState('APC Pharma Limited');


    // const fetchCompany = async () => {
    //     setLoading(true);
    //     const res = await Axios.get('/api/v1/products/list/by/companies');
    //     // console.log(res);
    //     setCompany(res.data.data);
    //     setLoading(false);
    // }

    // const handleGetSelectedCompany = (event) => {
    //     setSelectedCompany(event.target.value)
    // }


    // const [filteredPRod, setFilteredPRod] = useState([]);
    const [searchQ, setSearchQ] = useState('');


    function search(prod) {
        return prod.filter(pr =>
            pr.brandName.toLowerCase().includes(searchQ.toLowerCase())  ||
            pr.genericName.toLowerCase().includes(searchQ.toLowerCase()) ||
            pr.manufacturer.toLowerCase().includes(searchQ.toLowerCase()) 
          );
    }

    useEffect(() => {
        fetchProducts(skip, limit);
    }, [skip, limit]);

    // useEffect(() => {
    //     fetchProductByDosageType();
    //     fetchCompany();
    // },[])
    

    //console.log(limit + selectedCompany + "\t" + selectedDosage)

    return (
        <React.Fragment>
            <div className="main">
                <img 
                    src="wallpaper.jpg" 
                    style={{height: 300, width: '100%'}} 
                    alt="wallpaper"></img>
            </div>
            <div className="pt-5">
            <>
                {/* <form className="form-inline my-2 my-lg-0">
                    <Input className="form-control mr-sm-2 input-lg" onChange={e => setSearchQ(e.target.value)} value={searchQ} name="search" />
                    <Button className="btn btn-success btn-lg">Search</Button>
                </form> */}
                <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">
                    <input className="search_input" type="text" name="" onChange={e => setSearchQ(e.target.value)} value={searchQ} placeholder="Search by brand, generic or company name..."/>
                    <a href="#" className="search_icon"><i className="fa fa-search"></i></a>
                    </div>
                </div>
                </div>
            </>
            </div>
            <div className="pt-5">
            <>
                <label htmlFor="itemsCount">Items per page:</label>
                <select 
                    name="itemsCount" 
                    id="items" 
                    onChange={handleChangeItemPerPage}
                    >
                { 
                    limits.map((item, index) => {
                        return (  
                            <option key={index} value={item}>{item}</option>
                        )
                    })
                }
                </select> 
            </>
            </div>
            {/* <div className="pt-5">
                <h4>Filter By</h4>
            <>
                <label htmlFor="dosgaeType">Medicine/ Dosage Type: </label>
                <select 
                    name="dosgaeType" 
                    id="dosage"
                    onChange={handleGetSelectedDosage} 
                    >
                {
                    dosageType.map((dosage, index) => {
                        return (  
                            <option key={index} value={dosage}>{dosage}</option>
                        )
                    })
                }
                </select> 
                <br/>
                <label htmlFor="company">Company: </label>
                <select 
                    name="company" 
                    id="company" 
                    onChange={handleGetSelectedCompany} 
                    >
                {
                    company.map((comp, index) => {
                        return (  
                            <option key={index} value={comp}>{comp}</option>
                        )
                    })
                }
                </select> 
            </>
            </div> */}
            <DisplayProducts products={search(products)} loading={loading}/>
        </React.Fragment>
    )
}

export default Home;
