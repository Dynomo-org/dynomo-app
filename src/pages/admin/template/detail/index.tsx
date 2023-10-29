import { useEffect, useRef, useState } from "react"
import { Box, Button, Card, CardContent, Fab, TextField, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "react-query"
import AddIcon from '@mui/icons-material/Add';

import templateApi from "@/apis/template"
import { QueryParam, Template } from "./types"
import Form from "@/components/form"
import useSnackbarStore from "@/stores/snackbar"

const TemplateDetailPage = () => {
    const { template_id } = useParams<QueryParam>()
    const queryClient = useQueryClient()
    const snackbar = useSnackbarStore()
    const templateInfo = useQuery([templateApi, template_id], () => templateApi.getTemplateByID(template_id || ""))
    const templateMutation = useMutation(templateApi.editTemplate, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [templateApi, template_id] })
            snackbar.show("success", "Template updated")
            hasAlreadyFetched.current = false
        }
    })
    const [template, setTemplate] = useState<Template>({
        name: '',
        repository_url: '',
        strings: [],
        styles: []
    })
    const hasAlreadyFetched = useRef<boolean>(false)
    const templateForm = useForm()

    const handleAddStringField = () => {
        setTemplate(prev => ({
            ...prev,
            strings: [...prev.strings, { key: '', value: '' }]
        }))
    }

    const handleAddStyleField = () => {
        setTemplate(prev => ({
            ...prev,
            styles: [...prev.styles, { key: '', value: '' }]
        }))
    }

    const handleUpdateTemplate = () => {
        templateForm.handleSubmit((values: any) => {
            const payload = values as Template
            templateMutation.mutate({
                id: template_id || "",
                name: payload.name,
                repository_url: payload.repository_url,
                strings: payload.strings.reduce((prev, item) => ({ ...prev, [item.key]: item.value }), {}),
                styles: payload.styles.reduce((prev, item) => ({ ...prev, [item.key]: item.value }), {}),
            })
        })()
    }

    useEffect(() => {
        if (!templateInfo.data || hasAlreadyFetched.current) return

        const template = {
            ...templateInfo.data,
            strings: Object.keys(templateInfo.data!.strings).map(key => ({ key, value: templateInfo.data!.strings[key] })),
            styles: Object.keys(templateInfo.data!.styles).map(key => ({ key, value: templateInfo.data!.styles[key] }))
        }
        setTemplate(template)

        templateForm.reset(template)
        hasAlreadyFetched.current = true
    }, [templateInfo.data, template, templateForm])

    return <>
        {templateForm.formState.isDirty && (
            <Fab
                sx={{ position: 'fixed', right: '2em', bottom: '2em' }}
                variant="extended"
                color="primary"
                onClick={handleUpdateTemplate}>
                Update
            </Fab>
        )}
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6">Template Info</Typography>
                <Form>
                    <TextField {...templateForm.register('name')} label="Template Name" />
                    <TextField {...templateForm.register('repository_url')} label="Repository URL" />
                </Form>
            </CardContent>
        </Card>
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6">Strings Configuration</Typography>
                <Form>
                    {template.strings.map((_, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                                <TextField sx={{ flexGrow: 1 }} {...templateForm.register(`strings[${index}].key`, { required: true })} label="key" />
                                <TextField sx={{ flexGrow: 1 }} {...templateForm.register(`strings[${index}].value`, { required: true })} label="value" />
                            </Box>
                        )
                    })}
                    <Button startIcon={<AddIcon />} onClick={handleAddStringField}>New Field</Button>
                </Form>
            </CardContent>
            <CardContent>
                <Typography variant="h6">Style Configuration</Typography>
                <Form>
                    {template.styles.map((_, index) => {
                        return (
                            <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                                <TextField sx={{ flexGrow: 1 }} {...templateForm.register(`styles[${index}].key`, { required: true })} label="key" />
                                <TextField sx={{ flexGrow: 1 }} {...templateForm.register(`styles[${index}].value`, { required: true })} label="value" />
                            </Box>
                        )
                    })}
                    <Button startIcon={<AddIcon />} onClick={handleAddStyleField}>New Field</Button>
                </Form>
            </CardContent>
        </Card>
    </>
}

export default TemplateDetailPage