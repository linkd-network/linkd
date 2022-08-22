import * as React from 'react';
import {DialogTitle, Dialog, DialogContent, DialogActions, IconButton, Typography, styled, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DetailsDialog = ({title, open, handleClose, children}: any) => {
    return (
        <ThemedDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
        >
            <ThemedDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {title}
            </ThemedDialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button color="secondary" variant="contained" autoFocus onClick={handleClose}>
                    Done
                </Button>
            </DialogActions>
        </ThemedDialog>
    );
}

const ThemedDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const ThemedDialogTitle = (props: DialogTitleProps) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 12,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};


export {
    DetailsDialog
}
