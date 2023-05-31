import {Button, styled} from "@mui/material";

export const BlackButton = styled(Button)(() => ({
    backgroundColor: '#030303',
    borderRadius: '1.188rem',
    color: '#FFFFFF',
    width: '10rem',
    height: '3.5rem',
    fontStyle: 'normal',
    fontSize: '1rem',
    '&:hover': {
        backgroundColor: '#fff',
        color: '#030303',
    },
    '&:disabled': {
        backgroundColor: '#808080',
        color: '#fff',
    },
}));