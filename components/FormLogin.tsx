import { Button, CircularProgress, styled, TextField, Typography } from '@mui/material'
import * as jwt from 'jsonwebtoken';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getLoginData } from '../pages/api/login.service';
import { useSession } from '../hooks/useSession';
import { useAlert } from '../hooks/useAlert';
import { ISessionStatusType } from '../interfaces/ISessionStatus';
import Router, { useRouter } from 'next/router';

// styling components
const FormStyled = styled('form')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: theme.spacing(3),
    boxShadow: theme.shadows[2],
    minWidth: 'var(--global-width)',
    minHeight: 'var(--global-height)',
    [theme.breakpoints.down('sm')]: {
        boxShadow: 'none',
        height: 'max-content'
    }
}))


export default function FormLogin({ title }: { title: string }) {
    const { sessionDispatch } = useSession();
    const { alertDispatch } = useAlert();
    const router = useRouter()

    const initValues: { login: string, pwd: string } = {
        login: '',
        pwd: '',
    }
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: initValues })

    const submit = async (data: typeof initValues) => {
        setLoading(true);
        sessionDispatch({ type: 'clear' });
        try {
            const response = await getLoginData(data)
            if (!response.auth) throw new Error(response.response)
            const auth: any = jwt.decode(response.response)
            sessionDispatch({ type: 'success', newState: { token: response.response, perfil: auth.type, status: ISessionStatusType.success } })
            alertDispatch({ type: 'success', message: 'Welcome' })
            router.push('product')
        } catch (error: any) {
            sessionDispatch({ type: 'reject' })
            alertDispatch({ type: 'error', message: String(error.message || error) })
        }
        setLoading(false);
    }

    const [loadingForm, setLoading] = useState(false);

    return (
        <FormStyled onSubmit={handleSubmit(submit)}>
            <Typography variant='h4' textAlign={'right'}>{title}</Typography>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <Controller
                    name='login'
                    control={control}
                    rules={{
                        required: 'Login is mandatory',
                        maxLength: 11
                    }}
                    render={({ field }) => <TextField {...field} variant="outlined" label="Login" inputProps={{ maxLength: 11 }} error={Boolean(errors.login?.message)} helperText={errors.login?.message} />}
                />
                <Controller
                    name='pwd'
                    rules={{
                        required: 'Password is mandatory',
                    }}
                    control={control}
                    render={({ field }) => <TextField {...field} variant="outlined" label="Password" type='password' inputProps={{ maxLength: 11 }} error={Boolean(errors.pwd?.message)} helperText={errors.pwd?.message} />}
                />
                {!loadingForm ? <Button type='submit'>Acessar</Button> : <CircularProgress sx={{ alignSelf: 'center' }} />}

            </div>
        </FormStyled>
    )
}