
import { db } from "../firebase/Auth";
import { useAuth } from "../firebase/Auth";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Paper, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material";
import { storage } from "../firebase/Auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProfileIcon from "../components/ProfileIcon";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Account() {
    const { user, deleteAccount } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    console.log(user);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
    });
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    const handleSubmit = async (event) => {
        setOpen(false);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const password = formJson.password;
        // console.log(password);
        await deleteAccount(user, password);
        setDeleteOpen(false);
    };
    const docRef = doc(db, "users", user.uid);
    useEffect(() => {
        const fetchUserData = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data", docSnap.data());
                setUserData(docSnap.data());
            } else {
                console.log("Sorry,No such document exists!!");
            }
        }
        fetchUserData();
    }, []);
    return (
        <Container maxWidth="md" >
            <Box sx={{ display: "flex", gap: "1", justifyContent: "flex-start", margin: theme.spacing(2) }}>
                <Button variant="contained" onClick={() => navigate(-1)} >Back</Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: "4", gap: "3" }}>
                <ProfileIcon username={user?.displayName ?? "User Profile"}></ProfileIcon>
                <Typography gutterbottom variant="h5" sx={{ textTransform: "capitalize" }} >{user?.displayName}</Typography>
            </Box>

            <Paper elevation={3} sx={{
                borderRadius: "2", padding: theme.spacing(2)
            }}>
                <Typography gutterBottom color="primary" variant="h4" margin="dense">Account Details</Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 12 }}>
                        <Typography gutterBottom color="textSecondary" variant="h5">{userData?.name ?? ""}</Typography>
                    </Grid><Grid size={{ xs: 12 }}>
                        <Typography gutterBottom color="textSecondary" variant="h5">{userData?.email ?? ""}</Typography>
                    </Grid>
                </Grid>

                <Stack direction="row" spacing={2} sx={{ display: "flex", justifyContent: "flex-start", margin: theme.spacing() }}>
                    <Button variant="contained" color="primary" >Logout</Button>
                    <Button variant="contained" color="error" onClick={handleClickOpen} >Delete</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        role="alertdialog"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure?Do you want to delete the Account?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Deleting Account is a permanent Process.You cant retrieve your data after deleting your data.You need to SignUp again to use the Shopify.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant='contained' color="info" autoFocus>
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteOpen} variant='contained' color='error'>Delete</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                        <DialogTitle>Deleting Account</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                permanently deleting account
                            </DialogContentText>
                            <form onSubmit={handleSubmit} id="subscription-form">
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="password"
                                    label="password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteClose}>Cancel</Button>
                            <Button type="submit" form="subscription-form">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Paper>
        </Container >
    );


}





