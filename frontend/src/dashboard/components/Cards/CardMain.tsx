
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CustomButton from '../CustomButton';

export default function CardMain() {
  return (
    <Card
      variant="outlined"
      sx={{
        m: 1.5,
        flexShrink: 0,
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Plan about Insuarance
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "white" }}>
          Get in touch with our Insuarance Guide
        </Typography>

        <CustomButton backgroundColor="#F47105" fullWidth>Contact Advisor</CustomButton>
        {/* <Button variant="contained" size="small" fullWidth>
          Get the discount
        </Button> */}
      </CardContent>
    </Card>
  );
}


