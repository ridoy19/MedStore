import React from 'react'

function NoOrder() {
    return (
        <div className="container-fluid mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body empty-card-body empty-cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> 
                            <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>You have no orders!</strong></h3>
                                <h4>Wait customer will buy after market release!</h4> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoOrder
