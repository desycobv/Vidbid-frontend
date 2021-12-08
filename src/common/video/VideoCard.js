import React, { useState,useContext }  from "react";
import {Button, Card, Grid, Icon} from 'semantic-ui-react'
import styled from 'styled-components'
import {FavoriteVidsContext}  from "../../contextProviders/FavoriteVidsProvider";

const VideoFrameWrapper = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
`

const VideoFrame = styled.iframe`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`
const BidButtonWrapper = styled.div`
  margin-left: 50%;
`
const StarWrapper = styled.div`
  margin-left: 20%;
`

export default function VideoCard({id, adaPrice, title, description }){
    const [favoriteVids, setFavoriteVids, addFavoriteVid,deleteFavoriteVid]= useContext(FavoriteVidsContext)
    console.log(id)
    console.log(favoriteVids)
    const isFavoriteVid = favoriteVids.map(vid => vid.id).includes(id);
    const removeFromFavorites = () => {
        deleteFavoriteVid(id);
    }
    const addToFavorites = () => {
        addFavoriteVid({id, adaPrice, title, description });
    }
    return (
        <Card>
            <VideoFrameWrapper>
                <VideoFrame
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </VideoFrameWrapper>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Grid>
                    <Grid.Row>
                        <Card.Description>
                            {description}
                        </Card.Description>
                        <StarWrapper>
                            {isFavoriteVid ? <div onClick={removeFromFavorites}> <Icon name='star' color='yellow'/></div> : <div onClick={addToFavorites}><Icon name='star outline' /></div>}
                        </StarWrapper>
                    </Grid.Row>
                </Grid>
            </Card.Content>
            <Card.Content extra>
                <Grid>
                    <Grid.Row>
                        <div>
                            {adaPrice} ₳
                        </div>
                        <BidButtonWrapper>
                            <Button>
                                Bid
                            </Button>
                        </BidButtonWrapper>
                    </Grid.Row>
                </Grid>

            </Card.Content>
        </Card>
    );
}