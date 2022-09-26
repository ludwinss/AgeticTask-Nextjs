import { Grid, styled } from "@mui/material";
import FormLogin from "../../components/FormLogin";
import { NextApiHandler, NextPage } from 'next'

const ContainerStyled = styled('div')({
    height: '100vh',
    display: 'flex',
});

export default function Login() {
    return (
        <ContainerStyled>
            <Grid container justifyContent='center' alignItems='center'>
                <Grid item>
                    <FormLogin title='Patrimonio' />
                </Grid>
            </Grid>
        </ContainerStyled>
    )
}
