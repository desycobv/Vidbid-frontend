import React, {useContext, useState} from "react";
import {Button, Form, Grid, Header, Icon, Modal} from 'semantic-ui-react'
import styled from 'styled-components'

import VideoFrame  from "../VideoFrame";
import VidbidContractService from "../../../services/vidbidContractService";
import {WalletContext} from "../../../contextProviders/WalletProvider";

const ContentWrapper = styled.div`
  padding-bottom: 2%;
`
const ButtonContentWrapper = styled.div`
  padding-top: 5%;
  padding-left: 70%;
`

export default function GrabActionButton({video}){
    const [open, setOpen] = useState(false)
    const [formState, setFormState] = useState({minPrice: 0, agreeConditions: false})
    const {cardanoService} = useContext(WalletContext)
    const vidbidContractService = new VidbidContractService(cardanoService)
    const handleChange = (e, { name, value }) => {
        const newState = {
            ...formState,
            [name]: value
        }
        setFormState(newState);
    }

    const handleSubmit = async () =>{
        await vidbidContractService.grab(formState.bidPrice);
        setOpen(false)
    }
    //TODO: investigate use of formik.
    return (
        <>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Grab</Button>}
            >
                <Modal.Header>Grab funds</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Grid columns={2}>
                            <Grid.Column>
                                <VideoFrame video={video} />
                            </Grid.Column>
                            <Grid.Column>
                                <Header>{video.title}</Header>
                                <ContentWrapper>
                                    <Icon name='user' />
                                    {video.views} views
                                </ContentWrapper>
                                <ContentWrapper>
                                    Minimal Price: {video.adaPrice} ₳
                                </ContentWrapper>
                                <ContentWrapper>
                                    <Form.Field>
                                        <label>Minimal price</label>
                                        <Form.Input name="bidPrice" value={formState.bidPrice} onChange={handleChange} placeholder='Bid amount' />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Checkbox name="agreeConditions" value={formState.agreeConditions} onChange={handleChange} label='I agree to the Terms and Conditions' />
                                    </Form.Field>
                                </ContentWrapper>
                            </Grid.Column>
                        </Grid>
                        <ButtonContentWrapper>
                            <Button color='black' onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                content="Grab"
                                type="submit"
                                labelPosition='right'
                                icon='checkmark'
                                positive
                            />
                        </ButtonContentWrapper>
                    </Form>
                </Modal.Content>
            </Modal>
        </>
    );
}