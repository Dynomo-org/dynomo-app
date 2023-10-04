import appApi from '@/apis/app'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useState } from 'react'
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { QueryParam } from "./types"
import useSnackbarStore from '@/stores/snackbar'

const AppBuildPage = () => {
    // hooks section
    const [keystore, setKeystore] = useState<string>("")

    const snackbar = useSnackbarStore()
    const { app_id } = useParams<QueryParam>()
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
                            <MenuItem value="10">Ten</MenuItem>
                            <MenuItem value="20">Twenty</MenuItem>
                            <MenuItem value="30">Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='contained' sx={{ mt: 2, width: '100%' }} onClick={handleSubmitBuild}>Build</Button>
                </Box>
            </Box>
        </Box>
        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>Build History</Typography>
    </>
}

export default AppBuildPage