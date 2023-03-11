import { IProduct, ProductsDispatchAction, ProductsState } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, useRef, useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const ProductCard = ({ product, state, dispatch }: { product: IProduct, state: ProductsState, dispatch: Dispatch<ProductsDispatchAction> }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [inView, setInView] = useState(false);

    const scrollHandler = () => {
        setInView(isInView());
    }

    useEffect(() => {
        setInView(isInView());
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);

    const isInView = () => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
        return false;
    }

    const grayScale = inView ? "grayscale(0%)" : "grayscale(100%)";
    return <div className="group mb-20">
        <div className="aspect-w-1 aspect-h-1 h-full w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Link href={`/products/${product.id}`} className="group">
                <Image
                    height="320"
                    width="280"
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ filter: `${grayScale}` }}
                    className="h-full w-full object-cover object-center"
                    ref={imageRef}
                />
            </Link>
        </div>
        <div className="flex flex-row justify-between items-center">
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
        </div>
        <div className="flex flex-row">
            <button onClick={(e) => {
                e.preventDefault();
                let action: ProductsDispatchAction = {
                    products: state.products,
                    product: { ...product, liked: !product.liked },
                    type: "like"
                }
                dispatch(action);
            }}>
                <HeartIcon className={clsx('h-5 w-5', product.liked ? 'text-red-800' : 'text-gray-800')} />
            </button>
        </div>
    </div>

}

export default ProductCard;