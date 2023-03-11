import { configuration } from "@/lib/config";
import { AxiosDataFetcher } from "@/lib/data-fetcher";
import { ISpeaker, NextPageWithLayout, SpeakersResponse } from "@/lib/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
type SpeakersPageProps = {
    speakers: ISpeaker[];
}
const Speakers = () => {
    const speakersList: Array<ISpeaker> = [];   //Initial list of speakers.
    const [loading, setLoading] = useState(true);
    const [speakers, setSpeakers] = useState(speakersList);

    useEffect(() => {
        async function loadSpeakersData() {
            const axiosDataFetcher = new AxiosDataFetcher();
            setLoading(true);
            const response = await axiosDataFetcher.fetch<SpeakersResponse>(`${configuration.hostUrl}api/speakers`);
            setSpeakers(response.data.users);
            setLoading(false);
        };
        loadSpeakersData();
    }, []);

    return <>
        <Head>
            <title>Speakers</title>
        </Head>
        <div className="bg-gray-50 py-24 sm:py-32 rounded dark:bg-slate-800">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Our speakers</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                        best results for our clients.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {loading && <span className="dark:text-slate-100">Loading speakers...</span>}
                    {!loading && speakers.map((user: ISpeaker) => (
                        <li key={user.id}>
                            <Link href={`/speakers/${user.id}`}>
                                <div className="hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-3 rounded"><Image className="aspect-[3/2] w-full rounded-2xl object-cover"
                                    src={user.image} width="300" height="300" alt={`${user.firstName}`} />
                                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900 dark:text-slate-100">{`${user.firstName} ${user.lastName}`}</h3>
                                    <p className="text-base leading-7 text-gray-600 dark:text-slate-200">{user.company.title}</p></div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
}
Speakers.pageHeadingText = "Speakers";
export default Speakers;