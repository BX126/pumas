import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function MethodCard(props) {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyles = {
        width: 500,
        transition: 'transform 0.3s',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
    };

    return (
        <Card
            style={cardStyles}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={props.onClick}
        >
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {props.introduction}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MethodCard;
