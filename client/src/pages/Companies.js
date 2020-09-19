import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Companies = () => {
    //console.log(limit)
    const [distinctCompanies, setDistinctCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    const allCompanies = async () => {
        setLoading(true);
        const res = await Axios.get(`/api/v1/products/list/by/companies`);
        // console.log(res.data.data);
        setDistinctCompanies(res.data.data);
        setLoading(false);
    }

    // console.log(typeof distinctCompanies);

    useEffect(() => {
        allCompanies();
    },[])

    const randomDivColor = () => {
        let colorValues = ["#5D332B", "#109786", "black", "#0F8EE7"];
        return colorValues[Math.floor(Math.random() * colorValues.length)];
    }

    //let distinctCompanies = [... new Set(products.map(prod => prod.manufacturer))];
    
    //console.log(distinctCompanies)
    // console.log(products);


    return (
        <React.Fragment>
            <div className="pt-2">
                <h4>List of Companies</h4>
            </div>
            <div className="row">
                {
                    loading ? "Loading..." : distinctCompanies.map((com, index) => {
                        return (
                            <div className="col-4 pt-3" key={index}>
                                <div className="card" style={{backgroundColor: randomDivColor(), color: 'white'}}>
                                    <div className="card-body">
                                        {com}
                                    </div>
                                </div>       
                            </div>         
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Companies;