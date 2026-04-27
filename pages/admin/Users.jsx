import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Grid
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import DashboardLayout from "../../components/layout/DashboardLayout";

import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";

export default function Users() {

  const users = [
    {
      name:"Shiwani Dhalari",
      role:"User",
      status:"Active",
      email:"shiwani@gmail.com"
    },

    {
      name:"Rohit Sharma",
      role:"Provider",
      status:"Active",
      email:"rohit@gmail.com"
    },

    {
      name:"Priya Thakur",
      role:"Provider",
      status:"Pending",
      email:"priya@gmail.com"
    },

    {
      name:"Aman Sood",
      role:"User",
      status:"Blocked",
      email:"aman@gmail.com"
    }
  ];

  return (
    <DashboardLayout>

      <Box
        sx={{
          p:3,
          minHeight:"100vh",
          background:
          "linear-gradient(135deg,#fdf4ff 0%,#f8fafc 40%,#ecfeff 100%)"
        }}
      >

        <Paper
          elevation={0}
          sx={{
            p:3,
            borderRadius:5,
            border:"1px solid #E9D5FF",
            mb:3,
            background:
            "linear-gradient(135deg,#ede9fe,#fae8ff,#ecfeff)"
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{color:"#4C1D95"}}
          >
            Users Management
          </Typography>

          <Typography
            sx={{
              color:"#6B7280",
              mt:1
            }}
          >
            View and manage all users and providers.
          </Typography>

        </Paper>


        {/* Search */}
        <Paper
          elevation={0}
          sx={{
            p:3,
            borderRadius:5,
            border:"1px solid #E5E7EB",
            mb:3
          }}
        >
          <SearchBar />
        </Paper>


        {/* User Cards */}

        <Grid container spacing={3}>

          {users.map((user,index)=>(

            <Grid
              item
              xs={12}
              md={6}
              key={index}
            >

              <Paper
                elevation={0}
                sx={{
                  p:3,
                  borderRadius:5,
                  border:"1px solid #E5E7EB",

                  transition:"0.3s",

                  "&:hover":{
                    transform:"translateY(-4px)",
                    boxShadow:
                    "0 12px 24px rgba(0,0,0,0.08)"
                  }
                }}
              >

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >

                    <Avatar
                      sx={{
                        bgcolor:"#E9D5FF",
                        color:"#4C1D95"
                      }}
                    >
                      <PersonRoundedIcon/>
                    </Avatar>

                    <Box>
                      <Typography fontWeight={700}>
                        {user.name}
                      </Typography>

                      <Typography
                        sx={{
                          color:"#6B7280"
                        }}
                      >
                        {user.email}
                      </Typography>

                    </Box>

                  </Stack>


                  <Chip
                    label={user.status}
                    sx={{
                      backgroundColor:

                      user.status==="Active"
                      ?"#DCFCE7"

                      :user.status==="Pending"
                      ?"#FEF3C7"

                      :"#FEE2E2",

                      fontWeight:700
                    }}
                  />

                </Stack>



                <Stack
                  direction="row"
                  spacing={1.2}
                  mt={2}
                  flexWrap="wrap"
                >

                  <Chip
                    label={user.role}
                    size="small"

                    sx={{
                      backgroundColor:"#F3E8FF",
                      color:"#5B21B6",
                      fontWeight:600,
                      borderRadius:3
                    }}
                  />


                  <Button
                    variant="outlined"
                  >
                    View
                  </Button>


                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                      user.status==="Blocked"
                      ?"#10B981"
                      :"#EF4444"
                    }}
                  >
                    {
                      user.status==="Blocked"
                      ?"Unblock"
                      :"Block"
                    }

                  </Button>


                </Stack>

              </Paper>

            </Grid>

          ))}

        </Grid>

      </Box>

    </DashboardLayout>
  );
}