import { Box, Button } from '@mui/material';
import pikachuSad from '../../images/pikachu-sad.png';
import useNavigation from '@/hooks/useNavigation';

const Error = () => {
    const { goBack } = useNavigation();

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center"
            marginTop="125px"
        >
            <img src={pikachuSad} alt="sadPikachu" width="350px" height="350px"  />
            <h1>Error 404 Page Not Found</h1>
            <Button variant="outlined" onClick={goBack}>Back</Button>
        </Box>
    );
}

export default Error;