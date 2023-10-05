import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useState } from 'react'
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

import useSnackbarStore from '@/stores/snackbar'
import appApi from '@/apis/app'
import artifactApi from "@/apis/artifact"
import keystoreApi from "@/apis/keystore"
import { QueryParam } from "./types"
import dayjs from "dayjs"

const AppBuildPage = () => {
    // hooks section
    const [keystore, setKeystore] = useState<string>("")

    const { app_id } = useParams<QueryParam>()
    const snackbar = useSnackbarStore()
    const keystoreList = useQuery(keystoreApi.GET_BUILD_KEYSTORE_LIST_KEY, keystoreApi.getBuildKeystoreList)
    const artifactList = useQuery({
        queryKey: [artifactApi.GET_APP_ARTIFACT_LIST_KEY, app_id],
        queryFn: () => artifactApi.getArtifactsListByAppID(app_id || "")
    })
    const appDetail = useQuery({
        queryKey: [appApi.GET_APP_DETAIL_KEY, app_id],
        queryFn: () => appApi.getAppDetail(app_id || "")
    }), { data } = appDetail

    // handlers section
    const handleSelectKeystore = (event: SelectChangeEvent<string>) => {
        setKeystore(event.target.value)
    }

    const handleSubmitBuild = () => {
        if (keystore == '') {
            snackbar.show('error', "Keystore must be selected")
            return
        }
    }

    return <>
        <Typography variant="h5" sx={{ mb: 4 }}>Build App</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <img src={data?.icon_url} width={250} height={250} />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant='h6'>{data?.name}</Typography>
                <Typography color={grey[500]}>Version {data?.version}</Typography>
                <Typography color={grey[500]}>Version Code {data?.version_code}</Typography>
                <Box sx={{ mt: 'auto' }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-keystore">Keystore</InputLabel>
                        <Select
                            labelId="select-keystore"
                            label="Keystore" value={keystore}
                            onChange={handleSelectKeystore}
                        >
                            {keystoreList.data?.keystores.map(data => (
                                <MenuItem key={data.id} value={data.id}>{data.alias}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant='contained' sx={{ mt: 2, width: '100%' }} onClick={handleSubmitBuild}>Build</Button>
                </Box>
            </Box>
        </Box>
        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>Build History</Typography>
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            {artifactList.isLoading ? <CircularProgress sx={{ margin: 3 }} /> : (
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>Build Date</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {artifactList.data?.artifacts.map(d => (
                            <TableRow key={d.id}>
                                <TableCell>{d.artifact_name}</TableCell>
                                <TableCell>{dayjs(d.created_at).utc().format("DD-MMM-YYYY HH:mm")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    </>
}

export default AppBuildPage