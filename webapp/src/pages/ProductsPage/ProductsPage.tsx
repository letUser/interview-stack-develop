import React, { useEffect } from "react";
import { useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { Product, ActiveProductsData } from "../../components/interfaces";
import { getActiveProductsData } from "../ApiHelper";
import PageWrapper from '../PageWrapper';

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR'
};

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({Active: []} as ActiveProductsData);

  const getActiveProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { activeProductsData, errorOccured } = await getActiveProductsData();
    setData(activeProductsData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getActiveProducts();
  }, []);

  let content;

  if (loadingState === DATA_STATES.waiting) {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  } else if (loadingState === DATA_STATES.loaded) {
    content = (
      <div
        className="grid grid-cols-3 gap-4 justify-center items-center w-full pt-4"
        data-testid="active-products-container"
      >
        {
          data.Active.length && data.Active.map((item, index) => (
            <div key={item.ProductID} className="flex flex-col justify-center items-center bg-gray-900 rounded border border-solid border-slate-950"
            > 
              <h3>{item.ProductName}</h3>
              <div>
                <img src={item.ProductPhotoURL} alt="MARZ" />
              </div>
              <span>{item.ProductStatus}</span>
            </div>
          ))
        }
      </div>
    );
  } else {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    );
  }
  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */
  /*
    PLEASE NOTICE there is NO task to make this list draggable
  */
  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-white">
        { content }
      </h1>
    </PageWrapper>
  );
};

export default ProductsPage
