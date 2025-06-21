import React from "react";

const NetworkError = () => {
    return (
        <div className="w-full min-h-screen flex-col justify-center items-center place-items-center">
            <div>
                <h1>Network Error</h1>
                <p>An error occurred while trying to reload the page</p>
                
                <button>Reload Page later</button>
            </div>
            

        </div>
        
    )
}

export default NetworkError;