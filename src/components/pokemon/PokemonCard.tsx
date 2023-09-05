import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

type PokemonCardProps = {
    name: string,
    id: number,
    types: string[],
    imageUrl: string
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, id, types, imageUrl }) => {
    return (
        <Card variant="outlined" style={{ margin: '10px' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="div" align='center'>
                    {name}
                </Typography>
                <Typography variant="body1" component="div" align='center'>
                    #{id}
                </Typography>
                <img
                    src={imageUrl}
                    alt={name}
                    style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
                <Typography variant="body2" component="div" align='center'>
                    {types.join(', ')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PokemonCard;