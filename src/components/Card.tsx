import { Card, CardHeader, CardMedia, CardActions, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

interface PropsCard {
    login: string;
    imgAvatar?: string;
    id?: number;
    followers_url?: number;
}

export const CustomCard = ({ login: loginUser, imgAvatar, id, followers_url }: PropsCard) => {

    return (
        <Card sx={{ maxWidth: 345, ':hover':{boxShadow:20} }} style={{backgroundColor:'#29292f'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                        {id}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" style={{color:'#fff'}}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<strong style={{color:'#fff'}} >{loginUser}</strong>}
                subheader={<p style={{color:'#fff'}} >User</p>}
            />
            <CardMedia
                component="img"
                height="194"
                image={imgAvatar}
                alt="Paella dish"
            />
            <CardActions disableSpacing >
                <IconButton aria-label="add to favorites" style={{color:'#fff'}}>
                    Followers:
                </IconButton>
                <IconButton aria-label="share" style={{color:'#fff'}}>
                    {followers_url}
                </IconButton>
            </CardActions>
        </Card>
    );
}