import { useCallback, useState } from "react"
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';

import appApi from "@/apis/app"
import Dialog from "@/components/dialog"
import Form from "@/components/form"
import useSnackbarStore from "@/stores/snackbar";

import config from './config'
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    // hooks section
    const [dialogVisible, setDialogVisible] = useState(false)
    const { register, clearErrors, getValues, reset, formState: { errors }, handleSubmit } = useForm()
    const showSnackbar = useSnackbarStore(store => store.show)
    const navigate = useNavigate()

    // queries and mutations
    const appList = useQuery({
        queryKey: [appApi.GET_APP_LIST_KEY],
        queryFn: appApi.getAppList,
        retry: 1
    })
    const createAppMutation = useMutation({
        mutationFn: appApi.createApp,
        onSuccess: () => {
            appList.refetch()
            showSnackbar('success', `${getValues('app_name')} Created Successfully`)
            setDialogVisible(false)
            reset()
            clearErrors()
        }
    })

    // event handlers section
    const handleRowClick = (id: string) => {
        navigate(`/app/${id}`)
    }

    const handleAddButtonModal = () => setDialogVisible(prev => !prev)
    const handleDialogClose = () => {
        reset()
        clearErrors()
        setDialogVisible(false)
    }

    const handleAddAppSubmit = useCallback((data: any) => {
        createAppMutation.mutate(data)
    }, [createAppMutation])

    return <>
        <Dialog
            title="Add New Application"
            isOpen={dialogVisible}
            onClose={handleDialogClose}
        >
            <Form onSubmit={handleSubmit(handleAddAppSubmit)}>
                {config.addAppForm.map(item => <TextField
                    key={item.name}
                    error={!!errors[item.name]}
                    helperText={errors[item.name] ? item.helperText : ""}
                    placeholder={item.placeholder || ""}
                    {...register(item.name, item.validation)} label={item.label} name={item.name} type={item.type}
                    aria-invalid={!!errors[item.name]}
                />)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton
                        loading={createAppMutation.isPending}
                        startIcon={<AddIcon />}
                        type="submit"
                        variant="contained">
                        Create
                    </LoadingButton>
                </Box>
            </Form>
        </Dialog>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h5">All Apps</Typography>
            <Button variant="contained" onClick={handleAddButtonModal}>New App</Button>
        </Box>
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            {appList.isLoading ? <CircularProgress sx={{ margin: 3 }} /> : (
                <Table sx={{ width: '100%' }}>
                    <TableBody>
                        {appList.data?.apps.map(d => (
                            <TableRow onClick={() => handleRowClick(d.id)} key={d.id} sx={{ cursor: 'pointer' }}>
                                <TableCell><img width={100} height={100} src={d.icon_url} /></TableCell>
                                <TableCell>{d.name}</TableCell>
                                <TableCell>{d.package_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    </>
}

export default DashboardPage