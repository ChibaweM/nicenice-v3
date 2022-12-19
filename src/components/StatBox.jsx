import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle, icon }) => {
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between" mt="5px">
        <Typography variant="h6">
          {subtitle}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5"sx={{ color: "#C117BC" }}>{title}</Typography>
          {icon}
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
