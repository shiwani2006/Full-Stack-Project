import {
Box,
Paper,
Typography,
Avatar
} from "@mui/material";

import DashboardLayout
from "../../components/layout/DashboardLayout";

export default function Profile(){

const user=
JSON.parse(
localStorage.getItem("user")
)||{
name:"Shiwani",
email:"shiwani@gmail.com"
};

return(

<DashboardLayout>

<Box
sx={{
p:4,
display:"flex",
justifyContent:"center"
}}
>

<Paper
elevation={0}
sx={{
p:5,
width:500,
borderRadius:6,
textAlign:"center",
background:
"linear-gradient(135deg,#ede9fe,#ecfeff)"
}}
>

<Avatar
sx={{
width:90,
height:90,
mx:"auto",
mb:3,
bgcolor:"#C4B5FD"
}}
>
S
</Avatar>

<Typography
variant="h4"
fontWeight={700}
>
{user.name}
</Typography>

<Typography mt={2}>
{user.email}
</Typography>

</Paper>

</Box>

</DashboardLayout>

)

}