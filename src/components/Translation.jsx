import React from "react";
import Paper from '@mui/material/Paper';
import { createTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Loading from "../assets/loading";
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Translation({ doStuff, setInput, result,loading }) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  // lineHeight: '10px',
  fontFamily: 'Montserrat'
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

  return (
    <>

<Box sx={{display:"flex",justifyContent:"center",padding:"10px"}}>
<Card sx={{ minWidth:"90vw" }}>
      <CardHeader

        title="BaatCheet.IO"
       
      />
       <TextField id="outlined-basic" label="Outlined" variant="outlined"  onChange={(e) => setInput(e.target.value)} fullWidth/>
      
       <Button variant="contained" onClick={doStuff} sx={{marginLeft:"20px",marginTop:"20px"}}>send</Button >
      <CardContent>
      <item sx={{height:300,}}>
            {loading?<CircularProgress />:result.length > 0 ? result : ""} 
             </item>
      </CardContent>
      <CardActions disableSpacing>


      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
                    
   
        </CardContent>
      </Collapse>
    </Card>
    </Box>

    
     
 

       
         


    
         

 
 </>
  );
}
