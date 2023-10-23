import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { fetchData } from '../api/api'; // Import the fetchData function

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
