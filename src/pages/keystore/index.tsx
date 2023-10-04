import AddIcon from '@mui/icons-material/Add'
import { LoadingButton } from "@mui/lab"
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "react-query"

import keystoreApi from "@/apis/keystore"
import { Keystore } from "@/apis/keystore.types"
import Dialog from "@/components/dialog"
import Form from "@/components/form"
import useSnackbarStore from "@/stores/snackbar"
import { DownloadForOffline, Error } from "@mui/icons-material"
import dayjs from "dayjs"
import config from './config'

const renderKeystoreStatus = (data: Keystore) => {
    if ([3, 4].includes(data.build_status)) { // status in progress / pending
        return <CircularProgress size={24} />
    }

    let Icon = Error
    let tooltip = "Generate Keystore Failed"
    if (data.build_status == 1) {
        Icon = DownloadForOffline
        tooltip = "Download Keystore"
    }

    return (
        <Tooltip title={tooltip}>
            <Icon color='primary' sx={{ cursor: 'pointer', width: 24, height: 24 }} />
        </Tooltip>
    )
}

const KeystorePage = () => {
    const [dialogVisible, setDialogVisible] = useState(false)
    const { register, clearErrors, getValues, reset, formState: { errors }, handleSubmit } = useForm()
    const showSnackbar = useSnackbarStore(store => store.show)
    const queryClient = useQueryClient()

    const keystoreList = useQuery(keystoreApi.GET_KEYSTORE_LIST_KEY, keystoreApi.getKeystoreList)
    const createKeystoreMutation = useMutation(keystoreApi.createKeystore, {
        onError: (error: string) => {
            showSnackbar('error', error)
        },
        onSuccess: () => {
            showSnackbar('success', `${getValues('keystore_name')} is going to be created!`)
            setDialogVisible(false)
            reset()
            clearErrors()
            queryClient.invalidateQueries({ queryKey: [keystoreApi.GET_KEYSTORE_LIST_KEY] })
        }
    })

    const handleAddButtonModal = () => setDialogVisible(prev => !prev)
    const handleDialogClose = () => {
        reset()
        clearErrors()
        setDialogVisible(false)
    }

    const handleCreateKeystoreSubmit = useCallback((data: any) => {
        createKeystoreMutation.mutate(data)
    }, [createKeystoreMutation])

    return (
        <>
            <Dialog
                title="Add New Keystore"
                isOpen={dialogVisible}
                onClose={handleDialogClose}
            >
                <Form onSubmit={handleSubmit(handleCreateKeystoreSubmit)}>
                    {config.addKeystoreForm.map(item => <TextField
                        key={item.name}
                        error={!!errors[item.name]}
                        helperText={errors[item.name] ? item.helperText : ""}
                        placeholder={item.placeholder || ""}
                        {...register(item.name, item.validation)} label={item.label} name={item.name} type={item.type}
                        aria-invalid={!!errors[item.name]}
                    />)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton
                            loading={createKeystoreMutation.isLoading}
                            startIcon={<AddIcon />}
                            type="submit"
                            variant="contained">
                            Create
                        </LoadingButton>
                    </Box>
                </Form>
            </Dialog>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h5">Keystores</Typography>
                <Button variant="contained" onClick={handleAddButtonModal}>New Keystore</Button>
            </Box>
            <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
                {keystoreList.isLoading ? <CircularProgress sx={{ margin: 3 }} /> : (
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Keystore Name</TableCell>
                                <TableCell>Alias</TableCell>
                                <TableCell>Metadata</TableCell>
                                <TableCell>Create Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {keystoreList.data?.keystores.map(d => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>{d.alias}</TableCell>
                                    <TableCell><Button sx={{ px: 0 }} variant='text'>Show</Button></TableCell>
                                    <TableCell>{dayjs(d.created_at).utc().format("DD-MMM-YYYY HH:mm")}</TableCell>
                                    <TableCell>{renderKeystoreStatus(d)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </>
    )
}

export default KeystorePage