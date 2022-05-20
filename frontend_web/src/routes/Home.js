import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import './routes.css';

function Home(){
    /* Load Viewable Projects */

    return(
        <div id='Home'>
            <div id='newProjectButtonBox'>
                <Button id='newProjectButton' variant='contained'>New Project</Button>
            </div>
            <div id='projectCardFlexBox'>
                <Card className='projectCard'>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            Lake Eola
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button>View Project</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
export default Home;