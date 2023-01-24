import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useParams } from 'react-router-dom';
import { getSingleUser } from '../controllers/githubUsers';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { CardMedia } from '@mui/material';

export const SingleUser = () => {
    const { singleUser } = useCustomSelector((state) => state.users);
    const dispatch = useCustomDispatch();
    const { login } = useParams();

    React.useEffect(() => {
        if (login) {
            dispatch(getSingleUser({ user: login }));
        }
    }, [login])

    return (
        <>

            <div style={{ margin: '5em', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '10px', color:'#fff' }}>{singleUser?.name}</h1>
                <a href={singleUser?.html_url} target={'_blank'} style={{ color:'#f3eded'}} >{singleUser?.html_url}</a>
            </div>

            <div
                style={{
                    margin: '-6% 25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2em'
                }}>
                <Card
                    sx={{ maxWidth: 345 }}
                    variant='outlined'
                    style={{backgroundColor:'#29292f', color:'#fff'}}
                >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                {singleUser?.id}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" style={{color:'#fff'}}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={<p style={{color:'#fff'}} >Created date at:</p>}
                        subheader={<strong style={{color:'#fff'}} >{singleUser?.created_at}</strong>}
                    />
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="194"
                            image={singleUser?.avatar_url}
                            alt="Paella dish"
                        />
                    </CardContent>
                    <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>Repositories</h4>
                        <Link to={`/repositories/${login}`}>
                            <ArrowForwardIcon color='info' />
                        </Link>
                    </CardActions>

                </Card>
            </div>
        </>
    );
}
