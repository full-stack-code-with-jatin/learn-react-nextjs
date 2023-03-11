import ProductCard from "@/components/product-card";
import { configuration } from "@/lib/config";
import { dataFetcher } from "@/lib/data-fetcher";
import { IProduct, NextPageWithLayout, ProductsDispatchAction, ProductsReponse, ProductsState } from "@/lib/types";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

const Products: NextPageWithLayout = () => {
    function reducer(state: ProductsState, action: ProductsDispatchAction) {
        switch (action.type) {
            case "loading":
                return { ...state, loading: true, products: action.products }
            case "loaded":
                return { ...state, loading: false, products: action.products }
            case "like":
                let updatedProducts = state.products.map<IProduct>((p: IProduct) => {
                    if (action.product && p.id === action.product.id) {
                        return action.product;
                    }
                    return p;
                });
                if (action.product) {
                    fetch(`${configuration.hostUrl}api/products/update?id=${action.product.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            data: {
                                liked: action.product.liked,
                                title: `${action.product.title} - updated`
                            }
                        })
                    });
                }
                return { ...state, loading: false, products: updatedProducts };
            default:
                throw new Error(`case failuse. type: ${action.type} not implemented.`);
        }
    }

    const initialState: ProductsState = {
        loading: true,
        products: [],
        product: null,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "loading", products: [], product: null });
        dataFetcher<ProductsReponse>(`${configuration.hostUrl}api/products`).then((response) => {
            dispatch({ type: "loaded", products: response.data.products, product: null });
        });
    }, []);
    return <>
        <Head>
            <title>Products</title>
        </Head>
        <h3 className="mb-8 font-semibold">This page demonstates the <em>useRecuder</em> for better state management.</h3>
        {state.loading && <span>Loading products...</span>}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {state.products.map((p, index) => (
                <ProductCard key={index} state={state} product={p} dispatch={dispatch} />
            ))}
        </div>
    </>
}

Products.pageHeadingText = "Products";

export default Products;