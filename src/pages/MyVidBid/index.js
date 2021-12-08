import React, {useContext, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import _ from 'lodash'
import { Image,Header, Grid, Search } from 'semantic-ui-react'
import BackendService from "../../services/backendService";
import VideoList from "../../common/video/VideoList";
import {FavoriteVidsContext} from "../../contextProviders/FavoriteVidsProvider";


const backendService = new BackendService();
export default function MyVidBidPage() {
    const { t } = useTranslation();

    const [favoriteVids]= useContext(FavoriteVidsContext)

    const [myVids, setMyVids] =  useState([])

    useEffect(()=>{
        const fetchVids = async () => {
            const myvids = await backendService.getMyVids();
            setMyVids(myvids);
        }
        console.log(favoriteVids)
        fetchVids().catch( e => console.log(e));
    },[setMyVids]);

    return (
        <div>
            <Header as='h2'>
                MyVids
                <Header.Subheader>
                    Video's that i own.
                </Header.Subheader>
            </Header>
            <VideoList vidList={myVids}/>
            <Header as='h2'>
                Favorites
                <Header.Subheader>
                    My favorite videos
                </Header.Subheader>
            </Header>
            <VideoList vidList={favoriteVids}/>
        </div>
    );
}