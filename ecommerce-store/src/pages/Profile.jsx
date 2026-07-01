
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
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material";
import { storage } from "../firebase/Auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProfileIcon from "../components/ProfileIcon";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate=useNavigate();
  // console.log(user);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    // photoUrl: "",
    emailVerified: "",
    gender: "",

    houseno: "",
    street: "",
    city: "",
    state: "",
    pincode: ""

  });
  const [isEditing, setIsEditing] = useState(false);
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

  // const handleImage = async (ev) => {
  //   const img = ev.target.files[0];
  //   const imageRef = ref(storage, `ProfileImages/${user.uid}`);
  //   await uploadBytes(imageRef, img);
  // }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    let updatedData = { ...userData, [name]: value };
    console.log("updated data", updatedData)
    setUserData(updatedData);
  }


  const handleSave = async () => {

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);
    setIsEditing(!isEditing)

  }

  const handleCancel = () => {
    setIsEditing(!isEditing);
  }

  return (
    <Container maxWidth="md" >
      <Box sx={{display:"flex",gap:"1", justifyContent:"flex-start",margin:theme.spacing(2)}}>
              <Button variant="contained" onClick={()=>navigate(-1)} >Back</Button>


      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: "4", gap: "3" }}>
        <ProfileIcon username={user?.displayName??"User Profile"}></ProfileIcon>
        <Typography gutterbottom variant="h5" sx={{textTransform:"capitalize"}} >{user?.displayName}</Typography>

      </Box>

      <Paper elevation={3} sx={{
        borderRadius: "2", padding: theme.spacing(2)
      }}>
        <Typography gutterBottom variant="h4" margin="dense">Personal Details</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              variant="outlined"
              label="username"
              name="name"
              type="text"
              autoComplete="name"
              value={userData?.name ?? ""}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid><Grid size={{ xs: 12 }}>

            <TextField
              required
              variant="outlined"
              label="email"
              name="email"
              type="email"
              autoComplete="email"
              value={userData?.email ?? ""}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid><Grid size={{ xs: 12 }}>
            <TextField
              required
              variant="outlined"
              label="mobile number"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={userData?.phone ?? ""}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid><Grid size={{ xs: 12 }}>
            <TextField
              required
              variant="outlined"
              label="date of birth"
              name="dob"
              type="date"
              value={userData?.dob ?? ""}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <TextField gutterBottom
              required
              variant="outlined"
              label="photo-url"
              name="photoUrl"
              type="file"
              inputProps={{
                accept: "image/*"
              }}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleImage}
            />
          </Grid> */}
          <Grid size={{ xs: 12 }}>
            <TextField
              select
              variant="outlined"
              label="gender"
              name="gender"
              value={userData?.gender ?? ""}
              helperText="Please select your gender"
              onChange={handleChange}
              disabled={!isEditing}

            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>


        <Typography gutterBottom variant="h4" margin="dense">Address Details</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              variant="outlined"
              label="houseno"
              name="houseno"
              type="text"
              value={userData?.houseno ?? ""}
              autoComplete="address-line-1"
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid><Grid size={{ xs: 12 }}>

            <TextField
              required
              variant="outlined"
              label="street"
              name="street"
              type="text"
              autoComplete="address-line-2"
              value={userData?.street ?? ""}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid><Grid size={{ xs: 12 }}>

            <TextField
              required
              variant="outlined"
              label="city"
              name="city"
              type="text"
              value={userData?.city ?? ""}
              autoComplete="address-level-2"
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid><Grid size={{ xs: 12 }}>
            <TextField
              required
              variant="outlined"
              label="state"
              name="state"
              type="text"
              autoComplete="address-level-1"
              value={userData?.state ?? ""}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid><Grid size={{ xs: 12 }}>
            <TextField
              required
              variant="outlined"
              label="postal code"
              name="pincode"
              autoComplete="postal-code"
              type="text"
              value={userData?.pincode ?? ""}
              fullWidth={true}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid>

        </Grid>

        <Stack direction="row" spacing={2} sx={{ display: "flex", justifyContent: "flex-start" ,margin:theme.spacing()}}>
          {
            !isEditing ? <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>Edit</Button> :
              <>
                <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
                <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
              </>

          }

        </Stack>

      </Paper>
    </Container >
  );


}