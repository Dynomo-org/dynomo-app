import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Backdrop, Box, CircularProgress, Fab, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import contentApi from '@/apis/content'

import { QueryParam } from '../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useSnackbarStore from '@/stores/snackbar';

const imagePlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="

const AppContentDetailPage = () => {
    const { content_id } = useParams<QueryParam>()
    const contentForm = useForm()
    const editorForm = contentForm.register('content')
    const [editorRef, setEditorRef] = useState<any>()
    const snackbar = useSnackbarStore()

    const queryClient = useQueryClient()
    const contentDetail = useQuery([contentApi.GET_CONTENT_DETAIL, content_id], () => contentApi.getContentDetail(content_id || ""))
    const contentMutation = useMutation(contentApi.updateContent, {
        onSuccess: () => {
            snackbar.show("success", "Content Updated")
            queryClient.invalidateQueries([contentApi.GET_CONTENT_DETAIL, content_id])
        }
    })

    const handleSaveContent = () => {
        const payload = { id: content_id, ...contentForm.getValues() }
        contentMutation.mutate(payload)
    }

    useEffect(() => {
        if (!editorRef) return
        if (!contentDetail.data) return
        contentForm.reset(contentDetail.data)
        editorRef.setContent(contentDetail.data.content)
    }, [contentDetail.data, contentForm, editorRef])

    return (
        <>
            {(contentDetail.isLoading || !editorRef) && <Backdrop
                open={true}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
            {contentForm.formState.isDirty && <Fab
                sx={{ position: 'fixed', right: '2em', bottom: '2em' }}
                variant="extended"
                color="primary"
                onClick={handleSaveContent}>
                <SaveIcon sx={{ mr: 1 }} />
                Save
            </Fab>}
            <Box sx={{ opacity: !editorRef ? 0 : 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField InputLabelProps={{ shrink: true }} label="Title" {...contentForm.register('title')} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField InputLabelProps={{ shrink: true }} label="Thumbnail URL" {...contentForm.register('thumbnail_url')} />
                        <TextField InputLabelProps={{ shrink: true }} multiline rows={6} label="Desciption" {...contentForm.register('description')} />
                    </Box>
                    <img
                        style={{ objectFit: 'cover' }}
                        width={250} height={250}
                        src={contentForm.watch("thumbnail_url" || imagePlaceholder)}
                    />
                </Box>
                <Box sx={{ opacity: !editorRef ? 0 : 1 }}>
                    <Editor
                        apiKey='520z2crqhdge22oqf4ls5x6jvcc3bcptz60mdr90lwoaog1s'
                        onInit={(_, editor) => setEditorRef(editor)}
                        onEditorChange={val => {
                            editorForm.onChange({
                                target: {
                                    name: 'content',
                                    value: val
                                }
                            })
                        }}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default AppContentDetailPage