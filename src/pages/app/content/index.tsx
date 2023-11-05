import { useCallback, useState } from "react"
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';

import contentApi from "@/apis/content"
import Dialog from "@/components/dialog"
import Form from "@/components/form"
import useSnackbarStore from "@/stores/snackbar";

import config from './config'
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { QueryParam } from "./types";

const AppContentPage = () => {
    // hooks section
    const { app_id } = useParams<QueryParam>()
    const [dialogVisible, setDialogVisible] = useState(false)
    const { register, clearErrors, getValues, reset, formState: { errors }, handleSubmit } = useForm()
    const showSnackbar = useSnackbarStore(store => store.show)
    const navigate = useNavigate()

    // queries and mutations
    const contentList = useQuery({
        queryKey: [contentApi.GET_CONTENT_LIST_KEY, app_id],
        queryFn: () => contentApi.getContents(app_id || ""),
        retry: 1,
    })
    const createContentMutation = useMutation({
        mutationFn: contentApi.createContent,
        onSuccess: () => {
            contentList.refetch()
            showSnackbar('success', `${getValues('title')} Created Successfully`)
            setDialogVisible(false)
            reset()
            clearErrors()
        }
    })

    // event handlers section
    const handleRowClick = (id: string) => {
        navigate(`/app/${app_id}/content/${id}`)
    }

    const handleAddButtonModal = () => setDialogVisible(prev => !prev)
    const handleDialogClose = () => {
        reset()
        clearErrors()
        setDialogVisible(false)
    }

    const handleAddContent = useCallback((data: any) => {
        createContentMutation.mutate({
            ...data,
            app_id,
        })
    }, [createContentMutation, app_id])

    return <>
        <Dialog
            title="Add New Content"
            isOpen={dialogVisible}
            onClose={handleDialogClose}
        >
            <Form onSubmit={handleSubmit(handleAddContent)}>
                {config.addContentForm.map(item => <TextField
                    key={item.name}
                    error={!!errors[item.name]}
                    helperText={errors[item.name] ? item.helperText : ""}
                    placeholder={item.placeholder || ""}
                    {...register(item.name, item.validation)} label={item.label} name={item.name} type={item.type}
                    aria-invalid={!!errors[item.name]}
                />)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton
                        loading={createContentMutation.isPending}
                        startIcon={<AddIcon />}
                        type="submit"
                        variant="contained">
                        Create
                    </LoadingButton>
                </Box>
            </Form>
        </Dialog>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h5">All Contents</Typography>
            <Button variant="contained" onClick={handleAddButtonModal}>New Content</Button>
        </Box>
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            {contentList.isLoading ? <CircularProgress sx={{ margin: 3 }} /> : (
                <Table sx={{ width: '100%' }}>
                    <TableBody>
                        {contentList.data?.map(d => (
                            <TableRow onClick={() => handleRowClick(d.id)} key={d.id} sx={{ cursor: 'pointer' }}>
                                <TableCell><img width={100} height={100} src={d.thumbnail_url || "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="} /></TableCell>
                                <TableCell>{d.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    </>
}

export default AppContentPage