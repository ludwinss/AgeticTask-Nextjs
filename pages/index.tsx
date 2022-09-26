import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'
import FormLogin from "../components/FormLogin";
import { Grid } from "@mui/material";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item>
          <FormLogin title='AGETIC' />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
