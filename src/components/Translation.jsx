import React from "react";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText, Typography } from "@mui/material";
import "../../src/button.css";
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';


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


export default function Translation({ doStuff, setInput, result,loading ,save,setBack}) {

  const [expanded, setExpanded] = React.useState(false);
  console.log(result)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  


  return (
    <>
    <Typography variant="span" sx={{display:"flex",justifyContent:"center"}} className="buttons" onClick={()=>setBack(true)}>BaatCheet.IO</Typography>

<Box sx={{display:"flex",justifyContent:"center",padding:"10px"}} fullWidth>


<Card sx={{ minWidth:"90vw",padding:"30px",borderRadius:"8px" }} fullWidth>
       <TextField id="outlined-basic" label="Chat Like Pro" variant="outlined" onChange={(e) => setInput(e.target.value)} fullWidth sx={{display:"flex",borderColor:"green"}}/>
       <button class="button" onClick={doStuff} >Send</button>
       {/* <Button variant="contained" onClick={doStuff} sx={{marginLeft:"20px",marginTop:"20px"}}>send</Button > */}
      {loading? <> <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} /></> :<>{result.length>1?result.map((items)=>{
        return (<><List key={items.query}>
         <ListItem key={items.query}><ListItemText primary={items.query} secondary={items.response} id="outlined-basic"  fullwidth="true"/></ListItem></List></>)
      }):<><List className="card">
        <ListItem>
          <ListItemText primary={result.query} secondary={result.response}/>
          </ListItem ></List></>}</>}
 
      <CardContent>
    
        
      </CardContent>
      <CardActions disableSpacing sx={{display:"flex",justifyContent:"center"}}>
        {/* <Typography variant="h4" sx={{display:"flex",justifyContent:"center"}}>EXPAND FOR HISTORY</Typography> */}
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > <Chip label="HISTORY" className="button"/>
        </ExpandMore>
      


      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Box sx={{overflowY:"scroll",height:"40vh",scrollbarWidth:"thin"}} fullWidth><List sx={{borderWidth:"10px",borderColor:"black"}}>{save.length>1?save.map((items)=>{
        return (<>
          <ListItem key={items.query}><ListItemText primary={items.query} secondary={items.response} id="outlined-basic"  fullwidth="true" className="card"/></ListItem></>)
      }):<>
        <ListItem key={result.query}>
          <ListItemText primary={result.query} secondary={result.response}/>
          </ListItem></>}</List></Box>
         
        </CardContent>
      </Collapse>

    </Card>

    </Box>

    
     
 

       
         


    
         

 
 </>
  );
}
