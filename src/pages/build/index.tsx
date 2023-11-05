import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

import artifactApi from "@/apis/artifact"
import dayjs from "dayjs"

const BuildPage = () => {
    const artifactList = useQuery({
        queryKey: [artifactApi.GET_USER_ARTIFACT_LIST_KEY],
        queryFn: artifactApi.getArtifactsListByOwnerID,
    })

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h5">All Builds</Typography>
            </Box>
            <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
                {artifactList.isLoading ? <CircularProgress sx={{ margin: 3 }} /> : (
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>App Name</TableCell>
                                <TableCell>File Name</TableCell>
                                <TableCell>Build Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {artifactList.data?.artifacts.map(d => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.app_name}</TableCell>
                                    <TableCell>{d.artifact_name}</TableCell>
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

export default BuildPage