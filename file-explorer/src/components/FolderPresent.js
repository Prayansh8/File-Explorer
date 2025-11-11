import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
}));

const getFileIcon = (fileType) => {
    if (fileType.startsWith('Audio/')) return <MusicNoteOutlinedIcon color="secondary" />;
    if (fileType.startsWith('Image/')) return <ImageOutlinedIcon color="primary" />;
    if (fileType.startsWith('Video/')) return <VideocamOutlinedIcon color="error" />;
    if (fileType.includes('pdf') || fileType.includes('word') || fileType.includes('excel')) return <DescriptionOutlinedIcon color="action" />;
    return <InsertDriveFileOutlinedIcon color="disabled" />;
};

export default function FolderPresent({ data, listView }) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(true);
    const [sortOrder, setSortOrder] = React.useState('desc');

    const handleSortByDate = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedData = React.useMemo(() => {
        const sorted = [...data].sort((a, b) => {
            const dateA = new Date(a.dateModified);
            const dateB = new Date(b.dateModified);

            if (sortOrder === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        return sorted;
    }, [data, sortOrder]);

    const FileCard = ({ file }) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                {secondary && (
                    <Typography variant="body2" color="text.secondary">
                        {file.size} | {file.dateModified}
                    </Typography>
                )}
                <ListItemIcon sx={{ minWidth: 40, margin: 1 }}>
                    {getFileIcon(file.type)}
                </ListItemIcon>
                <CardContent sx={{ flex: 1, padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                    <Typography variant="subtitle1" component="div" noWrap>
                        {file.name}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup row sx={{ mb: 2, alignItems: 'center' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dense}
                            onChange={(event) => setDense(event.target.checked)}
                        />
                    }
                    label="Enable dense spacing"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)}
                        />
                    }
                    label="Show file details"
                />
                <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Sort by Date Modified</Typography>
                    <IconButton onClick={handleSortByDate} size="small">
                        {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                    </IconButton>
                </Box>
            </FormGroup>

            {data.length > 0 ? (
                <>
                    {listView ? (
                        <Demo>
                            <List dense={dense}>
                                {sortedData.map((file) => (
                                    <ListItem key={file.id}>
                                        <ListItemIcon>
                                            {getFileIcon(file.type)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={file.name}
                                            secondary={secondary ? `${file.size} | Modified: ${file.dateModified}` : null}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Demo>
                    ) : (
                        <Grid container spacing={2}>
                            {sortedData.map((file) => (
                                <FileCard key={file.id} file={file} />
                            ))}
                        </Grid>
                    )}
                </>
            ) : (
                <Typography>This folder is empty.</Typography>
            )}
        </Box>
    );
}
