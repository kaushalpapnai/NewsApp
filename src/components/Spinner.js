import React from 'react'
import loading from './loading.gif'

 const Spinner=()=> {
        return (
            <div className="container d-flex justify-content-center  ">
                <img class= "my-3" src={loading} alt="loading" />
            </div>
        )
}

export default Spinner