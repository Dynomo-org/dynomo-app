import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"

import appApi from '@/apis/app'
import Form from "@/components/form"
import { Backdrop, Box, Card, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { AppFormType, QueryParam } from "./types"
import { LoadingButton } from "@mui/lab"
import { App } from "@/apis/app.types"
import useSnackbarStore from "@/stores/snackbar"

const AppMainPage = () => {
    // hooks section
    const { id } = useParams<QueryParam>()
    const appDetail = useQuery({
        queryKey: [appApi.GET_APP_DETAIL_KEY, id],
        queryFn: () => appApi.getAppDetail(id || "")
    }), { data } = appDetail
    const snackbar = useSnackbarStore()
    const queryClient = useQueryClient()
    const appUpdate = useMutation(appApi.updateApp, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [appApi.GET_APP_DETAIL_KEY, id] })
        },
        onError: (error: string) => {
            snackbar.show('error', error)
        }
    })

    const appInfoForm = useForm()
    const appStringsForm = useForm()
    const appStylesForm = useForm()

    // handlers and internal variables section
    const appInfoSegment = useMemo(() => {
        return {
            version: data?.version,
            version_code: data?.version_code,
            icon_url: data?.icon_url,
            privacy_policy_link: data?.privacy_policy_link,
        }
    }, [data])

    const handleAppUpdate = (values: any, type?: AppFormType) => {
        let payload: Partial<App> = {
            id: data?.id
        }

        if (type) {
            payload[type] = values
        } else {
            payload = { ...payload, ...values }
        }

        appUpdate.mutate(payload)
    }

    // side effects section
    useEffect(() => {
        appInfoForm.reset(appInfoSegment)
    }, [data, appInfoForm, appInfoSegment])

    useEffect(() => {
        appStringsForm.reset(data?.strings)
    }, [data, appStringsForm])

    useEffect(() => {
        appStylesForm.reset(data?.styles)
    }, [data, appStylesForm])

    if (appDetail.isLoading) {
        return <Backdrop
            open={true}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    return <>
        <Box>
            <Typography variant="h4">{data?.name}</Typography>
            <Typography variant="subtitle1" color={grey[500]}>{data?.package_name}</Typography>
        </Box>
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6">App Info</Typography>
                <Form onSubmit={appInfoForm.handleSubmit(data => handleAppUpdate(data))}>
                    {Object.keys(appInfoSegment).map(key => (
                        <TextField key={key} label={key} {...appInfoForm.register(key)} />
                    ))}
                    {appInfoForm.formState.isDirty && (
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
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6">App Strings</Typography>
                <Form onSubmit={appStringsForm.handleSubmit(data => handleAppUpdate(data, 'strings'))}>
                    {Object.keys(data?.strings).map(key => (
                        <TextField key={key} label={key} {...appStringsForm.register(key, { required: true })} />
                    ))}
                    {appStringsForm.formState.isDirty && (
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
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6">App Styles</Typography>
                <Form onSubmit={appStylesForm.handleSubmit(data => handleAppUpdate(data, 'styles'))}>
                    {Object.keys(data?.styles).map(key => (
                        <TextField key={key} label={key} {...appStylesForm.register(key, { required: true })} />
                    ))}
                    {appStylesForm.formState.isDirty && (
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

export default AppMainPage