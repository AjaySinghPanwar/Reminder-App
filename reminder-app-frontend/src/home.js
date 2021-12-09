import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './common.css'

function Home() {
    const [reminderMsg, setReminderMsg] = useState("");
    const [remindAt, setRemindAt] = useState();
    const [reminderList, setReminderList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/getAllReminder").then((res) => setReminderList(res.data));
    })

    const handleChange = (event) => {
        setReminderMsg(event.target.value);
    }

    const addReminder = () => {
        if(remindAt === "" || remindAt === null || remindAt === undefined || reminderMsg === ""){
            alert("You haven't selected the reminder message or reminder date and time");
            return;
        }
        axios.post("http://localhost:9000/addReminder", { reminderMsg, remindAt })
            .then(res => setReminderList(res.data));
        setReminderMsg("");
        setRemindAt();
    }

    const deleteReminder = (id) => {
        axios.post("http://localhost:9000/deleteReminder", { id })
            .then(res => setReminderList(res.data));
    }

    return (<>
        <div className="main-heading">
            <h1>Welcome To The Reminder App</h1>
        </div>

        <Card sx={{ width: '50%', marginTop: 5 }} className="reminder-card">
            <CardHeader
                title="Add Reminder For Your Tasks"
            />
            <CardContent>
                <Box sx={{ flexGrow: 1, margin: 5 }}>
                    <Grid container spacing={6}>
                        <Grid item sm={6}>
                            <TextField required id="outlined-basic" label="What To Remember" variant="outlined" onChange={handleChange} />
                        </Grid>
                        <Grid item sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Select the date and time"
                                    value={remindAt}
                                    onChange={setRemindAt}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant="contained" size="large" className="btn" onClick={addReminder}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>

        {
            reminderList.map((reminder) => (
                <Card sx={{ display: 'inline-block', width: '20%', height: '15%', m: 2, p: 1, backgroundColor: "#e6ccff" }} key={reminder._id}>
                    <CardHeader
                        title={reminder.reminderMsg}
                    />
                    <CardContent>
                        <Typography>Remind Me At :</Typography>
                        <Typography>{String(new Date(reminder.remindAt.toLocaleString('en-In', { timezone: "Asia/Kolkata" })))}</Typography>
                        <Button variant="contained" size="small" className="btn" onClick={() => { deleteReminder(reminder._id) }}>
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ))
        }
    </>);
}

export default Home;