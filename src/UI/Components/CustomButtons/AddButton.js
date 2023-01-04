import {Button, styled} from "@mui/material";

export const AddButton = styled(Button)(() => ({
    backgroundColor: '#FFFFFF',
    borderRadius: '1.188rem',
    color: '#030303',
    width: '15rem',
    height: '3.5rem',
    fontStyle: 'normal',
    fontSize: '1rem',
    borderWidth: '0.2rem',
    '&:hover': {
        backgroundColor: '#030303',
        color: '#FFFFFF',
    },
}));