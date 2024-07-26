import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from "./ProductsPage";
import { ACTIVEPRODUCTS_URL } from "../ApiHelper";

export default {
    title: 'Products Page',
    component: ProductsPage,
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)]
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
    mockData: [
        {
            url: ACTIVEPRODUCTS_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [
                  {
                    "ProductID": 1,
                    "ProductName": "Hat",
                    "ProductPhotoURL": "https://yt3.googleusercontent.com/_mBMigswqjGEcocDv4WZwx0ThsDmEfSaGYhFjR9ATHsrVejdtgyXz7Pz0_SDxe6Z58OwIGqSbQ=s900-c-k-c0x00ffffff-no-rj",
                    "ProductStatus": "Active"
                  },
                  {
                    "ProductID": 2,
                    "ProductName": "Shoes",
                    "ProductPhotoURL": "https://yt3.googleusercontent.com/_mBMigswqjGEcocDv4WZwx0ThsDmEfSaGYhFjR9ATHsrVejdtgyXz7Pz0_SDxe6Z58OwIGqSbQ=s900-c-k-c0x00ffffff-no-rj",
                    "ProductStatus": "Active"
                  },
                  {
                    "ProductID": 3,
                    "ProductName": "Pants",
                    "ProductPhotoURL": "https://yt3.googleusercontent.com/_mBMigswqjGEcocDv4WZwx0ThsDmEfSaGYhFjR9ATHsrVejdtgyXz7Pz0_SDxe6Z58OwIGqSbQ=s900-c-k-c0x00ffffff-no-rj",
                    "ProductStatus": "Active"
                  }
                ],
                message: ""
            },
        }
    ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
    mockData: [
        {
            url: ACTIVEPRODUCTS_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [],
                message: ""
            },
        }
    ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
    mockData: [
        {
            url: ACTIVEPRODUCTS_URL,
            method: 'GET',
            status: 500,
            response: {
                data: [],
                message: "Error"
            }
        }
    ],
};
