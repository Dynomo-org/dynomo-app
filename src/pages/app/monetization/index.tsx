import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { MonetizationForm, QueryParam } from './types'
import useSnackbarStore from '@/stores/snackbar'
import appApi from '@/apis/app'
import { App } from '@/apis/app.types'
import { useEffect, useMemo } from 'react'
import { Backdrop, Box, Card, CardContent, CircularProgress, FormControlLabel, Switch, TextField, Typography } from '@mui/material'
import Form from '@/components/form'
import { LoadingButton } from '@mui/lab'
import string from '@/utils/string'

const AppMonetizationPage = () => {
    // hooks section
    const { app_id } = useParams<QueryParam>()
    const snackbar = useSnackbarStore()

    // queries and mutations
    const appDetail = useQuery({
        queryKey: [appApi.GET_APP_DETAIL_KEY, app_id],
        queryFn: () => appApi.getAppDetail(app_id || ""),
    }), { data } = appDetail
    const appUpdate = useMutation({
        mutationFn: appApi.updateApp,
        onSuccess: () => {
            appDetail.refetch()
            snackbar.show('success', "Field Updated!")
        }
    })

    const monetizationForm = useForm<MonetizationForm>()

    const appMonetizationFormSegment = useMemo(() => {
        if (!data) return {}
        return {
            interstitial_interval_second: data.interstitial_interval_second,
            enable_banner: data.enable_banner,
            enable_interstitial: data.enable_interstitial,
            enable_native: data.enable_native,
            enable_open: data.enable_open,
            enable_reward: data.enable_reward,
        }
    }, [data])

    const handleAppUpdate = (values: any) => {
        const payload: Partial<App> = {
            id: data?.id,
            ...values,
            interstitial_interval_second: Number(values.interstitial_interval_second)
        }

        appUpdate.mutate(payload)
    }

    // side effects section
    useEffect(() => {
        monetizationForm.reset(appMonetizationFormSegment)
    }, [appMonetizationFormSegment, monetizationForm])

    if (appDetail.isLoading) {
        return <Backdrop
            open={true}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    return <>
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6">Monetization Info</Typography>
                <Form onSubmit={monetizationForm.handleSubmit(data => handleAppUpdate(data))}>
                    {(Object.keys(appMonetizationFormSegment) as Array<keyof typeof appMonetizationFormSegment>).map(key => <Controller
                        key={key}
                        control={monetizationForm.control}
                        name={key}
                        render={({ field: { onChange, value } }) => {
                            if (key === 'interstitial_interval_second') {
                                return <TextField key={key} type='number' label="Interstitial Ad Interval (Second)" onChange={e => onChange(Number(e.target.value))} value={value} />
                            }
                            return <FormControlLabel control={<Switch checked={!!value} onChange={onChange} />} label={`${string.snakeToReadableCase(key)} Ad`} />
                        }}
                    />)}
                    {monetizationForm.formState.isDirty && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <LoadingButton
                                type="submit"
                                variant="contained">
                                Update
                            </LoadingButton>
                        </Box>
                    )}
                </Form>
            </CardContent>
        </Card>
    </>
}

export default AppMonetizationPage