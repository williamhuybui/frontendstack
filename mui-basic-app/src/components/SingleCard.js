import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import SkillList from "./SkillList.js";

export default function SingleCard({ item }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{item.title}</Typography>
        <Divider />
        <Box sx={{mt:"5px"}}>
          <SkillList skills={item.skills.slice(0,4)} />
        </Box>
        <Typography>{item.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
