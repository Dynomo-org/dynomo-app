import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import templateApi from "@/apis/template";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import dayjs from 'dayjs';
import { useMutation, useQuery } from "@tanstack/react-query";
import config from "./config";
import useSnackbarStore from '@/stores/snackbar';
import { useNavigate } from 'react-router-dom';

const AdminTemplatePage = () => {
    // state hooks
    const [addTemplateDialogVisible, setAddTemplateDialogVisible] = useState<boolean>(false)

    const showSnackbar = useSnackbarStore(store => store.show)
    const navigate = useNavigate()
    const { register, clearErrors, getValues, reset, formState: { errors }, handleSubmit } = useForm()

    // queries and mutations
    const templateList = useQuery({
        queryKey: [templateApi.GET_TEMPLATE_LIST_KEY],
        queryFn: templateApi.getTemplateList
    })
    const templateMutation = useMutation({
        mutationFn: templateApi.createTemplate,
        onSuccess: () => {
            templateList.refetch()
            showSnackbar('success', `${getValues("name")} is successfully created`)
            handleDialogClose()
        }
    })

    const handleAddTemplate = (data: any) => {
        templateMutation.mutate(data)
    }

    const handleRowClick = (id: string) => {
        navigate(`/admin/template/${id}`)
    }

    const handleDialogClose = () => {
        clearErrors()
        reset()
        setAddTemplateDialogVisible(false)
    }

    return (
        <>
            <Dialog
                title="Add New Template"
                isOpen={addTemplateDialogVisible}
                onClose={handleDialogClose}
            >
                <Form onSubmit={handleSubmit(handleAddTemplate)}>
                    {config.templateForm.map(item => <TextField
                        key={item.name}
                        error={!!errors[item.name]}
                        helperText={errors[item.name] ? item.helperText : ""}
                        placeholder={item.placeholder || ""}
                        multiline={item.multiline}
                        {...register(item.name, item.validation)} label={item.label} name={item.name} type={item.type}
                        aria-invalid={!!errors[item.name]}
                    />)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton
                            loading={templateMutation.isPending}
                            startIcon={<AddIcon />}
                            type="submit"
                            variant="contained">
                            Add
                        </LoadingButton>
                    </Box>
                </Form>
            </Dialog>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h5">Templates</Typography>
                <Button variant="contained" onClick={() => setAddTemplateDialogVisible(true)}>New Template</Button>
            </Box>
            <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
                {templateList.isLoading ? <CircularProgress sx={{ margin: 3 }} /> : (
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Template Name</TableCell>
                                <TableCell>Repository URL</TableCell>
                                <TableCell>Create Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {templateList.data?.map(d => (
                                <TableRow onClick={() => handleRowClick(d.id)} key={d.id} sx={{ cursor: 'pointer' }}>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>{d.repository_url}</TableCell>
                                    <TableCell>{dayjs(d.created_at).utc().format("DD-MMM-YYYY HH:mm")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </>
    )
}

export default AdminTemplatePage