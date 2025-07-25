
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CustomButton from './CustomButton';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function HighlightedCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // ✅ Box shadow
        borderRadius: "16px", // ✅ Border radius
        background: "linear-gradient(to right, #FFB518, #F47105, #FFB518)",
        color: "white",
        padding: 2,
      }}
    >
      <CardContent>
        <InsightsRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: "600" }}
        >
          Explore your data
        </Typography>
        <Typography sx={{ color: "white", mb: "8px" }}>
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
        {/* <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
        >
          Get insights
        </Button> */}
        <CustomButton fullWidth={isSmallScreen}>Insights</CustomButton>
      </CardContent>
    </Card>
  );
}
