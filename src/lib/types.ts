import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    page: ReactElement,
    headingText: string
  ) => ReactNode | JSX.Element;
  pageHeadingText?: string;
};

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: string;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  liked: boolean;
}

export interface IAddress {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  state: string;
}

export interface ICompany {
  name: string;
  department: string;
  title: string;
  address: IAddress;
}

export interface ISpeaker {
  id: number;
  address: IAddress;
  age: number;
  birthDate: string;
  bloodGroup: string;
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  image: string;
  company: ICompany;
}

export type SpeakersResponse = {
  limit: number;
  users: ISpeaker[];
  skip: number;
  total: number;
};

export type ProductsReponse = {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
};

export type ProductsDispatchAction = {
  type: string;
  products: IProduct[];
  product: IProduct | null;
};

export type ProductsState = {
  loading: boolean;
  products: IProduct[];
  product: IProduct | null;
};

export type Album = {
  userId: number;
  id: number;
  title: string;
};

export enum LoadingStatus {
  Loading,
  Success,
  Error,
}

export interface IImage {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
